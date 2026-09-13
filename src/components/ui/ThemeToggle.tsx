import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useSound } from '../../hooks/useSound';
import { useCursorActions } from '../../hooks/useCursor';

export default function ThemeToggle() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { playClick, playHover } = useSound();
  const { setCursor, resetCursor } = useCursorActions();

  const handleToggle = () => {
    playClick();
    toggleTheme();
  };

  return (
    <motion.button
      onClick={handleToggle}
      onMouseEnter={() => {
        setCursor('button', isDark ? 'DAY MODE' : 'NIGHT MODE');
        playHover();
      }}
      onMouseLeave={resetCursor}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className={`
        relative h-10 px-3 flex items-center gap-2 rounded-full
        transition-all duration-300 border select-none cursor-pointer
        ${isDark
          ? 'bg-white/[0.05] border-white/[0.1] text-amber-300 hover:border-amber-400/40 hover:bg-white/[0.08] shadow-[0_0_15px_rgba(251,191,36,0.1)]'
          : 'bg-black/[0.04] border-black/[0.1] text-amber-600 hover:border-amber-500/40 hover:bg-black/[0.06] shadow-[0_2px_10px_rgba(0,0,0,0.06)]'
        }
      `}
      aria-label={isDark ? 'Switch to Day (Light) mode' : 'Switch to Night (Dark) mode'}
      title={isDark ? 'Switch to Day Mode' : 'Switch to Night Mode'}
    >
      {/* Animated Icon Container */}
      <div className="relative w-5 h-5 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="flex items-center justify-center text-[#00d4ff]"
            >
              <Moon size={16} className="fill-[#00d4ff]/20" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="flex items-center justify-center text-amber-500"
            >
              <Sun size={17} className="fill-amber-400/20" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mode label on desktop */}
      <span className="hidden sm:inline text-xs font-medium tracking-wide">
        {isDark ? (
          <span className="text-[#bbb]">Night</span>
        ) : (
          <span className="text-[#334155]">Day</span>
        )}
      </span>

      {/* Ambient glow pip */}
      <span
        className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
          isDark ? 'bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]' : 'bg-amber-500 shadow-[0_0_8px_#f59e0b]'
        }`}
      />
    </motion.button>
  );
}
