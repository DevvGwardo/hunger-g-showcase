import { useId } from 'react';
import { Cloud, Cottage, OakTree, VoxelPerson } from './VoxelPrimitives';

export function HeroLandscape() {
  const rawId = useId();
  const id = rawId.replace(/:/g, '');

  return (
    <div className="hero-landscape" aria-hidden="true">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" role="presentation">
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5faaa9" />
            <stop offset=".42" stopColor="#efbb83" />
            <stop offset=".72" stopColor="#f8d8a2" />
            <stop offset="1" stopColor="#dbe0b0" />
          </linearGradient>
          <radialGradient id={`${id}-sun`}>
            <stop offset="0" stopColor="#fff8cf" stopOpacity=".9" />
            <stop offset=".32" stopColor="#ffe6a3" stopOpacity=".48" />
            <stop offset="1" stopColor="#ffd78c" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7eb8ab" />
            <stop offset=".5" stopColor="#4d8d88" />
            <stop offset="1" stopColor="#285d60" />
          </linearGradient>
          <linearGradient id={`${id}-ray`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff3c5" stopOpacity=".35" />
            <stop offset="1" stopColor="#fff3c5" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g data-parallax=".06" data-scroll-speed="8">
          <rect width="1600" height="900" fill={`url(#${id}-sky)`} />
          <circle cx="1215" cy="218" r="270" fill={`url(#${id}-sun)`} />
          <path d="M1191 142h48v48h-48Z" fill="#fff1b8" />
          <path d="m1183 150 64-8v64l-64 8Z" fill="#ffe9a7" opacity=".9" />
          <path d="m1130 250 112-108 98 350-132 54Z" fill={`url(#${id}-ray)`} />
          <path d="m1260 260 82-118 76 338-104 52Z" fill={`url(#${id}-ray)`} opacity=".55" />
        </g>

        <g data-parallax=".12" data-scroll-speed="15">
          <g className="cloud cloud--one"><Cloud x={104} y={124} scale={1.25} /></g>
          <g className="cloud cloud--two"><Cloud x={690} y={96} scale={0.8} /></g>
          <g className="cloud cloud--three"><Cloud x={1348} y={138} scale={1.05} /></g>
          <g opacity=".6"><Cloud x={420} y={264} scale={0.55} /><Cloud x={1006} y={306} scale={0.48} /></g>
        </g>

        <g data-parallax=".16" data-scroll-speed="22">
          <path d="M0 492 108 422l64 24 116-136 86 60 92-118 120 132 106-78 98 68 132-128 122 126 110-86 134 104 112-74v332H0Z" fill="#779b8a" opacity=".55" />
          <path d="m270 354 74-44 86 60-50-12-30 20-30-18Zm548 22 106-78 98 68-68-22-30 20-34-14Z" fill="#dce4cf" opacity=".58" />
          <path d="M0 520 120 462l100 32 142-96 126 96 128-64 142 72 144-106 126 90 132-52 140 70 200-58v334H0Z" fill="#547e6d" />
          <path d="M0 568 134 522l112 22 158-52 126 52 140-26 146 38 156-54 130 32 156-52 242 56v244H0Z" fill="#426e5b" />
        </g>

        <g data-parallax=".22" data-scroll-speed="32">
          <path d="M0 592c142-62 262-26 386-14 154 16 258-48 406-18 154 32 282 12 410-20 164-40 264 16 398 34v326H0Z" fill="#6f985a" />
          <path d="M0 630c142-40 256-10 376 0 162 14 276-38 412-12 166 32 280 10 414-16 166-32 268 14 398 32v266H0Z" fill="#88a960" />
          <path d="M0 690c210-30 350 28 520 6 190-24 314-8 448 12 194 28 406-40 632-12v204H0Z" fill="#527c4e" />
          <OakTree x={92} y={646} scale={0.82} />
          <OakTree x={286} y={624} scale={0.66} />
          <OakTree x={1468} y={630} scale={0.92} />
          <OakTree x={1370} y={604} scale={0.58} />
        </g>

        <g data-parallax=".3" data-scroll-speed="44">
          <path d="M644 592c92-12 178 18 272 30 84 10 158-10 230 8-72 34-132 64-190 104-60 42-104 86-142 166H462c38-80 96-122 136-170 44-52 64-104 46-138Z" fill="#a6c4a1" opacity=".92" />
          <path d="M678 614c88 4 158 22 244 34 58 8 112 2 164 6-92 42-146 72-204 116-38 30-68 68-94 116H528c34-70 82-116 120-158 32-36 46-82 30-114Z" fill={`url(#${id}-water)`} />
          <path d="M708 646h108m-42 28h128m-202 36h124m-48 30h150" stroke="#c6e2cf" strokeWidth="5" opacity=".48" />
          <Cottage x={438} y={598} scale={0.92} />
          <Cottage x={1156} y={586} scale={1.08} />
          <Cottage x={1272} y={626} scale={0.74} />
          <Cottage x={318} y={632} scale={0.66} />
          <path d="M390 632h92l-30 74h-96Zm668-18h84l-18 82h-92Z" fill="#b8a576" />
          <rect x="1024" y="502" width="10" height="94" fill="#70573d" />
          <path d="M1014 500h30v18h-30Z" fill="#ffd67d" />
          <rect x="1048" y="530" width="9" height="74" fill="#70573d" />
          <path d="M1039 528h27v17h-27Z" fill="#ffd67d" />
        </g>

        <g data-parallax=".38" data-scroll-speed="60">
          <path d="M0 758 104 704l84 18 126-32 108 36 130-26 116 30 126-24 116 24 142-38 128 24 120-26 200 34v176H0Z" fill="#3f6746" />
          <path d="M0 800 120 758l108 18 118-20 116 24 136-18 122 20 118-22 142 20 132-28 148 26 140-16 100 20v118H0Z" fill="#2e543d" />
          <path d="M0 838h1600v62H0Z" fill="#203f33" />
          <OakTree x={44} y={846} scale={1.48} dark />
          <OakTree x={1518} y={856} scale={1.66} dark />
          <g className="hero-firefly"><rect x="218" y="704" width="6" height="6" fill="#fff3a6" /></g>
          <g className="hero-firefly hero-firefly--two"><rect x="1324" y="680" width="5" height="5" fill="#fff3a6" /></g>
          <VoxelPerson x={854} y={676} scale={0.88} />
          <path d="M846 678h24v7h-24Z" fill="#2b4238" opacity=".45" />
        </g>
      </svg>
      <div className="hero-landscape__grain" />
    </div>
  );
}
