import { useState, type CSSProperties } from 'react';
import { EmberScene } from '../../shared/scenes';
import { Eyebrow, GameFooter, GameNav, Reveal } from '../../shared/game-ui';

type BoonId = 'blade' | 'flame' | 'tide' | 'night';
type WeaponId = 'pike' | 'chain' | 'fists';
type HouseId = 'cinder' | 'choir' | 'glass' | 'archive';

interface Boon {
  id: BoonId;
  name: string;
  title: string;
  domain: string;
  color: string;
  pale: string;
  description: string;
  passive: string;
  active: string;
  cooldown: string;
  stats: Array<{ value: string; label: string }>;
  flavor: string;
}

const BOONS: Boon[] = [
  {
    id: 'blade',
    name: 'Cinder Edge',
    title: 'Blade',
    domain: 'The Forge That Remembers',
    color: '#ed7954',
    pale: '#ffd6ad',
    description: 'A barbed sliver of furnace-glass turns every strike into a promise kept in blood and sparks.',
    passive: 'Every third hit fractures enemy guard.',
    active: 'Sunder: a lunging cut that ignores armor.',
    cooldown: '6 sec',
    stats: [
      { value: '+24%', label: 'Strike damage' },
      { value: '18%', label: 'Guard break' },
      { value: '3-hit', label: 'Passive cycle' },
    ],
    flavor: 'What is broken can still draw blood.',
  },
  {
    id: 'flame',
    name: 'Ashen Wake',
    title: 'Flame',
    domain: 'The Hearth Without End',
    color: '#f2a84b',
    pale: '#ffe1a3',
    description: 'A coal-red blessing leaves a trailing furnace in your wake and rewards courage over caution.',
    passive: 'Moving through fire restores resolve.',
    active: 'Immolate: erupt in a ring of living cinders.',
    cooldown: '8 sec',
    stats: [
      { value: '+16', label: 'Burn damage' },
      { value: '4 sec', label: 'Fire trail' },
      { value: '12%', label: 'Resolve gain' },
    ],
    flavor: 'The dark is only fuel waiting for a name.',
  },
  {
    id: 'tide',
    name: 'Undertow',
    title: 'Tide',
    domain: 'The River Beneath Stone',
    color: '#54c9bd',
    pale: '#bff9eb',
    description: 'Cold black water coils around your weapon, turning perfect defense into a patient kind of violence.',
    passive: 'Deflects return a portion of vitality.',
    active: 'Backwash: pull foes close and break their stance.',
    cooldown: '7 sec',
    stats: [
      { value: '+20%', label: 'Deflect window' },
      { value: '3.4m', label: 'Current reach' },
      { value: '8%', label: 'Life returned' },
    ],
    flavor: 'Even stone learns the shape of the river.',
  },
  {
    id: 'night',
    name: 'Veilstep',
    title: 'Night',
    domain: 'The Silence Between Stars',
    color: '#a99be8',
    pale: '#ddd5ff',
    description: 'A fold of starless shadow hides the first mistake—and makes the second one impossible to follow.',
    passive: 'The first hit from concealment is ignored.',
    active: 'Eclipse: vanish, then reappear behind a foe.',
    cooldown: '9 sec',
    stats: [
      { value: '+30%', label: 'Critical chance' },
      { value: '1 hit', label: 'Damage veil' },
      { value: '5m', label: 'Shadow step' },
    ],
    flavor: 'No light ever learned where you went.',
  },
];

interface Weapon {
  id: WeaponId;
  name: string;
  type: string;
  description: string;
  reach: string;
  reachValue: number;
  speed: string;
  speedValue: number;
  impact: string;
  impactValue: number;
  trait: string;
}

const WEAPONS: Weapon[] = [
  {
    id: 'pike',
    name: 'Ember Pike',
    type: 'Reach / Precision',
    description: 'A cathedral-long spear with a molten core. Keep the furnace at a distance and punctuate every opening.',
    reach: '3.2m',
    reachValue: 84,
    speed: '1.10×',
    speedValue: 72,
    impact: '62',
    impactValue: 62,
    trait: 'Third thrust casts a forward ember.',
  },
  {
    id: 'chain',
    name: 'Gravechain',
    type: 'Hook / Control',
    description: 'Links of dark iron remember every oath. Drag enemies off balance, then answer with the chain’s weighted end.',
    reach: '4.8m',
    reachValue: 96,
    speed: '0.78×',
    speedValue: 52,
    impact: '78',
    impactValue: 78,
    trait: 'Pulled foes take bonus critical damage.',
  },
  {
    id: 'fists',
    name: 'Cinder Fists',
    type: 'Brawler / Tempo',
    description: 'Obsidian knuckles packed with a captive flame. Fast enough to turn defense into a devastating rhythm.',
    reach: '1.4m',
    reachValue: 38,
    speed: '1.45×',
    speedValue: 94,
    impact: '88',
    impactValue: 88,
    trait: 'Every five punches causes a small eruption.',
  },
];

