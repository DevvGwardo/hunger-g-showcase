import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';

export function usePointerParallax(
  scope: RefObject<HTMLElement | null>,
  reducedMotion: boolean,
) {
  useEffect(() => {
    const element = scope.current;
    if (!element || reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;

    const layers = Array.from(element.querySelectorAll<HTMLElement>('[data-parallax]')).map(
      (layer) => ({
        layer,
        depth: Number(layer.dataset.parallax ?? 0.1),
        x: gsap.quickTo(layer, 'x', { duration: 1.1, ease: 'power3.out' }),
        y: gsap.quickTo(layer, 'y', { duration: 1.1, ease: 'power3.out' }),
      }),
    );

    const move = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      layers.forEach(({ x: moveX, y: moveY, depth }) => {
        moveX(x * depth * 60);
        moveY(y * depth * 45);
      });
    };

    const reset = () => {
      layers.forEach(({ x, y }) => {
        x(0);
        y(0);
      });
    };

    element.addEventListener('pointermove', move, { passive: true });
    element.addEventListener('pointerleave', reset);
    return () => {
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', reset);
      layers.forEach(({ x, y }) => {
        x(0);
        y(0);
      });
    };
  }, [scope, reducedMotion]);
}
