"use client";

import { WorkspaceConfig, Currency } from "@/types/workspace";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ArrowRight, RotateCcw } from "lucide-react";
import { sound } from "@/lib/audio";
import { calculateWorkspaceTotals, formatPrice } from "@/lib/pricing";

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
  const { items, baseWeeklyUSD, baseWeeklyIDR } = calculateWorkspaceTotals(config, 1);

  const desk = items.find((p) => p.category === "desks");
  const chair = items.find((p) => p.category === "chairs");
  const monitor = items.find((p) => p.category === "monitors");

  const monthlyUSD = Math.round(baseWeeklyUSD * 4.33);
  const monthlyIDR = Math.round(baseWeeklyIDR * 4.33);

  return (
    <div className="fixed bottom-0 inset-x-0 sm:bottom-4 sm:inset-x-4 max-w-4xl mx-auto z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-0 pointer-events-none">
      <div className="bg-neutral-950/95 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-full p-2.5 sm:px-5 sm:py-2.5 shadow-2xl flex-between gap-2 sm:gap-3 pointer-events-auto">
        {/* Left: Summary Items Badge & Config summary */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex-center shrink-0">
            <ShoppingBag className="w-4 h-4" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-xs font-bold text-white tracking-wide truncate">
                {formatPrice(baseWeeklyUSD, baseWeeklyIDR, currency)}
                <span className="text-[10px] text-neutral-400 font-normal">/wk</span>
              </span>
              <Badge
                variant="outline"
                className="bg-neutral-900 border-white/10 text-[9px] sm:text-[10px] px-1.5 py-0 text-emerald-400 font-mono shrink-0"
              >
                {items.length} items
              </Badge>
            </div>

            <div className="text-[10px] sm:text-[11px] text-neutral-400 hidden sm:flex items-center gap-1.5 truncate max-w-xs">
              <span className="truncate">{desk?.name.split(" ")[0]} Desk</span>
              <span>•</span>
              <span className="truncate">{chair?.name.split(" ")[1] || "Chair"}</span>
              <span>•</span>
              <span className="truncate">{monitor ? `${monitor.name.split(" ")[0]} Display` : "No Display"}</span>
            </div>
            <div className="text-[9px] text-neutral-400 sm:hidden font-mono">
              ~{formatPrice(monthlyUSD, monthlyIDR, currency)}/mo
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="hidden sm:block text-right mr-2 font-mono text-[10px] text-neutral-400">
            ~{formatPrice(monthlyUSD, monthlyIDR, currency)}/mo
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              sound.playClick();
              onReset();
            }}
            className="w-8 h-8 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-900 border-white/10"
            title="Reset setup"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>

          <Button
            onClick={() => {
              sound.playSelect();
              onOpenCheckout();
            }}
            className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs h-8 sm:h-9 px-3.5 sm:px-5 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:scale-105 active:scale-95 transition-all gap-1 sm:gap-1.5"
          >
            <span>Rent Setup</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Button>
        </div>
      </div>
    </div>
  );
}
