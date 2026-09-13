import { motion } from 'framer-motion';
import { Code2, FolderGit2, Award, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';
import GlassCard from '../ui/GlassCard';
import DeveloperTerminal from '../ui/DeveloperTerminal';

const stats = [
  { icon: Code2, label: 'Core Technologies', value: '10+', color: '#00d4ff' },
  { icon: FolderGit2, label: 'Completed Projects', value: '4+', color: '#22c55e' },
  { icon: Award, label: 'Industry Certifications', value: '3', color: '#f59e0b' },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <SectionHeading
          title="About Karanvir"
          subtitle="Engineering practical software solutions & modern web applications"
        />

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left — Text & Background (7 cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="left">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[#00d4ff] text-xs font-medium mb-4">
                  <Sparkles size={12} />
                  <span>Computer Science & Engineering</span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Passionate Developer with a Focus on{' '}
                  <span className="text-[#00d4ff]">Clean Code & Performance</span>
                </h3>

                <div className="space-y-4 text-[#bbb] leading-relaxed text-sm sm:text-base">
                  <p>
                    I am currently pursuing my <strong>Bachelor of Technology in Computer Science and Engineering</strong> at <strong>Lovely Professional University</strong>, specializing in full-stack web technologies and Java-based application engineering.
                  </p>
                  <p>
                    My technical skill set spans languages like <strong>Java, C/C++, Python, and JavaScript</strong>, alongside frameworks such as <strong>React.js, Node.js, and Express.js</strong>. I have also acquired strong foundations in database systems (MySQL, Oracle) and Linux environments (Kali, Ubuntu).
                  </p>
                  <p>
                    Whether engineering a region-specific Crop & Weather Recommendation system or crafting high-performance desktop tools in Java Swing, I prioritize clean architectural design, responsiveness, and genuine user value.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Interactive Developer Terminal (5 cols) */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="right">
              <DeveloperTerminal />
            </ScrollReveal>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <GlassCard className="p-6 md:p-8 text-center group">
                <div
                  className="
                    w-12 h-12 mx-auto mb-4 rounded-xl
                    flex items-center justify-center
                    transition-all duration-300
                    group-hover:scale-110
                  "
                  style={{
                    background: `${stat.color}10`,
                    border: `1px solid ${stat.color}20`,
                  }}
                >
                  <stat.icon size={20} style={{ color: stat.color }} />
                </div>
                <motion.span
                  className="block text-3xl md:text-4xl font-bold text-white mb-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-xs sm:text-sm text-[#888]">{stat.label}</span>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
