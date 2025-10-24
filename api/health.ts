// /api/health.ts

export default async function handler(req: any, res: any) {
  // CORS básico para pruebas (ajústalo para producción)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    return res.status(200).json({ status: 'ok', ts: Date.now() });
  } catch (err) {
    console.error('health crashed:', err);
    return res.status(500).json({ error: 'Health failed' });
  }
}
