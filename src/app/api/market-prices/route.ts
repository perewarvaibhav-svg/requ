import { NextRequest, NextResponse } from 'next/server';

// ─── MSP Data (₹/quintal) — Government of India 2024-25 ──────────────────────
const MANDI_MSP: Record<string, number> = {
  rice: 2300, wheat: 2425, maize: 2225, cotton: 7121,
  soybean: 4892, groundnut: 6783, sugarcane: 340, mustard: 5950,
  jowar: 3371, bajra: 2625, ragi: 4290, arhar: 7550,
  moong: 8682, urad: 7400, gram: 5440, sunflower: 7280,
  safflower: 5800, sesamum: 9267, linseed: 6668, nigerseed: 7734,
};

// ─── Comprehensive Mock Data ───────────────────────────────────────────────────
const MOCK_DATA: Record<string, Record<string, Array<{ market: string; price: number; min: number; max: number }>>> = {
  rice: {
    Maharashtra: [
      { market: 'Mumbai APMC', price: 2420, min: 2280, max: 2530 },
      { market: 'Pune Mandi', price: 2360, min: 2220, max: 2460 },
      { market: 'Nashik APMC', price: 2390, min: 2250, max: 2490 },
      { market: 'Nagpur APMC', price: 2340, min: 2200, max: 2440 },
      { market: 'Aurangabad Mandi', price: 2370, min: 2230, max: 2470 },
    ],
    Punjab: [
      { market: 'Ludhiana Mandi', price: 2510, min: 2380, max: 2610 },
      { market: 'Amritsar APMC', price: 2470, min: 2340, max: 2570 },
      { market: 'Jalandhar Market', price: 2490, min: 2360, max: 2590 },
    ],
    'Uttar Pradesh': [
      { market: 'Lucknow APMC', price: 2380, min: 2250, max: 2480 },
      { market: 'Varanasi Mandi', price: 2360, min: 2230, max: 2460 },
      { market: 'Agra Market', price: 2340, min: 2210, max: 2440 },
    ],
    'West Bengal': [
      { market: 'Kolkata APMC', price: 2450, min: 2310, max: 2550 },
      { market: 'Burdwan Mandi', price: 2410, min: 2280, max: 2510 },
    ],
  },
  wheat: {
    Maharashtra: [
      { market: 'Mumbai APMC', price: 2520, min: 2390, max: 2620 },
      { market: 'Pune Mandi', price: 2480, min: 2350, max: 2580 },
      { market: 'Nashik Market', price: 2500, min: 2370, max: 2600 },
    ],
    Punjab: [
      { market: 'Ludhiana Mandi', price: 2580, min: 2450, max: 2680 },
      { market: 'Amritsar APMC', price: 2560, min: 2430, max: 2660 },
    ],
    'Uttar Pradesh': [
      { market: 'Lucknow APMC', price: 2490, min: 2360, max: 2590 },
      { market: 'Kanpur Mandi', price: 2470, min: 2340, max: 2570 },
    ],
    'Madhya Pradesh': [
      { market: 'Bhopal APMC', price: 2460, min: 2330, max: 2560 },
      { market: 'Indore Mandi', price: 2480, min: 2350, max: 2580 },
    ],
  },
  cotton: {
    Maharashtra: [
      { market: 'Akola APMC', price: 7320, min: 6980, max: 7580 },
      { market: 'Yavatmal Mandi', price: 7250, min: 6910, max: 7510 },
      { market: 'Nagpur Cotton Market', price: 7290, min: 6950, max: 7550 },
      { market: 'Nanded APMC', price: 7210, min: 6870, max: 7470 },
    ],
    Gujarat: [
      { market: 'Rajkot APMC', price: 7410, min: 7060, max: 7680 },
      { market: 'Ahmedabad Mandi', price: 7380, min: 7030, max: 7650 },
      { market: 'Surat Market', price: 7350, min: 7000, max: 7620 },
    ],
    'Andhra Pradesh': [
      { market: 'Guntur APMC', price: 7280, min: 6940, max: 7550 },
      { market: 'Kurnool Mandi', price: 7250, min: 6910, max: 7520 },
    ],
  },
  mustard: {
    Rajasthan: [
      { market: 'Jaipur APMC', price: 5820, min: 5560, max: 6080 },
      { market: 'Kota Mandi', price: 5790, min: 5530, max: 6050 },
      { market: 'Jodhpur Market', price: 5760, min: 5500, max: 6020 },
    ],
    'Madhya Pradesh': [
      { market: 'Bhopal APMC', price: 5750, min: 5490, max: 6010 },
      { market: 'Morena Mandi', price: 5800, min: 5540, max: 6060 },
    ],
    'Uttar Pradesh': [
      { market: 'Agra Market', price: 5720, min: 5460, max: 5980 },
      { market: 'Mathura Mandi', price: 5740, min: 5480, max: 6000 },
    ],
  },
  maize: {
    Karnataka: [
      { market: 'Davangere APMC', price: 2310, min: 2180, max: 2420 },
      { market: 'Hubli Mandi', price: 2290, min: 2160, max: 2400 },
    ],
    Maharashtra: [
      { market: 'Pune APMC', price: 2280, min: 2150, max: 2390 },
      { market: 'Nashik Mandi', price: 2300, min: 2170, max: 2410 },
    ],
    'Andhra Pradesh': [
      { market: 'Guntur APMC', price: 2320, min: 2190, max: 2430 },
    ],
  },
  soybean: {
    Maharashtra: [
      { market: 'Latur APMC', price: 4950, min: 4700, max: 5180 },
      { market: 'Osmanabad Mandi', price: 4920, min: 4670, max: 5150 },
      { market: 'Nanded Market', price: 4900, min: 4650, max: 5130 },
    ],
    'Madhya Pradesh': [
      { market: 'Indore APMC', price: 5010, min: 4760, max: 5240 },
      { market: 'Ujjain Mandi', price: 4980, min: 4730, max: 5210 },
    ],
  },
  groundnut: {
    Gujarat: [
      { market: 'Rajkot APMC', price: 6980, min: 6640, max: 7290 },
      { market: 'Junagadh Mandi', price: 6940, min: 6600, max: 7250 },
    ],
    'Andhra Pradesh': [
      { market: 'Kurnool APMC', price: 6920, min: 6580, max: 7230 },
      { market: 'Guntur Market', price: 6900, min: 6560, max: 7210 },
    ],
  },
  sugarcane: {
    Maharashtra: [
      { market: 'Pune Mill Zone', price: 380, min: 340, max: 420 },
      { market: 'Kolhapur Mill Zone', price: 390, min: 350, max: 430 },
      { market: 'Sangli Mill Zone', price: 375, min: 335, max: 415 },
    ],
    'Uttar Pradesh': [
      { market: 'Meerut Mill Zone', price: 360, min: 320, max: 400 },
      { market: 'Muzaffarnagar Zone', price: 365, min: 325, max: 405 },
    ],
  },
  jowar: {
    Maharashtra: [
      { market: 'Solapur APMC', price: 3520, min: 3340, max: 3680 },
      { market: 'Osmanabad Mandi', price: 3490, min: 3310, max: 3650 },
    ],
    Karnataka: [
      { market: 'Gulbarga APMC', price: 3540, min: 3360, max: 3700 },
    ],
  },
  arhar: {
    Maharashtra: [
      { market: 'Latur APMC', price: 7820, min: 7430, max: 8180 },
      { market: 'Nanded Mandi', price: 7790, min: 7400, max: 8150 },
    ],
    Karnataka: [
      { market: 'Gulbarga APMC', price: 7860, min: 7470, max: 8220 },
    ],
  },
};

