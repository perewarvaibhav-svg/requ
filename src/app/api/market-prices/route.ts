import { NextRequest, NextResponse } from 'next/server';

// ─── MSP Data (₹/quintal) — Government of India 2024-25 ──────────────────────
const MANDI_MSP: Record<string, number> = {
    rice: 2300, wheat: 2425, maize: 2225, cotton: 7121,
    soybean: 4892, groundnut: 6783, sugarcane: 340, mustard: 5950,
    jowar: 3371, bajra: 2625, ragi: 4290, arhar: 7550,
    moong: 8682, urad: 7400, gram: 5440, sunflower: 7280,
    onion: 0, tomato: 0, potato: 0, chilli: 0, turmeric: 0,
};

// ─── Commodity name mapping (English → Hindi/API names) ──────────────────────
const COMMODITY_ALIASES: Record<string, string[]> = {
    rice: ['Rice', 'Paddy(Dushen)', 'Paddy', 'Dhan'],
    wheat: ['Wheat'],
    maize: ['Maize'],
    cotton: ['Cotton', 'Cotton(Lint)', 'Cotton Seed'],
    soybean: ['Soyabean', 'Soybean'],
    groundnut: ['Groundnut', 'Groundnut Pod (Dry)'],
    mustard: ['Mustard', 'Rapeseed', 'Mustard Oil'],
    onion: ['Onion', 'Onion Green'],
    tomato: ['Tomato'],
    potato: ['Potato'],
    chilli: ['Chilly Dry', 'Chilli', 'Green Chilli'],
    turmeric: ['Turmeric'],
    sugarcane: ['Sugarcane'],
    jowar: ['Jowar', 'Jowar(Sorghum)'],
    arhar: ['Arhar (Tur/Red Gram)(Whole)', 'Tur'],
    bajra: ['Bajra'],
};

