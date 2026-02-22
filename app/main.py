from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, sale
from app.database import engine, Base
from app.models.user import User  # sale import'unu kaldırdık
# from app.models.sale import Sale  # Eğer direkt model import etmek isterseniz
from app.routers import dashboard  # Dashboard router'ını ekleyelim
app = FastAPI(title="SaaS Dashboard API")

# Tabloları oluştur
Base.metadata.create_all(bind=engine)

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tüm kaynaklara izin ver (geliştirme için)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routerları ekle

app.include_router(auth.router)
app.include_router(sale.router)
app.include_router(dashboard.router)  # Dashboard router'ını ekleyelim
@app.get("/")
def home():
    return {"message": "SAAS Dashboard API is running!"}

@app.get("/health")
def health():
    return {"status": "healthy", "database": "connected"}