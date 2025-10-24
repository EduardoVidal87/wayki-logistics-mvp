import type { VercelRequest, VercelResponse } from '@vercel/node'
import { withCORS } from './_cors'
import { kv } from '@vercel/kv'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  withCORS(res)
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') return res.status(405).end('Method Not Allowed')

  const ids = await kv.lrange<string>('orders', 0, 19)
  const orders = (await Promise.all(ids.map(id => kv.hgetall<Record<string, any>>(`order:${id}`))))
    .filter(o => o && o.id)
    .sort((a, b) => (b.created_at ?? 0) - (a.created_at ?? 0))

  return res.status(200).json({ items: orders })
}
