import { Mail, Phone } from 'lucide-react';
import { contact } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';
import MagneticButton from '../ui/MagneticButton';
import ContactForm from '../ui/ContactForm';

// Inline SVG brand icons
function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: contact.email,
    href: `mailto:${contact.email}`,
    color: '#00d4ff',
    external: false,
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'karanbadwal04',
    href: contact.linkedin,
    color: '#0a66c2',
    external: true,
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'karanbadwal04',
    href: contact.github,
    color: '#f5f5f5',
    external: true,
  },
  {
    icon: Phone,
    label: 'Mobile',
    value: contact.phone,
    href: `tel:${contact.phone.replace(/\s/g, '')}`,
    color: '#22c55e',
    external: false,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <SectionHeading
          title="Let's build something exceptional"
          subtitle="Open for software opportunities, full-stack development, and tech collaborations"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left — Contact Details & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <ScrollReveal direction="left">
              <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Get in Touch</h3>
                <p className="text-sm text-[#888] leading-relaxed mb-6">
                  Whether you have a question about my projects, want to discuss a potential opportunity, or just want to connect — feel free to reach out.
                </p>

                <div className="flex items-center gap-2 text-xs text-[#22c55e] bg-[#22c55e]/10 border border-[#22c55e]/20 px-3 py-2 rounded-lg inline-flex">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                  <span>Available for Opportunities & Projects</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Direct Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {contactItems.map((item, i) => (
                <ScrollReveal key={item.label} delay={i * 0.08}>
                  <MagneticButton
                    as="a"
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    cursorLabel="OPEN"
                    className="
                      block w-full p-4 rounded-xl
                      bg-white/[0.02] border border-white/[0.06]
                      hover:bg-white/[0.04] hover:border-white/[0.12]
                      transition-all duration-300 group
                      no-underline
                    "
                    ariaLabel={`${item.label}: ${item.value}`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className="
                          w-10 h-10 rounded-xl flex items-center justify-center
                          flex-shrink-0 transition-transform duration-300
                          group-hover:scale-110
                        "
                        style={{
                          background: `${item.color}10`,
                          border: `1px solid ${item.color}20`,
                        }}
                      >
                        <item.icon size={18} style={{ color: item.color }} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[11px] text-[#777] mb-0.5">{item.label}</p>
                        <p className="text-xs sm:text-sm font-medium text-white truncate">{item.value}</p>
                      </div>
                    </div>
                  </MagneticButton>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right — Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right">
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>

        {/* Decorative ambient light */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-96 h-96 bg-[#00d4ff]/5 rounded-full blur-[140px] pointer-events-none" />
      </div>
    </section>
  );
}
