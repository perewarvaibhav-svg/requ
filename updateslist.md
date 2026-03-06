# AgriSaathi AI — Animation & Tech Stack Upgrade Plan

> **Status:** Planning Document — No code implemented yet.
> **Authored:** March 2026

---

## 1. My Honest Recommendation: The Curated Stack

Of the 10 technologies you listed, here is exactly which ones to use and which to skip —
with frank reasoning for each.

---

### ✅ ADOPT — High Impact, Practical for This Project

| Library | Verdict | Reason |
|---|---|---|
| **GSAP** | ✅ Keep (already installed) | The gold standard. Already powering our animations. Keep it. |
| **Framer Motion** | ✅ Add | Best React-native solution for page transitions, micro-interactions, and gesture reactions. Works perfectly alongside GSAP without conflict. |
| **Lenis Smooth Scroll** | ✅ Add | Tiny (2KB), zero-dependency, Awwwards-standard. Replaces the browser's native scroll with a perfectly damped, buttery-smooth physical scroll. This alone will make the site feel like a $10M product. |
| **React Three Fiber (R3F)** | ✅ Add | Our project already has raw Three.js. R3F makes 3D scenes composable as React components. Makes it dramatically easier to build and maintain the animated 3D background. |
| **Drei** | ✅ Add alongside R3F | It is the "lodash" of R3F — provides ready-made Environment maps, Reflections, Text3D, Float animations, Stars, and 40+ other helpers that would take weeks to write manually. Without Drei, R3F is half as powerful. |

---

### ⚠️ CONDITIONAL — Use Only If Time Allows

| Library | Verdict | Reason |
|---|---|---|
| **Rive** | ⚠️ Optional | Rive animations are beautiful but require a separate design tool (rive.app) to create the `.riv` animation files. Unless you already have Rive assets, this adds design time, not just development time. |
| **GLSL Custom Shaders** | ⚠️ Optional | Extremely powerful for GPU-driven wind/particle effects, but requires deep GLSL knowledge. Not practical for a hackathon timeline. A better approach is using Drei's `<Sparkles>` and `<Environment>` components to get 80% of the visual effect in 5% of the time. |

---

### ❌ SKIP — Not Suitable for This Project

| Library | Verdict | Reason |
|---|---|---|
| **Theatre.js** | ❌ Skip | Theatre is a tool for offline cinematic animation sequences with a keyframe editor — better for marketing videos and product demos. It is fundamentally incompatible with interactive user-triggered UI. The learning curve is also very steep. |
| **Motion Canvas** | ❌ Skip | This is an animation engine for **video rendering**, not web UIs. It renders to `.mp4` files, not interactive browser pages. Completely wrong tool for this use case. |
| **Spline** | ❌ Skip | Spline exports embed a 25MB JavaScript runtime into your page. This would destroy your performance scores (Lighthouse, Vercel Analytics) and make the site feel slow on mobile — the primary device for 90%+ of Indian farmers using this product. |
| **WebGPU** | ❌ Skip | WebGPU has only ~75% browser support globally as of 2026 and is still experimental. A site that crashes in Safari destroys a hackathon demo. Pure future-proofing, not yet practical. |

---

## 2. The Final Chosen Stack

```
EXISTING (Keep)
 ├── Next.js 16 + React 19 + TypeScript
 └── GSAP 3 + ScrollTrigger

ADD (New libraries)
 ├── @studio-freight/lenis       → Smooth scroll
 ├── framer-motion               → Page transitions + micro-interactions
 ├── @react-three/fiber          → React-native Three.js
 └── @react-three/drei           → R3F helper toolkit
```

> **Total estimated bundle increase:** ~180KB gzipped — highly acceptable.

---

## 3. Full Animation Design Plan

Below is the complete, section-by-section description of every planned animation.
Nothing is implemented yet. This is the blueprint.

---

### 3.1 Global — Smooth Scroll (Lenis)
**What it does:**
Replace the browser's jarring instant-scroll with physics-based inertial scroll.
When the user scrolls quickly, the page glides and decelerates like oil on glass.
When scrolling slowly, it feels perfectly responsive.

**Specific behavior:**
- Scroll damping factor: `0.08` (light, premium feel — not too laggy)
- Integrated with GSAP's `ScrollTrigger` via `lenis.on('scroll', ScrollTrigger.update)`
- Applied globally to the entire site from `layout.tsx`

