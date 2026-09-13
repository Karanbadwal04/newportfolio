import { experience } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import TimelineItem from '../ui/TimelineItem';

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <SectionHeading
          title="Experience & Training"
          subtitle="Hands-on learning and development"
        />

        <div className="relative">
          {experience.map((exp, i) => (
            <TimelineItem
              key={i}
              title={exp.role}
              subtitle={exp.organization}
              duration={exp.duration}
              details={exp.details}
              index={i}
              color="#00d4ff"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
