import type { VercelRequest, VercelResponse } from '@vercel/node'
import { withCORS } from './_cors'
import { kv } from '@vercel/kv'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  withCORS(res)
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'POST') {
    const { cliente_id, origen_id, destino_id, peso_kg, volumen_m3, pallets } = req.body || {}
    if (!cliente_id || !origen_id || !destino_id) {
      return res.status(400).json({ error: 'Faltan campos' })
    }
    const id = crypto.randomUUID()
    const orden = { id, estado: 'CREADO', cliente_id, origen_id, destino_id, peso_kg, volumen_m3, pallets, created_at: Date.now() }

    await kv.hset(`order:${id}`, orden) // guarda orden
    await kv.lpush('orders', id)        // índice simple

    return res.status(201).json({ id, estado: 'CREADO' })
  }

  if (req.method === 'GET') {
    const { id } = req.query
    if (!id || Array.isArray(id)) return res.status(400).json({ error: 'id requerido' })
    const orden = await kv.hgetall<Record<string, any>>(`order:${id}`)
    if (!orden || !orden.id) return res.status(404).json({ error: 'No existe' })
    return res.status(200).json(orden)
  }

  res.setHeader('Allow', 'GET, POST, OPTIONS')
  return res.status(405).end('Method Not Allowed')
}

