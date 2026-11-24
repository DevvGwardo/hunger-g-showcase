import { useEffect, useState } from 'react';
import { biomes } from '../data';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { BiomeArtwork } from './BiomeScenes';
import { ChevronLeft, ChevronRight, Pause, Play } from './Icons';
import { Dialog } from './Dialog';

interface JourneyDialogProps {
  open: boolean;
  onClose: () => void;
}

export function JourneyDialog({ open, onClose }: JourneyDialogProps) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reducedMotion = useReducedMotion();
  const biome = biomes[index];

  useEffect(() => {
    if (open) {
      setIndex(0);
      setPlaying(!reducedMotion);
    }
  }, [open, reducedMotion]);

  useEffect(() => {
    if (!open || !playing) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex((current) => (current + 1) % biomes.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [open, playing]);

  const step = (direction: number) => {
    setIndex((current) => (current + direction + biomes.length) % biomes.length);
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      setIndex((current) => (current + direction + biomes.length) % biomes.length);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} labelledBy="journey-dialog-title" className="dialog--journey">
      <div className="journey-player" role="region" aria-roledescription="carousel" aria-label="The BLOCKBOUND journey">
        <div className="journey-player__art" key={biome.id}><BiomeArtwork biome={biome} decorative={false} /></div>
        <div className="journey-player__shade" aria-hidden="true" />
        <div className="journey-player__topline"><span>THE JOURNEY / A FIVE-PART FIELD FILM</span><span>{biome.index} — 05</span></div>
        <div className="journey-player__copy" aria-live="polite">
          <p>{biome.kicker}</p>
          <h2 id="journey-dialog-title">{biome.name}</h2>
          <span>{biome.shortName} · {biome.coordinates}</span>
        </div>
        <div className="journey-player__controls">
          <button className="icon-button" type="button" onClick={() => step(-1)} aria-label="Previous biome"><ChevronLeft /></button>
          <button className="journey-player__play" type="button" onClick={() => setPlaying((current) => !current)} aria-label={playing ? 'Pause journey' : 'Play journey'}>
            {playing ? <Pause /> : <Play />}<span>{playing ? 'Pause' : 'Play'}</span>
          </button>
          <button className="icon-button" type="button" onClick={() => step(1)} aria-label="Next biome"><ChevronRight /></button>
        </div>
        <div className="journey-player__progress" aria-label={`Scene ${index + 1} of ${biomes.length}`}>
          {biomes.map((item, itemIndex) => (
            <button key={item.id} type="button" className={itemIndex === index ? 'is-active' : ''} onClick={() => setIndex(itemIndex)} aria-label={`Go to ${item.name}`} aria-current={itemIndex === index ? 'step' : undefined}><i /></button>
          ))}
        </div>
      </div>
    </Dialog>
  );
}
