import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { FarmScene } from '../../shared/scenes';
import { Eyebrow, GameFooter, GameNav, Reveal } from '../../shared/game-ui';

type SeasonId = 'spring' | 'summer' | 'fall' | 'winter';
type FeatureArtKind = 'farm' | 'neighbors' | 'seasons';

interface Crop {
  name: string;
  note: string;
  color: string;
}

interface Season {
  id: SeasonId;
  name: string;
  number: string;
  tabNote: string;
  chapter: string;
  title: string;
  copy: string;
  weather: string;
  rhythm: string;
  fieldNote: string;
  crops: Crop[];
  palette: {
    sky: string;
    hill: string;
    ground: string;
    accent: string;
    soft: string;
    ink: string;
  };
}

const seasons: Season[] = [
  {
    id: 'spring',
    name: 'Spring',
    number: '01',
    tabNote: 'Wake the soil',
    chapter: 'First light',
    title: 'Every good thing starts small.',
    copy: 'The creek remembers its song, the orchard wakes in pink, and every empty patch of earth feels full of possibility. Plant a little more than you think you need.',
    weather: 'Soft rain',
    rhythm: 'Long, bright days',
    fieldNote: 'The first moonpeas are up. Leave a little room for wonder.',
    crops: [
      { name: 'Moonpeas', note: 'sweet & early', color: '#9fc978' },
      { name: 'Rainroot', note: 'crisp & kind', color: '#d99bb8' },
      { name: 'Starleaf', note: 'bright & tender', color: '#75b79b' },
    ],
    palette: {
      sky: '#dcebd6',
      hill: '#91b982',
      ground: '#587b4c',
      accent: '#f2cf72',
      soft: '#f7edce',
      ink: '#203c2e',
    },
  },
  {
    id: 'summer',
    name: 'Summer',
    number: '02',
    tabNote: 'Follow the sun',
    chapter: 'High sun',
    title: 'Let the good days grow wild.',
    copy: 'Bare feet in the grass. Cicadas in the trees. The days stretch out for fishing, foraging, and supper in the orchard—with a little jam left over for winter.',
    weather: 'Golden warmth',
    rhythm: 'Lazy evenings',
    fieldNote: 'The pears are ready. There is always room for one more at the table.',
    crops: [
      { name: 'Sunfruit', note: 'sun-ripened', color: '#efaa4f' },
      { name: 'Honeybeans', note: 'slow & sweet', color: '#d9c65d' },
      { name: 'Cornmint', note: 'fresh & green', color: '#6ca773' },
    ],
    palette: {
      sky: '#f6dfa0',
      hill: '#b4be72',
      ground: '#6b864a',
      accent: '#f5aa62',
      soft: '#fff0c7',
      ink: '#354126',
    },
  },
  {
    id: 'fall',
    name: 'Fall',
    number: '03',
    tabNote: 'Gather the gold',
    chapter: 'Harvest moon',
    title: 'Make room for a little magic.',
    copy: 'The hills turn to amber and the kitchen windows glow. Bring in the harvest, trade a jar with a neighbor, and watch the first starseed drift down after dusk.',
    weather: 'Crisp & golden',
    rhythm: 'Early hearthlight',
    fieldNote: 'A basket by the door. A pot on the stove. Nothing asks you to hurry.',
    crops: [
      { name: 'Emberwheat', note: 'rich & toasty', color: '#d99b4e' },
      { name: 'Amberpear', note: 'soft & honeyed', color: '#c57b45' },
      { name: 'Duskberry', note: 'tart & bright', color: '#9a6681' },
    ],
    palette: {
      sky: '#edd0b4',
      hill: '#b87d59',
      ground: '#77583f',
      accent: '#edb66a',
      soft: '#f6e2ca',
      ink: '#3e3028',
    },
  },
  {
    id: 'winter',
    name: 'Winter',
    number: '04',
    tabNote: 'Keep a little warmth',
    chapter: 'Quiet snow',
    title: 'The quiet has its own gifts.',
    copy: 'Snow softens every edge. Tend the greenhouse, mend a favorite sweater, and follow lantern light to a warm kitchen. Even a resting field is dreaming of spring.',
    weather: 'Gentle snow',
    rhythm: 'Slow, cozy nights',
    fieldNote: 'The kettle is on. The stars are especially close this time of year.',
    crops: [
      { name: 'Frostbell', note: 'delicate & bright', color: '#b9d5d3' },
      { name: 'Evergreen', note: 'deep & warming', color: '#6c9581' },
      { name: 'Wintergrain', note: 'nutty & patient', color: '#d2bb83' },
    ],
    palette: {
      sky: '#d9e4e5',
      hill: '#9eb9b8',
      ground: '#6f8e8d',
      accent: '#d9e8c2',
      soft: '#edf3ed',
      ink: '#263e40',
    },
  },
];

const navLinks = [
  { href: '#world', label: 'The acre' },
  { href: '#seasons', label: 'The seasons' },
  { href: '#neighbors', label: 'The neighbors' },
  { href: '#letters', label: 'Letters' },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 1.8c.7 6.4 3.8 9.5 10.2 10.2-6.4.7-9.5 3.8-10.2 10.2C11.3 15.8 8.2 12.7 1.8 12 8.2 11.3 11.3 8.2 12 1.8Z" fill="currentColor" />
    </svg>
  );
}

