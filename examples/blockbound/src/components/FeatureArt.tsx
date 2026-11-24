import type { Feature } from '../data';
import { IsoBlock } from './VoxelPrimitives';

export function FeatureArt({ icon }: { icon: Feature['icon'] }) {
  return (
    <svg className={`feature-art feature-art--${icon}`} viewBox="0 0 240 190" aria-hidden="true" focusable="false">
      <ellipse cx="120" cy="158" rx="72" ry="14" fill="#0d1713" opacity=".16" />
      <g className="feature-art__float">
        {icon === 'pickaxe' && (
          <>
            <g transform="rotate(38 120 95)">
              <rect x="112" y="42" width="16" height="112" fill="#8d603d" />
              <rect x="112" y="42" width="6" height="112" fill="#c18a57" />
              <path d="M74 34h22v-14h48v14h22v22h-22V46H96v10H74Z" fill="#a9c7bf" />
              <path d="M74 20h22v14H74Zm48-14h48v14h-48Zm70 14h22v22h-22Z" fill="#d8eee2" />
              <path d="M96 46h48v10H96Z" fill="#658b84" />
            </g>
            <IsoBlock x={166} y={126} width={28} height={28} depth={12} top="#b9ed78" left="#74ad56" right="#4b7c43" />
            <IsoBlock x={48} y={132} width={22} height={20} depth={10} top="#d5d1b9" left="#9a9687" right="#6f6b63" />
          </>
        )}
        {icon === 'blocks' && (
          <>
            <IsoBlock x={54} y={80} width={58} height={58} depth={24} top="#ffe0a0" left="#dba765" right="#a8764c" />
            <IsoBlock x={122} y={60} width={58} height={58} depth={24} top="#d7ffab" left="#8fc767" right="#5c944e" />
            <IsoBlock x={96} y={116} width={58} height={34} depth={24} top="#d6c5ff" left="#a68bd5" right="#7663a8" />
            <path d="M152 44h8v8h-8Zm16 12h8v8h-8ZM68 66h8v8h-8Z" fill="#fff" opacity=".72" />
          </>
        )}
        {icon === 'lantern' && (
          <>
            <path d="M100 38h40v14h-40Z" fill="#7b6752" />
            <path d="M108 24h24v14h-24Z" fill="#a38c68" />
            <path d="M92 52h56v82H92Z" fill="#5c5362" />
            <path d="M104 64h32v58h-32Z" fill="#ffd780" />
            <path d="M112 72h16v42h-16Z" fill="#fff2b7" />
            <path d="M84 52h16v82H84Zm56 0h16v82h-16Zm-64 82h80v16H76Z" fill="#8a7664" />
            <path d="M100 52h40v10h-40Zm-16 72h72v10H84Z" fill="#b19a72" />
            <path d="M120 64v58" stroke="#9c7851" strokeWidth="5" />
            <rect x="60" y="82" width="7" height="7" fill="#ffe89d" />
            <rect x="174" y="112" width="6" height="6" fill="#ffe89d" />
            <rect x="164" y="48" width="5" height="5" fill="#ffe89d" />
          </>
        )}
        {icon === 'compass' && (
          <>
            <IsoBlock x={78} y={72} width={84} height={72} depth={34} top="#b8ece1" left="#6cb7b2" right="#427f83" />
            <path d="m120 62 28 48-28 48-28-48Z" fill="#e7fff6" />
            <path d="m120 62 28 48h-28Z" fill="#78d9ce" />
            <path d="m120 110 28 0-28 48Z" fill="#3a777d" />
            <path d="m120 62-28 48h28Z" fill="#b7f0e5" />
            <path d="m120 110-28 0 28 48Z" fill="#69b8b7" />
            <rect x="116" y="82" width="8" height="8" fill="#173c42" />
            <path d="M56 138h128v10H56Z" fill="#759187" opacity=".36" />
          </>
        )}
      </g>
    </svg>
  );
}
