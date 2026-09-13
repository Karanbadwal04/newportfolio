import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { playHover, playClick } = useSound();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    // Simulate sending with realistic feedback
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 sm:p-8">
      <h3 className="text-lg md:text-xl font-bold text-white mb-2">Send a Message</h3>
      <p className="text-xs sm:text-sm text-[#888] mb-6">
        Fill out the form below and I'll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#aaa] mb-1.5">
              Your Name <span className="text-[#00d4ff]">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              onFocus={playHover}
              placeholder="e.g. Alex Johnson"
              className="
                w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08]
                text-sm text-white placeholder:text-[#555]
                focus:border-[#00d4ff] focus:bg-white/[0.05] focus:outline-none
                transition-all duration-200
              "
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#aaa] mb-1.5">
              Email Address <span className="text-[#00d4ff]">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              onFocus={playHover}
              placeholder="alex@example.com"
              className="
                w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08]
                text-sm text-white placeholder:text-[#555]
                focus:border-[#00d4ff] focus:bg-white/[0.05] focus:outline-none
                transition-all duration-200
              "
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#aaa] mb-1.5">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onFocus={playHover}
            placeholder="Project Collaboration / Opportunity"
            className="
              w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08]
              text-sm text-white placeholder:text-[#555]
              focus:border-[#00d4ff] focus:bg-white/[0.05] focus:outline-none
              transition-all duration-200
            "
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#aaa] mb-1.5">
            Message <span className="text-[#00d4ff]">*</span>
          </label>
          <textarea
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            onFocus={playHover}
            placeholder="Hi Karanvir, I came across your portfolio..."
            className="
              w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08]
              text-sm text-white placeholder:text-[#555] resize-none
              focus:border-[#00d4ff] focus:bg-white/[0.05] focus:outline-none
              transition-all duration-200
            "
          />
        </div>

        {/* Status Messages */}
        <AnimatePresence>
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-xs text-[#ff5f57] bg-[#ff5f57]/10 border border-[#ff5f57]/20 px-3 py-2 rounded-lg"
            >
              <AlertCircle size={14} />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-xs text-[#22c55e] bg-[#22c55e]/10 border border-[#22c55e]/20 px-3 py-2 rounded-lg"
            >
              <CheckCircle2 size={14} />
              <span>Thank you! Your message has been sent successfully.</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={status === 'submitting'}
          onMouseEnter={playHover}
          className="
            w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl
            bg-[#00d4ff] text-[#0a0a0a] font-medium text-sm
            hover:bg-[#00bfe0] hover:shadow-[0_0_25px_rgba(0,212,255,0.3)]
            disabled:opacity-60 disabled:cursor-not-allowed
            transition-all duration-300
          "
        >
          {status === 'submitting' ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Sending message...</span>
            </>
          ) : (
            <>
              <Send size={15} />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
