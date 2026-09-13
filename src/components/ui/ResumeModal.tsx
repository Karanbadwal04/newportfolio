import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Mail, Phone, MapPin, GraduationCap, Briefcase, Award, Code2 } from 'lucide-react';
import { contact, education, experience, certifications, skills, projects } from '../../data/portfolio';
import { useEffect } from 'react';
import { useSound } from '../../hooks/useSound';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { playClick, playHover } = useSound();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handlePrint = () => {
    playClick();
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 md:p-8"
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

          {/* Modal Content */}
          <motion.div
            className="
              relative w-full max-w-4xl max-h-[90vh] overflow-y-auto
              bg-[#0e0e0e] border border-white/[0.1] rounded-2xl md:rounded-3xl
              shadow-[0_20px_60px_rgba(0,0,0,0.8)]
              p-6 sm:p-8 md:p-10
            "
            initial={{ scale: 0.94, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            role="dialog"
            aria-modal="true"
            aria-label="Karanvir Singh Resume"
          >
            {/* Header Actions */}
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-6">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#00d4ff]" />
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  Curriculum Vitae
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  onMouseEnter={playHover}
                  className="
                    flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg
                    bg-white/[0.05] border border-white/[0.1] text-[#ccc]
                    hover:text-white hover:bg-white/[0.1] transition-all
                  "
                  title="Print / Save as PDF"
                >
                  <Printer size={14} />
                  <span className="hidden sm:inline">Print / PDF</span>
                </button>

                <button
                  onClick={onClose}
                  onMouseEnter={playHover}
                  className="
                    w-8 h-8 flex items-center justify-center rounded-lg
                    bg-white/[0.05] border border-white/[0.1] text-[#999]
                    hover:text-white hover:bg-white/[0.1] transition-all
                  "
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Resume Body */}
            <div className="space-y-8 text-[#ccc]">
              {/* Header Info */}
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
                <h1 className="text-3xl font-bold text-white mb-2">Karanvir Singh</h1>
                <p className="text-sm font-medium text-[#00d4ff] mb-4">
                  Computer Science & Engineering Student • Full-Stack Developer
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-[#999]">
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-[#00d4ff]" />
                    <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">{contact.email}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-[#22c55e]" />
                    <span>{contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-[#f59e0b]" />
                    <span>Punjab, India</span>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="flex items-center gap-2 text-white font-semibold text-base mb-4">
                  <GraduationCap size={18} className="text-[#00d4ff]" />
                  <span>Education</span>
                </div>
                <div className="space-y-4">
                  {education.map((edu, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                        <h4 className="font-medium text-white text-sm">{edu.institution}</h4>
                        <span className="text-xs text-[#888]">{edu.duration}</span>
                      </div>
                      <p className="text-xs text-[#00d4ff] mb-1">{edu.degree}</p>
                      <div className="flex items-center justify-between text-xs text-[#777]">
                        <span>{edu.location}</span>
                        {edu.grade && <span className="text-[#22c55e] font-medium">Grade: {edu.grade}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <div className="flex items-center gap-2 text-white font-semibold text-base mb-4">
                  <Briefcase size={18} className="text-[#22c55e]" />
                  <span>Experience & Training</span>
                </div>
                <div className="space-y-4">
                  {experience.map((exp, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                        <h4 className="font-medium text-white text-sm">{exp.role}</h4>
                        <span className="text-xs text-[#888]">{exp.duration}</span>
                      </div>
                      <p className="text-xs text-[#22c55e] mb-3">{exp.organization}</p>
                      <ul className="list-disc list-inside space-y-1 text-xs text-[#aaa]">
                        {exp.details.map((d, j) => (
                          <li key={j}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <div className="flex items-center gap-2 text-white font-semibold text-base mb-4">
                  <Code2 size={18} className="text-[#a855f7]" />
                  <span>Projects</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projects.map((p) => (
                    <div key={p.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <h4 className="font-medium text-white text-sm mb-1">{p.title}</h4>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {p.tech.map((t) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-[#888]">
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-[#999] leading-relaxed">{p.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <div className="flex items-center gap-2 text-white font-semibold text-base mb-4">
                  <Award size={18} className="text-[#f59e0b]" />
                  <span>Technical Skills</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span
                      key={s.name}
                      className="px-2.5 py-1 text-xs rounded-lg bg-white/[0.03] border border-white/[0.06] text-[#ccc]"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <div className="flex items-center gap-2 text-white font-semibold text-base mb-4">
                  <Award size={18} className="text-[#00d4ff]" />
                  <span>Certifications</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {certifications.map((cert) => (
                    <div key={cert.title} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <h5 className="font-medium text-white text-xs mb-1">{cert.title}</h5>
                      <p className="text-[11px] text-[#888]">{cert.issuer}</p>
                      <p className="text-[10px] text-[#00d4ff] mt-1">{cert.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
