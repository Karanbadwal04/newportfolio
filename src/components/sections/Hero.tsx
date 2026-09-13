import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, FileText, Sparkles, FolderGit2, Send } from 'lucide-react';
import AnimatedText from '../ui/AnimatedText';
import ParticleField from '../three/ParticleField';
import ResumeModal from '../ui/ResumeModal';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useSound } from '../../hooks/useSound';
import { useCursorActions } from '../../hooks/useCursor';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [resumeOpen, setResumeOpen] = useState(false);
  const reduced = useReducedMotion();
  const { playClick, playHover } = useSound();
  const { setCursor, resetCursor } = useCursorActions();

  useEffect(() => {
    if (reduced) return;
    const handler = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, [reduced]);

  const scrollTo = (id: string) => {
    playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20 pb-12"
    >
      {/* Particle background */}
      <ParticleField />

      {/* Mouse-following glow */}
      {!reduced && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 212, 255, 0.05), transparent 60%)`,
          }}
        />
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center my-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-5"
        >
          <span className="
            inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium tracking-widest uppercase
            text-[#00d4ff] border border-[#00d4ff]/25 rounded-full
            bg-[#00d4ff]/[0.06] shadow-[0_0_20px_rgba(0,212,255,0.12)]
          ">
            <Sparkles size={13} className="text-[#00d4ff]" />
            Full-Stack Developer & CS Engineer
          </span>
        </motion.div>

        {/* Name Header */}
        <AnimatedText
          text="Karanvir Singh"
          as="h1"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-5"
          splitBy="letter"
          delay={0.2}
          stagger={0.03}
        />

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-[#bbb] mb-3 font-light tracking-wide"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          Lovely Professional University{' '}
          <span className="text-[#00d4ff]">•</span> B.Tech CSE{' '}
          <span className="text-[#00d4ff]">•</span> Web & Java Specialist
        </motion.p>

        {/* Introduction */}
        <motion.p
          className="text-xs sm:text-sm md:text-base text-[#888] max-w-2xl mx-auto mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
        >
          Engineering robust full-stack software, responsive web applications, and intuitive user experiences with clean architecture and modern technologies.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3.5"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
        >
          {/* Explore Projects Primary Button */}
          <button
            onClick={() => scrollTo('projects')}
            onMouseEnter={() => { setCursor('button', 'PROJECTS'); playHover(); }}
            onMouseLeave={resetCursor}
            className="
              flex items-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wide
              bg-[#00d4ff] text-[#0a0a0a] rounded-full
              hover:bg-[#00bfe0] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]
              hover:scale-105 active:scale-95
              transition-all duration-200 cursor-pointer
            "
          >
            <FolderGit2 size={16} />
            <span>Explore Projects</span>
          </button>

          {/* View Resume Button */}
          <button
            onClick={() => { setResumeOpen(true); playClick(); }}
            onMouseEnter={() => { setCursor('button', 'RESUME'); playHover(); }}
            onMouseLeave={resetCursor}
            className="
              flex items-center gap-2 px-6 py-3.5 text-sm font-medium tracking-wide
              bg-white/[0.04] text-white rounded-full
              border border-white/[0.12] hover:border-[#00d4ff]/40
              hover:bg-white/[0.08] hover:text-[#00d4ff]
              hover:scale-105 active:scale-95
              transition-all duration-200 cursor-pointer
            "
          >
            <FileText size={16} />
            <span>View Resume</span>
          </button>

          {/* Contact Me Button */}
          <button
            onClick={() => scrollTo('contact')}
            onMouseEnter={() => { setCursor('button', 'CONTACT'); playHover(); }}
            onMouseLeave={resetCursor}
            className="
              flex items-center gap-2 px-6 py-3.5 text-sm font-medium tracking-wide
              bg-transparent text-[#aaa] rounded-full
              border border-white/[0.1] hover:border-white/[0.25]
              hover:bg-white/[0.04] hover:text-white
              hover:scale-105 active:scale-95
              transition-all duration-200 cursor-pointer
            "
          >
            <Send size={15} />
            <span>Contact Me</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="relative z-10 mt-auto pt-6 flex flex-col items-center gap-1.5 cursor-pointer"
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#555]">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={13} className="text-[#666]" />
        </motion.div>
      </motion.div>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
