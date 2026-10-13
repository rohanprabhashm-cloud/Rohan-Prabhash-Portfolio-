import {
  Project,
  HackathonAchievement,
  ProfileData,
  Skill,
  ExperienceItem,
  CertificationItem,
  PortfolioArchivePayload,
} from '../types/portfolio';
import {
  INITIAL_PROFILE,
  INITIAL_PROJECTS,
  INITIAL_HACKATHONS,
  INITIAL_SKILLS,
  INITIAL_EXPERIENCE,
  INITIAL_CERTIFICATIONS,
} from '../data/initialData';

const AUTH_TOKEN_KEY = 'rp_scribe_auth_token';

export const getAuthToken = (): string | null => {
  try {
    return sessionStorage.getItem(AUTH_TOKEN_KEY) || localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setAuthToken = (token: string, persist = true) => {
  try {
    if (persist) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    }
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch {
    // ignore
  }
};

export const clearAuthToken = () => {
  try {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch {
    // ignore
  }
};

const getHeaders = (hasBody = true): HeadersInit => {
  const headers: Record<string, string> = {};
  if (hasBody) {
    headers['Content-Type'] = 'application/json';
  }
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export interface PortfolioDataResponse {
  profile?: ProfileData;
  projects?: Project[];
  hackathons?: HackathonAchievement[];
  skills?: Skill[];
  experience?: ExperienceItem[];
  certifications?: CertificationItem[];
}

/**
 * Fetch portfolio data from server, falling back gracefully to localStorage and initialData
 */
export async function fetchPortfolioData(): Promise<PortfolioDataResponse> {
  try {
    const res = await fetch('/api/portfolio', {
      headers: getHeaders(false),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && (data.projects || data.profile || data.hackathons)) {
        return data;
      }
    }
  } catch (err) {
    console.warn('API /api/portfolio unavailable, using local cache:', err);
  }

  // Local storage fallback
  try {
    const storedProjects = localStorage.getItem('rp_portfolio_projects');
    const storedHackathons = localStorage.getItem('rp_portfolio_hackathons');
    const storedProfile = localStorage.getItem('rp_portfolio_profile');
    const storedSkills = localStorage.getItem('rp_portfolio_skills');
    const storedExp = localStorage.getItem('rp_portfolio_experience');
    const storedCerts = localStorage.getItem('rp_portfolio_certifications');

    return {
      profile: storedProfile ? JSON.parse(storedProfile) : INITIAL_PROFILE,
      projects: storedProjects ? JSON.parse(storedProjects) : INITIAL_PROJECTS,
      hackathons: storedHackathons ? JSON.parse(storedHackathons) : INITIAL_HACKATHONS,
      skills: storedSkills ? JSON.parse(storedSkills) : INITIAL_SKILLS,
      experience: storedExp ? JSON.parse(storedExp) : INITIAL_EXPERIENCE,
      certifications: storedCerts ? JSON.parse(storedCerts) : INITIAL_CERTIFICATIONS,
    };
  } catch {
    return {
      profile: INITIAL_PROFILE,
      projects: INITIAL_PROJECTS,
      hackathons: INITIAL_HACKATHONS,
      skills: INITIAL_SKILLS,
      experience: INITIAL_EXPERIENCE,
      certifications: INITIAL_CERTIFICATIONS,
    };
  }
}

/**
 * Save complete portfolio database to server
 */
export async function savePortfolioData(data: PortfolioDataResponse): Promise<boolean> {
  try {
    const res = await fetch('/api/portfolio', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (e) {
    console.warn('Failed to persist portfolio to server:', e);
    return false;
  }
}

/**
 * Project Operations
 */
export async function createProjectApi(project: Partial<Project>): Promise<Project | null> {
  try {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(project),
    });
    if (res.ok) {
      const data = await res.json();
      return data.project;
    }
  } catch (e) {
    console.warn('API error creating project:', e);
  }
  return null;
}

export async function updateProjectApi(id: string, updates: Partial<Project>): Promise<Project | null> {
  try {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      const data = await res.json();
      return data.project;
    }
  } catch (e) {
    console.warn('API error updating project:', e);
  }
  return null;
}

export async function deleteProjectApi(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      headers: getHeaders(false),
    });
    return res.ok;
  } catch (e) {
    console.warn('API error deleting project:', e);
    return false;
  }
}

