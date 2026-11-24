import type { BiomeId } from '../data';

export function BiomeThumbnail({ id }: { id: BiomeId }) {
  return (
    <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {id === 'sunmeadow' && (
        <>
          <rect width="160" height="100" fill="#efbd84" />
          <path d="M112 16h18v18h-18Z" fill="#fff0b7" />
          <path d="m0 58 34-24 30 20 28-30 34 30 34-18v64H0Z" fill="#66836b" />
          <path d="M0 68c36-16 60 8 90 0s50-10 70-4v36H0Z" fill="#70944d" />
          <path d="M70 68c18 0 28 10 42 14s26 0 30 18H54c6-16 12-24 16-32Z" fill="#4f8f8d" />
          <path d="M32 54h24v20H32Z" fill="#d5bc8d" /><path d="m28 54 16-14 16 14Z" fill="#824b39" />
        </>
      )}
      {id === 'whisperwood' && (
        <>
          <rect width="160" height="100" fill="#18372e" />
          <path d="m58 0 44 100H32Zm50 0 24 100H84Z" fill="#8bc89a" opacity=".1" />
          <path d="M20 100V34h8v66Zm30 0V20h8v80Zm58 0V30h8v70Zm30 0V14h8v86Z" fill="#543e31" />
          <path d="m24 40-18 24h36Zm0 18-22 28h44Zm90-20-20 26h40Zm0 22-24 30h48Z" fill="#315f45" />
          <rect x="76" y="50" width="4" height="4" fill="#80e6a2" /><rect x="112" y="66" width="3" height="3" fill="#80e6a2" />
        </>
      )}
      {id === 'hollow' && (
        <>
          <rect width="160" height="100" fill="#17142a" />
          <path d="M0 0h160v100H0Zm34 100V48c0-25 20-48 46-48s46 23 46 48v52Z" fill="#302545" fillRule="evenodd" />
          <path d="m56 86 8-40 8 18 5 22Zm58 0 10-50 9 30 5 20Z" fill="#b7a0ff" />
          <path d="M52 88h64l-8 12H44Z" fill="#397584" />
          <rect x="74" y="34" width="4" height="16" fill="#8b603f" /><rect x="70" y="30" width="12" height="10" fill="#ffd07a" />
        </>
      )}
      {id === 'emberwaste' && (
        <>
          <rect width="160" height="100" fill="#461622" />
          <path d="M0 52 28 36l22 12 28-26 26 26 28-14 28 20v46H0Z" fill="#351923" />
          <path d="M0 74c36-10 48 8 80 0s48-6 80 0v26H0Z" fill="#ef633c" />
          <path d="M22 76V22h14v54Zm100 0V16h16v60Z" fill="#30222a" />
          <path d="M64 62h44v6H64Z" fill="#56404a" />
          <rect x="79" y="20" width="3" height="5" fill="#ffc66e" /><rect x="52" y="38" width="3" height="4" fill="#ffc66e" />
        </>
      )}
      {id === 'beyond' && (
        <>
          <rect width="160" height="100" fill="#0a0f22" />
          <g fill="#c6d5ff"><rect x="18" y="16" width="2" height="2" /><rect x="52" y="28" width="2" height="2" /><rect x="108" y="14" width="2" height="2" /><rect x="140" y="34" width="2" height="2" /></g>
          <path d="M0 72 32 54l28 18v28H0Zm160 0-32-18-28 18v28h60Z" fill="#28243e" />
          <path d="M58 86V38h12v-12h20v12h12v48Z" fill="#28233d" />
          <path d="M72 86V52a8 8 0 0 1 16 0v34Z" fill="#73f1de" />
          <path d="M58 38h44M50 26h60" stroke="#49405d" strokeWidth="5" />
        </>
      )}
    </svg>
  );
}
