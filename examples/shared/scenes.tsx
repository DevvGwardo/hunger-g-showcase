import { useId, type ReactNode } from 'react';

interface SceneFrameProps {
  children: ReactNode;
}

function SceneFrame({ children }: SceneFrameProps) {
  return (
    <div className="game-scene">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        role="presentation"
        aria-hidden="true"
        focusable="false"
      >
        {children}
      </svg>
    </div>
  );
}

function useSceneIds(scene: string) {
  const instance = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return (part: string) => `scene-${scene}-${instance}-${part}`;
}

interface CloudProps {
  x: number;
  y: number;
  scale?: number;
  opacity?: number;
  color?: string;
  delay?: number;
}

function Cloud({ x, y, scale = 1, opacity = 1, color = '#fff2d5', delay = 0 }: CloudProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <g className="cloud" style={{ animationDelay: `${delay}s` }}>
        <path
          d="M-132 26c-30 0-44-17-39-39 5-21 23-31 48-29 4-34 30-57 65-54 24 2 41 16 48 36 14-13 34-18 55-13 25 6 39 25 36 49 34-5 62 9 67 30 5 20-10 33-36 33H-104c-15 0-24-4-28-13Z"
          fill={color}
        />
        <path d="M-85-31c18-20 43-24 68-13 15 7 24 17 28 29-30-12-61-12-96-16Z" fill="#fff" opacity=".2" />
      </g>
    </g>
  );
}

interface PineProps {
  x: number;
  y: number;
  scale?: number;
  color?: string;
  snow?: boolean;
}

function Pine({ x, y, scale = 1, color = '#253e38', snow = false }: PineProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-7 0h14v26H-7Z" fill="#4a3b32" />
      <path d="M0-112-48-38h25L-61 8h37L-76 52H76L24 8h37L23-38h25Z" fill={color} />
      <path d="M0-112v164l76 0L24 8h37L23-38h25Z" fill="#101f22" opacity=".22" />
      {snow && <path d="m0-112-30 54 20-7 10 17 14-21 18 9Zm-39 91L-61 8l29-5 13 13 10-20Z" fill="#e9f0ed" opacity=".9" />}
    </g>
  );
}

type Mote = readonly [x: number, y: number, radius: number];

function ParticleField({ points, color, className }: { points: readonly Mote[]; color: string; className?: string }) {
  return (
    <g fill={color}>
      {points.map(([x, y, radius], index) => (
        <circle
          key={`${x}-${y}`}
          className={className}
          cx={x}
          cy={y}
          r={radius}
          opacity={0.45 + (index % 4) * 0.15}
          style={{ animationDelay: `${-index * 0.41}s` }}
        />
      ))}
    </g>
  );
}

function SceneVignette({ id }: { id: string }) {
  return <rect width="1600" height="900" fill={`url(#${id})`} pointerEvents="none" />;
}

