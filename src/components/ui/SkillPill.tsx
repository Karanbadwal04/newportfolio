import { motion } from 'framer-motion';
import { useCursor } from '../../hooks/useCursor';
import { useSound } from '../../hooks/useSound';

interface SkillPillProps {
  name: string;
  delay?: number;
  color?: string;
}

export default function SkillPill({ name, delay = 0, color = '#00d4ff' }: SkillPillProps) {
  const { setCursor, resetCursor } = useCursor();
  const { playHover } = useSound();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08, y: -2 }}
      onMouseEnter={() => {
        setCursor('button', name.toUpperCase());
        playHover();
      }}
      onMouseLeave={resetCursor}
      className="
        relative px-5 py-2.5 rounded-full
        bg-white/[0.04] border border-white/[0.08]
        text-sm font-medium text-[#e5e5e5]
        cursor-pointer select-none
        transition-colors duration-300
        hover:border-[color:var(--pill-color)]/30
        hover:shadow-[0_0_20px_rgba(var(--pill-rgb),0.15)]
        group
      "
      style={{
        '--pill-color': color,
        '--pill-rgb': hexToRgb(color),
      } as React.CSSProperties}
    >
      {/* Glow dot */}
      <span
        className="
          absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        "
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      />
      {name}
    </motion.div>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 212, 255';
}
