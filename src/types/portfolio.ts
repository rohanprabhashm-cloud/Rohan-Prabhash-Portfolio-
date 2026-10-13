export type SkillStatus = 'verified' | 'learning';

export interface Skill {
  id: string;
  name: string;
  category: 'programming' | 'aiml' | 'web' | 'tools';
  status: SkillStatus;
  proficiency: number; // 0 - 100
  note?: string;
}

export type ProjectStatus = 'Planning' | 'In Development' | 'Completed' | 'Published' | 'Hackathon Project';

export type ProjectCategory =
  | 'ai_ml'
  | 'ai_agents'
  | 'web_dev'
  | 'mobile_apps'
  | 'hackathon_projects'
  | 'experiments'
  // Legacy aliases for backward compatibility
  | 'ai'
  | 'fullstack'
  | 'agentic';

export interface Project {
  id: string;
  title: string;
  tagline: string; // Short description
  shortDescription?: string;
  description: string; // Summary description
  fullDescription?: string; // Full detailed treatise
  problemStatement?: string; // Problem statement
  proposedSolution?: string; // Proposed solution
  features?: string[]; // Array of key features
  architectureHighlights?: string[]; // Technical architecture highlights
  tags: string[]; // Technologies used
  technologies?: string[]; // Alias for tags
  roleAndContributions?: string; // My role and individual contributions
  category: ProjectCategory;
  status: ProjectStatus;
  statusLabel?: string; // e.g. "Completed", "In Development"
  startDate?: string; // e.g. "Jan 2024"
  completionDate?: string; // e.g. "Oct 2024" or "Present"
  githubUrl: string;
  demoUrl: string;
  demoVideoUrl?: string; // YouTube, Loom, or MP4 video URL
  relatedHackathon?: string; // Name of related hackathon, if applicable
  imageUrl?: string; // Cover image or screenshot URL
  coverImage?: string; // Alias for imageUrl
  galleryImages?: string[]; // Optional additional images and screenshots
  simulationType?: 'oyee' | 'oye_assistant' | 'roam_agent' | 'custom' | 'none';
  isGithubPlaceholder?: boolean;
  isDemoPlaceholder?: boolean;
  isPublished: boolean; // Draft vs Published state
  order?: number; // Ordering sequence
  createdAt?: string;
}

export type HackathonResultStatus =
  | 'Registered'
  | 'Participating'
  | 'Submitted'
  | 'Shortlisted'
  | 'Finalist'
  | 'Winner'
  | 'Completed without an award'
  | 'Research / Preparation'
  | 'Draft';

export interface TeamMember {
  name: string;
  role: string;
}

export interface HackathonAchievement {
  id: string;
  title: string; // Submission project or hackathon title
  hackathonName?: string; // Hackathon official title
  event: string; // Organizer / Host entity
  organizer?: string; // Alias for event
  date: string; // Event date (e.g. "Oct 2024")
  eventDate?: string;
  location?: string; // e.g. "Bengaluru, India" or "Online / Virtual"
  problemStatement?: string; // Challenge track / problem description
  projectSubmitted?: string; // Name of project submitted
  teamName?: string; // Team name (e.g. "Team Vidyut" or "Solo Expedition")
  teamMembers?: TeamMember[]; // Team roster and their roles
  myRoleAndContribution?: string; // My individual contribution
  technologies?: string[]; // Technologies used
  tags: string[]; // Tags / Tech list
  result: string; // e.g. "Finalist", "Winner", "Participant"
  resultStatus: HackathonResultStatus; // Required result classification
  awardTitle?: string; // Explicit verified award (e.g. "Top 10 National Finalist")
  description: string; // Summary of sprint and impact
  certificateUrl?: string; // Participation certificate image or URL
  pitchDeckUrl?: string; // Presentation / pitch deck URL
  demoVideoUrl?: string; // Demo video URL
  projectRepoUrl?: string; // Project repository URL
  eventPhotos?: string[]; // Photos from the hackathon
  notesAndLearnings?: string; // Notes and lessons learned
  isVerified: boolean;
  isPublished: boolean; // Draft vs Published state
  order?: number;
  createdAt?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string; // e.g. "Summer 2024" or "Jan 2024 - Present"
  type: 'internship' | 'research' | 'fellowship' | 'part-time' | 'full-time';
  description: string;
  technologies: string[];
  link?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  credentialId?: string;
  skills: string[];
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  iconName?: string;
}

export interface EducationInfo {
  degree: string;
  specialization: string;
  year: string;
  institution: string;
  graduationYear: string;
  cgpaOrGrade?: string;
  keyCourses: string[];
  highlights: string[];
}

export interface ProfileData {
  name: string;
  headline: string;
  supportingText: string;
  avatarUrl?: string;
  availability: string;
  isAvailableForHire: boolean;
  email: string;
  phone?: string;
  github: string;
  linkedin: string;
  twitter?: string;
  socialLinks?: SocialLink[];
  resumeUrl: string;
  location: string;
  bioShort: string;
  bioLong: string[];
  education: EducationInfo;
}

export type PhotoCategory = 'all' | 'portrait' | 'campus' | 'hackathon' | 'projects' | 'travel' | 'life';
export type PhotoAspect = 'portrait' | 'landscape' | 'square' | 'featured';

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  category: PhotoCategory;
  location?: string;
  year?: string;
  aspect: PhotoAspect;
  isSamplePlaceholder?: boolean;
  altText: string;
}

export interface PortfolioArchivePayload {
  version: string;
  exportedAt: string;
  author: string;
  profile: ProfileData;
  projects: Project[];
  hackathons: HackathonAchievement[];
  skills?: Skill[];
  experience?: ExperienceItem[];
  certifications?: CertificationItem[];
}
