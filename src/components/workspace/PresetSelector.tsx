"use client";

import { Sparkles } from "lucide-react";
import { PresetSetup, WorkspaceConfig } from "@/types/workspace";
import { sound } from "@/lib/audio";
import { PRESETS } from "@/data/products";
import { Badge } from "@/components/ui/badge";

interface PresetSelectorProps {
  onSelectPreset: (preset: PresetSetup) => void;
  activeConfig: WorkspaceConfig;
}

export function PresetSelector({ onSelectPreset, activeConfig }: PresetSelectorProps) {
  return (
    <div className="custom-scrollbar flex w-full items-center gap-2 overflow-x-auto px-1 py-1">
      <div className="mr-1 flex shrink-0 items-center gap-1.5 text-xs font-medium text-neutral-400">
        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
        <span className="hidden sm:inline">Presets:</span>
      </div>

      {PRESETS.map((preset) => {
        // Quick heuristic to check if preset matches current
        const isMatched =
          activeConfig.deskId === preset.config.deskId &&
          activeConfig.chairId === preset.config.chairId &&
          activeConfig.monitorId === preset.config.monitorId;

        return (
          <button
            key={preset.id}
            type="button"
            onClick={() => {
              sound.playSelect();
              onSelectPreset(preset);
            }}
            aria-pressed={isMatched}
            aria-label={`Apply preset: ${preset.name} (${preset.badge})`}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
              isMatched
                ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
                : "border-white/10 bg-neutral-900/60 text-neutral-300 hover:border-white/20 hover:bg-neutral-900 hover:text-white"
            }`}
          >
            <span className="font-semibold">{preset.name}</span>
            <Badge
              variant="outline"
              className="h-4 border-white/10 px-1.5 py-0 text-[9px] text-neutral-400"
            >
              {preset.badge}
            </Badge>
          </button>
        );
      })}
    </div>
  );
}
