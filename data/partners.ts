import { Logo } from '@/components/ui/marquee-logo-scroller';

const createSvgDataUrl = (svgContent: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;

export const clientBrands: Logo[] = [
  {
    alt: 'Martell Cognac',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <g fill="#D4AF37">
          <path d="M100 12 L106 20 L94 20 Z" />
          <path d="M96 14 C100 8, 108 14, 114 10 C108 16, 102 18, 96 14 Z" opacity="0.9"/>
        </g>
        <text x="100" y="38" text-anchor="middle" font-family="'Cinzel', 'Times New Roman', serif" font-weight="700" font-size="18" fill="#FFFFFF" letter-spacing="4">MARTELL</text>
        <text x="100" y="50" text-anchor="middle" font-family="sans-serif" font-weight="500" font-size="8" fill="#D4AF37" letter-spacing="3">COGNAC 1715</text>
      </svg>
    `),
    gradient: { from: '#0f172a', via: '#1e293b', to: '#b45309' },
  },
  {
    alt: 'MTN',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <ellipse cx="100" cy="30" rx="46" ry="24" fill="#FFCC00" stroke="#000000" stroke-width="2"/>
        <text x="100" y="38" text-anchor="middle" font-family="'Arial Black', 'Helvetica Black', sans-serif" font-weight="900" font-size="24" fill="#000000" letter-spacing="1">MTN</text>
      </svg>
    `),
    gradient: { from: '#eab308', via: '#ca8a04', to: '#713f12' },
  },
  {
    alt: 'Honeywell',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <text x="100" y="38" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" font-weight="900" font-size="24" fill="#EF4444" letter-spacing="0.5">Honeywell</text>
      </svg>
    `),
    gradient: { from: '#b91c1c', via: '#991b1b', to: '#450a0a' },
  },
  {
    alt: 'Coca-Cola',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <text x="100" y="40" text-anchor="middle" font-family="'Brush Script MT', 'Segoe Script', cursive, sans-serif" font-weight="bold" font-size="32" fill="#EF4444" letter-spacing="0">Coca-Cola</text>
      </svg>
    `),
    gradient: { from: '#dc2626', via: '#b91c1c', to: '#7f1d1d' },
  },
  {
    alt: 'Nestlé',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <g transform="translate(42, 10)">
          <path d="M6 18 C10 14, 18 12, 26 18 C20 22, 12 22, 6 18 Z" fill="#38BDF8"/>
          <circle cx="16" cy="10" r="3" fill="#38BDF8"/>
        </g>
        <text x="108" y="38" text-anchor="middle" font-family="'Segoe UI', 'Helvetica Neue', sans-serif" font-weight="800" font-size="22" fill="#38BDF8" letter-spacing="1">Nestlé</text>
      </svg>
    `),
    gradient: { from: '#0284c7', via: '#0369a1', to: '#0c4a6e' },
  },
  {
    alt: 'Chowdeck',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <rect x="36" y="16" width="28" height="28" rx="8" fill="#10B981"/>
        <path d="M44 26 L50 34 L56 26" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <text x="122" y="37" text-anchor="middle" font-family="'Poppins', sans-serif" font-weight="800" font-size="18" fill="#10B981" letter-spacing="0.5">CHOWDECK</text>
      </svg>
    `),
    gradient: { from: '#059669', via: '#047857', to: '#064e3b' },
  },
  {
    alt: 'Wazobia',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <text x="100" y="34" text-anchor="middle" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="22" fill="#F97316" letter-spacing="1">WAZOBIA</text>
        <rect x="52" y="40" width="96" height="4" rx="2" fill="#22C55E"/>
      </svg>
    `),
    gradient: { from: '#ea580c', via: '#c2410c', to: '#15803d' },
  },
  {
    alt: 'Livespot 360',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <text x="86" y="37" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="800" font-size="17" fill="#FFFFFF" letter-spacing="1">LIVESPOT</text>
        <rect x="142" y="18" width="34" height="24" rx="6" fill="#A855F7"/>
        <text x="159" y="35" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="900" font-size="13" fill="#FFFFFF">360</text>
      </svg>
    `),
    gradient: { from: '#7c3aed', via: '#6d28d9', to: '#4c1d95' },
  },
  {
    alt: 'Nile University',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <circle cx="44" cy="30" r="14" fill="#0D9488" stroke="#F59E0B" stroke-width="2"/>
        <text x="44" y="35" text-anchor="middle" font-family="serif" font-weight="bold" font-size="12" fill="#FFFFFF">N</text>
        <text x="120" y="32" text-anchor="middle" font-family="'Cinzel', 'Georgia', serif" font-weight="700" font-size="14" fill="#FFFFFF" letter-spacing="0.5">NILE UNIVERSITY</text>
        <text x="120" y="44" text-anchor="middle" font-family="sans-serif" font-weight="500" font-size="7" fill="#F59E0B" letter-spacing="2">OF NIGERIA</text>
      </svg>
    `),
    gradient: { from: '#0f766e', via: '#115e59', to: '#134e4a' },
  },
  {
    alt: 'B20',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <text x="100" y="40" text-anchor="middle" font-family="'Montserrat', 'Arial Black', sans-serif" font-weight="900" font-size="28" fill="#38BDF8" letter-spacing="2">B20</text>
      </svg>
    `),
    gradient: { from: '#0284c7', via: '#2563eb', to: '#1e3a8a' },
  },
];
