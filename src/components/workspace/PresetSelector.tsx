"use client";

import React from "react";
import { PresetSetup, WorkspaceConfig } from "@/types/workspace";
import { PRESETS } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { sound } from "@/lib/audio";

interface PresetSelectorProps {
  onSelectPreset: (preset: PresetSetup) => void;
  activeConfig: WorkspaceConfig;
}

export function PresetSelector({ onSelectPreset, activeConfig }: PresetSelectorProps) {
  return (
    <div className="w-full flex items-center gap-2 overflow-x-auto py-1 px-1 custom-scrollbar">
      <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium shrink-0 mr-1">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
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
            onClick={() => {
              sound.playSelect();
              onSelectPreset(preset);
            }}
            className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all ${
              isMatched
                ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300 ring-1 ring-emerald-500/30"
                : "bg-neutral-900/60 border-white/10 text-neutral-300 hover:text-white hover:border-white/20 hover:bg-neutral-900"
            }`}
          >
            <span className="font-semibold">{preset.name}</span>
            <Badge
              variant="outline"
              className="text-[9px] px-1.5 py-0 h-4 border-white/10 text-neutral-400"
            >
              {preset.badge}
            </Badge>
          </button>
        );
      })}
    </div>
  );
}
