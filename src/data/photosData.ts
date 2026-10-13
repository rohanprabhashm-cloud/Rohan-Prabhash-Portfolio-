import { GalleryPhoto } from '../types/portfolio';

/**
 * ============================================================================
 * ROHAN PRABHASH - "BEYOND THE CODE" PERSONAL PHOTO GALLERY CONFIGURATION
 * ============================================================================
 * 
 * HOW TO PERSONALIZE WITH YOUR OWN PHOTOS:
 * ----------------------------------------------------------------------------
 * 1. Place your photo files into the 'public/photos/' directory (e.g. 'public/photos/portrait.jpg').
 *    Then set 'url' to '/photos/portrait.jpg'.
 * 2. Or, use any image URL hosted online (e.g. Google Drive direct link, Cloudflare, etc.).
 * 3. You can also edit, reorder, add, or remove photos directly in the browser by
 *    clicking the "Manage Photos" button in the "Beyond the Code" section!
 * 4. All photos support optional captions, location tags, years, and categories:
 *    - 'portrait'   : Personal headshots & professional portraits
 *    - 'campus'     : College life, lectures, campus landmarks & labs
 *    - 'hackathon'  : Hackathon sprints, team tables & late-night builds
 *    - 'projects'   : Desk setups, whiteboard sessions & hardware builds
 *    - 'travel'     : Hiking, outdoor explorations & city travels
 *    - 'life'       : Meetups, community gatherings & everyday moments
 * 
 * NOTE: The sample SVG illustrations below serve solely as temporary placeholders
 * and do not represent Rohan's actual identity or private life.
 */

