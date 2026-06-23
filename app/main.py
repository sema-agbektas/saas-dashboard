from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import traceback
import logging
from app.routers import auth, dashboard, sales, payments
from app.database import Base

# Logger konfigürasyonu
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(title="SaaS Dashboard API")

# CORS Ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://saas-dashboard-fyg4.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global hata yakalandı: {exc}\n{traceback.format_exc()}")
    return JSONResponse(
        status_code=500,
        content={"message": "Sunucuda beklenmeyen bir hata oluştu.", "details": str(exc)},
    )

# Router'ları ekle
app.include_router(auth.router)
app.include_router(dashboard.router)
app.include_router(sales.router)
app.include_router(payments.router)

@app.on_event("startup")
async def startup_event():
    logger.info("Uygulama başlatıldı.")

@app.get("/")
def root():
    return {"message": "API çalışıyor"}

@app.get("/health")
def health_check():
    return {"status": "ok"}