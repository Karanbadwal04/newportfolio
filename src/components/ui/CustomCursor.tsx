import { useEffect, useRef } from 'react';
import { useCursorState, useCursorActions } from '../../hooks/useCursor';

export default function CustomCursor() {
  const { variant, label } = useCursorState();
  const { isTouch } = useCursorActions();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Smooth spring/lerp loop for the larger outer ring
    const render = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.2;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.2;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [isTouch]);

  if (isTouch) return null;

  const dotSize = variant === 'default' ? 8 : variant === 'text' ? 6 : 4;
  const ringSize =
    variant === 'project' ? 80 : variant === 'button' ? 60 : variant === 'link' ? 50 : 38;
  const showLabel = (variant === 'button' || variant === 'project') && !!label;

  return (
    <>
      {/* Small Precision Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full bg-[#00d4ff] pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          transition: 'width 0.15s ease, height 0.15s ease',
        }}
      />

      {/* Responsive Glow Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-[#00d4ff]/50 pointer-events-none z-[9998] flex items-center justify-center will-change-transform"
        style={{
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          opacity: variant === 'default' ? 0.35 : 0.75,
          transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease',
        }}
      >
        {showLabel && (
          <span
            className="text-[9px] font-mono font-bold tracking-widest text-[#00d4ff] uppercase whitespace-nowrap select-none"
            style={{ textShadow: '0 0 8px rgba(0,212,255,0.6)' }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  );
}
