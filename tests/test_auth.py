import uuid
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_login_success():
    response = client.post("/auth/login", json={"email": "sema@example.com", "password": "1234"})
    assert response.status_code == 200
    assert "access_token" in response.json()


def test_login_wrong_password():
    response = client.post("/auth/login", json={"email": "sema@example.com", "password": "yanlis"})
    assert response.status_code == 401


def test_login_wrong_email():
    response = client.post("/auth/login", json={"email": "yok@example.com", "password": "1234"})
    assert response.status_code == 401

def test_register_success():
    unique_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
    response = client.post("/auth/register", json={"email": unique_email, "password": "1234", "full_name": "Test User"})
    assert response.status_code == 201