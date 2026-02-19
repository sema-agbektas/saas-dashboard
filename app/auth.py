from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
import os
from typing import Optional

# Çevre değişkenlerini yükle (production'da .env dosyasından alınmalı)
SECRET_KEY = os.getenv("SECRET_KEY", "super-gizli-anahtar-degistirilmeli")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str) -> str:
    """
    Şifreyi hash'ler.
    
    Args:
        password: Düz metin şifre
    
    Returns:
        Hash'lenmiş şifre
    """
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Düz şifre ile hash'lenmiş şifreyi karşılaştırır.
    
    Args:
        plain_password: Düz metin şifre
        hashed_password: Hash'lenmiş şifre
    
    Returns:
        Şifreler eşleşiyorsa True, değilse False
    """
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    JWT access token oluşturur.
    
    Args:
        data: Token içine eklenecek veriler (genellikle {"sub": email})
        expires_delta: Token süresi (opsiyonel, varsayılan 30 dakika)
    
    Returns:
        JWT token string'i
    """
    to_encode = data.copy()
    
    # Token süresini belirle
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    # Token'a süre bilgisini ekle
    to_encode.update({"exp": expire})
    
    # Token'ı oluştur
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return encoded_jwt


def decode_access_token(token: str) -> Optional[str]:
    """
    JWT token'ı çözer ve email'i (sub) döndürür.
    
    Args:
        token: Çözülecek JWT token
    
    Returns:
        Geçerli token'da email adresi, geçersiz veya süresi dolmuş token'da None
    """
    try:
        # Token'ı çöz
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        # Email bilgisini al
        email: str = payload.get("sub")
        
        if email is None:
            return None
            
        return email
        
    except JWTError:
        # Token geçersiz veya süresi dolmuş
        return None
    except Exception:
        # Diğer hatalar
        return None


# Test fonksiyonu (opsiyonel)
if __name__ == "__main__":
    # Test için örnek kullanım
    test_password = "gizlişifre123"
    hashed = get_password_hash(test_password)
    print(f"Hash'lenmiş şifre: {hashed}")
    print(f"Şifre doğrulama: {verify_password(test_password, hashed)}")
    
    # Token testi
    test_email = "test@example.com"
    token = create_access_token(data={"sub": test_email})
    print(f"Oluşturulan token: {token}")
    
    decoded_email = decode_access_token(token)
    print(f"Çözülen email: {decoded_email}")