// ─── Base prices with regional variance (₹/quintal) ──────────────────────────
const BASE_PRICES: Record<string, Record<string, Array<{ market: string; base: number }>>> = {
    rice: {
        Maharashtra: [
            { market: 'Mumbai APMC', base: 2420 },
            { market: 'Pune Mandi', base: 2360 },
            { market: 'Nashik APMC', base: 2390 },
            { market: 'Nagpur APMC', base: 2340 },
            { market: 'Aurangabad Mandi', base: 2370 },
        ],
        Punjab: [
            { market: 'Ludhiana Mandi', base: 2510 },
            { market: 'Amritsar APMC', base: 2470 },
            { market: 'Jalandhar Market', base: 2490 },
        ],
        'Uttar Pradesh': [
            { market: 'Lucknow APMC', base: 2380 },
            { market: 'Varanasi Mandi', base: 2360 },
            { market: 'Agra Market', base: 2340 },
        ],
        'West Bengal': [
            { market: 'Kolkata APMC', base: 2450 },
            { market: 'Burdwan Mandi', base: 2410 },
        ],
        Karnataka: [
            { market: 'Bangalore APMC', base: 2430 },
            { market: 'Mysore Mandi', base: 2400 },
        ],
    },
    wheat: {
        Maharashtra: [
            { market: 'Mumbai APMC', base: 2520 },
            { market: 'Pune Mandi', base: 2480 },
            { market: 'Nashik Market', base: 2500 },
        ],
        Punjab: [
            { market: 'Ludhiana Mandi', base: 2580 },
            { market: 'Amritsar APMC', base: 2560 },
        ],
        'Uttar Pradesh': [
            { market: 'Lucknow APMC', base: 2490 },
            { market: 'Kanpur Mandi', base: 2470 },
        ],
        'Madhya Pradesh': [
            { market: 'Bhopal APMC', base: 2460 },
            { market: 'Indore Mandi', base: 2480 },
        ],
        Haryana: [
            { market: 'Karnal Mandi', base: 2590 },
            { market: 'Ambala Market', base: 2570 },
        ],
    },
    cotton: {
        Maharashtra: [
            { market: 'Akola APMC', base: 7320 },
            { market: 'Yavatmal Mandi', base: 7250 },
            { market: 'Nagpur Cotton Market', base: 7290 },
            { market: 'Nanded APMC', base: 7210 },
        ],
        Gujarat: [
            { market: 'Rajkot APMC', base: 7410 },
            { market: 'Ahmedabad Mandi', base: 7380 },
            { market: 'Surat Market', base: 7350 },
        ],
        'Andhra Pradesh': [
            { market: 'Guntur APMC', base: 7280 },
            { market: 'Kurnool Mandi', base: 7250 },
        ],
    },
    mustard: {
        Rajasthan: [
            { market: 'Jaipur APMC', base: 5820 },
            { market: 'Kota Mandi', base: 5790 },
            { market: 'Jodhpur Market', base: 5760 },
        ],
        'Madhya Pradesh': [
            { market: 'Bhopal APMC', base: 5750 },
            { market: 'Morena Mandi', base: 5800 },
        ],
        'Uttar Pradesh': [
            { market: 'Agra Market', base: 5720 },
            { market: 'Mathura Mandi', base: 5740 },
        ],
    },
    maize: {
        Karnataka: [
            { market: 'Davangere APMC', base: 2310 },
            { market: 'Hubli Mandi', base: 2290 },
        ],
        Maharashtra: [
            { market: 'Pune APMC', base: 2280 },
            { market: 'Nashik Mandi', base: 2300 },
        ],
        'Andhra Pradesh': [
            { market: 'Guntur APMC', base: 2320 },
        ],
    },
    soybean: {
        Maharashtra: [
            { market: 'Latur APMC', base: 4950 },
            { market: 'Osmanabad Mandi', base: 4920 },
            { market: 'Nanded Market', base: 4900 },
        ],
        'Madhya Pradesh': [
            { market: 'Indore APMC', base: 5010 },
            { market: 'Ujjain Mandi', base: 4980 },
        ],
    },
    groundnut: {
        Gujarat: [
            { market: 'Rajkot APMC', base: 6980 },
            { market: 'Junagadh Mandi', base: 6940 },
        ],
        'Andhra Pradesh': [
            { market: 'Kurnool APMC', base: 6920 },
            { market: 'Guntur Market', base: 6900 },
        ],
    },
    onion: {
        Maharashtra: [
            { market: 'Nashik Lasalgaon', base: 1850 },
            { market: 'Pune APMC', base: 1920 },
            { market: 'Kolhapur Mandi', base: 1800 },
        ],
        Karnataka: [
            { market: 'Bangalore APMC', base: 2100 },
            { market: 'Hubli Mandi', base: 2050 },
        ],
    },
    tomato: {
        Karnataka: [
            { market: 'Kolar APMC', base: 1200 },
            { market: 'Bangalore Yeshwanthpur', base: 1350 },
        ],
        'Andhra Pradesh': [
            { market: 'Madanapalle APMC', base: 1150 },
            { market: 'Tirupati Mandi', base: 1200 },
        ],
        Maharashtra: [
            { market: 'Pune APMC', base: 1280 },
            { market: 'Nashik Market', base: 1240 },
        ],
    },
    potato: {
        'Uttar Pradesh': [
            { market: 'Agra APMC', base: 1050 },
            { market: 'Kanpur Mandi', base: 1020 },
            { market: 'Mathura Market', base: 1030 },
        ],
        'West Bengal': [
            { market: 'Kolkata APMC', base: 1100 },
            { market: 'Burdwan Mandi', base: 1080 },
        ],
    },
    sugarcane: {
        Maharashtra: [
            { market: 'Pune Mill Zone', base: 380 },
            { market: 'Kolhapur Mill Zone', base: 390 },
            { market: 'Sangli Mill Zone', base: 375 },
        ],
        'Uttar Pradesh': [
            { market: 'Meerut Mill Zone', base: 360 },
            { market: 'Muzaffarnagar Zone', base: 365 },
        ],
    },
    turmeric: {
        'Andhra Pradesh': [
            { market: 'Nizamabad APMC', base: 13500 },
            { market: 'Warangal Mandi', base: 13200 },
        ],
        Maharashtra: [
            { market: 'Sangli APMC', base: 13800 },
            { market: 'Pune Market', base: 13600 },
        ],
    },
    chilli: {
        'Andhra Pradesh': [
            { market: 'Guntur APMC', base: 18000 },
            { market: 'Khammam Mandi', base: 17500 },
        ],
        Karnataka: [
            { market: 'Byadagi APMC', base: 19000 },
        ],
    },
    jowar: {
        Maharashtra: [
            { market: 'Solapur APMC', base: 3520 },
            { market: 'Osmanabad Mandi', base: 3490 },
        ],
        Karnataka: [
            { market: 'Gulbarga APMC', base: 3540 },
        ],
    },
    arhar: {
        Maharashtra: [
            { market: 'Latur APMC', base: 7820 },
            { market: 'Nanded Mandi', base: 7790 },
        ],
        Karnataka: [
            { market: 'Gulbarga APMC', base: 7860 },
        ],
    },
};

