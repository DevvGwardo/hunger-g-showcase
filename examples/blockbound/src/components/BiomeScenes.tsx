import { useId, type CSSProperties } from 'react';
import type { Biome } from '../data';
import { starPoints } from '../artConstants';
import { Cloud, Cottage, Crystal, FloatingIsland, OakTree, PineTree, VoxelPerson } from './VoxelPrimitives';

interface BiomeArtworkProps {
  biome: Biome;
  decorative?: boolean;
}

export function BiomeArtwork({ biome, decorative = true }: BiomeArtworkProps) {
  const rawId = useId();
  const id = rawId.replace(/:/g, '');
  const particles = Array.from({ length: 18 }, (_, index) => ({
    x: (index * 37 + 11) % 100,
    y: (index * 53 + 17) % 100,
    delay: (index % 7) * -0.8,
    duration: 5 + (index % 5),
  }));

  return (
    <div
      className={`biome-art biome-art--${biome.id}`}
      style={{ '--biome-accent': biome.accent } as CSSProperties}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : `Original voxel landscape of ${biome.name}`}
      aria-hidden={decorative || undefined}
    >
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={biome.sky} />
            <stop offset="1" stopColor={biome.ground} />
          </linearGradient>
          <radialGradient id={`${id}-glow`}>
            <stop offset="0" stopColor={biome.accent} stopOpacity=".6" />
            <stop offset="1" stopColor={biome.accent} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-lava`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffcf67" />
            <stop offset=".5" stopColor="#ff733d" />
            <stop offset="1" stopColor="#a92232" />
          </linearGradient>
        </defs>
        {biome.id === 'sunmeadow' && <Sunmeadow id={id} />}
        {biome.id === 'whisperwood' && <Whisperwood id={id} />}
        {biome.id === 'hollow' && <Hollow id={id} />}
        {biome.id === 'emberwaste' && <Emberwaste id={id} />}
        {biome.id === 'beyond' && <Beyond id={id} />}
      </svg>
      <div className={`biome-particles biome-particles--${biome.particle}`}>
        {particles.map((particle, index) => (
          <i
            key={index}
            style={{
              '--x': `${particle.x}%`,
              '--y': `${particle.y}%`,
              '--delay': `${particle.delay}s`,
              '--duration': `${particle.duration}s`,
            } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}

function Sunmeadow({ id }: { id: string }) {
  return (
    <>
      <g data-parallax=".05" data-scene-layer="far">
        <rect width="1600" height="900" fill={`url(#${id}-sky)`} />
        <circle cx="1240" cy="180" r="220" fill={`url(#${id}-glow)`} />
        <path d="M1196 136h64v64h-64Z" fill="#fff0ba" />
        <Cloud x={170} y={132} scale={1.2} />
        <Cloud x={830} y={92} scale={0.7} />
        <path d="M0 460 160 350l130 60 160-160 150 160 150-90 180 110 150-150 150 160 150-90 220 120v330H0Z" fill="#73927c" opacity=".62" />
      </g>
      <g data-parallax=".12" data-scene-layer="mid">
        <path d="M0 550c180-80 330-10 480 0s280-60 460-10 360 20 660-40v400H0Z" fill="#74974f" />
        <path d="M0 640c210-60 340 20 520 10s310-70 500-20 360 10 580-40v310H0Z" fill="#527d48" />
        <path d="M720 550c120 0 210 54 310 76s210 10 270 62-76 116-186 212H570c40-120 90-178 90-238 0-54 10-90 60-112Z" fill="#4e9290" />
        <path d="M784 602h134m-184 52h154m-110 54h160m30 70h196" stroke="#a6d0bb" strokeWidth="6" opacity=".46" />
        <Cottage x={416} y={590} scale={1.25} />
        <Cottage x={1240} y={580} scale={1.05} />
        <Cottage x={1390} y={630} scale={0.8} />
        <OakTree x={154} y={654} scale={1.15} />
        <OakTree x={1076} y={570} scale={0.72} />
      </g>
      <g data-parallax=".22" data-scene-layer="near">
        <path d="M0 790 150 722l160 38 154-24 148 32 140-18 150 28 162-30 148 22 154-30 194 24v136H0Z" fill="#315b3d" />
        <VoxelPerson x={940} y={746} scale={1.05} />
        <path d="M900 746h82v12h-82Z" fill="#203c32" opacity=".5" />
      </g>
    </>
  );
}