export function FarmScene() {
  const id = useSceneIds('farm');
  const wheatPositions = [
    [85, 824, 1.25], [142, 852, 1.5], [210, 808, 1.1], [282, 870, 1.55],
    [356, 825, 1.2], [470, 874, 1.45], [545, 817, 1.1], [1110, 842, 1.3],
    [1184, 808, 1.05], [1260, 872, 1.55], [1342, 824, 1.2], [1430, 866, 1.5], [1520, 806, 1.15],
  ] as const;

  return (
    <SceneFrame>
      <defs>
        <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#526777" />
          <stop offset=".48" stopColor="#e7aa7f" />
          <stop offset="1" stopColor="#f8dda3" />
        </linearGradient>
        <linearGradient id={id('far-hills')} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#8d9b78" />
          <stop offset="1" stopColor="#657c5a" />
        </linearGradient>
        <linearGradient id={id('field')} x1=".2" y1="0" x2=".8" y2="1">
          <stop stopColor="#91a363" />
          <stop offset=".55" stopColor="#617b4d" />
          <stop offset="1" stopColor="#344d38" />
        </linearGradient>
        <linearGradient id={id('river')} x1="0" y1="0" x2=".8" y2="1">
          <stop stopColor="#bad9c5" />
          <stop offset=".5" stopColor="#78aaa0" />
          <stop offset="1" stopColor="#3f7273" />
        </linearGradient>
        <linearGradient id={id('cottage')} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f1d5a0" />
          <stop offset="1" stopColor="#bb825c" />
        </linearGradient>
        <linearGradient id={id('roof')} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#9a5c47" />
          <stop offset="1" stopColor="#513536" />
        </linearGradient>
        <radialGradient id={id('sun')}>
          <stop stopColor="#fff1b6" stopOpacity=".95" />
          <stop offset=".34" stopColor="#ffe1a0" stopOpacity=".46" />
          <stop offset="1" stopColor="#ffd18c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id('vignette')} cx=".5" cy=".45" r=".72">
          <stop offset=".56" stopColor="#182a24" stopOpacity="0" />
          <stop offset="1" stopColor="#182a24" stopOpacity=".5" />
        </radialGradient>
        <g id={id('wheat')} fill="none" stroke="#e2c77e" strokeWidth="4" strokeLinecap="round">
          <path d="M0 0V-76M0-18l-18-15M0-31l19-16M0-44l-18-15M0-57l18-14" />
          <path d="m-18-33-9-13m28 1 9-13m-28 28-10-10m29 1 10-11" strokeWidth="7" />
        </g>
      </defs>

      <rect width="1600" height="900" fill={`url(#${id('sky')})`} />
      <g data-depth="0.02">
        <circle className="glow" cx="1260" cy="238" r="218" fill={`url(#${id('sun')})`} />
        <circle cx="1260" cy="238" r="67" fill="#ffe8ad" />
        <circle cx="1241" cy="219" r="43" fill="#fff4ca" opacity=".32" />
      </g>
      <g data-depth="0.035">
        <Cloud x={236} y={148} scale={1.08} opacity={0.7} delay={-2} />
        <Cloud x={932} y={104} scale={0.62} opacity={0.48} delay={-6} />
        <Cloud x={1480} y={304} scale={0.75} opacity={0.32} color="#ffe7c6" delay={-4} />
        <path d="M688 226q14-14 28 0 14-14 28 0m-77 39q10-10 20 0 10-10 20 0" fill="none" stroke="#5e6258" strokeWidth="4" strokeLinecap="round" opacity=".55" />
      </g>

      <g data-depth="0.05">
        <path d="M0 448 152 366l93 50 167-111 136 124 132-83 172 112 151-94 156 91 177-131 264 143v233H0Z" fill={`url(#${id('far-hills')})`} />
        <path d="m152 366 93 50 167-111 54 62-54-17-54 63-63-19-80 37Z" fill="#c1ba91" opacity=".26" />
        <path d="M0 524c156-75 264-67 407-11 132 52 230 20 358-31 152-61 270-41 401 12 172 69 297-27 434-49v277H0Z" fill="#73885b" />
        <path d="M0 567c190-49 338-14 500 20 188 40 331-33 506-45 211-15 368 50 594 4v176H0Z" fill="#60784e" />
      </g>

      <g data-depth="0.09">
        <path d="M0 626c196-57 341-21 489 19 182 49 332-35 501-42 224-10 394 58 610 8v289H0Z" fill={`url(#${id('field')})`} />
        <path
          d="M855 430C820 500 970 512 905 575c-70 67 65 97-25 165-75 55 0 104-90 160"
          fill="none"
          stroke="#47654d"
          strokeWidth="30"
          strokeLinecap="round"
        />
        <path
          d="M855 430C820 500 970 512 905 575c-70 67 65 97-25 165-75 55 0 104-90 160"
          fill="none"
          stroke={`url(#${id('river')})`}
          strokeWidth="236"
          strokeLinecap="round"
        />
        <path d="M857 477c29 39 83 41 103 70m-172 83c54 25 111 23 151 51m-205 89c53 16 100 41 139 79" fill="none" stroke="#d8e6c9" strokeWidth="7" strokeLinecap="round" opacity=".34" />
        <path d="M0 692c230-36 361 16 545-3M1110 690c152-38 324-17 490-66M0 774c205-29 371 16 552-3M1140 790c151-34 309-15 460-57" fill="none" stroke="#b3bd77" strokeWidth="13" opacity=".24" />
        <path d="M0 838c199-31 356 14 542-4m377-37c142-27 283-20 451-53" fill="none" stroke="#263f31" strokeWidth="20" opacity=".28" />
      </g>

      <g data-depth="0.13">
        <g transform="translate(286 389)">
          <path d="M30 98h241v174H30Z" fill={`url(#${id('cottage')})`} />
          <path d="M271 104v168h34V87Z" fill="#946449" />
          <path d="M-24 111 150-38l176 149Z" fill={`url(#${id('roof')})`} />
          <path d="m-24 111 174-149 34 25-151 139Z" fill="#b47756" opacity=".55" />
          <path d="M176-7h43v86h-43Z" fill="#7c5546" />
          <path d="M170-15h55v18h-55Z" fill="#533b35" />
          <path d="M98 164h70v108H98Z" fill="#614638" />
          <path d="M108 174h50v98h-50Z" fill="#79543d" />
          <circle cx="148" cy="224" r="5" fill="#e9c77f" />
          <rect x="47" y="150" width="38" height="47" rx="2" fill="#5c493a" />
          <rect x="52" y="155" width="28" height="37" fill="#f5cf78" />
          <path d="M66 155v37m-14-19h28" stroke="#775840" strokeWidth="5" />
          <rect x="205" y="150" width="38" height="47" rx="2" fill="#5c493a" />
          <rect x="210" y="155" width="28" height="37" fill="#f5cf78" />
          <path d="M224 155v37m-14-19h28" stroke="#775840" strokeWidth="5" />
          <path d="M14 272h259" stroke="#344c36" strokeWidth="14" strokeLinecap="round" />
        </g>

        <g transform="translate(1210 380)">
          <path d="m-55 250 23-190h64l24 190Z" fill="#d7bd8c" />
          <path d="m32 60 24 190h-56Z" fill="#a98561" />
          <path d="M-33 160h67M-29 105h58M-25 212h52" stroke="#9b7959" strokeWidth="6" opacity=".5" />
          <path d="m-46 66 46-64 47 64Z" fill="#5c4339" />
          <path d="M-21 251V139h43v112" fill="#644a3b" />
          <circle r="17" fill="#4a3932" />
          <g fill="#e7d4a5" stroke="#715844" strokeWidth="7" strokeLinejoin="round">
            <path d="M-9-8-17-159 16-166 11-8Z" />
            <path d="M-9-8-17-159 16-166 11-8Z" transform="rotate(90)" />
            <path d="M-9-8-17-159 16-166 11-8Z" transform="rotate(180)" />
            <path d="M-9-8-17-159 16-166 11-8Z" transform="rotate(270)" />
          </g>
          <path d="M-4-160-72-163M4 160l-76 3m160-167-68 3m64 157 68 3" stroke="#8d7154" strokeWidth="5" opacity=".7" />
          <circle r="10" fill="#6b4c3b" />
        </g>
      </g>

      <g data-depth="0.2">
        <path d="M35 690 605 664" stroke="#d0b47c" strokeWidth="12" />
        <path d="M35 735 605 709" stroke="#c3a16d" strokeWidth="10" />
        {[62, 157, 252, 347, 442, 537].map((x) => (
          <path key={x} d={`M${x} 665v104l12-8 12 8V663Z`} fill="#b99464" />
        ))}
        {wheatPositions.map(([x, y, scale], index) => (
          <use key={`${x}-${y}`} href={`#${id('wheat')}`} transform={`translate(${x} ${y}) scale(${scale})`} opacity={0.7 + (index % 3) * 0.12} />
        ))}
        <path d="M0 884c139-39 244-8 350 16H0Zm1217 16c130-64 252-63 383-28v28Z" fill="#263e30" />
      </g>
      <SceneVignette id={id('vignette')} />
    </SceneFrame>
  );
}

