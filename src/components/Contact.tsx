import React, { useState, useEffect } from 'react';
import { Mail, Github, Linkedin, FileText, Send, CheckCircle2, Copy, ExternalLink, Inbox, Trash2, ArrowUpRight, AlertCircle, X, Feather } from 'lucide-react';
import { ProfileData } from '../types/portfolio';
import { ChapterHeading, ManuscriptCorner, KolamDivider } from './ManuscriptMotifs';

interface ContactProps {
  profile: ProfileData;
  onOpenEditModal: () => void;
  onOpenResumeModal: () => void;
}

interface InboundMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export const Contact: React.FC<ContactProps> = ({
  profile,
  onOpenEditModal,
  onOpenResumeModal,
}) => {
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [savedMessages, setSavedMessages] = useState<InboundMessage[]>([]);
  const [showInboxModal, setShowInboxModal] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('rp_portfolio_inbound_messages');
      if (stored) {
        setSavedMessages(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showInboxModal) {
        setShowInboxModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showInboxModal]);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Your name is required.';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!senderEmail.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(senderEmail.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!message.trim()) {
      newErrors.message = 'A message body is required.';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Please provide a message with at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('sending');

    setTimeout(() => {
      const newMsg: InboundMessage = {
        id: `msg_${Date.now()}`,
        name: name.trim(),
        email: senderEmail.trim(),
        subject: subject.trim() || 'Portfolio Inquiry',
        message: message.trim(),
        timestamp: new Date().toLocaleString(),
      };

      const updated = [newMsg, ...savedMessages];
      setSavedMessages(updated);
      try {
        localStorage.setItem('rp_portfolio_inbound_messages', JSON.stringify(updated));
      } catch {
        // ignore
      }

      setStatus('success');
    }, 400);
  };

  const handleCopyDraft = () => {
    const formatted = `To: ${profile.email}\nFrom: ${name} <${senderEmail}>\nSubject: ${subject || 'Portfolio Inquiry'}\n\n${message}`;
    navigator.clipboard.writeText(formatted);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 3000);
  };

  const handleDeleteMessage = (id: string) => {
    const updated = savedMessages.filter((m) => m.id !== id);
    setSavedMessages(updated);
    try {
      localStorage.setItem('rp_portfolio_inbound_messages', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(
    subject || 'Portfolio Inquiry from ' + name
  )}&body=${encodeURIComponent(
    `Hello Rohan,\n\n${message}\n\nFrom,\n${name}\n${senderEmail}`
  )}`;

  return (
    <section id="chapter-connection" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Chapter VII Heading */}
        <ChapterHeading
          chapterNumber="CHAPTER VII"
          sanskritTitle="सप्तम अध्याय • संबन्धः"
          title="THE CONNECTION"
          subtitle="My direct contact coordinates, archival curriculum vitae, and public craft repositories."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Inscribed Channels & Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="parchment-sheet p-6 rounded-lg border-2 border-[#B58A43]/70 space-y-5 relative">
              <ManuscriptCorner position="top-left" className="absolute top-2 left-2 opacity-60" size={20} />
              <ManuscriptCorner position="top-right" className="absolute top-2 right-2 opacity-60" size={20} />
              <ManuscriptCorner position="bottom-left" className="absolute bottom-2 left-2 opacity-60" size={20} />
              <ManuscriptCorner position="bottom-right" className="absolute bottom-2 right-2 opacity-60" size={20} />

              <div className="flex items-center justify-between pb-3 border-b border-[#B58A43]/40">
                <span className="font-cinzel text-xs font-bold text-[#8C3828] uppercase tracking-wider">
                  Direct Royal Envoy
                </span>
                <button
                  onClick={onOpenEditModal}
                  className="font-cinzel text-[11px] text-[#5A3E2B] hover:text-[#8C3828] underline cursor-pointer"
                >
                  [Edit Channels]
                </button>
              </div>

              {/* Direct Email Folio */}
              <div className="p-4 rounded bg-[#E2CDA5]/50 border border-[#B58A43]/60 space-y-1">
                <span className="font-cinzel text-[10px] text-[#8C3828] font-bold uppercase tracking-wider">
                  Direct Inscribed Email
                </span>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-serif text-lg font-bold text-[#211810] hover:text-[#8C3828] transition-colors flex items-center justify-between"
                >
                  <span className="break-all">{profile.email}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#8C3828] shrink-0 ml-2" />
                </a>
              </div>

              {/* Social Channels */}
              <div className="space-y-2.5 font-serif">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded bg-[#FAF4E5] border border-[#B58A43]/50 hover:border-[#8C3828] text-[#211810] flex items-center justify-between transition-colors text-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-[#8C3828]" />
                    <span className="font-cinzel text-xs font-bold">GitHub Repository</span>
                  </div>
                  <span className="text-xs text-[#5A3E2B] truncate max-w-[150px]">
                    {profile.github.replace('https://', '')}
                  </span>
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded bg-[#FAF4E5] border border-[#B58A43]/50 hover:border-[#8C3828] text-[#211810] flex items-center justify-between transition-colors text-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-[#8C3828]" />
                    <span className="font-cinzel text-xs font-bold">LinkedIn Scroll</span>
                  </div>
                  <span className="text-xs text-[#5A3E2B] truncate max-w-[150px]">
                    {profile.linkedin.replace('https://', '')}
                  </span>
                </a>

                {profile.twitter && (
                  <a
                    href={profile.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded bg-[#FAF4E5] border border-[#B58A43]/50 hover:border-[#8C3828] text-[#211810] flex items-center justify-between transition-colors text-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-[#8C3828]">𝕏</span>
                      <span className="font-cinzel text-xs font-bold">X Dispatch</span>
                    </div>
                    <span className="text-xs text-[#5A3E2B] truncate max-w-[150px]">
                      {profile.twitter.replace('https://', '')}
                    </span>
                  </a>
                )}

                <button
                  onClick={onOpenResumeModal}
                  className="w-full p-3.5 rounded bg-[#8C3828] text-[#F3E7CC] hover:bg-[#9E3F2E] border border-[#B58A43] flex items-center justify-between transition-colors text-xs font-cinzel font-bold cursor-pointer shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-[#E2CDA5]" />
                    <span>Archival Résumé Folio</span>
                  </div>
                  <span className="text-[#E2CDA5] text-[11px]">
                    Open Document →
                  </span>
                </button>
              </div>

              {/* Local Storage Saved Letters Registry */}
              <div className="pt-3 border-t border-[#B58A43]/40 flex items-center justify-between text-xs font-serif text-[#5A3E2B]">
                <span>
                  Dispatched Letters Logged: <strong className="font-cinzel text-[#211810]">{savedMessages.length}</strong>
                </span>
                <button
                  onClick={() => setShowInboxModal(true)}
                  className="inline-flex items-center gap-1 text-[#8C3828] hover:text-[#521c13] font-cinzel text-[11px] underline cursor-pointer"
                >
                  <Inbox className="w-3.5 h-3.5" />
                  <span>Inspect Log</span>
                </button>
              </div>

            </div>

          </div>

          {/* Right Column: Scribe Message Dispatch Parchment Form */}
          <div className="lg:col-span-7">
            <div className="parchment-sheet p-6 sm:p-8 rounded-lg border-2 border-[#B58A43]/70 space-y-6 relative">
              <ManuscriptCorner position="top-left" className="absolute top-2 left-2 opacity-60" size={24} />
              <ManuscriptCorner position="top-right" className="absolute top-2 right-2 opacity-60" size={24} />
              <ManuscriptCorner position="bottom-left" className="absolute bottom-2 left-2 opacity-60" size={24} />
              <ManuscriptCorner position="bottom-right" className="absolute bottom-2 right-2 opacity-60" size={24} />

              <div className="space-y-1">
                <h3 className="font-cinzel text-xl font-bold text-[#211810]">
                  Dispatch a Scribe's Inscription
                </h3>
                <p className="font-serif italic text-sm text-[#5A3E2B]">
                  Every inquiry is inscribed into your local browser parchment log and can be transmitted directly into Rohan's inbox.
                </p>
              </div>

              {status === 'success' ? (
                <div className="p-6 rounded bg-[#E2CDA5]/70 border-2 border-[#8C3828] space-y-4 font-serif">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#8C3828] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-cinzel text-base font-bold text-[#211810]">
                        Letter Sealed & Inscribed Successfully!
                      </h4>
                      <p className="text-sm text-[#38251B] mt-1 leading-relaxed">
                        Your message has been validated and recorded. To deliver it into Rohan's mailbox (<strong>{profile.email}</strong>), choose your preferred action:
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={mailtoLink}
                      className="px-4 py-2.5 rounded bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] font-cinzel text-xs font-bold border border-[#B58A43] flex items-center gap-1.5 shadow-md"
                    >
                      <span>Send via Default Email Client</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={handleCopyDraft}
                      className="px-4 py-2.5 rounded bg-[#FAF4E5] hover:bg-[#F3E7CC] text-[#211810] font-cinzel text-xs border border-[#B58A43] flex items-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#8C3828]" />
                      <span>{copiedDraft ? 'Copied to Clipboard!' : 'Copy Formatted Text'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setStatus('idle');
                        setName('');
                        setSenderEmail('');
                        setSubject('');
                        setMessage('');
                      }}
                      className="text-xs font-cinzel text-[#8C3828] hover:text-[#521c13] underline cursor-pointer"
                    >
                      Write Another Letter
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-serif">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-cinzel text-[#38251B] mb-1">Your Name / Title</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="e.g. Maya Sharma"
                        className="w-full p-2.5 bg-[#FAF4E5] border border-[#B58A43] rounded text-sm text-[#211810]"
                      />
                      {errors.name && (
                        <p className="text-xs text-[#8C3828] mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-cinzel text-[#38251B] mb-1">Your Email</label>
                      <input
                        type="email"
                        value={senderEmail}
                        onChange={(e) => {
                          setSenderEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="e.g. maya@example.com"
                        className="w-full p-2.5 bg-[#FAF4E5] border border-[#B58A43] rounded text-sm text-[#211810]"
                      />
                      {errors.email && (
                        <p className="text-xs text-[#8C3828] mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-cinzel text-[#38251B] mb-1">Topic / Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Internship Inquiry / Engineering Collaboration"
                      className="w-full p-2.5 bg-[#FAF4E5] border border-[#B58A43] rounded text-sm text-[#211810]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-cinzel text-[#38251B] mb-1">Message Body</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      placeholder="Inscribe your note or proposal here..."
                      className="w-full p-2.5 bg-[#FAF4E5] border border-[#B58A43] rounded text-sm text-[#211810]"
                    />
                    {errors.message && (
                      <p className="text-xs text-[#8C3828] mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-3 px-5 rounded bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] font-cinzel text-xs font-bold tracking-wider border border-[#B58A43] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Feather className="w-4 h-4 text-[#E2CDA5]" />
                    <span>{status === 'sending' ? 'Inscribing...' : 'Seal & Send Inscription'}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Inbound Messages Inspector Modal */}
      {showInboxModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-xl parchment-sheet p-6 rounded-lg border-2 border-[#B58A43] shadow-2xl relative max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#B58A43]/40">
              <h3 className="font-cinzel text-lg font-bold text-[#211810]">
                Preserved Inbound Letters ({savedMessages.length})
              </h3>
              <button
                onClick={() => setShowInboxModal(false)}
                className="text-[#5A3E2B] hover:text-[#8C3828]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-3 py-4 flex-1">
              {savedMessages.length === 0 ? (
                <p className="text-center font-serif italic text-sm text-[#5A3E2B]">
                  No letters preserved in this ledger yet.
                </p>
              ) : (
                savedMessages.map((msg) => (
                  <div key={msg.id} className="p-4 rounded bg-[#FAF4E5] border border-[#B58A43]/40 relative font-serif">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-cinzel text-sm font-bold text-[#211810]">{msg.name} ({msg.email})</div>
                        <div className="text-xs text-[#8C3828] font-bold">{msg.subject} • {msg.timestamp}</div>
                      </div>
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="text-[#8C3828] hover:text-[#521c13] p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-[#38251B] mt-2 whitespace-pre-wrap">{msg.message}</p>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-[#B58A43]/40 flex justify-end">
              <button
                onClick={() => setShowInboxModal(false)}
                className="px-4 py-1.5 text-xs font-cinzel rounded bg-[#8C3828] text-[#F3E7CC]"
              >
                Close Registry
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
