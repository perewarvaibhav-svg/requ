"use client";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="section-container">
                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "3rem" }}>
                    <div>
                        <div className="footer-logo">AGRI<span>SAATHI</span></div>
                        <div className="footer-tagline">Autonomous Governance Intelligence</div>
                        <p style={{ marginTop: "1.5rem", fontSize: "0.8rem", color: "var(--text-dim)", maxWidth: "260px" }}>
                            Empowering Indian farmers through transparent access to state and central resources.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--green)", marginBottom: "1.5rem" }}>PLATFORM</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                            <a href="#modules" className="footer-link">Modules</a>
                            <a href="#schemes" className="footer-link">Scheme Hub</a>
                            <a href="#advisor" className="footer-link">AI Advisor</a>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--green)", marginBottom: "1.5rem" }}>RESOURCES</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                            <a href="#" className="footer-link">Land Records</a>
                            <a href="#" className="footer-link">Mandi Portal</a>
                            <a href="#" className="footer-link">Farmer FAQ</a>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--green)", marginBottom: "1.5rem" }}>STATUS</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--green)" }}>
                                <span style={{ width: "6px", height: "6px", background: "var(--green)", borderRadius: "50%" }}></span>
                                API OPERATIONAL
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
                                <span style={{ width: "6px", height: "6px", background: "var(--amber)", borderRadius: "50%" }}></span>
                                GAZETTE SYNC: 4m ago
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                        © 2026 AGRISAATHI TECHNOLOGIES. ALL RIGHTS RESERVED.
                    </div>
                    <div style={{ display: "flex", gap: "2rem" }}>
                        <a href="#" className="footer-link" style={{ fontSize: "0.6rem" }}>Privacy Policy</a>
                        <a href="#" className="footer-link" style={{ fontSize: "0.6rem" }}>Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
