from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# Temel Sale şeması
class SaleBase(BaseModel):
    amount: float

# Create işlemi için - sadece gerekli alanlar
class SaleCreate(SaleBase):
    pass  # amount zaten SaleBase'den geliyor

# Response için - tüm alanlar
class SaleResponse(SaleBase):
    id: int
    created_at: datetime
    user_id: int
    
    class Config:
        from_attributes = True