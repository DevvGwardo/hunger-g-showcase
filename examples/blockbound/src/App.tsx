import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AdventureDialog } from './components/AdventureDialog';
import { BiomeExplorer } from './components/BiomeExplorer';
import { Community } from './components/Community';
import { Features } from './components/Features';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { JourneyDialog } from './components/JourneyDialog';
import { Navigation } from './components/Navigation';
import { PlayerCursor } from './components/PlayerCursor';
import { WorldIntro } from './components/WorldIntro';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useSoundscape } from './hooks/useSoundscape';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [journeyOpen, setJourneyOpen] = useState(false);
  const [adventureOpen, setAdventureOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();
  const soundscape = useSoundscape();

  useEffect(() => {
    if (reducedMotion) return;
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.05,
    });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  useEffect(() => {
    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      event.preventDefault();
      setMenuOpen(false);
      if (lenisRef.current) lenisRef.current.scrollTo(target, { duration: 1.15 });
      else target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      window.history.pushState(null, '', href);
    };
    document.addEventListener('click', onAnchorClick);
    return () => document.removeEventListener('click', onAnchorClick);
  }, [reducedMotion]);

  useEffect(() => {
    const sections = ['top', 'world', 'biomes', 'features', 'community', 'begin']
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-28% 0px -58% 0px', threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const overlayOpen = menuOpen || journeyOpen || adventureOpen || galleryOpen;
  useEffect(() => {
    if (overlayOpen) lenisRef.current?.stop();
    else lenisRef.current?.start();
    if (overlayOpen) document.body.dataset.overlayOpen = 'true';
    else delete document.body.dataset.overlayOpen;
    return () => {
      delete document.body.dataset.overlayOpen;
    };
  }, [overlayOpen]);

  useEffect(() => {
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const onMenuChange = useCallback((open: boolean) => setMenuOpen(open), []);
  const openJourney = useCallback(() => setJourneyOpen(true), []);
  const closeJourney = useCallback(() => setJourneyOpen(false), []);
  const openAdventure = useCallback(() => setAdventureOpen(true), []);
  const closeAdventure = useCallback(() => setAdventureOpen(false), []);
  const onGalleryDialogChange = useCallback((open: boolean) => setGalleryOpen(open), []);

  return (
    <>
      <a className="skip-link" href="#world">Skip to the world</a>
      <PlayerCursor />
      <Navigation
        activeSection={activeSection}
        menuOpen={menuOpen}
        onMenuChange={onMenuChange}
        soundEnabled={soundscape.enabled}
        soundSupported={soundscape.supported}
        onSoundToggle={() => void soundscape.toggle()}
      />
      <main>
        <Hero onJourney={openJourney} />
        <WorldIntro />
        <BiomeExplorer soundEnabled={soundscape.enabled} onBiomeSoundChange={soundscape.setBiome} />
        <Features />
        <Community onDialogChange={onGalleryDialogChange} />
        <FinalCTA onStart={openAdventure} />
      </main>
      <Footer onStart={openAdventure} />
      <JourneyDialog open={journeyOpen} onClose={closeJourney} />
      <AdventureDialog open={adventureOpen} onClose={closeAdventure} />
      <span className="sr-only" aria-live="polite">{soundscape.message}</span>
    </>
  );
}
