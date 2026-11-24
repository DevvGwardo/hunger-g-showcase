import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  alpha: number;
  phase: number;
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let running = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(56, Math.max(20, Math.round(width / 25)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.6 + 1,
        speed: Math.random() * 0.16 + 0.035,
        drift: Math.random() * 0.22 - 0.11,
        alpha: Math.random() * 0.5 + 0.16,
        phase: Math.random() * Math.PI * 2,
      }));
      if (reducedMotion) draw(0);
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.y -= particle.speed;
        particle.x += particle.drift + Math.sin(time * 0.0004 + particle.phase) * 0.08;
        if (particle.y < -6) particle.y = height + 6;
        if (particle.x < -6) particle.x = width + 6;
        if (particle.x > width + 6) particle.x = -6;
        const flicker = 0.65 + Math.sin(time * 0.001 + particle.phase) * 0.35;
        context.globalAlpha = particle.alpha * flicker;
        context.fillStyle = '#fff3c9';
        context.fillRect(particle.x, particle.y, particle.size, particle.size);
      });
      context.globalAlpha = 1;
    };

    const animate = (time: number) => {
      if (!running) return;
      draw(time);
      frame = window.requestAnimationFrame(animate);
    };

    const visibility = () => {
      running = !document.hidden;
      if (running && !reducedMotion) {
        window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(animate);
      }
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting && !document.hidden;
      window.cancelAnimationFrame(frame);
      if (running && !reducedMotion) frame = window.requestAnimationFrame(animate);
      if (running && reducedMotion) draw(0);
    });
    intersectionObserver.observe(canvas);
    document.addEventListener('visibilitychange', visibility);

    if (!reducedMotion) frame = window.requestAnimationFrame(animate);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}
