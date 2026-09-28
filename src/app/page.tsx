"use client";

import { useState } from "react";
import { WorkspaceConfig, Currency, ProductCategory, PresetSetup } from "@/types/workspace";
import { PRESETS } from "@/data/products";
import { Header } from "@/components/navbar/Header";
import { WorkspaceCanvas } from "@/components/workspace/WorkspaceCanvas";
import { ConfiguratorSidebar } from "@/components/workspace/ConfiguratorSidebar";
import { SetupSummaryBar } from "@/components/workspace/SetupSummaryBar";
import { PresetSelector } from "@/components/workspace/PresetSelector";
import { CheckoutDialog } from "@/components/workspace/CheckoutDialog";
import { Badge } from "@/components/ui/badge";
import { Truck, ShieldCheck, RefreshCw, Zap } from "lucide-react";

import { serializeConfigToUrl, parseConfigFromUrl } from "@/lib/config-url";

const STORAGE_KEY = "monis_bali_workspace_setup";

const DEFAULT_CONFIG: WorkspaceConfig = {
  deskId: "desk-dual-motor",
  deskFinish: "natural-bamboo",
  deskHeightState: "sitting",
  deskHeightCm: 74,
  chairId: "chair-ergonomic-mesh",
  chairColor: "stealth-black",
  monitorId: "monitor-ultrawide-curved",
  monitorDisplayMode: "bali-gradient",
  peripheralsId: "peripherals-mx-combo",
  lightingId: "light-smart-lamp",
  lampPowered: true,
  laptopStand: true,
  plantId: "lifestyle-plant-monstera",
  coffeeId: "lifestyle-coffee-nespresso",
  outdoorId: "lifestyle-outdoor-surfboard",
  relaxId: null,
  timeOfDay: "sunset",
};

function getInitialConfig(): WorkspaceConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const presetParam = urlParams.get("preset");
    if (presetParam) {
      const found = PRESETS.find((p) => p.id === presetParam);
      if (found) return { ...DEFAULT_CONFIG, ...found.config };
    }

    // 1. Check if URL has query parameters
    if (window.location.search && window.location.search.length > 1) {
      const parsed = parseConfigFromUrl(window.location.search);
      if (Object.keys(parsed).length > 0) {
        return { ...DEFAULT_CONFIG, ...parsed };
      }
    }
    // 2. Check localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsedJson = JSON.parse(saved);
      return { ...DEFAULT_CONFIG, ...parsedJson };
    }
  } catch {
    // fallback
  }
  return DEFAULT_CONFIG;
}

export default function Home() {
  const [config, setConfig] = useState<WorkspaceConfig>(getInitialConfig);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("desks");
  const [checkoutOpen, setCheckoutOpen] = useState<boolean>(false);

  // Sync state update to localStorage and URL search params without useEffect
  const handleUpdateConfig = (updater: (prev: WorkspaceConfig) => WorkspaceConfig) => {
    setConfig((prev) => {
      const next = updater(prev);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          const newUrl = serializeConfigToUrl(next);
          window.history.replaceState(null, "", newUrl);
        } catch {
          // ignore
        }
      }
      return next;
    });
  };

  const handleApplyPreset = (preset: PresetSetup) => {
    handleUpdateConfig((prev) => ({
      ...prev,
      ...preset.config,
    }));
  };

  const handleReset = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(STORAGE_KEY);
        window.history.replaceState(null, "", window.location.pathname);
      } catch {
        // ignore
      }
    }
    setConfig(DEFAULT_CONFIG);
  };

  const handleCurrencyToggle = () => {
    setCurrency((c) => (c === "USD" ? "IDR" : "USD"));
  };

  return (
    <div className="min-h-screen bg-[#0c0e14] text-neutral-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-neutral-950 pb-36">
      {/* Top Navbar */}
      <Header
        currentConfig={config}
        onApplyPreset={handleApplyPreset}
        currency={currency}
        onCurrencyToggle={handleCurrencyToggle}
        onOpenCheckout={() => setCheckoutOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-5 space-y-5">
        {/* Hero Section & Preset Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge
                variant="outline"
                className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[10px] font-mono"
              >
                monis.rent × Bali Nomads
              </Badge>
              <span className="text-xs text-neutral-400 hidden sm:inline">
                Next-Day Villa Delivery in Canggu, Ubud, Seminyak & Uluwatu
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Design Your Bali Dream Workspace
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
              Select your sit-stand desk, ergonomic chair, displays, and tropical villa extras.
              Watch your remote battlestation come to life in real-time.
            </p>
          </div>

          {/* Quick 1-Click Preset Bar */}
          <div className="w-full md:w-auto">
            <PresetSelector onSelectPreset={handleApplyPreset} activeConfig={config} />
          </div>
        </div>

        {/* Studio Workspace Grid: Left Canvas, Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-auto lg:h-[580px]">
          {/* Left Canvas: Live 2D/3D Vector Workspace (7 cols on lg, 8 on xl) */}
          <div className="lg:col-span-7 xl:col-span-8 h-[390px] sm:h-[460px] lg:h-full min-h-0">
            <WorkspaceCanvas
              config={config}
              onChangeConfig={handleUpdateConfig}
              onSelectCategory={(cat) => setActiveCategory(cat)}
            />
          </div>

          {/* Right Sidebar: Product Catalog & Customization Tabs (5 cols on lg, 4 on xl) */}
          <div className="lg:col-span-5 xl:col-span-4 h-[580px] lg:h-full min-h-0">
            <ConfiguratorSidebar
              config={config}
              onChangeConfig={handleUpdateConfig}
              currency={currency}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </div>

        {/* Below the fold: Benefits & Why Monis */}
        <section className="pt-10 border-t border-white/10 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <h2 className="text-xl font-bold text-white">
              Why Remote Workers in Bali Rent with Monis
            </h2>
            <p className="text-xs text-neutral-400">
              Skip the hassle of buying furniture in local shops or working with bad posture from villa sofas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-neutral-900/50 border border-white/5 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Next-Day Delivery</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Order today, arrive tomorrow. Delivered and professionally assembled right inside your villa bedroom or living space.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/50 border border-white/5 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Zero Deposit Required</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                No massive security deposits or complicated paperwork. Simply verify your WhatsApp or passport and pay as you go.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/50 border border-white/5 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <RefreshCw className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Flexible Rental Terms</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Rent for 1 week while on a workation, or 6 months as an island resident with up to 30% progressive long-stay discounts.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/50 border border-white/5 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Full Stress-Free Return</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Flying out to your next destination? Send us a WhatsApp pin, and our logistics crew will pack up and pick up everything.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Bottom Setup Summary Dock */}
      <SetupSummaryBar
        config={config}
        currency={currency}
        onOpenCheckout={() => setCheckoutOpen(true)}
        onReset={handleReset}
      />

      {/* Checkout / Summary Dialog Modal */}
      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        config={config}
        currency={currency}
      />
    </div>
  );
}