function Whisperwood({ id }: { id: string }) {
  return (
    <>
      <g data-parallax=".04" data-scene-layer="far">
        <rect width="1600" height="900" fill={`url(#${id}-sky)`} />
        <circle cx="860" cy="200" r="420" fill={`url(#${id}-glow)`} opacity=".38" />
        <path d="m560 0 280 900H380Zm510 0 140 900H800Z" fill="#b8e3a3" opacity=".08" />
        <path d="M0 540 180 460l150 40 190-90 190 100 170-50 190 70 170-100 180 90 180-50v530H0Z" fill="#244a3c" />
      </g>
      <g data-parallax=".13" data-scene-layer="mid">
        <PineTree x={110} y={720} scale={2.4} dark />
        <PineTree x={330} y={690} scale={1.8} dark />
        <PineTree x={530} y={700} scale={2.1} />
        <PineTree x={1110} y={700} scale={2.15} />
        <PineTree x={1350} y={710} scale={2.45} dark />
        <PineTree x={1530} y={690} scale={1.75} dark />
        <path d="M0 690c200-30 330 30 500 10s320-30 500 0 360-20 600 0v200H0Z" fill="#294d39" />
        <path d="M640 900c20-100 84-164 144-194 64-32 108-58 116-106h-24c-18 62-72 78-136 112-56 30-88 98-100 188Z" fill="#486b47" />
        <g fill="#80e6a2">
          <rect x="510" y="556" width="18" height="18" /><rect x="540" y="598" width="10" height="10" />
          <rect x="1080" y="526" width="16" height="16" /><rect x="1140" y="604" width="12" height="12" />
          <rect x="916" y="636" width="10" height="10" />
        </g>
      </g>
      <g data-parallax=".26" data-scene-layer="near">
        <OakTree x={-30} y={930} scale={2.7} dark />
        <OakTree x={1620} y={930} scale={2.8} dark />
        <path d="M0 846c210-30 350 10 510 0s330 10 520 0 380 0 570-10v64H0Z" fill="#142f28" />
        <g transform="translate(780 770)">
          <path d="M-22 0h44v10h-44Z" fill="#d9c5a2" />
          <path d="M-18-10h36l10 10h-56Z" fill="#a65f53" />
          <rect x="-6" y="-18" width="12" height="8" fill="#e8d8ae" />
        </g>
      </g>
    </>
  );
}

function Hollow({ id }: { id: string }) {
  return (
    <>
      <g data-parallax=".04" data-scene-layer="far">
        <rect width="1600" height="900" fill="#141225" />
        <ellipse cx="850" cy="560" rx="620" ry="430" fill={`url(#${id}-glow)`} opacity=".44" />
        <path d="M0 0h1600v900H0Zm260 900V390c0-216 242-390 540-390s540 174 540 390v510Z" fill="#28213d" fillRule="evenodd" />
        <path d="M0 0h310v90h-70v80h80v100h-90v130h110v120H0Zm1290 0h310v520h-110V400h90V270h-80V190h70V100h-70V0Z" fill="#35294c" />
        <path d="M260 140h80v110h-70v90H180V220h80Zm980-20h80v100h80v120h-90v-90h-70Z" fill="#44345f" />
      </g>
      <g data-parallax=".13" data-scene-layer="mid">
        <path d="M0 680c260-40 360 20 560 0s400 20 560-10 320 20 480 0v230H0Z" fill="#332848" />
        <path d="M310 782c190-48 340-12 510 8s330 12 480-26v136H310Z" fill="#50406d" />
        <path d="M410 806c200-30 330 16 500 4s300-12 360 14v76H410Z" fill="#1f6170" opacity=".78" />
        <path d="M480 824h180m-96 24h250m40 28h180" stroke="#79d4d6" strokeWidth="5" opacity=".4" />
        <Crystal x={380} y={746} scale={1.65} />
        <Crystal x={1220} y={760} scale={2.1} color="#9be5e4" />
        <Crystal x={1330} y={778} scale={1.2} />
        <Crystal x={260} y={790} scale={1.05} color="#d4b5ff" />
        <g transform="translate(800 540)">
          <rect x="-5" y="0" width="10" height="108" fill="#765137" />
          <path d="M-20-12h40v34h-40Z" fill="#ffc46c" />
          <path d="M-12-4h24v18h-24Z" fill="#fff0a3" />
          <circle cx="0" cy="6" r="96" fill={`url(#${id}-glow)`} />
        </g>
      </g>
      <g data-parallax=".25" data-scene-layer="near">
        <path d="M0 900V770l90-50 86 36 80-70 120 74v140Zm1600 0V740l-86-54-98 42-84-62-112 62v172Z" fill="#1d172e" />
        <Crystal x={146} y={892} scale={2.1} color="#c0a7ff" />
        <Crystal x={1500} y={890} scale={1.65} color="#9be5e4" />
      </g>
    </>
  );
}

