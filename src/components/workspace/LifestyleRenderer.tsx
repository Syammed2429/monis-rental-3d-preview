"use client";

import { motion } from "motion/react";
import { ProductCategory } from "@/types/workspace";
import { Plus } from "lucide-react";

interface LifestyleRendererProps {
  outdoorId: string | null;
  relaxId: string | null;
  onSelectCategory?: (category: ProductCategory) => void;
}

export function LifestyleRenderer({
  outdoorId,
  relaxId,
  onSelectCategory,
}: LifestyleRendererProps) {
  return (
    <div className="absolute inset-0 pointer-events-none select-none z-15">
      {/* 1. Outdoor Gear Zone (Left Flank, safely outside desk edge) */}
      <div className="absolute bottom-6 left-5 sm:left-7 flex flex-col items-center">
        {outdoorId === "lifestyle-outdoor-surfboard" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            className="pointer-events-auto cursor-pointer flex flex-col items-center group"
            onClick={() => onSelectCategory?.("bali-lifestyle")}
            title="Bali Wave Surfboard (Canggu Co.)"
          >
            {/* Custom 6'2 Epoxy Fish Surfboard */}
            <div className="relative w-14 h-60 rounded-t-[50%] rounded-b-[40%] bg-gradient-to-b from-amber-100 via-emerald-100 to-teal-200 border-2 border-amber-200 shadow-xl overflow-hidden flex flex-col items-center">
              <div className="absolute inset-y-0 w-0.5 bg-amber-800/40" />
              <div className="absolute top-16 inset-x-0 h-8 bg-gradient-to-r from-emerald-500/80 via-teal-400/80 to-amber-500/80 -rotate-12" />
              <div className="absolute top-22 inset-x-0 h-1.5 bg-amber-400/70 -rotate-12" />

              <div className="relative z-10 mt-12 font-mono text-[6.5px] text-amber-900 font-black tracking-widest uppercase">
                Bali Wave
              </div>

              <div className="absolute bottom-2 w-9 h-10 bg-neutral-900/80 rounded-t-lg border-t border-white/20 flex flex-col items-center justify-center">
                <div className="w-5 h-1 bg-emerald-400/80 rounded-full" />
              </div>
            </div>

            <div className="w-12 h-2.5 bg-black/40 rounded-full blur-xs mt-0.5" />
          </motion.div>
        )}

        {outdoorId === "lifestyle-outdoor-scooter" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pointer-events-auto cursor-pointer flex flex-col items-center group"
            onClick={() => onSelectCategory?.("bali-lifestyle")}
            title="Niu Electric Scooter"
          >
            <div className="relative w-22 h-36 flex flex-col items-center justify-end">
              <div className="w-16 h-1.5 bg-neutral-800 rounded-full border border-white/10 relative">
                <div className="absolute -top-5 left-1 w-6 h-6 rounded-full bg-amber-600 border border-amber-400 shadow-md flex items-center justify-center">
                  <div className="w-5 h-2 bg-neutral-950 mt-1 rounded-xs" />
                </div>
                <div className="absolute -top-2.5 right-1 w-2 h-2 rounded-full bg-slate-300 border border-neutral-700" />
              </div>

              <div className="w-2.5 h-18 bg-gradient-to-b from-neutral-800 to-neutral-950 border-x border-white/10" />

              <div className="w-22 h-7 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-700 border border-white/20 shadow-xl flex items-center justify-between px-1.5">
                <div className="w-3 h-3 rounded-full bg-white/30" />
                <span className="text-[5.5px] font-mono text-white font-bold">NIU BALI</span>
              </div>

              <div className="w-22 flex justify-between px-1 -mt-1">
                <div className="w-5.5 h-5.5 rounded-full bg-neutral-950 border-2 border-neutral-700 shadow-md flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-neutral-400" />
                </div>
                <div className="w-5.5 h-5.5 rounded-full bg-neutral-950 border-2 border-neutral-700 shadow-md flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-neutral-400" />
                </div>
              </div>
            </div>

            <div className="w-20 h-2 bg-black/40 rounded-full blur-xs mt-0.5" />
          </motion.div>
        )}

        {!outdoorId && (
          <button
            onClick={() => onSelectCategory?.("bali-lifestyle")}
            className="pointer-events-auto flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-neutral-900/90 border border-dashed border-white/25 hover:border-emerald-400 hover:bg-emerald-500/10 text-[9px] text-neutral-300 hover:text-emerald-400 transition-all shadow-md group backdrop-blur-md"
            title="Add Surfboard or Island Scooter"
          >
            <Plus className="w-3 h-3 group-hover:rotate-90 transition-transform text-emerald-400" />
            <span>Outdoor Gear</span>
          </button>
        )}
      </div>

      {/* 2. Relax Zone (Right Flank, safely outside desk edge) */}
      <div className="absolute bottom-6 right-5 sm:right-7 flex flex-col items-center">
        {relaxId === "lifestyle-relax-beanbag" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pointer-events-auto cursor-pointer flex flex-col items-center group"
            onClick={() => onSelectCategory?.("bali-lifestyle")}
            title="Relax Zone: Waterproof Villa Bean Bag"
          >
            <div className="relative w-22 h-20 rounded-[2rem] bg-gradient-to-b from-[#2d4a3e] via-[#1f382e] to-[#15241e] border-2 border-emerald-500/30 shadow-xl p-1.5 flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute inset-1.5 rounded-[1.6rem] border border-white/10 opacity-70" />
              <div className="w-12 h-6 rounded-full bg-black/20 blur-xs" />

              <div className="relative z-10 text-center">
                <div className="text-[6.5px] font-mono text-emerald-300/80 font-bold tracking-wider">
                  RELAX ZONE
                </div>
                <div className="text-[5.5px] text-neutral-400">Villa Lounger</div>
              </div>
            </div>

            <div className="w-18 h-2 bg-black/50 rounded-full blur-xs mt-0.5" />
          </motion.div>
        )}

        {!relaxId && (
          <button
            onClick={() => onSelectCategory?.("bali-lifestyle")}
            className="pointer-events-auto flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-neutral-900/90 border border-dashed border-white/25 hover:border-emerald-400 hover:bg-emerald-500/10 text-[9px] text-neutral-300 hover:text-emerald-400 transition-all shadow-md group backdrop-blur-md"
            title="Add Waterproof Villa Bean Bag"
          >
            <Plus className="w-3 h-3 group-hover:rotate-90 transition-transform text-emerald-400" />
            <span>Add Bean Bag</span>
          </button>
        )}
      </div>
    </div>
  );
}
