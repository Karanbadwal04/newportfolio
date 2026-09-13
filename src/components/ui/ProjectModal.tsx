import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import type { Project } from '../../data/portfolio';
import { contact } from '../../data/portfolio';
import { useEffect } from 'react';
import { useSound } from '../../hooks/useSound';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { playHover, playClick } = useSound();

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.addEventListener('keydown', handler);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="
              relative w-full max-w-2xl max-h-[88vh] overflow-y-auto
              bg-[#111] backdrop-blur-xl
              border border-white/[0.1] rounded-2xl md:rounded-3xl
              p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]
            "
            initial={{ scale: 0.92, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Project details: ${project.title}`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              onMouseEnter={playHover}
              className="
                absolute top-4 right-4 w-9 h-9
                flex items-center justify-center rounded-full
                bg-white/[0.05] border border-white/[0.1]
                text-[#999] hover:text-white hover:bg-white/[0.1]
                transition-all duration-200
              "
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            {/* Color accent bar */}
            <div
              className="w-12 h-1 rounded-full mb-5"
              style={{ background: project.color }}
            />

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {project.title}
            </h3>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs font-medium rounded-full"
                  style={{
                    background: `${project.color}15`,
                    color: project.color,
                    border: `1px solid ${project.color}30`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#bbb] leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Features */}
            <div className="mb-8">
              <h4 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-4">
                Architecture & Key Capabilities
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#ccc] bg-white/[0.02] border border-white/[0.04] p-2.5 rounded-xl">
                    <CheckCircle2 size={15} style={{ color: project.color }} className="flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links / Action Footer */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.08]">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="
                  flex items-center gap-2 px-5 py-2.5 rounded-xl
                  bg-[#00d4ff] text-[#0a0a0a] font-medium text-xs sm:text-sm
                  hover:bg-[#00bfe0] transition-all
                "
              >
                <GithubIcon size={15} />
                <span>View on GitHub</span>
              </a>

              <button
                onClick={onClose}
                onMouseEnter={playHover}
                className="
                  px-5 py-2.5 rounded-xl
                  bg-white/[0.05] border border-white/[0.1]
                  text-white font-medium text-xs sm:text-sm
                  hover:bg-white/[0.1] transition-all
                "
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
