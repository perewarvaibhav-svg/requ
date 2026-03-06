"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

const OWM_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_KEY || "";

/* ── Layer definitions ── */
const LAYERS = [
    { id: "precipitation_new", owm: "precipitation_new", label: "🌧️ Rainfall", color: "#4FC3F7", particle: "#60DFFF", desc: "Live precipitation intensity (mm/hr)" },
    { id: "wind_new", owm: "wind_new", label: "💨 Wind", color: "#80DEEA", particle: "#B2EBF2", desc: "Surface wind speed & direction (m/s)" },
    { id: "clouds_new", owm: "clouds_new", label: "☁️ Clouds", color: "#90A4AE", particle: "#CFD8DC", desc: "Total cloud cover (%)" },
    { id: "temp_new", owm: "temp_new", label: "🌡️ Temperature", color: "#FF8A65", particle: "#FFAB76", desc: "Surface temperature (°C)" },
    { id: "pressure_new", owm: "pressure_new", label: "🧭 Pressure", color: "#CE93D8", particle: "#E1BEE7", desc: "Atmospheric pressure (hPa)" },
    { id: "soil_moisture", owm: null, label: "🌱 Soil Moisture", color: "#A5D6A7", particle: "#C8E6C9", desc: "AI-simulated topsoil moisture index" },
    { id: "drought_index", owm: null, label: "🏜️ Drought", color: "#FFAB91", particle: "#FFCCBC", desc: "AI-simulated drought risk overlay" },
];

const INDIA = { lat: 22.5, lon: 80.0, zoom: 5 };

const REGIONS = [
    { label: "All India", lat: 22.5, lon: 80.0, zoom: 5 },
    { label: "North India", lat: 28.6, lon: 77.2, zoom: 6 },
    { label: "Maharashtra", lat: 19.7, lon: 75.7, zoom: 6 },
    { label: "Punjab", lat: 31.1, lon: 75.3, zoom: 7 },
    { label: "Karnataka", lat: 15.3, lon: 75.7, zoom: 6 },
    { label: "Andhra", lat: 15.9, lon: 79.7, zoom: 6 },
    { label: "Tamil Nadu", lat: 11.1, lon: 78.6, zoom: 6 },
    { label: "Gujarat", lat: 22.3, lon: 71.2, zoom: 6 },
];