---

### 3.2 Navbar — Reveal + Transparency + Shrink
**Current state:** Static, always visible

**Planned animation:**
- **On page load:** Navbar slides down from `y: -100` to `y: 0` with opacity fade over 1 second using GSAP.
- **On scroll down:** Navbar background transitions from fully transparent to `rgba(5, 8, 10, 0.85)` with a `backdrop-filter: blur(20px)` glassmorphism effect.
- **On scroll up:** Navbar snaps back to transparent (shows the user they can go back).
- **Logo hover:** Subtle `1.05x` scale with a green glow spread behind the text.
- **CTA button hover:** Framer Motion `whileHover` scale + glow pulse animation.

---

### 3.3 Hero Section — Cinematic Entry
**Current state:** GSAP word-drift title reveal, magnetic CTA button

**Planned additions:**

1. **3D Background Scene (R3F + Drei):**
   A floating, slowly rotating abstract geometric particle field — representing a field of crops viewed from above at night. Uses `<Points>` in R3F with `Drei`'s `<Float>` wrapper. The camera slowly zooms out `0.1x` per second, giving a parallax sense of depth.
   
2. **Staggered Title Reveal:**
   Each word of "GROW SMARTER / OWN YOUR FUTURE" drops in from `y: 120%` with a clip-path mask, revealing in staggered intervals of `0.12s`. Creates a typographic typeface-reveal effect seen on award-winning editorial sites.
   
3. **Subtitle typewriter:**
   The subtitle paragraph types itself out, one character at a time, starting 1.2 seconds after the title completes. Speed: 40ms per character.

4. **Farmer image scan line:**
   A green neon horizontal scan line moves from top to bottom of the hero image in a 6-second loop (already exists in CSS, will be enhanced with GSAP to add a `data-distortion` ripple as it passes).

5. **Magnetic CTA Button (enhanced):**
   Current magnetic effect stays. Adding Framer Motion `whileTap` to give a `0.92x` scale press feel. Also adding a radial green pulse that expands and fades on hover — like a sonar ping.

6. **StatTicker (enhanced):**
   The scrolling stat ticker will be wrapped with Framer Motion `overflow: hidden` and each number will use a counter animation — spinning up from 0 to its actual value over 2 seconds when it first enters the viewport.

---

### 3.4 Story Section — Scroll-Driven Text
**Current state:** Static section

**Planned animation:**
- **Pinned scroll storytelling:** The section is pinned to the viewport for 300vh of scroll distance.
- As user scrolls, three sentences fade in and out sequentially — each sentence represents one chapter of AgriSaathi's mission.
- A progress bar on the left side tracks how far through the story the user has scrolled.
- Background gradually shifts from `#000` → `#040D0A` (very subtle green) as the story progresses.

---

### 3.5 Modules Section — 3D Card Flip
**Current state:** Static feature cards

**Planned animation:**
- Cards start at `y: 60px, opacity: 0, rotateX: -15deg` and animate in with GSAP ScrollTrigger when they enter the viewport.
- **Hover effect:** Each card performs a subtle `rotateX(5deg) rotateY(-5deg)` 3D tilt using Framer Motion `useMotionValue` + `useTransform`, tracking mouse position within the card boundary.
- A floating green orb light-effect follows the mouse within each card, creating a "light source" illusion.
- Card icons will use Rive `.riv` files (if time allows) for micro-looping animations (e.g., a leaf icon gently fluttering).

---

### 3.6 Market Section — Live Price Flash
**Current state:** Static mandi price cards

**Planned animation:**
- When a price changes, it flashes: green background if price went up, red background if it went down — CSS transition `0.3s ease`.
- Each price number animates from its previous value to the new value using a GSAP counter tween.
- The entire row receives a Framer Motion `layoutId` animation — when the sorted order of prices changes, cards smoothly animate into their new positions (like a live leaderboard).
- A subtle green pulse radiates from the "LIVE" indicator badge every 2 seconds.

---

### 3.7 Contracts Section — Timeline Reveal
**Current state:** Static

