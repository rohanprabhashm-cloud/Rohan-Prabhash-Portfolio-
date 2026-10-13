import {
  ProfileData,
  Skill,
  Project,
  HackathonAchievement,
  ExperienceItem,
  CertificationItem,
} from '../types/portfolio';

export const INITIAL_PROFILE: ProfileData = {
  name: "ROHAN PRABHASH",
  headline: "Building Intelligent Experiences.",
  supportingText: "AI/ML enthusiast, developer, and builder turning ideas into practical digital products.",
  avatarUrl: "",
  availability: "Open to Opportunities",
  isAvailableForHire: true,
  email: "rohanprabhashm@gmail.com",
  phone: "+91 [Click to add phone]",
  github: "https://github.com/rohanprabhash",
  linkedin: "https://linkedin.com/in/rohanprabhash",
  twitter: "https://x.com/rohanprabhash",
  socialLinks: [
    { platform: "GitHub", label: "GitHub", url: "https://github.com/rohanprabhash" },
    { platform: "LinkedIn", label: "LinkedIn", url: "https://linkedin.com/in/rohanprabhash" },
    { platform: "Twitter", label: "X / Twitter", url: "https://x.com/rohanprabhash" },
    { platform: "Email", label: "Email", url: "mailto:rohanprabhashm@gmail.com" }
  ],
  resumeUrl: "https://rohanprabhash.dev/resume.pdf",
  location: "India",
  bioShort: "Third-year B.Tech CSE (AI & ML) student focused on architecting intelligent, end-to-end applications that bridge foundational algorithms and clean, responsive software engineering.",
  bioLong: [
    "I am a third-year Computer Science and Engineering undergraduate specializing in Artificial Intelligence and Machine Learning. My engineering journey revolves around turning theoretical models into practical, responsive, and reliable software that solves tangible everyday problems.",
    "From optimizing multi-order logistics pipelines in OYEE to conceptualizing autonomous desktop intelligence in Oye AI Assistant and agentic itinerary synthesis in RoamAgent, I take pride in crafting clean architecture, elegant user interfaces, and robust backend logic.",
    "I actively explore algorithmic problem solving, deep learning paradigms, modern full-stack development, and agentic workflows—always driven by curiosity, rigorous fundamentals, and an appetite for building production-grade solutions."
  ],
  education: {
    degree: "Bachelor of Technology (B.Tech)",
    specialization: "Computer Science & Engineering (Artificial Intelligence & Machine Learning)",
    year: "3rd Year Undergraduate",
    institution: "B.Tech Engineering College [Click to Customize Institution]",
    graduationYear: "2026",
    cgpaOrGrade: "8.6 / 10 [Placeholder]",
    keyCourses: [
      "Artificial Intelligence & Machine Learning",
      "Data Structures & Algorithms",
      "Operating Systems & Architecture",
      "Database Management Systems (DBMS)",
      "Design & Analysis of Algorithms",
      "Object-Oriented Programming & Systems"
    ],
    highlights: [
      "Specialized coursework in deep learning, neural networks, and probabilistic modeling",
      "Hands-on project work in algorithmic path optimization, agentic reasoning, and full-stack web applications",
      "Active participant in collegiate hackathons and technical project exhibitions"
    ]
  }
};

