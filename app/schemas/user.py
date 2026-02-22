from pydantic import BaseModel, EmailStr
from typing import Optional
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str | None = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    full_name: str | None = None
    is_active: bool
    
    class Config:
        from_attributes = True

class TokenData(BaseModel):
    email: Optional[str] = None