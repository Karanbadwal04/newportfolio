import { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

interface HistoryItem {
  command: string;
  output: string | string[];
}

export default function DeveloperTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'whoami',
      output: 'Karanvir Singh — Computer Science Engineer & Full-Stack Developer at Lovely Professional University.',
    },
    {
      command: 'skills --top',
      output: ['Java', 'C/C++', 'Python', 'React.js', 'Node.js', 'Express.js', 'Linux', 'SQL'],
    },
  ]);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  const { playHover, playClick } = useSound();

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    playClick();

    let output: string | string[] = '';

    switch (cmd) {
      case 'help':
        output = [
          'Available commands:',
          '  • whoami       - Introduction to Karanvir',
          '  • skills       - List primary tech stack',
          '  • projects     - Showcase featured work',
          '  • education    - View academic history',
          '  • contact      - Get email, LinkedIn & GitHub',
          '  • clear        - Clear the terminal screen',
        ];
        break;
      case 'whoami':
      case 'about':
        output = 'Karanvir Singh: Computer Science Engineer, passionate about full-stack development, Java GUI engineering, and scalable web solutions.';
        break;
      case 'skills':
      case 'skills --top':
        output = [
          'Languages: Java, C, C++, Python, JavaScript, HTML, CSS',
          'Frameworks: React.js, Node.js, Express.js',
          'Platforms & Tools: Kali Linux, Ubuntu, VMware, AWS, Oracle, MySQL, Wireshark',
        ];
        break;
      case 'projects':
        output = [
          '1. Crop & Weather Recommendation System (React, Node.js, Express)',
          '2. Personal Portfolio Website (React, Vite, Tailwind CSS, Framer Motion)',
          '3. Word Counter Desktop App (Java Swing, AWT)',
          '4. Customer Billing System (C, Data Structures, File Handling)',
        ];
        break;
      case 'education':
        output = [
          '• B.Tech in CSE — Lovely Professional University (2022 - Present)',
          '• Intermediate — Mount Carmel School (78%)',
          '• Matriculation — Government Sr. Sec. School (87%)',
        ];
        break;
      case 'contact':
        output = [
          '• Email: karanbadwal04@gmail.com',
          '• LinkedIn: linkedin.com/in/karanbadwal04',
          '• GitHub: github.com/karanbadwal04',
          '• Phone: +91 - 9465802410',
        ];
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        output = `Command not recognized: "${cmd}". Type "help" for a list of available commands.`;
    }

    setHistory((prev) => [...prev, { command: input.trim(), output }]);
    setInput('');
  };

  return (
    <div className="rounded-2xl overflow-hidden bg-[#0c0c0c] border border-white/[0.08] shadow-2xl font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[11px] text-[#777] flex items-center gap-1.5 font-sans">
            <Terminal size={12} className="text-[#00d4ff]" /> karanvir@dev-portfolio: ~
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-[#555] font-sans">
          <span>bash</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalBodyRef}
        className="p-4 md:p-5 max-h-72 overflow-y-auto space-y-3 leading-relaxed text-[#ccc]"
      >
        <div className="text-[#666] text-[11px]">
          Welcome to Karanvir's interactive terminal. Type <span className="text-[#00d4ff]">help</span> to view commands.
        </div>

        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-white">
              <span className="text-[#00d4ff]">❯</span>
              <span className="text-[#00d4ff]/90">{item.command}</span>
            </div>
            <div className="text-[#aaa] pl-4">
              {Array.isArray(item.output) ? (
                item.output.map((line, lIdx) => (
                  <div key={lIdx} className="py-0.5">{line}</div>
                ))
              ) : (
                <div>{item.output}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Command Input */}
      <form
        onSubmit={handleCommand}
        className="flex items-center gap-2 px-4 py-2.5 bg-black/40 border-t border-white/[0.06]"
      >
        <span className="text-[#00d4ff]">❯</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={playHover}
          placeholder="Type 'help', 'skills', 'contact'..."
          className="
            flex-1 bg-transparent border-none outline-none text-white text-xs font-mono
            placeholder:text-[#555] placeholder:font-sans
          "
        />
        <button
          type="submit"
          onMouseEnter={playHover}
          className="p-1 rounded text-[#777] hover:text-[#00d4ff] transition-colors"
          title="Execute command"
        >
          <CornerDownLeft size={12} />
        </button>
      </form>
    </div>
  );
}