const HOUSES: Array<{
  id: HouseId;
  house: string;
  name: string;
  role: string;
  archetype: string;
  quote: string;
  color: string;
}> = [
  {
    id: 'cinder',
    house: 'The Cinder Court',
    name: 'Sera Vey',
    role: 'The Crownless Queen',
    archetype: 'Sovereign of the furnace',
    quote: 'A throne is only a door that forgot how to open.',
    color: '#df7657',
  },
  {
    id: 'choir',
    house: 'The Ledger Choir',
    name: 'Oren Pell',
    role: 'The Last Cantor',
    archetype: 'Keeper of borrowed names',
    quote: 'Every debt must learn to sing before it sleeps.',
    color: '#d6b76b',
  },
  {
    id: 'glass',
    house: 'The Glass Vigil',
    name: 'Maera Quill',
    role: 'The Hollow Warden',
    archetype: 'Oathbound sentinel',
    quote: 'Even broken glass remembers the shape of the light.',
    color: '#76c6c2',
  },
  {
    id: 'archive',
    house: 'The Drowned Archive',
    name: 'Nix Sable',
    role: 'The Tidekeeper',
    archetype: 'Archivist of erased tides',
    quote: 'What the river forgets, I keep.',
    color: '#9c94d7',
  },
];

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {diagonal ? (
        <path d="M6 18 18 6M7 6h11v11" stroke="currentColor" strokeWidth="1.7" />
      ) : (
        <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" />
      )}
    </svg>
  );
}

function OathMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <path d="m60 4 48 27v58l-48 27-48-27V31Z" stroke="currentColor" strokeWidth="1" />
      <path d="m60 14 38 21v46l-38 21-38-21V35Z" stroke="currentColor" strokeOpacity=".35" />
      <path d="M67 28c2 13-5 16-4 25 7-4 10-9 9-16 11 12 13 24 5 32-7 8-20 9-29 3-10-8-9-21-3-30 0 9 3 13 7 14-2-12 8-16 15-28Z" fill="currentColor" />
      <path d="M60 53c6 7 6 14 0 20-7-4-8-11-4-16Z" fill="#fff" fillOpacity=".82" />
      <path d="M30 60h13m34 0h13" stroke="currentColor" />
    </svg>
  );
}

