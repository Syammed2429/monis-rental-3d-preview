"use client";

import { Plus } from "lucide-react";
import { motion } from "motion/react";
import { ProductCategory } from "@/types/workspace";

interface LifestyleRendererProps {
  outdoorId: string | null;
  relaxId: string | null;
  onSelectCategory?: (category: ProductCategory) => void;
  onSelectItem?: (category: ProductCategory, itemId?: string) => void;
}

export function LifestyleRenderer({
  outdoorId,
  relaxId,
  onSelectCategory,
  onSelectItem,
}: LifestyleRendererProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-15 select-none"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* 1. Outdoor Gear Zone (Left Flank, safely outside desk edge) */}
      <div
        className="absolute bottom-6 left-5 flex flex-col items-center sm:left-7"
        style={{ transform: "translateZ(18px)", transformStyle: "preserve-3d" }}
      >
        {outdoorId === "lifestyle-outdoor-surfboard" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            className="group pointer-events-auto flex cursor-pointer flex-col items-center"
            onClick={() =>
              onSelectItem
                ? onSelectItem("bali-lifestyle", "lifestyle-outdoor-surfboard")
                : onSelectCategory?.("bali-lifestyle")
            }
            title="Bali Wave Surfboard • Click to select"
          >
            {/* Custom 6'2 Epoxy Fish Surfboard */}
            <div className="relative flex h-60 w-14 flex-col items-center overflow-hidden rounded-t-[50%] rounded-b-[40%] border-2 border-amber-200 bg-gradient-to-b from-amber-100 via-emerald-100 to-teal-200 shadow-xl">
              <div className="absolute inset-y-0 w-0.5 bg-amber-800/40" />
              <div className="absolute inset-x-0 top-16 h-8 -rotate-12 bg-gradient-to-r from-emerald-500/80 via-teal-400/80 to-amber-500/80" />
              <div className="absolute inset-x-0 top-22 h-1.5 -rotate-12 bg-amber-400/70" />

              <div className="relative z-10 mt-12 font-mono text-[6.5px] font-black tracking-widest text-amber-900 uppercase">
                Bali Wave
              </div>

              <div className="absolute bottom-2 flex h-10 w-9 flex-col items-center justify-center rounded-t-lg border-t border-white/20 bg-neutral-900/80">
                <div className="h-1 w-5 rounded-full bg-emerald-400/80" />
              </div>
            </div>

            <div className="mt-0.5 h-2.5 w-12 rounded-full bg-black/40 blur-xs" />
          </motion.div>
        )}

        {outdoorId === "lifestyle-outdoor-scooter" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group pointer-events-auto flex cursor-pointer flex-col items-center"
            onClick={() =>
              onSelectItem
                ? onSelectItem("bali-lifestyle", "lifestyle-outdoor-scooter")
                : onSelectCategory?.("bali-lifestyle")
            }
            title="Niu Electric Scooter • Click to select"
          >
            <div className="relative flex h-36 w-22 flex-col items-center justify-end">
              <div className="relative h-1.5 w-16 rounded-full border border-white/10 bg-neutral-800">
                <div className="absolute -top-5 left-1 flex h-6 w-6 items-center justify-center rounded-full border border-amber-400 bg-amber-600 shadow-md">
                  <div className="mt-1 h-2 w-5 rounded-xs bg-neutral-950" />
                </div>
                <div className="absolute -top-2.5 right-1 h-2 w-2 rounded-full border border-neutral-700 bg-slate-300" />
              </div>

              <div className="h-18 w-2.5 border-x border-white/10 bg-gradient-to-b from-neutral-800 to-neutral-950" />

              <div className="flex h-7 w-22 items-center justify-between rounded-lg border border-white/20 bg-gradient-to-r from-emerald-600 to-teal-700 px-1.5 shadow-xl">
                <div className="h-3 w-3 rounded-full bg-white/30" />
                <span className="font-mono text-[5.5px] font-bold text-white">NIU BALI</span>
              </div>

              <div className="-mt-1 flex w-22 justify-between px-1">
                <div className="flex h-5.5 w-5.5 items-center justify-center rounded-full border-2 border-neutral-700 bg-neutral-950 shadow-md">
                  <div className="h-2 w-2 rounded-full bg-neutral-400" />
                </div>
                <div className="flex h-5.5 w-5.5 items-center justify-center rounded-full border-2 border-neutral-700 bg-neutral-950 shadow-md">
                  <div className="h-2 w-2 rounded-full bg-neutral-400" />
                </div>
              </div>
            </div>

            <div className="mt-0.5 h-2 w-20 rounded-full bg-black/40 blur-xs" />
          </motion.div>
        )}

        {!outdoorId && (
          <button
            onClick={() =>
              onSelectItem
                ? onSelectItem("bali-lifestyle", "lifestyle-outdoor-surfboard")
                : onSelectCategory?.("bali-lifestyle")
            }
            className="group pointer-events-auto flex items-center gap-1 rounded-full border border-dashed border-white/25 bg-neutral-900/90 px-2.5 py-1.5 text-[9px] text-neutral-300 shadow-md backdrop-blur-md transition-all hover:border-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-400"
            title="Add Surfboard or Island Scooter"
          >
            <Plus className="h-3 w-3 text-emerald-400 transition-transform group-hover:rotate-90" />
            <span>Outdoor Gear</span>
          </button>
        )}
      </div>

      {/* 2. Relax Zone (Right Flank, safely outside desk edge) */}
      <div
        className="absolute right-5 bottom-6 flex flex-col items-center sm:right-7"
        style={{ transform: "translateZ(14px)", transformStyle: "preserve-3d" }}
      >
        {relaxId === "lifestyle-relax-beanbag" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group pointer-events-auto flex cursor-pointer flex-col items-center"
            onClick={() =>
              onSelectItem
                ? onSelectItem("bali-lifestyle", "lifestyle-relax-beanbag")
                : onSelectCategory?.("bali-lifestyle")
            }
            title="Relax Zone: Waterproof Villa Bean Bag • Click to select"
          >
            <div className="relative flex h-20 w-22 flex-col items-center justify-center overflow-hidden rounded-[2rem] border-2 border-emerald-500/30 bg-gradient-to-b from-[#2d4a3e] via-[#1f382e] to-[#15241e] p-1.5 shadow-xl">
              <div className="absolute inset-1.5 rounded-[1.6rem] border border-white/10 opacity-70" />
              <div className="h-6 w-12 rounded-full bg-black/20 blur-xs" />

              <div className="relative z-10 text-center">
                <div className="font-mono text-[6.5px] font-bold tracking-wider text-emerald-300/80">
                  RELAX ZONE
                </div>
                <div className="text-[5.5px] text-neutral-400">Villa Lounger</div>
              </div>
            </div>

            <div className="mt-0.5 h-2 w-18 rounded-full bg-black/50 blur-xs" />
          </motion.div>
        )}

        {!relaxId && (
          <button
            onClick={() =>
              onSelectItem
                ? onSelectItem("bali-lifestyle", "lifestyle-relax-beanbag")
                : onSelectCategory?.("bali-lifestyle")
            }
            className="group pointer-events-auto flex items-center gap-1 rounded-full border border-dashed border-white/25 bg-neutral-900/90 px-2.5 py-1.5 text-[9px] text-neutral-300 shadow-md backdrop-blur-md transition-all hover:border-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-400"
            title="Add Waterproof Villa Bean Bag"
          >
            <Plus className="h-3 w-3 text-emerald-400 transition-transform group-hover:rotate-90" />
            <span>Add Bean Bag</span>
          </button>
        )}
      </div>
    </div>
  );
}
