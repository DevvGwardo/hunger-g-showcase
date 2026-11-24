import { useEffect, useRef } from 'react';
import { ArrowUpRight, CloseIcon, MenuIcon, VoxelMark, VolumeOff, VolumeOn } from './Icons';

interface NavigationProps {
  activeSection: string;
  menuOpen: boolean;
  onMenuChange: (open: boolean) => void;
  soundEnabled: boolean;
  soundSupported: boolean;
  onSoundToggle: () => void;
}

const links = [
  { href: '#world', label: 'The world', id: 'world' },
  { href: '#biomes', label: 'Biomes', id: 'biomes' },
  { href: '#features', label: 'Ways to play', id: 'features' },
  { href: '#community', label: 'Community', id: 'community' },
];

export function Navigation({
  activeSection,
  menuOpen,
  onMenuChange,
  soundEnabled,
  soundSupported,
  onSoundToggle,
}: NavigationProps) {
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      headerRef.current?.style.setProperty('--scroll-progress', `${max > 0 ? window.scrollY / max : 0}`);
      headerRef.current?.classList.toggle('is-scrolled', window.scrollY > 24);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.dataset.menuOpen = 'true';
    panelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onMenuChange(false);
        menuButtonRef.current?.focus();
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>('a, button:not([disabled])'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      delete document.body.dataset.menuOpen;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen, onMenuChange]);

  return (
    <header ref={headerRef} className="site-header">
      <a className="brand" href="#top" aria-label="BLOCKBOUND home" onClick={() => onMenuChange(false)}>
        <VoxelMark className="brand__mark" />
        <span>BLOCKBOUND</span>
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href} aria-current={activeSection === link.id ? 'location' : undefined}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="site-header__actions">
        <button
          className="sound-button"
          type="button"
          onClick={onSoundToggle}
          disabled={!soundSupported}
          aria-pressed={soundEnabled}
          aria-label={soundEnabled ? 'Sound on. Turn ambient sound off' : 'Sound off. Turn ambient sound on'}
          title={soundSupported ? 'Quiet synthesized ambience — never autoplays' : 'Audio is unavailable in this browser'}
        >
          {soundEnabled ? <VolumeOn /> : <VolumeOff />}
          <span className="sound-button__label">Sound {soundEnabled ? 'on' : 'off'}</span>
          <span className="sound-button__bars" aria-hidden="true"><i /><i /><i /></span>
        </button>
        <a className="button button--small button--lime header-cta" href="#begin">
          Join the realm <ArrowUpRight />
        </a>
        <button
          ref={menuButtonRef}
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => onMenuChange(!menuOpen)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div ref={panelRef} id="mobile-menu" className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => (
            <a key={link.href} href={link.href} onClick={() => onMenuChange(false)} aria-current={activeSection === link.id ? 'location' : undefined}>
              <span>0{index + 1}</span>{link.label}<ArrowUpRight />
            </a>
          ))}
          <a className="button button--lime" href="#begin" onClick={() => onMenuChange(false)}>Join the realm <ArrowUpRight /></a>
        </nav>
        <p>One shared horizon. Endless ways to find your own.</p>
      </div>
      <div className="site-header__progress" aria-hidden="true" />
    </header>
  );
}
