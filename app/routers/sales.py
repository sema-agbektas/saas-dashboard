from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.sales import Sale
from app.schemas.sales import SaleCreate, SaleResponse  # SaleResponse'u import et
from app.routers.auth import get_current_user
from app.models.user import User
from datetime import datetime, timedelta
from fastapi import Query
router = APIRouter(prefix="/sales", tags=["sales"])

@router.post("", response_model=SaleResponse)  # Response model ekle
def create_sale(
    sale_data: SaleCreate,  # Artık sadece amount içerir
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    new_sale = Sale(amount=sale_data.amount, user_id=current_user.id)
    db.add(new_sale)
    db.commit()
    db.refresh(new_sale)
    return new_sale  # SQLAlchemy modeli otomatik SaleResponse'a dönüşür

@router.get("", response_model=list[SaleResponse])
def list_sales(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    sales = db.query(Sale).filter(Sale.user_id == current_user.id).all()
    return sales  # Direkt SQLAlchemy modellerini döndür

@router.get ("/filter")
def get_sales_filtered(
    days: int = Query(7, description="Number of days to filter sales"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    cutoff_date = datetime.utcnow() - timedelta(days=days)
    sales = db.query(Sale).filter(
        Sale.user_id == current_user.id,
        Sale.created_at >= cutoff_date
    ).all()
    return sales  # Direkt SQLAlchemy modellerini döndür