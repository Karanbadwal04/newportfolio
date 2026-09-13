import type { FC } from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const SkillIcons: Record<string, FC<IconProps>> = {
  // ── Languages ──────────────────────────────────────────
  C: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="#00d4ff" strokeWidth="1.5" fill="#00d4ff" fillOpacity="0.1" />
      <path d="M14.5 9.5a4 4 0 100 5" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  'C++': ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="#659ad2" strokeWidth="1.5" fill="#659ad2" fillOpacity="0.1" />
      <path d="M11 9.5a3.5 3.5 0 100 5" stroke="#659ad2" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14.5 11v2M13.5 12h2M18 11v2M17 12h2" stroke="#659ad2" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  Java: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M8 19c3 1 8 1 10-1s-3-2-5-2-4 1-5 3z" fill="#f89820" fillOpacity="0.3" stroke="#f89820" strokeWidth="1.2" />
      <path d="M6 16c4 1 11 1 13-1.5s-4-2.5-7-2.5-5 1-6 4z" stroke="#5382a1" strokeWidth="1.2" />
      <path d="M13 3c-1 2-2 3-1 5 1-2 2-3 1-5z" fill="#f89820" />
      <path d="M10 5c-1 2-1 3.5 0 5 1-2 1-3.5 0-5z" fill="#5382a1" />
      <path d="M16 5c-1 2-1 3.5 0 5 1-2 1-3.5 0-5z" fill="#f89820" />
    </svg>
  ),

  Python: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M11.9 2c-3 0-5 .6-5 2.5v1.9h5.1v.6H5.2C3.1 7 2 8.6 2 11.2c0 2.8 1.6 4.3 3.9 4.3h1.4v-1.9c0-1.6 1.4-2.9 3-2.9h5.1c1.4 0 2.5-1.1 2.5-2.5V4.5c0-1.9-2.1-2.5-6-2.5zm-2.8 1.4a.8.8 0 110 1.6.8.8 0 010-1.6z" fill="#3776AB" />
      <path d="M12.1 22c3 0 5-.6 5-2.5v-1.9H12v-.6h6.8c2.1 0 3.2-1.6 3.2-4.2 0-2.8-1.6-4.3-3.9-4.3h-1.4v1.9c0 1.6-1.4 2.9-3 2.9H8.6c-1.4 0-2.5 1.1-2.5 2.5v3.7c0 1.9 2.1 2.5 6 2.5zm2.8-1.4a.8.8 0 110-1.6.8.8 0 010 1.6z" fill="#FFD438" />
    </svg>
  ),

  HTML: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 2l1.6 18 6.4 2 6.4-2L20 2H4z" fill="#E34F26" fillOpacity="0.15" stroke="#E34F26" strokeWidth="1.5" />
      <path d="M12 4v16.2l4.8-1.5L18 4H12z" fill="#E34F26" fillOpacity="0.3" />
      <path d="M8 8h8M8 11.5h7.5l-.5 4.5-3 1-3-1-.2-2" stroke="#E34F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  CSS: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 2l1.6 18 6.4 2 6.4-2L20 2H4z" fill="#1572B6" fillOpacity="0.15" stroke="#1572B6" strokeWidth="1.5" />
      <path d="M12 4v16.2l4.8-1.5L18 4H12z" fill="#1572B6" fillOpacity="0.3" />
      <path d="M8 8h8M8 11.5h8l-.6 5-3.4 1-3.4-1-.2-2.5" stroke="#1572B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  JavaScript: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#F7DF1E" fillOpacity="0.2" stroke="#F7DF1E" strokeWidth="1.5" />
      <path d="M10 11v6c0 1.2-.8 1.5-1.8 1.5-1 0-1.7-.5-2-1.2M14 17c.8.8 1.8 1.2 3 1.2 1.5 0 2.5-.8 2.5-2 0-1.4-1.2-1.8-2.6-2.2-1.5-.4-2.4-1-2.4-2.2 0-1.2 1-2 2.5-2 1 0 1.9.4 2.5 1" stroke="#F7DF1E" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),

  // ── Frameworks ──────────────────────────────────────────
  'React.js': ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.3" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(120 12 12)" />
    </svg>
  ),

  'Node.js': ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2l8.5 4.9v9.8L12 21.6l-8.5-4.9V6.9L12 2z" stroke="#5FA04E" strokeWidth="1.5" fill="#5FA04E" fillOpacity="0.15" />
      <path d="M12 6.5v11M7.5 9l9 5.2M7.5 14.2l9-5.2" stroke="#5FA04E" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),

  'Express.js': ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="#ffffff" strokeWidth="1.4" fill="#ffffff" fillOpacity="0.08" />
      <text x="12" y="15" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="sans-serif" fontWeight="bold">ex</text>
    </svg>
  ),

  // ── Tools & Platforms ───────────────────────────────────
  'Kali Linux': ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L4 6v6c0 5.5 3.4 10.7 8 12 4.6-1.3 8-6.5 8-12V6l-8-4z" stroke="#557C94" strokeWidth="1.5" fill="#557C94" fillOpacity="0.15" />
      <path d="M9 12l2.5 2.5L15 9" stroke="#00d4ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  VMware: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="#607078" strokeWidth="1.5" fill="#607078" fillOpacity="0.2" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="#607078" strokeWidth="1.5" fill="#607078" fillOpacity="0.2" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="#607078" strokeWidth="1.5" fill="#607078" fillOpacity="0.2" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" stroke="#00d4ff" strokeWidth="1.5" fill="#00d4ff" fillOpacity="0.2" />
    </svg>
  ),

  Ubuntu: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="#E95420" strokeWidth="1.5" fill="#E95420" fillOpacity="0.12" />
      <circle cx="12" cy="6" r="1.5" fill="#E95420" />
      <circle cx="6.8" cy="15" r="1.5" fill="#E95420" />
      <circle cx="17.2" cy="15" r="1.5" fill="#E95420" />
    </svg>
  ),

  AWS: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 14.5c3.5 2.5 8.5 2.5 12 0" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16.5 13l2.5 1.5-1.5 2.5" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 9a3 3 0 015-1 3.5 3.5 0 016 3" stroke="#FF9900" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),

  Oracle: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="6" width="18" height="12" rx="6" stroke="#F80000" strokeWidth="1.8" fill="#F80000" fillOpacity="0.15" />
      <circle cx="12" cy="12" r="2.5" fill="#F80000" />
    </svg>
  ),

  Wireshark: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 18c4-2 7-6 9-14 2 8 5 12 9 14H3z" stroke="#1679A7" strokeWidth="1.5" fill="#1679A7" fillOpacity="0.2" />
      <path d="M12 4v14" stroke="#1679A7" strokeWidth="1.2" strokeDasharray="2 2" />
    </svg>
  ),

  MySQL: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 8c0-2.2 3.6-4 8-4s8 1.8 8 4-3.6 4-8 4-8-1.8-8-4z" stroke="#4479A1" strokeWidth="1.5" fill="#4479A1" fillOpacity="0.2" />
      <path d="M4 8v8c0 2.2 3.6 4 8 4s8-1.8 8-4V8" stroke="#4479A1" strokeWidth="1.5" />
      <path d="M4 12c0 2.2 3.6 4 8 4s8-1.8 8-4" stroke="#4479A1" strokeWidth="1.2" />
    </svg>
  ),

  // ── Soft Skills ─────────────────────────────────────────
  'Problem-Solving': ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3a6 6 0 00-6 6c0 2.5 1.5 4.5 3 5.5v2.5h6V14.5c1.5-1 3-3 3-5.5a6 6 0 00-6-6z" stroke="#A855F7" strokeWidth="1.5" fill="#A855F7" fillOpacity="0.15" />
      <path d="M9.5 19.5h5M10.5 22h3M12 7v3M10.5 8.5h3" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  'Team Player': ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="9" cy="8" r="3" stroke="#22C55E" strokeWidth="1.5" fill="#22C55E" fillOpacity="0.2" />
      <circle cx="16" cy="10" r="2.5" stroke="#22C55E" strokeWidth="1.4" />
      <path d="M3 19c0-3 3-5 6-5s6 2 6 5M15 15.5c1.5-.5 3.5-.2 5 2.5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  'Project Management': ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="4" width="18" height="16" rx="3" stroke="#F59E0B" strokeWidth="1.5" fill="#F59E0B" fillOpacity="0.15" />
      <path d="M7 8h10M7 12h6M7 16h8" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  Adaptability: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="3" stroke="#00D4FF" strokeWidth="1.5" fill="#00D4FF" fillOpacity="0.2" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 5l2.2 2.2M16.8 16.8L19 19M19 5l-2.2 2.2M7.2 16.8L5 19" stroke="#00D4FF" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
};
