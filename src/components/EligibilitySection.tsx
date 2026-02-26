"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function EligibilitySection() {
    const linesRef = useRef([]);

    useEffect(() => {
        // Reveal lines one by one
        gsap.fromTo(linesRef.current,
            { opacity: 0, x: -10 },
            {
                opacity: 1,
                x: 0,
                stagger: 0.4,
                duration: 0.8,
                scrollTrigger: {
                    trigger: ".terminal-widget",
                    start: "top 80%"
                }
            }
        );
    }, []);

    return (
        <section id="eligibility" style={{ padding: "8rem 0" }}>
            <div className="section-container">
                <div className="feature-row">
                    <div className="feature-content">
                        <div className="section-label">Module 01</div>
                        <h2 className="section-title">
                            SCHEME <span className="hl">MATCHING</span> ENGINE
                        </h2>
                        <p style={{ marginTop: "1.5rem", color: "var(--text-dim)" }}>
                            AgriSaathi scans your demographic and land profile against hundreds of government databases.
                            Our AI doesn't just list schemes—it audits your eligibility status in real-time.
                        </p>
                        <ul style={{ marginTop: "2rem", listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {[
                                "Conflict detection between overlapping schemes",
                                "Automated document preparation for KCC",
                                "Regional subsidy alerts (State level)"
                            ].map((item, i) => (
                                <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.8rem", fontSize: "0.88rem" }}>
                                    <span style={{ color: "var(--green)" }}>▣</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="feature-vis">
                        <div className="terminal-widget glass-card" style={{ padding: "0" }}>
                            <div className="terminal-header">
                                <span className="terminal-dot" style={{ background: "#FF5F56" }}></span>
                                <span className="terminal-dot" style={{ background: "#FFBD2E" }}></span>
                                <span className="terminal-dot" style={{ background: "#27C93F" }}></span>
                                <span style={{ marginLeft: "1rem", color: "var(--text-muted)", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>eligibility_audit.sh</span>
                            </div>
                            <div style={{ padding: "0 1.5rem 1.5rem 1.5rem" }}>
                                <div ref={el => linesRef.current[0] = el} className="terminal-line"><span className="cmd">root@agrisaathi:~$</span> analyze_profile --farmer_id=UP4102</div>
                                <div ref={el => linesRef.current[1] = el} className="terminal-line">[SYSTEM] Fetching land records for district: Gorakhpur</div>
                                <div ref={el => linesRef.current[2] = el} className="terminal-line ok">[OK] Land area: 2.1 hectares (Small/Marginal Category)</div>
                                <div ref={el => linesRef.current[3] = el} className="terminal-line">[SYSTEM] Cross-referencing PM-KISAN database...</div>
                                <div ref={el => linesRef.current[4] = el} className="terminal-line ok">[OK] Active beneficiary: YES</div>
                                <div ref={el => linesRef.current[5] = el} className="terminal-line">[SYSTEM] Checking KCC Eligibility...</div>
                                <div ref={el => linesRef.current[6] = el} className="terminal-line out">[FOUND] Potential credit limit increase: ₹45,000</div>
                                <div ref={el => linesRef.current[7] = el} className="terminal-line out">[ALERT] Overdue interest subvention pending correction</div>
                                <div ref={el => linesRef.current[8] = el} className="terminal-line"><span className="cmd">root@agrisaathi:~$</span> <span className="cursor-blink"></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
