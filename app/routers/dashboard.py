from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models.sale import Sale
from app.routers.auth import get_current_user
from app.models.user import User
from app.schemas.dashboard import DashboardSummary
router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/summary", response_model=DashboardSummary)
def summary(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    total_sales=db.query(Sale).filter(
        Sale.user_id == current_user.id
    ).count()

    total_revenue = db.query(func.sum(Sale.amount)).filter(
        Sale.user_id == current_user.id
    ).scalar() or 0

    return DashboardSummary(total_sales=total_sales, total_revenue=float(total_revenue))