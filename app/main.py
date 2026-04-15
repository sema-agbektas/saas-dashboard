from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth,dashboard,sales
app = FastAPI()

# TÜM CORS AYARLARINI AÇ
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
     "https://saas-dashboard-fyg4.vercel.app",  # bunu ekle
    "https://saas-dashboard-api-tj2g.onrender.com"  # backend URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(dashboard.router)
app.include_router(sales.router)
@app.get("/")
def root():
    return {"message": "API çalışıyor"}

@app.get("/health")
def health_check():
    return {"status": "ok"}