// ─── Helper: Fetch from data.gov.in ──────────────────────────────────────────
async function fetchFromDataGovIn(commodity: string, state: string, apiKey: string) {
  const url = new URL('https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070');
  url.searchParams.set('api-key', apiKey);
  url.searchParams.set('format', 'json');
  url.searchParams.set('filters[state]', state);
  url.searchParams.set('filters[commodity]', commodity);
  url.searchParams.set('limit', '15');
  url.searchParams.set('sort[arrival_date]', 'desc');

  const resp = await fetch(url.toString(), { next: { revalidate: 300 } }); // cache 5 min
  if (!resp.ok) throw new Error(`data.gov.in returned ${resp.status}`);
  return resp.json();
}

// ─── Helper: Build response from records ──────────────────────────────────────
function buildResponse(
  commodity: string,
  state: string,
  centers: Array<{ market: string; price: number; min: number; max: number }>,
  source: 'live' | 'demo',
  liveDate?: string
) {
  const comm = commodity.toLowerCase();
  const prices = centers.map((c) => c.price);
  const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
  const bestMkt = centers.reduce((a, b) => (a.price > b.price ? a : b));
  const lowestMkt = centers.reduce((a, b) => (a.price < b.price ? a : b));
  const msp = MANDI_MSP[comm] ?? null;

  const insights: string[] = [];

  if (msp) {
    const diff = ((avgPrice - msp) / msp) * 100;
    if (avgPrice < msp) {
      insights.push(`⚠️ WARNING: Avg price ₹${avgPrice} is BELOW MSP ₹${msp}. Consider storing your crop.`);
    } else if (diff > 15) {
      insights.push(`📈 Excellent! Avg price is ${diff.toFixed(1)}% ABOVE MSP — Strong demand detected!`);
    } else {
      insights.push(`✅ Prices are stable around MSP ₹${msp}. Good time to sell in bulk.`);
    }
  }

  const diffBestAvg = (((bestMkt.price - avgPrice) / avgPrice) * 100).toFixed(1);
  if (parseFloat(diffBestAvg) > 3) {
    insights.push(`💡 ${bestMkt.market} offers ${diffBestAvg}% more than state average — best mandi today.`);
  }

  insights.push(`🏆 Best price: ${bestMkt.market} @ ₹${bestMkt.price.toLocaleString('en-IN')}/Quintal`);
  insights.push(`📉 Lowest price: ${lowestMkt.market} @ ₹${lowestMkt.price.toLocaleString('en-IN')}/Quintal`);

  if (source === 'demo') {
    insights.push('📊 Demo Mode: Realistic simulated data. Add DATA_GOV_API_KEY to .env.local for live prices.');
  }

  const now = new Date();
  const formatted = now.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  // Simulated 7-day trend
  const trend = [
    { date: '7d ago', price: Math.round(avgPrice * 0.97) },
    { date: '5d ago', price: Math.round(avgPrice * 0.98) },
    { date: '3d ago', price: Math.round(avgPrice * 0.99) },
    { date: 'Yesterday', price: Math.round(avgPrice * 1.005) },
    { date: 'Today', price: avgPrice },
  ];

  return {
    commodity: commodity.charAt(0).toUpperCase() + commodity.slice(1),
    state: state,
    current_price_inr: avgPrice,
    unit: 'quintal',
    msp,
    trend,
    market_centers: centers.slice(0, 6).map((c) => ({
      market: c.market,
      price: c.price,
      min_price: c.min,
      max_price: c.max,
      change_pct: parseFloat((((c.price - avgPrice) / avgPrice) * 100).toFixed(1)),
    })),
    market_insights: insights,
    source,
    last_updated: source === 'live'
      ? `${formatted} (Live via Agmarknet, ${liveDate})`
      : `${formatted} (Demo Data)`,
  };
}

