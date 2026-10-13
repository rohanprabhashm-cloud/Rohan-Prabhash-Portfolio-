import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Download,
  Upload,
  Database,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  FileCode,
  HardDrive,
  Copy,
  Check,
} from 'lucide-react';
import { ManuscriptCorner } from './ManuscriptMotifs';
import { Project, HackathonAchievement, ProfileData, Skill, ExperienceItem, CertificationItem } from '../types/portfolio';
import { importArchiveApi } from '../services/portfolioApi';

interface ArchiveManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  hackathons: HackathonAchievement[];
  profile: ProfileData;
  skills: Skill[];
  experience: ExperienceItem[];
  certifications: CertificationItem[];
  onImportComplete: (importedData: any) => void;
  onResetDefaults: () => void;
  isAdmin: boolean;
}

export const ArchiveManagerModal: React.FC<ArchiveManagerModalProps> = ({
  isOpen,
  onClose,
  projects,
  hackathons,
  profile,
  skills,
  experience,
  certifications,
  onImportComplete,
  onResetDefaults,
  isAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'export' | 'import' | 'storage'>('export');
  const [jsonText, setJsonText] = useState('');
  const [importReport, setImportReport] = useState<{
    success: boolean;
    errors?: string[];
    warnings?: string[];
    importedProjects?: number;
    importedHackathons?: number;
    duplicatesSkipped?: number;
    message?: string;
  } | null>(null);
  const [overwriteDuplicates, setOverwriteDuplicates] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fullArchive = {
        version: '2.0.0',
        exportedAt: new Date().toISOString(),
        author: profile.name || 'Rohan Prabhash',
        profile,
        projects,
        hackathons,
        skills,
        experience,
        certifications,
      };
      setJsonText(JSON.stringify(fullArchive, null, 2));
      setImportReport(null);
      setCopied(false);
    }
  }, [isOpen, projects, hackathons, profile, skills, experience, certifications]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Export File Download
  const handleDownloadJson = () => {
    const blob = new Blob([jsonText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rohan-prabhash-archive-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Import from uploaded file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        processJsonImport(content);
      }
    };
    reader.readAsText(file);
  };

  // Process and validate JSON
  const processJsonImport = async (rawJson: string) => {
    setIsProcessing(true);
    setImportReport(null);

    let parsed: any;
    try {
      parsed = JSON.parse(rawJson);
    } catch (e: any) {
      setIsProcessing(false);
      setImportReport({
        success: false,
        errors: [`JSON syntax parse error: ${e.message}`],
      });
      return;
    }

    // Local Schema Validation Check
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!parsed || typeof parsed !== 'object') {
      errors.push('Archive payload must be a JSON object.');
    } else {
      if (parsed.projects && !Array.isArray(parsed.projects)) {
        errors.push('"projects" must be an array.');
      }
      if (parsed.hackathons && !Array.isArray(parsed.hackathons)) {
        errors.push('"hackathons" must be an array.');
      }
    }

    if (errors.length > 0) {
      setIsProcessing(false);
      setImportReport({ success: false, errors, warnings });
      return;
    }

    // Call server import API
    const apiRes = await importArchiveApi(parsed, overwriteDuplicates);
    setIsProcessing(false);

    if (apiRes.success) {
      setImportReport(apiRes);
      onImportComplete(parsed);
    } else {
      setImportReport({
        success: false,
        errors: apiRes.errors || ['Server rejected import payload.'],
      });
    }
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
      <div className="relative w-full max-w-4xl parchment-sheet border-2 border-[#B58A43] rounded-lg shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#211810]">
        <ManuscriptCorner position="top-left" size={26} className="absolute top-2 left-2 opacity-80" />
        <ManuscriptCorner position="top-right" size={26} className="absolute top-2 right-2 opacity-80" />

        {/* Header */}
        <div className="px-6 py-4 border-b border-[#B58A43]/50 flex items-center justify-between bg-[#E2CDA5]/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#8C3828] border border-[#B58A43] flex items-center justify-center text-[#F3E7CC]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="font-cinzel text-[10px] text-[#8C3828] uppercase tracking-widest font-bold">
                DATA MANAGEMENT & ARCHIVE PRESERVATION
              </div>
              <h3 className="font-cinzel text-xl font-bold text-[#211810]">
                Archive Sanctum • Import, Export & Persistence
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5A3E2B] hover:text-[#8C3828] rounded cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="px-6 pt-2 border-b border-[#B58A43]/40 bg-[#FAF4E5] flex items-center justify-between font-cinzel text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('export')}
              className={`px-3.5 py-2 font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'export'
                  ? 'border-[#8C3828] text-[#8C3828] font-bold'
                  : 'border-transparent text-[#5A3E2B] hover:text-[#211810]'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Folio JSON</span>
            </button>
            <button
              onClick={() => setActiveTab('import')}
              className={`px-3.5 py-2 font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'import'
                  ? 'border-[#8C3828] text-[#8C3828] font-bold'
                  : 'border-transparent text-[#5A3E2B] hover:text-[#211810]'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import & Validate</span>
            </button>
            <button
              onClick={() => setActiveTab('storage')}
              className={`px-3.5 py-2 font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'storage'
                  ? 'border-[#8C3828] text-[#8C3828] font-bold'
                  : 'border-transparent text-[#5A3E2B] hover:text-[#211810]'
              }`}
            >
              <HardDrive className="w-3.5 h-3.5" />
              <span>Storage Architecture & Security</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-5 font-serif text-xs sm:text-sm">
          {/* TAB 1: EXPORT */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-4 rounded bg-[#E2CDA5]/60 border border-[#B58A43]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-cinzel font-bold text-sm text-[#211810]">
                    Complete Archive Payload Ready
                  </h4>
                  <p className="text-xs text-[#5A3E2B] mt-0.5">
                    Contains {projects.length} creations, {hackathons.length} hackathon chronicles, {skills.length} skills, and verified profile data.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyJson}
                    className="px-3 py-2 rounded bg-[#24170E] hover:bg-[#38251B] text-[#E2CDA5] font-cinzel text-xs border border-[#B58A43] flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                  <button
                    onClick={handleDownloadJson}
                    className="px-4 py-2 rounded bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] font-cinzel text-xs font-bold border border-[#B58A43] flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .json File</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-cinzel text-xs font-bold text-[#38251B] mb-1">
                  Raw JSON Archive Preview
                </label>
                <textarea
                  readOnly
                  value={jsonText}
                  rows={14}
                  className="w-full p-3 font-mono text-[11px] bg-[#160e08] text-[#E2CDA5] border border-[#B58A43]/60 rounded outline-none selection:bg-[#8C3828]"
                />
              </div>
            </div>
          )}

          {/* TAB 2: IMPORT */}
          {activeTab === 'import' && (
            <div className="space-y-4">
              <div className="p-4 rounded bg-[#FAF4E5] border border-[#B58A43]/50 space-y-2">
                <h4 className="font-cinzel font-bold text-sm text-[#8C3828]">
                  Import Archive Records with Automatic Validation
                </h4>
                <p className="text-xs text-[#38251B] leading-relaxed">
                  Select a previously exported JSON file. The system will rigorously validate the schema, check for required fields, detect duplicate entries by ID and title, and create an automated pre-import safety backup on the server.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs font-serif text-[#38251B]">
                    <input
                      type="checkbox"
                      checked={overwriteDuplicates}
                      onChange={(e) => setOverwriteDuplicates(e.target.checked)}
                      className="rounded accent-[#8C3828]"
                    />
                    <span>Overwrite duplicate records if matched (otherwise duplicates are safely skipped)</span>
                  </label>
                </div>
              </div>

              {/* Upload Drop Zone */}
              <div className="p-8 border-2 border-dashed border-[#B58A43] rounded-lg text-center bg-[#FAF4E5]/50 flex flex-col items-center justify-center space-y-3">
                <FileCode className="w-10 h-10 text-[#8C3828]" />
                <div>
                  <p className="font-cinzel text-sm font-bold text-[#211810]">
                    Select JSON Archive File to Import
                  </p>
                  <p className="text-xs text-[#5A3E2B] mt-0.5">
                    Validates schema and safely merges creations and chronicles.
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                  className="px-5 py-2.5 rounded bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] font-cinzel text-xs font-bold border border-[#B58A43] shadow cursor-pointer flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isProcessing ? 'Validating Payload...' : 'Choose .json File'}</span>
                </button>
              </div>

              {/* Validation Report */}
              {importReport && (
                <div
                  className={`p-4 rounded border text-xs space-y-2 ${
                    importReport.success
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-red-50 border-red-300 text-red-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-cinzel font-bold text-sm">
                    {importReport.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-700" />
                    )}
                    <span>{importReport.success ? 'Import Validation Succeeded' : 'Import Validation Failed'}</span>
                  </div>

                  {importReport.message && <p>{importReport.message}</p>}

                  {importReport.success && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-emerald-200">
                      <div>
                        <span className="font-semibold">Creations Added:</span> {importReport.importedProjects || 0}
                      </div>
                      <div>
                        <span className="font-semibold">Chronicles Added:</span> {importReport.importedHackathons || 0}
                      </div>
                      <div>
                        <span className="font-semibold">Duplicates Skipped:</span> {importReport.duplicatesSkipped || 0}
                      </div>
                    </div>
                  )}

                  {importReport.errors && importReport.errors.length > 0 && (
                    <ul className="list-disc pl-4 space-y-0.5 text-red-800">
                      {importReport.errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: STORAGE ARCHITECTURE & EXPLANATION */}
          {activeTab === 'storage' && (
            <div className="space-y-4 text-xs sm:text-sm text-[#38251B] leading-relaxed">
              <div className="p-4 rounded bg-[#E2CDA5]/70 border border-[#B58A43]/50 space-y-2">
                <h4 className="font-cinzel font-bold text-sm text-[#211810] flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-[#8C3828]" />
                  <span>Persistent Storage Architecture (Section 4 Compliance)</span>
                </h4>
                <p>
                  To ensure that portfolio updates are never lost or trapped exclusively within a single browser, this application implements a layered persistence architecture:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#211810]">
                  <li>
                    <strong>Server-Side File Database (<code className="font-mono bg-black/10 px-1 py-0.5 rounded">data/portfolio-database.json</code>):</strong> When you create, edit, reorder, or duplicate projects and hackathons, records are permanently written to disk on the Node/Express backend.
                  </li>
                  <li>
                    <strong>Persistent Image Uploads (<code className="font-mono bg-black/10 px-1 py-0.5 rounded">public/uploads/</code>):</strong> Uploaded project screenshots and certificates are saved as static assets with permanent URLs, not ephemeral browser blobs.
                  </li>
                  <li>
                    <strong>Client-Side Resilient Mirroring:</strong> Client state automatically synchronizes with browser <code className="font-mono bg-black/10 px-1 py-0.5 rounded">localStorage</code> as a fallback cache, ensuring instant load times and offline readiness.
                  </li>
                  <li>
                    <strong>Automated Safety Backups (<code className="font-mono bg-black/10 px-1 py-0.5 rounded">data/backups/</code>):</strong> Every delete or bulk import triggers an automated snapshot backup.
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded bg-[#FAF4E5] border border-[#B58A43]/40 space-y-2">
                <h4 className="font-cinzel font-bold text-sm text-[#8C3828] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8C3828]" />
                  <span>Public Deployment & Authorization Plan</span>
                </h4>
                <p className="text-xs">
                  When this portfolio is hosted publicly on Google Cloud Run or a custom domain, <strong>anonymous visitors operate in read-only public mode</strong>:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>Anonymous visitors cannot view private administrative controls, unpublished drafts, or trigger deletion endpoints.</li>
                  <li>Modification endpoints (<code className="font-mono bg-black/10 px-1">/api/projects</code>, <code className="font-mono bg-black/10 px-1">/api/hackathons</code>, <code className="font-mono bg-black/10 px-1">/api/upload</code>) are protected on the server by bearer authentication checks.</li>
                  <li>Rohan Prabhash can unlock full editing privileges anytime via the <strong>Scribe Sanctum</strong> using his private passkey.</li>
                </ul>
              </div>

              <div className="p-4 rounded bg-red-100/50 border border-red-300/60 flex items-center justify-between">
                <div>
                  <h5 className="font-cinzel font-bold text-xs text-red-900">
                    Reset Portfolio to Initial Manuscript Defaults
                  </h5>
                  <p className="text-[11px] text-red-800">
                    Restore all projects, hackathons, and profile data to their initial baseline state.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onResetDefaults}
                  className="px-3.5 py-1.5 rounded bg-red-800 hover:bg-red-900 text-white font-cinzel text-xs flex items-center gap-1.5 cursor-pointer shadow shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