function SeasonIcon({ season }: { season: SeasonId }) {
  if (season === 'spring') {
    return (
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M18 29V15M18 21c-8 0-11-5-11-11 8 0 11 5 11 11ZM18 25c8 0 11-5 11-11-8 0-11 5-11 11Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (season === 'summer') {
    return (
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="7" stroke="currentColor" strokeWidth="1.7" />
        <path d="M18 3v5M18 28v5M3 18h5M28 18h5M7.4 7.4l3.5 3.5M25.1 25.1l3.5 3.5M28.6 7.4l-3.5 3.5M10.9 25.1l-3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (season === 'fall') {
    return (
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M28.5 7.5C15 6.5 8.5 13.5 10 23c1 6.5 7.5 8.5 12 5 6-4.5 6.5-12 6.5-20.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M8 32c4-8 9-13 16-18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M18 4v28M6.7 11l22.6 14M6.7 25l22.6-14M13.5 7.5 18 12l4.5-4.5M13.5 28.5 18 24l4.5 4.5M6.8 16.3l6.1-1.6-1.6-6.1M29.2 19.7l-6.1 1.6 1.6 6.1M6.8 19.7l6.1 1.6-1.6 6.1M29.2 16.3l-6.1-1.6 1.6-6.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AcreMap() {
  return (
    <svg className="acre-map" viewBox="0 0 640 510" role="img" aria-labelledby="acre-map-title acre-map-desc">
      <title id="acre-map-title">A hand-drawn map of Larkspur Valley</title>
      <desc id="acre-map-desc">A small cottage, garden rows, orchard trees, and a winding creek beneath a golden sun.</desc>
      <defs>
        <linearGradient id="map-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dce8d0" />
          <stop offset="1" stopColor="#f4ecd4" />
        </linearGradient>
        <linearGradient id="map-creek" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8bbdb4" />
          <stop offset="1" stopColor="#b9d5c6" />
        </linearGradient>
      </defs>
      <rect width="640" height="510" rx="26" fill="url(#map-sky)" />
      <circle cx="518" cy="92" r="47" fill="#efc76e" />
      <circle cx="518" cy="92" r="61" fill="none" stroke="#efc76e" strokeOpacity=".35" strokeDasharray="3 9" />
      <path d="M0 226c98-69 180-74 274-25 102 54 174 23 252-12 58-26 88-23 114-13v334H0V226Z" fill="#a6bf8e" />
      <path d="M0 302c102-59 179-56 275-9 104 51 217 26 365-29v246H0V302Z" fill="#78966d" />
      <path d="M0 386c129-64 245-37 340 12 100 52 196 33 300-8v120H0V386Z" fill="#55764f" />
      <path d="M-20 312c101-33 154-7 201 43 42 44 78 53 121 38 38-13 48-38 84-37 28 1 52 25 84 55 43 40 95 45 190 22" fill="none" stroke="url(#map-creek)" strokeWidth="43" strokeLinecap="round" />
      <path d="M-20 308c101-33 154-7 201 43 42 44 78 53 121 38 38-13 48-38 84-37 28 1 52 25 84 55 43 40 95 45 190 22" fill="none" stroke="#d6e7dc" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" />
      <path d="M272 510c-7-57 7-98 54-127 44-27 45-49 35-82-12-41-3-73 43-101" fill="none" stroke="#e6d5a9" strokeWidth="24" strokeLinecap="round" />
      <path d="M363 329c17 13 43 12 68-2" fill="none" stroke="#b79564" strokeWidth="21" strokeLinecap="round" />
      <path d="M367 326v12M393 323v13M418 321v12" stroke="#8b704d" strokeWidth="3" />
      <g>
        <rect x="205" y="201" width="132" height="97" rx="3" fill="#f4ecd6" />
        <path d="m188 210 82-76 86 76H188Z" fill="#a5654e" />
        <path d="m188 210 82-76 86 76" fill="none" stroke="#784b3d" strokeWidth="6" strokeLinejoin="round" />
        <rect x="278" y="240" width="29" height="58" rx="2" fill="#668371" />
        <circle cx="299" cy="270" r="2.5" fill="#efc76e" />
        <rect x="223" y="231" width="31" height="29" rx="2" fill="#93bcb1" />
        <path d="M238.5 231v29M223 245.5h31" stroke="#f4ecd6" strokeWidth="3" />
        <rect x="312" y="231" width="15" height="27" rx="2" fill="#93bcb1" />
        <path d="M319.5 231v27" stroke="#f4ecd6" strokeWidth="3" />
        <path d="M310 172v-35h16v43" fill="#b9785b" />
        <path d="M313 137c-11-9 1-18 14-8" fill="none" stroke="#f4ecd6" strokeOpacity=".7" strokeWidth="5" strokeLinecap="round" />
      </g>
      <g transform="translate(379 217)">
        <path d="m0 32 56-34 56 34v62H0V32Z" fill="#d5e3c8" fillOpacity=".82" stroke="#6f917b" strokeWidth="3" />
        <path d="M28 94V57h56v37M28 57l28-18 28 18M56 39v55" fill="none" stroke="#6f917b" strokeWidth="3" />
      </g>
      <g transform="translate(88 155)">
        <path d="M29 92V43" stroke="#6d5d43" strokeWidth="8" strokeLinecap="round" />
        <circle cx="29" cy="30" r="35" fill="#4f7455" />
        <circle cx="10" cy="45" r="24" fill="#628862" />
        <circle cx="49" cy="47" r="27" fill="#5a815c" />
        <circle cx="19" cy="21" r="5" fill="#edc36c" />
        <circle cx="45" cy="29" r="5" fill="#edc36c" />
      </g>
      <g transform="translate(511 186)">
        <path d="M23 81V35" stroke="#6d5d43" strokeWidth="7" strokeLinecap="round" />
        <circle cx="23" cy="24" r="30" fill="#577c58" />
        <circle cx="5" cy="41" r="21" fill="#6d9062" />
        <circle cx="42" cy="40" r="22" fill="#6d9062" />
        <circle cx="20" cy="17" r="4" fill="#e9b466" />
      </g>
      <g transform="translate(79 347) rotate(-7)">
        <path d="M0 35h184v72H0z" fill="#846b49" />
        <path d="M14 48h156M14 66h156M14 84h156" stroke="#c0a371" strokeWidth="8" strokeLinecap="round" />
        {[20, 55, 90, 125, 160].map((x, index) => (
          <g key={x} transform={`translate(${x} ${39 + (index % 2) * 5})`}>
            <path d="M0 18V0" stroke="#405f3f" strokeWidth="3" />
            <path d="M0 8c-10 0-13-7-12-12 9 0 13 5 12 12ZM0 13c10 0 13-7 12-12-9 0-13 5-12 12Z" fill="#89aa68" />
          </g>
        ))}
      </g>
      <g transform="translate(438 94)">
        <path d="M0 12c4-7 9-7 13 0M20 3c3-5 7-5 10 0" fill="none" stroke="#687a60" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g fill="#f4ecd6" opacity=".75">
        <circle cx="79" cy="94" r="2" />
        <circle cx="145" cy="61" r="3" />
        <circle cx="377" cy="101" r="2" />
        <circle cx="428" cy="48" r="2.5" />
      </g>
      <g transform="translate(475 408)">
        <rect width="139" height="54" rx="27" fill="#f7f0da" fillOpacity=".92" />
        <text x="69.5" y="24" textAnchor="middle" fill="#314c37" fontFamily="Manrope Variable, sans-serif" fontSize="10" fontWeight="800" letterSpacing="2">LARKSPUR</text>
        <text x="69.5" y="39" textAnchor="middle" fill="#6d775f" fontFamily="Manrope Variable, sans-serif" fontSize="8" letterSpacing="1.5">VALLEY · ACRE 014</text>
      </g>
    </svg>
  );
}

function FeatureArt({ kind }: { kind: FeatureArtKind }) {
  if (kind === 'farm') {
    return (
      <svg viewBox="0 0 220 150" fill="none" aria-hidden="true">
        <path d="M36 118h150" stroke="currentColor" strokeOpacity=".22" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M104 111V52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M104 76C79 77 67 63 69 43c25-1 38 14 35 33ZM104 91c25 1 37-13 35-33-25-1-38 14-35 33Z" fill="#a9c487" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M104 52c-5-14 4-23 17-25 2 14-4 22-17 25Z" fill="#d2a65f" stroke="currentColor" strokeWidth="2.5" />
        <path d="M44 65h43l-5 41H49l-5-41Z" fill="#e2aa73" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M82 78c21-7 30 4 24 19h-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M44 77c-17-9-25 7-15 19 4 5 10 6 16 4" fill="#e2aa73" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="m164 106 4-9M174 106l-2-13M184 106l7-7" stroke="#718b5e" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M60 45v-8M55 41h10" stroke="#c48d5c" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === 'neighbors') {
    return (
      <svg viewBox="0 0 220 150" fill="none" aria-hidden="true">
        <path d="M30 119h160" stroke="currentColor" strokeOpacity=".22" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M48 72h55v35a12 12 0 0 1-12 12H60a12 12 0 0 1-12-12V72Z" fill="#d7b0a0" stroke="currentColor" strokeWidth="2.5" />
        <path d="M103 79h9a14 14 0 0 1 0 28h-9" stroke="currentColor" strokeWidth="3" />
        <path d="M117 63h55v35a12 12 0 0 1-12 12h-31a12 12 0 0 1-12-12V63Z" fill="#d8c987" stroke="currentColor" strokeWidth="2.5" />
        <path d="M117 70h-9a14 14 0 0 0 0 28h9" stroke="currentColor" strokeWidth="3" />
        <path d="M65 56c-8-8 6-13 0-21M82 56c-8-8 6-13 0-21M134 48c-8-8 6-13 0-21M151 48c-8-8 6-13 0-21" stroke="currentColor" strokeOpacity=".55" strokeWidth="2" strokeLinecap="round" />
        <path d="M179 39c.4 5.2 2.8 7.6 8 8-5.2.4-7.6 2.8-8 8-.4-5.2-2.8-7.6-8-8 5.2-.4 7.6-2.8 8-8Z" fill="#c79359" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 220 150" fill="none" aria-hidden="true">
      <path d="M35 119h150" stroke="currentColor" strokeOpacity=".22" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="110" cy="66" r="30" fill="#e7bd68" stroke="currentColor" strokeWidth="2.5" />
      <path d="M110 17V7M110 125v-10M61 66H51M169 66h-10M75 31l-7-7M145 31l7-7M75 101l-7 7M145 101l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M110 43c3 17 10 24 27 27-17 3-24 10-27 27-3-17-10-24-27-27 17-3 24-10 27-27Z" fill="#f6e5b2" />
      <path d="M44 108c-1-19 12-29 30-24 9 3 11 10 10 24" fill="#9eb882" stroke="currentColor" strokeWidth="2.5" />
      <path d="M176 108c1-19-12-29-30-24-9 3-11 10-10 24" fill="#c88c6d" stroke="currentColor" strokeWidth="2.5" />
      <path d="M44 108h40M136 108h40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function NeighborPortrait({ variant }: { variant: 'mara' | 'juniper' | 'pip' | 'oren' }) {
  const colors = {
    mara: { bg: '#dbe4c7', shirt: '#708669', hair: '#5b4636', skin: '#d8a77f' },
    juniper: { bg: '#efd7bf', shirt: '#a76f5d', hair: '#725343', skin: '#e0b18a' },
    pip: { bg: '#e3dcec', shirt: '#8a79a0', hair: '#3e3936', skin: '#bc8b6c' },
    oren: { bg: '#cfe1dc', shirt: '#527c78', hair: '#52645c', skin: '#c99873' },
  }[variant];

  return (
    <svg viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <rect width="72" height="72" rx="22" fill={colors.bg} />
      <path d="M10 72c2-19 13-27 26-27s24 8 26 27H10Z" fill={colors.shirt} />
      <path d="M29 46v10c3 4 11 4 14 0V46" fill={colors.skin} />
      <ellipse cx="36" cy="31" rx="17" ry="20" fill={colors.skin} />
      {variant === 'mara' && (
        <>
          <path d="M18 36c-5-21 8-31 20-30 15 1 21 14 16 32l-5-17c-8 4-16 3-23 0l-8 15Z" fill={colors.hair} />
          <path d="M20 24c4-12 23-16 31-3" stroke={colors.hair} strokeWidth="8" strokeLinecap="round" />
          <circle cx="18" cy="19" r="7" fill="#d3ad62" />
        </>
      )}
      {variant === 'juniper' && (
        <>
          <path d="M18 34c-3-20 7-30 19-30 15 0 22 13 17 32l-4-17c-9 3-18 3-25-1l-7 16Z" fill={colors.hair} />
          <path d="M20 19c5-14 27-13 33 2" stroke="#e7d5b7" strokeWidth="5" strokeLinecap="round" />
          <path d="M25 67v-9c0-8 22-8 22 0v9" stroke="#f1dbc2" strokeWidth="3" />
        </>
      )}
      {variant === 'pip' && (
        <>
          <path d="M18 31c-2-17 8-25 19-25 13 0 20 11 17 26l-5-12c-9 1-17-1-23-6l-8 17Z" fill={colors.hair} />
          <path d="M20 15c8-10 24-9 32 1" stroke="#c6a362" strokeWidth="6" strokeLinecap="round" />
        </>
      )}
      {variant === 'oren' && (
        <>
          <path d="M18 31c-1-17 8-25 19-25 13 0 20 11 17 27l-6-12c-8 2-17 1-23-3l-7 13Z" fill={colors.hair} />
          <path d="M17 15c10-8 29-8 39 1l-2 7c-11-5-24-5-35 0l-2-8Z" fill="#799184" />
          <path d="M24 55c7 8 17 8 24 0" stroke={colors.hair} strokeWidth="3" strokeLinecap="round" />
        </>
      )}
      <circle cx="29" cy="32" r="1.6" fill="#3f382f" />
      <circle cx="43" cy="32" r="1.6" fill="#3f382f" />
      <path d="M32 40c3 2 7 2 10 0" stroke="#895d4a" strokeWidth="1.6" strokeLinecap="round" />
      {variant === 'mara' && <path d="M25 35c2-1 4-1 6 0M41 35c2-1 4-1 6 0" stroke="#6e5846" strokeWidth="1.4" strokeLinecap="round" />}
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 30 24" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="26" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="m4 6 11 9L26 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface Letter {
  id: string;
  sender: string;
  date: string;
  preview: string;
  body: string;
  signOff: string;
}

const letters: Letter[] = [
  {
    id: 'mara',
    sender: 'Mara Bell',
    date: 'Spring · Day 06',
    preview: 'A handful of seeds, just for you',
    body: 'The first moonpeas are up, so I tucked a little bundle beneath your flowerpot. Plant them where the morning finds them. There is no secret to it—mostly good soil, a little water, and remembering to look up now and then. Come by for tea when the kettle sings.',
    signOff: 'Yours, from the house with the blue door',
  },
  {
    id: 'juniper',
    sender: 'Juniper & Pip',
    date: 'Summer · Day 19',
    preview: 'Supper under the pear trees',
    body: 'We are setting the long table under the pear trees on Sunday. Bring yourself; that is plenty. If you happen to bring berries, we will not complain. Pip has made a pie with much too much cinnamon, and there is a chair with your name loosely chalked on it.',
    signOff: 'Save you a seat, Juniper & Pip',
  },
  {
    id: 'oren',
    sender: 'Oren Vale',
    date: 'Fall · Day 02',
    preview: 'Something the creek brought back',
    body: 'Found your red ribbon caught on the old footbridge. It is safe in my tackle box, next to the good hooks. The creek is full of silverfish and the fireflies have arrived early. Meet me at dusk if you would like to see where the lanterns float.',
    signOff: 'Until the light goes, Oren',
  },
];

function SeasonGarden({ season }: { season: Season }) {
  const isWinter = season.id === 'winter';
  const isFall = season.id === 'fall';
  const isSummer = season.id === 'summer';

  return (
    <svg className="season-garden__svg" viewBox="0 0 560 420" role="img" aria-labelledby={`garden-title-${season.id}`}>
      <title id={`garden-title-${season.id}`}>A {season.name.toLowerCase()} garden in Larkspur Valley</title>
      <defs>
        <linearGradient id={`garden-sky-${season.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={season.palette.sky} />
          <stop offset="1" stopColor={season.palette.soft} />
        </linearGradient>
      </defs>
      <rect width="560" height="420" rx="22" fill={`url(#garden-sky-${season.id})`} />
      <circle cx="438" cy="76" r={isSummer ? 40 : 32} fill={isWinter ? '#f7f5e8' : season.palette.accent} opacity={isWinter ? '.85' : '1'} />
      {isSummer && (
        <g stroke={season.palette.ink} strokeOpacity=".3" strokeWidth="2" strokeLinecap="round">
          <path d="M438 19v12M438 121v12M381 76h12M483 76h12M399 37l8 8M469 107l8 8M477 37l-8 8M407 107l-8 8" />
        </g>
      )}
      {isWinter && (
        <g fill="#f7faf3" opacity=".9">
          <circle cx="79" cy="70" r="3" /><circle cx="160" cy="108" r="2.5" /><circle cx="251" cy="55" r="3" /><circle cx="346" cy="101" r="2.5" /><circle cx="498" cy="142" r="3" />
          <path d="M322 51v18M314 60h16M323 52l-3 5M323 52l3 5M314 68l3-5M314 68l5-3" stroke="#f7faf3" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      )}
      <path d="M0 222c85-84 163-82 247-27 91 59 185 51 313-22v247H0V222Z" fill={season.palette.hill} />
      <path d="M0 289c110-73 210-48 304 11 90 57 176 28 256-10v130H0V289Z" fill={season.palette.ground} />
      <path d="M-20 355c92-38 161-25 215 15 52 39 107 36 165 8 50-24 113-29 220 0v42H-20v-65Z" fill={season.palette.ink} opacity=".18" />
      <g transform="translate(62 190)">
        <rect x="0" y="40" width="112" height="76" rx="3" fill={season.palette.soft} />
        <path d="m-12 45 67-61 71 61H-12Z" fill={isFall ? '#8f5843' : '#6d7c61'} />
        <path d="m-12 45 67-61 71 61" fill="none" stroke={season.palette.ink} strokeOpacity=".45" strokeWidth="4" strokeLinejoin="round" />
        <rect x="43" y="66" width="27" height="50" rx="2" fill={season.palette.ink} opacity=".65" />
        <rect x="12" y="60" width="22" height="23" rx="2" fill={season.palette.accent} />
        <path d="M23 60v23M12 71.5h22" stroke={season.palette.soft} strokeWidth="2.5" />
        {isWinter && <path d="M-13 43c37-9 66-22 83-43 15 23 44 35 81 43H-13Z" fill="#f7faf3" />}
      </g>
      <g transform="translate(450 164)">
        <path d="M20 120V52" stroke={season.palette.ink} strokeWidth="8" strokeLinecap="round" opacity=".65" />
        {!isWinter && !isFall ? (
          <>
            <circle cx="20" cy="35" r="42" fill={season.palette.ground} />
            <circle cx="-5" cy="56" r="30" fill={season.palette.hill} />
            <circle cx="47" cy="56" r="31" fill={season.palette.hill} />
          </>
        ) : isFall ? (
          <>
            <circle cx="20" cy="35" r="38" fill="#bd814e" />
            <circle cx="-4" cy="52" r="27" fill="#ce985a" />
            <circle cx="45" cy="51" r="27" fill="#a76b45" />
          </>
        ) : (
          <path d="M20 58 0 20M20 48l27-37M20 66l-29-18M20 62l31 3" stroke={season.palette.ink} strokeWidth="6" strokeLinecap="round" opacity=".65" />
        )}
        {isWinter && <path d="M0 25c10 5 19 5 28-1M35 23c8 4 16 4 24-1" stroke="#f7faf3" strokeWidth="5" strokeLinecap="round" />}
      </g>
      <path d="M151 420c10-56 37-83 81-110" fill="none" stroke={season.palette.soft} strokeOpacity=".7" strokeWidth="30" strokeLinecap="round" />
      <g transform="translate(158 272)">
        <path d="M0 19h252v96H0z" fill={season.palette.ink} opacity=".35" />
        <path d="M20 37h212M20 59h212M20 81h212" stroke={season.palette.soft} strokeOpacity=".4" strokeWidth="7" strokeLinecap="round" />
        {[42, 102, 162, 222].map((x, index) => (
          <g key={x} transform={`translate(${x} ${28 + (index % 2) * 9})`}>
            <path d="M0 50V13" stroke={season.palette.ink} strokeWidth="3" strokeLinecap="round" />
            <path d="M0 28c-14 0-20-9-18-20 13 0 20 8 18 20ZM0 38c14 0 20-9 18-20-13 0-20 8-18 20Z" fill={season.crops[index % 3].color} />
            {isSummer && <circle cx="0" cy="11" r="9" fill={season.palette.accent} />}
            {isFall && <path d="M0 13c-8-5-9-12-4-17 8 4 9 11 4 17Z" fill={season.palette.accent} />}
            {isWinter && <path d="M0 13c-7-3-9-9-5-14 7 3 9 9 5 14Z" fill="#eef4e9" />}
          </g>
        ))}
      </g>
      {season.id === 'spring' && (
        <g stroke="#6f9d98" strokeOpacity=".45" strokeWidth="2" strokeLinecap="round">
          <path d="m87 101-5 12M135 86l-5 12M294 111l-5 12M350 126l-5 12M493 98l-5 12" />
        </g>
      )}
      {isFall && (
        <g fill="#d79958">
          <path d="M230 124c14 3 18 12 12 21-13-2-18-10-12-21Z" />
          <path d="M371 149c12 1 17 8 13 17-12-1-17-8-13-17Z" />
          <path d="M90 166c10-2 16 3 15 12-10 1-16-3-15-12Z" />
        </g>
      )}
      <g fill={season.palette.accent}>
        <path d="M39 52c.3 4.1 2.2 6 6.3 6.3-4.1.3-6 2.2-6.3 6.3-.3-4.1-2.2-6-6.3-6.3 4.1-.3 6-2.2 6.3-6.3Z" />
        <path d="M313 45c.2 3.1 1.7 4.6 4.8 4.8-3.1.2-4.6 1.7-4.8 4.8-.2-3.1-1.7-4.6-4.8-4.8 3.1-.2 4.6-1.7 4.8-4.8Z" />
      </g>
    </svg>
  );
}

function CtaLandscape() {
  return (
    <svg viewBox="0 0 1440 360" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 224c166-83 316-71 465-4 151 68 281 70 433 14 164-60 329-60 542-5v131H0V224Z" fill="#28483a" />
      <path d="M0 289c177-66 344-48 509 7 156 52 317 51 478 4 169-49 319-48 453 5v55H0v-71Z" fill="#345843" />
      <g transform="translate(1110 124)">
        <path d="M0 90h112v98H0z" fill="#d9d4b7" opacity=".72" />
        <path d="m-17 94 73-65 75 65H-17Z" fill="#ad775a" />
        <rect x="46" y="132" width="27" height="56" fill="#496755" />
        <rect x="15" y="119" width="22" height="23" fill="#efc970" />
        <path d="M26 119v23M15 130.5h22" stroke="#d9d4b7" strokeWidth="2" />
      </g>
      <g stroke="#d2c49c" strokeOpacity=".6" strokeWidth="3" strokeLinecap="round">
        <path d="M80 300v-25M80 287l-8-10M80 291l9-12M187 309v-24M187 295l-8-9M187 299l9-13M304 296v-27M304 283l-9-10M304 289l10-13M416 309v-24M416 295l-8-9M416 299l9-13M1284 307v-28M1284 293l-9-11M1284 298l10-13M1374 301v-25M1374 289l-9-11M1374 294l10-13" />
      </g>
    </svg>
  );
}

const features: Array<{
  number: string;
  title: string;
  eyebrow: string;
  copy: string;
  href: string;
  link: string;
  art: FeatureArtKind;
  tone: string;
}> = [
  {
    number: '01',
    title: 'A farm that feels like yours.',
    eyebrow: 'Farming, your way',
    copy: 'Turn a patch of earth into something good. Grow curious crops, raise a few animals, and let your fields change with your imagination.',
    href: '#seasons',
    link: 'See what grows',
    art: 'farm',
    tone: 'sage',
  },
  {
    number: '02',
    title: 'A place at the table.',
    eyebrow: 'Neighbors, not NPCs',
    copy: 'Trade a jar of jam, share a fishing story, or simply wave from the lane. Every friendship adds another thread to the life you are making.',
    href: '#neighbors',
    link: 'Meet the valley',
    art: 'neighbors',
    tone: 'peach',
  },
  {
    number: '03',
    title: 'A year worth noticing.',
    eyebrow: 'Seasons with soul',
    copy: 'Follow the blossom, the golden grain, the turning leaf, and the first snow. There is always something new—and something worth coming home to.',
    href: '#seasons',
    link: 'Follow the seasons',
    art: 'seasons',
    tone: 'gold',
  },
];

export default function App() {
  useEffect(() => {
    const navBrand = document.querySelector<HTMLAnchorElement>('.game-nav .game-brand');
    navBrand?.removeAttribute('aria-label');
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const seasonTabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeSeason = seasons[activeIndex];
  const seasonStyle = {
    '--season-sky': activeSeason.palette.sky,
    '--season-hill': activeSeason.palette.hill,
    '--season-ground': activeSeason.palette.ground,
    '--season-accent': activeSeason.palette.accent,
    '--season-soft': activeSeason.palette.soft,
    '--season-ink': activeSeason.palette.ink,
  } as CSSProperties;

  function handleSeasonKeys(event: KeyboardEvent<HTMLDivElement>) {
    let nextIndex = activeIndex;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (activeIndex + 1) % seasons.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (activeIndex - 1 + seasons.length) % seasons.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = seasons.length - 1;
    else return;

    event.preventDefault();
    setActiveIndex(nextIndex);
    seasonTabRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#world">Skip to the acre</a>
      <GameNav name="STARFALL ACRE" inspiration="An original farming-life concept" links={navLinks} />

      <main>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero__scene" aria-hidden="true"><FarmScene /></div>
          <div className="hero__wash" />
          <div className="container hero__inner">
            <div className="hero__content">
              <Eyebrow light>A little land. A whole life.</Eyebrow>
              <h1 className="hero__title" id="hero-title">
                <span>Grow a life</span>
                <span>at your</span>
                <em>own pace.</em>
              </h1>
              <p className="hero__lede">Tend a tiny farm beneath a sky full of possibilities. Make friends, follow the seasons, and let the good days take their time.</p>
              <div className="hero__actions">
                <a className="button button--primary" href="#seasons">Explore the seasons <ArrowIcon /></a>
                <a className="button button--secondary hero__button-light" href="#world">Wander the acre</a>
              </div>
            </div>

            <aside className="hero__field-note" aria-label="A note from the valley">
              <SparkIcon className="hero__note-star" />
              <p className="hero__note-label">Field note · No. 01</p>
              <p>Wake with the light.<br />There is no rush here.</p>
              <span>Larkspur Valley</span>
            </aside>
          </div>
          <div className="container hero__bottom">
            <a href="#world" className="hero__scroll"><span className="hero__scroll-line" aria-hidden="true" />Scroll to wander</a>
            <p><span className="hero__status-dot" aria-hidden="true" />Now planting · Moonpeas & Starleaf</p>
          </div>
        </section>

        <div className="acre-ribbon" aria-label="Life in the valley">
          <div className="acre-ribbon__inner">
            <span>Plant something small</span><SparkIcon />
            <span>Share the harvest</span><SparkIcon />
            <span>Follow the fireflies</span><SparkIcon />
            <span>Stay for supper</span>
          </div>
        </div>

        <section className="world section" id="world" aria-labelledby="world-title">
          <div className="container">
            <Reveal>
              <div className="section-heading world__heading">
                <div>
                  <Eyebrow>Welcome to Larkspur</Eyebrow>
                  <h2 id="world-title">This is no place to hurry.</h2>
                </div>
                <p>Beyond the old stone markers, a quiet valley is waiting. Your acre is modest, the days are open, and the story is yours to tend.</p>
              </div>
            </Reveal>

            <div className="world__layout">
              <Reveal className="world__map-wrap">
                <figure className="world__map-card">
                  <span className="world__tape" aria-hidden="true" />
                  <AcreMap />
                  <figcaption>
                    <span>Acre no. 014</span>
                    <span>34° N · A slower kind of somewhere</span>
                  </figcaption>
                </figure>
              </Reveal>

              <Reveal className="world__copy" delay={120}>
                <p className="world__kicker">Your days are yours.</p>
                <h3>Make a living.<br />Make a little magic.</h3>
                <p className="world__intro">A few seeds become a garden. A garden becomes a kitchen. And somewhere between the first harvest and the last lantern, a place starts to feel like home.</p>
                <ol className="world__rituals">
                  <li><span>01</span><div><strong>Rise with the sun</strong><p>Step outside. See what changed.</p></div></li>
                  <li><span>02</span><div><strong>Tend, forage & wander</strong><p>Follow a path just because it is there.</p></div></li>
                  <li><span>03</span><div><strong>Put the kettle on</strong><p>There is always time for one more cup.</p></div></li>
                </ol>
                <blockquote>“A good life isn’t a race. It’s a garden.”</blockquote>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="seasons section" id="seasons" aria-labelledby="seasons-title" style={seasonStyle}>
          <div className="container">
            <Reveal>
              <div className="section-heading seasons__heading">
                <div>
                  <Eyebrow light>The wheel of the year</Eyebrow>
                  <h2 id="seasons-title">One acre.<br />Four ways to bloom.</h2>
                </div>
                <p>Every season brings a new rhythm, a new palette, and something worth waiting for. Choose a season and take a little look around.</p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="season-tabs" role="tablist" aria-label="Explore the four seasons" onKeyDown={handleSeasonKeys}>
                {seasons.map((season, index) => (
                  <button
                    key={season.id}
                    ref={(node) => { seasonTabRefs.current[index] = node; }}
                    className={`season-tab ${index === activeIndex ? 'is-active' : ''}`}
                    id={`season-tab-${season.id}`}
                    type="button"
                    role="tab"
                    aria-selected={index === activeIndex}
                    aria-controls="season-panel"
                    tabIndex={index === activeIndex ? 0 : -1}
                    onClick={() => setActiveIndex(index)}
                  >
                    <span className="season-tab__icon"><SeasonIcon season={season.id} /></span>
                    <span className="season-tab__text"><strong>{season.name}</strong><small>{season.tabNote}</small></span>
                    <span className="season-tab__number" aria-hidden="true">{season.number}</span>
                  </button>
                ))}
              </div>
              <p className="sr-only" aria-live="polite">Showing {activeSeason.name}: {activeSeason.title}</p>

              <div
                className="season-panel"
                id="season-panel"
                role="tabpanel"
                aria-labelledby={`season-tab-${activeSeason.id}`}
                tabIndex={0}
              >
                <div className="season-panel__copy">
                  <p className="season-panel__chapter"><span>{activeSeason.number}</span> {activeSeason.chapter}</p>
                  <h3>{activeSeason.title}</h3>
                  <p className="season-panel__description">{activeSeason.copy}</p>
                  <dl className="season-panel__facts">
                    <div><dt>In the air</dt><dd>{activeSeason.weather}</dd></div>
                    <div><dt>The rhythm</dt><dd>{activeSeason.rhythm}</dd></div>
                  </dl>
                  <p className="season-panel__field-note"><SparkIcon />{activeSeason.fieldNote}</p>
                </div>

                <div className="season-garden">
                  <div className="season-garden__topline"><span>Larkspur Valley</span><span>{activeSeason.name} study · {activeSeason.number}</span></div>
                  <SeasonGarden season={activeSeason} />
                  <div className="season-garden__crops" aria-label={`${activeSeason.name} crops`}>
                    {activeSeason.crops.map((crop) => (
                      <div className="crop-chip" key={crop.name}>
                        <span className="crop-chip__dot" style={{ backgroundColor: crop.color }} aria-hidden="true" />
                        <span><strong>{crop.name}</strong><small>{crop.note}</small></span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="features section" aria-labelledby="features-title">
          <div className="container">
            <Reveal>
              <div className="section-heading features__heading">
                <div>
                  <Eyebrow>The good stuff</Eyebrow>
                  <h2 id="features-title">It’s the little things.</h2>
                </div>
                <p>No grand destiny. No perfect strategy. Just a handful of meaningful things that make an ordinary day feel like yours.</p>
              </div>
            </Reveal>
            <div className="feature-grid">
              {features.map((feature, index) => (
                <Reveal key={feature.number} delay={index * 90}>
                  <article className={`feature-card feature-card--${feature.tone}`}>
                    <div className="feature-card__top"><span>{feature.number}</span><span>{feature.eyebrow}</span></div>
                    <div className="feature-card__art"><FeatureArt kind={feature.art} /></div>
                    <h3>{feature.title}</h3>
                    <p>{feature.copy}</p>
                    <a href={feature.href}>{feature.link}<ArrowIcon /></a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="community section" id="neighbors" aria-labelledby="community-title">
          <div className="container">
            <Reveal>
              <div className="section-heading community__heading">
                <div>
                  <Eyebrow>Notes from the valley</Eyebrow>
                  <h2 id="community-title">Good neighbors.<br />Better stories.</h2>
                </div>
                <p>The people here are not quests to complete. They are lives unfolding beside yours—full of small favors, old stories, and room for one more.</p>
              </div>
            </Reveal>

            <div className="community__layout">
              <Reveal className="neighbor-list">
                <div className="neighbor-list__heading"><p>Around the lane</p><span>04 local stories</span></div>
                <article className="neighbor">
                  <NeighborPortrait variant="mara" />
                  <div><h3>Mara Bell</h3><p>Keeper of the seed library</p></div>
                  <span className="neighbor__mark" aria-hidden="true">✦</span>
                </article>
                <article className="neighbor">
                  <NeighborPortrait variant="juniper" />
                  <div><h3>Juniper & Pip</h3><p>Bakers at the Blue Kettle</p></div>
                  <span className="neighbor__mark" aria-hidden="true">✦</span>
                </article>
                <article className="neighbor">
                  <NeighborPortrait variant="pip" />
                  <div><h3>Pip</h3><p>Baker, inventor, jam thief</p></div>
                  <span className="neighbor__mark" aria-hidden="true">✦</span>
                </article>
                <article className="neighbor">
                  <NeighborPortrait variant="oren" />
                  <div><h3>Oren Vale</h3><p>Ferryman & excellent listener</p></div>
                  <span className="neighbor__mark" aria-hidden="true">✦</span>
                </article>
                <blockquote className="neighbor-list__quote">“A town becomes a home when somebody saves you a seat.”</blockquote>
              </Reveal>

              <Reveal className="letters" delay={120}>
                <div className="letters__heading" id="letters">
                  <div><p className="letters__kicker">The letterbox</p><h3>A few words left for you.</h3></div>
                  <span className="letters__stamp" aria-hidden="true"><SparkIcon /><small>LOCAL POST</small></span>
                </div>
                <p className="letters__hint">Open a letter. Stay a moment.</p>
                <div className="letters__stack">
                  {letters.map((letter) => (
                    <details className="letter" key={letter.id}>
                      <summary>
                        <span className="letter__envelope"><EnvelopeIcon /></span>
                        <span className="letter__summary"><small>{letter.date}</small><strong>{letter.preview}</strong><span>From {letter.sender}</span></span>
                        <span className="letter__toggle" aria-hidden="true" />
                      </summary>
                      <div className="letter__body">
                        <p>{letter.body}</p>
                        <span>{letter.signOff}</span>
                      </div>
                    </details>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="final-cta" id="begin" aria-labelledby="cta-title">
          <div className="final-cta__stars" aria-hidden="true">
            <SparkIcon /><SparkIcon /><SparkIcon /><SparkIcon /><SparkIcon />
          </div>
          <div className="final-cta__landscape"><CtaLandscape /></div>
          <div className="container final-cta__inner">
            <Reveal>
              <Eyebrow light>Your next chapter is a quiet one</Eyebrow>
              <h2 id="cta-title">There’s an acre<br />with your <em>name on it.</em></h2>
              <p>Start with a seed. See where the season takes you.</p>
              <div className="final-cta__actions">
                <a className="button button--primary" href="#seasons">Find your season <ArrowIcon /></a>
                <a className="button button--secondary hero__button-light" href="#letters">Read a letter</a>
              </div>
              <p className="final-cta__disclaimer"><strong>Unofficial fan-made concept.</strong> STARFALL ACRE is inspired by Stardew Valley and is not affiliated with or endorsed by ConcernedApe. All names, artwork, and writing shown here are original.</p>
            </Reveal>
          </div>
        </section>
      </main>

      <GameFooter
        name="STARFALL ACRE"
        inspiration="Stardew Valley"
        note="An original fan-made concept. Made with care, not for sale."
      />
    </div>
  );
}
