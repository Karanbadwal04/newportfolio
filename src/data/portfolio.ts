// ============================================================
// Portfolio Data — All content sourced strictly from CV
// ============================================================

export interface Project {
  id: string;
  title: string;
  tech: string[];
  description: string;
  features: string[];
  color: string;
}

export interface Skill {
  name: string;
  category: 'languages' | 'frameworks' | 'tools' | 'soft';
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  duration: string;
  grade?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
}

export interface Experience {
  organization: string;
  role: string;
  duration: string;
  details: string[];
}

// ── Projects ────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: 'crop-weather',
    title: 'Crop & Weather Recommendation System',
    tech: ['React', 'Node.js', 'Express'],
    description:
      'A web solution that uses soil, temperature, humidity, weather, and location data to provide region-specific crop recommendations and dynamic insights.',
    features: [
      'Soil data analysis',
      'Temperature & humidity monitoring',
      'Weather API integration',
      'Location-based recommendations',
      'Dynamic crop suggestions',
      'Interactive dashboard',
      'Live data updates',
      'Responsive UI',
    ],
    color: '#22c55e',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    tech: ['HTML', 'CSS', 'JavaScript', 'React'],
    description:
      'A responsive personal portfolio website created to showcase projects, skills, and experience with interactive elements, smooth navigation, and scroll animations.',
    features: [
      'Interactive UI elements',
      'Smooth scroll navigation',
      'Scroll-triggered animations',
      'Responsive design',
      'Project showcase',
      'Skills display',
    ],
    color: '#00d4ff',
  },
  {
    id: 'word-counter',
    title: 'Word Counter',
    tech: ['Java', 'AWT', 'Swing'],
    description:
      'A Java desktop application designed for real-time word counting with interactive UI elements, input handling, error handling, and a clean interface.',
    features: [
      'Real-time word counting',
      'Interactive UI components',
      'Input validation',
      'Error handling',
      'Clean interface design',
    ],
    color: '#f59e0b',
  },
  {
    id: 'billing-system',
    title: 'Customer Billing System',
    tech: ['C', 'Data Structures'],
    description:
      'A menu-driven billing application using structures and file handling to automate billing and improve data management.',
    features: [
      'Menu-driven interface',
      'Automated billing',
      'File handling',
      'Data management',
      'Structure-based architecture',
    ],
    color: '#a855f7',
  },
];

// ── Skills ──────────────────────────────────────────────────

export const skills: Skill[] = [
  // Languages
  { name: 'C', category: 'languages' },
  { name: 'C++', category: 'languages' },
  { name: 'Java', category: 'languages' },
  { name: 'Python', category: 'languages' },
  { name: 'HTML', category: 'languages' },
  { name: 'CSS', category: 'languages' },
  { name: 'JavaScript', category: 'languages' },

  // Frameworks
  { name: 'React.js', category: 'frameworks' },
  { name: 'Node.js', category: 'frameworks' },
  { name: 'Express.js', category: 'frameworks' },

  // Tools & Platforms
  { name: 'Kali Linux', category: 'tools' },
  { name: 'VMware', category: 'tools' },
  { name: 'Ubuntu', category: 'tools' },
  { name: 'AWS', category: 'tools' },
  { name: 'Oracle', category: 'tools' },
  { name: 'Wireshark', category: 'tools' },
  { name: 'MySQL', category: 'tools' },

  // Soft Skills
  { name: 'Problem-Solving', category: 'soft' },
  { name: 'Team Player', category: 'soft' },
  { name: 'Project Management', category: 'soft' },
  { name: 'Adaptability', category: 'soft' },
];

export const skillCategories = [
  { key: 'languages' as const, label: 'Languages' },
  { key: 'frameworks' as const, label: 'Frameworks' },
  { key: 'tools' as const, label: 'Tools & Platforms' },
  { key: 'soft' as const, label: 'Soft Skills' },
];

// ── Education ───────────────────────────────────────────────

export const education: Education[] = [
  {
    institution: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    degree: 'Bachelor of Technology – Computer Science and Engineering',
    duration: 'Aug 2022 – Present',
  },
  {
    institution: 'Mount Carmel School',
    location: 'Hoshiarpur, Punjab',
    degree: 'Intermediate',
    duration: 'Mar 2020 – May 2022',
    grade: '78%',
  },
  {
    institution: 'Government Sr. Sec. School',
    location: 'Hoshiarpur, Punjab',
    degree: 'Matriculation',
    duration: 'Mar 2018 – May 2020',
    grade: '87%',
  },
];

// ── Experience ──────────────────────────────────────────────

export const experience: Experience[] = [
  {
    organization: 'Lovely Professional University',
    role: 'Application Development in Java',
    duration: 'Jun 2024 – Jul 2024',
    details: [
      'Developed GUI-based applications using Java Swing',
      'Applied object-oriented programming concepts',
      'Worked with inheritance, polymorphism, and encapsulation',
      'Optimized file handling and data processing',
      'Improved application usability and efficiency',
    ],
  },
];

// ── Certifications ──────────────────────────────────────────

export const certifications: Certification[] = [
  {
    title: 'Cloud Computing',
    issuer: 'NPTEL',
    date: 'Nov 2024',
  },
  {
    title: 'Application Development in Java',
    issuer: 'Lovely Professional University',
    date: 'Jun 2024',
  },
  {
    title: 'Linux+',
    issuer: 'Cybrary',
    date: 'Apr 2024',
  },
];

// ── Contact ─────────────────────────────────────────────────

export const contact = {
  email: 'karanbadwal04@gmail.com',
  linkedin: 'https://www.linkedin.com/in/karanbadwal04',
  github: 'https://github.com/karanbadwal04',
  phone: '+91 - 9465802410',
};

// ── Navigation ──────────────────────────────────────────────

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
