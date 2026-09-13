import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useIsTouchDevice } from './useMediaQuery';

export type CursorVariant = 'default' | 'text' | 'button' | 'project' | 'link';

interface CursorCtx {
  x: number;
  y: number;
  variant: CursorVariant;
  label: string;
  setCursor: (variant: CursorVariant, label?: string) => void;
  resetCursor: () => void;
  isTouch: boolean;
}

const CursorContext = createContext<CursorCtx>({
  x: 0,
  y: 0,
  variant: 'default',
  label: '',
  setCursor: () => {},
  resetCursor: () => {},
  isTouch: false,
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [label, setLabel] = useState('');
  const isTouch = useIsTouchDevice();
  const raf = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    // Lerp loop
    let currentX = 0;
    let currentY = 0;

    const tick = () => {
      currentX += (mouseRef.current.x - currentX) * 0.15;
      currentY += (mouseRef.current.y - currentY) * 0.15;
      setPos({ x: currentX, y: currentY });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [isTouch]);

  const setCursor = useCallback((v: CursorVariant, l = '') => {
    setVariant(v);
    setLabel(l);
  }, []);

  const resetCursor = useCallback(() => {
    setVariant('default');
    setLabel('');
  }, []);

  return (
    <CursorContext.Provider
      value={{ x: pos.x, y: pos.y, variant, label, setCursor, resetCursor, isTouch }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
}
