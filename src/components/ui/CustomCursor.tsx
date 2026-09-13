import { motion } from 'framer-motion';
import { useCursor } from '../../hooks/useCursor';

export default function CustomCursor() {
  const { x, y, variant, label, isTouch } = useCursor();

  if (isTouch) return null;

  const dotSize = variant === 'default' ? 8 : variant === 'text' ? 6 : 4;
  const ringSize =
    variant === 'project' ? 80 : variant === 'button' ? 60 : variant === 'link' ? 50 : 40;
  const showLabel = (variant === 'button' || variant === 'project') && label;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="cursor-dot"
        animate={{
          x: x - dotSize / 2,
          y: y - dotSize / 2,
          width: dotSize,
          height: dotSize,
        }}
        transition={{ type: 'tween', duration: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: '50%',
          background: '#00d4ff',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
      />

      {/* Ring */}
      <motion.div
        className="cursor-ring"
        animate={{
          x: x - ringSize / 2,
          y: y - ringSize / 2,
          width: ringSize,
          height: ringSize,
          opacity: variant === 'default' ? 0.4 : 0.6,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: '50%',
          border: '1.5px solid rgba(0, 212, 255, 0.5)',
          pointerEvents: 'none',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {showLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: '#00d4ff',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
