"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsoleVideoBg from "@/components/ConsoleVideoBg";

const ThreeCanvas = dynamic(() => import("@/components/ThreeCanvas"), { ssr: false });

export default function AdvisorPage() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "IDENTITY VERIFIED. Welcome to the AgriSaathi Secure Intelligence Console. How can I assist your farm operation today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, {
        sender: "ai",
        text: "Analyzing satellite drought indices and ministry gazettes... Based on your Gorakhpur land records, your eligibility for the KCC interest rebate is 94%. Shall I generate the submission PDF?"
      }]);
    }, 1200);
  };

  return (
    <div className="advisor-console-layout">
      <ConsoleVideoBg />
      <ThreeCanvas />
      <Navbar />

      <main className="advisor-container">
        <div className="console-header">
          <div className="status-dot pulse"></div>
          <div>
            <h1 className="console-title">AGRI-INTELLIGENCE COMMAND</h1>
            <p className="console-subtitle">TERMINAL 04 // SECURE SESSION</p>
          </div>
        </div>

        <div className="chat-interface glass-card">
          <div className="messages-scroll">
            {messages.map((m, i) => (
              <div key={i} className={`msg-row ${m.sender}`}>
                <div className="msg-bubble">
                  <div className="msg-meta">{m.sender === 'ai' ? 'AGRIS-AI' : 'USER_ROOT'}</div>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Query system (e.g. 'Audit my KCC loan'...)"
              className="console-input"
            />
            <button onClick={handleSend} className="console-btn">EXECUTE</button>
          </div>
        </div>

        <div className="console-sidebar">
          <div className="teletry-card glass-card">
            <h3>NETWORK SECURITY</h3>
            <div className="security-scroller">
              <div className="sec-log">[VULN_SCAN] PASS</div>
              <div className="sec-log">[FIREWALL] ENCRYPTED</div>
              <div className="sec-log">[IP_TRACK] HIDDEN</div>
              <div className="sec-log">[NODE_4] SYNCED</div>
              <div className="sec-log">[ROOT] AUTHORIZED</div>
            </div>
          </div>

          <div className="teletry-card glass-card">
            <h3>ACTIVE SUBSIDIES</h3>
            <div className="stat">PM-KISAN: <span className="green">VERIFIED</span></div>
            <div className="stat">KCC LIMIT: <span className="amber">LOW</span></div>
          </div>
          <div className="teletry-card glass-card">
            <h3>MARKET SIGNALS</h3>
            <div className="stat">WHEAT: <span className="green">+2.4%</span></div>
            <div className="stat">MUSTARD: <span className="red">-0.8%</span></div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .advisor-console-layout {
          min-height: 100vh;
          background: var(--obsidian);
          padding-top: 80px;
          display: flex;
          flex-direction: column;
        }
        .advisor-container {
          flex: 1;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          padding: 2rem;
          display: grid;
          grid-template-columns: 1fr 300px;
          grid-template-rows: auto 1fr;
          gap: 2rem;
          z-index: 10;
        }
        .console-header {
          grid-column: span 2;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          border-left: 3px solid var(--green);
          padding-left: 1.5rem;
        }
        .console-title {
          font-family: var(--font-display);
          font-size: 2.5rem;
          letter-spacing: 0.1em;
          color: white;
        }
        .console-subtitle {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--green);
          opacity: 0.7;
        }
        .chat-interface {
          height: 600px;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-raw);
        }
        .messages-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .msg-row.ai { align-self: flex-start; }
        .msg-row.user { align-self: flex-end; }
        .msg-bubble {
          padding: 1.2rem;
          background: rgba(0,255,127,0.03);
          border: 1px solid var(--border-raw);
          border-radius: 2px;
          max-width: 500px;
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-primary);
        }
        .msg-row.user .msg-bubble {
          background: rgba(245,158,11,0.03);
          border-color: var(--border-amber);
        }
        .msg-meta {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--green);
          margin-bottom: 0.5rem;
          letter-spacing: 0.1em;
        }
        .msg-row.user .msg-meta { color: var(--amber); }
        .input-area {
          padding: 1.5rem;
          display: flex;
          gap: 1rem;
          border-top: 1px solid var(--border-raw);
        }
        .console-input {
          flex: 1;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-raw);
          padding: 1rem;
          color: white;
          font-family: var(--font-mono);
          outline: none;
        }
        .console-btn {
          background: var(--green);
          color: black;
          border: none;
          padding: 0 2rem;
          font-family: var(--font-mono);
          font-weight: 700;
          cursor: pointer;
        }
        .console-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .teletry-card {
          padding: 1.5rem;
        }
        .teletry-card h3 {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
          letter-spacing: 0.1em;
        }
        .stat {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
        }
        .green { color: var(--green); }
        .amber { color: var(--amber); }
        .red { color: var(--red-alert); }
        .pulse {
          width: 12px;
          height: 12px;
          background: var(--green);
          border-radius: 50%;
          animation: pulse-glow 2s infinite;
        }
        .security-scroller {
          height: 100px;
          overflow: hidden;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--green);
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .sec-log {
          opacity: 0.8;
          animation: slide-up 4s linear infinite;
        }
        @keyframes slide-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100%); }
        }
        @keyframes pulse-glow {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0,255,127,0.7); }
          70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(0,255,127,0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0,255,127,0); }
        }
      `}</style>
    </div>
  );
}
