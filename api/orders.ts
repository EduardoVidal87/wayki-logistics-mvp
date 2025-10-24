import type { VercelRequest, VercelResponse } from '@vercel/node';
import { withCORS } from './_cors';
import { kv } from '@vercel/kv';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  withCORS(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = req.body ?? {};
  const id = await kv.incr('orders:seq');
  await kv.set(`orders:${id}`, body);
  return res.status(201).json({ id });
}


