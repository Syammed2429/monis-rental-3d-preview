"use client";

import { useState } from "react";
import { ProductItem, ProductCategory, WorkspaceConfig, Currency, DeskFinish, ChairColor } from "@/types/workspace";
import { PRODUCTS } from "@/data/products";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, Plus, SlidersHorizontal, Laptop, Wind, Coffee, Music, TreePine } from "lucide-react";
import { sound } from "@/lib/audio";

interface ConfiguratorSidebarProps {
  config: WorkspaceConfig;
  onChangeConfig: (updater: (prev: WorkspaceConfig) => WorkspaceConfig) => void;
  currency: Currency;
  activeCategory?: ProductCategory;
  onCategoryChange?: (category: ProductCategory) => void;
}

export function ConfiguratorSidebar({
  config,
  onChangeConfig,
  currency,
  activeCategory = "desks",
  onCategoryChange,
}: ConfiguratorSidebarProps) {
  const [tab, setTab] = useState<ProductCategory>(activeCategory);

  const handleTabChange = (val: string) => {
    sound.playClick();
    const newCategory = val as ProductCategory;
    setTab(newCategory);
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

  return (
    <div className="w-full h-full flex flex-col bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      {/* Category Tabs Header */}
      <Tabs
        value={tab}
        onValueChange={handleTabChange}
        className="w-full h-full flex flex-col"
      >
        <div className="p-4 border-b border-white/10 bg-neutral-950/40">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-semibold tracking-wide text-white">
                Customize Equipment
              </h2>
            </div>
            <span className="text-[11px] text-neutral-400 font-mono">
              Next-day Bali delivery
            </span>
          </div>

          {/* Horizontal scrollable tab buttons */}
          <TabsList className="w-full grid grid-cols-3 sm:grid-cols-6 h-auto p-1 bg-neutral-950 border border-white/10 rounded-xl gap-1">
            <TabsTrigger
              value="desks"
              className="text-xs py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-neutral-950 font-medium"
            >
              Desks
            </TabsTrigger>
            <TabsTrigger
              value="chairs"
              className="text-xs py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-neutral-950 font-medium"
            >
              Chairs
            </TabsTrigger>
            <TabsTrigger
              value="monitors"
              className="text-xs py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-neutral-950 font-medium"
            >
              Monitors
            </TabsTrigger>
            <TabsTrigger
              value="peripherals"
              className="text-xs py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-neutral-950 font-medium"
            >
              Keyboards
            </TabsTrigger>
            <TabsTrigger
              value="lighting"
              className="text-xs py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-neutral-950 font-medium"
            >
              Lighting
            </TabsTrigger>
            <TabsTrigger
              value="villa-extras"
              className="text-xs py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-neutral-950 font-medium"
            >
              Villa Extras
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Scrollable Products List Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pr-3 custom-scrollbar">
          {/* --- TAB: DESKS --- */}
          <TabsContent value="desks" className="space-y-3.5 m-0 focus-visible:outline-none">
            <div className="text-xs text-neutral-400">
              Select your sit-stand workstation foundation. All motorized desks include anti-collision sensors.
            </div>

            {PRODUCTS.filter((p) => p.category === "desks").map((desk) => {
              const isSelected = config.deskId === desk.id;

              return (
                <Card
                  key={desk.id}
                  className={`transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? "bg-neutral-950/80 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40"
                      : "bg-neutral-950/40 border-white/10 hover:border-white/20 hover:bg-neutral-950/60"
                  }`}
                  onClick={() => handleSelectDesk(desk)}
                >
                  <CardHeader className="p-4 pb-2">
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
                        </div>
                        <CardTitle className="text-sm font-semibold text-white mt-1">
                          {desk.name}
                        </CardTitle>
                      </div>

                      <div className="text-right">
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

                  <CardContent className="p-4 pt-1 space-y-3">
                    {/* Specs Pills */}
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
                        <div className="flex items-center gap-2">
                          {desk.availableFinishes.map((f) => (
                            <button
                              key={f.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleChangeDeskFinish(f.id as DeskFinish);
                              }}
                              className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                                config.deskFinish === f.id
                                  ? "border-emerald-400 scale-110 shadow-md ring-2 ring-emerald-500/30"
                                  : "border-transparent opacity-75 hover:opacity-100"
                              }`}
                              style={{ backgroundColor: f.hex }}
                              title={f.name}
                            >
                              {config.deskFinish === f.id && (
                                <Check className="w-3 h-3 text-neutral-950 stroke-[3]" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <Button
                      size="sm"
                      variant={isSelected ? "default" : "outline"}
                      className={`w-full text-xs h-8 ${
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
          <TabsContent value="chairs" className="space-y-3.5 m-0 focus-visible:outline-none">
            <div className="text-xs text-neutral-400">
              Ergonomic posture support designed to stay cool in tropical Bali climates.
            </div>

            {PRODUCTS.filter((p) => p.category === "chairs").map((chair) => {
              const isSelected = config.chairId === chair.id;

              return (
                <Card
                  key={chair.id}
                  className={`transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? "bg-neutral-950/80 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40"
                      : "bg-neutral-950/40 border-white/10 hover:border-white/20 hover:bg-neutral-950/60"
                  }`}
                  onClick={() => handleSelectChair(chair)}
                >
                  <CardHeader className="p-4 pb-2">
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
                        </div>
                        <CardTitle className="text-sm font-semibold text-white mt-1">
                          {chair.name}
                        </CardTitle>
                      </div>

                      <div className="text-right">
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

                  <CardContent className="p-4 pt-1 space-y-3">
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
                        <div className="flex items-center gap-2">
                          {chair.availableFinishes.map((c) => (
                            <button
                              key={c.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleChangeChairColor(c.id as ChairColor);
                              }}
                              className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                                config.chairColor === c.id
                                  ? "border-emerald-400 scale-110 shadow-md ring-2 ring-emerald-500/30"
                                  : "border-transparent opacity-75 hover:opacity-100"
                              }`}
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            >
                              {config.chairColor === c.id && (
                                <Check className="w-3 h-3 text-white stroke-[3]" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button
                      size="sm"
                      variant={isSelected ? "default" : "outline"}
                      className={`w-full text-xs h-8 ${
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
          <TabsContent value="monitors" className="space-y-3.5 m-0 focus-visible:outline-none">
            <div className="text-xs text-neutral-400">
              High refresh rate, 4K USB-C, or 5K Apple displays. Includes HDMI & USB-C cables.
            </div>

            {PRODUCTS.filter((p) => p.category === "monitors").map((monitor) => {
              const isSelected = config.monitorId === monitor.id;

              return (
                <Card
                  key={monitor.id}
                  className={`transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? "bg-neutral-950/80 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40"
                      : "bg-neutral-950/40 border-white/10 hover:border-white/20 hover:bg-neutral-950/60"
                  }`}
                  onClick={() => handleSelectMonitor(monitor)}
                >
                  <CardHeader className="p-4 pb-2">
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
                        </div>
                        <CardTitle className="text-sm font-semibold text-white mt-1">
                          {monitor.name}
                        </CardTitle>
                      </div>

                      <div className="text-right">
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

                  <CardContent className="p-4 pt-1 space-y-3">
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
                      className={`w-full text-xs h-8 ${
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
          <TabsContent value="peripherals" className="space-y-3.5 m-0 focus-visible:outline-none">
            <div className="text-xs text-neutral-400">
              Wireless ergonomic keyboards, precision mice, and oversized felt desk pads.
            </div>

            {PRODUCTS.filter((p) => p.category === "peripherals").map((item) => {
              const isSelected = config.peripheralsId === item.id;

              return (
                <Card
                  key={item.id}
                  className={`transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? "bg-neutral-950/80 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40"
                      : "bg-neutral-950/40 border-white/10 hover:border-white/20 hover:bg-neutral-950/60"
                  }`}
                  onClick={() => handleSelectPeripherals(item)}
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-semibold">
                          {item.brand}
                        </span>
                        <CardTitle className="text-sm font-semibold text-white mt-1">
                          {item.name}
                        </CardTitle>
                      </div>
                      <div className="text-right">
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

                  <CardContent className="p-4 pt-1 space-y-3">
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
                      className={`w-full text-xs h-8 ${
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
          <TabsContent value="lighting" className="space-y-3.5 m-0 focus-visible:outline-none">
            <div className="text-xs text-neutral-400">
              Smart flicker-free illumination with ambient dimming and zero screen reflection.
            </div>

            {PRODUCTS.filter((p) => p.category === "lighting").map((light) => {
              const isSelected = config.lightingId === light.id;

              return (
                <Card
                  key={light.id}
                  className={`transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? "bg-neutral-950/80 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40"
                      : "bg-neutral-950/40 border-white/10 hover:border-white/20 hover:bg-neutral-950/60"
                  }`}
                  onClick={() => handleSelectLighting(light)}
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-semibold">
                          {light.brand}
                        </span>
                        <CardTitle className="text-sm font-semibold text-white mt-1">
                          {light.name}
                        </CardTitle>
                      </div>
                      <div className="text-right">
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

                  <CardContent className="p-4 pt-1 space-y-3">
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
                      className={`w-full text-xs h-8 ${
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

          {/* --- TAB: VILLA EXTRAS & WELLNESS --- */}
          <TabsContent value="villa-extras" className="space-y-4 m-0 focus-visible:outline-none">
            <div className="text-xs text-neutral-400">
              The little touches that turn a rental desk into an inspiring tropical Bali workspace.
            </div>

            {/* Quick Toggle Add-ons (Shadcn Switch controls) */}
            <div className="space-y-3 bg-neutral-950/60 p-3.5 rounded-2xl border border-white/10">
              {/* Laptop Riser Stand */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-white cursor-pointer">
                      Aluminum Laptop Riser (+{formatPrice(3, 50000)}/wk)
                    </Label>
                    <p className="text-[10px] text-neutral-400">
                      Positions your laptop screen at eye level beside monitor
                    </p>
                  </div>
                </div>
                <Switch
                  checked={config.laptopStand}
                  onCheckedChange={(checked) => {
                    sound.playClick();
                    onChangeConfig((prev) => ({ ...prev, laptopStand: checked }));
                  }}
                />
              </div>

              {/* Smart Air Purifier Elite */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Wind className="w-4 h-4" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-white cursor-pointer">
                      HEPA Air Purifier Elite (+{formatPrice(10, 160000)}/wk)
                    </Label>
                    <p className="text-[10px] text-neutral-400">
                      Filters tropical humidity, pollen & dust in your villa room
                    </p>
                  </div>
                </div>
                <Switch
                  checked={config.airPurifier}
                  onCheckedChange={(checked) => {
                    sound.playClick();
                    onChangeConfig((prev) => ({ ...prev, airPurifier: checked }));
                  }}
                />
              </div>

              {/* Tropical Bali Monstera Plant */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <TreePine className="w-4 h-4" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-white cursor-pointer">
                      Potted Monstera Deliciosa (+{formatPrice(3, 45000)}/wk)
                    </Label>
                    <p className="text-[10px] text-neutral-400">
                      Fresh living tropical plant in handcrafted terracotta pot
                    </p>
                  </div>
                </div>
                <Switch
                  checked={config.plantId !== null}
                  onCheckedChange={(checked) => {
                    sound.playClick();
                    onChangeConfig((prev) => ({
                      ...prev,
                      plantId: checked ? "extra-plant-monstera" : null,
                    }));
                  }}
                />
              </div>

              {/* Nespresso Coffee Machine */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-white cursor-pointer">
                      Nespresso Essenza Machine (+{formatPrice(9, 145000)}/wk)
                    </Label>
                    <p className="text-[10px] text-neutral-400">
                      19-bar espresso brewer + 10 complimentary roast pods
                    </p>
                  </div>
                </div>
                <Switch
                  checked={config.coffeeId !== null}
                  onCheckedChange={(checked) => {
                    sound.playClick();
                    onChangeConfig((prev) => ({
                      ...prev,
                      coffeeId: checked ? "extra-nespresso" : null,
                    }));
                  }}
                />
              </div>

              {/* Marshall Woburn III Speaker */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Music className="w-4 h-4" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-white cursor-pointer">
                      Marshall Woburn III Speaker (+{formatPrice(12, 190000)}/wk)
                    </Label>
                    <p className="text-[10px] text-neutral-400">
                      110W vintage bluetooth sound for your work soundtrack
                    </p>
                  </div>
                </div>
                <Switch
                  checked={config.audioId !== null}
                  onCheckedChange={(checked) => {
                    sound.playClick();
                    onChangeConfig((prev) => ({
                      ...prev,
                      audioId: checked ? "extra-speaker-marshall" : null,
                    }));
                  }}
                />
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