function BoonGlyph({ id, className = '' }: { id: BoonId; className?: string }) {
  const common = {
    className: `boon-glyph ${className}`,
    viewBox: '0 0 120 120',
    fill: 'none',
    'aria-hidden': true,
  } as const;

  if (id === 'blade') {
    return (
      <svg {...common}>
        <path d="m28 92 52-64 14 11-52 65-14-12Z" fill="currentColor" fillOpacity=".18" />
        <path d="m28 92 52-64 14 11-52 65-14-12Z" stroke="currentColor" strokeWidth="2" />
        <path d="m34 85 48-51M44 80l9 8M20 84l18 17M14 98l10 10" stroke="currentColor" strokeWidth="2" />
        <path d="m59 36 9-12 16 13-8 11Z" fill="currentColor" />
        <circle cx="60" cy="60" r="48" stroke="currentColor" strokeOpacity=".2" strokeDasharray="2 8" />
      </svg>
    );
  }

  if (id === 'flame') {
    return (
      <svg {...common}>
        <path d="M64 14c4 24-9 29-5 45 11-7 17-18 15-29 21 19 27 44 11 60-14 15-42 15-57 0-17-17-13-43 1-62 1 15 5 23 12 25-2-19 13-26 23-39Z" fill="currentColor" fillOpacity=".2" />
        <path d="M64 14c4 24-9 29-5 45 11-7 17-18 15-29 21 19 27 44 11 60-14 15-42 15-57 0-17-17-13-43 1-62 1 15 5 23 12 25-2-19 13-26 23-39Z" stroke="currentColor" strokeWidth="2" />
        <path d="M61 62c12 14 13 25 3 35-12-7-16-19-10-29Z" fill="currentColor" />
        <path d="M20 29 13 21m84 8 8-8M17 67H6m108 0h-9" stroke="currentColor" strokeOpacity=".55" />
      </svg>
    );
  }

  if (id === 'tide') {
    return (
      <svg {...common}>
        <path d="M17 43c16-15 29-15 43 0s27 15 43 0M17 61c16-15 29-15 43 0s27 15 43 0M17 79c16-15 29-15 43 0s27 15 43 0" stroke="currentColor" strokeWidth="3" />
        <path d="M17 43c16-15 29-15 43 0s27 15 43 0M17 61c16-15 29-15 43 0s27 15 43 0M17 79c16-15 29-15 43 0s27 15 43 0" stroke="currentColor" strokeOpacity=".2" strokeWidth="12" />
        <path d="m80 25 9 8-9 8-9-8Z" fill="currentColor" />
        <circle cx="60" cy="60" r="48" stroke="currentColor" strokeOpacity=".2" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M77 20c-28 7-47 27-47 52 0 17 10 29 26 32-8-12-9-24-2-36 8 10 19 13 32 8-14 7-23 18-24 31 22-3 36-18 39-40 3-19-6-35-24-47Z" fill="currentColor" fillOpacity=".22" />
      <path d="M77 20c-28 7-47 27-47 52 0 17 10 29 26 32-8-12-9-24-2-36 8 10 19 13 32 8-14 7-23 18-24 31 22-3 36-18 39-40 3-19-6-35-24-47Z" stroke="currentColor" strokeWidth="2" />
      <path d="m83 16 5 9 10 1-8 7 3 10-10-5-9 5 2-10-7-7 10-1Z" fill="currentColor" />
      <circle cx="30" cy="28" r="2" fill="currentColor" />
      <circle cx="19" cy="82" r="2" fill="currentColor" />
    </svg>
  );
}

function WeaponIllustration({ id }: { id: WeaponId }) {
  return (
    <svg className="weapon-illustration" viewBox="0 0 540 430" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`metal-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#6e7478" />
          <stop offset=".48" stopColor="#1a2026" />
          <stop offset="1" stopColor="#080b0e" />
        </linearGradient>
        <linearGradient id={`heat-${id}`} x1="0" y1="1" x2="1" y2="0">
          <stop stopColor="#8f281f" />
          <stop offset=".55" stopColor="#ef7950" />
          <stop offset="1" stopColor="#f7d38b" />
        </linearGradient>
        <filter id={`glow-${id}`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g opacity=".28" stroke="#d9b46a" strokeWidth="1">
        <circle cx="270" cy="215" r="145" strokeDasharray="2 11" />
        <circle cx="270" cy="215" r="166" />
        <path d="M105 215h330M270 50v330" strokeDasharray="1 12" />
      </g>
      {id === 'pike' && (
        <g transform="rotate(32 270 215)">
          <path d="m270 35 24 74-24 43-24-43Z" fill={`url(#metal-${id})`} stroke="#b8b9b1" />
          <path d="m270 46 10 66-10 32-10-32Z" fill={`url(#heat-${id})`} filter={`url(#glow-${id})`} />
          <path d="M248 150h44v22h-44Z" fill="#b28a4d" />
          <path d="M258 172h24v195h-24Z" fill={`url(#metal-${id})`} stroke="#6d6251" />
          <path d="M265 176v182" stroke={`url(#heat-${id})`} strokeWidth="3" />
          <path d="M252 367h36v16h-36Z" fill="#b28a4d" />
        </g>
      )}
      {id === 'chain' && (
        <g transform="rotate(-21 270 215)">
          <path d="M270 58c-62 0-82 45-59 82 14 22 45 30 59 17 14 13 45 5 59-17 23-37 3-82-59-82Z" stroke={`url(#metal-${id})`} strokeWidth="19" />
          <path d="M270 68c-52 0-68 37-50 68 12 18 34 23 50 13 16 10 38 5 50-13 18-31 2-68-50-68Z" stroke="#777064" strokeWidth="2" />
          <path d="M270 157v38m-29 8 29 31 29-31" stroke="#8e754c" strokeWidth="16" />
          <path d="M247 219h46l22 157h-90Z" fill={`url(#metal-${id})`} stroke="#69645c" />
          <path d="m270 230 14 39-14 26-14-26Z" fill={`url(#heat-${id})`} filter={`url(#glow-${id})`} />
        </g>
      )}
      {id === 'fists' && (
        <g transform="rotate(-8 270 215)">
          <path d="M182 94h91l24 56-17 27v115c0 26-105 26-105 0V177l-17-27Z" fill={`url(#metal-${id})`} stroke="#7c7263" strokeWidth="2" />
          <path d="M198 112h58l16 43-18 22h-54l-18-22Z" fill="#11161b" stroke="#8b7550" />
          <path d="m227 128 43-17 43 17-17 43-26 17-26-17Z" fill={`url(#heat-${id})`} filter={`url(#glow-${id})`} />
          <path d="M187 183h81v105c0 17-81 17-81 0Z" stroke="#665f55" />
          <path d="M202 202h51M202 225h51M202 248h51" stroke="#8e7959" strokeWidth="4" />
          <path d="M175 282h99v38h-99Z" fill="#b28a4d" />
        </g>
      )}
      <g fill="#ef7950">
        <circle cx="88" cy="107" r="3" />
        <circle cx="448" cy="140" r="2" />
        <circle cx="401" cy="344" r="3" />
        <circle cx="126" cy="327" r="2" />
      </g>
    </svg>
  );
}

