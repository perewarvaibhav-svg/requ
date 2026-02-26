"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";

export default function MarketSection() {
    const [sentiment, setSentiment] = useState(72); // 0-100 (Bullish)

    const CROPS = [
        { name: "Mustard (Sarson)", price: "₹5,410", change: "+1.2%", val: 85, status: "up" },
        { name: "Wheat (Gehu)", price: "₹2,275", change: "-0.4%", val: 62, status: "down" },
        { name: "Potato (Alu)", price: "₹1,140", change: "+4.1%", val: 40, status: "up" },
        { name: "Rice (Chawal)", price: "₹2,183", change: "0.0%", val: 75, status: "stable" }
    ];

    return (
        <section id="market" style={{ padding: "8rem 0" }}>
            <div className="section-container">
                <div className="feature-row reverse">
                    <div className="feature-content">
                        <div className="section-label">Module 02</div>
                        <h2 className="section-title">
                            MARKET <span className="hl">GRID</span> INTELLIGENCE
                        </h2>
                        <p style={{ marginTop: "1.5rem", color: "var(--text-dim)" }}>
                            Real-time Mandi price synchronization. Our AI analyzes historical trends to predict price fluctuations
                            weeks before they hit the market.
                        </p>

                        {/* Market Sentiment Widget */}
                        <div className="sentiment-widget glass-card" style={{ marginTop: "2.5rem", padding: "1.5rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                                <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", letterSpacing: "0.15em" }}>MARKET SENTIMENT</span>
                                <span style={{ color: "var(--green)", fontSize: "0.75rem", fontWeight: 700 }}>BULLISH</span>
                            </div>
                            <div className="sentiment-bar-bg">
                                <div className="sentiment-needle" style={{ left: `${sentiment}%` }}></div>
                                <div className="sentiment-labels">
                                    <span>BEARISH</span>
                                    <span>NEUTRAL</span>
                                    <span>BULLISH</span>
                                </div>
                            </div>
                            <p style={{ fontSize: "0.75rem", marginTop: "1rem", color: "var(--text-dim)", lineHeight: 1.5 }}>
                                Wheat prices showing strong resistance at ₹2,200. High demand forecasts for the upcoming festive season suggest a 4-6% upward trend.
                            </p>
                        </div>
                    </div>

                    <div className="feature-vis">
                        <div className="market-widget">
                            <div className="market-header">
                                <div>LIVE MANDI FEED</div>
                                <div className="live-dot"></div>
                            </div>
                            {CROPS.map((crop) => (
                                <div key={crop.name} className="market-row" style={{ flexDirection: "column", alignItems: "stretch" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                                        <span className="market-crop">{crop.name}</span>
                                        <div>
                                            <span className="market-price">{crop.price}</span>
                                            <span className={`market-change ${crop.status}`} style={{ marginLeft: "0.8rem" }}>{crop.change}</span>
                                        </div>
                                    </div>
                                    <div className="market-bar">
                                        <div className="market-bar-fill" style={{
                                            width: `${crop.val}%`,
                                            background: crop.status === "up" ? "var(--green)" : crop.status === "down" ? "var(--red-alert)" : "var(--amber)"
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .sentiment-bar-bg {
          height: 6px;
          background: linear-gradient(90deg, var(--red-alert) 0%, var(--amber) 50%, var(--green) 100%);
          border-radius: 3px;
          position: relative;
          margin: 1.5rem 0 0.5rem 0;
        }
        .sentiment-needle {
          position: absolute;
          top: -4px;
          width: 2px;
          height: 14px;
          background: white;
          box-shadow: 0 0 10px white;
          transition: left 1s ease-in-out;
        }
        .sentiment-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.55rem;
          font-family: var(--font-mono);
          color: var(--text-muted);
          margin-top: 0.8rem;
        }
        .market-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--green);
          margin-bottom: 2rem;
          letter-spacing: 0.15em;
        }
        .live-dot {
          width: 8px;
          height: 8px;
          background: var(--red-alert);
          border-radius: 50%;
          animation: blink 1s infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
        </section>
    );
}
