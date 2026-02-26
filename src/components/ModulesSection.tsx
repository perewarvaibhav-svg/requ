"use client";

const MODULES = [
    {
        idx: "01",
        icon: "📜",
        title: "SCHEME ELIGIBILITY",
        desc: "AI-matching of farmer profiles against 47+ central and state schemes (PM-KISAN, KCC, NHM).",
        tag: "active monitoring",
        col: "col-span-4"
    },
    {
        idx: "02",
        icon: "📈",
        title: "MARKET INTELLIGENCE",
        desc: "Real-time mandi price tracking and AI-driven trade signals to maximize ROI.",
        tag: "real-time grid",
        col: "col-span-4"
    },
    {
        idx: "03",
        icon: "📑",
        title: "CONTRACT ANALYZER",
        desc: "OCR-powered risk detection for KCC loan documents and contract farming agreements.",
        tag: "audit engine",
        col: "col-span-4"
    },
    {
        idx: "04",
        icon: "⚖️",
        title: "GOVERNANCE MONITOR",
        desc: "Live-crawling of government gazettes for updates impacting land and credit limits.",
        tag: "ministerial feed",
        col: "col-span-6"
    },
    {
        idx: "05",
        icon: "🤝",
        title: "AI DISPUTE ADVISOR",
        desc: "Procedural guidance for insurance claim rejections and land record discrepancies.",
        tag: "resolution layer",
        col: "col-span-6"
    }
];

export default function ModulesSection() {
    return (
        <section id="modules" style={{ padding: "8rem 0" }}>
            <div className="section-container">
                <div className="section-label">System Architecture</div>
                <h2 className="section-title">
                    CORE <span className="hl">AI MODULES</span>
                </h2>

                <div style={{ marginTop: "4rem" }} className="module-grid">
                    {MODULES.map((m) => (
                        <div key={m.idx} className={`module-card ${m.col}`}>
                            <div className="module-index">MOD // {m.idx}</div>
                            <div className="module-icon">{m.icon}</div>
                            <h3 className="module-title">{m.title}</h3>
                            <p className="module-desc">{m.desc}</p>
                            <div className="module-tag">{m.tag} ▸</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
