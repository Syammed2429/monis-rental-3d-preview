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
    <div className={`border-t border-white/5 pt-2 ${className}`}>
      {label && <span className="mb-1.5 block text-[11px] text-neutral-400">{label}</span>}
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
              aria-pressed={isSelected}
              aria-label={`Select ${opt.name} finish`}
              title={opt.name}
              className={`flex-center h-8 w-8 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-none`}
            >
              <div
                className={`flex-center h-6 w-6 rounded-full transition-all ${
                  isSelected
                    ? "scale-110 ring-2 ring-emerald-400 ring-offset-2 ring-offset-neutral-900"
                    : "opacity-80 ring-1 ring-white/20 hover:scale-105 hover:opacity-100"
                }`}
                style={{ backgroundColor: opt.hex || opt.color }}
              >
                {isSelected && (
                  <Check
                    className={`h-3.5 w-3.5 stroke-[3] ${
                      opt.id === "minimal-white" ? "text-neutral-900" : "text-emerald-300"
                    }`}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
