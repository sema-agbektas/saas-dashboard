# SaaS Dashboard

A full-stack SaaS dashboard with authentication, sales tracking, and Stripe payments.

**Live Demo:** [saas-dashboard-rim8.onrender.com](https://saas-dashboard-rim8.onrender.com)

## Tech Stack

**Backend:** FastAPI · PostgreSQL · SQLAlchemy · Alembic · JWT · Stripe  
**Frontend:** React · Vite · Tailwind CSS · React Query  
**DevOps:** Docker · Render · Vercel

## Features

- JWT authentication (register / login)
- Sales tracking with category filtering
- Revenue analytics with date range filter
- Stripe checkout integration
- Password change endpoint
- Dark mode
- Responsive design

## Running Locally

**Backend**
```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

**Environment variables** — create a `.env` file in the root:
```
DATABASE_URL=your_postgres_url
SECRET_KEY=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
FRONTEND_URL=http://localhost:5173
```

## API Docs

Available at `http://localhost:8000/docs` when running locally.
