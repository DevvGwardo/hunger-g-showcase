import type { CSSProperties } from 'react';
import { ArrowUpRight, CompassIcon } from './Icons';
import { BlockReveal, Reveal } from './Reveal';
import { StrongholdScene } from './StrongholdScene';

interface FinalCTAProps {
  onStart: () => void;
}

export function FinalCTA({ onStart }: FinalCTAProps) {
  return (
    <section id="begin" className="final-section" aria-labelledby="final-title">
      <StrongholdScene />
      <div className="portal" aria-hidden="true">
        <div className="portal__aura" />
        <div className="portal__frame">
          <i className="portal__stone portal__stone--1" /><i className="portal__stone portal__stone--2" />
          <i className="portal__stone portal__stone--3" /><i className="portal__stone portal__stone--4" />
          <i className="portal__stone portal__stone--5" /><i className="portal__stone portal__stone--6" />
          <div className="portal__surface">
            <div className="portal__swirl" />
            {Array.from({ length: 16 }, (_, index) => (
              <i
                key={index}
                style={{
                  '--particle-x': `${(index * 29 + 7) % 100}%`,
                  '--particle-delay': `${(index % 8) * -0.7}s`,
                  '--particle-duration': `${3.5 + (index % 4)}s`,
                } as CSSProperties}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="final-section__topline"><span><i /> NIGHT CYCLE / 02:13</span><span><CompassIcon /> THE STRONGHOLD</span></div>
      <div className="final-content container">
        <Reveal>
          <p className="eyebrow eyebrow--light"><span className="eyebrow__block" /> Your next chapter</p>
          <h2 id="final-title" className="final-title"><BlockReveal lines={['THE WORLD', 'IS WAITING.']} /></h2>
          <p className="final-content__copy">Bring a friend. Bring an idea. Bring nothing but curiosity.</p>
          <div className="final-content__actions">
            <button className="button button--lime button--large" type="button" onClick={onStart}>Start your adventure <ArrowUpRight /></button>
            <a className="button button--ghost button--large" href="#biomes">Explore the map <CompassIcon /></a>
          </div>
        </Reveal>
      </div>
      <div className="final-section__edge" aria-hidden="true"><i /><i /><i /><i /><i /></div>
    </section>
  );
}
