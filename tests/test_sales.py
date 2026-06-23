from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_sale():
    login =client.post("/auth/login",json={"email":"sema@example.com","password":"1234"})
    token =login.json()["access_token"]

    response=client.post(
        "/sales",
        json={"amount":100.0},
        headers={"Authorization": f"Bearer {token}"}

    )
    assert response.status_code==200

def test_create_sale_without_token():
    response =client.post("/sales",json={"amount":100.0})
    assert response.status_code == 401