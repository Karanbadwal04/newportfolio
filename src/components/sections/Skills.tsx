import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import SkillContainer from '../ui/SkillContainer';
import { useCursorActions } from '../../hooks/useCursor';
import { useSound } from '../../hooks/useSound';

const categoryColors: Record<string, string> = {
  all: '#00d4ff',
  languages: '#00d4ff',
  frameworks: '#22c55e',
  tools: '#a855f7',
  soft: '#f59e0b',
};

const categories = [
  { key: 'languages', label: 'Languages' },
  { key: 'frameworks', label: 'Frameworks' },
  { key: 'tools', label: 'Tools & Platforms' },
  { key: 'soft', label: 'Soft Skills' },
  { key: 'all', label: 'View All' },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('languages');
  const { setCursor, resetCursor } = useCursorActions();
  const { playHover, playClick } = useSound();

  const filtered = activeCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  const color = categoryColors[activeCategory] || '#00d4ff';

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="The programming languages, frameworks, and tools I work with"
        />

        {/* Category tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); playClick(); }}
              onMouseEnter={() => { setCursor('button', cat.label.toUpperCase()); playHover(); }}
              onMouseLeave={resetCursor}
              className={`
                relative px-5 py-2 text-xs sm:text-sm font-medium rounded-full
                transition-all duration-300
                ${activeCategory === cat.key
                  ? 'text-white'
                  : 'text-[#666] hover:text-[#bbb] bg-white/[0.02]'
                }
              `}
              style={
                activeCategory === cat.key
                  ? {
                      background: `${categoryColors[cat.key]}18`,
                      border: `1px solid ${categoryColors[cat.key]}40`,
                      color: categoryColors[cat.key],
                      boxShadow: `0 0 20px ${categoryColors[cat.key]}20`,
                    }
                  : { border: '1px solid rgba(255,255,255,0.06)' }
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Interactive Skills Grid with Containers */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4"
          >
            {filtered.map((skill, i) => (
              <SkillContainer
                key={skill.name}
                name={skill.name}
                category={skill.category}
                delay={i * 0.03}
                color={categoryColors[skill.category] || color}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Decorative background glow without expensive GPU blur filter */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[500px] h-[500px] rounded-full pointer-events-none transition-colors duration-500"
          style={{
            background: `radial-gradient(circle, ${color}12 0%, transparent 70%)`,
          }}
        />
      </div>
    </section>
  );
}
