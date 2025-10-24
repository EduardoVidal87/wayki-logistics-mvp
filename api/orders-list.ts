import type { VercelRequest, VercelResponse } from '@vercel/node';
import { withCORS } from './_cors';
import { kv } from '@vercel/kv';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  withCORS(res);
  if (req.method === 'OPTIONS') return res.status(204).end();

  const seq = (await kv.get<number>('orders:seq')) ?? 0;
  const items: Array<{ id: number; order: unknown }> = [];

  for (let i = Math.max(seq - 50, 1); i <= seq; i++) {
    const order = await kv.get(`orders:${i}`);
    if (order != null) items.push({ id: i, order });
  }
  return res.status(200).json({ count: items.length, items });
}
