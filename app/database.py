from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv
from pathlib import Path

# .env dosyasının yolunu net olarak belirt
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

DATABASE_URL = 'postgresql://neondb_owner:npg_dyiFWhpA0k6v@ep-billowing-term-ai0t0t24-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

if not DATABASE_URL:
    raise Exception("❌ DATABASE_URL bulunamadı! .env dosyasını kontrol et.")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()