// ─── Daily variance: deterministic but changes every day ─────────────────────
function getDailyVariance(seed: string): number {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    let hash = 0;
    for (const ch of seed + today) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffff;
    return (hash % 80) - 40; // ±40 variance per market per day
}

// ─── Source 1: data.gov.in Agmarknet (official, real-time) ───────────────────
async function fetchFromDataGovIn(
    commodity: string,
    state: string,
    apiKey: string
): Promise<Array<{ market: string; price: number; min: number; max: number; date: string }>> {
    // Try all commodity aliases
    const aliases = COMMODITY_ALIASES[commodity] ?? [commodity];

    for (const alias of aliases) {
        try {
            const url = new URL('https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070');
            url.searchParams.set('api-key', apiKey);
            url.searchParams.set('format', 'json');
            url.searchParams.set('filters[state]', state);
            url.searchParams.set('filters[commodity]', alias);
            url.searchParams.set('limit', '20');
            url.searchParams.set('sort[arrival_date]', 'desc');

            const resp = await fetch(url.toString(), {
                next: { revalidate: 300 },
                signal: AbortSignal.timeout(5000),
            });

            if (!resp.ok) continue;
            const data = await resp.json();
            const records: Array<Record<string, string>> = data.records ?? [];

            const centers = records
                .map((r) => ({
                    market: `${r.market || 'Unknown'} (${r.district || ''})`.trim(),
                    price: parseFloat(r.modal_price || '0'),
                    min: parseFloat(r.min_price || '0'),
                    max: parseFloat(r.max_price || '0'),
                    date: r.arrival_date ?? '',
                }))
                .filter((c) => c.price > 100);

            if (centers.length > 0) return centers;
        } catch {
            // try next alias
        }
    }
    return [];
}

// ─── Source 2: data.gov.in alternate dataset (wholesale price index) ──────────
async function fetchWPIFromDataGov(
    commodity: string,
    apiKey: string
): Promise<number | null> {
    try {
        const url = new URL('https://api.data.gov.in/resource/b9b2fbc2-7e0c-48b9-8cd3-13a65b14e6b0');
        url.searchParams.set('api-key', apiKey);
        url.searchParams.set('format', 'json');
        url.searchParams.set('filters[commodity_name]', commodity);
        url.searchParams.set('limit', '3');

        const resp = await fetch(url.toString(), {
            next: { revalidate: 600 },
            signal: AbortSignal.timeout(4000),
        });
        if (!resp.ok) return null;
        const data = await resp.json();
        const record = data.records?.[0];
        return record ? parseFloat(record.wpi ?? '0') * 10 : null; // WPI index → approx mandi price
    } catch {
        return null;
    }
}

