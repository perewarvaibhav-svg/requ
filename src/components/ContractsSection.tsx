"use client";

export default function ContractsSection() {
    const RISKS = [
        { label: "Interest Compounding", score: 82, status: "danger" },
        { label: "Default Clause Clarity", score: 45, status: "caution" },
        { label: "Early Repayment Fee", score: 10, status: "safe" }
    ];

    return (
        <section id="contracts" style={{ padding: "4rem 0" }}>
            <div className="section-container">
                <div className="feature-row">
                    <div className="feature-content">
                        <div className="section-label">Module 03</div>
                        <h2 className="section-title">
                            RISK <span className="hl">AUDIT</span> ENGINE
                        </h2>
                        <p style={{ marginTop: "1.5rem", color: "var(--text-dim)" }}>
                            Don't sign what you don't understand. Upload your bank documents or farming contracts.
                            AgriSaathi flags hidden interest rates, predatory clauses, and legal traps.
                        </p>
                        <div className="btn-ghost" style={{ marginTop: "2rem", width: "100%", justifyContent: "center", borderStyle: "dashed", background: "rgba(0,255,127,0.02)" }}>
                            Upload PDF for AI Audit
                        </div>
                    </div>

                    <div className="feature-vis">
                        <div className="risk-widget">
                            <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", marginBottom: "1.2rem", textTransform: "uppercase" }}>Analysis Result: KCC_DOC_V4.PDF</h4>
                            {RISKS.map((r) => (
                                <div key={r.label} className="risk-row">
                                    <div className="risk-label">{r.label}</div>
                                    <div className="risk-track">
                                        <div className={`risk-fill ${r.status}`} style={{ width: `${r.score}%` }} />
                                    </div>
                                    <div className="risk-val">{r.score}%</div>
                                </div>
                            ))}
                            <div style={{ marginTop: "1.5rem", padding: "1rem", border: "1px solid var(--border-red)", background: "rgba(255,59,59,0.04)" }}>
                                <div style={{ color: "var(--red-alert)", fontSize: "0.75rem", fontWeight: 700 }}>⚠️ PREDATORY CLAUSE DETECTED</div>
                                <p style={{ fontSize: "0.7rem", marginTop: "0.3rem", color: "rgba(255,59,59,0.8)" }}>Section 4.2 implies daily compounding interest during drought declarations. This violates RBI guidelines.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
        .border-red { border-color: var(--red-alert); }
      `}</style>
        </section>
    );
}
