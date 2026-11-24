import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

interface BlockRevealProps {
  lines: ReactNode[];
  className?: string;
}

export function BlockReveal({ lines, className = '' }: BlockRevealProps) {
  const reducedMotion = useReducedMotion();
  return (
    <span className={`block-reveal ${reducedMotion ? 'is-static' : ''} ${className}`}>
      {lines.map((line, index) => (
        <span className="block-reveal__line" key={index}>
          <span className="block-reveal__block" style={{ '--line-delay': `${index * 110}ms` } as CSSProperties}>
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
