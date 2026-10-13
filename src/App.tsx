import React from 'react';
import { SpiderNavbar } from './components/spider/SpiderNavbar';
import { SpiderHero } from './components/spider/SpiderHero';
import { SpiderAbout } from './components/spider/SpiderAbout';
import { SpiderSkills } from './components/spider/SpiderSkills';
import { SpiderProjects } from './components/spider/SpiderProjects';
import { SpiderAchievements } from './components/spider/SpiderAchievements';
import { SpiderEducation } from './components/spider/SpiderEducation';
import { SpiderCareerGoals } from './components/spider/SpiderCareerGoals';
import { SpiderContact } from './components/spider/SpiderContact';
import { SpiderFooter } from './components/spider/SpiderFooter';

export default function App() {
  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-[#F02030] selection:text-white">
      {/* 1. Cinematic Spider-Verse Navigation */}
      <SpiderNavbar />

      <main>
        {/* 2. Hero Section: Cinematic Asymmetrical Hero Composition */}
        <SpiderHero
          onExploreProjects={handleScrollToProjects}
          onContactClick={handleScrollToContact}
        />

        {/* 3. About Section: "THE PERSON BEHIND THE CODE." */}
        <SpiderAbout />

        {/* 4. Technical Skills: "MY SUPERPOWERS." */}
        <SpiderSkills />

        {/* 5. Projects Showcase: "FEATURED PROJECTS." */}
        <SpiderProjects />

        {/* 6. Achievements & Hackathons */}
        <SpiderAchievements />

        {/* 7. Academic Background / Education */}
        <SpiderEducation />

        {/* 8. Career Goals: "WHAT'S NEXT?" */}
        <SpiderCareerGoals />

        {/* 9. Contact: "LET'S CONNECT." */}
        <SpiderContact />
      </main>

      {/* 10. Footer */}
      <SpiderFooter />
    </div>
  );
}
