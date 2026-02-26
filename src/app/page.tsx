"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import ModulesSection from "@/components/ModulesSection";
import EligibilitySection from "@/components/EligibilitySection";
import MarketSection from "@/components/MarketSection";
import ContractsSection from "@/components/ContractsSection";
import SchemesSection from "@/components/SchemesSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import Footer from "@/components/Footer";

// Load Three.js canvas only on client — avoids SSR issues
const ThreeCanvas = dynamic(() => import("@/components/ThreeCanvas"), { ssr: false });
const VideoBg = dynamic(() => import("@/components/VideoBg"), { ssr: false });

export default function Home() {
    return (
        <>
            <VideoBg />
            <ThreeCanvas />

            <div className="page-content">
                <Navbar />
                <main>
                    <HeroSection />

                    {/* Immersive Narrative Layer */}
                    <StorySection />

                    <ModulesSection />

                    <div className="feature-layers" style={{ position: "relative", zIndex: 10 }}>
                        <EligibilitySection />
                        <MarketSection />
                        <ContractsSection />
                    </div>

                    <SchemesSection />

                    {/* CTA Section for AI Console */}
                    <section id="ai-cta" style={{ padding: "8rem 0", textAlign: "center", background: "rgba(0,255,127,0.03)", borderTop: "1px solid var(--border-raw)" }}>
                        <div className="section-container">
                            <div className="section-label" style={{ justifyContent: "center" }}>Final Interface</div>
                            <h2 className="section-title">READY TO START YOUR <span className="hl">AI JOURNEY?</span></h2>
                            <p style={{ marginTop: "2rem", color: "var(--text-dim)", maxWidth: "600px", margin: "2rem auto" }}>
                                Connect your Aadhar records and land profile to access 24/7 agricultural intelligence.
                                Talk to our dedicated AI Advisor in 22 languages.
                            </p>
                            <a href="/login" className="btn-primary" style={{ padding: "1.2rem 3rem", fontSize: "1rem" }}>
                                TALK TO AI ADVISOR ▸
                            </a>
                        </div>
                    </section>

                    <ArchitectureSection />
                </main>
                <Footer />
            </div>
        </>
    );
}
