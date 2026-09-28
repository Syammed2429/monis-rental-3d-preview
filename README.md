# 🌴 monis.rent — Interactive Bali Workspace Designer

An interactive, visual workspace designer built for **[monis.rent](https://monis.rent)** — the premier remote work equipment rental service for digital nomads, software engineers, and startups in Bali (Canggu, Pererenan, Ubud, Seminyak, and Uluwatu).

Instead of scrolling through a spreadsheet of products, users can visually customize their dream sit-stand office, watch their setup come to life in real-time, toggle day/sunset/night room ambiances, and reserve their equipment with next-day villa delivery.

---

## ⚡ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Compiler**: [React Compiler](https://react.dev/learn/react-compiler) (`reactCompiler: true` enabled, eliminating manual `useCallback`, `useMemo`, and `useEffect`)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) (`@hookform/resolvers/zod`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix / Base UI primitives: Dialog, Slider, Tabs, Select, Switch, Card, Badge, Tooltip)
- **Animations**: [Motion](https://motion.dev/) (`motion/react` for physics-based spring elevations and transitions)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Tactile Audio**: Custom Web Audio API synthesizer for realistic switch snaps, motor hum, and celebration fanfare
- **Celebration**: `canvas-confetti`
- **Package Manager**: `pnpm`

---

## 🎯 Coding Challenge Must-Haves Checklist

| Requirement | Implementation Details | Status |
| :--- | :--- | :---: |
| **Desk Selection (>=2 options)** | 4 distinct desks: Dual-Motor Electric Sit-Stand, Bamboo Electric, Walnut Executive, and Compact Mechanical with customizable finishes (Bamboo, Walnut, Stealth Black, Minimal White). | ✅ Complete |
| **Chair Selection (>=2 options)** | 4 distinct chairs: Monis Ergonomic 4D Mesh, Full-Pellicle Aeron Style, Executive Leather Recliner, and Active Wobble Stool with customizable colorways. | ✅ Complete |
| **Add Accessories** | Monitors (Apple 5K Studio Display, Xiaomi 34" Ultrawide, Redmi 4K, Dual 27" screens), Keyboards/Mice (MX Master, Apple Magic, Custom RGB Mech), Lighting (Smart Lamp, ScreenBar, Hue Signe), Monstera plants, Nespresso coffee machine, Marshall speaker, Laptop stand, HEPA air purifier. | ✅ Complete |
| **Visual Live Preview** | High-fidelity interactive vector canvas with smooth motorized desk height animation (sitting vs standing), customizable finishes, active monitor wallpapers/code editors, and lamp light beams. | ✅ Complete |
| **Summary / Checkout View** | Full modal with itemized hardware breakdown, duration slider (1-24 weeks) with progressive nomad discounts, Bali delivery zone picker, and instant booking confirmation card with reference ID. | ✅ Complete |
| **Next.js & Tailwind CSS** | Next.js 16 + Tailwind CSS v4 + TypeScript. | ✅ Complete |
| **Public Deployment** | Optimized for Vercel deployment. | ✅ Complete |
| **GitHub Collaborator** | Ready for `desent-bot` invitation with Read access. | ✅ Complete |

---

## 🚀 Key Features & Architectural Decisions

### 1. User-Centric Visual Canvas
- **Motorized Height Elevation**: A one-click toggle raises and lowers the desk between **74 cm** (sitting) and **108 cm** (standing) using spring physics. The digital LED display on the desk controller updates dynamically, and the chair tucks back realistically.
- **Bali Villa Ambiances**: Toggle between **Daylight** (bright tropical sun), **Bali Golden Hour Sunset** (warm amber glow and lush palm silhouette), and **Studio Night** (ambient monitor backlights & lamp glow).
- **Interactive Displays**: Clicking on the monitor screen cycles between an active VS Code IDE with TypeScript code, scenic Canggu surf wallpaper, and a Bali GMT+8 aesthetic clock.
- **Lighting Controls**: Turning the desk lamp or ScreenBar ON/OFF casts an ambient radial light cone across the desk surface.

### 2. Tailored for Digital Nomads in Bali
- **Curated 1-Click Presets**:
  - *The Bali Nomad Coder*: Ultrawide curved display, ergonomic 4D mesh, MX Master combo, Nespresso machine, and HEPA air purifier.
  - *The 5K Studio Creator*: Walnut executive desk, Apple Studio Display, Aeron-style chair, and vintage Marshall speaker.
  - *The Minimalist Founder*: Clean bamboo desk, active stool, 4K USB-C screen, and living Monstera plant.
  - *The Dual Battlestation*: Heavy-duty standing desk, dual 27" screens, custom mechanical keyboard, and broadcast mic.
- **Progressive Nomad Discounts**:
  - 1–3 weeks: Standard weekly rate
  - 4–7 weeks: **-10% Monthly Discount**
  - 8–11 weeks: **-20% Nomad Discount**
  - 12+ weeks: **-30% Island Resident Discount**
- **Bali Delivery Hubs**: Dedicated zone estimates for Canggu, Pererenan, Seminyak, Ubud, Uluwatu, and Sanur with next-day scheduling.
- **Currency Switcher**: Real-time conversion between USD ($) and Indonesian Rupiah (Rp).

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
src/
├── app/
│   ├── globals.css           # Tailwind v4 theme & custom scrollbar styles
│   ├── layout.tsx            # Metadata, OpenGraph & TooltipProvider
│   └── page.tsx              # Main studio workspace orchestrator
├── components/
│   ├── navbar/
│   │   └── Header.tsx        # Brand header, preset dropdown, audio & currency toggles
│   ├── ui/                   # shadcn UI components (tabs, dialog, slider, card, etc.)
│   └── workspace/
│       ├── AccessoriesRenderer.tsx  # Lamps, keyboards, laptop stand, coffee, plants
│       ├── ChairRenderer.tsx        # 4 ergonomic chair models & colorways
│       ├── CheckoutDialog.tsx       # Checkout summary modal, duration slider, confirmation
│       ├── ConfiguratorSidebar.tsx  # Tabbed product catalog & variant selectors
│       ├── DeskRenderer.tsx         # Motorized desk, telescoping legs, finishes
│       ├── MonitorRenderer.tsx      # Studio display, ultrawide, dual screens
│       ├── PresetSelector.tsx       # 1-click curated Bali setups
│       ├── RoomBackdrop.tsx         # Villa window, tropical palms, dynamic lighting
│       ├── SetupSummaryBar.tsx      # Floating bottom dock with live price & Rent CTA
│       └── WorkspaceCanvas.tsx      # Interactive stage unifying all renderers
├── data/
│   └── products.ts           # Authentic products & presets inspired by monis.rent
├── lib/
│   ├── audio.ts              # Web Audio API sound synthesizer
│   └── utils.ts              # ClassName helper utilities
└── types/
    └── workspace.ts          # TypeScript interfaces & domain models
```

---

## 🏃 Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd decent-agy

# Install dependencies using pnpm
pnpm install

# Start the development server
pnpm dev

# Build for production
pnpm build

# Run linter
pnpm lint
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔮 What I Would Improve With More Time

1. **3D WebGL / Three.js Scene**: Upgrade the current 2.5D vector composite engine into a full Three.js / React Three Fiber scene with realistic PBR materials, orbit controls, and 360° camera views.
2. **WebXR / Augmented Reality**: Allow digital nomads to point their phone camera in their Bali villa bedroom and project the 1:1 scale desk to verify space constraints.
3. **QRIS & Payment Gateway Integration**: Connect with Midtrans or Xendit for instant Indonesian QRIS scan, GoPay, or Stripe credit card checkout.
4. **URL Configuration Shareability & PDF Export**: Generate a downloadable PDF equipment invoice or shareable short link for company expense approvals.

---

## 🤝 Collaborator Access

To review this submission, please add `desent-bot` as a collaborator with **Read** access:
`GitHub Repo → Settings → Collaborators → Add people → desent-bot`
