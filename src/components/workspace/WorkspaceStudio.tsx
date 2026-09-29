"use client";

import { useEffect } from "react";
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

/**
 * WorkspaceStudio — Client-Side Interactive Orchestrator
 *
 * Encapsulates all reactive client state (Zustand store, deep URL hydration,
 * canvas interactivity, checkout drawer, and audio cues) while leaving
 * the root `src/app/page.tsx` as a pure React Server Component (RSC).
 */
export function WorkspaceStudio() {
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
    <>
      {/* Top Navbar */}
      <Header
        currentConfig={config}
        onApplyPreset={handleApplyPreset}
        currency={currency}
        onCurrencyToggle={toggleCurrency}
        onOpenCheckout={handleOpenCheckout}
      />

      {/* Main Studio Area */}
      <div className="mx-auto w-full max-w-7xl space-y-5 px-4 pt-5 sm:px-6">
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
      </div>

      {/* Floating Bottom Setup Summary Dock */}
      {!checkoutOpen && (
        <SetupSummaryBar
          config={config}
          currency={currency}
          onOpenCheckout={handleOpenCheckout}
          onReset={handleReset}
        />
      )}
    </>
  );
}
