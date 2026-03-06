# AgriSaathi AI — Project Implementation Document

> **Version:** 1.0.0 | **Last Updated:** March 2026

---

## 1. Project Overview

**AgriSaathi AI** is a next-generation, AI-powered agricultural intelligence platform designed to bridge the knowledge and economic gap for Indian farmers. It provides access to real-time market data, government scheme eligibility, AI-driven advisory, contract farming tools, and a verified farmer community — all in a single, mobile-first interface.

The platform is built with a production-grade stack, featuring a cinematic brutalist/glassmorphism UI, real-time authentication (Email, Social OAuth, Phone OTP), and AI capabilities powered by Large Language Models.

---

## 2. Feature Set

### 2.1 Authentication & Security
- **Email / Password Authentication** — Supabase-powered signup and login with full session persistence across page refreshes.
- **Google OAuth 2.0** — One-click "Sign in with Google" using Supabase OAuth, redirecting back to the AI Advisor dashboard upon completion.
- **Facebook OAuth 2.0** — One-click "Sign in with Facebook" following the same OAuth flow.
- **Phone OTP Verification (SMS)** — Login via a 10-digit Indian mobile number. An OTP is dispatched via an SMS provider, and a 6-digit code is verified on the client.
- **Persistent Sessions** — Sessions survive browser tab closures and refreshes using `localStorage` via the Supabase SSR client.
- **Protected Routes** — The `/advisor` dashboard page is protected server-side. Unauthenticated users are immediately redirected to `/login`.
- **Logout** — Secure sign-out that clears the session from both client memory and Supabase's remote session store.

---

### 2.2 Landing Page Sections
The main landing page (`/`) is a multi-section, scroll-based storytelling experience composed of the following sections:

| Section Component | Description |
|---|---|
| `HeroSection.tsx` | Full-screen cinematic hero with animated text, a CTA to the AI Advisor, and live stat counters (farmers, villages, subsidy data). |
| `StorySection.tsx` | Brand narrative about AgriSaathi's mission to empower 150M+ Indian farmers. |
| `ModulesSection.tsx` | Feature overview cards for each platform module (Advisor, Market, Contracts, Schemes). |
| `AdvisorSection.tsx` | Preview of the AI Advisor interface explaining how the AI chat works. |
| `MarketSection.tsx` | Live-updating mandi (agricultural market) price dashboard for key commodities. |
| `SchemesSection.tsx` | Government scheme discovery — lists schemes like PM-KISAN, PKVY, etc. |
| `EligibilitySection.tsx` | Interactive tool for farmers to check their eligibility for government schemes. |
| `ContractsSection.tsx` | Digital contract farming feature with smart templates and partner matching. |
| `ArchitectureSection.tsx` | Technical architecture diagram for transparency and developer reference. |
| `StatTicker.tsx` | Live scrolling ticker showing real-time agricultural statistics. |
| `Footer.tsx` | Comprehensive footer with links, social handles, and legal pages. |

---

### 2.3 AI Advisor Dashboard (`/advisor`)
- **Protected Route:** Requires an authenticated Supabase session to access.
- **Personalized Greeting:** Displays the logged-in user's full name from Supabase `user_metadata`.
- **Session Status Card:** Shows the active connection status and registered email/phone.
- **AI Chatbot Interface (Planned):** The full AI chatbot UI and subsequent premium dashboard are being built following the successful stabilization of the auth layer.
- **Logout:** One-click secure sign-out button.

---

### 2.4 Visual & Animation Engine
- **Cinematic Background Components:** Multiple WebGL/Three.js and CSS-powered animated backgrounds (`AgriBackground.tsx`, `CinematicAgriBg.tsx`, `CinematicBg.tsx`, `ClayBackground.tsx`) offering distinct visual themes per page.
- **Three.js Canvas:** `ThreeCanvas.tsx` provides a 3D particle/mesh canvas for immersive visuals.
- **GSAP Animations:** All page sections, form elements, and navigation buttons feature entrance animations using GSAP:
  - **Scroll Velocity Skew** (Awwwards-style page tilt on scroll)
  - **Cinematic Clip-path Reveals** for cards
  - **Char-drift Title Reveals** — individual word animation on page load
  - **Magnetic Buttons** — buttons physically attract to the mouse cursor
  - **Elastic Stagger Animations** for sidebar cards and UI stat grids
- **Video Background:** Full-screen looping `.mp4` video background on the auth pages.

---

## 3. Tech Stack

### 3.1 Frontend Framework
| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.1.6 | App Router, SSR/SSG, API Routes, file-based routing |
| **React** | 19.2.3 | UI component library |
| **TypeScript** | ^5 | Static typing across the entire codebase |

---

### 3.2 Backend & Database
| Technology | Version | Purpose |
|---|---|---|
| **Supabase** | ^2.98.0 (JS SDK) | PostgreSQL database, Auth, Real-time subscriptions |
| **Supabase Auth** | Built-in | Session management, OAuth, Phone OTP |
| **Supabase Database** | PostgreSQL (managed) | User profiles, data storage |

---

