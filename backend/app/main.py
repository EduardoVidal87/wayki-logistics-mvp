from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid

app = FastAPI(title="Wayki Logistics API", version="0.1.0")

# En prod, cambia "*" por tu dominio de Pages
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

class OrderCreate(BaseModel):
    cliente_id: str
    origen_id: str
    destino_id: str
    peso_kg: float
    volumen_m3: float
    pallets: int

ORDERS = {}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/orders")
def create_order(payload: OrderCreate):
    oid = str(uuid.uuid4())
    ORDERS[oid] = {"id": oid, "estado": "CREADO", **payload.model_dict()}
    return {"id": oid, "estado": "CREADO"}

@app.get("/orders/{order_id}")
def get_order(order_id: str):
    o = ORDERS.get(order_id)
    if not o:
        raise HTTPException(404, "No existe")
    return o