export default function ClimateMapPage() {
    const [activeLayer, setActiveLayer] = useState(LAYERS[0]);
    const [coords, setCoords] = useState(INDIA);
    const [mapReady, setMapReady] = useState(false);
    const mapRef = useRef<HTMLIFrameElement>(null);
    const [imdAlert, setImdAlert] = useState<string>("");

    /* ── Build self-contained Leaflet page ── */
    const buildMap = useCallback(() => {
        const hasOWM = Boolean(OWM_KEY);
        const useOWM = hasOWM && activeLayer.owm;

        const tileLayer = useOWM
            ? `L.tileLayer('https://tile.openweathermap.org/map/${activeLayer.owm}/{z}/{x}/{y}.png?appid=${OWM_KEY}', {opacity:0.7,attribution:'OpenWeatherMap'}).addTo(map);`
            : `L.rectangle([[6,68],[37,97]],{color:'${activeLayer.color}',weight:0,fillColor:'${activeLayer.color}',fillOpacity:0.22}).addTo(map);`;

        return `data:text/html;charset=utf-8,${encodeURIComponent(`<!DOCTYPE html><html><head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<style>
html,body,#map{height:100%;margin:0;padding:0;background:#030a03;}
.leaflet-tile-pane{filter:saturate(1.4) brightness(0.85) contrast(1.1);}
.leaflet-control-attribution{font-size:9px;background:rgba(0,0,0,0.6)!important;color:#aaa;}
</style></head><body>
<div id="map"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
var map=L.map('map',{center:[${coords.lat},${coords.lon}],zoom:${coords.zoom},zoomControl:true,attributionControl:true});
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{attribution:'CARTO',maxZoom:19}).addTo(map);
${tileLayer}
</script></body></html>`)}`;
    }, [activeLayer, coords]);


    /* ── Fetch Crop Risk Intelligence ── */
    const [riskData, setRiskData] = useState<any>(null);
    const [loadingRisk, setLoadingRisk] = useState(false);

    useEffect(() => {
        const fetchRisk = async () => {
            setLoadingRisk(true);
            try {
                // Determine mock crop based on region for demo
                const cropMap: Record<string, string> = { "Punjab": "Wheat", "Maharashtra": "Cotton", "Gujarat": "Groundnut", "Andhra": "Paddy" };
                const regionName = REGIONS.find(r => r.lat === coords.lat && r.lon === coords.lon)?.label || "All India";
                const crop = cropMap[regionName] || "Paddy";

                const res = await fetch("/api/crop-risk", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ lat: coords.lat, lon: coords.lon, crop: crop, stage: "Vegetative", lang: "en" })
                });
                if (res.ok) setRiskData(await res.json());
            } catch (e) {
                console.error("Risk fetch failed", e);
            }
            setLoadingRisk(false);
        };
        fetchRisk();
    }, [coords]);


    /* ── IMD-style rotating alert banners ── */
    const IMD_ALERTS = [
        "⚡ IMD WARNING: Thunderstorm likely over Punjab, Haryana (next 24h)",
        "🌊 CYCLONE WATCH: Bay of Bengal system tracking towards Odisha coast",
        "🌡️ HEAT WAVE: Severe heat conditions over Vidarbha — avoid outdoor work 11am-4pm",
        "🌧️ HEAVY RAINFALL ALERT: Karnataka, Kerala — Red Alert issued",
        "💨 STRONG WIND ALERT: Coastal Andhra — 45–65 km/h gusts expected",
    ];

    useEffect(() => {
        let idx = 0;
        setImdAlert(IMD_ALERTS[0]);
        const t = setInterval(() => { idx = (idx + 1) % IMD_ALERTS.length; setImdAlert(IMD_ALERTS[idx]); }, 4000);
        return () => clearInterval(t);
    }, []);

    const C = {
        bg: "#05080A", border: "rgba(173,255,47,0.12)", accent: "#ADFF2F",
        dim: "rgba(173,255,47,0.5)", panel: "rgba(0,0,0,0.45)",
    };

    return (
        <ProtectedRoute>
        <div style={{ minHeight: "100vh", background: "#05080A", color: "#E8F5E9", fontFamily: "var(--font-body)", overflow: "hidden" }}>
            <Navbar />

            {/* Scrolling Banner */}
            <div style={{ marginTop: "64px", background: "rgba(255,160,0,0.15)", borderBottom: "1px solid rgba(255,160,0,0.3)", padding: "0.5rem", overflow: "hidden", whiteSpace: "nowrap" }}>
                <div style={{ display: "inline-block", animation: "scroll-left 25s linear infinite", fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#FFCA28", letterSpacing: "0.08em" }}>
                    {imdAlert}
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", height: "calc(100vh - 100px)", gap: "1px", background: "rgba(0,255,127,0.1)" }}>
                {/* ── LEFT SIDEBAR (Controls & Risk Intel) ── */}
                <div style={{ background: "rgba(5, 8, 10, 0.95)", borderRight: "1px solid rgba(0,255,127,0.15)", overflowY: "auto", padding: "1.5rem" }}>

                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#00FF7F", margin: "0 0 1.5rem 0", letterSpacing: "1px" }}>
                        CROP RISK INTELLIGENCE
                    </h2>

                    {/* Quick Jump */}
                    <div style={{ marginBottom: "2rem" }}>
                        <div style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "rgba(232, 245, 233, 0.5)", marginBottom: "0.8rem", textTransform: "uppercase" }}>📍 Select Location</div>
                        <select
                            style={{ width: "100%", padding: "0.8rem", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(0,255,127,0.3)", color: "#fff", borderRadius: "8px", outline: "none" }}
                            onChange={(e) => {
                                const r = REGIONS.find(x => x.label === e.target.value);
                                if (r) setCoords(r);
                            }}
                        >
                            {REGIONS.map(r => <option key={r.label} value={r.label}>{r.label}</option>)}
                        </select>
                    </div>

                    {/* Risk Status Indicator */}
                    {riskData && !loadingRisk && (
                        <div style={{
                            background: "rgba(173,255,47,0.05)",
                            border: `1px solid ${C.border}`,
                            borderRadius: "12px",
                            padding: "1rem",
                            marginBottom: "1.5rem"
                        }}>
                            <div style={{ fontSize: "0.65rem", color: C.dim, textTransform: "uppercase", marginBottom: "0.5rem" }}>Current Status</div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <div style={{
                                    width: "12px", height: "12px", borderRadius: "50%",
                                    background: riskData.risk.level === "SAFE" ? "#00FF7F" : riskData.risk.level === "SEVERE" ? "#FF3B3B" : "#F5C518",
                                    boxShadow: `0 0 10px ${riskData.risk.level === "SAFE" ? "#00FF7F" : riskData.risk.level === "SEVERE" ? "#FF3B3B" : "#F5C518"}`
                                }} />
                                <span style={{ fontWeight: 700, fontSize: "1rem" }}>{riskData.risk.level} RISK</span>
                            </div>
                        </div>
                    )}

                    {loadingRisk && (
                        <div style={{ padding: "1rem", textAlign: "center", color: C.accent, fontSize: "0.8rem", border: `1px solid ${C.border}`, borderRadius: "10px", marginBottom: "1.5rem" }}>
                            ⚡ Recalculating AI Telemetry...
                        </div>
                    )}

                    {/* Data Layers */}
                    <div style={{ marginTop: "1rem" }}>
                        <div style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "rgba(232, 245, 233, 0.5)", marginBottom: "0.8rem", textTransform: "uppercase" }}>🛰️ Satellite Overlay Layers</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                            {LAYERS.map(L => (
                                <button key={L.id} onClick={() => setActiveLayer(L)} style={{
                                    textAlign: "left", padding: "0.8rem", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.8rem",
                                    border: activeLayer.id === L.id ? `1px solid ${L.color}` : "1px solid rgba(255,255,255,0.05)",
                                    background: activeLayer.id === L.id ? `${L.color}15` : "rgba(0,0,0,0.3)",
                                    color: activeLayer.id === L.id ? L.color : "rgba(255,255,255,0.6)",
                                    transition: "all 0.2s"
                                }}>
                                    <span>{L.label}</span>
                                    {activeLayer.id === L.id && <span style={{ marginLeft: "auto", width: "8px", height: "8px", borderRadius: "50%", background: L.color, boxShadow: `0 0 8px ${L.color}` }} />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── RIGHT MAIN (Map + Effects) ── */}
                <div style={{ position: "relative", width: "100%", height: "100%", background: "#05080A" }}>

                    {/* Leaflet IFrame */}
                    <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
                        <iframe
                            ref={mapRef}
                            src={buildMap()}
                            style={{ width: "100%", height: "100%", border: "none" }}
                            title="climate-map"
                            onLoad={() => setMapReady(true)}
                        />
                    </div>

                    {/* Map Interaction Overlay (Optional gradient) */}
                    <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", boxShadow: "inset 0 0 100px rgba(0,0,0,0.9)" }} />

                    {/* ── FLOATING TRANSPARENT RISK OVERLAY (Bottom Right) ── */}
                    {riskData && !loadingRisk && (
                        <div style={{
                            position: "absolute", bottom: "30px", right: "30px",
                            zIndex: 100, width: "400px", maxHeight: "80vh",
                            background: "rgba(5, 8, 10, 0.7)", backdropFilter: "blur(20px) saturate(180%)",
                            border: `1px solid ${C.border}`, borderRadius: "20px",
                            padding: "1.5rem", overflowY: "auto",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                            display: "flex", flexDirection: "column", gap: "1.25rem",
                            transition: "all 0.4s ease"
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div>
                                    <div style={{ fontSize: "0.6rem", color: C.dim, letterSpacing: "1.5px", textTransform: "uppercase" }}>Analysis Engine</div>
                                    <h3 style={{ margin: 0, fontSize: "1.3rem", color: "#fff", fontWeight: 700 }}>🌾 {riskData.crop} Advisor</h3>
                                </div>
                                <div style={{
                                    background: riskData.risk.level === "SAFE" ? "rgba(0,255,127,0.1)" : riskData.risk.level === "SEVERE" ? "rgba(255,59,59,0.1)" : "rgba(245,197,24,0.1)",
                                    padding: "6px 12px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)"
                                }}>
                                    <div style={{ fontSize: "1.4rem", fontWeight: 900, color: riskData.risk.level === "SAFE" ? "#00FF7F" : riskData.risk.level === "SEVERE" ? "#FF3B3B" : "#F5C518" }}>
                                        {riskData.risk.score}%
                                    </div>
                                    <div style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.5)", textAlign: "center" }}>RISK</div>
                                </div>
                            </div>

                            <div style={{
                                fontSize: "0.85rem", lineHeight: 1.6, color: "rgba(255,255,255,0.85)",
                                background: "rgba(255,255,255,0.03)", padding: "12px", borderRadius: "12px",
                                borderLeft: `3px solid ${C.accent}`, fontStyle: "italic"
                            }}>
                                {riskData.ai_advice || riskData.explanation || "No advice available"}
                            </div>

                            {riskData.risk?.threats_detected && riskData.risk.threats_detected.length > 0 && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    <div style={{ fontSize: "0.65rem", color: C.dim, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: "4px" }}>Detected Threats</div>
                                    {riskData.risk.threats_detected.map((threat: string, i: number) => (
                                        <div key={i} className="risk-item" style={{
                                            fontSize: "0.82rem", padding: "10px 14px", borderRadius: "10px",
                                            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
                                            display: "flex", gap: "10px", transition: "all 0.2s linear", cursor: "default"
                                        }}>
                                            <span style={{ color: C.accent }}>●</span>
                                            <span style={{ color: "rgba(255,255,255,0.9)" }}>{threat}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div style={{ marginTop: "0.5rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: activeLayer.color }} />
                                    <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>LAYER: {activeLayer.label}</span>
                                </div>
                                <div style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.3)" }}>Updated: {riskData.timestamp}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes scroll-left {
                    0% { transform: translateX(100vw); }
                    100% { transform: translateX(-100%); }
                }
                .risk-item:hover {
                    background: rgba(173,255,47,0.12) !important;
                    border: 1px solid rgba(173,255,47,0.3) !important;
                    transform: translateX(6px);
                    color: #fff !important;
                }
            `}</style>
        </div>
        </ProtectedRoute>
    );
}