### 3.3 Authentication Providers
| Provider | Method | Status |
|---|---|---|
| **Email / Password** | Supabase built-in | ✅ Active |
| **Google OAuth 2.0** | Supabase OAuth | ✅ Active |
| **Facebook OAuth 2.0** | Supabase OAuth | ✅ Active |
| **Phone / SMS OTP** | Supabase + SMS provider | 🔧 In Setup |

---

### 3.4 Animation & 3D
| Technology | Version | Purpose |
|---|---|---|
| **GSAP** | ^3.14.2 | All page and component animations |
| **GSAP ScrollTrigger** | Bundled | Scroll-based animation events |
| **Three.js** | ^0.183.1 | 3D canvas backgrounds and WebGL scenes |

---

### 3.5 Styling
| Technology | Version | Purpose |
|---|---|---|
| **Vanilla CSS** | — | Global styles, CSS variables, design tokens |
| **Tailwind CSS** | ^4 | Utility class support (configured via PostCSS) |
| **CSS Custom Properties** | — | Design system: colors, spacing, radius |
| **JSX Global Styles** | — | Scoped per-page styles using `<style jsx global>` |

---

### 3.6 Deployment & Infrastructure
| Technology | Purpose |
|---|---|
| **Vercel** | Hosting, CI/CD — auto-deploys from GitHub `main` branch |
| **GitHub** | Version control (`perewarvaibhav-svg/requ`) |
| **Vercel Environment Variables** | Secure storage of `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` |

---

## 4. Project Architecture

```
agrisaathi/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Landing page (Home)
│   │   ├── layout.tsx          # Root layout with AuthProvider
│   │   ├── providers.tsx       # Global React context providers
│   │   ├── globals.css         # Global CSS design system
│   │   ├── awwwards.css        # Awwwards-style animation utilities
│   │   ├── advisor/
│   │   │   └── page.tsx        # Protected AI Advisor Dashboard
│   │   ├── login/
│   │   │   └── page.tsx        # Login page (Email + Phone + Social)
│   │   └── signup/
│   │       └── page.tsx        # Signup page (Email + Social)
│   │
│   ├── components/             # Reusable UI Components
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── StorySection.tsx
│   │   ├── ModulesSection.tsx
│   │   ├── AdvisorSection.tsx
│   │   ├── MarketSection.tsx
│   │   ├── SchemesSection.tsx
│   │   ├── EligibilitySection.tsx
│   │   ├── ContractsSection.tsx
│   │   ├── ArchitectureSection.tsx
│   │   ├── StatTicker.tsx
│   │   ├── Footer.tsx
│   │   ├── AgriBackground.tsx  # Primary animated background
│   │   ├── CinematicAgriBg.tsx
│   │   ├── CinematicBg.tsx
│   │   ├── ClayBackground.tsx
│   │   ├── ThreeCanvas.tsx     # Three.js WebGL canvas
│   │   ├── VideoBg.tsx
│   │   └── ConsoleVideoBg.tsx
│   │
│   ├── context/
│   │   └── AuthContext.tsx     # Global auth state (user, login, signup, logout)
│   │
│   └── lib/
│       └── supabase.ts         # Supabase client singleton
│
├── public/
│   └── animation.mp4           # Background video asset
│
├── .env.local                  # Local environment variables (gitignored)
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 5. Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | The base Supabase project API URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | The Supabase anonymous (public) JWT key |

> These must also be added to the **Vercel Dashboard → Project Settings → Environment Variables** for the production build to work.

---

## 6. Supabase Configuration Checklist

| Setting | Location | Value |
|---|---|---|
| Site URL | Auth → URL Configuration | `https://agrisaathi-ai.vercel.app` |
| Redirect URLs | Auth → URL Configuration | `https://agrisaathi-ai.vercel.app/advisor`, `http://localhost:3000/advisor` |
| Email Auth | Auth → Providers → Email | **Enabled**, Confirm Email: **Disabled** |
| Google OAuth | Auth → Providers → Google | Client ID + Secret from Google Cloud Console |
| Facebook OAuth | Auth → Providers → Facebook | App ID + Secret from Meta Developers |
| Phone Auth | Auth → Providers → Phone | Connected to SMS provider (Fast2SMS / Twilio) |

---

## 7. Deployment Workflow

1. Developer pushes code to the `main` branch on GitHub.
2. **Vercel automatically triggers** a new production deployment.
3. Next.js builds the app server-side (`npm run build`).
4. Static pages are pre-rendered; dynamic pages use SSR.
5. The deployment goes live at **`https://agrisaathi-ai.vercel.app`** within ~60 seconds.

---

## 8. What's Next (Roadmap)

- [ ] **Phase 2: Premium AI Dashboard UI** — Full AI chatbot with streaming responses, sidebar analytics, and real-time mandi prices.
- [ ] **Fast2SMS Integration** — Complete phone OTP via custom Next.js API route proxying to Fast2SMS API.
- [ ] **AI Integration** — Wire the chatbot to a real LLM (Gemini API / OpenAI) for live agricultural advice.
- [ ] **Database Schema** — Supabase PostgreSQL tables for user profiles, chat history, saved schemes, and contracts.
- [ ] **Real-time Market Prices** — Connect to government Agmarknet / data.gov.in APIs for live mandi data.
- [ ] **Multilingual Support** — Hindi, Marathi, Punjabi translations for regional farmer accessibility.
