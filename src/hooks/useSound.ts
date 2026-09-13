import { useCallback } from 'react';
import { soundEngine } from '../utils/soundEngine';

export function useSound() {
  const playHover = useCallback(() => soundEngine.playHover(), []);
  const playClick = useCallback(() => soundEngine.playClick(), []);

  const toggle = useCallback(() => {
    if (!soundEngine.getInitialized()) {
      soundEngine.init();
    }
    return soundEngine.toggleMute();
  }, []);

  const init = useCallback(() => {
    if (!soundEngine.getInitialized()) {
      soundEngine.init();
      if (!soundEngine.getMuted()) {
        soundEngine.startAmbient();
      }
    }
  }, []);

  return {
    playHover,
    playClick,
    toggle,
    init,
    isMuted: soundEngine.getMuted(),
  };
}
