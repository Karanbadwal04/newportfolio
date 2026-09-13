import { useEffect } from 'react';
import { CursorProvider } from './hooks/useCursor';
import { soundEngine } from './utils/soundEngine';
import CustomCursor from './components/ui/CustomCursor';
import LoadingScreen from './components/layout/LoadingScreen';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Certifications from './components/sections/Certifications';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';

export default function App() {
  // Initialize audio on first user interaction
  useEffect(() => {
    const initAudio = () => {
      if (!soundEngine.getInitialized()) {
        soundEngine.init();
        if (!soundEngine.getMuted()) {
          soundEngine.startAmbient();
        }
      }
      window.removeEventListener('click', initAudio);
      window.removeEventListener('touchstart', initAudio);
    };

    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('touchstart', initAudio, { once: true });

    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('touchstart', initAudio);
    };
  }, []);

  return (
    <CursorProvider>
      <LoadingScreen />
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Education />
        <Contact />
      </main>

      <Footer />
    </CursorProvider>
  );
}
