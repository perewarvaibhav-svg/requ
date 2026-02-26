"use client";
import StatTicker from "./StatTicker";
import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="hero-section">
            <div className="section-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
                <div className="hero-content">
                    <div className="hero-tag">
                        Agri Governance Monitoring Agent v2.5 [4K_CORE]
                    </div>

                    <h1 className="hero-title" style={{ marginTop: "1.5rem" }}>
                        AI <span className="accent-green">AGRICULTURE</span>
                        <br />
                        GOVERNANCE &
                        <br />
                        <span className="accent-amber">FINANCIAL</span> COPILOT
                    </h1>

                    <p className="hero-subtitle" style={{ marginTop: "2rem" }}>
                        A unified AI layer between farmers and government + financial systems.
                        Automated eligibility checks, real-time market intelligence, and contract analysis for India's 9.2 crore farmers.
                    </p>

                    <div style={{ display: "flex", gap: "1rem", marginTop: "3rem" }}>
                        <a href="/login" className="btn-primary">
                            Access AI Console ▸
                        </a>
                        <a href="#modules" className="btn-ghost">
                            Explore Modules
                        </a>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="image-frame glass-card">
                        <Image
                            src="/farmer-hero.png"
                            alt="Elderly Farmer with Holographic UI"
                            width={600}
                            height={700}
                            className="hero-image"
                        />
                        <div className="scan-line"></div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: "5rem" }}>
                <StatTicker />
            </div>

            <style jsx>{`
        .hero-visual {
          position: relative;
        }
        .image-frame {
          position: relative;
          padding: 8px;
          border: 1px solid var(--border-raw);
          background: rgba(0,255,127,0.05);
          overflow: hidden;
        }
        .hero-image {
          width: 100%;
          height: auto;
          filter: saturate(1.2) contrast(1.1);
          opacity: 0.9;
        }
        .scan-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--green);
          box-shadow: 0 0 15px var(--green);
          animation: scan 4s linear infinite;
          opacity: 0.5;
        }
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
        </section>
    );
}
