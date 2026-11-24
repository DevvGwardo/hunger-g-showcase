import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePointerParallax } from '../hooks/usePointerParallax';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ArrowDown, ArrowUpRight, CompassIcon, PickaxeIcon, Play } from './Icons';
import { HeroLandscape } from './HeroLandscape';
import { ParticleField } from './ParticleField';
import { BlockReveal } from './Reveal';

gsap.registerPlugin(ScrollTrigger);

export function Hero({ onJourney }: { onJourney: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  usePointerParallax(ref, reducedMotion);

  useEffect(() => {
    if (reducedMotion || !ref.current) return;
    const context = gsap.context(() => {
      gsap.utils.toArray<SVGGElement>('[data-scroll-speed]').forEach((layer) => {
        gsap.to(layer, {
          yPercent: Number(layer.dataset.scrollSpeed ?? 0),
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.1,
          },
        });
      });
      gsap.to('.hero-copy', {
        y: -70,
        opacity: 0.12,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: '18% top', end: 'bottom top', scrub: 1 },
      });
      gsap.to('.hero-hud', {
        y: -32,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: '35% top', end: '85% top', scrub: 1 },
      });
    }, ref);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={ref} id="top" className="hero" aria-labelledby="hero-title">
      <HeroLandscape />
      <ParticleField />
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero-copy container">
        <p className="hero-copy__eyebrow"><span>SEASON 01</span><i /> THE WILDS AWAIT</p>
        <h1 id="hero-title" className="hero-title">
          <BlockReveal lines={[<>YOUR NEXT</>, <>ADVENTURE</>, <><span>STARTS HERE.</span></>]} />
        </h1>
        <p className="hero-copy__intro">Five biomes. One shared horizon. A world that becomes more yours with every block.</p>
        <div className="hero-copy__actions">
          <a className="button button--lime button--large" href="#world">Enter the world <ArrowUpRight /></a>
          <button className="button button--glass button--large" type="button" onClick={onJourney}><Play /> Watch the journey</button>
        </div>
      </div>

      <div className="hero-tool" aria-hidden="true"><PickaxeIcon /><span>FIRST TOOL<br /><strong>YOUR CURIOSITY</strong></span></div>

      <div className="hero-hud">
        <a className="scroll-cue" href="#world" aria-label="Scroll to explore the world"><span><ArrowDown /></span><small>SCROLL TO EXPLORE</small></a>
        <div className="hero-compass" aria-hidden="true">
          <span className="hero-compass__label">N</span>
          <CompassIcon />
          <span className="hero-compass__coords">128 / −416</span>
        </div>
        <div className="day-indicator">
          <span className="day-indicator__sun" aria-hidden="true"><i /></span>
          <div><small>DAY 01 / SUNMEADOW</small><strong>06:42 <span>· SUNRISE</span></strong></div>
          <div className="day-indicator__cycle" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
        </div>
      </div>
      <div className="hero__edge" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
    </section>
  );
}
