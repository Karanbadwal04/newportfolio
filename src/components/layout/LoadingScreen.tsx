import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="
            fixed inset-0 z-[200] flex flex-col items-center justify-center
            bg-[#0a0a0a] cursor-pointer
          "
          onClick={() => setIsVisible(false)}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* KS Monogram */}
          <motion.div
            className="relative mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
              K
            </span>
            <span className="text-5xl md:text-6xl font-bold tracking-tighter text-[#00d4ff]">
              S
            </span>
            <motion.span
              className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-[#00d4ff] to-transparent"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          {/* Loading text */}
          <motion.p
            className="text-xs tracking-[0.3em] uppercase text-[#666]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Loading experience...
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="mt-6 w-32 h-px bg-white/[0.05] rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-[#00d4ff]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
