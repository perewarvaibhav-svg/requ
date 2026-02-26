"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
    const sectionRef = useRef(null);
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Row 1 Animation
            gsap.from(row1Ref.current, {
                scrollTrigger: {
                    trigger: row1Ref.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                opacity: 0,
                x: -100,
                duration: 1.2,
                ease: "power3.out",
            });

            // Row 2 Animation
            gsap.from(row2Ref.current, {
                scrollTrigger: {
                    trigger: row2Ref.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                opacity: 0,
                x: 100,
                duration: 1.2,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="story-section" style={{ padding: "10rem 0", overflow: "hidden" }}>
            <div className="section-container">
                {/* Story Point 1 */}
                <div ref={row1Ref} className="story-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center", marginBottom: "12rem" }}>
                    <div>
                        <div className="section-label">Empowerment</div>
                        <h2 className="section-title">TRANSPARENCY <span className="hl">IN YOUR HANDS</span></h2>
                        <p style={{ marginTop: "2rem", color: "var(--text-dim)", fontSize: "1.1rem" }}>
                            Every farmer deserves to know their rights. Our tablet-interface allows even small-hold farmers
                            to scan their land and instantly see every subsidy, grant, and loan rebate they are owed.
                            No more middle-men. No more hidden fees.
                        </p>
                    </div>
                    <div className="story-image-wrapper glass-card">
                        <Image
                            src="/farmer-tablet.png"
                            alt="Farmer checking metadata on tablet"
                            width={600}
                            height={400}
                        />
                    </div>
                </div>

                {/* Story Point 2 */}
                <div ref={row2Ref} className="story-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
                    <div className="story-image-wrapper glass-card" style={{ order: 2 }}>
                        <Image
                            src="/farmers-meeting.png"
                            alt="Community Farmers meeting"
                            width={600}
                            height={400}
                        />
                    </div>
                    <div className="story-text" style={{ order: 1 }}>
                        <div className="section-label">Community</div>
                        <h2 className="section-title">SOLVING <span className="hl-amber">COLLECTIVE DISPUTES</span></h2>
                        <p style={{ marginTop: "2rem", color: "var(--text-dim)", fontSize: "1.1rem" }}>
                            When entire villages face insurance rejections or water disputes, AgriSaathi's swarm intelligence
                            aggregates data to build stronger legal cases, ensuring the community stands together against
                            predatory corporate practices.
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .story-image-wrapper {
          padding: 10px;
          border: 1px solid var(--border-raw);
          background: rgba(0,255,127,0.02);
          transition: transform 0.5s ease;
        }
        .story-image-wrapper:hover {
          transform: scale(1.02);
          border-color: var(--green);
        }
        .story-image-wrapper :global(img) {
          width: 100%;
          height: auto;
          display: block;
        }
        @media (max-width: 1024px) {
          .story-row { grid-template-columns: 1fr !important; gap: 3rem !important; margin-bottom: 6rem !important; }
          .story-image-wrapper { order: -1 !important; }
        }
      `}</style>
        </section>
    );
}
