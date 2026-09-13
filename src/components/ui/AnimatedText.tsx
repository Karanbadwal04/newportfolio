import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  stagger?: number;
  once?: boolean;
  splitBy?: 'word' | 'letter';
}

export default function AnimatedText({
  text,
  className = '',
  as: Tag = 'p',
  delay = 0,
  stagger = 0.03,
  once = true,
  splitBy = 'word',
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });
  const reduced = useReducedMotion();

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  // If split by letter, split into words first to prevent awkward mobile word breaks
  if (splitBy === 'letter') {
    const words = text.split(' ');
    let globalCharIndex = 0;

    return (
      <Tag ref={ref as any} className={className} aria-label={text}>
        {words.map((word, wordIdx) => {
          const letters = word.split('');
          const startIdx = globalCharIndex;
          globalCharIndex += letters.length + 1;

          return (
            <span
              key={wordIdx}
              style={{
                display: 'inline-block',
                whiteSpace: 'nowrap',
                marginRight: wordIdx < words.length - 1 ? '0.35em' : '0',
              }}
            >
              {letters.map((letter, letterIdx) => {
                const charIndex = startIdx + letterIdx;
                return (
                  <span
                    key={letterIdx}
                    style={{
                      display: 'inline-block',
                      overflow: 'hidden',
                      verticalAlign: 'top',
                    }}
                  >
                    <motion.span
                      style={{ display: 'inline-block' }}
                      initial={{ y: '110%', opacity: 0 }}
                      animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: delay + charIndex * stagger,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      aria-hidden="true"
                    >
                      {letter}
                    </motion.span>
                  </span>
                );
              })}
            </span>
          );
        })}
      </Tag>
    );
  }

  // If split by word
  const words = text.split(' ');

  return (
    <Tag ref={ref as any} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'top',
            marginRight: i < words.length - 1 ? '0.3em' : '0',
          }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
            aria-hidden="true"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
