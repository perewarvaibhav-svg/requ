"use client";

export default function ConsoleVideoBg() {
  return (
    <div className="video-bg-wrapper">
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{ opacity: 0.9, filter: 'saturate(1.5) contrast(1.2) hue-rotate(-15deg)' }}
      >
        <source src="/VIDEO2.mp4" type="video/mp4" />
      </video>
      <div className="video-bg-overlay" style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />
    </div>
  );
}
