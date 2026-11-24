import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy, Download } from './Icons';
import { Dialog } from './Dialog';

interface AdventureDialogProps {
  open: boolean;
  onClose: () => void;
}

const paths = [
  { id: 'survival', title: 'The Survivor', detail: 'Gather, build, and make the wilds feel like home.' },
  { id: 'creative', title: 'The Architect', detail: 'Start with a blank canvas and an unreasonable idea.' },
  { id: 'explorer', title: 'The Wayfarer', detail: 'Follow the light. Map the edges. Bring back stories.' },
];

export function AdventureDialog({ open, onClose }: AdventureDialogProps) {
  const [path, setPath] = useState('survival');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'manual'>('idle');

  useEffect(() => {
    if (open) {
      setPath('survival');
      setCopyState('idle');
    }
  }, [open]);

  const copySeed = async () => {
    try {
      await navigator.clipboard.writeText('FOLLOW-THE-LIGHT');
      setCopyState('copied');
    } catch {
      setCopyState('manual');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} labelledBy="adventure-dialog-title" className="dialog--adventure">
      <div className="adventure-dialog">
        <p className="eyebrow"><span className="eyebrow__block" /> Your trailhead</p>
        <h2 id="adventure-dialog-title">EVERY ADVENTURE<br />STARTS WITH A CHOICE.</h2>
        <p className="adventure-dialog__intro">Pick the path that sounds most like you. There are no wrong answers—and no account required to explore this concept.</p>
        <fieldset className="path-picker">
          <legend>Choose your first chapter</legend>
          {paths.map((item, index) => (
            <label key={item.id} className={path === item.id ? 'is-selected' : ''}>
              <input type="radio" name="playstyle" value={item.id} checked={path === item.id} onChange={() => setPath(item.id)} />
              <span className="path-picker__number">0{index + 1}</span>
              <span><strong>{item.title}</strong><small>{item.detail}</small></span>
              <i aria-hidden="true" />
            </label>
          ))}
        </fieldset>
        <div className="adventure-dialog__seed">
          <div><span>STARTER WORLD SEED</span><strong>FOLLOW-THE-LIGHT</strong></div>
          <button className="icon-button" type="button" onClick={copySeed} aria-label="Copy starter world seed">
            {copyState === 'copied' ? <Check /> : <Copy />}
          </button>
          <span className="sr-only" aria-live="polite">{copyState === 'copied' ? 'Seed copied to clipboard.' : copyState === 'manual' ? 'Copy unavailable. The seed is FOLLOW-THE-LIGHT.' : ''}</span>
        </div>
        <div className="adventure-dialog__actions">
          <a className="button button--lime" href={`${import.meta.env.BASE_URL}blockbound-field-guide.txt`} download="BLOCKBOUND-field-guide.txt"><Download /> Download field guide</a>
          <a className="text-link" href="#biomes" onClick={onClose}>Explore the map <ArrowUpRight /></a>
        </div>
        <p className="adventure-dialog__fineprint">BLOCKBOUND is an original fan-made concept. This guide is yours to keep.</p>
      </div>
    </Dialog>
  );
}
