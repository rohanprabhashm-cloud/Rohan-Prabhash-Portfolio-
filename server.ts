import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const DATA_DIR = path.resolve(__dirname, 'data');
const BACKUPS_DIR = path.resolve(DATA_DIR, 'backups');
const UPLOADS_DIR = path.resolve(__dirname, 'public/uploads');
const DB_FILE = path.resolve(DATA_DIR, 'portfolio-database.json');

// Ensure storage directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(BACKUPS_DIR)) {
  fs.mkdirSync(BACKUPS_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Configurable Admin Passkey (default is rohan2025)
let currentAdminPasskey = process.env.SCRIBE_PASSPHRASE || 'rohan2025';
const validSessionTokens = new Set<string>();

// Read or initialize database file
function loadDatabase() {
  if (fs.existsSync(DB_FILE)) {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading portfolio-database.json:', e);
    }
  }
  return null;
}

function saveDatabase(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error('Error saving portfolio-database.json:', e);
    return false;
  }
}

function createBackup(reason = 'manual') {
  try {
    const current = loadDatabase();
    if (!current) return null;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.resolve(BACKUPS_DIR, `backup-${timestamp}-${reason}.json`);
    fs.writeFileSync(backupFile, JSON.stringify(current, null, 2), 'utf-8');
    return backupFile;
  } catch (e) {
    console.error('Error creating backup:', e);
    return null;
  }
}

// Auth Middleware: requires valid session token or passkey header
function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/, '') || (req.headers['x-scribe-token'] as string);
  const passkeyHeader = req.headers['x-scribe-passkey'] as string;

  if ((token && validSessionTokens.has(token)) || passkeyHeader === currentAdminPasskey) {
    return next();
  }
  return res.status(401).json({
    error: 'Unauthorized: Scribe / Admin authentication required. Enter your sacred Scribe Passphrase to modify the portfolio archive.',
  });
}

