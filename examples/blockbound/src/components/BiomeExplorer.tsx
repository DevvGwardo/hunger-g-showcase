import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { biomes, type BiomeId } from '../data';
import { usePointerParallax } from '../hooks/usePointerParallax';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ArrowDown, ArrowUpRight, CompassIcon } from './Icons';
import { BiomeArtwork } from './BiomeScenes';
import { BiomeThumbnail } from './BiomeThumbnail';
import { Reveal } from './Reveal';

interface BiomeExplorerProps {
  soundEnabled: boolean;
  onBiomeSoundChange: (id: BiomeId) => void;
}

gsap.registerPlugin(ScrollTrigger);

export function BiomeExplorer({ soundEnabled, onBiomeSoundChange }: BiomeExplorerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pinned, setPinned] = useState(() => window.matchMedia('(min-width: 960px)').matches);
  const reducedMotion = useReducedMotion();
  const isPinned = pinned && !reducedMotion;
  const activeBiome = biomes[activeIndex];

  usePointerParallax(sectionRef, reducedMotion || !isPinned);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 960px)');
    const update = () => setPinned(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    onBiomeSoundChange(activeBiome.id);
  }, [activeBiome.id, onBiomeSoundChange]);

  useEffect(() => {
    if (!isPinned || !sectionRef.current || !pinRef.current) return;
    const context = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>('.biome-slide');
      triggerRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 4.8}`,
        pin: pinRef.current,
        pinSpacing: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextIndex = Math.min(biomes.length - 1, Math.floor(self.progress * biomes.length));
          setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
          sectionRef.current?.style.setProperty('--biome-progress', `${self.progress}`);
          slides.forEach((slide, index) => {
            const local = self.progress * biomes.length - index;
            slide.style.setProperty('--scene-y', `${Math.max(-1.2, Math.min(1.2, local)) * -32}px`);
          });
        },
      });
    }, sectionRef);
    return () => {
      context.revert();
      triggerRef.current = null;
    };
  }, [isPinned]);

  const goToBiome = (index: number) => {
    setActiveIndex(index);
    if (isPinned && triggerRef.current) {
      const trigger = triggerRef.current;
      const top = trigger.start + ((index + 0.22) / biomes.length) * (trigger.end - trigger.start);
      window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
      return;
    }
    document.getElementById(`biome-${biomes[index].id}`)?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const onSelectorKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % biomes.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + biomes.length) % biomes.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = biomes.length - 1;
    else return;
    event.preventDefault();
    goToBiome(next);
    document.getElementById(`biome-tab-${biomes[next].id}`)?.focus();
  };

  return (
    <section
      ref={sectionRef}
      id="biomes"
      className={`biome-explorer ${isPinned ? 'is-pinned' : 'is-static'}`}
      aria-labelledby="biomes-title"
      style={{ '--biome-accent': activeBiome.accent } as React.CSSProperties}
    >
      {isPinned ? (
        <div ref={pinRef} className="biome-pin">
          <div className="biome-slides">
            {biomes.map((biome, index) => (
              <div
                key={biome.id}
                className={`biome-slide ${index === activeIndex ? 'is-active' : ''}`}
                aria-hidden={index !== activeIndex}
              >
                <BiomeArtwork biome={biome} />
              </div>
            ))}
          </div>
          <div className="biome-stage__shade" aria-hidden="true" />
          <div className="biome-stage__grid" aria-hidden="true" />
          <div className="biome-stage__top container">
            <p className="eyebrow eyebrow--light"><span className="eyebrow__block" /> The biome field guide</p>
            <div className="biome-stage__coordinates"><CompassIcon /> {activeBiome.coordinates}</div>
          </div>
          <div className="biome-stage__chapter" aria-hidden="true">
            <span>{activeBiome.index}</span><i />05
          </div>

          <div
            id="biome-panel"
            className="biome-copy"
            role="tabpanel"
            aria-labelledby={`biome-tab-${activeBiome.id}`}
            key={activeBiome.id}
          >
            <p className="biome-copy__kicker">{activeBiome.kicker}</p>
            <h2 id="biomes-title">{activeBiome.name}</h2>
            <p className="biome-copy__description">{activeBiome.description}</p>
            <p className="biome-copy__detail">{activeBiome.detail}</p>
            <div className="biome-copy__meta">
              <div><span>WATCH FOR</span><strong>{activeBiome.hazard}</strong></div>
              <div><span>BRING BACK</span><strong>{activeBiome.resources.join(' · ')}</strong></div>
            </div>
          </div>

          <div className="biome-selector-wrap">
            <div className="biome-selector__label"><span>CHOOSE A DESTINATION</span><span>SCROLL TO TRAVEL <ArrowDown /></span></div>
            <div className="biome-selector" role="tablist" aria-label="Choose a biome">
              {biomes.map((biome, index) => (
                <button
                  key={biome.id}
                  id={`biome-tab-${biome.id}`}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-controls="biome-panel"
                  tabIndex={index === activeIndex ? 0 : -1}
                  className={`biome-tab ${index === activeIndex ? 'is-active' : ''}`}
                  onClick={() => goToBiome(index)}
                  onKeyDown={(event) => onSelectorKeyDown(event, index)}
                >
                  <span className="biome-tab__thumb"><BiomeThumbnail id={biome.id} /></span>
                  <span className="biome-tab__text"><small>{biome.index} / {biome.shortName}</small><strong>{biome.name}</strong></span>
                  <ArrowUpRight className="biome-tab__arrow" />
                </button>
              ))}
            </div>
            <div className="biome-progress" aria-hidden="true">
              {biomes.map((biome, index) => <i key={biome.id} className={index <= activeIndex ? 'is-filled' : ''} />)}
            </div>
          </div>
          <p className={`biome-audio-hint ${soundEnabled ? 'is-on' : ''}`}><i /> {soundEnabled ? 'Soundscape follows your journey' : 'Turn on sound for a changing soundscape'}</p>
        </div>
      ) : (
        <div className="container biome-static-list">
          <Reveal className="section-heading section-heading--light">
            <p className="eyebrow eyebrow--light"><span className="eyebrow__block" /> The biome field guide</p>
            <h2 id="biomes-title">FIVE WORLDS.<br />ONE WAY FORWARD.</h2>
            <p>Travel from the first light of day to a sky with no ceiling.</p>
          </Reveal>
          {biomes.map((biome) => (
            <article id={`biome-${biome.id}`} className={`biome-static-card biome-static-card--${biome.id}`} key={biome.id}>
              <div className="biome-static-card__art"><BiomeArtwork biome={biome} decorative={false} /></div>
              <div className="biome-static-card__copy">
                <span className="biome-static-card__number">{biome.index} / {biome.shortName}</span>
                <h3>{biome.name}</h3>
                <p>{biome.detail}</p>
                <dl>
                  <div><dt>Watch for</dt><dd>{biome.hazard}</dd></div>
                  <div><dt>Bring back</dt><dd>{biome.resources.join(' · ')}</dd></div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
