import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/portfolio';
import type { Project } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';
import ProjectModal from '../ui/ProjectModal';
import { useCursor } from '../../hooks/useCursor';
import { useSound } from '../../hooks/useSound';
import { ExternalLink, Layers, ArrowUpRight } from 'lucide-react';

const projectFilters = [
  { key: 'all', label: 'All Projects' },
  { key: 'web', label: 'Web & Full-Stack' },
  { key: 'systems', label: 'Java & Systems' },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const { playClick, playHover } = useSound();
  const { setCursor, resetCursor } = useCursor();

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'web') return p.tech.includes('React') || p.tech.includes('Node.js') || p.tech.includes('HTML');
    if (activeFilter === 'systems') return p.tech.includes('Java') || p.tech.includes('C');
    return true;
  });

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <SectionHeading
          title="Featured Projects"
          subtitle="Explore selected software applications and full-stack solutions"
        />

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {projectFilters.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveFilter(tab.key); playClick(); }}
              onMouseEnter={() => { setCursor('button', tab.label.toUpperCase()); playHover(); }}
              onMouseLeave={resetCursor}
              className={`
                px-5 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300
                ${activeFilter === tab.key
                  ? 'bg-[#00d4ff]/15 text-[#00d4ff] border border-[#00d4ff]/30 shadow-[0_0_15px_rgba(0,212,255,0.15)]'
                  : 'bg-white/[0.02] text-[#777] border border-transparent hover:text-white hover:bg-white/[0.05]'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

// ── Project Card ────────────────────────────────────────────

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();
  const { playHover, playClick } = useSound();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={() => { onClick(); playClick(); }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setCursor('project', 'EXPLORE'); playHover(); }}
      onMouseLeave={resetCursor}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="
        project-card relative group cursor-pointer
        rounded-2xl overflow-hidden
        bg-white/[0.02] border border-white/[0.06]
        hover:border-white/[0.15]
        shadow-[0_10px_30px_rgba(0,0,0,0.5)]
        transition-all duration-500 flex flex-col justify-between
      "
      style={{
        '--card-color': project.color,
      } as React.CSSProperties}
    >
      {/* Gradient hover glow */}
      <div
        className="
          absolute inset-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-500 pointer-events-none
        "
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.color}10, transparent 45%)`,
        }}
      />

      <div>
        {/* Abstract visual */}
        <div
          className="relative h-48 md:h-52 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.color}12, transparent 60%)`,
          }}
        >
          <ProjectVisual project={project} />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

          {/* Top-Right Arrow badge */}
          <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 border border-white/[0.1] backdrop-blur-md flex items-center justify-center text-[#888] group-hover:text-white group-hover:border-white/[0.3] group-hover:scale-110 transition-all">
            <ArrowUpRight size={16} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: project.color }}
            />
            <span className="text-[11px] font-medium tracking-wider uppercase text-[#888]">
              {project.tech[0]} • Application
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white mb-2.5 group-hover:text-[var(--card-color)] transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#888] mb-5 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="
                  px-2.5 py-1 text-xs font-medium rounded-lg
                  bg-white/[0.04] border border-white/[0.06]
                  text-[#999] group-hover:text-[#ccc]
                  group-hover:border-white/[0.1]
                  transition-all duration-300
                "
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom border highlight */}
      <div
        className="h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to right, transparent, ${project.color}, transparent)`,
        }}
      />
    </motion.div>
  );
}

// ── Abstract Project Visuals ────────────────────────────────

function ProjectVisual({ project }: { project: Project }) {
  const color = project.color;

  switch (project.id) {
    case 'crop-weather':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-32 h-32">
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-8 h-1 rounded-full origin-left"
                style={{
                  background: `${color}40`,
                  rotate: `${angle}deg`,
                  translateX: '-50%',
                  translateY: '-50%',
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              />
            ))}
            <div
              className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: `${color}30`, boxShadow: `0 0 30px ${color}30` }}
            />
          </div>
        </div>
      );

    case 'portfolio':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-44 h-28 rounded-lg border border-white/[0.1] bg-black/40 overflow-hidden shadow-xl">
            <div className="flex gap-1.5 p-2 bg-white/[0.03] border-b border-white/[0.05]">
              <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
              <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
              <span className="w-2 h-2 rounded-full bg-[#28c840]" />
            </div>
            <div className="px-3 py-2 space-y-1.5">
              {[60, 85, 45, 75].map((w, i) => (
                <motion.div
                  key={i}
                  className="h-1.5 rounded-full"
                  style={{ width: `${w}%`, background: `${color}35` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                />
              ))}
            </div>
          </div>
        </div>
      );

    case 'word-counter':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.span
              className="text-6xl font-bold tracking-tighter block"
              style={{ color: `${color}30` }}
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              1,248
            </motion.span>
            <span className="text-[10px] uppercase tracking-widest text-[#777]">Words Analyzed</span>
          </div>
        </div>
      );

    case 'billing-system':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-1.5 bg-black/30 p-3 rounded-lg border border-white/[0.05]">
            {[
              { l: 'Invoice #', r: 'KS-2024' },
              { l: 'Tax Rate', r: '10.0%' },
              { l: 'Total', r: '$1,450.00' },
            ].map((row, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-between gap-8 text-xs"
                style={{ color: `${color}60` }}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <span>{row.l}</span>
                <span className="font-mono font-bold text-white/80">{row.r}</span>
              </motion.div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}
