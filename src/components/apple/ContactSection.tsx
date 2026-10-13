import React, { useState } from 'react';
import { Mail, Github, Linkedin, FileText, Send, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const ContactSection: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'validating' | 'ready_to_send' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please complete all required fields.');
      setFormStatus('error');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please provide a valid email address.');
      setFormStatus('error');
      return;
    }

    // Input is verified and validated
    setFormStatus('ready_to_send');
    setErrorMessage('');
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
    setFormStatus('idle');
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-black/5 dark:border-white/5">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold text-[#0071e3] dark:text-[#2997ff] uppercase tracking-wider mb-2">
            Get in Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-3">
            Contact Me
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
            Open to internship discussions, collaborative projects, or academic conversations. Feel free to connect directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <a
              href={`mailto:${profile.email}`}
              className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-black/5 dark:border-white/10 apple-card-glow flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-200/80 dark:bg-neutral-800 flex items-center justify-center text-[#0071e3] dark:text-[#2997ff] group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[11px] font-mono text-neutral-400 block">DIRECT EMAIL</span>
                <span className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-[#0071e3] dark:group-hover:text-[#2997ff] transition-colors truncate block">
                  {profile.email}
                </span>
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-black/5 dark:border-white/10 apple-card-glow flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-200/80 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white group-hover:scale-105 transition-transform">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-neutral-400 block">CODE REPOSITORY</span>
                <span className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-[#0071e3] dark:group-hover:text-[#2997ff] transition-colors">
                  github.com/rohanprabhash
                </span>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-black/5 dark:border-white/10 apple-card-glow flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-200/80 dark:bg-neutral-800 flex items-center justify-center text-[#0071e3] dark:text-[#2997ff] group-hover:scale-105 transition-transform">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-neutral-400 block">PROFESSIONAL NETWORK</span>
                <span className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-[#0071e3] dark:group-hover:text-[#2997ff] transition-colors">
                  linkedin.com/in/rohanprabhash
                </span>
              </div>
            </a>

            {/* Résumé Placeholder Card */}
            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-black/5 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-200/80 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white block">Curriculum Vitae</span>
                  <span className="text-xs text-neutral-500">B.Tech AI & ML Profile</span>
                </div>
              </div>
              <button
                onClick={() => alert('Résumé document slot configured. Replace with Rohan Prabhash official PDF link.')}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white transition-colors cursor-pointer"
              >
                Download
              </button>
            </div>

          </div>

          {/* Right Column: Functional Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border border-black/8 dark:border-white/10 apple-card-glow">
              
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">
                Fill in your contact details below to initiate communication.
              </p>

              {formStatus === 'ready_to_send' ? (
                <div className="p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-800/80 border border-black/5 dark:border-white/10 text-center space-y-4 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">
                      Message Validated & Formatted
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-sm mx-auto leading-relaxed">
                      Thank you, <span className="font-semibold">{name}</span>! Your message has passed local validation.
                    </p>
                  </div>

                  {/* Honest Service Disclaimer */}
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-left flex items-start gap-2.5 text-[11px] text-amber-700 dark:text-amber-400">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      <strong>Notice:</strong> To dispatch live emails to Rohan's inbox, connect a form endpoint provider (such as Formspree, Resend, or a backend mail service). You can also click the direct email link on the left to send an email immediately.
                    </span>
                  </div>

                  <div className="pt-2 flex justify-center gap-3">
                    <a
                      href={`mailto:${profile.email}?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + email)}`}
                      className="px-4 py-2 rounded-full text-xs font-semibold bg-[#0071e3] text-white hover:bg-[#0077ed] transition-colors"
                    >
                      Open Email Client Now
                    </a>
                    <button
                      onClick={handleResetForm}
                      className="px-4 py-2 rounded-full text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                    >
                      Reset Form
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {formStatus === 'error' && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Sharma"
                      className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-neutral-950 border border-black/10 dark:border-white/10 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Your Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex@example.com"
                      className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-neutral-950 border border-black/10 dark:border-white/10 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your inquiry, internship scope, or project idea..."
                      className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-neutral-950 border border-black/10 dark:border-white/10 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all resize-none"
                    />
                  </div>

                  {/* Backend Notice */}
                  <div className="flex items-start gap-2 text-[11px] text-neutral-500">
                    <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-neutral-400" />
                    <span>
                      Client-side form with input validation. Outbound delivery requires email server configuration.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-black hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Send Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
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
