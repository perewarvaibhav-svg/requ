"use client";
import { useEffect, useState } from "react";

const NAV_LINKS = [
    { href: "#modules", label: "Modules" },
    { href: "#eligibility", label: "Eligibility" },
    { href: "#market", label: "Market" },
    { href: "#contracts", label: "Contracts" },
    { href: "#schemes", label: "Schemes" },
    { href: "#advisor", label: "AI Advisor" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleLink = (href: string) => {
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <nav
                className="nav-bar"
                style={{ boxShadow: scrolled ? "0 4px 32px rgba(0,255,127,0.06)" : "none" }}
            >
                <div
                    className="section-container"
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}
                >
                    {/* Logo */}
                    <a href="#" className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                        AGRI<span>SAATHI</span>
                    </a>

                    {/* Desktop Links */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="hidden-mobile">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.href}
                                className="nav-link"
                                onClick={() => handleLink(link.href)}
                                style={{ background: "none" }}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    {/* CTA + Hamburger */}
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <a
                            href="/login"
                            className="btn-primary hidden-mobile"
                            style={{ padding: "0.55rem 1.2rem", fontSize: "0.68rem" }}
                        >
                            Try AI ▸
                        </a>
                        <button
                            id="hamburger-btn"
                            onClick={() => setMenuOpen(!menuOpen)}
                            style={{
                                background: "none",
                                border: "1px solid rgba(0,255,127,0.25)",
                                padding: "0.45rem 0.65rem",
                                cursor: "pointer",
                                color: "var(--green)",
                                fontSize: "1rem",
                                lineHeight: 1,
                                display: "none",
                            }}
                            className="show-mobile"
                        >
                            {menuOpen ? "✕" : "☰"}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                {NAV_LINKS.map((link) => (
                    <button
                        key={link.href}
                        className="mobile-nav-link"
                        onClick={() => handleLink(link.href)}
                        style={{ background: "none", border: "none", cursor: "pointer" }}
                    >
                        {link.label}
                    </button>
                ))}
            </div>

            <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
        </>
    );
}
