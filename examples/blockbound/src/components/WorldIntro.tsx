import { useEffect, useRef, useState } from 'react';
import { biomes } from '../data';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ArrowDown, ArrowUpRight, CompassIcon } from './Icons';
import { BlockReveal, Reveal } from './Reveal';

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(value);
      return;
    }
    const element = ref.current;
    if (!element) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 1200);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(value * eased));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion, value]);

  return (
    <span ref={ref} className="counter">
      <span className="sr-only">{value}{suffix}</span>
      <span aria-hidden="true">{display.toLocaleString()}{suffix}</span>
    </span>
  );
}

const strip = [...biomes, ...biomes];

export function WorldIntro() {
  return (
    <section id="world" className="world-section section-pad" aria-labelledby="world-title">
      <div className="world-section__texture" aria-hidden="true" />
      <div className="container">
        <div className="world-intro-grid">
          <Reveal>
            <p className="eyebrow"><span className="eyebrow__block" /> A world with a memory</p>
            <h2 id="world-title" className="display-heading display-heading--dark">
              <BlockReveal lines={['NOT JUST A MAP.', 'A PLACE TO BELONG.']} />
            </h2>
          </Reveal>
          <Reveal className="world-intro-copy" delay={120}>
            <p className="lead-copy">
              BLOCKBOUND is a shared world being written one block at a time. Some players follow the quests.
              Some build the places everyone else dreams of finding.
            </p>
            <p>
              No chosen heroes. No fixed story. Just a horizon, a handful of tools, and a community that
              believes the journey is better when someone saves you a seat by the fire.
            </p>
            <a className="text-link" href="#biomes">See what’s out there <ArrowUpRight /></a>
          </Reveal>
        </div>

        <Reveal className="world-coordinate" delay={160}>
          <CompassIcon />
          <span>WORLD 001</span>
          <span className="world-coordinate__line" />
          <span>SEED: FOLLOW-THE-LIGHT</span>
          <span className="world-coordinate__status"><i /> Shared &amp; persistent</span>
        </Reveal>

        <div className="stat-grid" aria-label="World statistics">
          <Reveal className="stat-card" delay={0}>
            <span className="stat-card__index">01 / HORIZONS</span>
            <strong><Counter value={5} /></strong>
            <p>Distinct biomes, each with its own rhythm.</p>
            <span className="stat-card__corner" aria-hidden="true" />
          </Reveal>
          <Reveal className="stat-card" delay={90}>
            <span className="stat-card__index">02 / LANDMARKS</span>
            <strong><Counter value={48} /></strong>
            <p>Player-made places worth getting lost for.</p>
            <span className="stat-card__corner" aria-hidden="true" />
          </Reveal>
          <Reveal className="stat-card" delay={180}>
            <span className="stat-card__index">03 / POSSIBILITY</span>
            <strong><Counter value={1} /><small> shared horizon</small></strong>
            <p>Every path connects to someone else’s story.</p>
            <span className="stat-card__corner" aria-hidden="true" />
          </Reveal>
        </div>
      </div>

      <div className="biome-marquee" aria-hidden="true">
        <div className="biome-marquee__track">
          {strip.map((biome, index) => (
            <div className="biome-marquee__item" key={`${biome.id}-${index}`}>
              <span>{biome.index}</span>{biome.name}<i style={{ background: biome.accent }} />
            </div>
          ))}
        </div>
      </div>
      <a className="world-scroll-cue" href="#biomes"><ArrowDown /> Keep traveling</a>
      <ul className="sr-only">
        {biomes.map((biome) => <li key={biome.id}>{biome.name}: {biome.description}</li>)}
      </ul>
    </section>
  );
}
