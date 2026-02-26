"use client";

export default function VideoBg() {
  return (
    <div className="video-bg-wrapper">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/VIDEO1.mp4" type="video/mp4" />
      </video>
      <div className="video-bg-overlay" />
    </div>
  );
}