export function HollowScene() {
  const id = useSceneIds('hollow');
  const stalactites = [
    [42, 76, 186], [178, 58, 118], [322, 84, 226], [488, 54, 143],
    [652, 70, 192], [842, 56, 132], [1022, 82, 234], [1208, 62, 165], [1406, 92, 258], [1552, 64, 150],
  ] as const;
  const motes = [
    [270, 390, 4], [352, 570, 3], [458, 326, 5], [552, 486, 3], [642, 278, 4],
    [858, 392, 5], [946, 520, 3], [1060, 298, 4], [1278, 390, 5], [1370, 576, 3],
    [1002, 686, 4], [418, 730, 3],
  ] as const;

  return (
    <SceneFrame>
      <defs>
        <linearGradient id={id('cave')} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#07161e" />
          <stop offset=".55" stopColor="#103038" />
          <stop offset="1" stopColor="#071b22" />
        </linearGradient>
        <linearGradient id={id('rock')} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#24444a" />
          <stop offset="1" stopColor="#0b222b" />
        </linearGradient>
        <linearGradient id={id('wing')} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#183d45" />
          <stop offset=".55" stopColor="#0b252e" />
          <stop offset="1" stopColor="#06171f" />
        </linearGradient>
        <linearGradient id={id('water')} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#174b50" />
          <stop offset="1" stopColor="#071a22" />
        </linearGradient>
        <radialGradient id={id('lantern')}>
          <stop stopColor="#bafff2" stopOpacity=".74" />
          <stop offset=".2" stopColor="#63efdc" stopOpacity=".38" />
          <stop offset=".62" stopColor="#2bc6bc" stopOpacity=".12" />
          <stop offset="1" stopColor="#2bc6bc" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id('vignette')} cx=".5" cy=".48" r=".7">
          <stop offset=".48" stopColor="#020a10" stopOpacity="0" />
          <stop offset="1" stopColor="#020a10" stopOpacity=".78" />
        </radialGradient>
      </defs>

      <rect width="1600" height="900" fill={`url(#${id('cave')})`} />
      <g data-depth="0.03">
        <path d="M0 0h1600v130l-146 41-118-35-141 77-153-43-155 50-145-62-172 49-133-39-149 52L0 261Z" fill="#0a2029" />
        <path d="M0 0h1600v56l-131 22-102-28-161 39-121-24-143 34-181-31-136 35-151-22-163 32-130-27L0 124Z" fill="#122f37" opacity=".7" />
      </g>
      <g data-depth="0.05" fill="#1a363d">
        {stalactites.map(([x, width, length], index) => (
          <path
            key={x}
            d={`M${x - width} 0h${width * 2}l${width * 0.12} ${length}l${-width * 0.32} ${-length * 0.24}l${-width * 0.35} ${length * 0.24}Z`}
            opacity={0.66 + (index % 3) * 0.12}
          />
        ))}
      </g>

      <g data-depth="0.08">
        <path d="M207 722V364l84-128 82 128v358l-42 80H249Z" fill={`url(#${id('rock')})`} />
        <path d="m291 236 82 128v358l-42 80h-56l53-76V290Z" fill="#315057" opacity=".35" />
        <path d="M1190 735V332l103-155 102 155v403l-60 80h-86Z" fill="#102a33" />
        <path d="m1293 177 102 155v403l-60 80h-46l67-88V287Z" fill="#2a4750" opacity=".35" />
        <path d="M480 662c87-208 187-307 320-307s233 99 320 307" fill="none" stroke="#183840" strokeWidth="48" opacity=".55" />
        <path d="M0 681c217-54 359-30 533 8 222 49 380-18 575-22 221-5 332 43 492 19v214H0Z" fill={`url(#${id('water')})`} />
        <path d="M112 731c217-28 376 22 556 4m246-15c136-18 278-12 402 10M329 787c225-19 386 21 590 0m171 28c129-16 249-6 366 11" fill="none" stroke="#4b9991" strokeWidth="5" strokeLinecap="round" opacity=".22" />
      </g>

      <g data-depth="0.14">
        <g transform="translate(720 458)">
          <g fill={`url(#${id('wing')})`} stroke="#4faaa6" strokeWidth="3" strokeLinejoin="round">
            <path d="M-22-61C-112-205-325-199-374-84c-37 88 89 157 346 144Z" />
            <path d="M22-61C112-205 325-199 374-84c37 88-89 157-346 144Z" />
            <path d="M-29 3C-172-10-294 72-278 194c99 19 209-48 267-126Z" />
            <path d="M29 3C172-10 294 72 278 194c-99 19-209-48-267-126Z" />
          </g>
          <g fill="none" stroke="#65c6bb" strokeWidth="3" opacity=".42">
            <path d="M-30-50-322-113M-35-17-345-58M-38 18-262 153M30-50l292-63M35-17l310-41M38 18l224 135" />
            <path d="M-278 194q77-125 142-161m416 161Q438 137 373 82" />
          </g>
          <g fill="#29555a" opacity=".55">
            <path d="m-238-126 99-25 71 57-122 37Z" />
            <path d="m139-151 99 25 71 57-122 37Z" />
            <path d="m-213 100 79 40 26 37-92-19Z" />
            <path d="m213 100-79 40-26 37 92-19Z" />
          </g>
          <path d="M-18-86c-17 35-14 89 0 126 15 37 15 78 0 112 22-15 36-45 36-76 0-39-9-68-9-104 0 36-9 65-9 104 0 31 14 61 36 76-15-34 0-75 0-112 14-37 17-91 0-126Z" fill="#06171e" stroke="#3f8f8d" strokeWidth="3" />
          <path d="M-24-87c0-29 48-29 48 0 0 20-13 33-24 33S-24-67-24-87Z" fill="#081b23" stroke="#58b9ae" strokeWidth="3" />
          <path d="M-12-114C-52-157-85-163-108-145M12-114c40-43 73-49 96-31" fill="none" stroke="#62b8ae" strokeWidth="4" strokeLinecap="round" />
          <path d="m-107-145-13-12m216 26 14-12" stroke="#9de6d2" strokeWidth="4" strokeLinecap="round" />
          <g fill="#9cf5d7">
            <ellipse cx="-10" cy="-91" rx="5" ry="7" />
            <ellipse cx="10" cy="-91" rx="5" ry="7" />
          </g>
          <path d="M-13 32-71 78-100 119M13 32l58 46 29 41M-8 77-47 132l8 43M8 77l39 55-8 43" fill="none" stroke="#07171d" strokeWidth="9" strokeLinecap="round" />
          <path d="M-13 32-71 78-100 119M13 32l58 46 29 41" fill="none" stroke="#397d79" strokeWidth="2" strokeLinecap="round" opacity=".7" />
        </g>
      </g>

      <g data-depth="0.18">
        <circle className="glow" cx="1164" cy="524" r="308" fill={`url(#${id('lantern')})`} />
        <g transform="translate(1164 388)">
          <path d="M0 0v73" stroke="#507a73" strokeWidth="7" />
          <path d="M-41 77C-41 27 41 27 41 77" fill="none" stroke="#537f74" strokeWidth="10" />
          <path d="m-62 84 62-43 62 43Z" fill="#234b48" stroke="#629a87" strokeWidth="5" />
          <rect x="-45" y="84" width="90" height="122" rx="5" fill="#163c3d" stroke="#6ca894" strokeWidth="7" />
          <path d="m-28 105 28-18 28 18v61l-28 23-28-23Z" fill="#7ff5d8" opacity=".85" />
          <path className="glow" d="m-12 109 12-9 12 9v49l-12 12-12-12Z" fill="#d8fff0" />
          <path d="M-55 206h110l15 24h-140Z" fill="#28504a" stroke="#629a87" strokeWidth="5" />
          <path d="M0 88v118" stroke="#d0efe0" strokeWidth="4" opacity=".32" />
        </g>
        <path d="M1036 686c32-87 105-140 183-119 70 19 87 92 160 110l86 223h-515Z" fill="#102c31" />
        <path d="M1054 675c41-68 94-102 145-96l-20 71-89 66Z" fill="#2b4c49" />
        <path d="m1085 612 45-19-12 34 35 17-53 13Zm130 41 52-22-16 39 43 18-66 15Z" fill="#4f8962" opacity=".75" />
        <g fill="#4f8962">
          <ellipse cx="1048" cy="650" rx="42" ry="17" />
          <ellipse cx="1222" cy="614" rx="35" ry="14" />
          <ellipse cx="1330" cy="669" rx="55" ry="20" />
          <ellipse cx="1388" cy="752" rx="47" ry="18" />
        </g>
      </g>

      <g data-depth="0.24">
        <path d="M0 793 93 742l113 42 92-73 116 98 122-53 107 97H0Z" fill="#07171e" />
        <path d="m1201 900 38-130 95-47 84 69 182-37v145Z" fill="#06151c" />
        <path d="M210 776c20-58 54-77 81-58 26 19 4 58-18 82Zm42-112c11-36 36-49 53-35 18 15 3 43-12 59Z" fill="#376c56" />
        <g transform="translate(411 760)">
          <path d="M0 0v55m35-66v66" stroke="#72947d" strokeWidth="8" />
          <path d="M-22 0c0-37 44-37 44 0Zm70-11c0-37 44-37 44 0Z" fill="#54b9a0" />
          <path d="M-15 0h30m40-11h30" stroke="#a3efd2" strokeWidth="5" strokeLinecap="round" />
        </g>
      </g>
      <ParticleField points={motes} color="#8df9db" className="glow" />
      <SceneVignette id={id('vignette')} />
    </SceneFrame>
  );
}

