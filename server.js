import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs-extra';
import { nanoid } from 'nanoid';

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_DIR = './data';
const LOGIN_HISTORY_FILE = `${DATA_DIR}/login-history.json`;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

async function ensureStorage() {
  await fs.ensureDir(DATA_DIR);
  const exists = await fs.pathExists(LOGIN_HISTORY_FILE);
  if (!exists) {
    await fs.writeJson(LOGIN_HISTORY_FILE, []);
  }
}

async function readHistory() {
  await ensureStorage();
  return fs.readJson(LOGIN_HISTORY_FILE);
}

async function writeHistory(entries) {
  await ensureStorage();
  await fs.writeJson(LOGIN_HISTORY_FILE, entries, { spaces: 2 });
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Record a login event
app.post('/api/login-history', async (req, res) => {
  try {
    const { userId, email, role, ip, userAgent, status } = req.body || {};
    const entry = {
      id: nanoid(),
      userId: userId ?? null,
      email: email ?? null,
      role: role ?? null,
      ip: ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || null,
      userAgent: userAgent || req.headers['user-agent'] || null,
      status: status || 'success',
      ts: Date.now()
    };

    const entries = await readHistory();
    entries.unshift(entry);
    await writeHistory(entries.slice(0, 1000)); // keep last 1000
    res.status(201).json({ ok: true, entry });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Get history, optionally filtered by email
app.get('/api/login-history', async (req, res) => {
  try {
    const { email } = req.query;
    const entries = await readHistory();
    const filtered = email ? entries.filter(e => (e.email || '').toLowerCase() === String(email).toLowerCase()) : entries;
    res.json({ ok: true, entries: filtered });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Login history server running on http://localhost:${PORT}`);
});


