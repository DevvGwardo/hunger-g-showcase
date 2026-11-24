import { useRef, type PointerEvent } from 'react';
import { features, type Feature } from '../data';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ArrowUpRight, PickaxeIcon } from './Icons';
import { FeatureArt } from './FeatureArt';
import { BlockReveal, Reveal } from './Reveal';

const fieldNotes: Record<Feature['icon'], string> = {
  pickaxe: 'Start with the community pantry near Sunmeadow’s mill. Leave what you can spare; take what you need to keep moving.',
  blocks: 'Every build can be forked into a private copy. Experiment freely—the shared world never has to pay for your “what if.”',
  lantern: 'Anyone can host an event. Pick a time, place a lantern, write one sentence of invitation, and see who shows up.',
  compass: 'World presets are only a starting point. Climate, terrain scale, permissions, and spawn rules can all be tuned independently.',
};

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const move = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.setProperty('--tilt-x', `${-y * 5}deg`);
    ref.current.style.setProperty('--tilt-y', `${x * 7}deg`);
    ref.current.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`);
    ref.current.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`);
  };

  const reset = () => {
    ref.current?.style.setProperty('--tilt-x', '0deg');
    ref.current?.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <Reveal delay={index * 80} className={`feature-reveal feature-reveal--${feature.tone}`}>
      <article
        ref={ref}
        className="feature-card"
        onPointerMove={move}
        onPointerLeave={reset}
      >
        <div className="feature-card__top"><span>{feature.number} / PLAY YOUR WAY</span><PickaxeIcon /></div>
        <div className="feature-card__art"><FeatureArt icon={feature.icon} /></div>
        <div className="feature-card__body">
          <p className="feature-card__subtitle">{feature.subtitle}</p>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
          <ul>{feature.details.map((detail) => <li key={detail}><i />{detail}</li>)}</ul>
          <details className="feature-notes">
            <summary>Open field notes <ArrowUpRight /></summary>
            <p>{fieldNotes[feature.icon]}</p>
          </details>
        </div>
        <div className="feature-card__glow" aria-hidden="true" />
      </article>
    </Reveal>
  );
}

export function Features() {
  return (
    <section id="features" className="features-section section-pad" aria-labelledby="features-title">
      <div className="container">
        <div className="features-heading">
          <Reveal>
            <p className="eyebrow"><span className="eyebrow__block" /> More than one way to play</p>
            <h2 id="features-title" className="display-heading display-heading--dark">
              <BlockReveal lines={['BUILT FOR EVERY', 'KIND OF PLAYER.']} />
            </h2>
          </Reveal>
          <Reveal className="features-heading__aside" delay={120}>
            <span className="pixel-label">NO WRONG WAY TO BEGIN</span>
            <p>Come for the survival. Stay for the skyline. Take the scenic route in between.</p>
          </Reveal>
        </div>
        <div className="feature-grid">
          {features.map((feature, index) => <FeatureCard key={feature.number} feature={feature} index={index} />)}
        </div>
        <Reveal className="features-footnote">
          <span className="features-footnote__icon" aria-hidden="true"><i /><i /><i /></span>
          <p><strong>Designed for play, not pressure.</strong> No energy timers. No paid shortcuts. Just a world that respects your time.</p>
          <span>EST. IN THE OVERWORLD</span>
        </Reveal>
      </div>
    </section>
  );
}
