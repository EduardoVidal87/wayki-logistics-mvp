import { useState } from "react";

// Usa tu dominio EXACTO de Vercel:
const API = "https://wayki-logistics-mvp.vercel.app";

export default function App() {
  const [status, setStatus] = useState("(sin probar)");
  const [orderId, setOrderId] = useState("");

  async function probarAPI() {
    try {
      const r = await fetch(`${API}/api/health`);
      setStatus(JSON.stringify(await r.json()));
    } catch {
      setStatus("No se pudo conectar a la API");
    }
  }

  async function crearOrdenDemo() {
    try {
      const body = {
        cliente_id: "C-001",
        origen_id: "LOC-01",
        destino_id: "LOC-18",
        peso_kg: 1200,
        volumen_m3: 6.5,
        pallets: 5
      };
      const r = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await r.json();
      setOrderId(data.id || "(sin id)");
    } catch {
      setOrderId("(error)");
    }
  }

  async function verOrden() {
    if (!orderId) return;
    const r = await fetch(`${API}/api/orders?id=${orderId}`);
    alert(JSON.stringify(await r.json(), null, 2));
  }

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif", maxWidth: 800 }}>
      <h1>Wayki Logistics</h1>
      <p>Web en GitHub Pages + API en Vercel</p>

      <hr />
      <h3>1) Probar API</h3>
      <button onClick={probarAPI}>Probar /api/health</button>
      <p>Respuesta: {status}</p>

      <h3>2) Crear orden</h3>
      <button onClick={crearOrdenDemo}>Crear orden demo</button>
      <p>ID de orden: {orderId}</p>

      <button disabled={!orderId} onClick={verOrden}>Ver orden</button>
    </div>
  );
}
