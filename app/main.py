from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth

app = FastAPI(title="SaaS Dashboard API")

#cors ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tüm kaynaklara izin ver (geliştirme için)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#routerları ekle
app.include_router(auth.router)
@app.get("/")
def home():
    return {"message": "SAAS Dashboard API is running!"}
@app.get("/health")
def health():
    return {"status": "healthy", "database": "connected"}