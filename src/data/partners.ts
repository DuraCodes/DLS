import { Logo } from '@/components/ui/marquee-logo-scroller';

// High-fidelity, self-contained SVG Data URIs for all requested brands
const createSvgDataUrl = (svgContent: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;

export const clientBrands: Logo[] = [
  {
    alt: 'Cadbury',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <text x="100" y="38" text-anchor="middle" font-family="'Brush Script MT', 'Segoe Script', cursive, sans-serif" font-weight="bold" font-size="28" fill="#A855F7" letter-spacing="1">Cadbury</text>
      </svg>
    `),
    gradient: { from: '#581c87', via: '#6b21a8', to: '#3b0764' },
  },
  {
    alt: 'Golden Penny',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <circle cx="38" cy="30" r="12" fill="#EAB308" stroke="#CA8A04" stroke-width="2"/>
        <text x="115" y="34" text-anchor="middle" font-family="'Arial Black', 'Helvetica Black', sans-serif" font-weight="900" font-size="16" fill="#EAB308" letter-spacing="1">GOLDEN PENNY</text>
        <text x="115" y="46" text-anchor="middle" font-family="sans-serif" font-weight="600" font-size="8" fill="#FACC15" letter-spacing="2">FOODS NIGERIA</text>
      </svg>
    `),
    gradient: { from: '#ca8a04', via: '#a16207', to: '#713f12' },
  },
  {
    alt: 'Power Oil',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <path d="M42 34 C42 22 50 16 50 16 C50 16 58 22 58 34 C58 39 54 43 50 43 C46 43 42 39 42 34 Z" fill="#EAB308" />
        <text x="120" y="38" text-anchor="middle" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="20" fill="#22C55E" letter-spacing="1">POWER OIL</text>
      </svg>
    `),
    gradient: { from: '#15803d', via: '#166534', to: '#14532d' },
  },
  {
    alt: 'Knorr',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <rect x="25" y="14" width="150" height="32" rx="16" fill="#15803d"/>
        <text x="100" y="37" text-anchor="middle" font-family="'Brush Script MT', 'Segoe Script', cursive, sans-serif" font-weight="bold" font-size="24" fill="#FFFFFF" letter-spacing="1">Knorr</text>
      </svg>
    `),
    gradient: { from: '#166534', via: '#14532d', to: '#052e16' },
  },
  {
    alt: 'Terra Seasoning Cube',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <rect x="32" y="16" width="26" height="26" rx="4" fill="#DC2626"/>
        <text x="45" y="34" text-anchor="middle" font-family="'Arial Black', sans-serif" font-weight="900" font-size="14" fill="#FFFFFF">T</text>
        <text x="122" y="34" text-anchor="middle" font-family="'Arial Black', sans-serif" font-weight="900" font-size="16" fill="#DC2626" letter-spacing="1">TERRA</text>
        <text x="122" y="46" text-anchor="middle" font-family="sans-serif" font-weight="600" font-size="7" fill="#EF4444" letter-spacing="1.5">SEASONING CUBES</text>
      </svg>
    `),
    gradient: { from: '#b91c1c', via: '#991b1b', to: '#7f1d1d' },
  },
  {
    alt: 'Checkers Custard',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <text x="100" y="34" text-anchor="middle" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="20" fill="#EAB308" letter-spacing="1">CHECKERS</text>
        <text x="100" y="47" text-anchor="middle" font-family="'Helvetica Neue', sans-serif" font-weight="700" font-size="10" fill="#F97316" letter-spacing="3">CUSTARD</text>
      </svg>
    `),
    gradient: { from: '#a16207', via: '#ca8a04', to: '#c2410c' },
  },
  {
    alt: 'Nestle',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <g transform="translate(38, 10)">
          <path d="M6 18 C10 14, 18 12, 26 18 C20 22, 12 22, 6 18 Z" fill="#38BDF8"/>
          <circle cx="16" cy="10" r="3" fill="#38BDF8"/>
        </g>
        <text x="112" y="38" text-anchor="middle" font-family="'Segoe UI', 'Helvetica Neue', sans-serif" font-weight="800" font-size="22" fill="#38BDF8" letter-spacing="1">Nestlé</text>
      </svg>
    `),
    gradient: { from: '#0284c7', via: '#0369a1', to: '#0c4a6e' },
  },
  {
    alt: 'Hypo',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <text x="100" y="39" text-anchor="middle" font-family="'Arial Black', 'Helvetica Black', sans-serif" font-weight="900" font-size="24" fill="#06B6D4" letter-spacing="2">HYPO</text>
        <text x="100" y="49" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="7" fill="#22D3EE" letter-spacing="3">BLEACH &amp; CLEAN</text>
      </svg>
    `),
    gradient: { from: '#0891b2', via: '#0e7490', to: '#155e75' },
  },
];