export function SummitScene() {
  const id = useSceneIds('summit');
  const snowDust = [
    [605, 347, 3], [728, 289, 4], [839, 329, 3], [936, 411, 4], [1094, 328, 3],
    [1236, 386, 4], [1372, 319, 3], [1435, 424, 3], [534, 506, 2], [1002, 518, 2],
  ] as const;

  return (
    <SceneFrame>
      <defs>
        <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#34445f" />
          <stop offset=".47" stopColor="#a97983" />
          <stop offset=".78" stopColor="#edb28e" />
          <stop offset="1" stopColor="#f6d3aa" />
        </linearGradient>
        <linearGradient id={id('mountain')} x1=".2" y1="0" x2=".8" y2="1">
          <stop stopColor="#788596" />
          <stop offset=".5" stopColor="#4b6075" />
          <stop offset="1" stopColor="#283d51" />
        </linearGradient>
        <linearGradient id={id('snow')} x1="0" y1="0" x2=".7" y2="1">
          <stop stopColor="#fff6e8" />
          <stop offset=".6" stopColor="#dce4e6" />
          <stop offset="1" stopColor="#aebfce" />
        </linearGradient>
        <linearGradient id={id('foreground')} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#2d4651" />
          <stop offset="1" stopColor="#132b32" />
        </linearGradient>
        <radialGradient id={id('sun')}>
          <stop stopColor="#ffe3b5" stopOpacity=".8" />
          <stop offset=".38" stopColor="#ffc79d" stopOpacity=".27" />
          <stop offset="1" stopColor="#ffc79d" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id('vignette')} cx=".5" cy=".46" r=".72">
          <stop offset=".58" stopColor="#142331" stopOpacity="0" />
          <stop offset="1" stopColor="#142331" stopOpacity=".5" />
        </radialGradient>
      </defs>

      <rect width="1600" height="900" fill={`url(#${id('sky')})`} />
      <g data-depth="0.02">
        <circle className="glow" cx="1155" cy="225" r="260" fill={`url(#${id('sun')})`} />
        <circle cx="1155" cy="225" r="74" fill="#ffe2b1" />
        <circle cx="1134" cy="205" r="46" fill="#fff0cb" opacity=".28" />
      </g>
      <g data-depth="0.04">
        <Cloud x={276} y={205} scale={1.15} opacity={0.32} color="#f5c5b0" delay={-3} />
        <Cloud x={798} y={118} scale={0.72} opacity={0.25} color="#f9d4bd" delay={-7} />
        <Cloud x={1482} y={322} scale={0.88} opacity={0.3} color="#ffe0c4" delay={-5} />
      </g>

      <g data-depth="0.06">
        <path d="M0 572 142 440l122 86 183-191 153 175 168-118 168 143 183-208 178 177 141-86 162 150v232H0Z" fill="#728094" opacity=".7" />
        <path d="m142 440 122 86 183-191 64 73-64-19-50 63-54-20-92 62Zm672-5 168 143 183-208 64 63-64-16-52 63-54-20-105 73Z" fill="#d7d9df" opacity=".48" />
        <path d="M0 686 194 513l162 124 213-183 172 174 188-103 233 193 168-104 270 167v119H0Z" fill="#4a6178" />
      </g>

      <g data-depth="0.11">
        <path d="M174 900 790 155l333 303 113-208 366 373v277Z" fill={`url(#${id('mountain')})`} />
        <path d="m790 155 333 303-191 112-142-175-104 125-162-66Z" fill="#8996a5" opacity=".48" />
        <path d="m790 155 142 440 191-137-114 208-219 234-254 0Z" fill="#314a61" opacity=".7" />
        <path d="m1236 250 366 373-161-49-88-144-73 90-117-62Z" fill="#2c4359" opacity=".62" />
        <path d="m790 155-166 198 70-28 65 65 61-76 66 26 54-71 64 75 76-43-72 105-150 25-122-63-100 103-72-29Z" fill={`url(#${id('snow')})`} />
        <path d="m790 155-56 304 122-63 100 103 72-29-44-257-73 91-66-26Z" fill="#bccbd5" opacity=".52" />
        <path d="m1236 250-113 208 73-90 40-28 38 102 117 62-32-144-72 57-51-90Z" fill={`url(#${id('snow')})`} />
        <path d="m646 430 85 102 59-81 34 42 73-87m414 102 62 76 50-67 57 26" fill="none" stroke="#f6eee3" strokeWidth="8" strokeLinecap="round" opacity=".52" />
        <path d="m553 552 72 87 63-36 39 70 63-30m282-84 48 65 58-25 42 63" fill="none" stroke="#9cabb9" strokeWidth="6" opacity=".4" />
      </g>

      <g data-depth="0.14">
        <path d="M739 900c64-99 28-145 86-207 50-53 17-95 55-157 33-54-1-94 10-145" fill="none" stroke="#263d4d" strokeWidth="26" strokeLinecap="round" opacity=".65" />
        <path d="M739 900c64-99 28-145 86-207 50-53 17-95 55-157 33-54-1-94 10-145" fill="none" stroke="#c8ae86" strokeWidth="10" strokeLinecap="round" strokeDasharray="3 17" />
        <g transform="translate(790 151)">
          <path d="M0 0v-67" stroke="#4b4650" strokeWidth="6" />
          <path d="M3-66 49-54 3-39Z" fill="#c96658" />
          <path d="m3-66 46 12-46 15Z" fill="#f2a076" opacity=".45" />
        </g>
        <g transform="translate(845 594) rotate(-13)">
          <path d="M-4 28c-18 28-6 58 14 65" fill="none" stroke="#d3b18b" strokeWidth="3" />
          <circle cy="-27" r="10" fill="#d5a77e" />
          <path d="M-11-34 0-43l12 10-3 14H-8Z" fill="#e3b35d" />
          <path d="m-10-15 20 0 7 37-31 2Z" fill="#d66c4f" />
          <path d="m-8 23-16 29m31-28 18 19m-34-34-25 2" fill="none" stroke="#263847" strokeWidth="8" strokeLinecap="round" />
          <path d="m24 2 14-25" stroke="#263847" strokeWidth="5" strokeLinecap="round" />
          <path d="m35-26 13 5" stroke="#d9e4e3" strokeWidth="4" strokeLinecap="round" />
          <path d="m-7 51-8 9m23-10 7 9" stroke="#172b37" strokeWidth="7" strokeLinecap="round" />
        </g>
      </g>

      <g data-depth="0.17">
        <Cloud x={1090} y={470} scale={0.92} opacity={0.44} color="#e8d7d0" delay={-4} />
        <Cloud x={1434} y={583} scale={1.22} opacity={0.28} color="#f4dfcf" delay={-8} />
        <ParticleField points={snowDust} color="#fff7e8" className="glow" />
      </g>

      <g data-depth="0.23">
        <path d="M0 774 121 688l132 58 127-104 151 128 132-67 127 76 138-98 155 109 149-61 168 103 200-58v226H0Z" fill={`url(#${id('foreground')})`} />
        <path d="m0 824 153-80 128 52 143-79 135 90 153-65 126 69 176-74 164 81 151-57 171 86v153H0Z" fill="#10262f" />
        <path d="m121 688 66 107 66-49m138-162 77 152 74-24m406-43 75 109 80-60m299 3 82 95 89-52" fill="#8ca0aa" opacity=".3" />
        <Pine x={86} y={842} scale={1.5} color="#17333a" snow />
        <Pine x={224} y={809} scale={0.95} color="#203c42" snow />
        <Pine x={1494} y={846} scale={1.7} color="#142f37" snow />
        <Pine x={1372} y={814} scale={0.9} color="#203a40" snow />
      </g>
      <SceneVignette id={id('vignette')} />
    </SceneFrame>
  );
}

