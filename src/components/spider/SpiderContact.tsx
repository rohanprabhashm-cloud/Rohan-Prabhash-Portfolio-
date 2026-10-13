import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle, Zap, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { SpiderWebCorner, SpiderDivider, AtmosphericRedGlow } from './SpiderGraphics';

export const SpiderContact: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'ready_to_send' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('ALL SIGNAL CHANNELS ARE MANDATORY. PLEASE COMPLETE THE FORM.');
      setFormStatus('error');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('INVALID DISPATCH ADDRESS. CHECK YOUR EMAIL SYNTAX.');
      setFormStatus('error');
      return;
    }

    setFormStatus('ready_to_send');
    setErrorMessage('');
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setFormStatus('idle');
  };

  return (
    <section
      id="contact"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0B0B0B] text-white border-b border-[#1c1c1c] overflow-hidden"
    >
      {/* Spider-Web Corner */}
      <SpiderWebCorner position="top-right" size={170} className="absolute top-0 right-0 text-[#F02030]/20" />
      <SpiderWebCorner position="bottom-left" size={150} className="absolute bottom-0 left-0 text-white/15" />

      {/* Atmospheric Glow */}
      <AtmosphericRedGlow intensity="medium" className="top-1/3 left-1/3 w-[520px] h-[520px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#F02030] mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#F02030] rounded-full shadow-[0_0_6px_#F02030]" />
            COMMUNICATION BEACON // DISPATCH
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            LET'S <span className="text-[#F02030] drop-shadow-[0_0_25px_rgba(240,32,48,0.35)]">CONNECT.</span>
          </h2>

          <SpiderDivider className="mt-4 mb-4" />

          <p className="text-sm sm:text-base text-[#A0A0A0] max-w-xl font-normal leading-relaxed">
            Open to engineering internships, technical collaborations, and hackathon problem-solving expeditions.
          </p>
        </div>

        {/* 2-Column Layout: Direct Transmission Channels vs Interactive Message Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Beacon Links */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Primary Email Card */}
            <div className="bg-[#111111] border border-[#222222] rounded-2xl p-7 shadow-xl hover:border-[#F02030]/60 transition-all">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#F02030] block mb-1">
                PRIMARY SIGNAL CHANNEL
              </span>
              <h3 className="text-xl font-bold text-white uppercase mb-2">
                ELECTRONIC MAIL
              </h3>
              <p className="text-xs text-[#A0A0A0] font-normal mb-5 leading-relaxed">
                Send direct opportunities, project invitations, or inquiries.
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#F02030] hover:bg-[#d01827] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(240,32,48,0.3)] hover:shadow-[0_0_20px_rgba(240,32,48,0.5)]"
              >
                <Mail className="w-4 h-4" />
                <span>{profile.email}</span>
              </a>
            </div>

            {/* Social Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-[#111111] border border-[#222222] hover:border-[#F02030] hover:shadow-[0_4px_20px_rgba(240,32,48,0.18)] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-[#181818] text-white group-hover:bg-[#F02030] flex items-center justify-center border border-[#282828] mb-3 transition-colors">
                    <Github className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase mb-0.5">
                    GITHUB
                  </h4>
                  <p className="text-[11px] text-[#A0A0A0]">
                    Code repositories & commits
                  </p>
                </div>
                <span className="mt-3 text-[10px] font-mono font-bold uppercase text-[#F02030] group-hover:underline">
                  EXPLORE COMMITS →
                </span>
              </a>

              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-[#111111] border border-[#222222] hover:border-[#F02030] hover:shadow-[0_4px_20px_rgba(240,32,48,0.18)] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-[#181818] text-white group-hover:bg-[#F02030] flex items-center justify-center border border-[#282828] mb-3 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase mb-0.5">
                    LINKEDIN
                  </h4>
                  <p className="text-[11px] text-[#A0A0A0]">
                    Professional network
                  </p>
                </div>
                <span className="mt-3 text-[10px] font-mono font-bold uppercase text-[#F02030] group-hover:underline">
                  VIEW NETWORK →
                </span>
              </a>
            </div>

            {/* Availability Banner: Sleek dark styling with glowing red pulse */}
            <div className="p-4 rounded-xl bg-[#141414] border border-[#262626] flex items-center gap-3.5 shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F02030] shadow-[0_0_8px_#F02030] animate-pulse shrink-0" />
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider block text-neutral-400">
                  CURRENT AVAILABILITY STATUS
                </span>
                <span className="text-xs font-bold text-white uppercase">
                  OPEN TO SUMMER INTERNSHIPS & RESEARCH SPRINT OPPORTUNITIES
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#111111] border border-[#222222] rounded-2xl p-7 sm:p-8 shadow-xl">
              
              <div className="flex items-center justify-between border-b border-[#202020] pb-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  COMMUNICATION BEACON TERMINAL
                </span>
                <span className="text-[10px] font-mono text-[#F02030]">
                  ENCRYPTION: ACTIVE
                </span>
              </div>

              {formStatus === 'ready_to_send' ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-black text-white uppercase mb-2">
                    TRANSMISSION READY!
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 font-medium max-w-md mb-6 leading-relaxed">
                    Message formulated successfully. Click below to launch your default mail client with prefilled details for Rohan Prabhash.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <a
                      href={`mailto:${profile.email}?subject=${encodeURIComponent(
                        `Portfolio Inquiry from ${name}`
                      )}&body=${encodeURIComponent(
                        `Sender: ${name} (${email})\n\nMessage:\n${message}`
                      )}`}
                      className="px-6 py-3 rounded-xl bg-[#F02030] hover:bg-[#d01827] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-[0_0_15px_rgba(240,32,48,0.35)]"
                    >
                      OPEN MAIL CLIENT & TRANSMIT
                    </a>
                    <button
                      onClick={handleReset}
                      className="px-4 py-3 rounded-xl bg-[#181818] text-neutral-300 hover:text-white hover:bg-[#222222] text-xs font-semibold uppercase tracking-wider border border-[#282828] transition-colors cursor-pointer"
                    >
                      RESET FORM
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {formStatus === 'error' && (
                    <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs font-semibold text-red-300 uppercase flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase mb-1.5">
                      YOUR NAME / CALLSIGN *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Peter Parker / Engineering Recruiter"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-[#262626] text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F02030] focus:ring-1 focus:ring-[#F02030] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase mb-1.5">
                      YOUR DISPATCH EMAIL *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. recruiter@tech.co"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-[#262626] text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F02030] focus:ring-1 focus:ring-[#F02030] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase mb-1.5">
                      MESSAGE TRANSMISSION *
                    </label>
                    <textarea
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe the opportunity, collaborative build, or inquiry..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-[#262626] text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F02030] focus:ring-1 focus:ring-[#F02030] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 py-3.5 px-6 rounded-xl bg-[#F02030] hover:bg-[#d01827] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(240,32,48,0.35)] hover:shadow-[0_0_25px_rgba(240,32,48,0.5)] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>VERIFY & SEND TRANSMISSION</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
