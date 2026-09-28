"use client";

import React from "react";
import { WorkspaceConfig, Currency } from "@/types/workspace";
import { PRODUCTS } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ArrowRight, RotateCcw } from "lucide-react";
import { sound } from "@/lib/audio";

interface SetupSummaryBarProps {
  config: WorkspaceConfig;
  currency: Currency;
  onOpenCheckout: () => void;
  onReset: () => void;
}

export function SetupSummaryBar({
  config,
  currency,
  onOpenCheckout,
  onReset,
}: SetupSummaryBarProps) {
  // Selected items
  const desk = PRODUCTS.find((p) => p.id === config.deskId);
  const chair = PRODUCTS.find((p) => p.id === config.chairId);
  const monitor = PRODUCTS.find((p) => p.id === config.monitorId);
  const peripherals = PRODUCTS.find((p) => p.id === config.peripheralsId);
  const lighting = PRODUCTS.find((p) => p.id === config.lightingId);
  const plant = config.plantId ? PRODUCTS.find((p) => p.id === config.plantId) : null;
  const coffee = config.coffeeId ? PRODUCTS.find((p) => p.id === config.coffeeId) : null;
  const audio = config.audioId ? PRODUCTS.find((p) => p.id === config.audioId) : null;
  const laptopStand = config.laptopStand ? PRODUCTS.find((p) => p.id === "extra-laptop-stand") : null;
  const airPurifier = config.airPurifier ? PRODUCTS.find((p) => p.id === "extra-air-purifier") : null;

  const allItems = [
    desk,
    chair,
    monitor,
    peripherals,
    lighting,
    plant,
    coffee,
    audio,
    laptopStand,
    airPurifier,
  ].filter(Boolean);

  const totalWeeklyUSD = allItems.reduce((acc, curr) => acc + (curr?.weeklyPriceUSD || 0), 0);
  const totalWeeklyIDR = allItems.reduce((acc, curr) => acc + (curr?.weeklyPriceIDR || 0), 0);

  const formatPrice = (usd: number, idr: number) => {
    if (currency === "IDR") {
      return `Rp ${(idr / 1000).toLocaleString()}k`;
    }
    return `$${usd}`;
  };

  return (
    <div className="fixed bottom-4 inset-x-4 max-w-4xl mx-auto z-40">
      <div className="bg-neutral-950/90 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-full p-2.5 sm:px-5 sm:py-2.5 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: Summary Items Badge & Config summary */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white tracking-wide">
                  Your Custom Setup
                </span>
                <Badge
                  variant="outline"
                  className="bg-neutral-900 border-white/10 text-[10px] px-1.5 py-0 text-emerald-400 font-mono"
                >
                  {allItems.length} items
                </Badge>
              </div>

              <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 truncate max-w-[280px] sm:max-w-xs">
                <span className="truncate">{desk?.name.split(" ")[0]} Desk</span>
                <span>•</span>
                <span className="truncate">{chair?.name.split(" ")[1] || "Chair"}</span>
                <span>•</span>
                <span className="truncate">{monitor?.name.split(" ")[0]} Display</span>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              sound.playClick();
              onReset();
            }}
            className="w-8 h-8 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-900 sm:hidden"
            title="Reset to default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Right: Pricing & Rent CTA */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-white/10">
          <div className="text-left sm:text-right">
            <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono flex items-baseline gap-1">
              <span>{formatPrice(totalWeeklyUSD, totalWeeklyIDR)}</span>
              <span className="text-[10px] text-neutral-400 font-normal">/week</span>
            </div>
            <div className="text-[10px] text-neutral-400 font-mono">
              ~{formatPrice(Math.round(totalWeeklyUSD * 4.33), Math.round(totalWeeklyIDR * 4.33))}/mo
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                sound.playClick();
                onReset();
              }}
              className="w-8 h-8 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-900 border-white/10 hidden sm:inline-flex"
              title="Reset setup"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>

            <Button
              onClick={() => {
                sound.playSelect();
                onOpenCheckout();
              }}
              className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs h-9 px-4 sm:px-5 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:scale-105 active:scale-95 transition-all gap-1.5"
            >
              <span>Rent Setup</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
