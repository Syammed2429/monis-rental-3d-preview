"use client";

import { useEffect } from "react";
import { RefreshCw, ShieldCheck, Truck, Zap } from "lucide-react";
import { PresetSetup, ProductCategory } from "@/types/workspace";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { Badge } from "@/components/ui/badge";
import { ComponentErrorBoundary } from "@/components/common/ComponentErrorBoundary";
import { Header } from "@/components/navbar/Header";
import { CheckoutPanel } from "@/components/workspace/CheckoutPanel";
import { ConfiguratorSidebar } from "@/components/workspace/ConfiguratorSidebar";
import { PresetSelector } from "@/components/workspace/PresetSelector";
import { SetupSummaryBar } from "@/components/workspace/SetupSummaryBar";
import { WorkspaceCanvas } from "@/components/workspace/WorkspaceCanvas";

export default function Home() {
  const config = useWorkspaceStore((state) => state.config);
  const currency = useWorkspaceStore((state) => state.currency);
  const activeCategory = useWorkspaceStore((state) => state.activeCategory);
  const selectedItemId = useWorkspaceStore((state) => state.selectedItemId);
  const checkoutOpen = useWorkspaceStore((state) => state.checkoutOpen);

  const updateConfig = useWorkspaceStore((state) => state.updateConfig);
  const selectItem = useWorkspaceStore((state) => state.selectItem);
  const setActiveCategory = useWorkspaceStore((state) => state.setActiveCategory);
  const setCheckoutOpen = useWorkspaceStore((state) => state.setCheckoutOpen);
  const applyPreset = useWorkspaceStore((state) => state.applyPreset);
  const resetConfig = useWorkspaceStore((state) => state.resetConfig);
  const toggleCurrency = useWorkspaceStore((state) => state.toggleCurrency);
  const initFromUrlIfPresent = useWorkspaceStore((state) => state.initFromUrlIfPresent);

  // Initialize once from URL if user arrived via a shared link, then cleans the address bar
  useEffect(() => {
    initFromUrlIfPresent();
  }, [initFromUrlIfPresent]);

  const handleOpenCheckout = () => {
    setCheckoutOpen(true);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setTimeout(() => {
        const section = document.getElementById("configurator-section");
        if (section) {
          const yOffset = -70;
          const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 50);
    }
  };

  const handleSelectItem = (category: ProductCategory, itemId?: string) => {
    selectItem(category, itemId);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      const section = document.getElementById("configurator-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleApplyPreset = (preset: PresetSetup) => {
    applyPreset(preset);
  };

  const handleReset = () => {
    resetConfig();
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0c0e14] pb-36 font-sans text-neutral-100 selection:bg-emerald-500 selection:text-neutral-950">
      {/* WCAG 2.1 Bypass Blocks: Skip to Configurator link */}
      <a
        href="#configurator-section"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-xl focus:bg-emerald-500 focus:px-4 focus:py-2.5 focus:font-sans focus:text-xs focus:font-bold focus:text-neutral-950 focus:shadow-2xl focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-neutral-950 focus:outline-none"
      >
        Skip to product configurator
      </a>

      {/* Top Navbar */}
      <Header
        currentConfig={config}
        onApplyPreset={handleApplyPreset}
        currency={currency}
        onCurrencyToggle={toggleCurrency}
        onOpenCheckout={handleOpenCheckout}
      />

      {/* Main Container */}
      <main className="mx-auto w-full max-w-7xl flex-1 space-y-5 px-4 pt-5 sm:px-6">
        {/* Hero Section & Preset Pills */}
        <div className="flex flex-col justify-between gap-3 border-b border-white/10 pb-4 md:flex-row md:items-end">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-emerald-500/30 bg-emerald-500/10 font-mono text-[10px] text-emerald-400"
              >
                monis.rent × Bali Nomads
              </Badge>
              <span className="hidden text-xs text-neutral-400 sm:inline">
                Next-Day Villa Delivery in Canggu, Ubud, Seminyak & Uluwatu
              </span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Design Your Bali Dream Workspace
            </h1>
            <p className="mt-1 max-w-2xl text-xs text-neutral-400 sm:text-sm">
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
        <div className="grid h-auto grid-cols-1 gap-5 lg:h-[580px] lg:grid-cols-12">
          {/* Left Canvas: Live 2D/3D Vector Workspace (7 cols on lg, 8 on xl) */}
          <div className="h-[430px] min-h-0 sm:h-[460px] lg:col-span-7 lg:h-full xl:col-span-8">
            <ComponentErrorBoundary fallbackTitle="3D Workspace Stage Error">
              <WorkspaceCanvas
                config={config}
                onChangeConfig={updateConfig}
                onSelectItem={handleSelectItem}
                onSelectCategory={(cat) => handleSelectItem(cat)}
              />
            </ComponentErrorBoundary>
          </div>

          {/* Right Sidebar: Product Catalog & Customization Tabs OR Inline Checkout Panel */}
          <div
            id="configurator-section"
            className="h-[580px] min-h-0 lg:col-span-5 lg:h-full xl:col-span-4"
          >
            <ComponentErrorBoundary fallbackTitle="Configuration Sidebar Error">
              {checkoutOpen ? (
                <CheckoutPanel
                  config={config}
                  currency={currency}
                  onCancel={() => setCheckoutOpen(false)}
                />
              ) : (
                <ConfiguratorSidebar
                  config={config}
                  onChangeConfig={updateConfig}
                  currency={currency}
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                  selectedItemId={selectedItemId}
                />
              )}
            </ComponentErrorBoundary>
          </div>
        </div>

        {/* Below the fold: Benefits & Why Monis */}
        <section className="space-y-6 border-t border-white/10 pt-10">
          <div className="mx-auto max-w-xl space-y-1.5 text-center">
            <h2 className="text-xl font-bold text-white">
              Why Remote Workers in Bali Rent with Monis
            </h2>
            <p className="text-xs text-neutral-400">
              Skip the hassle of buying furniture in local shops or working with bad posture from
              villa sofas.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2 rounded-2xl border border-white/5 bg-neutral-900/50 p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <Truck className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Next-Day Delivery</h3>
              <p className="text-xs leading-relaxed text-neutral-400">
                Order today, arrive tomorrow. Delivered and professionally assembled right inside
                your villa bedroom or living space.
              </p>
            </div>

            <div className="space-y-2 rounded-2xl border border-white/5 bg-neutral-900/50 p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Zero Deposit Required</h3>
              <p className="text-xs leading-relaxed text-neutral-400">
                No massive security deposits or complicated paperwork. Simply verify your WhatsApp
                or passport and pay as you go.
              </p>
            </div>

            <div className="space-y-2 rounded-2xl border border-white/5 bg-neutral-900/50 p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <RefreshCw className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Flexible Rental Terms</h3>
              <p className="text-xs leading-relaxed text-neutral-400">
                Rent for 1 week while on a workation, or 6 months as an island resident with up to
                30% progressive long-stay discounts.
              </p>
            </div>

            <div className="space-y-2 rounded-2xl border border-white/5 bg-neutral-900/50 p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <Zap className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Full Stress-Free Return</h3>
              <p className="text-xs leading-relaxed text-neutral-400">
                Flying out to your next destination? Send us a WhatsApp pin, and our logistics crew
                will pack up and pick up everything.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Bottom Setup Summary Dock */}
      {!checkoutOpen && (
        <SetupSummaryBar
          config={config}
          currency={currency}
          onOpenCheckout={handleOpenCheckout}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
