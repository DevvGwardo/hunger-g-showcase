import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { galleryItems, type GalleryCategory, type GalleryItem } from '../data';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from './Icons';
import { Dialog } from './Dialog';
import { GalleryArt } from './GalleryArt';
import { BlockReveal, Reveal } from './Reveal';

interface CommunityProps {
  onDialogChange: (open: boolean) => void;
}

const categories: Array<'All' | GalleryCategory> = ['All', 'Builds', 'Adventures', 'Experiments'];

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

export function Community({ onDialogChange }: CommunityProps) {
  const [filter, setFilter] = useState<(typeof categories)[number]>('All');
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const reducedMotion = useReducedMotion();
  const filtered = filter === 'All' ? galleryItems : galleryItems.filter((item) => item.category === filter);

  const changeFilter = (next: (typeof categories)[number]) => {
    const doc = document as ViewTransitionDocument;
    if (doc.startViewTransition && !reducedMotion) {
      doc.startViewTransition(() => flushSync(() => setFilter(next)));
    } else {
      setFilter(next);
    }
  };

  const openItem = (item: GalleryItem) => {
    setSelected(item);
    onDialogChange(true);
  };

  const closeItem = () => {
    setSelected(null);
    onDialogChange(false);
  };

  const step = (direction: number) => {
    if (!selected) return;
    const index = galleryItems.findIndex((item) => item.id === selected.id);
    setSelected(galleryItems[(index + direction + galleryItems.length) % galleryItems.length]);
  };

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const index = galleryItems.findIndex((item) => item.id === selected.id);
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      setSelected(galleryItems[(index + direction + galleryItems.length) % galleryItems.length]);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [selected]);

  return (
    <section id="community" className="community-section section-pad" aria-labelledby="community-title">
      <div className="community-section__stars" aria-hidden="true" />
      <div className="container">
        <div className="community-heading">
          <Reveal>
            <p className="eyebrow eyebrow--light"><span className="eyebrow__block" /> Dispatches from the world</p>
            <h2 id="community-title" className="display-heading">
              <BlockReveal lines={['BUILT BY PLAYERS.', 'REMEMBERED BY ALL.']} />
            </h2>
          </Reveal>
          <Reveal className="community-heading__aside" delay={120}>
            <p>No render farm. No preset maps. Just people, patience, and a suspicious number of torches.</p>
            <span>PLAYER LOG / VOL. 01</span>
          </Reveal>
        </div>

        <Reveal className="gallery-toolbar">
          <span className="gallery-toolbar__count" aria-live="polite">{filtered.length} field {filtered.length === 1 ? 'note' : 'notes'}</span>
          <div className="gallery-filters" role="group" aria-label="Filter community gallery">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={filter === category}
                className={filter === category ? 'is-active' : ''}
                onClick={() => changeFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="gallery-grid" aria-live="polite">
          {filtered.map((item, index) => (
            <button
              className={`gallery-card gallery-card--${index + 1}`}
              type="button"
              key={item.id}
              onClick={() => openItem(item)}
            >
              <span className="sr-only">View </span>
              <span className="gallery-card__image"><GalleryArt item={item} /><span className="gallery-card__image-shade" /></span>
              <span className="gallery-card__topline"><span>{item.category}</span><span>{String(index + 1).padStart(2, '0')}</span></span>
              <span className="gallery-card__body">
                <span><strong>{item.title}</strong><small>by {item.creator}</small></span>
                <span className="gallery-card__open"><ArrowUpRight /></span>
              </span>
            </button>
          ))}
        </div>

        <Reveal className="community-note">
          <span className="community-note__blocks" aria-hidden="true"><i /><i /><i /></span>
          <p><strong>Your name could be on the next wall.</strong> Every landmark starts as one player’s “what if?”</p>
          <a className="text-link text-link--light" href="#begin">Find your first block <ArrowUpRight /></a>
        </Reveal>
      </div>

      <Dialog open={selected !== null} onClose={closeItem} labelledBy="gallery-dialog-title" className="dialog--gallery">
        {selected && (
          <div className="gallery-dialog">
            <div className="gallery-dialog__art"><GalleryArt item={selected} /></div>
            <div className="gallery-dialog__copy">
              <p className="eyebrow eyebrow--light"><span className="eyebrow__block" /> {selected.category} / Player log</p>
              <h2 id="gallery-dialog-title">{selected.title}</h2>
              <p className="gallery-dialog__creator">Built &amp; discovered by <strong>{selected.creator}</strong></p>
              <p className="gallery-dialog__description">{selected.description}</p>
              <p>{selected.detail}</p>
              <div className="gallery-dialog__actions">
                <button className="button button--lime" type="button" onClick={() => step(1)}>Next field note <ChevronRight /></button>
                <button className="icon-button" type="button" onClick={() => step(-1)} aria-label="Previous field note"><ChevronLeft /></button>
              </div>
              <span className="gallery-dialog__hint">Tip: use the arrow keys to move between field notes.</span>
            </div>
          </div>
        )}
      </Dialog>
    </section>
  );
}
