"use client";

import { useEffect } from "react";
import { Lightbulb, SlidersHorizontal } from "lucide-react";
import {
  ChairColor,
  Currency,
  DeskFinish,
  ProductCategory,
  ProductItem,
  WorkspaceConfig,
} from "@/types/workspace";
import { sound } from "@/lib/audio";
import { PRODUCTS } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinishPicker } from "@/components/workspace/FinishPicker";
import { ProductCard } from "@/components/workspace/ProductCard";

interface ConfiguratorSidebarProps {
  config: WorkspaceConfig;
  onChangeConfig: (updater: (prev: WorkspaceConfig) => WorkspaceConfig) => void;
  currency: Currency;
  activeCategory?: ProductCategory;
  onCategoryChange?: (category: ProductCategory) => void;
  selectedItemId?: string | null;
}

const CATEGORY_TABS: { id: ProductCategory; label: string }[] = [
  { id: "desks", label: "Desks" },
  { id: "chairs", label: "Chairs" },
  { id: "monitors", label: "Monitors" },
  { id: "peripherals", label: "Keyboards" },
  { id: "lighting", label: "Lighting" },
  { id: "bali-lifestyle", label: "Villa Extras" },
];

export function ConfiguratorSidebar({
  config,
  onChangeConfig,
  currency,
  activeCategory = "desks",
  onCategoryChange,
  selectedItemId,
}: ConfiguratorSidebarProps) {
  // Smoothly scroll the selected item card into view whenever selected from 3D canvas
  useEffect(() => {
    if (!selectedItemId) return;
    const timer = setTimeout(() => {
      const cardEl = document.getElementById(`product-card-${selectedItemId}`);
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 80);
    return () => clearTimeout(timer);
  }, [selectedItemId, activeCategory]);

  const handleTabChange = (val: string) => {
    sound.playClick();
    onCategoryChange?.(val as ProductCategory);
  };

  // Selection handlers
  const handleSelectDesk = (product: ProductItem) => {
    sound.playSelect();
    onChangeConfig((prev) => ({
      ...prev,
      deskId: product.id,
      deskFinish: (product.defaultFinish as DeskFinish) || prev.deskFinish,
    }));
  };

  const handleChangeDeskFinish = (finishId: DeskFinish) => {
    sound.playClick();
    onChangeConfig((prev) => ({ ...prev, deskFinish: finishId }));
  };

  const handleSelectChair = (product: ProductItem) => {
    sound.playSelect();
    onChangeConfig((prev) => ({
      ...prev,
      chairId: product.id,
      chairColor: (product.defaultFinish as ChairColor) || prev.chairColor,
    }));
  };

  const handleChangeChairColor = (colorId: ChairColor) => {
    sound.playClick();
    onChangeConfig((prev) => ({ ...prev, chairColor: colorId }));
  };

  const handleSelectMonitor = (product: ProductItem) => {
    sound.playSelect();
    onChangeConfig((prev) => ({
      ...prev,
      monitorId: prev.monitorId === product.id ? null : product.id,
    }));
  };

  const handleSelectPeripherals = (product: ProductItem) => {
    sound.playSelect();
    onChangeConfig((prev) => ({
      ...prev,
      peripheralsId: prev.peripheralsId === product.id ? null : product.id,
    }));
  };

  const handleSelectLighting = (product: ProductItem) => {
    sound.playSelect();
    onChangeConfig((prev) => {
      const isSelected = prev.lightingId === product.id;
      return {
        ...prev,
        lightingId: isSelected ? null : product.id,
        lampPowered: !isSelected,
      };
    });
  };

  const handleToggleLifestyle = (productId: string) => {
    sound.playSelect();
    if (productId === "lifestyle-plant-monstera") {
      onChangeConfig((prev) => ({ ...prev, plantId: prev.plantId ? null : productId }));
    } else if (productId === "lifestyle-coffee-nespresso") {
      onChangeConfig((prev) => ({ ...prev, coffeeId: prev.coffeeId ? null : productId }));
    } else if (
      productId === "lifestyle-outdoor-surfboard" ||
      productId === "lifestyle-outdoor-scooter"
    ) {
      onChangeConfig((prev) => ({
        ...prev,
        outdoorId: prev.outdoorId === productId ? null : productId,
      }));
    } else if (productId === "lifestyle-relax-beanbag") {
      onChangeConfig((prev) => ({ ...prev, relaxId: prev.relaxId ? null : productId }));
    } else if (productId === "lifestyle-laptop-stand") {
      onChangeConfig((prev) => ({ ...prev, laptopStand: !prev.laptopStand }));
    }
  };

  const isLifestyleActive = (productId: string) => {
    if (productId === "lifestyle-plant-monstera") return Boolean(config.plantId);
    if (productId === "lifestyle-coffee-nespresso") return Boolean(config.coffeeId);
    if (productId === "lifestyle-outdoor-surfboard")
      return config.outdoorId === "lifestyle-outdoor-surfboard";
    if (productId === "lifestyle-outdoor-scooter")
      return config.outdoorId === "lifestyle-outdoor-scooter";
    if (productId === "lifestyle-relax-beanbag") return Boolean(config.relaxId);
    if (productId === "lifestyle-laptop-stand") return Boolean(config.laptopStand);
    return false;
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 shadow-2xl backdrop-blur-xl">
      {/* Top Header */}
      <div className="flex-between shrink-0 border-b border-white/10 bg-neutral-950/40 p-3 sm:p-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-emerald-400" />
          <h2 className="text-sm font-semibold tracking-tight text-white">Customize Equipment</h2>
        </div>
        <span className="flex items-center gap-1 font-mono text-[11px] text-emerald-400">
          Next-day Bali delivery
        </span>
      </div>

      {/* Tab Navigation */}
      <Tabs
        value={activeCategory}
        onValueChange={handleTabChange}
        className="flex min-h-0 flex-1 flex-col"
      >
        <div className="shrink-0 border-b border-white/5 bg-neutral-950/20 p-2.5 pb-1">
          <ScrollArea className="w-full pb-1">
            <TabsList className="flex w-max min-w-full items-center gap-1 rounded-xl border border-white/10 bg-neutral-950/80 p-1">
              {CATEGORY_TABS.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="rounded-lg px-3 py-1.5 text-xs transition-all data-[state=active]:bg-neutral-800 data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>

          {/* Dots Indicator */}
          <div className="flex-center gap-1.5 py-1">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className="p-1 focus:outline-none"
                aria-label={`Jump to ${tab.label}`}
              >
                <div
                  className={`rounded-full transition-all duration-300 ${
                    activeCategory === tab.id
                      ? "h-1.5 w-5 bg-emerald-400"
                      : "h-1.5 w-1.5 bg-neutral-600 hover:bg-neutral-400"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Products List Container */}
        <ScrollArea className="min-h-0 w-full flex-1">
          <div className="space-y-3.5 p-3 pr-3 sm:p-4">
            {/* DESKS */}
            <TabsContent value="desks" className="m-0 space-y-3 focus-visible:outline-none">
              <div className="text-xs text-neutral-400">
                Select your sit-stand workstation foundation. All motorized desks include
                anti-collision sensors.
              </div>
              {PRODUCTS.filter((p) => p.category === "desks").map((desk) => {
                const isSelected = config.deskId === desk.id;
                const isFocused = selectedItemId === desk.id;
                return (
                  <ProductCard
                    key={desk.id}
                    item={desk}
                    isSelected={isSelected}
                    isFocused={isFocused}
                    currency={currency}
                    onSelect={() => handleSelectDesk(desk)}
                    selectedLabel="Selected on Desk"
                    unselectedLabel={`Select ${desk.name.split(" ")[0]}`}
                  >
                    {(isSelected || isFocused) && desk.availableFinishes && (
                      <FinishPicker
                        label="Finish:"
                        options={desk.availableFinishes}
                        selectedId={config.deskFinish}
                        onChange={(fId) => handleChangeDeskFinish(fId as DeskFinish)}
                      />
                    )}
                  </ProductCard>
                );
              })}
            </TabsContent>

            {/* CHAIRS */}
            <TabsContent value="chairs" className="m-0 space-y-3 focus-visible:outline-none">
              <div className="text-xs text-neutral-400">
                Ergonomic seating engineered for long engineering and creative sessions in humid
                Bali climates.
              </div>
              {PRODUCTS.filter((p) => p.category === "chairs").map((chair) => {
                const isSelected = config.chairId === chair.id;
                const isFocused = selectedItemId === chair.id;
                return (
                  <ProductCard
                    key={chair.id}
                    item={chair}
                    isSelected={isSelected}
                    isFocused={isFocused}
                    currency={currency}
                    onSelect={() => handleSelectChair(chair)}
                    selectedLabel="Selected Ergonomic Chair"
                    unselectedLabel="Select This Chair"
                  >
                    {(isSelected || isFocused) && chair.availableFinishes && (
                      <FinishPicker
                        label="Color:"
                        options={chair.availableFinishes}
                        selectedId={config.chairColor}
                        onChange={(cId) => handleChangeChairColor(cId as ChairColor)}
                      />
                    )}
                  </ProductCard>
                );
              })}
            </TabsContent>

            {/* MONITORS */}
            <TabsContent value="monitors" className="m-0 space-y-3 focus-visible:outline-none">
              <div className="text-xs text-neutral-400">
                High-refresh rate, USB-C 90W single-cable power delivery displays. Includes
                heavy-duty gas spring arm.
              </div>
              {PRODUCTS.filter((p) => p.category === "monitors").map((monitor) => {
                const isSelected = config.monitorId === monitor.id;
                const isFocused = selectedItemId === monitor.id;
                return (
                  <ProductCard
                    key={monitor.id}
                    item={monitor}
                    isSelected={isSelected}
                    isFocused={isFocused}
                    currency={currency}
                    onSelect={() => handleSelectMonitor(monitor)}
                    selectedLabel="Mounted on Desk Arm"
                    unselectedLabel="Mount Display"
                  />
                );
              })}
            </TabsContent>

            {/* KEYBOARDS & PERIPHERALS */}
            <TabsContent value="peripherals" className="m-0 space-y-3 focus-visible:outline-none">
              <div className="text-xs text-neutral-400">
                Tactile typing experience & ergonomic mice to keep your wrists pain-free during
                all-day coding.
              </div>
              {PRODUCTS.filter((p) => p.category === "peripherals").map((item) => {
                const isSelected = config.peripheralsId === item.id;
                const isFocused = selectedItemId === item.id;
                return (
                  <ProductCard
                    key={item.id}
                    item={item}
                    isSelected={isSelected}
                    isFocused={isFocused}
                    currency={currency}
                    onSelect={() => handleSelectPeripherals(item)}
                    selectedLabel="Equipped on Desk Mat"
                    unselectedLabel="Equip Peripheral"
                  />
                );
              })}
            </TabsContent>

            {/* LIGHTING */}
            <TabsContent value="lighting" className="m-0 space-y-3 focus-visible:outline-none">
              <div className="text-xs text-neutral-400">
                Asymmetric optical screenbars and ambient lamps to reduce eye strain during tropical
                evening coding.
              </div>
              {PRODUCTS.filter((p) => p.category === "lighting").map((light) => {
                const isSelected = config.lightingId === light.id;
                const isFocused = selectedItemId === light.id;
                return (
                  <ProductCard
                    key={light.id}
                    item={light}
                    isSelected={isSelected}
                    isFocused={isFocused}
                    currency={currency}
                    onSelect={() => handleSelectLighting(light)}
                    selectedLabel="Equipped on Desk (Click to Remove)"
                    unselectedLabel="Equip Lighting"
                  >
                    {isSelected && (
                      <div className="flex-between border-t border-white/10 pt-2">
                        <span className="flex items-center gap-1.5 text-xs font-medium text-neutral-300">
                          <Lightbulb
                            className={`h-3.5 w-3.5 transition-colors ${
                              config.lampPowered
                                ? "fill-amber-400/30 text-amber-400"
                                : "text-neutral-500"
                            }`}
                          />
                          Lamp Power:
                        </span>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playLamp();
                            onChangeConfig((prev) => ({
                              ...prev,
                              lampPowered: !prev.lampPowered,
                            }));
                          }}
                          className={`h-7 rounded-full px-3 text-xs font-medium transition-all ${
                            config.lampPowered
                              ? "border-amber-400/50 bg-amber-400/20 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.25)] hover:bg-amber-400/30"
                              : "border-white/15 bg-neutral-900 text-neutral-400 hover:text-white"
                          }`}
                        >
                          <span
                            className={`mr-1.5 h-2 w-2 rounded-full transition-all ${
                              config.lampPowered
                                ? "bg-amber-400 shadow-[0_0_6px_#fbbf24]"
                                : "bg-neutral-600"
                            }`}
                          />
                          {config.lampPowered ? "ON (Turn Off)" : "OFF (Turn On)"}
                        </Button>
                      </div>
                    )}
                  </ProductCard>
                );
              })}
            </TabsContent>

            {/* BALI LIFESTYLE & VILLA EXTRAS */}
            <TabsContent
              value="bali-lifestyle"
              className="m-0 space-y-3 focus-visible:outline-none"
            >
              <div className="text-xs text-neutral-400">
                The iconic Bali lifestyle extensions from the concept sketch: Surfboard, Scooter,
                Bean Bag, Coffee Station, and Monstera Plant.
              </div>
              {PRODUCTS.filter((p) => p.category === "bali-lifestyle").map((item) => {
                const isSelected = isLifestyleActive(item.id);
                const isFocused = selectedItemId === item.id;
                return (
                  <ProductCard
                    key={item.id}
                    item={item}
                    isSelected={isSelected}
                    isFocused={isFocused}
                    currency={currency}
                    pricePrefix="+"
                    onSelect={() => handleToggleLifestyle(item.id)}
                    selectedLabel="Added to Setup (Click to Remove)"
                    unselectedLabel="Add to Bali Setup"
                  />
                );
              })}
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
