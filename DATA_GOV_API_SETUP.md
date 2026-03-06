# How to Get DATA_GOV_API_KEY for Live Market Prices

## Current Status
✅ **Market Prices feature works with MOCK DATA** (realistic demo prices)
🔄 **Optional**: Add real API key for live government mandi data

## Why Get the Real API Key?
- **Live Data**: Real-time prices from 6000+ mandis across India
- **Accurate**: Official data from Agricultural Produce Market Committees (APMCs)
- **Updated Daily**: Fresh wholesale prices updated every morning
- **Government Source**: Trusted data from Ministry of Agriculture

## Step-by-Step Guide

### 1. Visit Data.gov.in
Go to: **https://data.gov.in/**

### 2. Register for Account
- Click **"Register"** (top right corner)
- Fill in details:
  - Full Name
  - Email Address
  - Organization: Can write "Individual" or "Student Project"
  - Mobile Number (Indian number required)
  - Create Password

### 3. Verify Email
- Check your email inbox
- Click the verification link sent by data.gov.in
- This activates your account

### 4. Login
- Go back to https://data.gov.in/
- Click **"Login"**
- Enter your email and password

### 5. Get Your API Key
- After login, click on your **username** (top right)
- Select **"My Account"** or **"Profile"**
- Look for **"API Access"** or **"API Key"** section
- Your API key will be displayed (long alphanumeric string)
- Click **"Copy"** or manually copy the key

### 6. Add to Your Project
Open `ml-backend/.env` and add:
```env
DATA_GOV_API_KEY=your_api_key_here
```

### 7. Restart Backend
```bash
# Stop the current backend (Ctrl+C)
# Then restart:
npm run dev
```

## API Details

### Endpoint Used
```
https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070
```

### Dataset Name
"Daily Wholesale Prices of certain Agricultural Commodities"

### What Data You Get
- **Commodity**: Rice, Wheat, Cotton, etc.
- **State**: Maharashtra, Punjab, Gujarat, etc.
- **Market Centers**: Individual mandi names
- **Prices**: Modal, Minimum, Maximum (₹/quintal)
- **Date**: Arrival date of produce
- **Variety**: Specific crop varieties

### Rate Limits
- **Free Tier**: 1000 API calls per day
- **Response Time**: Usually 2-5 seconds
- **Data Freshness**: Updated daily at 6 AM IST

## Alternative APIs (If data.gov.in doesn't work)

### 1. eNAM (National Agriculture Market)
- Website: https://enam.gov.in/
- Requires separate registration
- More detailed trade data
- Free for developers

### 2. Agmarknet
- Website: https://agmarknet.gov.in/
- Direct government portal
- May require scraping (no official API)
- Most comprehensive data

### 3. RapidAPI - Indian Agriculture
- Website: https://rapidapi.com/
- Search for "Indian Agriculture Mandi Prices"
- Paid service (starts at $10/month)
- Easier integration

## Troubleshooting

### "API Key Invalid"
- Check if you copied the entire key (no spaces)
- Verify email is confirmed
- Try logging out and back in to data.gov.in

### "No Data Returned"
- Some commodities may not have recent data
- Try different state names (use Title Case: "Maharashtra")
- Check if the commodity name matches exactly

### "Rate Limit Exceeded"
- Free tier: 1000 calls/day
- Wait 24 hours or upgrade account
- Cache responses to reduce API calls

## Current Mock Data Coverage

Without API key, the system provides realistic demo data for:

**Commodities**:
- Rice
- Wheat  
- Cotton

**States**:
- Maharashtra
- Punjab
- Gujarat

**Features**:
- 5 market centers per state
- Realistic price ranges
- MSP comparisons
- 7-day price trends
- Market insights

## Benefits of Real API

| Feature | Mock Data | Real API |
|---------|-----------|----------|
| Accuracy | Demo prices | Live government data |
| Markets | 5 per state | 100+ per state |
| Updates | Static | Daily fresh data |
| Commodities | 3 crops | 50+ crops |
| States | 3 states | All 28 states |
| Historical | Simulated | Real 7-day trends |

## Support

If you face issues getting the API key:
1. Check data.gov.in FAQ: https://data.gov.in/faq
2. Email: data-support@gov.in
3. Phone: +91-11-24305000

## Summary

✅ **For Demo/Testing**: Current mock data works perfectly
🚀 **For Production**: Get real API key from data.gov.in (free, 10 minutes setup)
💡 **Recommendation**: Start with mock data, add real API later when needed
