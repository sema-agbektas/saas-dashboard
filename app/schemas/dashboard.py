from pydantic import BaseModel

class DashboardSummary(BaseModel):
    total_sales: int
    total_revenue: float
    active_users: int
    total_users:int