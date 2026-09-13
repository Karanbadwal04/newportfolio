import { type ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div
      className={`
        relative rounded-2xl
        bg-white/[0.03] backdrop-blur-md
        border border-white/[0.06]
        ${hover ? 'transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.12]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