**Planned animation:**
- A vertical timeline appears in this section.
- As user scrolls, a green "progress line" draws itself downward (SVG `stroke-dashoffset` animation), revealing contract milestone nodes one by one.
- Each node pops in with a Framer Motion `spring` animation and a tiny checkmark that draws in from left to right.

---

### 3.8 Schemes / Eligibility Section — Accordion + Spotlight
**Current state:** Static list

**Planned animation:**
- Each scheme card has a Framer Motion `AnimatePresence` accordion: clicking it smoothly expands the content from `height: 0` to full height.
- A **spotlight effect** follows the mouse cursor across the grid of scheme cards — a subtle radial gradient brightness boost under the cursor, making the hovered card feel "illuminated."
- Eligible/Ineligible badges animate in with a spring pop when the eligibility checker result is returned.

---

### 3.9 Page Transitions (Framer Motion)
**Current state:** Hard page navigation (flash between pages)

**Planned animation:**
- Wrap all pages in Framer Motion `<AnimatePresence>`.
- **Exit animation:** Current page slides out to the left `x: -100vw` with opacity fade over `0.4s`.
- **Entry animation:** New page slides in from the right `x: 100vw → 0` with opacity fade over `0.4s`.
- A thin green progress bar sweeps across the top of the page during navigation (like YouTube's red bar).

---

### 3.10 Auth Pages — Gravity & Magnetism
**Current state:** GSAP clip-path reveal, magnetic button, char-drift title

**Planned additions:**
- **Background particles:** 30–50 tiny floating particles (green dots) that drift slowly using R3F `<Points>` or CSS `@keyframes`. Creates depth without weighing down the auth form.
- **Input field focus:** When a user clicks into an email/password input, Framer Motion animates a glowing border spreading from the cursor's entry point.
- **Submit button (enhanced):** On form submit, the button morphs into a horizontal loading bar using `layoutId` animation, then snaps back to the button shape with a checkmark on success.

---

### 3.11 AI Advisor Dashboard — Command Terminal Feel
**Current state:** Barebones test screen (placeholder)

**Planned animation (full redesign):**
- **Entry:** The entire dashboard assembles from component fragments. Sidebar panels slide in from the left. Chat panel scales up from `0.9` to `1.0`. Header fades in from top.
- **Message bubbles:** Each new AI message types itself out character by character with a soft glow around the text cursor.
- **Sidebar stats:** Numbers count up from 0 to their real value every time the sidebar refreshes.
- **Background:** A subtle animated dot-grid pattern using CSS `radial-gradient`. The dots pulse very slowly (5s period), like a breathing organism.
- **Orb Status Indicator:** The green status "orb" in the header slowly scales between `1.0` and `1.15` with a diffuse glow, indicating the AI is alive and listening.

---

## 4. Performance Strategy

All animations will follow these rules to maintain **90+ Lighthouse score:**

1. **GPU-only properties:** All animations use only `transform` and `opacity` — never `width`, `height`, `top`, or `left`. This ensures animations run on the GPU compositor thread (never triggering layout reflow).
2. **Lazy-load 3D:** The R3F `<Canvas>` scenes will be loaded via `next/dynamic` with `ssr: false` and a lightweight CSS fallback, ensuring the page renders instantly even if WebGL is loading.
3. **Reduced Motion:** A global `@media (prefers-reduced-motion: reduce)` rule will disable all non-essential animations for users who have accessibility motion sensitivity enabled.
4. **Lenis + ScrollTrigger synchronization:** Lenis emits scroll events that will be forwarded directly to GSAP's `ScrollTrigger` — ensuring perfectly synchronized scroll-driven animations without frame drops.

---

## 5. Implementation Priority Order

When you give the go-ahead, I will implement in this exact sequence:

| Phase | What Gets Built | Why First |
|---|---|---|
| **Phase 1** | Lenis Smooth Scroll (global) | Biggest visual impact, smallest code change |
| **Phase 2** | Framer Motion page transitions | Elevates the entire site feel instantly |
| **Phase 3** | R3F + Drei Hero Background | The 3D particle field — the wow factor |
| **Phase 4** | Enhanced Micro-interactions (Framer Motion) | Card tilts, input glows, button morphs |
| **Phase 5** | Scroll-driven Story + Timeline sections | Narrative depth |
| **Phase 6** | Full AI Dashboard UI redesign | The final product |