async function startServer() {
  const app = express();

  // Middleware
  app.use(express.json({ limit: '35mb' }));
  app.use(express.urlencoded({ extended: true, limit: '35mb' }));

  // Static uploads directory
  app.use('/uploads', express.static(UPLOADS_DIR));

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Auth: Verify Login
  app.post('/api/auth/login', (req, res) => {
    const { passkey } = req.body;
    if (passkey === currentAdminPasskey) {
      const token = `scribe_session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      validSessionTokens.add(token);
      res.json({
        success: true,
        token,
        message: 'Scribe Sanctum unlocked. Sovereign folio modifications permitted.',
      });
    } else {
      res.status(401).json({
        success: false,
        error: 'Invalid Scribe Passphrase. Please check your credentials.',
      });
    }
  });

  // Auth: Check status
  app.get('/api/auth/status', (req, res) => {
    const token = req.headers.authorization?.replace(/^Bearer\s+/, '') || (req.headers['x-scribe-token'] as string);
    const passkey = req.headers['x-scribe-passkey'] as string;
    const isAuthenticated = (token && validSessionTokens.has(token)) || passkey === currentAdminPasskey;
    res.json({ isAuthenticated });
  });

  // Auth: Update passkey
  app.post('/api/auth/update-passkey', requireAdminAuth, (req, res) => {
    const { newPasskey } = req.body;
    if (!newPasskey || typeof newPasskey !== 'string' || newPasskey.length < 6) {
      return res.status(400).json({ error: 'Passkey must be at least 6 characters long.' });
    }
    currentAdminPasskey = newPasskey.trim();
    res.json({ success: true, message: 'Sacred Scribe Passkey successfully updated.' });
  });

  // Get all portfolio data
  app.get('/api/portfolio', (_req, res) => {
    const db = loadDatabase();
    res.json(db || {});
  });

  // Initialize or update full portfolio database
  app.post('/api/portfolio', (req, res) => {
    const data = req.body;
    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'Invalid payload' });
    }
    // Allow initial seeding without auth if db doesn't exist yet
    const existing = loadDatabase();
    if (existing) {
      const token = req.headers.authorization?.replace(/^Bearer\s+/, '') || (req.headers['x-scribe-token'] as string);
      const passkey = req.headers['x-scribe-passkey'] as string;
      if (!((token && validSessionTokens.has(token)) || passkey === currentAdminPasskey)) {
        return res.status(401).json({ error: 'Authentication required to update database.' });
      }
    }
    saveDatabase(data);
    res.json({ success: true, message: 'Portfolio database saved to server storage.' });
  });

  // --- PROJECTS ENDPOINTS ---

  app.post('/api/projects', requireAdminAuth, (req, res) => {
    const newProject = req.body;
    if (!newProject || !newProject.title) {
      return res.status(400).json({ error: 'Project title is required.' });
    }
    const db = loadDatabase() || { projects: [] };
    if (!db.projects) db.projects = [];

    const project = {
      ...newProject,
      id: newProject.id || `proj_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: newProject.createdAt || new Date().toISOString(),
      order: db.projects.length + 1,
    };

    db.projects.unshift(project);
    saveDatabase(db);
    res.status(201).json({ success: true, project });
  });

  app.put('/api/projects/:id', requireAdminAuth, (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const db = loadDatabase();
    if (!db || !Array.isArray(db.projects)) {
      return res.status(404).json({ error: 'Database not initialized.' });
    }

    const idx = db.projects.findIndex((p: any) => p.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    db.projects[idx] = {
      ...db.projects[idx],
      ...updates,
      id, // Preserve id
    };

    saveDatabase(db);
    res.json({ success: true, project: db.projects[idx] });
  });

  app.delete('/api/projects/:id', requireAdminAuth, (req, res) => {
    const { id } = req.params;
    const db = loadDatabase();
    if (!db || !Array.isArray(db.projects)) {
      return res.status(404).json({ error: 'Database not initialized.' });
    }

    createBackup(`before-delete-project-${id}`);
    db.projects = db.projects.filter((p: any) => p.id !== id);
    saveDatabase(db);
    res.json({ success: true, message: 'Project stricken from folio.' });
  });

  app.post('/api/projects/reorder', requireAdminAuth, (req, res) => {
    const { projectIds } = req.body;
    if (!Array.isArray(projectIds)) {
      return res.status(400).json({ error: 'projectIds array is required.' });
    }
    const db = loadDatabase();
    if (!db || !Array.isArray(db.projects)) {
      return res.status(404).json({ error: 'Database not initialized.' });
    }

    const projectMap = new Map(db.projects.map((p: any) => [p.id, p]));
    const reordered: any[] = [];

    projectIds.forEach((id: string, index: number) => {
      const item = projectMap.get(id);
      if (item) {
        reordered.push({ ...item, order: index + 1 });
        projectMap.delete(id);
      }
    });

    // Append any unlisted projects
    projectMap.forEach((item) => reordered.push(item));

    db.projects = reordered;
    saveDatabase(db);
    res.json({ success: true, projects: db.projects });
  });

  app.post('/api/projects/:id/duplicate', requireAdminAuth, (req, res) => {
    const { id } = req.params;
    const db = loadDatabase();
    if (!db || !Array.isArray(db.projects)) {
      return res.status(404).json({ error: 'Database not initialized.' });
    }

    const source = db.projects.find((p: any) => p.id === id);
    if (!source) {
      return res.status(404).json({ error: 'Source project not found.' });
    }

    const duplicated = {
      ...source,
      id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: `${source.title} (Copy)`,
      isPublished: false, // Start duplicates as draft
      createdAt: new Date().toISOString(),
    };

    const idx = db.projects.findIndex((p: any) => p.id === id);
    db.projects.splice(idx + 1, 0, duplicated);
    saveDatabase(db);
    res.status(201).json({ success: true, project: duplicated });
  });

  // --- HACKATHONS ENDPOINTS ---

  app.post('/api/hackathons', requireAdminAuth, (req, res) => {
    const newHack = req.body;
    if (!newHack || (!newHack.title && !newHack.hackathonName)) {
      return res.status(400).json({ error: 'Hackathon title is required.' });
    }
    const db = loadDatabase() || { hackathons: [] };
    if (!db.hackathons) db.hackathons = [];

    const hackathon = {
      ...newHack,
      id: newHack.id || `hack_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: newHack.title || newHack.hackathonName,
      createdAt: newHack.createdAt || new Date().toISOString(),
      order: db.hackathons.length + 1,
    };

    db.hackathons.unshift(hackathon);
    saveDatabase(db);
    res.status(201).json({ success: true, hackathon });
  });

  app.put('/api/hackathons/:id', requireAdminAuth, (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const db = loadDatabase();
    if (!db || !Array.isArray(db.hackathons)) {
      return res.status(404).json({ error: 'Database not initialized.' });
    }

    const idx = db.hackathons.findIndex((h: any) => h.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: 'Hackathon entry not found.' });
    }

    db.hackathons[idx] = {
      ...db.hackathons[idx],
      ...updates,
      id,
    };

    saveDatabase(db);
    res.json({ success: true, hackathon: db.hackathons[idx] });
  });

  app.delete('/api/hackathons/:id', requireAdminAuth, (req, res) => {
    const { id } = req.params;
    const db = loadDatabase();
    if (!db || !Array.isArray(db.hackathons)) {
      return res.status(404).json({ error: 'Database not initialized.' });
    }

    createBackup(`before-delete-hackathon-${id}`);
    db.hackathons = db.hackathons.filter((h: any) => h.id !== id);
    saveDatabase(db);
    res.json({ success: true, message: 'Hackathon chronicle stricken from folio.' });
  });

  app.post('/api/hackathons/reorder', requireAdminAuth, (req, res) => {
    const { hackathonIds } = req.body;
    if (!Array.isArray(hackathonIds)) {
      return res.status(400).json({ error: 'hackathonIds array is required.' });
    }
    const db = loadDatabase();
    if (!db || !Array.isArray(db.hackathons)) {
      return res.status(404).json({ error: 'Database not initialized.' });
    }

    const map = new Map(db.hackathons.map((h: any) => [h.id, h]));
    const reordered: any[] = [];

    hackathonIds.forEach((id: string, index: number) => {
      const item = map.get(id);
      if (item) {
        reordered.push({ ...item, order: index + 1 });
        map.delete(id);
      }
    });

    map.forEach((item) => reordered.push(item));

    db.hackathons = reordered;
    saveDatabase(db);
    res.json({ success: true, hackathons: db.hackathons });
  });

  app.post('/api/hackathons/:id/duplicate', requireAdminAuth, (req, res) => {
    const { id } = req.params;
    const db = loadDatabase();
    if (!db || !Array.isArray(db.hackathons)) {
      return res.status(404).json({ error: 'Database not initialized.' });
    }

    const source = db.hackathons.find((h: any) => h.id === id);
    if (!source) {
      return res.status(404).json({ error: 'Source hackathon not found.' });
    }

    const duplicated = {
      ...source,
      id: `hack_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: `${source.title} (Copy)`,
      isPublished: false,
      createdAt: new Date().toISOString(),
    };

    const idx = db.hackathons.findIndex((h: any) => h.id === id);
    db.hackathons.splice(idx + 1, 0, duplicated);
    saveDatabase(db);
    res.status(201).json({ success: true, hackathon: duplicated });
  });

  // --- UPLOAD ENDPOINT ---

  app.post('/api/upload', requireAdminAuth, (req, res) => {
    const { dataUrl, filename: suggestedName } = req.body;
    if (!dataUrl || typeof dataUrl !== 'string') {
      return res.status(400).json({ error: 'dataUrl base64 string is required.' });
    }

    const match = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!match) {
      return res.status(400).json({ error: 'Invalid dataUrl format.' });
    }

    const mimeType = match[1];
    const base64Data = match[2];
    const buffer = Buffer.from(base64Data, 'base64');

    const ext = mimeType.split('/')[1]?.replace('jpeg', 'jpg') || 'png';
    const sanitizedBase = (suggestedName || 'upload')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 30);
    const filename = `${Date.now()}_${sanitizedBase}.${ext}`;
    const filePath = path.resolve(UPLOADS_DIR, filename);

    try {
      fs.writeFileSync(filePath, buffer);
      const url = `/uploads/${filename}`;
      res.json({
        success: true,
        url,
        filename,
        size: buffer.length,
        mimeType,
      });
    } catch (e: any) {
      console.error('Error writing uploaded file:', e);
      res.status(500).json({ error: 'Failed to write uploaded file to persistent storage.' });
    }
  });

  // --- IMPORT & EXPORT ENDPOINTS ---

  app.get('/api/export', (_req, res) => {
    const db = loadDatabase() || {};
    const exportPayload = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      author: 'Rohan Prabhash',
      ...db,
    };
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="rohan-prabhash-archive-${Date.now()}.json"`);
    res.send(JSON.stringify(exportPayload, null, 2));
  });

  app.post('/api/import', requireAdminAuth, (req, res) => {
    const payload = req.body;
    const { overwrite = false } = req.query;

    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ error: 'Invalid JSON payload.' });
    }

    // Validation Report
    const errors: string[] = [];
    const warnings: string[] = [];
    let projectCount = 0;
    let hackathonCount = 0;

    if (payload.projects) {
      if (!Array.isArray(payload.projects)) {
        errors.push('"projects" must be an array.');
      } else {
        payload.projects.forEach((p: any, idx: number) => {
          if (!p || typeof p !== 'object') {
            errors.push(`Project at index ${idx} is not an object.`);
          } else if (!p.title) {
            errors.push(`Project at index ${idx} is missing a title.`);
          } else {
            projectCount++;
          }
        });
      }
    }

    if (payload.hackathons) {
      if (!Array.isArray(payload.hackathons)) {
        errors.push('"hackathons" must be an array.');
      } else {
        payload.hackathons.forEach((h: any, idx: number) => {
          if (!h || typeof h !== 'object') {
            errors.push(`Hackathon at index ${idx} is not an object.`);
          } else if (!h.title && !h.hackathonName) {
            errors.push(`Hackathon at index ${idx} is missing a title.`);
          } else {
            hackathonCount++;
          }
        });
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
        warnings,
        message: 'Import validation failed. Check schema errors.',
      });
    }

    // Create automatic safety backup before performing changes
    const backupFile = createBackup('pre-import');

    const db = loadDatabase() || {};
    let finalProjects = overwrite ? [] : [...(db.projects || [])];
    let finalHackathons = overwrite ? [] : [...(db.hackathons || [])];
    let duplicatesSkipped = 0;

    if (Array.isArray(payload.projects)) {
      payload.projects.forEach((newP: any) => {
        const existingIdx = finalProjects.findIndex(
          (p) => p.id === newP.id || p.title.toLowerCase() === newP.title?.toLowerCase()
        );
        if (existingIdx !== -1) {
          if (overwrite) {
            finalProjects[existingIdx] = newP;
          } else {
            duplicatesSkipped++;
          }
        } else {
          finalProjects.push(newP);
        }
      });
    }

    if (Array.isArray(payload.hackathons)) {
      payload.hackathons.forEach((newH: any) => {
        const hTitle = newH.title || newH.hackathonName;
        const existingIdx = finalHackathons.findIndex(
          (h) => h.id === newH.id || (h.title || h.hackathonName)?.toLowerCase() === hTitle?.toLowerCase()
        );
        if (existingIdx !== -1) {
          if (overwrite) {
            finalHackathons[existingIdx] = newH;
          } else {
            duplicatesSkipped++;
          }
        } else {
          finalHackathons.push(newH);
        }
      });
    }

    db.projects = finalProjects;
    db.hackathons = finalHackathons;

    if (payload.profile) db.profile = payload.profile;
    if (payload.skills) db.skills = payload.skills;
    if (payload.experience) db.experience = payload.experience;
    if (payload.certifications) db.certifications = payload.certifications;

    saveDatabase(db);

    res.json({
      success: true,
      importedProjects: projectCount,
      importedHackathons: hackathonCount,
      duplicatesSkipped,
      totalProjects: finalProjects.length,
      totalHackathons: finalHackathons.length,
      backupFile: backupFile ? path.basename(backupFile) : null,
      message: 'Archive records successfully integrated into sacred manuscript database.',
    });
  });

  // --- VITE DEV OR PRODUCTION STATIC SERVE ---
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ Rohan Prabhash Purana Portfolio Server active on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
