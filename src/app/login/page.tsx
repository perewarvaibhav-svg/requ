"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const ThreeCanvas = dynamic(() => import("@/components/ThreeCanvas"), { ssr: false });

export default function LoginPage() {
    const [phone, setPhone] = useState("");
    const [step, setStep] = useState(1);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
        } else {
            router.push("/advisor");
        }
    };

    return (
        <div className="login-page">
            <ThreeCanvas />

            <div className="login-overlay">
                <div className="login-card glass-card">
                    <div className="brand-header">
                        <h1 className="logo">AGRI<span>SAATHI</span></h1>
                        <p className="tagline">SECURE BIOMETRIC ONBOARDING</p>
                    </div>

                    <form onSubmit={handleLogin} className="login-form">
                        {step === 1 ? (
                            <>
                                <div className="input-group">
                                    <label>Aadhar Linked Phone Number</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+91 XXXXX XXXXX"
                                        required
                                    />
                                </div>
                                <button type="submit" className="login-btn">REQUEST OTP ▸</button>
                            </>
                        ) : (
                            <>
                                <div className="input-group">
                                    <label>Enter 6-Digit OTP</label>
                                    <input
                                        type="text"
                                        placeholder="X X X X X X"
                                        maxLength={6}
                                        required
                                    />
                                </div>
                                <p className="hint">Sent to your registered mobile ending in {phone.slice(-4)}</p>
                                <button type="submit" className="login-btn">VERIFY & ENTER CONSOLE</button>
                            </>
                        )}
                    </form>

                    <div className="security-footer">
                        <div className="lock-icon">🔒</div>
                        <p>encrypted data layer via Bhashini AI</p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .login-page {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--obsidian);
        }
        .login-overlay {
          position: relative;
          z-index: 100;
          width: 100%;
          max-width: 440px;
          padding: 1.5rem;
        }
        .login-card {
          padding: 3rem 2.5rem;
          text-align: center;
          border: 1px solid var(--border-raw);
        }
        .logo {
          font-family: var(--font-display);
          font-size: 2.5rem;
          color: var(--green);
          letter-spacing: 0.1em;
        }
        .logo span { color: var(--amber); }
        .tagline {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-muted);
          letter-spacing: 0.2em;
          margin-top: 0.5rem;
        }
        .login-form {
          margin-top: 3rem;
          text-align: left;
        }
        .input-group {
          margin-bottom: 1.5rem;
        }
        .input-group label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-dim);
          margin-bottom: 0.8rem;
          text-transform: uppercase;
        }
        .input-group input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-raw);
          padding: 1rem;
          color: white;
          font-family: var(--font-mono);
          font-size: 1rem;
          outline: none;
        }
        .login-btn {
          width: 100%;
          background: var(--green);
          color: black;
          padding: 1.1rem;
          border: none;
          font-family: var(--font-mono);
          font-weight: 700;
          letter-spacing: 0.1em;
          cursor: pointer;
          margin-top: 1rem;
          transition: transform 0.2s;
        }
        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,255,127,0.2);
        }
        .hint {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }
        .security-footer {
          margin-top: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          opacity: 0.5;
        }
        .security-footer p {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          text-transform: uppercase;
        }
      `}</style>
        </div>
    );
}