// ─── GET /api/market-prices ────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const commodity = (searchParams.get('commodity') || 'rice').toLowerCase().trim();
  const state = searchParams.get('state') || 'Maharashtra';

  const API_KEY = process.env.DATA_GOV_API_KEY || '';

  // ── Try live API first ──
  if (API_KEY) {
    try {
      const data = await fetchFromDataGovIn(commodity, state, API_KEY);
      const records: Array<Record<string, string>> = data.records || [];

      if (records.length > 0) {
        const centers = records
          .map((r) => ({
            market: r.market || 'Unknown Mandi',
            price: parseFloat(r.modal_price || '0'),
            min: parseFloat(r.min_price || '0'),
            max: parseFloat(r.max_price || '0'),
          }))
          .filter((c) => c.price > 0);

        if (centers.length > 0) {
          const liveDate = records[0]?.arrival_date ?? '';
          return NextResponse.json(buildResponse(commodity, state, centers, 'live', liveDate));
        }
      }
    } catch (err) {
      console.error('[market-prices] Live API failed:', err);
      // fall through to mock
    }
  }

  // ── Fallback: Mock Data ──
  const commData = MOCK_DATA[commodity];
  if (!commData) {
    // generic fallback for unknown commodities
    const fallbackCenters = [
      { market: `${state} APMC`, price: 3500, min: 3200, max: 3800 },
      { market: `${state} Mandi`, price: 3450, min: 3150, max: 3750 },
    ];
    return NextResponse.json(buildResponse(commodity, state, fallbackCenters, 'demo'));
  }

  const stateData = commData[state] ?? commData[Object.keys(commData)[0]];
  const usedState = commData[state] ? state : Object.keys(commData)[0];

  return NextResponse.json(buildResponse(commodity, usedState, stateData, 'demo'));
}

// ─── GET /api/market-prices/commodities — list available commodities ───────────
export async function HEAD() {
  const commodities = Object.keys(MOCK_DATA);
  return NextResponse.json({ commodities, total: commodities.length });
}