export const INITIAL_SKILLS: Skill[] = [
  // Programming
  {
    id: "p1",
    name: "Python",
    category: "programming",
    status: "verified",
    proficiency: 90,
    note: "Primary language for AI/ML pipelines, scripting, algorithmic development, and backend APIs"
  },
  {
    id: "p2",
    name: "C",
    category: "programming",
    status: "verified",
    proficiency: 85,
    note: "System-level fundamentals, low-level memory management, pointers, and data structures"
  },
  {
    id: "p3",
    name: "JavaScript / TypeScript",
    category: "programming",
    status: "verified",
    proficiency: 82,
    note: "Modern ES6+, typed component engineering, asynchronous event architectures"
  },
  {
    id: "p4",
    name: "SQL",
    category: "programming",
    status: "verified",
    proficiency: 80,
    note: "Relational database querying, schema design, constraints, and index optimization"
  },
  {
    id: "p5",
    name: "C++",
    category: "programming",
    status: "learning",
    proficiency: 65,
    note: "Object-oriented programming, STL containers, and competitive algorithmic optimization"
  },

  // AI & ML
  {
    id: "ai1",
    name: "AI & Machine Learning Foundations",
    category: "aiml",
    status: "verified",
    proficiency: 88,
    note: "Supervised and unsupervised learning, regression, classification, clustering, evaluation metrics"
  },
  {
    id: "ai2",
    name: "Neural Networks & Deep Learning",
    category: "aiml",
    status: "verified",
    proficiency: 82,
    note: "Feedforward networks, CNN architectures, backpropagation mathematics, loss function tuning"
  },
  {
    id: "ai3",
    name: "Scikit-Learn & PyTorch",
    category: "aiml",
    status: "verified",
    proficiency: 80,
    note: "Data preprocessing, feature scaling, model training, validation pipelines, and tensor operations"
  },
  {
    id: "ai4",
    name: "Agentic AI & Prompt Engineering",
    category: "aiml",
    status: "verified",
    proficiency: 84,
    note: "Multi-step tool calling, structured JSON output generation, chain-of-thought orchestration"
  },
  {
    id: "ai5",
    name: "Computer Vision & NLP",
    category: "aiml",
    status: "learning",
    proficiency: 65,
    note: "Transformer tokenization, attention mechanisms, embeddings, and OpenCV image preprocessing"
  },
  {
    id: "ai6",
    name: "Vector Databases & RAG Pipelines",
    category: "aiml",
    status: "learning",
    proficiency: 60,
    note: "Semantic search retrieval, chunking strategies, knowledge grounding for LLM agents"
  },

  // Web Development
  {
    id: "w1",
    name: "Web Development (Full-Stack)",
    category: "web",
    status: "verified",
    proficiency: 88,
    note: "Designing and shipping dynamic, responsive web applications with interactive client state"
  },
  {
    id: "w2",
    name: "React & Component Architecture",
    category: "web",
    status: "verified",
    proficiency: 85,
    note: "Functional components, custom hooks, context state management, lifecycle performance"
  },
  {
    id: "w3",
    name: "Node.js & Express REST APIs",
    category: "web",
    status: "verified",
    proficiency: 80,
    note: "Server-side routing, middleware pipeline, JWT authentication, and JSON API contracts"
  },
  {
    id: "w4",
    name: "Tailwind CSS & Responsive UI",
    category: "web",
    status: "verified",
    proficiency: 90,
    note: "Mobile-first layouts, accessible glassmorphism themes, flexbox and CSS grid mastery"
  },
  {
    id: "w5",
    name: "Next.js & Server Components",
    category: "web",
    status: "learning",
    proficiency: 62,
    note: "App Router, server-side data fetching, streaming responses, and edge API routes"
  },

  // Developer Tools
  {
    id: "t1",
    name: "Git & Version Control",
    category: "tools",
    status: "verified",
    proficiency: 88,
    note: "Branching workflows, pull requests, merge conflict resolution, collaborative Git hygiene"
  },
  {
    id: "t2",
    name: "Linux & Bash Shell",
    category: "tools",
    status: "verified",
    proficiency: 82,
    note: "CLI navigation, package management, shell automation scripts, process monitoring"
  },
  {
    id: "t3",
    name: "VS Code & Development Tooling",
    category: "tools",
    status: "verified",
    proficiency: 90,
    note: "Integrated debugging, ESLint, TypeScript compiler configuration, and performance profiling"
  },
  {
    id: "t4",
    name: "Docker & Containerization",
    category: "tools",
    status: "learning",
    proficiency: 65,
    note: "Writing Dockerfiles, multi-stage builds, container isolation for reproducible environments"
  },
  {
    id: "t5",
    name: "Cloud Deployment & Hosting",
    category: "tools",
    status: "learning",
    proficiency: 60,
    note: "Deploying production builds, environment secrets handling, serverless server hosting"
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "oyee",
    title: "OYEE",
    tagline: "Multi-order food delivery platform with route optimization and delivery safety",
    shortDescription: "A multi-order food delivery platform designed to optimize delivery routes, coordinate orders, support customer tracking, and improve delivery safety.",
    description: "A multi-order food delivery platform designed to optimize delivery routes, coordinate orders, support customer tracking, and improve delivery safety.",
    fullDescription: "A multi-order food delivery platform designed to optimize delivery routes, coordinate orders, support customer tracking, and improve delivery safety.",
    problemStatement: "",
    proposedSolution: "",
    features: [
      "Route optimization across multi-order batches",
      "Order coordination and dispatch management",
      "Real-time customer delivery tracking",
      "Delivery safety and checkpoint protocols"
    ],
    tags: ["Web Development", "Route Optimization", "Delivery Logistics"],
    technologies: ["Web Development", "Route Optimization", "Delivery Logistics"],
    roleAndContributions: "",
    category: "web_dev",
    status: "In Development",
    statusLabel: "In Development",
    startDate: "",
    completionDate: "",
    githubUrl: "",
    demoUrl: "",
    demoVideoUrl: "",
    relatedHackathon: "",
    simulationType: "oyee",
    isGithubPlaceholder: true,
    isDemoPlaceholder: true,
    isPublished: false,
    order: 1
  },
  {
    id: "oye-ai-assistant",
    title: "Oye AI Assistant",
    tagline: "Personal AI assistant concept with voice input/output and desktop assistance",
    shortDescription: "A personal AI assistant concept focused on conversational interaction, voice input and output, and useful desktop assistance.",
    description: "A personal AI assistant concept focused on conversational interaction, voice input and output, and useful desktop assistance.",
    fullDescription: "A personal AI assistant concept focused on conversational interaction, voice input and output, and useful desktop assistance.",
    problemStatement: "",
    proposedSolution: "",
    features: [
      "Conversational interaction and natural dialogue",
      "Voice input and speech output capabilities",
      "Useful desktop workflow and system assistance"
    ],
    tags: ["AI Assistant", "Conversational AI", "Voice Interaction", "Desktop Assistant"],
    technologies: ["AI Assistant", "Conversational AI", "Voice Interaction", "Desktop Assistant"],
    roleAndContributions: "",
    category: "ai_agents",
    status: "In Development",
    statusLabel: "In Development",
    startDate: "",
    completionDate: "",
    githubUrl: "",
    demoUrl: "",
    demoVideoUrl: "",
    relatedHackathon: "",
    simulationType: "oye_assistant",
    isGithubPlaceholder: true,
    isDemoPlaceholder: true,
    isPublished: false,
    order: 2
  },
  {
    id: "roam-agent",
    title: "RoamAgent — Agentic AI Travel Concierge",
    tagline: "AI-powered travel planning concept for itineraries, budgets, and adaptive travel",
    shortDescription: "An AI-powered travel planning concept designed to personalize itineraries, manage budgets, suggest transport and accommodation options, and adapt plans to changing conditions.",
    description: "An AI-powered travel planning concept designed to personalize itineraries, manage budgets, suggest transport and accommodation options, and adapt plans to changing conditions.",
    fullDescription: "An AI-powered travel planning concept designed to personalize itineraries, manage budgets, suggest transport and accommodation options, and adapt plans to changing conditions.",
    problemStatement: "",
    proposedSolution: "",
    features: [
      "Personalized multi-day itinerary generation",
      "Dynamic travel budget management",
      "Transport and accommodation option suggestions",
      "Adaptive replanning responsive to changing conditions"
    ],
    tags: ["AI Agents", "Travel Technology", "Itinerary Planner", "Autonomous Agents"],
    technologies: ["AI Agents", "Travel Technology", "Itinerary Planner", "Autonomous Agents"],
    roleAndContributions: "",
    category: "ai_agents",
    status: "Hackathon Project",
    statusLabel: "Hackathon Project",
    startDate: "",
    completionDate: "",
    githubUrl: "",
    demoUrl: "",
    demoVideoUrl: "",
    relatedHackathon: "Samartha Hackathon",
    simulationType: "roam_agent",
    isGithubPlaceholder: true,
    isDemoPlaceholder: true,
    isPublished: false,
    order: 3
  }
];