function FactionPortrait({ id }: { id: HouseId }) {
  return (
    <svg className="faction-portrait" viewBox="0 0 320 390" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`portrait-bg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="currentColor" stopOpacity=".28" />
          <stop offset="1" stopColor="#090b0e" stopOpacity=".1" />
        </linearGradient>
        <linearGradient id={`portrait-cloak-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="currentColor" stopOpacity=".72" />
          <stop offset="1" stopColor="#090b0e" />
        </linearGradient>
      </defs>
      <rect width="320" height="390" fill={`url(#portrait-bg-${id})`} />
      <path d="M20 310 160 220l140 90M20 340l140-80 140 80M40 370l120-65 120 65" stroke="currentColor" strokeOpacity=".25" />
      <circle cx="160" cy="148" r="102" stroke="currentColor" strokeOpacity=".22" />
      <circle cx="160" cy="148" r="87" stroke="currentColor" strokeOpacity=".12" strokeDasharray="2 8" />
      {id === 'cinder' && (
        <g>
          <path d="M57 390c8-103 41-157 103-157s95 54 103 157Z" fill={`url(#portrait-cloak-${id})`} />
          <path d="M116 189h88l-8 62-36 33-36-33Z" fill="#14171b" stroke="currentColor" strokeWidth="2" />
          <path d="m108 142 18-56 34 29 34-29 18 56-23 55h-58Z" fill="#171b20" stroke="currentColor" strokeWidth="2" />
          <path d="m117 139 43 25 43-25M143 91v73m34-73v73" stroke="currentColor" strokeOpacity=".7" />
          <path d="m100 79 19-39 19 39 22-54 20 54 22 4-19 38h-84Z" fill="currentColor" fillOpacity=".78" />
          <path d="M90 390c7-75 33-115 70-115s63 40 70 115" stroke="currentColor" strokeOpacity=".55" />
          <path d="m160 276-19 30 19 31 19-31Z" fill={`url(#portrait-cloak-${id})`} />
        </g>
      )}
      {id === 'choir' && (
        <g>
          <path d="M45 390c15-95 51-149 115-149s100 54 115 149Z" fill={`url(#portrait-cloak-${id})`} />
          <path d="M113 199h94l-10 70-37 28-37-28Z" fill="#11151a" stroke="currentColor" />
          <path d="M116 143c0-46 88-46 88 0v57c0 36-88 36-88 0Z" fill="#15191e" stroke="currentColor" strokeWidth="2" />
          <path d="M116 143c15-13 24-44 23-74h42c-1 30 8 61 23 74Z" fill="#101419" stroke="currentColor" />
          <path d="M130 151h60M130 170h60M140 151v50m20-50v50m20-50v50" stroke="currentColor" strokeWidth="2" />
          <circle cx="160" cy="194" r="13" fill="currentColor" />
          <path d="M88 390c3-79 30-121 72-121s69 42 72 121" stroke="currentColor" strokeOpacity=".55" />
          <path d="m67 325 32-44 32 44m110 0-32-44-32 44" stroke="currentColor" strokeWidth="2" />
        </g>
      )}
      {id === 'glass' && (
        <g>
          <path d="m51 390 32-139 77-36 77 36 32 139Z" fill={`url(#portrait-cloak-${id})`} />
          <path d="m113 202 47-27 47 27-8 67-39 28-39-28Z" fill="#11161b" stroke="currentColor" strokeWidth="2" />
          <path d="m121 119 39-55 39 55-13 73h-52Z" fill="#14191e" stroke="currentColor" strokeWidth="2" />
          <path d="m160 64 15 69-15 56-15-56Z" fill="currentColor" fillOpacity=".55" />
          <path d="M108 121h104M113 289h94M97 332h126" stroke="currentColor" strokeWidth="2" />
          <path d="m69 390 44-66 47 66m90 0-44-66-47 66" stroke="currentColor" strokeOpacity=".6" />
          <path d="m93 94 15-30 19 30m59 0 15-30 19 30" stroke="currentColor" strokeWidth="3" />
        </g>
      )}
      {id === 'archive' && (
        <g>
          <path d="M49 390c18-107 52-159 111-159s93 52 111 159Z" fill={`url(#portrait-cloak-${id})`} />
          <path d="M109 194h102l-10 75-41 29-41-29Z" fill="#0e1419" stroke="currentColor" strokeWidth="2" />
          <path d="M113 145c0-45 94-45 94 0v60c0 39-94 39-94 0Z" fill="#12171c" stroke="currentColor" strokeWidth="2" />
          <path d="M113 145c17-21 22-61 19-93h56c-3 32 2 72 19 93Z" fill="#0e1318" stroke="currentColor" />
          <path d="M126 146c23 14 45 14 68 0M128 171c20 12 44 12 64 0" stroke="currentColor" strokeWidth="2" />
          <circle cx="160" cy="194" r="14" fill="currentColor" fillOpacity=".82" />
          <path d="M76 390c7-78 35-119 84-119s77 41 84 119" stroke="currentColor" strokeOpacity=".55" />
          <path d="M76 272c30 20 54 20 84 0 30 20 54 20 84 0M68 300c35 22 61 22 92 0 31 22 57 22 92 0" stroke="currentColor" strokeWidth="2" />
        </g>
      )}
      <path d="M18 18h32M18 18v32m284-32h-32m32 0v32M18 358v14h32m252-14v14h-32" stroke="currentColor" strokeOpacity=".55" />
    </svg>
  );
}

