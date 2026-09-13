import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface TimelineItemProps {
  title: string;
  subtitle: string;
  location?: string;
  duration: string;
  details?: string[];
  grade?: string;
  index: number;
  color?: string;
}

export default function TimelineItem({
  title,
  subtitle,
  location,
  duration,
  details,
  grade,
  index,
  color = '#00d4ff',
}: TimelineItemProps) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex items-start gap-6 md:gap-8 group">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative w-4 h-4 rounded-full border-2 z-10"
          style={{ borderColor: color, background: '#0a0a0a' }}
        >
          <span
            className="absolute inset-1 rounded-full"
            style={{ background: color }}
          />
        </motion.div>
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-px flex-1 origin-top"
          style={{ background: `linear-gradient(to bottom, ${color}40, transparent)` }}
        />
      </div>

      {/* Content */}
      <ScrollReveal
        className="pb-12 flex-1"
        direction={isEven ? 'left' : 'right'}
        delay={0.1}
      >
        <div
          className="
            p-6 rounded-2xl
            bg-white/[0.03] border border-white/[0.06]
            hover:bg-white/[0.05] hover:border-white/[0.1]
            transition-all duration-300
          "
        >
          <span
            className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-3"
            style={{
              background: `${color}15`,
              color,
              border: `1px solid ${color}30`,
            }}
          >
            {duration}
          </span>

          <h3 className="text-lg md:text-xl font-semibold text-white mb-1">{title}</h3>
          <p className="text-sm text-[#999] mb-1">{subtitle}</p>
          {location && <p className="text-xs text-[#666] mb-3">{location}</p>}
          {grade && (
            <p className="text-sm font-medium mb-3" style={{ color }}>
              {grade}
            </p>
          )}

          {details && details.length > 0 && (
            <ul className="space-y-2 mt-4">
              {details.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#bbb]">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                  {d}
                </li>
              ))}
            </ul>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
}
