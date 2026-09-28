"use client";

import { useEffect } from "react";
import { ProductItem, ProductCategory, WorkspaceConfig, Currency, DeskFinish, ChairColor } from "@/types/workspace";
import { PRODUCTS } from "@/data/products";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Plus, SlidersHorizontal, Sparkles } from "lucide-react";
import { sound } from "@/lib/audio";

interface ConfiguratorSidebarProps {
  config: WorkspaceConfig;
  onChangeConfig: (updater: (prev: WorkspaceConfig) => WorkspaceConfig) => void;
  currency: Currency;
  activeCategory?: ProductCategory;
  onCategoryChange?: (category: ProductCategory) => void;
  selectedItemId?: string | null;
}

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
    const newCategory = val as ProductCategory;
    onCategoryChange?.(newCategory);
  };

  const formatPrice = (usd: number, idr: number) => {
    if (currency === "IDR") {
      return `Rp ${(idr / 1000).toLocaleString()}k`;
    }
    return `$${usd}`;
  };

  // Helper to select a desk
  const handleSelectDesk = (product: ProductItem) => {
    sound.playSelect();
    onChangeConfig((prev) => ({
      ...prev,
      deskId: product.id,
      deskFinish: (product.defaultFinish as DeskFinish) || prev.deskFinish,
    }));
  };

  // Helper to change desk finish
  const handleChangeDeskFinish = (finishId: DeskFinish) => {
    sound.playClick();
    onChangeConfig((prev) => ({
      ...prev,
      deskFinish: finishId,
    }));
  };

  // Helper to select a chair
  const handleSelectChair = (product: ProductItem) => {
    sound.playSelect();
    onChangeConfig((prev) => ({
      ...prev,
      chairId: product.id,
      chairColor: (product.defaultFinish as ChairColor) || prev.chairColor,
    }));
  };

  // Helper to change chair color
  const handleChangeChairColor = (colorId: ChairColor) => {
    sound.playClick();
    onChangeConfig((prev) => ({
      ...prev,
      chairColor: colorId,
    }));
  };

  // Helper to select monitor
  const handleSelectMonitor = (product: ProductItem) => {
    sound.playSelect();
    onChangeConfig((prev) => ({
      ...prev,
      monitorId: product.id,
    }));
  };

  // Helper to select peripherals
  const handleSelectPeripherals = (product: ProductItem) => {
    sound.playSelect();
    onChangeConfig((prev) => ({
      ...prev,
      peripheralsId: product.id,
    }));
  };

  // Helper to select lighting
  const handleSelectLighting = (product: ProductItem) => {
    sound.playSelect();
    onChangeConfig((prev) => ({
      ...prev,
      lightingId: product.id,
      lampPowered: true,
    }));
  };

  // Lifestyle toggle helpers
  const handleToggleLifestyle = (productId: string) => {
    sound.playSelect();
    if (productId === "lifestyle-plant-monstera") {
      onChangeConfig((prev) => ({
        ...prev,
        plantId: prev.plantId ? null : "lifestyle-plant-monstera",
      }));
    } else if (productId === "lifestyle-coffee-nespresso") {
      onChangeConfig((prev) => ({
        ...prev,
        coffeeId: prev.coffeeId ? null : "lifestyle-coffee-nespresso",
      }));
    } else if (productId === "lifestyle-outdoor-surfboard") {
      onChangeConfig((prev) => ({
        ...prev,
        outdoorId: prev.outdoorId === "lifestyle-outdoor-surfboard" ? null : "lifestyle-outdoor-surfboard",
      }));
    } else if (productId === "lifestyle-outdoor-scooter") {
      onChangeConfig((prev) => ({
        ...prev,
        outdoorId: prev.outdoorId === "lifestyle-outdoor-scooter" ? null : "lifestyle-outdoor-scooter",
      }));
    } else if (productId === "lifestyle-relax-beanbag") {
      onChangeConfig((prev) => ({
        ...prev,
        relaxId: prev.relaxId ? null : "lifestyle-relax-beanbag",
      }));
    } else if (productId === "lifestyle-laptop-stand") {
      onChangeConfig((prev) => ({
        ...prev,
        laptopStand: !prev.laptopStand,
      }));
    }
  };

  const isLifestyleActive = (productId: string) => {
    if (productId === "lifestyle-plant-monstera") return config.plantId !== null;
    if (productId === "lifestyle-coffee-nespresso") return config.coffeeId !== null;
    if (productId === "lifestyle-outdoor-surfboard") return config.outdoorId === "lifestyle-outdoor-surfboard";
    if (productId === "lifestyle-outdoor-scooter") return config.outdoorId === "lifestyle-outdoor-scooter";
    if (productId === "lifestyle-relax-beanbag") return config.relaxId !== null;
    if (productId === "lifestyle-laptop-stand") return config.laptopStand;
    return false;
  };

  return (
    <div className="w-full h-full flex flex-col bg-neutral-900/70 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      {/* Category Tabs Header */}
      <Tabs
        value={activeCategory}
        onValueChange={handleTabChange}
        className="w-full h-full flex flex-col min-h-0"
      >
        <div className="p-3 sm:p-4 border-b border-white/10 bg-neutral-950/50">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-semibold tracking-wide text-white">
                Customize Equipment
              </h2>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono hidden sm:inline">
              Next-day Bali delivery
            </span>
          </div>

          {/* Horizontally Scrollable Touch-Friendly Tab Bar */}
          <div className="overflow-x-auto pb-1 -mx-1 px-1 custom-scrollbar">
            <TabsList className="w-full flex sm:grid sm:grid-cols-6 min-w-[480px] sm:min-w-0 h-auto p-1 bg-neutral-950 border border-white/10 rounded-xl gap-1">
              <TabsTrigger
                value="desks"
                className="flex-1 text-xs py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-neutral-950 font-medium"
              >
                Desks
              </TabsTrigger>
              <TabsTrigger
                value="chairs"
                className="flex-1 text-xs py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-neutral-950 font-medium"
              >
                Chairs
              </TabsTrigger>
              <TabsTrigger
                value="monitors"
                className="flex-1 text-xs py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-neutral-950 font-medium"
              >
                Monitors
              </TabsTrigger>
              <TabsTrigger
                value="peripherals"
                className="flex-1 text-xs py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-neutral-950 font-medium"
              >
                Keyboards
              </TabsTrigger>
              <TabsTrigger
                value="lighting"
                className="flex-1 text-xs py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-neutral-950 font-medium"
              >
                Lighting
              </TabsTrigger>
              <TabsTrigger
                value="bali-lifestyle"
                className="flex-1 text-xs py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-neutral-950 font-medium"
              >
                Bali Extras
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Scrollable Products List Container */}
        <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 space-y-3.5 pr-2 sm:pr-3 custom-scrollbar">
          {/* --- TAB: DESKS --- */}
          <TabsContent value="desks" className="space-y-3 m-0 focus-visible:outline-none">
            <div className="text-xs text-neutral-400">
              Select your sit-stand workstation foundation. All motorized desks include anti-collision sensors.
            </div>

            {PRODUCTS.filter((p) => p.category === "desks").map((desk) => {
              const isSelected = config.deskId === desk.id;
              const isFocused = selectedItemId === desk.id;

              return (
                <Card
                  key={desk.id}
                  id={`product-card-${desk.id}`}
                  className={`transition-all duration-300 border cursor-pointer ${
                    isFocused
                      ? "bg-neutral-950/90 border-emerald-400 ring-2 ring-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.35)] scale-[1.01]"
                      : isSelected
                      ? "bg-neutral-950/80 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40"
                      : "bg-neutral-950/40 border-white/10 hover:border-white/20 hover:bg-neutral-950/60"
                  }`}
                  onClick={() => handleSelectDesk(desk)}
                >
                  <CardHeader className="p-3.5 pb-2">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-semibold">
                            {desk.brand}
                          </span>
                          {desk.tag && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0 h-4 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                            >
                              {desk.tag}
                            </Badge>
                          )}
                          {isFocused && (
                            <Badge className="text-[9px] px-1.5 py-0 h-4 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                              Active in 3D
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-sm font-semibold text-white mt-1">
                          {desk.name}
                        </CardTitle>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-white font-mono">
                          {formatPrice(desk.weeklyPriceUSD, desk.weeklyPriceIDR)}
                          <span className="text-[10px] text-neutral-400 font-normal">/wk</span>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-xs text-neutral-400 mt-1 line-clamp-2">
                      {desk.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-3.5 pt-1 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {desk.specs.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-neutral-900 text-neutral-300 px-2 py-0.5 rounded-md border border-white/5"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Finish Selector (if selected) */}
                    {isSelected && desk.availableFinishes && (
                      <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs text-neutral-400">Finish:</span>
                        <div className="flex items-center gap-2.5">
                          {desk.availableFinishes.map((f) => (
                            <button
                              key={f.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleChangeDeskFinish(f.id as DeskFinish);
                              }}
                              className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                                config.deskFinish === f.id
                                  ? "border-emerald-400 scale-110 shadow-md ring-2 ring-emerald-500/30"
                                  : "border-transparent opacity-75 hover:opacity-100"
                              }`}
                              style={{ backgroundColor: f.hex }}
                              title={f.name}
                            >
                              {config.deskFinish === f.id && (
                                <Check className="w-3.5 h-3.5 text-neutral-950 stroke-[3]" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button
                      size="sm"
                      variant={isSelected ? "default" : "outline"}
                      className={`w-full text-xs h-9 ${
                        isSelected
                          ? "bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold"
                          : "border-white/15 text-white hover:bg-white/10"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectDesk(desk);
                      }}
                    >
                      {isSelected ? (
                        <span className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> Selected on Desk
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <Plus className="w-3.5 h-3.5" /> Select This Desk
                        </span>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* --- TAB: CHAIRS --- */}
          <TabsContent value="chairs" className="space-y-3 m-0 focus-visible:outline-none">
            <div className="text-xs text-neutral-400">
              Ergonomic posture support designed to stay cool in tropical Bali climates.
            </div>

            {PRODUCTS.filter((p) => p.category === "chairs").map((chair) => {
              const isSelected = config.chairId === chair.id;
              const isFocused = selectedItemId === chair.id;

              return (
                <Card
                  key={chair.id}
                  id={`product-card-${chair.id}`}
                  className={`transition-all duration-300 border cursor-pointer ${
                    isFocused
                      ? "bg-neutral-950/90 border-emerald-400 ring-2 ring-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.35)] scale-[1.01]"
                      : isSelected
                      ? "bg-neutral-950/80 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40"
                      : "bg-neutral-950/40 border-white/10 hover:border-white/20 hover:bg-neutral-950/60"
                  }`}
                  onClick={() => handleSelectChair(chair)}
                >
                  <CardHeader className="p-3.5 pb-2">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-semibold">
                            {chair.brand}
                          </span>
                          {chair.tag && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0 h-4 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                            >
                              {chair.tag}
                            </Badge>
                          )}
                          {isFocused && (
                            <Badge className="text-[9px] px-1.5 py-0 h-4 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                              Active in 3D
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-sm font-semibold text-white mt-1">
                          {chair.name}
                        </CardTitle>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-white font-mono">
                          {formatPrice(chair.weeklyPriceUSD, chair.weeklyPriceIDR)}
                          <span className="text-[10px] text-neutral-400 font-normal">/wk</span>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-xs text-neutral-400 mt-1 line-clamp-2">
                      {chair.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-3.5 pt-1 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {chair.specs.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-neutral-900 text-neutral-300 px-2 py-0.5 rounded-md border border-white/5"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Color Swatches */}
                    {isSelected && chair.availableFinishes && (
                      <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs text-neutral-400">Color:</span>
                        <div className="flex items-center gap-2.5">
                          {chair.availableFinishes.map((c) => (
                            <button
                              key={c.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleChangeChairColor(c.id as ChairColor);
                              }}
                              className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                                config.chairColor === c.id
                                  ? "border-emerald-400 scale-110 shadow-md ring-2 ring-emerald-500/30"
                                  : "border-transparent opacity-75 hover:opacity-100"
                              }`}
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            >
                              {config.chairColor === c.id && (
                                <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button
                      size="sm"
                      variant={isSelected ? "default" : "outline"}
                      className={`w-full text-xs h-9 ${
                        isSelected
                          ? "bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold"
                          : "border-white/15 text-white hover:bg-white/10"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectChair(chair);
                      }}
                    >
                      {isSelected ? (
                        <span className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> Selected Chair
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <Plus className="w-3.5 h-3.5" /> Select This Chair
                        </span>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* --- TAB: MONITORS --- */}
          <TabsContent value="monitors" className="space-y-3 m-0 focus-visible:outline-none">
            <div className="text-xs text-neutral-400">
              High refresh rate, 4K USB-C, or 5K Apple displays. Includes HDMI & USB-C cables.
            </div>

            {PRODUCTS.filter((p) => p.category === "monitors").map((monitor) => {
              const isSelected = config.monitorId === monitor.id;
              const isFocused = selectedItemId === monitor.id;

              return (
                <Card
                  key={monitor.id}
                  id={`product-card-${monitor.id}`}
                  className={`transition-all duration-300 border cursor-pointer ${
                    isFocused
                      ? "bg-neutral-950/90 border-emerald-400 ring-2 ring-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.35)] scale-[1.01]"
                      : isSelected
                      ? "bg-neutral-950/80 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40"
                      : "bg-neutral-950/40 border-white/10 hover:border-white/20 hover:bg-neutral-950/60"
                  }`}
                  onClick={() => handleSelectMonitor(monitor)}
                >
                  <CardHeader className="p-3.5 pb-2">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-semibold">
                            {monitor.brand}
                          </span>
                          {monitor.tag && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0 h-4 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                            >
                              {monitor.tag}
                            </Badge>
                          )}
                          {isFocused && (
                            <Badge className="text-[9px] px-1.5 py-0 h-4 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                              Active in 3D
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-sm font-semibold text-white mt-1">
                          {monitor.name}
                        </CardTitle>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-white font-mono">
                          {formatPrice(monitor.weeklyPriceUSD, monitor.weeklyPriceIDR)}
                          <span className="text-[10px] text-neutral-400 font-normal">/wk</span>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-xs text-neutral-400 mt-1 line-clamp-2">
                      {monitor.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-3.5 pt-1 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {monitor.specs.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-neutral-900 text-neutral-300 px-2 py-0.5 rounded-md border border-white/5"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    <Button
                      size="sm"
                      variant={isSelected ? "default" : "outline"}
                      className={`w-full text-xs h-9 ${
                        isSelected
                          ? "bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold"
                          : "border-white/15 text-white hover:bg-white/10"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectMonitor(monitor);
                      }}
                    >
                      {isSelected ? (
                        <span className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> Mounted on Desk
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <Plus className="w-3.5 h-3.5" /> Mount This Display
                        </span>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* --- TAB: PERIPHERALS --- */}
          <TabsContent value="peripherals" className="space-y-3 m-0 focus-visible:outline-none">
            <div className="text-xs text-neutral-400">
              Wireless ergonomic keyboards, precision mice, and oversized felt desk pads.
            </div>

            {PRODUCTS.filter((p) => p.category === "peripherals").map((item) => {
              const isSelected = config.peripheralsId === item.id;
              const isFocused = selectedItemId === item.id;

              return (
                <Card
                  key={item.id}
                  id={`product-card-${item.id}`}
                  className={`transition-all duration-300 border cursor-pointer ${
                    isFocused
                      ? "bg-neutral-950/90 border-emerald-400 ring-2 ring-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.35)] scale-[1.01]"
                      : isSelected
                      ? "bg-neutral-950/80 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40"
                      : "bg-neutral-950/40 border-white/10 hover:border-white/20 hover:bg-neutral-950/60"
                  }`}
                  onClick={() => handleSelectPeripherals(item)}
                >
                  <CardHeader className="p-3.5 pb-2">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-semibold">
                            {item.brand}
                          </span>
                          {item.tag && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0 h-4 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                            >
                              {item.tag}
                            </Badge>
                          )}
                          {isFocused && (
                            <Badge className="text-[9px] px-1.5 py-0 h-4 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                              Active in 3D
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-sm font-semibold text-white mt-1">
                          {item.name}
                        </CardTitle>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-white font-mono">
                          {formatPrice(item.weeklyPriceUSD, item.weeklyPriceIDR)}
                          <span className="text-[10px] text-neutral-400 font-normal">/wk</span>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-xs text-neutral-400 mt-1 line-clamp-2">
                      {item.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-3.5 pt-1 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {item.specs.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-neutral-900 text-neutral-300 px-2 py-0.5 rounded-md border border-white/5"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    <Button
                      size="sm"
                      variant={isSelected ? "default" : "outline"}
                      className={`w-full text-xs h-9 ${
                        isSelected
                          ? "bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold"
                          : "border-white/15 text-white hover:bg-white/10"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPeripherals(item);
                      }}
                    >
                      {isSelected ? (
                        <span className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> Active Peripherals
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <Plus className="w-3.5 h-3.5" /> Equip Combo
                        </span>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* --- TAB: LIGHTING --- */}
          <TabsContent value="lighting" className="space-y-3 m-0 focus-visible:outline-none">
            <div className="text-xs text-neutral-400">
              Smart flicker-free illumination with ambient dimming and zero screen reflection.
            </div>

            {PRODUCTS.filter((p) => p.category === "lighting").map((light) => {
              const isSelected = config.lightingId === light.id;
              const isFocused = selectedItemId === light.id;

              return (
                <Card
                  key={light.id}
                  id={`product-card-${light.id}`}
                  className={`transition-all duration-300 border cursor-pointer ${
                    isFocused
                      ? "bg-neutral-950/90 border-emerald-400 ring-2 ring-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.35)] scale-[1.01]"
                      : isSelected
                      ? "bg-neutral-950/80 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40"
                      : "bg-neutral-950/40 border-white/10 hover:border-white/20 hover:bg-neutral-950/60"
                  }`}
                  onClick={() => handleSelectLighting(light)}
                >
                  <CardHeader className="p-3.5 pb-2">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-semibold">
                            {light.brand}
                          </span>
                          {light.tag && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0 h-4 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                            >
                              {light.tag}
                            </Badge>
                          )}
                          {isFocused && (
                            <Badge className="text-[9px] px-1.5 py-0 h-4 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                              Active in 3D
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-sm font-semibold text-white mt-1">
                          {light.name}
                        </CardTitle>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-white font-mono">
                          {formatPrice(light.weeklyPriceUSD, light.weeklyPriceIDR)}
                          <span className="text-[10px] text-neutral-400 font-normal">/wk</span>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-xs text-neutral-400 mt-1 line-clamp-2">
                      {light.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-3.5 pt-1 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {light.specs.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-neutral-900 text-neutral-300 px-2 py-0.5 rounded-md border border-white/5"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    <Button
                      size="sm"
                      variant={isSelected ? "default" : "outline"}
                      className={`w-full text-xs h-9 ${
                        isSelected
                          ? "bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold"
                          : "border-white/15 text-white hover:bg-white/10"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectLighting(light);
                      }}
                    >
                      {isSelected ? (
                        <span className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> Lighting Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <Plus className="w-3.5 h-3.5" /> Equip Lighting
                        </span>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* --- TAB: BALI LIFESTYLE & VILLA EXTRAS (Sketch Aligned) --- */}
          <TabsContent value="bali-lifestyle" className="space-y-3 m-0 focus-visible:outline-none">
            <div className="text-xs text-neutral-400">
              The iconic Bali lifestyle extensions from the concept sketch: Surfboard, Scooter, Bean Bag, Coffee Station, and Monstera Plant.
            </div>

            {PRODUCTS.filter((p) => p.category === "bali-lifestyle").map((item) => {
              const isSelected = isLifestyleActive(item.id);
              const isFocused = selectedItemId === item.id;

              return (
                <Card
                  key={item.id}
                  id={`product-card-${item.id}`}
                  className={`transition-all duration-300 border cursor-pointer ${
                    isFocused
                      ? "bg-neutral-950/90 border-emerald-400 ring-2 ring-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.35)] scale-[1.01]"
                      : isSelected
                      ? "bg-neutral-950/80 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40"
                      : "bg-neutral-950/40 border-white/10 hover:border-white/20 hover:bg-neutral-950/60"
                  }`}
                  onClick={() => handleToggleLifestyle(item.id)}
                >
                  <CardHeader className="p-3.5 pb-2">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-semibold">
                            {item.brand}
                          </span>
                          {item.tag && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0 h-4 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                            >
                              {item.tag}
                            </Badge>
                          )}
                          {isFocused && (
                            <Badge className="text-[9px] px-1.5 py-0 h-4 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                              Active in 3D
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-sm font-semibold text-white mt-1">
                          {item.name}
                        </CardTitle>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-white font-mono">
                          +{formatPrice(item.weeklyPriceUSD, item.weeklyPriceIDR)}
                          <span className="text-[10px] text-neutral-400 font-normal">/wk</span>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-xs text-neutral-400 mt-1 line-clamp-2">
                      {item.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-3.5 pt-1 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {item.specs.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-neutral-900 text-neutral-300 px-2 py-0.5 rounded-md border border-white/5"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    <Button
                      size="sm"
                      variant={isSelected ? "default" : "outline"}
                      className={`w-full text-xs h-9 ${
                        isSelected
                          ? "bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold"
                          : "border-white/15 text-white hover:bg-white/10"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleLifestyle(item.id);
                      }}
                    >
                      {isSelected ? (
                        <span className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> Added to Setup (Click to Remove)
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <Plus className="w-3.5 h-3.5" /> Add to Bali Setup
                        </span>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