function App() {
  const [selectedBoonId, setSelectedBoonId] = useState<BoonId>('blade');
  const [boundBoonId, setBoundBoonId] = useState<BoonId | null>(null);
  const [bindMessage, setBindMessage] = useState('No boon bound. Choose one below.');
  const [selectedWeaponId, setSelectedWeaponId] = useState<WeaponId>('pike');
  const [randomBoon, setRandomBoon] = useState<Boon | null>(null);
  const [rollCount, setRollCount] = useState(0);
  const [rollMessage, setRollMessage] = useState('The furnace is waiting for your oath.');

  const selectedBoon = BOONS.find((boon) => boon.id === selectedBoonId)!;
  const selectedWeapon = WEAPONS.find((weapon) => weapon.id === selectedWeaponId)!;

  function bindBoon() {
    setBoundBoonId(selectedBoon.id);
    setBindMessage(`${selectedBoon.name} is bound to your next descent.`);
  }

  function rollBoon() {
    const nextBoon = BOONS[Math.floor(Math.random() * BOONS.length)];
    setRandomBoon(nextBoon);
    setSelectedBoonId(nextBoon.id);
    setBoundBoonId(nextBoon.id);
    setRollCount((count) => count + 1);
    setRollMessage(`${nextBoon.name} answers the roll and is now bound to your run.`);
  }

  return (
    <div className="ember-app">
      <a className="skip-link" href="#main">Skip to content</a>
      <GameNav
        name="EMBER OATH"
        inspiration=""
        links={[
          { href: '#boons', label: 'The boons' },
          { href: '#arsenal', label: 'The escape loop' },
          { href: '#houses', label: 'The houses' },
        ]}
      />

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-art"><EmberScene /></div>
          <div className="hero-vignette" aria-hidden="true" />
          <div className="hero-embers" aria-hidden="true">
            {Array.from({ length: 22 }, (_, index) => (
              <i
                key={index}
                style={{
                  '--ember-x': `${(index * 37 + 11) % 100}%`,
                  '--ember-delay': `${-((index * 1.7) % 11)}s`,
                  '--ember-duration': `${8 + (index % 6)}s`,
                  '--ember-size': `${index % 4 === 0 ? 3 : 2}px`,
                } as CSSProperties}
              />
            ))}
          </div>

          <div className="hero-content container">
            <div className="hero-kicker">
              <span>Fan-made roguelike concept</span>
              <i aria-hidden="true" />
              <span>Vol. I / The Obsidian Throne</span>
            </div>
            <h1 id="hero-title" className="hero-title" aria-label="Defy the descent">
              <span>Defy</span>
              <span className="hero-title__second">The <em>Descent</em></span>
            </h1>
            <p className="hero-copy">
              The throne is a furnace. The way out is a promise. Forge a new path through a dying
              underworld—one life, one blade, one impossible escape at a time.
            </p>
            <div className="hero-actions">
              <a className="button button--primary" href="#begin">Take the oath <ArrowIcon diagonal /></a>
              <a className="button button--secondary" href="#boons">Choose your boon <ArrowIcon /></a>
            </div>
          </div>

          <div className="hero-rail" aria-hidden="true">
            <span>ABYSSAL COORDINATES</span>
            <b>09° 41′ S</b>
            <i />
            <span>THE FURNACE BELOW</span>
          </div>

          <div className="hero-footer container">
            <a className="hero-scroll" href="#boons">
              <span className="hero-scroll__mark" aria-hidden="true">↓</span>
              <span>Descend into the concept</span>
            </a>
            <div className="hero-facts" aria-label="Concept features">
              <div><strong>04</strong><span>Divine boons</span></div>
              <div><strong>03</strong><span>Forged weapons</span></div>
              <div><strong>01</strong><span>Way out</span></div>
            </div>
            <div className="hero-chapter"><span>Chapter</span><strong>01</strong></div>
          </div>
        </section>

        <section className="boons-section section" id="boons" aria-labelledby="boons-title">
          <div className="container">
            <Reveal className="section-heading section-heading--light">
              <div>
                <Eyebrow light>Choose your defiance</Eyebrow>
                <h2 id="boons-title" aria-label="Power is a promise.">Power is a<br /><em>promise.</em></h2>
              </div>
              <p>
                Four old powers dwell beneath the palace. Choose the one that changes how you move,
                how you strike, and what you become before the next fall.
              </p>
            </Reveal>

            <Reveal className="boon-workbench" delay={100}>
              <div className="boon-selector" role="group" aria-label="Choose a boon to inspect">
                {BOONS.map((boon, index) => (
                  <button
                    key={boon.id}
                    className={`boon-choice ${selectedBoonId === boon.id ? 'is-selected' : ''}`}
                    type="button"
                    aria-pressed={selectedBoonId === boon.id}
                    onClick={() => setSelectedBoonId(boon.id)}
                    style={{ '--boon-color': boon.color } as CSSProperties}
                  >
                    <span className="boon-choice__number">0{index + 1}</span>
                    <BoonGlyph id={boon.id} />
                    <span className="boon-choice__text">
                      <small>{boon.domain}</small>
                      <strong>{boon.title}</strong>
                      <span>{boon.name}</span>
                    </span>
                    {boundBoonId === boon.id && <span className="boon-choice__bound">Bound</span>}
                    <span className="boon-choice__arrow" aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>

              <article
                className="boon-preview"
                aria-live="polite"
                style={{ '--boon-color': selectedBoon.color, '--boon-pale': selectedBoon.pale } as CSSProperties}
              >
                <div className="boon-preview__topline">
                  <span>Boon inscription</span>
                  <span>EO—0{BOONS.indexOf(selectedBoon) + 1}</span>
                </div>
                <div className="boon-preview__sigil">
                  <div className="sigil-orbit" aria-hidden="true" />
                  <BoonGlyph id={selectedBoon.id} />
                </div>
                <div className="boon-preview__copy">
                  <Eyebrow light>{selectedBoon.title} / {selectedBoon.name}</Eyebrow>
                  <h3>{selectedBoon.name}</h3>
                  <p>{selectedBoon.description}</p>
                </div>
                <div className="boon-preview__abilities">
                  <div><span>Passive</span><p>{selectedBoon.passive}</p></div>
                  <div><span>Active / {selectedBoon.cooldown}</span><p>{selectedBoon.active}</p></div>
                </div>
                <dl className="boon-stats">
                  {selectedBoon.stats.map((stat) => (
                    <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>
                  ))}
                </dl>
                <div className="boon-preview__footer">
                  <blockquote>“{selectedBoon.flavor}”</blockquote>
                  <button
                    className="button button--primary boon-bind"
                    type="button"
                    onClick={bindBoon}
                    disabled={boundBoonId === selectedBoon.id}
                  >
                    {boundBoonId === selectedBoon.id ? 'Bound to this run' : `Bind ${selectedBoon.title}`}
                    <span aria-hidden="true">{boundBoonId === selectedBoon.id ? '✓' : '↗'}</span>
                  </button>
                </div>
              </article>
            </Reveal>
            <p className="sr-only" role="status">{bindMessage}</p>
          </div>
        </section>

        <section className="arsenal-section section" id="arsenal" aria-labelledby="arsenal-title">
          <div className="container">
            <Reveal className="section-heading">
              <div>
                <Eyebrow>Death is only a drafting table</Eyebrow>
                <h2 id="arsenal-title" aria-label="Every fall forges a path.">Every fall<br /><em>forges a path.</em></h2>
              </div>
              <p>
                The palace resets. Your arsenal does not. Carry the memory of each defeat into a new
                weapon rhythm, then turn repetition into escape.
              </p>
            </Reveal>

            <Reveal className="arsenal-grid" delay={100}>
              <div className="weapon-panel">
                <div className="weapon-panel__header">
                  <span>The oathbound armory</span>
                  <span>03 signatures</span>
                </div>
                <div className="weapon-stage">
                  <div className="weapon-stage__index" aria-hidden="true">0{WEAPONS.indexOf(selectedWeapon) + 1}</div>
                  <WeaponIllustration id={selectedWeapon.id} />
                  <div className="weapon-stage__seal"><OathMark /><span>Forged in the ninth furnace</span></div>
                </div>
                <div className="weapon-details" aria-live="polite">
                  <Eyebrow>{selectedWeapon.type}</Eyebrow>
                  <h3>{selectedWeapon.name}</h3>
                  <p>{selectedWeapon.description}</p>
                  <div className="weapon-meters">
                    {[
                      { label: 'Reach', value: selectedWeapon.reach, width: selectedWeapon.reachValue },
                      { label: 'Tempo', value: selectedWeapon.speed, width: selectedWeapon.speedValue },
                      { label: 'Impact', value: selectedWeapon.impact, width: selectedWeapon.impactValue },
                    ].map((meter) => (
                      <div className="weapon-meter" key={meter.label}>
                        <span>{meter.label}</span>
                        <div aria-hidden="true"><i style={{ width: `${meter.width}%` }} /></div>
                        <strong>{meter.value}</strong>
                      </div>
                    ))}
                  </div>
                  <p className="weapon-trait"><span>Signature</span>{selectedWeapon.trait}</p>
                </div>
                <div className="weapon-tabs" role="group" aria-label="Choose a weapon">
                  {WEAPONS.map((weapon, index) => (
                    <button
                      type="button"
                      key={weapon.id}
                      aria-pressed={selectedWeapon.id === weapon.id}
                      className={selectedWeapon.id === weapon.id ? 'is-selected' : ''}
                      onClick={() => setSelectedWeaponId(weapon.id)}
                    >
                      <span>0{index + 1}</span>
                      <strong>{weapon.name}</strong>
                      <small>{weapon.type}</small>
                    </button>
                  ))}
                </div>
              </div>

              <div className="escape-loop">
                <div className="escape-loop__intro">
                  <Eyebrow>The escape loop</Eyebrow>
                  <h3 aria-label="Learn the underworld.">Learn the<br />underworld.</h3>
                  <p>Then refuse its rules.</p>
                </div>
                <ol className="loop-steps">
                  <li>
                    <span className="loop-steps__number">01</span>
                    <div><small>Commit</small><h4>Descend</h4><p>Enter a shifting chamber. Read the threat before it reads you.</p></div>
                  </li>
                  <li>
                    <span className="loop-steps__number">02</span>
                    <div><small>Improvise</small><h4>Adapt</h4><p>Combine a boon, a weapon rhythm, and one irreversible choice.</p></div>
                  </li>
                  <li>
                    <span className="loop-steps__number">03</span>
                    <div><small>Break</small><h4>Unmake</h4><p>Find the chamber’s law and break it. Every escape leaves a scar.</p></div>
                  </li>
                  <li>
                    <span className="loop-steps__number">04</span>
                    <div><small>Remember</small><h4>Return</h4><p>Fall, keep what matters, and begin again with sharper intent.</p></div>
                  </li>
                </ol>
                <div className="escape-loop__stamp"><span>∞</span><p>One life.<br />Infinite revisions.</p></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="houses-section section" id="houses" aria-labelledby="houses-title">
          <div className="container">
            <Reveal className="section-heading section-heading--light">
              <div>
                <Eyebrow light>The factions below</Eyebrow>
                <h2 id="houses-title" aria-label="No gods above. Only houses.">No gods above.<br /><em>Only houses.</em></h2>
              </div>
              <p>
                Meet the original archetypes who trade in names, oaths, and stolen tomorrows. Each
                offers a different truth—and a different way to leave them wanting.
              </p>
            </Reveal>

            <div className="house-grid">
              {HOUSES.map((house, index) => (
                <Reveal className="house-card-wrap" delay={index * 80} key={house.id}>
                  <article className="house-card" style={{ '--house-color': house.color } as CSSProperties}>
                    <div className="house-card__visual">
                      <FactionPortrait id={house.id} />
                      <span className="house-card__index">0{index + 1}</span>
                      <span className="house-card__archetype">{house.archetype}</span>
                    </div>
                    <div className="house-card__body">
                      <p className="house-card__house">{house.house}</p>
                      <h3>{house.name}</h3>
                      <p className="house-card__role">{house.role}</p>
                      <blockquote>“{house.quote}”</blockquote>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal className="house-principle" delay={120}>
              <OathMark />
              <p>Every house wants something.<br /><strong>The oath is what you refuse to give.</strong></p>
              <span>Original world / Original characters / Original conflicts</span>
            </Reveal>
          </div>
        </section>

        <section className="finale" id="begin" aria-labelledby="finale-title">
          <div className="finale-landscape" aria-hidden="true">
            <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" fill="none">
              <defs>
                <linearGradient id="finale-sky" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#090b0e" />
                  <stop offset=".6" stopColor="#1a1012" />
                  <stop offset="1" stopColor="#471813" />
                </linearGradient>
                <linearGradient id="finale-lava" x1="0" y1="1" x2="1" y2="0">
                  <stop stopColor="#a32620" />
                  <stop offset=".55" stopColor="#f0703f" />
                  <stop offset="1" stopColor="#f4c675" />
                </linearGradient>
                <filter id="finale-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="12" />
                </filter>
              </defs>
              <rect width="1600" height="900" fill="url(#finale-sky)" />
              <circle cx="1220" cy="310" r="215" stroke="#d9b46a" strokeOpacity=".12" />
              <circle cx="1220" cy="310" r="175" stroke="#d9b46a" strokeOpacity=".08" strokeDasharray="2 10" />
              <path d="M0 685 205 512l130 99 194-230 192 223 142-114 212 192 172-140 353 211v247H0Z" fill="#0d0c0f" />
              <path d="m625 612 144-135 50 60-50-10-28 23-36-8Z" fill="#171217" stroke="#5b3a2b" />
              <path d="M712 718 763 482l36-64 35 64 52 236Z" fill="#111014" stroke="#6b4630" />
              <path d="m799 436 35 80-35 57-36-57Z" fill="url(#finale-lava)" filter="url(#finale-glow)" />
              <path d="m799 436 35 80-35 57-36-57Z" fill="url(#finale-lava)" />
              <path d="M0 799c170-61 260-27 409 0s250 36 414-6 264-55 408 0 243 33 369-6v113H0Z" fill="url(#finale-lava)" />
              <path d="M0 814c170-61 260-27 409 0s250 36 414-6 264-55 408 0 243 33 369-6" stroke="#f8cf82" strokeOpacity=".65" strokeWidth="3" />
              <path d="m0 430 178-63 95 70-86 45L0 430Zm1600-20-178-51-98 63 91 42 185-54Z" fill="#0b0c0f" />
            </svg>
          </div>
          <div className="finale-shade" aria-hidden="true" />
          <div className="container finale-content">
            <Reveal className="finale-copy">
              <Eyebrow light>The surface is still waiting</Eyebrow>
              <h2 id="finale-title" aria-label="One more escape.">One more<br /><em>escape.</em></h2>
              <p>
                No chosen one. No clean beginning. Just the oath you keep when the furnace asks
                you to kneel. Take a boon. Make the next descent yours.
              </p>
              <div className="finale-note"><span aria-hidden="true">✦</span> Interactive fan-made concept. Not a playable game.</div>
            </Reveal>

            <Reveal className="oath-console" delay={120}>
              <div className="oath-console__header">
                <span><i aria-hidden="true" /> Oath engine / Live</span>
                <span>Roll {String(rollCount).padStart(2, '0')}</span>
              </div>
              <div className={`oath-result ${randomBoon ? 'has-boon' : ''}`} key={randomBoon ? `${randomBoon.id}-${rollCount}` : 'empty'}>
                {randomBoon ? (
                  <>
                    <div className="oath-result__glyph" style={{ '--result-color': randomBoon.color } as CSSProperties}>
                      <BoonGlyph id={randomBoon.id} />
                    </div>
                    <div className="oath-result__copy">
                      <span>{randomBoon.title} boon received</span>
                      <h3>{randomBoon.name}</h3>
                      <p>{randomBoon.passive}</p>
                    </div>
                    <span className="oath-result__rarity">Bound<br />to run</span>
                  </>
                ) : (
                  <div className="oath-result__empty">
                    <OathMark />
                    <div><span>No boon summoned</span><p>The furnace holds its breath.</p></div>
                  </div>
                )}
              </div>
              <button className="button button--primary oath-roll" type="button" onClick={rollBoon}>
                <span>{randomBoon ? 'Roll another boon' : 'Summon a random boon'}</span>
                <span className="oath-roll__dice" aria-hidden="true">✦</span>
              </button>
              <p className="oath-console__status" role="status">{rollMessage}</p>
              <a className="oath-console__link" href="#boons">Inspect all four boons <ArrowIcon /></a>
            </Reveal>
          </div>
          <div className="finale-bottom" aria-hidden="true">
            <span>Ember Oath</span><i /><span>Defy the descent</span><i /><span>Original concept / 2026</span>
          </div>
        </section>
      </main>

      <GameFooter
        name="EMBER OATH"
        inspiration="Hades"
        note="An unofficial, original fan-made roguelike concept. Built as an interactive design study."
      />
    </div>
  );
}

export default App;
