# AgriSaathi - API Keys Setup Guide

## 🚨 Required API Keys

To use AgriSaathi, you need at least these two API keys:

### 1. AI Service (Choose ONE)

#### Option A: Groq (Recommended - Fast & Free) ⭐
1. Go to https://console.groq.com/keys
2. Sign up with Google/GitHub
3. Click "Create API Key"
4. Copy the key (starts with `gsk_`)
5. Add to `ml-backend/.env`:
   ```
   GROQ_API_KEY=gsk_your_key_here
   ```

#### Option B: Google Gemini (Alternative)
1. Go to https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key
5. Add to `ml-backend/.env`:
   ```
   GEMINI_API_KEY=your_key_here
   ```

### 2. Weather Service (Required)

#### OpenWeather API
1. Go to https://home.openweathermap.org/users/sign_up
2. Sign up for free account
3. Go to https://home.openweathermap.org/api_keys
4. Copy your API key
5. Add to `ml-backend/.env`:
   ```
   OPENWEATHER_API_KEY=your_key_here
   ```

## ✅ Quick Setup

1. **Copy the example file:**
   ```bash
   cd ml-backend
   copy .env.example .env
   ```

2. **Edit `ml-backend/.env` and add your keys:**
   ```env
   # Required
   GROQ_API_KEY=gsk_your_groq_key_here
   OPENWEATHER_API_KEY=your_openweather_key_here
   
   # Optional (can leave empty)
   SUPABASE_URL=
   SUPABASE_KEY=
   TELEGRAM_BOT_TOKEN=
   TWILIO_ACCOUNT_SID=
   TWILIO_AUTH_TOKEN=
   TWILIO_PHONE_NUMBER=
   DATA_GOV_API_KEY=
   SENTINEL_CLIENT_ID=
   SENTINEL_CLIENT_SECRET=
   ```

3. **Restart the server:**
   ```bash
   npm run dev
   ```

## 📋 Optional API Keys

These are optional and only needed for specific features:

### Supabase (Database)
- **What it does**: Stores user data, farmer profiles
- **Get it**: https://supabase.com/dashboard/project/_/settings/api
- **Free tier**: Yes

### Telegram Bot (Notifications)
- **What it does**: Sends weather alerts via Telegram
- **Get it**: Message @BotFather on Telegram → `/newbot`
- **Free tier**: Yes

### Twilio (SMS/Voice)
- **What it does**: Sends SMS and voice call alerts
- **Get it**: https://console.twilio.com
- **Free tier**: Trial credits

### Data.gov.in (Market Prices)
- **What it does**: Real-time crop market prices
- **Get it**: https://data.gov.in/
- **Free tier**: Yes

### Sentinel Hub (Satellite)
- **What it does**: Satellite imagery for crop monitoring
- **Get it**: https://www.sentinel-hub.com/
- **Free tier**: Limited

## 🔍 Troubleshooting

### "Offline mode" error
- **Cause**: Missing GROQ_API_KEY or GEMINI_API_KEY
- **Fix**: Add at least one AI API key to `.env`

### "Weather fetch failed"
- **Cause**: Missing or invalid OPENWEATHER_API_KEY
- **Fix**: Get a free key from OpenWeather and add to `.env`

### Backend not starting
- **Cause**: Missing `.env` file
- **Fix**: Copy `.env.example` to `.env` and add your keys

## 💡 Tips

1. **Start with Groq**: It's the fastest and easiest to set up
2. **OpenWeather is free**: No credit card required
3. **Optional keys can wait**: You can add them later as needed
4. **Keep keys secret**: Never commit `.env` to git (it's in `.gitignore`)

## 🎯 Minimum Setup (2 minutes)

Just need these two:
1. Groq API Key (30 seconds to get)
2. OpenWeather API Key (1 minute to get)

That's it! Everything else is optional.
