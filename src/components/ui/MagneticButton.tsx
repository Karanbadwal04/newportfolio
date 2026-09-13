import { useRef, type ReactNode, type MouseEvent } from 'react';
import { gsap } from 'gsap';
import { useCursorActions, type CursorVariant } from '../../hooks/useCursor';
import { useSound } from '../../hooks/useSound';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  cursorLabel?: string;
  cursorVariant?: CursorVariant;
  as?: 'button' | 'a';
  ariaLabel?: string;
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  target,
  cursorLabel = 'VIEW',
  cursorVariant = 'button',
  as = 'button',
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const { setCursor, resetCursor, isTouch } = useCursorActions();
  const { playHover, playClick } = useSound();

  const handleMouseMove = (e: MouseEvent) => {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(ref.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
    resetCursor();
  };

  const handleMouseEnter = () => {
    setCursor(cursorVariant, cursorLabel);
    playHover();
  };

  const handleClick = () => {
    playClick();
    onClick?.();
  };

  const Tag = as as any;

  return (
    <Tag
      ref={ref}
      className={`magnetic-btn ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      aria-label={ariaLabel}
      style={{ display: 'inline-block', willChange: 'transform' }}
    >
      {children}
    </Tag>
  );
}