export const INITIAL_HACKATHONS: HackathonAchievement[] = [
  {
    id: "hack-samartha",
    title: "Samartha Hackathon",
    hackathonName: "Samartha Hackathon",
    event: "TBS / Samartha",
    organizer: "TBS / Samartha",
    date: "",
    eventDate: "",
    location: "",
    problemStatement: "TBS RoamAgent Challenge",
    projectSubmitted: "RoamAgent — Agentic AI Travel Concierge",
    teamName: "",
    teamMembers: [],
    myRoleAndContribution: "",
    technologies: ["AI Agents", "Travel Technology"],
    tags: ["AI Agents", "Travel Technology", "TBS Challenge"],
    result: "Editable Draft",
    resultStatus: "Draft",
    awardTitle: "",
    description: "Development and presentation of an agentic AI travel concierge concept.",
    certificateUrl: "",
    pitchDeckUrl: "",
    demoVideoUrl: "",
    projectRepoUrl: "",
    eventPhotos: [],
    notesAndLearnings: "",
    isVerified: false,
    isPublished: false,
    order: 1
  },
  {
    id: "hack-sih-prep",
    title: "Smart India Hackathon research and preparation",
    hackathonName: "Smart India Hackathon research and preparation",
    event: "Smart India Hackathon Research",
    organizer: "Smart India Hackathon Research",
    date: "",
    eventDate: "",
    location: "",
    problemStatement: "Research into potential problem statements, including legal metrology label compliance and autonomous vehicle path planning.",
    projectSubmitted: "",
    teamName: "",
    teamMembers: [],
    myRoleAndContribution: "Problem statement investigation, legal metrology compliance review, and vehicle path planning algorithms research.",
    technologies: ["Path Planning", "Computer Vision", "Compliance Algorithms"],
    tags: ["Problem Research", "Legal Metrology", "Vehicle Path Planning", "Preparation"],
    result: "Research / Preparation",
    resultStatus: "Research / Preparation",
    awardTitle: "",
    description: "Research into potential problem statements, including legal metrology label compliance and autonomous vehicle path planning. Not an official participation or submission.",
    certificateUrl: "",
    pitchDeckUrl: "",
    demoVideoUrl: "",
    projectRepoUrl: "",
    eventPhotos: [],
    notesAndLearnings: "Explored legal metrology packaged commodities rule compliance verification and graph-based heuristic path planning for autonomous navigation.",
    isVerified: false,
    isPublished: false,
    order: 2
  }
];

