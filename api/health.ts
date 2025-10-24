import type { VercelRequest, VercelResponse } from '@vercel/node';
import { withCORS } from './_cors';

export default function handler(req: VercelRequest, res: VercelResponse) {
  withCORS(res);
  if (req.method === 'OPTIONS') return res.status(200).end();   // preflight
  res.status(200).json({ status: 'ok' });
}