export function EmberScene() {
  const id = useSceneIds('ember');
  const embers = [
    [192, 620, 5], [284, 425, 4], [366, 727, 6], [448, 335, 3], [532, 581, 5],
    [616, 238, 4], [692, 715, 5], [784, 424, 3], [892, 302, 5], [968, 662, 4],
    [1084, 410, 6], [1168, 744, 4], [1284, 527, 5], [1392, 348, 4], [1468, 637, 6], [1530, 474, 3],
  ] as const;
  const windows = [
    [518, 492], [518, 558], [610, 492], [610, 558], [756, 378], [824, 378],
    [756, 458], [824, 458], [1006, 492], [1006, 558], [1098, 492], [1098, 558],
  ] as const;

  return (
    <SceneFrame>
      <defs>
        <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#130f20" />
          <stop offset=".5" stopColor="#421b2c" />
          <stop offset="1" stopColor="#a33c30" />
        </linearGradient>
        <linearGradient id={id('palace')} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#3b2b3c" />
          <stop offset=".55" stopColor="#211d2b" />
          <stop offset="1" stopColor="#121521" />
        </linearGradient>
        <linearGradient id={id('basalt')} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#171825" />
          <stop offset=".55" stopColor="#34303c" />
          <stop offset="1" stopColor="#11131e" />
        </linearGradient>
        <linearGradient id={id('lava')} x1="0" y1="0" x2=".6" y2="1">
          <stop stopColor="#ffca68" />
          <stop offset=".35" stopColor="#ff743d" />
          <stop offset=".72" stopColor="#e43b2f" />
          <stop offset="1" stopColor="#8e2430" />
        </linearGradient>
        <radialGradient id={id('moon')}>
          <stop stopColor="#ff8060" stopOpacity=".52" />
          <stop offset=".45" stopColor="#d34a40" stopOpacity=".16" />
          <stop offset="1" stopColor="#d34a40" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id('vignette')} cx=".5" cy=".48" r=".7">
          <stop offset=".5" stopColor="#0b0912" stopOpacity="0" />
          <stop offset="1" stopColor="#0b0912" stopOpacity=".72" />
        </radialGradient>
      </defs>

      <rect width="1600" height="900" fill={`url(#${id('sky')})`} />
      <g data-depth="0.02">
        <circle className="glow" cx="1210" cy="205" r="275" fill={`url(#${id('moon')})`} />
        <circle cx="1210" cy="205" r="112" fill="#b84c47" />
        <circle cx="1181" cy="174" r="76" fill="#d66b58" opacity=".32" />
        <g fill="#7e3540" opacity=".52">
          <circle cx="1250" cy="161" r="24" />
          <circle cx="1168" cy="236" r="31" />
          <circle cx="1257" cy="248" r="15" />
          <path d="m1185 131 31-17 21 25-13 29-35-5Z" />
        </g>
        <path d="M0 255c176-42 285 11 430-13 166-27 265-75 422-34 148 38 259 4 391-20 141-26 242 26 357 9v129H0Z" fill="#2b1c2d" opacity=".42" />
      </g>

      <g data-depth="0.06">
        <path d="M0 590 98 501l83 39 106-135 102 114 102-73 97 112 115-168 113 144 111-93 112 127 121-154 108 126 110-88 122 100v327H0Z" fill="#291e2e" />
        <path d="M0 673c181-60 318-18 466-41 177-28 308-88 487-38 193 54 376-25 647 10v296H0Z" fill="#1b1825" />
        <path d="M363 675h880l-74 73H438Z" fill="#302534" />
      </g>

      <g data-depth="0.12">
        <g transform="translate(0 40)">
          <path d="M462 625V416h31v-95h26v95h29v-95h27v95h31v209Z" fill={`url(#${id('palace')})`} />
          <path d="m443 420 83-112 86 112Z" fill="#4b3140" />
          <path d="m495 325 31-91 33 91Z" fill="#2a2131" />
          <path d="M952 625V416h31v-95h27v95h30v-95h27v95h31v209Z" fill={`url(#${id('palace')})`} />
          <path d="m933 420 86-112 86 112Z" fill="#4b3140" />
          <path d="m988 325 31-91 33 91Z" fill="#2a2131" />
          <path d="M681 625V327h43v-93h34v93h44v-93h35v93h42v298Z" fill={`url(#${id('palace')})`} />
          <path d="m655 334 135-166 137 166Z" fill="#513341" />
          <path d="m755 221 35-112 36 112Z" fill="#2c2230" />
          <path d="m790 109 10-50 10 50Z" fill="#d2684e" />
          <path d="M621 625V402h167v223Z" fill="#282130" />
          <path d="M599 405c31-90 77-134 106-134s76 44 106 134Z" fill="#392837" />
          <path d="M682 625V492c0-74 90-74 90 0v133Z" fill="#0e121c" stroke="#5b3540" strokeWidth="10" />
          <path d="M710 625v-98c0-29 34-29 34 0v98Z" fill="#c24c39" opacity=".42" />
          {windows.map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <path d={`m${x} ${y} 13-18 13 18v31l-13 15-13-15Z`} fill="#f17b49" opacity=".86" />
              <path d={`M${x} ${y - 4}v33`} stroke="#ffd184" strokeWidth="3" opacity=".7" />
            </g>
          ))}
          <path d="M404 625h795M373 656h856M342 687h918" stroke="#55404a" strokeWidth="15" />
          <path d="M404 625h795M373 656h856" stroke="#d2694c" strokeWidth="3" opacity=".38" />
          <path d="M526 109V72m548 37V72" stroke="#332737" strokeWidth="7" />
          <path d="m529 72 37 12-37 13Zm548 0 37 12-37 13Z" fill="#8c3e42" />
        </g>
      </g>

      <g data-depth="0.17">
        <path d="M790 659c-79 71 63 102-33 241H405c119-135 235-156 176-241Z" fill="#351d29" />
        <path d="M790 659c-79 71 63 102-33 241" fill="none" stroke="#8f2c2e" strokeWidth="178" strokeLinecap="round" />
        <path className="glow" d="M790 659c-79 71 63 102-33 241" fill="none" stroke={`url(#${id('lava')})`} strokeWidth="142" strokeLinecap="round" />
        <path d="M779 685c-46 57 42 86-20 185" fill="none" stroke="#ffd277" strokeWidth="13" strokeLinecap="round" opacity=".7" />
        <path d="M790 658c-133 27-191 80-300 92-100 11-163 75-242 150" fill="none" stroke="#6c2530" strokeWidth="78" strokeLinecap="round" />
        <path d="M790 658c-133 27-191 80-300 92-100 11-163 75-242 150" fill="none" stroke={`url(#${id('lava')})`} strokeWidth="52" strokeLinecap="round" opacity=".9" />
        <path d="M790 658c143 21 209 77 332 87 114 9 188 71 260 155" fill="none" stroke="#6c2530" strokeWidth="86" strokeLinecap="round" />
        <path d="M790 658c143 21 209 77 332 87 114 9 188 71 260 155" fill="none" stroke={`url(#${id('lava')})`} strokeWidth="58" strokeLinecap="round" opacity=".88" />
        <g fill="#ffcb70">
          <circle cx="695" cy="744" r="8" />
          <circle cx="773" cy="811" r="12" />
          <circle cx="569" cy="714" r="6" />
          <circle cx="1012" cy="746" r="9" />
          <circle cx="1148" cy="796" r="7" />
        </g>
      </g>

      <g data-depth="0.24" fill={`url(#${id('basalt')})`}>
        <path d="M0 430 95 402l72 50v448H0Z" />
        <path d="m95 402 72 50v448H95Z" fill="#44333e" opacity=".44" />
        <path d="M132 613 211 574l79 51v275H132Z" />
        <path d="m211 574 79 51v275h-79Z" fill="#4a3540" opacity=".38" />
        <path d="M277 718 350 681l74 48v171H277Z" />
        <path d="m350 681 74 48v171h-74Z" fill="#4c3540" opacity=".4" />
        <path d="M1264 557 1341 517l77 48v335h-154Z" />
        <path d="m1341 517 77 48v335h-77Z" fill="#49343f" opacity=".4" />
        <path d="M1395 411 1481 378l76 50v472h-162Z" />
        <path d="m1481 378 76 50v472h-76Z" fill="#503944" opacity=".38" />
        <path d="M1505 626 1570 592l30 20v288h-95Z" />
      </g>
      <g fill="none" stroke="#bc5845" strokeWidth="4" opacity=".34">
        <path d="m48 463 34 16 39-10m-32 106 32 16 36-11m809 20 42 18 39-11m81-172 39 15 36-10" />
        <path d="M188 629v69m963-185v97m-55-145v55" />
      </g>
      <ParticleField points={embers} color="#ff9a57" className="ember" />
      <SceneVignette id={id('vignette')} />
    </SceneFrame>
  );
}

