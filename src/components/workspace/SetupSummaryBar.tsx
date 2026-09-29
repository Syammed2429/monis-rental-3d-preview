"use client";

import { ArrowRight, RotateCcw, ShoppingBag } from "lucide-react";
import { Currency, WorkspaceConfig } from "@/types/workspace";
import { sound } from "@/lib/audio";
import { calculateWorkspaceTotals, formatPrice } from "@/lib/pricing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 mx-auto max-w-4xl px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:inset-x-4 sm:bottom-4 sm:pb-0">
      <div className="pointer-events-auto flex-between gap-2 rounded-2xl border border-white/15 bg-neutral-950/95 p-2.5 shadow-2xl backdrop-blur-2xl sm:gap-3 sm:rounded-full sm:px-5 sm:py-2.5">
        {/* Left: Summary Items Badge & Config summary */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3" role="status" aria-live="polite">
          <div className="flex-center h-8 w-8 shrink-0 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
            <ShoppingBag className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="truncate text-xs font-bold tracking-wide text-white">
                {formatPrice(baseWeeklyUSD, baseWeeklyIDR, currency)}
                <span className="text-[10px] font-normal text-neutral-400">/wk</span>
              </span>
              <Badge
                variant="outline"
                className="shrink-0 border-white/10 bg-neutral-900 px-1.5 py-0 font-mono text-[9px] text-emerald-400 sm:text-[10px]"
              >
                {items.length} items
              </Badge>
            </div>

            <div className="hidden max-w-xs items-center gap-1.5 truncate text-[10px] text-neutral-400 sm:flex sm:text-[11px]">
              <span className="truncate">{desk?.name.split(" ")[0]} Desk</span>
              <span>•</span>
              <span className="truncate">{chair?.name.split(" ")[1] || "Chair"}</span>
              <span>•</span>
              <span className="truncate">
                {monitor ? `${monitor.name.split(" ")[0]} Display` : "No Display"}
              </span>
            </div>
            <div className="font-mono text-[9px] text-neutral-400 sm:hidden">
              ~{formatPrice(monthlyUSD, monthlyIDR, currency)}/mo
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="mr-2 hidden text-right font-mono text-[10px] text-neutral-400 sm:block">
            ~{formatPrice(monthlyUSD, monthlyIDR, currency)}/mo
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              sound.playClick();
              onReset();
            }}
            aria-label="Reset workspace configuration to default setup"
            className="h-8 w-8 rounded-full border-white/10 text-neutral-400 hover:bg-neutral-900 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-400"
            title="Reset setup"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>

          <Button
            onClick={() => {
              sound.playSelect();
              onOpenCheckout();
            }}
            aria-label="Proceed to checkout and rent workspace setup"
            className="h-8 gap-1 rounded-full bg-emerald-500 px-3.5 text-xs font-bold text-neutral-950 shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all hover:scale-105 hover:bg-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-400 active:scale-95 sm:h-9 sm:gap-1.5 sm:px-5"
          >
            <span>Rent Setup</span>
            <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
          </Button>
        </div>
      </div>
    </div>
  );
}
