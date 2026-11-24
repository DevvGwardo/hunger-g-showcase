import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

export function GameMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 44" fill="none" aria-hidden="true">
      <path d="m20 2 17 9v22l-17 9L3 33V11Z" fill="currentColor" />
      <path d="m20 2 17 9-17 9L3 11Z" fill="#fff" fillOpacity=".48" />
      <path d="M20 20v22L3 33V11Z" fill="#000" fillOpacity=".18" />
      <path d="m13 15 7-4 7 4-7 4Z" fill="#fff" fillOpacity=".8" />
    </svg>
  );
}

interface GameNavProps {
  name: string;
  inspiration: string;
  links: Array<{ href: string; label: string }>;
}

export function GameNav({ name, inspiration, links }: GameNavProps) {
  return (
    <header className="game-nav">
      <a className="game-brand" href="#top">
        <GameMark />
        <span>{name}<small>{inspiration}</small></span>
      </a>
      <nav aria-label={`${name} navigation`}>
        {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
      </nav>
      <a className="game-nav__cta" href="#begin">Begin <span aria-hidden="true">↗</span></a>
    </header>
  );
}

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ '--delay': `${delay}ms` } as CSSProperties}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? 'eyebrow--light' : ''}`}><span aria-hidden="true" />{children}</p>;
}

export function GameFooter({ name, inspiration, note }: { name: string; inspiration: string; note: string }) {
  return (
    <footer className="game-footer">
      <div className="game-footer__inner">
        <a className="game-brand" href="#top"><GameMark /><span>{name}<small>{inspiration}</small></span></a>
        <p>{note}</p>
        <a href="#top">Back to the surface <span aria-hidden="true">↑</span></a>
      </div>
      <p className="game-footer__disclaimer">An original fan-made concept inspired by {inspiration.replace('A ', '').replace('-inspired concept', '')}. Not affiliated with the original game's creators or publishers. All artwork and copy are original.</p>
    </footer>
  );
}
