export interface ProjectItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  category: 'AI & Machine Learning' | 'AI Agents' | 'Web Development' | 'Mobile & Systems';
  githubUrl: string;
  demoUrl?: string;
  simulationType?: 'oyee' | 'oye_assistant' | 'roam_agent';
}

export interface EducationItem {
  degree: string;
  institution: string;
  expectedGraduation: string;
  currentYear: string;
  location: string;
  coursework: string[];
  academicFocus: string;
}

export interface SkillItem {
  name: string;
  category: 'Languages' | 'AI & ML' | 'Development' | 'Tools & Cloud';
  iconKey: string;
  description: string;
}

export interface LearningItem {
  name: string;
  focus: string;
  iconKey: string;
}

export interface AchievementItem {
  id: string;
  eventName: string;
  projectName: string;
  role: string;
  status: 'Participant' | 'Submitted / Participant' | 'Research / Preparation' | 'Finalist' | 'Winner';
  year: string;
  description: string;
  resultDetails: string;
  technologies: string[];
  certificateUrl?: string;
}

export interface CareerGoalItem {
  id: string;
  title: string;
  description: string;
  timeframe: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Rohan Prabhash",
    kicker: "Hello, I'm",
    headline: "B.Tech CSE (AI & ML) | Developer | AI Enthusiast",
    shortBio: "I build practical technology projects, explore artificial intelligence, and turn ideas into useful digital products.",
    fullBio: "I'm a third-year B.Tech Computer Science student specializing in Artificial Intelligence and Machine Learning. I enjoy building software, experimenting with AI, participating in hackathons, and developing ideas into working products. My goal is to create technology that solves real-world problems.",
    availability: "Open to internships and opportunities",
    email: "rohanprabhashm@gmail.com",
    githubUrl: "https://github.com/rohanprabhash",
    linkedinUrl: "https://linkedin.com/in/rohanprabhash",
    resumeUrl: "#",
    location: "India",
  },

  aboutCards: [
    {
      id: "edu",
      title: "Education",
      subtitle: "B.Tech in CSE (AI & ML)",
      description: "Third-year undergraduate at Lendi Institute of Engineering and Technology, focusing on core algorithms and intelligent systems.",
      metric: "Class of 2028",
    },
    {
      id: "interests",
      title: "Technical Interests",
      subtitle: "AI Agents & Optimization",
      description: "Deep curiosity for multi-step agentic workflows, combinatorial route optimization, and intuitive user experiences.",
      metric: "AI & Full-Stack",
    },
    {
      id: "innovation",
      title: "Hackathons & Innovation",
      subtitle: "Sprint Problem-Solving",
      description: "Hands-on competitor analyzing real-world problems from legal compliance to agentic travel concierges.",
      metric: "Active Participant",
    },
    {
      id: "career",
      title: "Career Goals",
      subtitle: "Internships & Products",
      description: "Eager to contribute to high-impact engineering teams, ship practical software, and pursue advanced AI/ML studies.",
      metric: "What's Next",
    },
  ],

  personalGoals: [
    "Improve software development skills and system design fundamentals.",
    "Build useful AI-powered products that solve tangible problems.",
    "Gain industry internship and software engineering placement experience.",
    "Pursue advanced studies and applied research in Artificial Intelligence & Machine Learning.",
  ],

  projects: [
    {
      id: "oyee",
      name: "OYEE — Food Delivery Platform",
      subtitle: "Route Optimization & Safety Logistics",
      description: "A multi-order food delivery platform focused on route optimization, delivery tracking, navigation, QR-based address privacy, and rider safety.",
      problem: "Traditional on-demand food delivery platforms experience escalating costs and delays when drivers handle multiple disjointed orders. Drivers manually plan drop-offs, while customers face privacy concerns with exposed phone numbers and home addresses.",
      solution: "OYEE clusters proximate delivery orders into optimized multi-drop routes, renders real-time tracking navigation, validates rider check-ins, and protects consumer location privacy via encrypted, time-limited QR codes.",
      features: [
        "Multi-order batch clustering and dynamic distance minimization",
        "Real-time customer delivery tracking with live ETAs",
        "Rider navigation path rendering and milestone checkpoints",
        "QR-based address privacy protecting sensitive customer coordinates",
        "Rider safety check-ins and emergency contact integration"
      ],
      technologies: ["Python", "Route Optimization", "React", "TypeScript", "FastAPI", "Map Algorithms"],
      category: "Web Development",
      githubUrl: "https://github.com/rohanprabhash/oyee",
      demoUrl: "https://oyee-delivery.demo",
      simulationType: "oyee",
    },
    {
      id: "oye-assistant",
      name: "Oye — Personal AI Assistant",
      subtitle: "Conversational Desktop Voice Assistant",
      description: "A voice-enabled AI assistant designed to provide conversational responses and assist with everyday tasks and device control.",
      problem: "Interacting with operating systems and multitasking across multiple windows requires constant manual clicks. Users need a reliable, hands-free conversational layer for rapid query resolution and desktop actions.",
      solution: "Oye provides an ambient, speech-enabled conversational agent that captures spoken commands, parses natural user intent, queries knowledge modules, and carries out system tasks with clean auditory and visual feedback.",
      features: [
        "Real-time voice-to-text input recognition",
        "Natural conversational dialogue and context parsing",
        "Everyday task execution and quick information retrieval",
        "Hands-free auditory speech synthesis output",
        "Minimalist Apple-inspired ambient interface"
      ],
      technologies: ["Python", "Speech Recognition", "Conversational AI", "NLP", "FastAPI"],
      category: "AI & Machine Learning",
      githubUrl: "https://github.com/rohanprabhash/oye-assistant",
      demoUrl: "https://oye-assistant.demo",
      simulationType: "oye_assistant",
    },
    {
      id: "roam-agent",
      name: "RoamAgent — Agentic AI Travel Concierge",
      subtitle: "Autonomous Itinerary & Budget Orchestrator",
      description: "An AI-powered travel planning concept that helps users organize journeys, manage budgets, discover places, and adapt itineraries.",
      problem: "Planning vacations across foreign destinations requires cross-referencing dozens of booking portals, calculating volatile currency budgets, estimating travel times, and manually rescheduling when delays occur.",
      solution: "RoamAgent employs an agentic planning loop that personalizes multi-day travel schedules, optimizes activity pacing against specified budget caps, discovers local highlights, and dynamically replans when conditions shift.",
      features: [
        "Autonomous multi-day personalized itinerary synthesis",
        "Dynamic budget tier allocation and accommodation estimations",
        "Contextual place discovery with transit recommendations",
        "Adaptive schedule replanning for missed flights or weather changes",
        "Exportable Apple-style travel briefs and timeline view"
      ],
      technologies: ["AI Agents", "LangChain / Prompting", "React", "TypeScript", "Vector Search"],
      category: "AI Agents",
      githubUrl: "https://github.com/rohanprabhash/roam-agent",
      demoUrl: "https://roam-agent.demo",
      simulationType: "roam_agent",
    },
  ] as ProjectItem[],

  education: {
    degree: "B.Tech in Computer Science and Engineering (AI & ML)",
    institution: "Lendi Institute of Engineering and Technology",
    expectedGraduation: "2028",
    currentYear: "Third Year (Undergraduate)",
    location: "Andhra Pradesh, India",
    academicFocus: "Artificial Intelligence, Machine Learning, Design of Algorithms, and Software Engineering.",
    coursework: [
      "Data Structures & Algorithms",
      "Artificial Intelligence & Machine Learning",
      "Database Management Systems (SQL)",
      "Object-Oriented Programming",
      "Operating Systems & Architecture",
      "Computer Networks"
    ],
  } as EducationItem,

  skills: [
    { name: "Python", category: "Languages", iconKey: "code", description: "Primary language for AI/ML pipelines, algorithmic problem solving, and backend automation." },
    { name: "C", category: "Languages", iconKey: "cpu", description: "Foundational systems programming, memory management, and pointers." },
    { name: "Web Development", category: "Development", iconKey: "globe", description: "Modern responsive web applications with React, TypeScript, and clean UI engineering." },
    { name: "Artificial Intelligence", category: "AI & ML", iconKey: "sparkles", description: "Heuristic search, agentic decision making, and prompt architecture." },
    { name: "Machine Learning", category: "AI & ML", iconKey: "bot", description: "Supervised and unsupervised models, feature engineering, and model evaluation." },
    { name: "SQL", category: "Languages", iconKey: "database", description: "Relational database schema modeling, indexing, and complex queries." },
    { name: "Git and GitHub", category: "Tools & Cloud", iconKey: "git-branch", description: "Version control hygiene, collaborative workflows, and code repository management." },
    { name: "FastAPI", category: "Development", iconKey: "zap", description: "High-performance Python REST APIs with asynchronous endpoints and type safety." },
    { name: "Cloud and DevOps", category: "Tools & Cloud", iconKey: "cloud", description: "Cloud deployment fundamentals, containerized workloads, and web hosting." },
  ] as SkillItem[],

  currentlyLearning: [
    { name: "PyTorch & Deep Learning", focus: "Feedforward architectures, CNNs, and tensor optimization pipelines", iconKey: "layers" },
    { name: "Docker & Containerization", focus: "Reproducible container environments and multi-stage builds", iconKey: "box" },
    { name: "Vector Databases & RAG", focus: "Semantic retrieval, document chunking, and embedding lookups", iconKey: "search" },
    { name: "Next.js Full-Stack", focus: "Server components, App Router, and edge runtime APIs", iconKey: "terminal" },
  ] as LearningItem[],

  achievements: [
    {
      id: "sih",
      eventName: "Smart India Hackathon",
      projectName: "SIH Challenge Investigation & Feasibility",
      role: "Student Researcher / Developer",
      status: "Research / Preparation",
      year: "2024",
      description: "Deep dive research into national hackathon problem statements, focusing on automated legal metrology packaged commodities compliance and graph-based autonomous path planning.",
      resultDetails: "Active Research & Preparation Phase (Official submission status to be updated)",
      technologies: ["Path Planning", "Computer Vision", "Compliance Algorithms"],
      certificateUrl: "#",
    },
    {
      id: "samartha",
      eventName: "Samartha Hackathon — RoamAgent Project",
      projectName: "RoamAgent — Agentic AI Travel Concierge",
      role: "Concept Lead & Agent Architect",
      status: "Submitted / Participant",
      year: "2024",
      description: "Designed and prototyped an autonomous agentic itinerary planner for the TBS RoamAgent Challenge track, emphasizing budget balancing and dynamic replanning.",
      resultDetails: "Participant (Official placement to be updated upon judging confirmation)",
      technologies: ["AI Agents", "Travel Technology", "Prompt Engineering"],
      certificateUrl: "#",
    },
    {
      id: "tech-symposium",
      eventName: "Technical Competitions & Coding Expeditions",
      projectName: "Algorithmic Challenges & Project Exhibitions",
      role: "Participant",
      status: "Participant",
      year: "2023 – 2024",
      description: "Competed in departmental coding contests, algorithmic hack sprints, and hands-on software development demonstrations.",
      resultDetails: "Participant in collegiate coding challenges and technical presentations",
      technologies: ["Data Structures", "Python", "Web Development"],
      certificateUrl: "#",
    },
  ] as AchievementItem[],

  careerGoals: [
    {
      id: "cg-1",
      title: "Building Impactful AI & Software Products",
      description: "Engineering robust, real-world applications that solve tangible problems for end users with reliable system architectures.",
      timeframe: "Continuous Focus",
    },
    {
      id: "cg-2",
      title: "Internships & Placement Opportunities",
      description: "Joining progressive engineering teams where I can contribute to production codebases and learn industry development standards.",
      timeframe: "Targeting 2024 – 2025",
    },
    {
      id: "cg-3",
      title: "Advancing Core Engineering Fundamentals",
      description: "Deepening algorithmic proficiency in data structures, distributed systems, and low-latency API design.",
      timeframe: "Ongoing Practice",
    },
    {
      id: "cg-4",
      title: "Exploring Advanced Studies in AI/ML",
      description: "Preparing for specialized graduate coursework and applied research in autonomous agents and intelligent systems.",
      timeframe: "Long-Term Academic Plan",
    },
  ] as CareerGoalItem[],
};
