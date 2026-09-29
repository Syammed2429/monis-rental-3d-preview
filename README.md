# 🌴 monis.rent — Interactive Bali Workspace Designer

[![CI](https://github.com/desent-solutions/decent-agy/actions/workflows/ci.yml/badge.svg)](https://github.com/desent-solutions/decent-agy/actions/workflows/ci.yml)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.6-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.8-blue?logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-18%20Passing-success)](https://nodejs.org/)

An interactive, visual workspace designer built for **[monis.rent](https://monis.rent)** — the premier remote work equipment rental service for digital nomads, software engineers, and startups in Bali (Canggu, Pererenan, Ubud, Seminyak, and Uluwatu).

Instead of scrolling through a catalog spreadsheet, digital nomads can visually customize their dream sit-stand office in an interactive 3D studio, toggle Bali day/sunset/night room ambiances, share setups via link, and reserve equipment with next-day villa delivery.

---

## 👨‍💻 Candidate & Developer Profile

- **Developer**: **Dada Khalandar**
- **Coding Challenge**: [Desent Solutions Coding Test 2](https://www.desent.io/coding-test-2) (`monis.rent`)
- **Email**: [kerry.blig12@gmail.com](mailto:kerry.blig12@gmail.com)
- **WhatsApp**: [+62 816-3212-9228](https://wa.me/6281632129228)
- **GitHub**: [@syammed2429](https://github.com/syammed2429)
- **Architecture Highlights**: Next.js 16 React Server Components (RSC) split, Tailwind CSS v4, Zustand store, interactive 2.5D/3D vector canvas with physics spring elevations, Web Audio synthesizers, and WCAG 2.1 AA accessibility.

---

## ⚡ Tech Stack & Architecture

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack dev, Webpack production bundle)
- **Compiler**: [React Compiler](https://react.dev/learn/react-compiler) (`reactCompiler: true` enabled, eliminating manual `useCallback`, `useMemo`, and `useEffect`)
- **State Architecture**: [Zustand](https://github.com/pmndrs/zustand) with reactive deep URL synchronization (`src/lib/config-url.ts`) and safe localStorage fallback
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) (`@hookform/resolvers/zod`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with OKLCH token system and glassmorphism backdrops
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix / Base UI primitives: Dialog, Slider, Tabs, Select, Card, Badge)
- **Animations**: [Motion](https://motion.dev/) (`motion/react` for physics-based spring elevations and transitions)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Tactile Audio**: Custom Web Audio API synthesizer for realistic switch snaps, motor hum, and celebration fanfare
- **SEO & Social**: Dynamic Next.js OpenGraph image generator (`ImageResponse`), native `robots.ts` and `sitemap.ts`
- **Testing**: Built-in native Node.js test runner (`node:test`, `node:assert/strict`) with zero third-party testing bloat
- **CI/CD**: GitHub Actions quality gate covering lint, format check, TypeScript verification, unit tests, and production build

---

## 🎯 Coding Challenge Must-Haves Checklist

| Requirement                       | Implementation Details                                                                                                                                                                                                                                                              |   Status    |
| :-------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------: |
| **Desk Selection (>=2 options)**  | 4 distinct desks: Dual-Motor Electric Sit-Stand, Bamboo Electric, Walnut Executive, and Compact Mechanical with customizable finishes (Bamboo, Walnut, Stealth Black, Pure White).                                                                                                  | ✅ Complete |
| **Chair Selection (>=2 options)** | 4 distinct chairs: Monis Ergonomic 4D Mesh, Full-Pellicle Aeron Style, Executive Leather Recliner, and Active Wobble Stool with customizable colorways.                                                                                                                             | ✅ Complete |
| **Add Accessories**               | Monitors (Apple 5K Studio Display, Xiaomi 34" Ultrawide, Redmi 4K, Dual 27" screens), Keyboards/Mice (MX Master, Apple Magic, Custom RGB Mech), Lighting (Smart Lamp, ScreenBar, Hue Signe), Monstera plants, Nespresso coffee machine, Surfboards, Electric Scooter, Laptop stand. | ✅ Complete |
| **Visual Live Preview**           | High-fidelity interactive vector canvas with smooth motorized desk height animation (sitting 74cm vs standing 108cm), telescoping hydraulic legs, customizable finishes, active monitor wallpapers/code editors, and lamp light beams.                                              | ✅ Complete |
| **Summary / Checkout View**       | Full modal with itemized hardware breakdown, duration slider (1-24 weeks) with progressive nomad discounts, Bali delivery zone picker, address validation, and instant WhatsApp booking link with reference ID.                                                                     | ✅ Complete |
| **Next.js & Tailwind CSS**        | Next.js 16 + Tailwind CSS v4 + TypeScript.                                                                                                                                                                                                                                          | ✅ Complete |
| **Public Deployment**             | Optimized for zero-error Vercel deployment with offline-safe font stacks and static routes.                                                                                                                                                                                         | ✅ Complete |
| **GitHub Collaborator**           | Ready for `desent-bot` invitation with Read access.                                                                                                                                                                                                                                 | ✅ Complete |

---

## 🔒 Security Hardening & Penetration Testing (Pentest Review)

1. **HTTP Security Headers (`next.config.ts`)**:
   - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` (enforces HTTPS)
   - `X-Frame-Options: SAMEORIGIN` (mitigates clickjacking attacks)
   - `X-Content-Type-Options: nosniff` (prevents MIME-type sniffing exploits)
   - `Referrer-Policy: strict-origin-when-cross-origin` (protects user privacy on outbound referrals)
   - `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()` (disables unused browser capabilities)
2. **Parameter Tampering & XSS Defense (`src/lib/config-url.ts`)**:
   - Query string deserialization is strictly sanitized against known whitelists.
   - Malicious inputs, non-catalog product IDs, or script tags are discarded and safely fall back to defaults.
   - Numeric desk height parameter is strictly bounded between **70 cm** and **118 cm** (`NaN`, negative, or excessive values are stripped).
   - Zero usage of `dangerouslySetInnerHTML`, `innerHTML`, or `eval()`.
3. **Checkout Validation (`src/lib/validations/checkout.ts`)**:
   - Zod schema enforces input sanitization on full name, villa address, rental duration (1–24 weeks), and international WhatsApp numbers (blocking script/injection payloads).
4. **Dependency Audit**:
   - `pnpm audit` verifies 0 known vulnerabilities.

---

## 🧪 Automated Testing & QA Gate

Automated test suites written using Node.js native test runner (`node:test` and `node:assert/strict`):

```bash
# Run all automated tests
pnpm test

# Run TypeScript type verification
pnpm type-check

# Run ESLint
pnpm lint

# Check formatting
pnpm format:check
```

### Test Coverage Highlights:

- **`tests/pricing.test.ts`**:
  - Currency formatting for USD (`$120`) and IDR (`Rp 1,850k`).
  - Progressive duration discount brackets (0% for 1-3 weeks, 10% for 4-7 weeks, 20% for 8-11 weeks, 30% for 12+ weeks).
  - Accurate calculation of weekly base, discounted totals, refundable security deposit (1 week), and grand totals.
  - WhatsApp booking link generation with fully encoded inventory manifest.
- **`tests/config-url.test.ts`**:
  - Full bidirectional serialization & deserialization.
  - Parameter tampering protection (out-of-bounds height clamping, catalog whitelist enforcement).
- **`tests/checkout-validation.test.ts`**:
  - Zod schema edge cases, international phone regex, minimum character lengths, and bounds.

---

## 🚀 Key Features

### 1. User-Centric Visual Canvas

- **Motorized Height Elevation**: A one-click toggle raises and lowers the desk between **74 cm** (sitting) and **108 cm** (standing) using spring physics. The digital LED display on the desk controller updates dynamically, and the chair tucks back realistically.
- **Telescoping Hydraulic Columns**: Realistic two-stage motorized leg columns where upper hydraulic pistons extend from the tabletop down into stationary steel floor collars.
- **Bali Villa Ambiances**: Toggle between **Daylight** (bright tropical sun), **Bali Golden Hour Sunset** (warm amber glow and lush palm silhouette), and **Studio Night** (ambient monitor backlights & lamp glow).
- **Interactive Displays**: Clicking on the monitor screen cycles between an active VS Code IDE with TypeScript code, scenic Canggu surf wallpaper, and a Bali GMT+8 aesthetic clock.
- **Lighting Controls**: Turning the desk lamp or ScreenBar ON/OFF casts an ambient radial light cone across the desk surface.
- **Direct Canvas Interaction**: Click on the chair, desk surface, or lamp in the 3D stage to immediately focus that category in the sidebar.

### 2. Tailored for Digital Nomads in Bali

- **Curated 1-Click Presets**:
  - _The Bali Nomad Coder_: Ultrawide curved display, ergonomic 4D mesh, MX Master combo, Nespresso machine, and HEPA air purifier.
  - _The 5K Studio Creator_: Walnut executive desk, Apple Studio Display, Aeron-style chair, and vintage Marshall speaker.
  - _The Minimalist Founder_: Clean bamboo desk, active stool, 4K USB-C screen, and living Monstera plant.
  - _The Dual Battlestation_: Heavy-duty standing desk, dual 27" screens, custom mechanical keyboard, and broadcast mic.
- **Progressive Nomad Discounts**:
  - 1–3 weeks: Standard weekly rate
  - 4–7 weeks: **-10% Monthly Discount**
  - 8–11 weeks: **-20% Nomad Discount**
  - 12+ weeks: **-30% Island Resident Discount**
- **Bali Delivery Hubs**: Dedicated zone estimates for Canggu, Pererenan, Seminyak, Ubud, Uluwatu, and Sanur with next-day scheduling.
- **Currency Switcher**: Real-time conversion between USD ($) and Indonesian Rupiah (Rp).
- **Deep Shareable Links**: Instant URL copying with configuration state encoded in search params.

### 3. Tactile Audio Feedback

Built with zero external audio assets using the native Web Audio API (`src/lib/audio.ts`):

- Soft UI click on button presses.
- Motor hum during desk sit-stand elevation.
- Lamp toggle click.
- Triumphant chord fanfare when confirming an order.
- Mute/Unmute toggle in header.

---

## 🛠️ Project Structure

```
.github/
└── workflows/
    └── ci.yml               # GitHub Actions CI gate (Lint, Format, Types, Test, Build)
src/
├── app/
│   ├── apple-icon.tsx       # Dynamic Apple touch icon (180x180)
│   ├── error.tsx            # Route-level error boundary
│   ├── favicon.ico          # Custom branded monis.rent 32x32 binary icon
│   ├── globals.css          # Tailwind v4 theme, font fallbacks & tokens
│   ├── icon.tsx             # Dynamic 32x32 PNG branded favicon
│   ├── layout.tsx           # Metadata, OpenGraph & Theme Layout
│   ├── not-found.tsx        # Branded Bali 404 recovery stage
│   ├── opengraph-image.tsx  # Dynamic OG image card generated at build
│   ├── page.tsx             # Server Component (RSC) page orchestrator
│   ├── robots.ts            # SEO robots.txt handler
│   └── sitemap.ts           # SEO sitemap.xml handler
├── components/
│   ├── common/              # Error boundaries & fallback UI
│   ├── navbar/              # Header, preset dropdown, audio & currency toggles
│   ├── ui/                  # shadcn UI components (tabs, dialog, slider, card, etc.)
│   └── workspace/           # Canvas stage, desk, chair, monitors, sidebar & checkout
├── data/
│   └── products.ts          # Authentic products & presets inspired by monis.rent
├── lib/
│   ├── audio.ts             # Web Audio API sound synthesizer
│   ├── config-url.ts        # URL serialization & parameter tampering sanitizer
│   ├── pricing.ts           # Financial totals, duration discounts, WhatsApp URL
│   ├── utils.ts             # ClassName helper utilities
│   └── validations/
│       └── checkout.ts      # Zod checkout schema
├── store/
│   └── workspaceStore.ts    # Zustand state store with URL sync
└── types/
    └── workspace.ts         # TypeScript interfaces & domain models
tests/
├── checkout-validation.test.ts  # Zod schema validation tests
├── config-url.test.ts           # URL serialization & tampering tests
├── pricing.test.ts             # Financial & discount logic tests
├── register.mjs                # ESM test resolver registration
└── resolve-hook.mjs            # Next.js path alias resolver for Node test runner
```

---

## 🏃 Local Development

```bash
# 1. Install dependencies using pnpm
pnpm install

# 2. Run test suites
pnpm test

# 3. Check types & lint
pnpm type-check
pnpm lint

# 4. Start the development server
pnpm dev

# 5. Build for production
pnpm build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔮 What I Would Improve With More Time

1. **3D WebGL / Three.js Scene**: Upgrade the current 2.5D vector composite engine into a full Three.js / React Three Fiber scene with realistic PBR materials, orbit controls, and 360° camera views.
2. **WebXR / Augmented Reality**: Allow digital nomads to point their phone camera in their Bali villa bedroom and project the 1:1 scale desk to verify space constraints.
3. **Indonesian QRIS & Payment Gateway**: Direct integration with Midtrans or Xendit for instant Indonesian QRIS scan, GoPay, or Stripe credit card checkout alongside WhatsApp booking.
4. **Automated WhatsApp Business Webhook**: Automatically push confirmed bookings directly into the Monis logistics and inventory dispatch queue.

---

## 🤝 Collaborator Access

To review this submission, please add `desent-bot` as a collaborator with **Read** access:
`GitHub Repo → Settings → Collaborators → Add people → desent-bot`
