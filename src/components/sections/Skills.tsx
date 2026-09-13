import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills, skillCategories } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import SkillPill from '../ui/SkillPill';
import { useCursor } from '../../hooks/useCursor';
import { useSound } from '../../hooks/useSound';

const categoryColors: Record<string, string> = {
  languages: '#00d4ff',
  frameworks: '#22c55e',
  tools: '#a855f7',
  soft: '#f59e0b',
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('languages');
  const { setCursor, resetCursor } = useCursor();
  const { playHover, playClick } = useSound();

  const filtered = skills.filter((s) => s.category === activeCategory);
  const color = categoryColors[activeCategory] || '#00d4ff';

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="The tools and technologies I work with"
        />

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {skillCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); playClick(); }}
              onMouseEnter={() => { setCursor('button', cat.label.toUpperCase()); playHover(); }}
              onMouseLeave={resetCursor}
              className={`
                relative px-5 py-2 text-sm font-medium rounded-full
                transition-all duration-300
                ${activeCategory === cat.key
                  ? 'text-white'
                  : 'text-[#666] hover:text-[#999] bg-white/[0.02]'
                }
              `}
              style={
                activeCategory === cat.key
                  ? {
                      background: `${categoryColors[cat.key]}15`,
                      border: `1px solid ${categoryColors[cat.key]}30`,
                      color: categoryColors[cat.key],
                    }
                  : { border: '1px solid transparent' }
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {filtered.map((skill, i) => (
              <SkillPill
                key={skill.name}
                name={skill.name}
                delay={i * 0.05}
                color={color}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Decorative glow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-96 h-96 rounded-full blur-[150px] opacity-10 pointer-events-none transition-colors duration-700"
          style={{ background: color }}
        />
      </div>
    </section>
  );
}
