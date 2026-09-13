import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { certifications } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';
import { useCursor } from '../../hooks/useCursor';
import { useSound } from '../../hooks/useSound';

const certColors = ['#00d4ff', '#22c55e', '#a855f7'];

export default function Certifications() {
  const { setCursor, resetCursor } = useCursor();
  const { playHover } = useSound();

  return (
    <section id="certifications" className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <SectionHeading
          title="Certifications"
          subtitle="Professional development and continuous learning"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {certifications.map((cert, i) => {
            const color = certColors[i % certColors.length];
            return (
              <ScrollReveal key={cert.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  onMouseEnter={() => { setCursor('button', 'VIEW'); playHover(); }}
                  onMouseLeave={resetCursor}
                  className="
                    relative p-6 rounded-2xl
                    bg-white/[0.02] border border-white/[0.06]
                    hover:bg-white/[0.04] hover:border-white/[0.1]
                    transition-all duration-300 group
                  "
                >
                  {/* Icon */}
                  <div
                    className="
                      w-10 h-10 rounded-xl flex items-center justify-center mb-4
                      transition-transform duration-300 group-hover:scale-110
                    "
                    style={{
                      background: `${color}10`,
                      border: `1px solid ${color}20`,
                    }}
                  >
                    <Award size={18} style={{ color }} />
                  </div>

                  <h3 className="text-base font-semibold text-white mb-1">{cert.title}</h3>
                  <p className="text-sm text-[#888] mb-3">{cert.issuer}</p>
                  <span
                    className="inline-block text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      background: `${color}10`,
                      color,
                      border: `1px solid ${color}20`,
                    }}
                  >
                    {cert.date}
                  </span>

                  {/* Bottom glow */}
                  <div
                    className="absolute bottom-0 left-1/4 right-1/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(to right, transparent, ${color}, transparent)`,
                    }}
                  />
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