export function DriftScene() {
  const id = useSceneIds('drift');
  const footprints = [
    [690, 704, -12], [648, 728, -9], [610, 746, -7], [576, 759, -5],
  ] as const;

  return (
    <SceneFrame>
      <defs>
        <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#334b60" />
          <stop offset=".5" stopColor="#b77e79" />
          <stop offset=".8" stopColor="#efb58b" />
          <stop offset="1" stopColor="#f7d3a2" />
        </linearGradient>
        <linearGradient id={id('far-dune')} x1="0" y1="0" x2=".8" y2="1">
          <stop stopColor="#dca47e" />
          <stop offset="1" stopColor="#b87868" />
        </linearGradient>
        <linearGradient id={id('dune')} x1=".2" y1="0" x2=".8" y2="1">
          <stop stopColor="#f0c28e" />
          <stop offset=".58" stopColor="#cb8c68" />
          <stop offset="1" stopColor="#8d5e58" />
        </linearGradient>
        <linearGradient id={id('foreground')} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#a76c5c" />
          <stop offset="1" stopColor="#493e4b" />
        </linearGradient>
        <linearGradient id={id('monolith')} x1="0" y1="0" x2="1" y2=".4">
          <stop stopColor="#252d3c" />
          <stop offset=".48" stopColor="#3e4050" />
          <stop offset="1" stopColor="#1a2532" />
        </linearGradient>
        <radialGradient id={id('sun')}>
          <stop stopColor="#ffe5b3" stopOpacity=".85" />
          <stop offset=".36" stopColor="#ffd09c" stopOpacity=".3" />
          <stop offset="1" stopColor="#ffd09c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id('vignette')} cx=".5" cy=".46" r=".72">
          <stop offset=".56" stopColor="#2c2938" stopOpacity="0" />
          <stop offset="1" stopColor="#2c2938" stopOpacity=".48" />
        </radialGradient>
      </defs>

      <rect width="1600" height="900" fill={`url(#${id('sky')})`} />
      <g data-depth="0.02">
        <circle className="glow" cx="340" cy="238" r="265" fill={`url(#${id('sun')})`} />
        <circle cx="340" cy="238" r="72" fill="#ffe1aa" />
        <circle cx="322" cy="219" r="43" fill="#fff0c8" opacity=".26" />
      </g>
      <g data-depth="0.04">
        <Cloud x={236} y={126} scale={0.8} opacity={0.2} color="#f4c6b0" delay={-4} />
        <Cloud x={888} y={198} scale={1.16} opacity={0.18} color="#f8d3b8" delay={-7} />
        <Cloud x={1438} y={102} scale={0.68} opacity={0.17} color="#f4c6b0" delay={-2} />
        <path d="M0 429c199-28 330 11 484-2 185-16 302-46 464-22 190 28 388-3 652 29v122H0Z" fill="#c18c79" opacity=".34" />
      </g>

      <g data-depth="0.07">
        <path d="M0 555c207-65 352-28 506 3 172 35 291-69 470-49 196 22 306 92 624 20v371H0Z" fill={`url(#${id('far-dune')})`} />
        <path d="M0 575c205-46 343-4 492 13 183 21 295-43 456-29 197 17 350 70 652 9" fill="none" stroke="#f1c298" strokeWidth="8" opacity=".32" />
        <path d="m1177 267 89-24 65 31-8 318-84 24-70-30Z" fill="#1b2835" opacity=".22" />
        <g transform="translate(1138 190)">
          <path d="m-67 340 13-284 63-54 76 30 16 308-70 43Z" fill={`url(#${id('monolith')})`} />
          <path d="m9 2 76 30 16 308-70 43-17-111Z" fill="#141f2b" opacity=".58" />
          <path d="m-54 56 63-54 17 85-63 55Z" fill="#56505b" opacity=".55" />
          <path d="m-37 142 17-111 63-55-3 95-44 93Z" fill="#4a4652" opacity=".36" />
          <path d="m0 161 36-23 35 23-35 35Z" fill="none" stroke="#c18470" strokeWidth="5" opacity=".5" />
          <path d="m18 161-18 35 18 32 18-32Z" fill="#d59b7c" opacity=".16" />
          <path d="M-42 291 9 249l40 30M-48 324l50-38 44 32" fill="none" stroke="#111b27" strokeWidth="7" opacity=".65" />
        </g>
        <path d="m125 560 34-95 28 30 24-64 42 109Zm1302 43 39-122 32 38 26-76 46 133Z" fill="#765765" opacity=".5" />
      </g>

      <g data-depth="0.13">
        <path d="M0 669c231-106 438-27 615 9 187 38 316-109 506-90 174 17 305 107 479 60v252H0Z" fill={`url(#${id('dune')})`} />
        <path d="M0 669c231-106 438-27 615 9 187 38 316-109 506-90 174 17 305 107 479 60" fill="none" stroke="#f8d6a6" strokeWidth="12" opacity=".52" />
        <path d="M80 756c191-68 353-15 510 27 157 42 295-51 438-45 145 7 286 77 572 26" fill="none" stroke="#9f685f" strokeWidth="9" opacity=".25" />
        <path d="M1088 704c153 35 318-33 512 21v175h-731c25-75 110-148 219-196Z" fill="#b87863" opacity=".55" />
      </g>

      <g data-depth="0.2">
        <ellipse cx="704" cy="663" rx="72" ry="13" fill="#684c50" opacity=".3" />
        <g transform="translate(704 613)">
          <g className="scarf">
            <path d="M-10-25c-69-16-117 5-177-17-45-17-78-9-118 7 44 5 70 25 116 27 60 3 112-26 179-5Z" fill="#b44f4c" />
            <path d="M-19-19c-69-4-119 23-178 9-38-9-66-4-94 5 37 12 61 28 104 26 58-3 103-27 168-28Z" fill="#d47861" />
            <path d="m-298-39-14 8m52 13-13 9" stroke="#b44f4c" strokeWidth="6" strokeLinecap="round" />
          </g>
          <path d="M-18-32c4-25 40-29 48-5l-3 27-18 18-22-17Z" fill="#463b4b" />
          <path d="M-12-32c4-16 27-19 35-5l-7 12-20 2Z" fill="#d5a078" />
          <path d="M-17-20c-20 20-28 58-14 80l56 4c13-27 3-63-18-83Z" fill="#5c4a58" />
          <path d="M-17-20c-11 24-15 54-7 76l16 4c-7-31-2-58 8-79Z" fill="#806071" opacity=".7" />
          <path d="m-10 58-13 19m41-17 14 15" stroke="#2b2e3d" strokeWidth="9" strokeLinecap="round" />
          <path d="m36 3 9 76" stroke="#453a40" strokeWidth="6" strokeLinecap="round" />
          <path d="M45 1c11-5 18 2 16 11" fill="none" stroke="#453a40" strokeWidth="6" strokeLinecap="round" />
          <path d="m19 4 14 24" stroke="#d2a079" strokeWidth="8" strokeLinecap="round" />
        </g>
        {footprints.map(([x, y, rotation]) => (
          <ellipse key={x} cx={x} cy={y} rx="8" ry="4" transform={`rotate(${rotation} ${x} ${y})`} fill="#6e4c52" opacity=".4" />
        ))}
      </g>

      <g data-depth="0.27">
        <path d="M0 817c184-46 345 18 506 2 180-18 315-84 487-55 192 32 351 86 607 23v113H0Z" fill={`url(#${id('foreground')})`} />
        <path d="M0 839c183-32 329 13 493 0 196-16 334-64 502-42 186 25 369 67 605 24" fill="none" stroke="#d29776" strokeWidth="7" opacity=".3" />
        <path d="M121 884c45-45 82-54 114-31-39 3-65 17-88 36Zm1337 0c37-49 86-62 124-35-46 1-76 19-104 39Z" fill="#322f3e" opacity=".65" />
      </g>
      <SceneVignette id={id('vignette')} />
    </SceneFrame>
  );
}