export async function reorderProjectsApi(projectIds: string[]): Promise<boolean> {
  try {
    const res = await fetch('/api/projects/reorder', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify({ projectIds }),
    });
    return res.ok;
  } catch (e) {
    console.warn('API error reordering projects:', e);
    return false;
  }
}

export async function duplicateProjectApi(id: string): Promise<Project | null> {
  try {
    const res = await fetch(`/api/projects/${id}/duplicate`, {
      method: 'POST',
      headers: getHeaders(false),
    });
    if (res.ok) {
      const data = await res.json();
      return data.project;
    }
  } catch (e) {
    console.warn('API error duplicating project:', e);
  }
  return null;
}

/**
 * Hackathon Operations
 */
export async function createHackathonApi(hackathon: Partial<HackathonAchievement>): Promise<HackathonAchievement | null> {
  try {
    const res = await fetch('/api/hackathons', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(hackathon),
    });
    if (res.ok) {
      const data = await res.json();
      return data.hackathon;
    }
  } catch (e) {
    console.warn('API error creating hackathon:', e);
  }
  return null;
}

export async function updateHackathonApi(
  id: string,
  updates: Partial<HackathonAchievement>
): Promise<HackathonAchievement | null> {
  try {
    const res = await fetch(`/api/hackathons/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      const data = await res.json();
      return data.hackathon;
    }
  } catch (e) {
    console.warn('API error updating hackathon:', e);
  }
  return null;
}

export async function deleteHackathonApi(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/hackathons/${id}`, {
      method: 'DELETE',
      headers: getHeaders(false),
    });
    return res.ok;
  } catch (e) {
    console.warn('API error deleting hackathon:', e);
    return false;
  }
}

export async function reorderHackathonsApi(hackathonIds: string[]): Promise<boolean> {
  try {
    const res = await fetch('/api/hackathons/reorder', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify({ hackathonIds }),
    });
    return res.ok;
  } catch (e) {
    console.warn('API error reordering hackathons:', e);
    return false;
  }
}

export async function duplicateHackathonApi(id: string): Promise<HackathonAchievement | null> {
  try {
    const res = await fetch(`/api/hackathons/${id}/duplicate`, {
      method: 'POST',
      headers: getHeaders(false),
    });
    if (res.ok) {
      const data = await res.json();
      return data.hackathon;
    }
  } catch (e) {
    console.warn('API error duplicating hackathon:', e);
  }
  return null;
}

/**
 * Upload Image
 */
export async function uploadImageApi(
  dataUrl: string,
  suggestedFilename?: string
): Promise<{ url: string; filename: string } | null> {
  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify({ dataUrl, filename: suggestedFilename }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('API error uploading image:', e);
  }
  // Fallback: return dataUrl itself if server is offline or fails
  return { url: dataUrl, filename: suggestedFilename || 'inline-image' };
}

/**
 * Auth
 */
export async function loginAdminApi(passkey: string): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passkey }),
    });
    const data = await res.json();
    if (res.ok && data.token) {
      setAuthToken(data.token);
      return { success: true, token: data.token };
    }
    return { success: false, error: data.error || 'Authentication rejected' };
  } catch (e: any) {
    // If running in purely client mode, allow default rohan2025
    if (passkey === 'rohan2025') {
      const localToken = `scribe_local_${Date.now()}`;
      setAuthToken(localToken);
      return { success: true, token: localToken };
    }
    return { success: false, error: 'Connection failed or invalid passkey.' };
  }
}

export async function checkAdminStatusApi(): Promise<boolean> {
  const token = getAuthToken();
  if (!token) return false;
  try {
    const res = await fetch('/api/auth/status', {
      headers: getHeaders(false),
    });
    if (res.ok) {
      const data = await res.json();
      return Boolean(data.isAuthenticated);
    }
  } catch {
    // If token exists locally, preserve state
    return true;
  }
  return false;
}

/**
 * Import & Export
 */
export async function importArchiveApi(
  payload: any,
  overwrite = false
): Promise<{
  success: boolean;
  errors?: string[];
  warnings?: string[];
  importedProjects?: number;
  importedHackathons?: number;
  duplicatesSkipped?: number;
  message?: string;
}> {
  try {
    const res = await fetch(`/api/import?overwrite=${overwrite}`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (e: any) {
    return { success: false, errors: [e.message || 'Network error during import.'] };
  }
}