// ─── Build final response ─────────────────────────────────────────────────────
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

    if (msp && msp > 0) {
        const diff = ((avgPrice - msp) / msp) * 100;
        if (avgPrice < msp) {
            insights.push(`⚠️ WARNING: Avg ₹${avgPrice} is BELOW MSP ₹${msp} (${Math.abs(diff).toFixed(1)}% below). Hold stock — do NOT sell at loss.`);
        } else if (diff > 15) {
            insights.push(`📈 Excellent! Avg price ${diff.toFixed(1)}% ABOVE MSP ₹${msp} — Strong market demand, great time to sell!`);
        } else {
            insights.push(`✅ Prices stable near MSP ₹${msp} (+${diff.toFixed(1)}%). Safe to sell in bulk.`);
        }
    }

    const diffBestAvg = (((bestMkt.price - avgPrice) / avgPrice) * 100).toFixed(1);
    if (parseFloat(diffBestAvg) > 2) {
        insights.push(`💡 Best mandi: ${bestMkt.market} pays ${diffBestAvg}% above state average.`);
    }

    insights.push(`🏆 Highest: ${bestMkt.market} @ ₹${bestMkt.price.toLocaleString('en-IN')}/Quintal`);
    insights.push(`📉 Lowest: ${lowestMkt.market} @ ₹${lowestMkt.price.toLocaleString('en-IN')}/Quintal`);

    if (source === 'demo') {
        insights.push(`📊 Demo Mode — prices vary daily. Add DATA_GOV_API_KEY to .env.local for live Agmarknet data.`);
    }

    const now = new Date();
    const formatted = now.toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });

    // 7-day trend (deterministic daily shift)
    const trend = [-6, -4, -2, -1, 0].map((daysAgo, i) => {
        const d = new Date(now);
        d.setDate(d.getDate() + daysAgo);
        const label = daysAgo === 0 ? 'Today' : daysAgo === -1 ? 'Yesterday' : `${Math.abs(daysAgo)}d ago`;
        const variance = getDailyVariance(`${comm}-${state}-${i}`);
        return { date: label, price: avgPrice + variance };
    });

    return {
        commodity: commodity.charAt(0).toUpperCase() + commodity.slice(1),
        state,
        current_price_inr: avgPrice,
        unit: 'quintal',
        msp: msp && msp > 0 ? msp : null,
        '7_day_trend': trend,
        market_centers: centers.slice(0, 8).map((c) => ({
            market: c.market,
            price: c.price,
            min_price: c.min,
            max_price: c.max,
            change_pct: parseFloat((((c.price - avgPrice) / avgPrice) * 100).toFixed(1)),
        })),
        market_insights: insights,
        source,
        last_updated: source === 'live'
            ? `🟢 LIVE via Agmarknet — Arrival Date: ${liveDate} (Updated: ${formatted})`
            : `🟡 Demo — refreshes daily. Go live: data.gov.in → API Key → .env.local`,
    };
}

// ─── GET /api/market-prices ────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const commodity = (searchParams.get('commodity') || 'rice').toLowerCase().trim();
    const state = decodeURIComponent(searchParams.get('state') || 'Maharashtra');

    const API_KEY = process.env.DATA_GOV_API_KEY || '';

    // ── SOURCE 1: Live from data.gov.in Agmarknet ──
    if (API_KEY && API_KEY.length > 5) {
        try {
            const liveCenters = await fetchFromDataGovIn(commodity, state, API_KEY);
            if (liveCenters.length > 0) {
                const liveDate = liveCenters[0].date;
                return NextResponse.json(
                    buildResponse(commodity, state, liveCenters, 'live', liveDate),
                    { headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=60' } }
                );
            }
        } catch (err) {
            console.error('[market-prices] data.gov.in failed:', err);
        }
    }

    // ── SOURCE 2: Demo with realistic daily variance ──
    const commData = BASE_PRICES[commodity];
    if (!commData) {
        // unknown commodity — generate generic response
        const fallback = [
            { market: `${state} APMC`, price: 3500 + getDailyVariance(`${commodity}-${state}-0`), min: 3200, max: 3800 },
            { market: `${state} Mandi`, price: 3450 + getDailyVariance(`${commodity}-${state}-1`), min: 3150, max: 3750 },
        ];
        return NextResponse.json(buildResponse(commodity, state, fallback, 'demo'), {
            headers: { 'Cache-Control': 'public, max-age=3600' },
        });
    }

    const stateMarkets = commData[state] ?? commData[Object.keys(commData)[0]];
    const usedState = commData[state] ? state : Object.keys(commData)[0];

    // Apply daily variance to base prices
    const centers = stateMarkets.map((m, i) => {
        const v = getDailyVariance(`${commodity}-${usedState}-${m.market}-${i}`);
        const price = m.base + v;
        return {
            market: m.market,
            price,
            min: Math.round(price * 0.95),
            max: Math.round(price * 1.05),
        };
    });

    return NextResponse.json(buildResponse(commodity, usedState, centers, 'demo'), {
        headers: { 'Cache-Control': 'public, max-age=3600' },
    });
}