// Helper to generate crisp, self-contained SVG placeholder artwork
const createSvgPlaceholder = (
  theme: 'portrait' | 'hackathon' | 'campus' | 'projects' | 'travel' | 'life',
  title: string,
  subtitle: string
): string => {
  const themes = {
    portrait: {
      bg: '#0a0f18',
      accent: '#22d3ee',
      accent2: '#0284c7',
      icon: `
        <circle cx="200" cy="140" r="50" fill="none" stroke="#22d3ee" stroke-width="2.5" opacity="0.8" />
        <path d="M130 260 C130 200, 270 200, 270 260" fill="none" stroke="#22d3ee" stroke-width="2.5" opacity="0.8" />
        <circle cx="200" cy="140" r="70" fill="none" stroke="#38bdf8" stroke-dasharray="4 6" stroke-width="1.5" opacity="0.4" />
        <path d="M190 60 L210 60 M200 50 L200 70" stroke="#22d3ee" stroke-width="1.5" opacity="0.6"/>
        <path d="M190 310 L210 310 M200 300 L200 320" stroke="#22d3ee" stroke-width="1.5" opacity="0.6"/>
        <path d="M70 180 L70 200 M60 190 L80 190" stroke="#22d3ee" stroke-width="1.5" opacity="0.6"/>
        <path d="M330 180 L330 200 M320 190 L340 190" stroke="#22d3ee" stroke-width="1.5" opacity="0.6"/>
      `,
    },
    hackathon: {
      bg: '#070c14',
      accent: '#06b6d4',
      accent2: '#3b82f6',
      icon: `
        <!-- Multi monitor & hackathon workspace -->
        <rect x="60" y="80" width="160" height="110" rx="6" fill="#0d1522" stroke="#06b6d4" stroke-width="2" />
        <rect x="230" y="70" width="140" height="120" rx="6" fill="#0d1522" stroke="#3b82f6" stroke-width="2" />
        <!-- Code lines -->
        <line x1="80" y1="105" x2="150" y2="105" stroke="#22d3ee" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
        <line x1="80" y1="120" x2="190" y2="120" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
        <line x1="100" y1="135" x2="180" y2="135" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
        <line x1="100" y1="150" x2="160" y2="150" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
        <!-- Architecture on right screen -->
        <circle cx="270" cy="110" r="14" fill="#1e293b" stroke="#38bdf8" stroke-width="2" />
        <circle cx="330" cy="110" r="14" fill="#1e293b" stroke="#06b6d4" stroke-width="2" />
        <circle cx="300" cy="155" r="14" fill="#1e293b" stroke="#60a5fa" stroke-width="2" />
        <line x1="284" y1="110" x2="316" y2="110" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3 3"/>
        <line x1="277" y1="123" x2="293" y2="142" stroke="#94a3b8" stroke-width="1.5"/>
        <line x1="323" y1="123" x2="307" y2="142" stroke="#94a3b8" stroke-width="1.5"/>
        <!-- Desk & keyboard -->
        <rect x="40" y="215" width="320" height="14" rx="3" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <rect x="130" y="235" width="140" height="25" rx="4" fill="#0f172a" stroke="#22d3ee" stroke-width="1.5" opacity="0.8"/>
        <!-- Coffee cup -->
        <rect x="300" y="230" width="22" height="30" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
        <path d="M322 238 C328 238, 328 252, 322 252" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
      `,
    },
    campus: {
      bg: '#080d16',
      accent: '#38bdf8',
      accent2: '#0ea5e9',
      icon: `
        <!-- Campus buildings & modern computing center -->
        <polygon points="200,60 110,110 290,110" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
        <rect x="125" y="110" width="150" height="110" fill="#0d1522" stroke="#38bdf8" stroke-width="2"/>
        <!-- Classical pillars / modern glass windows -->
        <rect x="145" y="125" width="16" height="70" rx="2" fill="#1e293b" stroke="#0ea5e9" stroke-width="1.5"/>
        <rect x="175" y="125" width="16" height="70" rx="2" fill="#1e293b" stroke="#0ea5e9" stroke-width="1.5"/>
        <rect x="205" y="125" width="16" height="70" rx="2" fill="#1e293b" stroke="#0ea5e9" stroke-width="1.5"/>
        <rect x="235" y="125" width="16" height="70" rx="2" fill="#1e293b" stroke="#0ea5e9" stroke-width="1.5"/>
        <!-- Trees / Pathway -->
        <path d="M70 230 C80 180, 110 180, 120 230 Z" fill="#064e3b" stroke="#10b981" stroke-width="1.5" opacity="0.7"/>
        <path d="M280 230 C290 180, 320 180, 330 230 Z" fill="#064e3b" stroke="#10b981" stroke-width="1.5" opacity="0.7"/>
        <path d="M170 230 L200 280 L230 230" fill="#1e293b" stroke="#475569" stroke-width="1"/>
      `,
    },
    projects: {
      bg: '#090e17',
      accent: '#22d3ee',
      accent2: '#818cf8',
      icon: `
        <!-- AI/ML Agent Lab Setup -->
        <rect x="70" y="80" width="160" height="120" rx="8" fill="#0c1322" stroke="#818cf8" stroke-width="2"/>
        <!-- Neural network visualization -->
        <circle cx="100" cy="115" r="7" fill="#818cf8" />
        <circle cx="100" cy="145" r="7" fill="#818cf8" />
        <circle cx="100" cy="175" r="7" fill="#818cf8" />
        <circle cx="150" cy="130" r="7" fill="#22d3ee" />
        <circle cx="150" cy="160" r="7" fill="#22d3ee" />
        <circle cx="200" cy="145" r="7" fill="#38bdf8" />
        <line x1="107" y1="115" x2="143" y2="130" stroke="#6366f1" stroke-width="1" opacity="0.6"/>
        <line x1="107" y1="145" x2="143" y2="130" stroke="#6366f1" stroke-width="1" opacity="0.6"/>
        <line x1="107" y1="145" x2="143" y2="160" stroke="#6366f1" stroke-width="1" opacity="0.6"/>
        <line x1="107" y1="175" x2="143" y2="160" stroke="#6366f1" stroke-width="1" opacity="0.6"/>
        <line x1="157" y1="130" x2="193" y2="145" stroke="#38bdf8" stroke-width="1" opacity="0.7"/>
        <line x1="157" y1="160" x2="193" y2="145" stroke="#38bdf8" stroke-width="1" opacity="0.7"/>
        <!-- Secondary tablet / notes -->
        <rect x="250" y="100" width="90" height="120" rx="6" fill="#0f172a" stroke="#22d3ee" stroke-width="1.5"/>
        <line x1="265" y1="125" x2="325" y2="125" stroke="#64748b" stroke-width="2"/>
        <line x1="265" y1="145" x2="315" y2="145" stroke="#64748b" stroke-width="2"/>
        <line x1="265" y1="165" x2="320" y2="165" stroke="#64748b" stroke-width="2"/>
        <!-- Keyboard & trackpad -->
        <rect x="110" y="225" width="180" height="30" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      `,
    },
    travel: {
      bg: '#060a12',
      accent: '#38bdf8',
      accent2: '#10b981',
      icon: `
        <!-- High mountain peak & trail -->
        <polygon points="200,80 80,240 320,240" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
        <polygon points="200,80 170,130 230,130" fill="#38bdf8" opacity="0.3"/>
        <polygon points="290,140 210,240 370,240" fill="#09101d" stroke="#0ea5e9" stroke-width="1.5"/>
        <polygon points="110,150 40,240 180,240" fill="#09101d" stroke="#0284c7" stroke-width="1.5"/>
        <!-- Moon / Sun -->
        <circle cx="280" cy="80" r="22" fill="#f8fafc" opacity="0.8"/>
        <!-- Pine silhouettes -->
        <polygon points="120,220 110,245 130,245" fill="#047857"/>
        <polygon points="140,215 130,245 150,245" fill="#047857"/>
        <polygon points="260,220 250,245 270,245" fill="#047857"/>
      `,
    },
    life: {
      bg: '#080d16',
      accent: '#22d3ee',
      accent2: '#f59e0b',
      icon: `
        <!-- Whiteboard & collaborative meetup -->
        <rect x="70" y="70" width="260" height="150" rx="6" fill="#0f172a" stroke="#22d3ee" stroke-width="2"/>
        <line x1="100" y1="100" x2="210" y2="100" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
        <rect x="100" y="120" width="55" height="40" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
        <rect x="175" y="120" width="55" height="40" rx="3" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
        <path d="M155 140 L175 140" stroke="#94a3b8" stroke-width="2"/>
        <!-- Whiteboard tray -->
        <rect x="60" y="220" width="280" height="8" rx="2" fill="#334155"/>
        <rect x="120" y="217" width="25" height="5" rx="1" fill="#ef4444"/>
        <rect x="155" y="217" width="25" height="5" rx="1" fill="#3b82f6"/>
        <rect x="190" y="217" width="25" height="5" rx="1" fill="#10b981"/>
      `,
    },
  }[theme];

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 320" width="100%" height="100%">
      <defs>
        <radialGradient id="grad_${theme}" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stop-color="${themes.accent}" stop-opacity="0.15" />
          <stop offset="100%" stop-color="${themes.bg}" stop-opacity="1" />
        </radialGradient>
        <pattern id="grid_${theme}" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1" />
        </pattern>
      </defs>
      <rect width="400" height="320" fill="${themes.bg}" />
      <rect width="400" height="320" fill="url(#grad_${theme})" />
      <rect width="400" height="320" fill="url(#grid_${theme})" />
      
      <!-- Ambient central glow -->
      <circle cx="200" cy="160" r="120" fill="${themes.accent}" opacity="0.05" filter="blur(20px)" />
      
      <!-- Custom Theme Icon / Graphic -->
      ${themes.icon}
      
      <!-- Clean typographic labeling -->
      <rect x="20" y="20" width="120" height="22" rx="4" fill="rgba(6,182,212,0.12)" stroke="rgba(34,211,238,0.25)" stroke-width="1"/>
      <text x="28" y="35" font-family="monospace" font-size="9" fill="#22d3ee" letter-spacing="1">PLACEHOLDER</text>
      
      <text x="200" y="295" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="13" fill="#f1f5f9" text-anchor="middle" letter-spacing="0.3">${title}</text>
      <text x="200" y="312" font-family="system-ui, -apple-system, sans-serif" font-size="10" fill="#94a3b8" text-anchor="middle">${subtitle}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const INITIAL_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    url: createSvgPlaceholder(
      'portrait',
      'Personal Portrait Placeholder',
      'Replace with your personal photo (/photos/portrait.jpg)'
    ),
    caption: 'Official personal headshot & profile photograph. Ready to be replaced with your camera capture.',
    category: 'portrait',
    location: 'Campus Studio',
    year: '2025',
    aspect: 'portrait',
    isSamplePlaceholder: true,
    altText: 'Sample personal portrait framing placeholder',
  },
  {
    id: 'photo-2',
    url: createSvgPlaceholder(
      'hackathon',
      'Hackathon Sprint & Team Room',
      'Late-night prototype sprint & system deployment'
    ),
    caption: 'Collaborative hackathon engineering session — Rapid agent prototyping and architecture validation under crunch time.',
    category: 'hackathon',
    location: 'Innovation Arena',
    year: '2024',
    aspect: 'featured',
    isSamplePlaceholder: true,
    altText: 'Sample hackathon workspace and multi-screen setup',
  },
  {
    id: 'photo-3',
    url: createSvgPlaceholder(
      'campus',
      'University Engineering Center',
      'Where theoretical algorithms transition to code'
    ),
    caption: 'College campus and CSE department computing laboratory where foundational coursework takes place.',
    category: 'campus',
    location: 'Engineering Quad',
    year: '2024',
    aspect: 'landscape',
    isSamplePlaceholder: true,
    altText: 'Sample engineering college campus and computing facility',
  },
  {
    id: 'photo-4',
    url: createSvgPlaceholder(
      'projects',
      'System Architecture & Lab Desk',
      'Dual displays & model experimentation setup'
    ),
    caption: 'Workspace station during the design and testing phases of OYEE and autonomous multi-agent pipelines.',
    category: 'projects',
    location: 'Engineering Desk',
    year: '2024',
    aspect: 'landscape',
    isSamplePlaceholder: true,
    altText: 'Sample developer workspace setup and machine learning dashboard',
  },
  {
    id: 'photo-5',
    url: createSvgPlaceholder(
      'travel',
      'Mountain Trail Exploration',
      'Recharging in nature between development sprints'
    ),
    caption: 'High-altitude hiking and scenic vista exploration — clearing the mind and finding perspective between builds.',
    category: 'travel',
    location: 'Highland Trail',
    year: '2024',
    aspect: 'portrait',
    isSamplePlaceholder: true,
    altText: 'Sample outdoor landscape and travel perspective',
  },
  {
    id: 'photo-6',
    url: createSvgPlaceholder(
      'life',
      'Peer Whiteboarding & Tech Meetup',
      'System design discussions with developer community'
    ),
    caption: 'Whiteboarding agent architectures and discussing emerging AI tooling with fellow student builders.',
    category: 'life',
    location: 'Tech Hub Meetup',
    year: '2025',
    aspect: 'square',
    isSamplePlaceholder: true,
    altText: 'Sample community meetup and whiteboarding session',
  },
];
