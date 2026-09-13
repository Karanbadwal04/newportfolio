import { memo } from 'react';
import { useCursorActions } from '../../hooks/useCursor';
import { useSound } from '../../hooks/useSound';
import { SkillIcons } from './SkillIcons';
import { Check, Zap, Sparkles } from 'lucide-react';

interface SkillContainerProps {
  name: string;
  category: string;
  color?: string;
  delay?: number;
}

function SkillContainerComponent({
  name,
  category,
  color = '#00d4ff',
}: SkillContainerProps) {
  const { setCursor, resetCursor } = useCursorActions();
  const { playHover, playClick } = useSound();

  const IconComponent = SkillIcons[name] || SkillIcons['Adaptability'];

  const handleMouseEnter = () => {
    setCursor('button', 'CHARGED');
    playHover();
  };

  const handleMouseLeave = () => {
    resetCursor();
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={playClick}
      className="
        skill-container relative overflow-hidden rounded-2xl cursor-pointer select-none
        border border-white/[0.08] hover:border-[color:var(--skill-color)]
        bg-white/[0.02] hover:bg-[#111]/90
        transition-all duration-250 ease-out group flex flex-col justify-between
        h-44 sm:h-48 p-4 will-change-transform
        hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(var(--skill-rgb),0.25)]
      "
      style={{
        '--skill-color': color,
        '--skill-rgb': hexToRgb(color),
      } as React.CSSProperties}
    >
      {/* Top Glass Highlight */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent pointer-events-none z-20" />

      {/* ── Liquid Fill Layer (Pure Hardware-Accelerated CSS Transition) ── */}
      <div
        className="
          absolute inset-x-0 bottom-0 pointer-events-none z-0 overflow-hidden
          h-0 group-hover:h-full transition-[height] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
        "
        style={{
          background: `linear-gradient(to top, ${color}45 0%, ${color}22 65%, ${color}08 100%)`,
        }}
      >
        {/* Animated surface glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-250 shadow-[0_0_12px_var(--skill-color)]"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          }}
        />
      </div>

      {/* ── Top Bar: Category & Live Indicator ── */}
      <div className="relative z-10 flex items-center justify-between">
        <span
          className="
            text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full
            border border-white/[0.08] group-hover:border-[color:var(--skill-color)]/40
            bg-white/[0.03] group-hover:bg-[color:var(--skill-color)]/20
            text-[#777] group-hover:text-[color:var(--skill-color)]
            transition-colors duration-250
          "
        >
          {category}
        </span>

        {/* Dynamic Indicator (0% to 100%) */}
        <div className="flex items-center gap-1 text-[11px] font-mono font-medium text-[#666] group-hover:text-[#22c55e] transition-colors duration-250">
          <span className="group-hover:hidden flex items-center gap-1">
            <Zap size={11} className="text-[#00d4ff]/70" />
            <span>0%</span>
          </span>
          <span className="hidden group-hover:flex items-center gap-1">
            <Check size={12} className="stroke-[3]" />
            <span>100%</span>
          </span>
        </div>
      </div>

      {/* ── Center: Skill Brand Logo with Glow ── */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
        <div
          className="
            w-14 h-14 rounded-2xl flex items-center justify-center
            transition-all duration-250 group-hover:scale-110
            relative shadow-inner
            bg-white/[0.04] group-hover:bg-[color:var(--skill-color)]/25
            border border-white/[0.08] group-hover:border-[color:var(--skill-color)]/50
            group-hover:shadow-[0_0_20px_rgba(var(--skill-rgb),0.35)]
          "
        >
          <IconComponent size={28} />

          {/* Sparkle badge on hover */}
          <div
            className="
              absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center
              bg-black/80 border border-[color:var(--skill-color)]
              opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100
              transition-all duration-250
            "
          >
            <Sparkles size={11} style={{ color }} />
          </div>
        </div>
      </div>

      {/* ── Bottom: Skill Name ── */}
      <div className="relative z-10 text-center">
        <h4 className="text-sm sm:text-base font-bold text-white transition-colors duration-250 group-hover:text-[color:var(--skill-color)]">
          {name}
        </h4>
      </div>

      {/* Container Bottom Rim Base */}
      <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-white/[0.06] rounded-full z-20" />
    </div>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 212, 255';
}

export default memo(SkillContainerComponent);
