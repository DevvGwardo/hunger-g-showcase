import { ArrowUp, ArrowUpRight, Download, VoxelMark } from './Icons';

interface FooterProps {
  onStart: () => void;
}

export function Footer({ onStart }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <a className="brand brand--footer" href="#top" aria-label="BLOCKBOUND home"><VoxelMark className="brand__mark" /><span>BLOCKBOUND</span></a>
          <p>One shared horizon.<br />Endless ways to find your own.</p>
          <a className="back-to-top" href="#top">Back to the surface <ArrowUp /></a>
        </div>
        <div className="site-footer__links">
          <nav aria-label="Footer navigation">
            <a href="#world">The world</a><a href="#biomes">Biomes</a><a href="#features">Ways to play</a><a href="#community">Community</a>
          </nav>
          <nav aria-label="Footer resources">
            <a href={`${import.meta.env.BASE_URL}blockbound-field-guide.txt`} download="BLOCKBOUND-field-guide.txt"><Download /> Field guide</a>
            <button type="button" onClick={onStart}>World seed <ArrowUpRight /></button>
          </nav>
        </div>
        <div className="site-footer__bottom">
          <p>© 2026 BLOCKBOUND. An original fan-made concept.</p>
          <p>Not affiliated with Mojang or Microsoft. Minecraft-inspired imagery is original and unofficial.</p>
          <span>MADE OF BLOCKS &amp; GOOD INTENTIONS</span>
        </div>
      </div>
    </footer>
  );
}