function Emberwaste({ id }: { id: string }) {
  return (
    <>
      <g data-parallax=".04" data-scene-layer="far">
        <rect width="1600" height="900" fill={`url(#${id}-sky)`} />
        <circle cx="820" cy="280" r="360" fill={`url(#${id}-glow)`} opacity=".48" />
        <path d="M0 500 150 410l110 50 150-150 130 150 140-70 170 100 150-170 140 160 140-80 170 90 150-60v470H0Z" fill="#381b29" />
        <path d="M0 620 180 540l170 50 190-60 180 70 200-50 180 50 180-70 180 60 140-30v340H0Z" fill="#4c202b" />
      </g>
      <g data-parallax=".13" data-scene-layer="mid">
        <path d="M0 720c260-60 410 20 610-10s360 0 520-20 310 20 470 10v200H0Z" fill={`url(#${id}-lava)`} />
        <path d="M0 760c260-40 410 20 610-10s360 0 520-20 310 20 470 10" fill="none" stroke="#ffd36b" strokeWidth="16" opacity=".72" />
        <path d="M0 880 250 780l180 22 130-52 180 58 160-34 180 36 160-52 170 52 190-22v112H0Z" fill="#2b202a" />
        <g fill="#392633">
          <path d="M180 720V310h74v410Z" /><path d="M250 310h44v-64h-44Z" />
          <path d="M1240 740V250h90v490Z" /><path d="M1320 250h54v-86h-54Z" />
          <path d="M1080 700V430h58v270Z" /><path d="M400 690V460h60v230Z" />
        </g>
        <g fill="#6e3438">
          <path d="M198 310h56v410h-56Z" /><path d="M1258 250h72v490h-72Z" />
          <path d="M1092 430h46v270h-46Z" />
        </g>
        <path d="M470 646h650l-54 38H514Z" fill="#51404a" />
        <path d="M514 684h552v18H514Z" fill="#2f2730" />
      </g>
      <g data-parallax=".26" data-scene-layer="near">
        <path d="M0 900V806l130-54 110 30 94-46 112 42v122Zm1600 0V780l-120-50-110 34-100-42-110 50v128Z" fill="#201b25" />
        <g transform="translate(780 610)">
          <path d="M-12 0h24v56h-24Z" fill="#352731" />
          <path d="M-24-34h48v36h-48Z" fill="#ff7847" />
          <path d="M-14-26h28v20h-28Z" fill="#ffd06c" />
        </g>
      </g>
    </>
  );
}

function Beyond({ id }: { id: string }) {
  return (
    <>
      <g data-parallax=".03" data-scene-layer="far">
        <rect width="1600" height="900" fill="#090e20" />
        {starPoints.map(([x, y, size], index) => (
          <rect key={index} x={x} y={y} width={size * 2} height={size * 2} fill={index % 3 ? '#c8d8ff' : '#78eadc'} opacity={index % 4 ? '.7' : '.38'} />
        ))}
        <circle cx="840" cy="480" r="480" fill={`url(#${id}-glow)`} opacity=".28" />
      </g>
      <g data-parallax=".11" data-scene-layer="mid">
        <FloatingIsland x={260} y={520} scale={1.15} />
        <FloatingIsland x={1340} y={470} scale={0.95} />
        <FloatingIsland x={1110} y={280} scale={0.45} />
        <g transform="translate(800 210)">
          <path d="M-150 390h300v34h-300Z" fill="#25213b" />
          <path d="M-124 356h248v34h-248Z" fill="#37304d" />
          <path d="M-112 224h224v132h-224Z" fill="#2b2542" />
          <path d="M-150 224h76v-120h-76Zm224 0h76v-120h-76Z" fill="#211d35" />
          <path d="M-142 104h60v-40h-60Zm224 0h60v-40h-60Z" fill="#37304d" />
          <path d="M-74 356V294a74 74 0 0 1 148 0v62Z" fill="#151429" />
          <path d="M-62 356V296a62 62 0 0 1 124 0v60Z" fill="#65e6d5" opacity=".82" />
          <path d="M-42 356V302a42 42 0 0 1 84 0v54Z" fill="#a3fff0" opacity=".6" />
          <path d="M-112 224h224M-150 104h76m148 0h76" stroke="#4a405f" strokeWidth="14" />
        </g>
      </g>
      <g data-parallax=".24" data-scene-layer="near">
        <path d="M0 900V840l140-38 132 24 118-32 128 28v78Zm1600 0V826l-142-42-120 30-112-28-128 34v80Z" fill="#111326" />
        <Crystal x={136} y={900} scale={1.5} color="#73f1de" />
        <Crystal x={1490} y={900} scale={1.9} color="#a18bff" />
      </g>
    </>
  );
}
