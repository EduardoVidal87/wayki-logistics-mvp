import type { VercelRequest, VercelResponse } from '@vercel/node';

// ⚠️ Memoria efímera (sirve para demo). Para persistir: Vercel KV o Supabase.
const ORDERS: Record<string, any> = {};

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { cliente_id, origen_id, destino_id, peso_kg, volumen_m3, pallets } = req.body || {};
    if (!cliente_id || !origen_id || !destino_id) {
      return res.status(400).json({ error: 'Faltan campos' });
    }
    const id = crypto.randomUUID();
    ORDERS[id] = { id, estado: 'CREADO', cliente_id, origen_id, destino_id, peso_kg, volumen_m3, pallets };
    return res.status(201).json({ id, estado: 'CREADO' });
  }

  if (req.method === 'GET') {
    const { id } = req.query;
    if (!id || Array.isArray(id)) return res.status(400).json({ error: 'id requerido' });
    const o = ORDERS[id];
    if (!o) return res.status(404).json({ error: 'No existe' });
    return res.status(200).json(o);
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).end('Method Not Allowed');
}