export const INITIAL_EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Undergraduate AI/ML Student Researcher",
    company: "Department Computing & Systems Lab",
    location: "Campus Lab",
    period: "2024 - Present",
    type: "research",
    description: "Investigating algorithmic optimization in path planning and multi-agent coordination frameworks. Prototyping benchmark models in Python and evaluating computational latency.",
    technologies: ["Python", "Path Optimization", "Agentic Systems", "NumPy"],
    link: "https://github.com/rohanprabhash"
  }
];

export const INITIAL_CERTIFICATIONS: CertificationItem[] = [
  {
    id: "cert-1",
    name: "Machine Learning & Deep Learning Foundations",
    issuer: "DeepLearning.AI / Technical Track",
    issueDate: "2024",
    credentialUrl: "https://coursera.org/verify/placeholder",
    credentialId: "DL-ML-2024-RP",
    skills: ["Neural Networks", "Gradient Descent", "Supervised Learning", "Model Evaluation"]
  },
  {
    id: "cert-2",
    name: "Data Structures & Advanced Algorithms",
    issuer: "Academic Computing Department",
    issueDate: "2024",
    credentialUrl: "https://rohanprabhash.dev/credentials/dsa",
    credentialId: "DSA-ACAD-2024-89",
    skills: ["Graph Theory", "Dynamic Programming", "Tree Structures", "Complexity Analysis"]
  }
];
