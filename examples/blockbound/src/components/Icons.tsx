import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'square' as const,
  strokeLinejoin: 'miter' as const,
  'aria-hidden': true,
};

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 18 18 6M6 6h12v12" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4v16m-6-6 6 6 6-6" />
    </svg>
  );
}

export function ArrowUp(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20V4m-6 6 6-6 6 6" />
    </svg>
  );
}

export function Play(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m8 5 11 7-11 7Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Pause(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 5v14M16 5v14" strokeWidth="3" />
    </svg>
  );
}

export function VolumeOn(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9v6h4l5 4V5L8 9Zm12-1c2 2 2 6 0 8m3-11c4 4 4 10 0 14" />
    </svg>
  );
}

export function VolumeOff(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9v6h4l5 4V5L8 9Zm12 0 5 6m0-6-5 6" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2.4" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 5 14 14M19 5 5 19" strokeWidth="2.2" />
    </svg>
  );
}

export function ChevronLeft(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m15 5-7 7 7 7" />
    </svg>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export function Download(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v12m-5-5 5 5 5-5M4 19h16" />
    </svg>
  );
}

export function Copy(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 9h11v11H9ZM4 15H3V4h11v1" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12 5 5L20 7" strokeWidth="2.4" />
    </svg>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5Z" />
    </svg>
  );
}

export function PickaxeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 19 9-9M8 4c5-2 10 1 12 7-4-3-7-4-12-4M12 8l-2 5" />
    </svg>
  );
}

export function LanternIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 4h6v3H9ZM7 7h10l2 4-2 9H7l-2-9Zm5 4v9" />
    </svg>
  );
}

export function VoxelMark(props: IconProps) {
  return (
    <svg viewBox="0 0 36 40" fill="none" aria-hidden="true" {...props}>
      <path d="m18 2 16 9v18l-16 9L2 29V11Z" fill="currentColor" />
      <path d="m18 2 16 9-16 9L2 11Z" fill="#e1ffb4" />
      <path d="M18 20v18L2 29V11Z" fill="#76b950" />
      <path d="M18 20v18l16-9V11Z" fill="#467a3c" />
      <path d="m12 15 6-3.5 6 3.5-6 3.5Z" fill="#f4f7df" />
    </svg>
  );
}
