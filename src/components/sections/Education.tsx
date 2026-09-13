import { education } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import TimelineItem from '../ui/TimelineItem';

const eduColors = ['#00d4ff', '#a855f7', '#22c55e'];

export default function Education() {
  return (
    <section id="education" className="relative py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <SectionHeading
          title="Education"
          subtitle="Academic journey and foundation"
        />

        <div className="relative">
          {education.map((edu, i) => (
            <TimelineItem
              key={i}
              title={edu.institution}
              subtitle={edu.degree}
              location={edu.location}
              duration={edu.duration}
              grade={edu.grade}
              index={i}
              color={eduColors[i % eduColors.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
