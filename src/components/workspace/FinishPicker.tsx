"use client";

import { Check } from "lucide-react";
import { sound } from "@/lib/audio";

export interface FinishOption<T extends string = string> {
  id: T;
  name: string;
  hex?: string;
  color?: string;
}

interface FinishPickerProps<T extends string = string> {
  label?: string;
  options: FinishOption<T>[];
  selectedId: T;
  onChange: (id: T) => void;
  className?: string;
}

export function FinishPicker<T extends string = string>({
  label = "Finish:",
  options,
  selectedId,
  onChange,
  className = "",
}: FinishPickerProps<T>) {
  return (
    <div className={`pt-2 border-t border-white/5 ${className}`}>
      {label && <span className="text-[11px] text-neutral-400 mb-1.5 block">{label}</span>}
      <div className="flex items-center gap-2">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                sound.playClick();
                onChange(opt.id);
              }}
              className={`w-6 h-6 rounded-full flex-center transition-all ${
                isSelected
                  ? "ring-2 ring-emerald-400 ring-offset-2 ring-offset-neutral-900 scale-110"
                  : "hover:scale-105 opacity-80 hover:opacity-100 ring-1 ring-white/10"
              }`}
              style={{ backgroundColor: opt.hex || opt.color }}
              title={opt.name}
              aria-label={`Select ${opt.name}`}
            >
              {isSelected && (
                <Check
                  className={`w-3.5 h-3.5 stroke-[3] ${
                    opt.id === "minimal-white" ? "text-neutral-900" : "text-emerald-300"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
