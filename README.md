# Rohan Prabhash - Personal Portfolio Website

A personal portfolio built for **Rohan Prabhash**, third-year B.Tech Computer Science & Engineering (AI & ML) undergraduate.

This codebase is structured with modular data objects and reusable components so you can add, update, and reorder content effortlessly.

---

## Quick Reference: Where to Edit Content

| What to Edit | In Code (Default Data) | In the Browser (Live UI) |
| :--- | :--- | :--- |
| **Profile & Bio** | `src/data/initialData.ts` (`INITIAL_PROFILE`) | Click **"Edit Details"** in the top navigation or About section |
| **Profile Photo / Avatar** | `src/data/initialData.ts` (`avatarUrl`) | Click **"Edit Details"** modal & enter image path/URL |
| **Personal Photo Gallery** | `src/data/photosData.ts` (`INITIAL_PHOTOS`) | Click **"Manage Photos"** in the "Beyond the Code" section |
| **Featured Projects** | `src/data/initialData.ts` (`INITIAL_PROJECTS`) | Click **"View Project"** > **"Edit Project & Image"** |
| **Skills & Technologies** | `src/data/initialData.ts` (`INITIAL_SKILLS`) | Click **"Add Skill"** in the Skills section |
| **Work Experience / Internships** | `src/data/initialData.ts` (`INITIAL_EXPERIENCE`) | Click **"Add Experience"** in the Experience section |
| **Certifications & Credentials** | `src/data/initialData.ts` (`INITIAL_CERTIFICATIONS`) | Click **"Add Certification"** in the Certifications section |
| **Hackathons & Achievements** | `src/data/initialData.ts` (`INITIAL_HACKATHONS`) | Click **"Add Achievement"** in the Hackathons section |
| **Education & Coursework** | `src/data/initialData.ts` (`education`) | Click **"Edit Details"** in the Education section |
| **Contact & Social Links** | `src/data/initialData.ts` (`email`, `phone`, `socialLinks`) | Click **"Edit Details"** in the Navigation bar |

---

## 1. Adding Personal Photos & Gallery Images

### File Directory: `public/photos/`
1. Save your image files inside the `public/photos/` directory:
   - `public/photos/portrait.jpg`
   - `public/photos/campus-lab.jpg`
   - `public/photos/hackathon-sprint.jpg`
   - `public/photos/travel-mountain.jpg`
2. Open `src/data/photosData.ts` and set the `url` property:
   ```typescript
   {
     id: 'photo-portrait',
     url: '/photos/portrait.jpg',
     caption: 'Official profile portrait on campus',
     category: 'portrait', // 'portrait' | 'campus' | 'hackathon' | 'projects' | 'travel' | 'life'
     location: 'Campus Studio',
     year: '2025',
     aspect: 'portrait', // 'portrait' | 'landscape' | 'square' | 'featured'
     altText: 'Rohan Prabhash portrait photograph'
   }
   ```
3. Alternatively, click **"Manage Photos"** directly in the web app to paste any image URL or file path, reorder with up/down arrows, and write captions on the fly.

---

## 2. Adding Project Screenshots & New Projects

### File Directory: `public/projects/`
1. Save your project screenshots into `public/projects/`:
   - `public/projects/oyee-dashboard.jpg`
   - `public/projects/oye-assistant.jpg`
   - `public/projects/roam-agent.jpg`
2. Open `src/data/initialData.ts` and update or add to `INITIAL_PROJECTS`:
   ```typescript
   {
     id: 'my-new-project',
     title: 'System Title',
     tagline: 'Short one-line impact summary',
     description: 'Detailed description of what you engineered and solved.',
     architectureHighlights: [
       'Key architectural decision 1',
       'Key architectural decision 2'
     ],
     tags: ['Python', 'FastAPI', 'PyTorch', 'React'],
     category: 'ai', // 'ai' | 'fullstack' | 'agentic'
     githubUrl: 'https://github.com/rohanprabhash/my-repo',
     demoUrl: 'https://my-demo.com',
     imageUrl: '/projects/my-new-project.jpg', // or any web URL
     simulationType: 'oyee', // 'oyee' | 'oye_assistant' | 'roam_agent'
     statusLabel: 'Completed',
     isGithubPlaceholder: false,
     isDemoPlaceholder: false
   }
   ```

---

## 3. How to Add a New Section

The portfolio includes a reusable `<SectionContainer>` component located at `src/components/common/SectionContainer.tsx`.

To create a new section (e.g. `Publications`, `Testimonials`, or `OpenSource`):

1. Create a component file: `src/components/MyNewSection.tsx`:
   ```tsx
   import React from 'react';
   import { BookOpen } from 'lucide-react';
   import { SectionContainer, EmptyState } from './common';

   export const MyNewSection: React.FC = () => {
     return (
       <SectionContainer
         id="my-new-section"
         kicker="Research & Writing"
         icon={BookOpen}
         title="Selected Publications"
         subtitle="Conference presentations, preprints, and research articles."
       >
         {/* Your section content or EmptyState */}
       </SectionContainer>
     );
   };
   ```

2. Add it to `src/App.tsx` inside the `<main>` element:
   ```tsx
   <MyNewSection />
   ```

3. Add anchor link to `src/components/Navbar.tsx` and `src/components/Footer.tsx`.

---

## 4. Reusable Component Library (`src/components/common/`)

- `<SectionContainer>`: Enforces uniform viewport containers (`max-w-7xl`), clean typographic hierarchy, hairline dividers, and scroll margins.
- `<ProjectCard>`: Renders large image cover cards with hover zoom, tags, description, simulation launch button, and accessible keyboard controls.
- `<PhotoCard>` and `<PhotoGallery>`: Handles editorial masonry grid layout with category filters, hover zoom, and lightbox triggering.
- `<EmptyState>`: Provides honest, dignified placeholder messaging with an action button when a section has zero items.

---

## 5. Local Storage Persistence

All changes made in the browser interface (such as adding skills, customizing URLs, adding photos, updating the résumé link, or editing profile details) are automatically saved to your browser's `localStorage` (`rp_portfolio_*`).

To restore the original template data, click **"Reset to Defaults"** at the bottom of the **Edit Profile** modal or reset specific sections from their respective modal controls.
