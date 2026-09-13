import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';
import { navItems } from '../../data/portfolio';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useCursor } from '../../hooks/useCursor';
import { useSound } from '../../hooks/useSound';
import SoundToggle from '../ui/SoundToggle';
import ResumeModal from '../ui/ResumeModal';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const activeSection = useScrollSpy(navItems.map((n) => n.id));
  const { setCursor, resetCursor } = useCursor();
  const { playHover, playClick } = useSound();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
      playClick();
    }
  };

  return (
    <>
      <motion.nav
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500
          ${scrolled
            ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl'
            : 'bg-transparent'
          }
        `}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 md:h-18 flex items-center justify-between">
          {/* Brand */}
          <button
            onClick={() => scrollTo('home')}
            className="text-xl font-bold tracking-tight text-white hover:text-[#00d4ff] transition-colors"
            onMouseEnter={() => { setCursor('link'); playHover(); }}
            onMouseLeave={resetCursor}
          >
            KS<span className="text-[#00d4ff]">.</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                onMouseEnter={() => { setCursor('link'); playHover(); }}
                onMouseLeave={resetCursor}
                className={`
                  relative px-3.5 py-2 text-sm font-medium
                  transition-colors duration-300
                  ${activeSection === item.id ? 'text-[#00d4ff]' : 'text-[#999] hover:text-white'}
                `}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-[#00d4ff] rounded-full"
                    layoutId="nav-indicator"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Resume Button */}
            <button
              onClick={() => { setResumeOpen(true); playClick(); }}
              onMouseEnter={() => { setCursor('button', 'RESUME'); playHover(); }}
              onMouseLeave={resetCursor}
              className="
                flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full
                bg-white/[0.05] border border-white/[0.1] text-white
                hover:border-[#00d4ff]/40 hover:bg-[#00d4ff]/10 hover:text-[#00d4ff]
                transition-all duration-300
              "
              title="View Curriculum Vitae"
            >
              <FileText size={13} />
              <span className="hidden sm:inline">Resume</span>
            </button>

            <SoundToggle />

            {/* Mobile menu toggle */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center text-white"
              onClick={() => { setMobileOpen(!mobileOpen); playClick(); }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="
              fixed inset-0 z-40 flex flex-col items-center justify-center gap-2
              bg-[#0a0a0a]/95 backdrop-blur-2xl
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`
                  text-2xl font-medium py-2.5
                  ${activeSection === item.id ? 'text-[#00d4ff]' : 'text-[#999]'}
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                {item.label}
              </motion.button>
            ))}

            <motion.button
              onClick={() => { setMobileOpen(false); setResumeOpen(true); }}
              className="mt-4 flex items-center gap-2 px-6 py-3 rounded-full bg-[#00d4ff] text-[#0a0a0a] text-sm font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <FileText size={16} />
              <span>View Resume (CV)</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
