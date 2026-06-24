from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# Temel Sale şeması
class SaleBase(BaseModel):
    amount: float

# Create işlemi için - sadece gerekli alanlar
class SaleCreate(SaleBase):
    category: Optional[str] = None

class SaleResponse(SaleBase):
    id: int
    created_at: datetime
    user_id: int
    category: Optional[str] = None
    
    class Config:
        from_attributes = True