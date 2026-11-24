import { useId } from 'react';
import type { GalleryItem } from '../data';
import { starPoints } from '../artConstants';
import { Cloud, Cottage, Crystal, FloatingIsland, OakTree, PineTree } from './VoxelPrimitives';

export function GalleryArt({ item }: { item: GalleryItem }) {
  const rawId = useId();
  const id = rawId.replace(/:/g, '');

  return (
    <svg className={`gallery-art gallery-art--${item.scene}`} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={item.palette} />
          <stop offset="1" stopColor="#203c39" />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor={item.palette} stopOpacity=".72" />
          <stop offset="1" stopColor={item.palette} stopOpacity="0" />
        </radialGradient>
      </defs>
      {item.scene === 'village' && <VillageArt id={id} />}
      {item.scene === 'bridge' && <BridgeArt />}
      {item.scene === 'tower' && <TowerArt id={id} />}
      {item.scene === 'camp' && <CampArt id={id} />}
      {item.scene === 'garden' && <GardenArt id={id} />}
      {item.scene === 'portal' && <PortalArt id={id} />}
    </svg>
  );
}

function VillageArt({ id }: { id: string }) {
  return (
    <>
      <rect width="800" height="600" fill={`url(#${id}-sky)`} />
      <circle cx="650" cy="132" r="160" fill={`url(#${id}-glow)`} />
      <Cloud x={82} y={86} scale={0.65} />
      <path d="M0 320 130 236l114 54 124-104 124 112 130-68 178 104v266H0Z" fill="#537b6b" />
      <path d="M0 360c180-30 260 20 400 8s250-40 400-4v236H0Z" fill="#4b7790" />
      <path d="M0 420c150-22 260 14 390 4s250-30 410-8v184H0Z" fill="#315e70" />
      <Cottage x={178} y={382} scale={0.82} />
      <Cottage x={332} y={356} scale={1.05} />
      <Cottage x={610} y={386} scale={0.76} />
      <OakTree x={58} y={402} scale={0.8} />
      <path d="M236 420h314v22H236Zm-40 42h354v18H196Z" fill="#9f8058" />
      <path d="M260 420v78m242-78v78m-242-18h242" stroke="#654d38" strokeWidth="10" />
      <path d="M354 456h70m-154 22h152m180-28h60" stroke="#a8cfcb" strokeWidth="5" opacity=".5" />
    </>
  );
}

function BridgeArt() {
  return (
    <>
      <rect width="800" height="600" fill="#8dc9d7" />
      <circle cx="626" cy="104" r="100" fill="#ffe6a4" opacity=".7" />
      <Cloud x={82} y={98} scale={0.9} />
      <Cloud x={526} y={182} scale={0.62} />
      <path d="M0 430 126 310l128 98 132-126 138 136 132-98 144 96v184H0Z" fill="#779e9a" opacity=".7" />
      <FloatingIsland x={88} y={470} scale={1.2} />
      <FloatingIsland x={716} y={436} scale={1.1} />
      <path d="M136 420h536v22H136Zm-20 38h576v18H116Z" fill="#b38d5b" />
      <path d="M170 420v78m92-78v70m92-70v64m92-64v60m92-60v64m92-64v70m92-70v78" stroke="#6e513b" strokeWidth="10" />
      <path d="M136 398h536M116 436h576" stroke="#d9bd83" strokeWidth="8" />
      <path d="m360 352 12-12 12 12-12 12Z" fill="#ff7f62" />
      <path d="M372 364v46" stroke="#5a4639" strokeWidth="6" />
    </>
  );
}

function TowerArt({ id }: { id: string }) {
  return (
    <>
      <rect width="800" height="600" fill="#11192f" />
      {starPoints.filter((_, index) => index % 2 === 0).slice(0, 20).map(([x, y], index) => (
        <rect key={index} x={x / 2} y={y / 2} width="3" height="3" fill="#c7d5ff" opacity=".8" />
      ))}
      <circle cx="620" cy="126" r="54" fill="#d5d8ef" />
      <circle cx="638" cy="110" r="54" fill="#11192f" />
      <path d="M0 470 140 390l140 60 160-90 150 90 130-60 80 40v170H0Z" fill="#202840" />
      <g transform="translate(400 430)">
        <path d="M-116 0h232v32h-232Z" fill="#3e3d58" />
        <path d="M-92-28h184v28h-184Z" fill="#4e4b66" />
        <path d="M-72-190h144v162h-144Z" fill="#39364f" />
        <path d="M-100-190h56v-90h-56Zm144 0h56v-90h-56Z" fill="#28263e" />
        <path d="M-44-190h88v-56h-88Z" fill="#49425f" />
        <path d="m-122-280 122-86 122 86Z" fill="#76607c" />
        <path d="M-30-144h60v66h-60Z" fill="#ffce75" />
        <path d="M-52-104h24v28h-24Zm80 0h24v28H28Z" fill="#eab76f" />
        <path d="M-142-32h284" stroke="#686077" strokeWidth="12" />
      </g>
      <circle cx="400" cy="260" r="160" fill={`url(#${id}-glow)`} opacity=".18" />
      <PineTree x={64} y={520} scale={1.05} dark />
      <PineTree x={744} y={520} scale={1.2} dark />
    </>
  );
}

