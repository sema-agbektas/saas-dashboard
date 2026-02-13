from database import engine, Base
from models.user import User

print("🚀 Database bağlantısı test ediliyor...")
print("=" * 50)

try:
    # Tabloları oluştur
    Base.metadata.create_all(bind=engine)
    print("✅ Tablolar başarıyla oluşturuldu!")
    print("✅ Database bağlantısı başarılı!")
    print("=" * 50)
    print("📊 Oluşturulan tablo: users")
    
except Exception as e:
    print(f"❌ Hata oluştu: {e}")
    print("=" * 50)