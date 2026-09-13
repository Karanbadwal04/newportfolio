// ============================================================
// Constants — Theme config, animation durations, section IDs
// ============================================================

export const ACCENT = '#00d4ff';
export const ACCENT_RGB = '0, 212, 255';

export const COLORS = {
  bg: '#0a0a0a',
  bgAlt: '#111111',
  surface: '#1a1a1a',
  surfaceHover: '#222222',
  border: '#ffffff10',
  borderHover: '#ffffff20',
  text: '#f5f5f5',
  textMuted: '#999999',
  textDim: '#666666',
  accent: ACCENT,
  accentDim: '#00a8cc',
};

export const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'experience',
  'projects',
  'certifications',
  'education',
  'contact',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const ANIMATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  verySlow: 0.8,
  stagger: 0.08,
  staggerSlow: 0.15,
};
