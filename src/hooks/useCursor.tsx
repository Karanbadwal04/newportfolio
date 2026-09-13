import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useIsTouchDevice } from './useMediaQuery';

export type CursorVariant = 'default' | 'text' | 'button' | 'project' | 'link';

interface CursorState {
  variant: CursorVariant;
  label: string;
}

interface CursorActions {
  setCursor: (variant: CursorVariant, label?: string) => void;
  resetCursor: () => void;
  isTouch: boolean;
}

const CursorStateContext = createContext<CursorState>({
  variant: 'default',
  label: '',
});

const CursorActionsContext = createContext<CursorActions>({
  setCursor: () => {},
  resetCursor: () => {},
  isTouch: false,
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CursorState>({
    variant: 'default',
    label: '',
  });
  const isTouch = useIsTouchDevice();

  const setCursor = useCallback((variant: CursorVariant, label = '') => {
    setState((prev) => {
      if (prev.variant === variant && prev.label === label) return prev;
      return { variant, label };
    });
  }, []);

  const resetCursor = useCallback(() => {
    setState((prev) => {
      if (prev.variant === 'default' && prev.label === '') return prev;
      return { variant: 'default', label: '' };
    });
  }, []);

  const actions = useMemo<CursorActions>(
    () => ({
      setCursor,
      resetCursor,
      isTouch,
    }),
    [setCursor, resetCursor, isTouch]
  );

  return (
    <CursorActionsContext.Provider value={actions}>
      <CursorStateContext.Provider value={state}>
        {children}
      </CursorStateContext.Provider>
    </CursorActionsContext.Provider>
  );
}

/**
 * Use in interactive components that trigger cursor changes.
 * Components using useCursorActions will NEVER re-render when cursor changes!
 */
export function useCursorActions() {
  return useContext(CursorActionsContext);
}

/**
 * Use in the cursor renderer only.
 */
export function useCursorState() {
  return useContext(CursorStateContext);
}
