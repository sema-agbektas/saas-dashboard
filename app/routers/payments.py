import stripe
from fastapi import APIRouter, Depends, HTTPException
from app.config import settings
from app.routers.auth import get_current_user
from app.models.user import User

stripe.api_key = settings.STRIPE_SECRET_KEY

router = APIRouter(prefix="/payments", tags=["payments"])


@router.post("/create-checkout-session")
def create_checkout_session(current_user: User = Depends(get_current_user)):
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": "usd",
                    "product_data": {"name": "SaaS Dashboard Pro"},
                    "unit_amount": 1000,
                },
                "quantity": 1,
            }],
            mode="payment",
            success_url=f"{settings.FRONTEND_URL}/success",
            cancel_url=f"{settings.FRONTEND_URL}/cancel",
        )
        return {"checkout_url": session.url}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
