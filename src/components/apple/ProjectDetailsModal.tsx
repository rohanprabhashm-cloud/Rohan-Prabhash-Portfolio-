import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, ArrowRight, Play, RefreshCw, Send, Volume2, MapPin } from 'lucide-react';
import { ProjectItem } from '../../data/portfolioData';

interface ProjectDetailsModalProps {
  project: ProjectItem;
  onClose: () => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'simulation'>('overview');

  // Simulation states
  // OYEE simulator
  const [oyeeStops, setOyeeStops] = useState([
    { id: 1, name: 'Central Kitchen Depot', eta: '0 min', done: true },
    { id: 2, name: 'Customer Drop #1 (Sector 4)', eta: '8 min', done: false },
    { id: 3, name: 'Customer Drop #2 (Tech Hub)', eta: '16 min', done: false },
  ]);
  const [oyeeOptimizing, setOyeeOptimizing] = useState(false);

  // Oye Assistant simulator
  const [oyeInput, setOyeInput] = useState('');
  const [oyeMessages, setOyeMessages] = useState<Array<{ sender: 'user' | 'oye'; text: string }>>([
    { sender: 'oye', text: 'Hello Rohan. Oye Voice Assistant ready. Say a query or type below.' },
  ]);

  // RoamAgent simulator
  const [roamCity, setRoamCity] = useState('Kyoto, Japan');
  const [roamDays, setRoamDays] = useState(3);
  const [roamBudget, setRoamBudget] = useState('$1,200');
  const [roamItinerary, setRoamItinerary] = useState<Array<{ day: number; plan: string; est: string }>>([
    { day: 1, plan: 'Historic Gion district walk & Arashiyama bamboo forest', est: '$280' },
    { day: 2, plan: 'Fushimi Inari shrine sunrise hike & Nishiki culinary market', est: '$340' },
    { day: 3, plan: 'Kinkaku-ji Golden Pavilion & local traditional tea experience', est: '$220' },
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Scroll lock when modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleOyeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oyeInput.trim()) return;

    const query = oyeInput.trim();
    setOyeMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setOyeInput('');

    setTimeout(() => {
      let reply = `Processed query: "${query}". Executing requested desktop task...`;
      if (query.toLowerCase().includes('weather')) {
        reply = 'Current weather is 24°C, clear skies. Optimal for campus transit.';
      } else if (query.toLowerCase().includes('schedule') || query.toLowerCase().includes('agenda')) {
        reply = 'Next agenda: SIH problem statement review and DSA practice at 4:00 PM.';
      } else if (query.toLowerCase().includes('hello') || query.toLowerCase().includes('hi')) {
        reply = 'Greetings! How can I assist your workflow today?';
      }
      setOyeMessages((prev) => [...prev, { sender: 'oye', text: reply }]);
    }, 600);
  };

