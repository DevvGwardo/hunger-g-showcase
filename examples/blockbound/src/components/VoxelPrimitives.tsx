interface Placement {
  x: number;
  y: number;
  scale?: number;
}

export function Cloud({ x, y, scale = 1 }: Placement) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M0 20h28V8h36V0h46v8h36v12h30v16H0Z" fill="#fff6dc" opacity=".82" />
      <path d="M0 36h176v10H0Z" fill="#d7ded1" opacity=".35" />
    </g>
  );
}

export function OakTree({ x, y, scale = 1, dark = false }: Placement & { dark?: boolean }) {
  const leaf = dark ? '#244c39' : '#4e8745';
  const leafLight = dark ? '#376a48' : '#78a94e';
  const leafDark = dark ? '#173a30' : '#35653c';
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-9" y="-74" width="18" height="76" fill="#654632" />
      <rect x="-9" y="-74" width="6" height="76" fill="#896043" />
      <path d="M-44-92h28v-22h48v22h40v22h20v36H64v20H-64v-20h-20v-36h20v-22Z" fill={leaf} />
      <path d="m-44-92 20-10h48l20 10Z" fill={leafLight} />
      <path d="M32-114h20l20 10v22H72Z" fill={leafDark} />
      <path d="M-64-70h36v18h-36Zm76-22h24v22H12Z" fill={leafLight} opacity=".55" />
      <path d="M-64-12h128v16H-64Z" fill={leafDark} opacity=".6" />
    </g>
  );
}

export function PineTree({ x, y, scale = 1, dark = false }: Placement & { dark?: boolean }) {
  const leaf = dark ? '#173c34' : '#2f6846';
  const light = dark ? '#285847' : '#4d8754';
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-7" y="-86" width="14" height="88" fill="#574333" />
      <path d="M0-166h-24v24h-20v24H16v-24h-20v-24Z" fill={light} />
      <path d="M0-130h-36v24h-24v28H28v-28H0Z" fill={leaf} />
      <path d="M0-92h-48v28h-30v32H46v-32H0Z" fill={light} />
      <path d="M0-166h24v24H0Zm-24 60h24v-32h-12Zm36 12h30v32H36Z" fill={leaf} />
    </g>
  );
}

export function Cottage({ x, y, scale = 1, lit = true }: Placement & { lit?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-62-58h112v62h-112Z" fill="#d7bd89" />
      <path d="M50-58h34v62H50Z" fill="#a8845b" />
      <path d="M-76-58 0-112l78 54Z" fill="#7b4736" />
      <path d="m-76-58 76-54v18l-54 36Z" fill="#a55f43" />
      <path d="M0-112v18l54 36h24Z" fill="#5d3831" />
      <rect x="-10" y="-26" width="24" height="30" fill="#624736" />
      <rect x="-6" y="-22" width="16" height="26" fill="#7d5b3e" />
      <rect x="-49" y="-40" width="22" height="22" fill={lit ? '#ffdc83' : '#6d9d97'} />
      <path d="M-38-40v22m-11-11h22" stroke="#76573d" strokeWidth="4" />
      <rect x="19" y="-38" width="20" height="20" fill={lit ? '#ffdc83' : '#6d9d97'} />
      <path d="M29-38v20M19-28h20" stroke="#76573d" strokeWidth="4" />
      <rect x="35" y="-96" width="15" height="32" fill="#8d8272" />
      <path d="M32-96h21v-8H32Z" fill="#5c5149" />
      <path d="M-64-2h128v9h-128Z" fill="#6e6148" opacity=".5" />
    </g>
  );
}

export function VoxelPerson({ x, y, scale = 1 }: Placement) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-11" y="-58" width="22" height="21" fill="#bd805a" />
      <path d="M-13-58h26v-9h-26Z" fill="#3e302b" />
      <rect x="-15" y="-37" width="30" height="27" fill="#4b8c8b" />
      <rect x="-15" y="-37" width="9" height="27" fill="#376f70" />
      <rect x="-12" y="-10" width="10" height="18" fill="#3c4650" />
      <rect x="3" y="-10" width="10" height="18" fill="#2e3944" />
      <rect x="-22" y="-34" width="7" height="24" fill="#bd805a" />
      <rect x="15" y="-34" width="7" height="24" fill="#bd805a" />
      <rect x="23" y="-30" width="5" height="34" fill="#825636" />
      <path d="M20-30h13v7H20Z" fill="#b7c7c1" />
    </g>
  );
}

export function Crystal({ x, y, scale = 1, color = '#b9a0ff' }: Placement & { color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-10 0 0-58l12 20 8 38Z" fill={color} />
      <path d="M0-58 0 0l20 0 8-38Z" fill="#7661b9" />
      <path d="M-10 0 0-10 20 0 12 12h-22Z" fill="#5b4a8b" />
      <path d="M-3-44 1-32 7-20" stroke="#e6dcff" strokeWidth="3" opacity=".8" />
    </g>
  );
}

export function FloatingIsland({ x, y, scale = 1 }: Placement) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-90 0h180l-22 32-38 22-34 56-28-22-44-20Z" fill="#302943" />
      <path d="M-90 0h180l-18 18H-70Z" fill="#777087" />
      <path d="M-70 18h130l-24 22-50 22-34 32-20-22Z" fill="#443b59" />
      <path d="M-60 0h120v-10H-60Z" fill="#9d96a7" />
    </g>
  );
}

interface IsoBlockProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  depth?: number;
  top?: string;
  left?: string;
  right?: string;
}

export function IsoBlock({
  x,
  y,
  width = 40,
  height = 40,
  depth = 16,
  top = '#c4ed8c',
  left = '#74ad56',
  right = '#4b7c43',
}: IsoBlockProps) {
  return (
    <g>
      <path d={`M${x} ${y}h${width}l${depth} ${-depth / 2}H${x + depth}Z`} fill={top} />
      <path d={`M${x} ${y}v${height}h${width}V${y}Z`} fill={left} />
      <path d={`M${x + width} ${y}l${depth} ${-depth / 2}v${height}l${-depth} ${depth / 2}Z`} fill={right} />
    </g>
  );
}
