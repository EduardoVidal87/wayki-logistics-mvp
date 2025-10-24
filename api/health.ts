// /api/health.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // CORS básico (por si pruebas desde otra origin)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }

    return res.status(200).json({ status: 'ok', ts: Date.now() });
  } catch (err) {
    console.error('health crashed:', err);
    return res.status(500).json({ error: 'Health failed' });
  }
}
