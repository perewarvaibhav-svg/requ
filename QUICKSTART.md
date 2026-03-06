# AgriSaathi - Quick Start Guide

## Setup (First Time Only)

```bash
# 1. Install frontend dependencies
npm install

# 2. Install backend dependencies
cd ml-backend
pip install -r requirements.txt
cd ..

# 3. Configure environment (optional)
# Create ml-backend/.env with your API keys
```

## Run the Application

```bash
npm run dev
```

That's it! This single command starts:
- ✅ Frontend on http://localhost:3000
- ✅ Backend on http://localhost:8000 (internal)

## What Happens?

```
npm run dev
    ↓
Runs concurrently:
    ├─ npm run dev:frontend  → Next.js dev server (port 3000)
    └─ npm run dev:backend   → FastAPI server (port 8000)
```

## Access the App

Open your browser: **http://localhost:3000**

All API calls automatically proxy to the backend.

## Stop the Servers

Press `Ctrl+C` in the terminal.

## Troubleshooting

**First time running?**
```bash
npm install
```

**Backend not starting?**
```bash
cd ml-backend
pip install uvicorn fastapi
```

**Port already in use?**
```bash
# Kill port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

## Alternative Start Methods

**Using batch file:**
```bash
start.bat
```

**Manual start (two terminals):**
```bash
# Terminal 1
npm run dev:frontend

# Terminal 2
npm run dev:backend
```

## Production Build

```bash
npm run build
npm start
```

Enjoy! 🌾
