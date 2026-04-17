# Real-Time Quiz Platform

A full-stack, production-ready Real-Time Quiz Platform built with React, Vite, Node.js, Express, Socket.io, and MySQL.

## Features
- **Student Module:** Guest and logged-in mode, Dashboard, normal and live quizzes, tab-switch cheating detection.
- **Teacher Module:** Dashboard with quiz management, creation, live socket tracking.
- **AI Integration:** Generation of questions & student analysis.
- **Real-Time:** Socket.io driven live quizzes with live graph distribution of answers.
- **Security:** JWT role-based Auth, Bcrypt.

---

## 🚀 Deployment Guide

This app is separated into a `frontend` (React + Vite) and `backend` (Node + Express).

### 1. Database (MySQL Cloud)
We recommend string your database on an provider like Aiven, PlanetScale, or a DigitalOcean droplet.
Run the provided `schema.sql` file via your MySQL client against your remote host.
*Command example:*
`mysql -u your_user -p -h your_host < schema.sql`

### 2. Backend (Render / Railway)
1. Push your repository to GitHub.
2. Sign in to Render or Railway and create a **Web Service**.
3. Connect your GitHub repository.
4. Set the Root Directory to `backend/`.
5. Environment Variables REQUIRED:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (From step 1)
   - `JWT_SECRET` & `JWT_REFRESH_SECRET`
   - `AI_API_KEY` (e.g., your Gemini API Key)
6. Build Command: `npm install`
7. Start Command: `node src/server.js`

### 3. Frontend (Vercel)
1. Sign in to Vercel and create a new project.
2. Import the same GitHub repository.
3. Set the **Root Directory** to `frontend`.
4. Framework Preset: **Vite**
5. Set Environment Variables:
   - `VITE_API_BASE_URL` = (Your deployed backend URL, e.g. `https://your-api.onrender.com/api`)
   - `VITE_SOCKET_URL` = (Your deployed backend URL)
6. Deploy! Vercel handles the `npm run build` command automatically.

---

## 🛠 Local Setup

### Backend
```sh
cd backend
npm install
npm run dev
```

### Frontend
```sh
cd frontend
npm install
npm run dev
```