function CampArt({ id }: { id: string }) {
  return (
    <>
      <rect width="800" height="600" fill={`url(#${id}-sky)`} />
      <circle cx="400" cy="420" r="250" fill={`url(#${id}-glow)`} opacity=".3" />
      <PineTree x={70} y={520} scale={1.7} dark />
      <PineTree x={732} y={512} scale={1.85} dark />
      <PineTree x={168} y={480} scale={1.15} dark />
      <PineTree x={644} y={474} scale={1.2} dark />
      <path d="M0 470c160-40 280 20 400 0s260-30 400 0v130H0Z" fill="#263c32" />
      <g transform="translate(252 438)">
        <path d="m0 64 70-116 78 116Z" fill="#b66f49" />
        <path d="m70-52 8 116H48Z" fill="#75483d" />
        <path d="m52 64 18-54 22 54Z" fill="#2b2c2c" />
      </g>
      <g transform="translate(512 446) scale(.76)">
        <path d="m0 64 70-116 78 116Z" fill="#d39755" />
        <path d="m70-52 8 116H48Z" fill="#875a3e" />
        <path d="m52 64 18-54 22 54Z" fill="#2b2c2c" />
      </g>
      <g transform="translate(408 482)">
        <path d="M-42 32h84l-12 18h-60Z" fill="#6c5541" />
        <path d="m-34 22 34-64 34 64Z" fill="#ff9552" />
        <path d="m-20 22 20-42 20 42Z" fill="#ffe091" />
        <path d="M-62 4h124" stroke="#7b5c42" strokeWidth="12" strokeLinecap="square" />
      </g>
      <g fill="#ffe6a0"><rect x="354" y="386" width="5" height="5" /><rect x="458" y="350" width="4" height="4" /><rect x="500" y="402" width="5" height="5" /></g>
    </>
  );
}

function GardenArt({ id }: { id: string }) {
  return (
    <>
      <rect width="800" height="600" fill={`url(#${id}-sky)`} />
      <Cloud x={104} y={82} scale={0.65} />
      <path d="M0 340 160 250l140 70 170-100 150 100 130-60 50 40v300H0Z" fill="#75975c" />
      <path d="M0 420h800v180H0Z" fill="#577d46" />
      <path d="M120 400h560v24H120Z" fill="#d0ba87" />
      <path d="M100 424h600v20H100Z" fill="#a68c62" />
      <path d="M360 360h80v120h-80Z" fill="#c9b17b" />
      <path d="M320 360h160v24H320Z" fill="#dfc990" />
      <g transform="translate(400 338)">
        <path d="M-36 18h72v-72h-72Z" fill="#4c9294" />
        <path d="M-48-54h96v72h-96Z" fill="#9adbd0" opacity=".5" />
        <path d="M-26-28h52v-52h-52Z" fill="#d8fff0" opacity=".55" />
      </g>
      {[176, 264, 536, 624].map((x, index) => (
        <g key={x} transform={`translate(${x} 480)`}>
          <path d="M-28 0h56v20h-56Z" fill="#806142" />
          <path d="M0-52v52" stroke="#3e7846" strokeWidth="8" />
          <path d="M-30-52h20v20h-20Zm40 0h20v20H10Z" fill={index % 2 ? '#f3a26f' : '#c4a1ee'} />
          <path d="M-10-72h20v20h-20Z" fill="#ffe68b" />
        </g>
      ))}
      <circle cx="400" cy="340" r="190" fill={`url(#${id}-glow)`} opacity=".16" />
      <Crystal x={82} y={540} scale={0.62} color="#b9ed78" />
      <Crystal x={724} y={544} scale={0.72} color="#b9ed78" />
    </>
  );
}

function PortalArt({ id }: { id: string }) {
  return (
    <>
      <rect width="800" height="600" fill="#101329" />
      {starPoints.filter((_, index) => index % 2 === 1).slice(0, 18).map(([x, y], index) => (
        <rect key={index} x={x / 2} y={y / 2} width="3" height="3" fill={index % 3 ? '#c9c9ff' : '#73f1de'} />
      ))}
      <FloatingIsland x={116} y={446} scale={0.9} />
      <FloatingIsland x={696} y={420} scale={0.8} />
      <path d="M0 520 160 450l140 50 140-50 160 50 120-40 80 30v110H0Z" fill="#1e2039" />
      <g transform="translate(400 430)">
        <path d="M-118 0h236v26h-236Z" fill="#343047" />
        <path d="M-94-26h188v26h-188Z" fill="#4a405d" />
        <path d="M-82-202h164v176h-164Z" fill="#27233e" />
        <path d="M-108-202h52v-70h-52Zm164 0h52v-70h-52Z" fill="#1b1930" />
        <path d="M-56-272h112v70h-112Z" fill="#3b3354" />
        <path d="M-64-202V-98a64 64 0 0 1 128 0v104Z" fill="#121126" />
        <path d="M-48-202V-98a48 48 0 0 1 96 0v104Z" fill="#67e8d6" opacity=".86" />
        <path d="M-28-202V-98a28 28 0 0 1 56 0v104Z" fill="#c1fff2" opacity=".7" />
        <path d="M-108-202h52m112 0h52" stroke="#5d4c78" strokeWidth="16" />
      </g>
      <circle cx="400" cy="320" r="210" fill={`url(#${id}-glow)`} opacity=".28" />
      <Crystal x={80} y={560} scale={1} color="#73f1de" />
      <Crystal x={730} y={566} scale={1.1} color="#a18bff" />
      <OakTree x={752} y={590} scale={0.9} dark />
    </>
  );
}
