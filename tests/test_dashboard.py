from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_dashboard_summary():
    login = client.post("/auth/login", json={"email": "sema@example.com", "password": "1234"})
    token = login.json()["access_token"]

    response = client.get(
        "/dashboard/summary",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "total_sales" in data
    assert "total_revenue" in data
    assert "active_users" in data
    assert "total_users" in data


def test_dashboard_without_token():
    response = client.get("/dashboard/summary")
    assert response.status_code == 401
