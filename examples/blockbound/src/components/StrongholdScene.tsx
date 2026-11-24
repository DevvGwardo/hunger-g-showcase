import { useId } from 'react';
import { starPoints } from '../artConstants';
import { Cloud, Crystal, FloatingIsland, PineTree } from './VoxelPrimitives';

export function StrongholdScene() {
  const rawId = useId();
  const id = rawId.replace(/:/g, '');

  return (
    <div className="stronghold-scene" aria-hidden="true">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#070d1e" />
            <stop offset=".55" stopColor="#151b39" />
            <stop offset="1" stopColor="#2a2a4b" />
          </linearGradient>
          <radialGradient id={`${id}-portal-glow`}>
            <stop offset="0" stopColor="#68f4dc" stopOpacity=".44" />
            <stop offset=".55" stopColor="#7b6ee8" stopOpacity=".15" />
            <stop offset="1" stopColor="#7b6ee8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-mist`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8d93bc" stopOpacity="0" />
            <stop offset="1" stopColor="#8d93bc" stopOpacity=".16" />
          </linearGradient>
        </defs>
        <g data-parallax=".05" data-scroll-speed="12">
          <rect width="1600" height="900" fill={`url(#${id}-sky)`} />
          {starPoints.map(([x, y, size], index) => (
            <g key={index} className={index % 5 === 0 ? 'star star--twinkle' : 'star'}>
              <rect x={x} y={y} width={size * 2.2} height={size * 2.2} fill={index % 4 ? '#c9d6ff' : '#78ecdc'} opacity={index % 3 ? '.74' : '.42'} />
            </g>
          ))}
          <circle cx="1270" cy="150" r="58" fill="#d7def4" opacity=".88" />
          <circle cx="1294" cy="132" r="58" fill="#0b1227" />
          <Cloud x={116} y={168} scale={0.78} />
          <Cloud x={1280} y={260} scale={0.62} />
        </g>
        <g data-parallax=".13" data-scroll-speed="24">
          <path d="M0 580 140 470l150 62 170-142 176 160 168-104 176 118 180-152 164 152 176-98 200 110v324H0Z" fill="#161b32" />
          <path d="M0 650 180 552l170 60 190-88 170 100 180-64 190 70 190-86 190 82 140-38v312H0Z" fill="#1c203a" />
          <FloatingIsland x={188} y={528} scale={0.84} />
          <FloatingIsland x={1412} y={490} scale={0.76} />
          <FloatingIsland x={1220} y={282} scale={0.38} />
          <rect y="500" width="1600" height="400" fill={`url(#${id}-mist)`} />
        </g>
        <g data-parallax=".22" data-scroll-speed="38">
          <ellipse cx="800" cy="522" rx="440" ry="380" fill={`url(#${id}-portal-glow)`} />
          <g transform="translate(800 300)">
            <path d="M-332 458h664v38h-664Z" fill="#25233b" />
            <path d="M-292 420h584v38h-584Z" fill="#373149" />
            <path d="M-244 382h488v38h-488Z" fill="#2b273f" />
            <path d="M-214 182h428v200h-428Z" fill="#252139" />
            <path d="M-284 182h82V-10h-82Zm486 0h82V-10h-82Z" fill="#1b192f" />
            <path d="M-306-10h126v-62h-126Zm486 0h126v-62h-126Z" fill="#343047" />
            <path d="M-180-10h360v-86h-360Z" fill="#302a47" />
            <path d="m-224-96 224-148 224 148Z" fill="#403754" />
            <path d="m-224-96 224-148v34l-174 114Z" fill="#544564" />
            <path d="M-116 382V228a116 116 0 0 1 232 0v154Z" fill="#111022" />
            <path d="M-136 182h272M-284-10h82m404 0h82M-180-10h360" stroke="#49405e" strokeWidth="18" />
            <path d="M-244 382h488M-292 420h584" stroke="#544963" strokeWidth="8" />
            <g fill="#74ead9" opacity=".8">
              <rect x="-264" y="146" width="12" height="18" /><rect x="252" y="146" width="12" height="18" />
              <rect x="-144" y="-52" width="12" height="18" /><rect x="132" y="-52" width="12" height="18" />
            </g>
          </g>
        </g>
        <g data-parallax=".32" data-scroll-speed="56">
          <path d="M0 900V790l150-66 138 30 116-58 134 58 132-24 160 50 152-44 140 36 138-52 140 42v138H0Z" fill="#0b1020" />
          <path d="M0 842 170 790l154 26 146-20 134 24 166-18 150 22 150-26 154 24 156-18 220 24v172H0Z" fill="#080d19" />
          <PineTree x={64} y={884} scale={1.35} dark />
          <PineTree x={1536} y={890} scale={1.55} dark />
          <Crystal x={208} y={900} scale={1.45} color="#73f1de" />
          <Crystal x={1400} y={900} scale={1.75} color="#9e8bea" />
          <rect x="350" y="826" width="7" height="7" fill="#8cf5dc" className="star star--twinkle" />
          <rect x="1260" y="778" width="6" height="6" fill="#8cf5dc" className="star star--twinkle" />
        </g>
      </svg>
      <div className="stronghold-scene__vignette" />
    </div>
  );
}
