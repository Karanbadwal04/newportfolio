import ScrollReveal from './ScrollReveal';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <ScrollReveal
      className={`mb-16 md:mb-20 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-[#999] max-w-xl mx-auto">{subtitle}</p>
      )}
      <div
        className={`mt-6 h-px w-16 bg-gradient-to-r from-[#00d4ff] to-transparent ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />
    </ScrollReveal>
  );
}
