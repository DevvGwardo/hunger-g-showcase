import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function PlayerCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const cursor = ref.current;
    if (!cursor) return;
    let frame = 0;
    let x = -40;
    let y = -40;

    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        cursor.classList.toggle('is-active', Boolean((event.target as Element | null)?.closest('a, button, [role="button"]')));
        frame = 0;
      });
    };
    const leave = () => cursor.classList.remove('is-active');
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;
  return <div ref={ref} className="player-cursor" aria-hidden="true"><span /></div>;
}
