import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export default function SoundToggle() {
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());

  const toggle = useCallback(() => {
    if (!soundEngine.getInitialized()) {
      soundEngine.init();
    }
    const nowUnmuted = soundEngine.toggleMute();
    setIsMuted(!nowUnmuted);
  }, []);

  return (
    <motion.button
      onClick={toggle}
      className="
        relative w-10 h-10 flex items-center justify-center
        rounded-full bg-white/[0.05] border border-white/[0.1]
        text-[#999] hover:text-[#00d4ff] hover:border-[#00d4ff]/30
        transition-colors duration-300
      "
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isMuted ? 'Enable sound' : 'Disable sound'}
      title={isMuted ? 'Sound Off' : 'Sound On'}
    >
      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}

      {/* Animated sound bars when active */}
      {!isMuted && (
        <span className="absolute -top-1 -right-1 flex gap-[2px]">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-[2px] bg-[#00d4ff] rounded-full"
              animate={{ height: [2, 6, 2] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </span>
      )}
    </motion.button>
  );
}
