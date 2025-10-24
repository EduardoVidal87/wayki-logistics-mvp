import type { VercelResponse } from '@vercel/node';

export function withCORS(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');            // en prod: pon tu dominio de Pages
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
