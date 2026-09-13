import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, FileText, Sparkles } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import AnimatedText from '../ui/AnimatedText';
import ParticleField from '../three/ParticleField';
import ResumeModal from '../ui/ResumeModal';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useSound } from '../../hooks/useSound';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [resumeOpen, setResumeOpen] = useState(false);
  const reduced = useReducedMotion();
  const { playClick, playHover } = useSound();

  useEffect(() => {
    if (reduced) return;
    const handler = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, [reduced]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    playClick();
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
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

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Intro badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <span className="
            inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium tracking-widest uppercase
            text-[#00d4ff] border border-[#00d4ff]/20 rounded-full
            bg-[#00d4ff]/[0.05] shadow-[0_0_20px_rgba(0,212,255,0.1)]
          ">
            <Sparkles size={12} className="text-[#00d4ff]" />
            Full-Stack Developer & CS Engineer
          </span>
        </motion.div>

        {/* Name */}
        <AnimatedText
          text="Karanvir Singh"
          as="h1"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6"
          splitBy="letter"
          delay={0.2}
          stagger={0.03}
        />

        {/* Subtitle */}
        <motion.p
          className="text-base md:text-lg lg:text-xl text-[#bbb] mb-4 font-light tracking-wide"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Lovely Professional University{' '}
          <span className="text-[#00d4ff]">•</span> B.Tech CSE{' '}
          <span className="text-[#00d4ff]">•</span> Web & Java Specialist
        </motion.p>

        {/* Introduction */}
        <motion.p
          className="text-sm md:text-base text-[#888] max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Engineering robust full-stack software, responsive web applications, and intuitive user experiences with clean architecture and modern technologies.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <MagneticButton
            onClick={() => scrollTo('projects')}
            cursorLabel="PROJECTS"
            className="
              px-8 py-3.5 text-sm font-medium tracking-wide
              bg-[#00d4ff] text-[#0a0a0a] rounded-full
              hover:bg-[#00bfe0] hover:shadow-[0_0_30px_rgba(0,212,255,0.35)]
              transition-all duration-300
            "
          >
            Explore Projects
          </MagneticButton>

          <button
            onClick={() => { setResumeOpen(true); playClick(); }}
            onMouseEnter={playHover}
            className="
              flex items-center gap-2 px-7 py-3.5 text-sm font-medium tracking-wide
              bg-white/[0.04] text-white rounded-full
              border border-white/[0.12] hover:border-[#00d4ff]/40
              hover:bg-white/[0.08] hover:text-[#00d4ff]
              transition-all duration-300
            "
          >
            <FileText size={16} />
            <span>View Resume</span>
          </button>

          <MagneticButton
            onClick={() => scrollTo('contact')}
            cursorLabel="CONNECT"
            className="
              px-8 py-3.5 text-sm font-medium tracking-wide
              bg-transparent text-[#aaa] rounded-full
              border border-white/[0.1] hover:border-white/[0.25]
              hover:bg-white/[0.04] hover:text-white
              transition-all duration-300
            "
          >
            Contact Me
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <span className="text-[11px] tracking-widest uppercase text-[#555]">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} className="text-[#666]" />
          </motion.div>
        </motion.div>
      </div>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