  const handleOyeeOptimize = () => {
    setOyeeOptimizing(true);
    setTimeout(() => {
      setOyeeStops((prev) => [
        { id: 1, name: 'Central Kitchen Depot', eta: '0 min', done: true },
        { id: 3, name: 'Customer Drop #2 (Tech Hub) [Clustered]', eta: '7 min', done: false },
        { id: 2, name: 'Customer Drop #1 (Sector 4) [Sequential]', eta: '13 min', done: false },
      ]);
      setOyeeOptimizing(false);
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#111111] border border-[#2A2A2A] shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden my-auto max-h-[90vh] flex flex-col text-white">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#222222] bg-[#0E0E0E] flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#F02030]">
              <span>{project.category}</span>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-400">BLUEPRINT DOSSIER</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              {project.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#181818] text-neutral-400 hover:text-white hover:bg-[#252525] border border-[#262626] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="px-6 pt-3 pb-2 border-b border-[#1F1F1F] bg-[#141414] flex gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#F02030] text-white shadow-[0_0_12px_rgba(240,32,48,0.35)]'
                : 'text-neutral-400 hover:text-white hover:bg-[#1E1E1E]'
            }`}
          >
            Overview & Architecture
          </button>
          <button
            onClick={() => setActiveTab('simulation')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'simulation'
                ? 'bg-[#F02030] text-white shadow-[0_0_12px_rgba(240,32,48,0.35)]'
                : 'text-neutral-400 hover:text-white hover:bg-[#1E1E1E]'
            }`}
          >
            <Play className="w-3 h-3" />
            <span>Interactive Simulator</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          
          {activeTab === 'overview' ? (
            <>
              {/* Short Summary */}
              <div>
                <h4 className="text-xs font-bold text-[#F02030] uppercase tracking-wider mb-1">
                  Project Abstract
                </h4>
                <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                  {project.description}
                </p>
              </div>

              {/* Problem vs Solution Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#161616] border border-[#262626]">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                    Problem Statement
                  </h4>
                  <p className="text-xs text-[#A0A0A0] leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#161616] border border-[#262626]">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                    Proposed Solution
                  </h4>
                  <p className="text-xs text-[#A0A0A0] leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Key Capabilities & Features
                </h4>
                <div className="space-y-2.5">
                  {project.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-[#F02030] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-neutral-400 font-mono">
                  {project.technologies.map((t, idx) => (
                    <React.Fragment key={t}>
                      <span className="text-neutral-200">{t}</span>
                      {idx < project.technologies.length - 1 && (
                        <span aria-hidden="true" className="text-neutral-600">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Links & Repository Details */}
              <div className="pt-4 border-t border-[#222222] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#F02030] hover:bg-[#d01827] text-white transition-colors shadow-[0_0_12px_rgba(240,32,48,0.35)]"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#181818] hover:bg-[#222222] text-neutral-300 border border-[#2a2a2a] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>

                <span className="text-[11px] text-neutral-500 font-mono">
                  PROTOTYPE REPO
                </span>
              </div>
            </>
          ) : (
            /* Interactive Simulation Tab */
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-[#F02030]/10 border border-[#F02030]/30 text-xs text-neutral-300">
                Interactive simulator running locally to demonstrate real-time workflow logic.
              </div>

              {project.simulationType === 'oyee' && (
                <div className="p-4 rounded-xl bg-[#161616] border border-[#262626] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-sm text-white">OYEE Route Batching Simulator</h5>
                      <p className="text-xs text-neutral-400">Heuristic cluster optimization for simultaneous delivery drop-offs</p>
                    </div>
                    <button
                      onClick={handleOyeeOptimize}
                      disabled={oyeeOptimizing}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#F02030] hover:bg-[#d01827] text-white transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3 h-3 ${oyeeOptimizing ? 'animate-spin' : ''}`} />
                      <span>{oyeeOptimizing ? 'Optimizing...' : 'Re-sequence Route'}</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {oyeeStops.map((stop, index) => (
                      <div key={stop.id} className="flex items-center justify-between p-3 rounded-lg bg-[#111111] border border-[#222222] text-xs">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#1F1F1F] text-[#F02030] flex items-center justify-center font-mono font-bold text-[10px]">
                            {index + 1}
                          </span>
                          <span className="font-semibold text-white">{stop.name}</span>
                        </div>
                        <span className="font-mono text-neutral-400">ETA: {stop.eta}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.simulationType === 'oye_assistant' && (
                <div className="p-4 rounded-xl bg-[#161616] border border-[#262626] space-y-4">
                  <div>
                    <h5 className="font-bold text-sm text-white">Oye Assistant Dialogue Simulator</h5>
                    <p className="text-xs text-neutral-400">Test voice commands, task requests, and conversational responses</p>
                  </div>

                  <div className="h-44 overflow-y-auto space-y-2 p-3 rounded-xl bg-[#111111] border border-[#222222]">
                    {oyeMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`p-2.5 rounded-xl max-w-[85%] text-xs ${
                          msg.sender === 'user'
                            ? 'ml-auto bg-[#F02030] text-white'
                            : 'bg-[#1C1C1C] text-neutral-200 border border-[#2A2A2A]'
                        }`}
                      >
                        {msg.text}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleOyeSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={oyeInput}
                      onChange={(e) => setOyeInput(e.target.value)}
                      placeholder="Type a command (e.g. 'Check my schedule', 'Weather', 'Hello')..."
                      className="flex-1 px-3 py-2 rounded-xl text-xs bg-[#111111] text-white border border-[#262626] focus:outline-none focus:ring-1 focus:ring-[#F02030]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-[#F02030] text-white text-xs font-bold hover:bg-[#d01827] transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}

              {project.simulationType === 'roam_agent' && (
                <div className="p-4 rounded-xl bg-[#161616] border border-[#262626] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-sm text-white">RoamAgent Itinerary Planner</h5>
                      <p className="text-xs text-neutral-400">Dynamic agent schedule balancing activities against budget</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#111111] border border-[#242424]">
                      <span className="text-[10px] text-neutral-500 block font-mono">DESTINATION</span>
                      <span className="font-bold text-white">{roamCity}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#111111] border border-[#242424]">
                      <span className="text-[10px] text-neutral-500 block font-mono">DURATION</span>
                      <span className="font-bold text-white">{roamDays} Days</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#111111] border border-[#242424]">
                      <span className="text-[10px] text-neutral-500 block font-mono">BUDGET CAP</span>
                      <span className="font-bold text-emerald-400">{roamBudget}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {roamItinerary.map((day) => (
                      <div key={day.day} className="p-3 rounded-lg bg-[#111111] border border-[#222222] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[#F02030] font-bold">Day {day.day}:</span>
                          <span className="text-neutral-300">{day.plan}</span>
                        </div>
                        <span className="font-mono text-neutral-400">{day.est}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
