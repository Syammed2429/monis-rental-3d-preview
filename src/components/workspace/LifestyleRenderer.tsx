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
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* 1. Outdoor Gear Zone (Left Side of Workspace) */}
      <div className="absolute bottom-10 left-3 sm:left-6 flex flex-col items-center z-12">
        {outdoorId === "lifestyle-outdoor-surfboard" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            className="pointer-events-auto cursor-pointer flex flex-col items-center group"
            onClick={() => onSelectCategory?.("bali-lifestyle")}
            title="Bali Wave Surfboard (Canggu Co.)"
          >
            {/* Custom 6'2 Epoxy Fish Surfboard */}
            <div className="relative w-16 h-72 rounded-t-[50%] rounded-b-[40%] bg-gradient-to-b from-amber-100 via-emerald-100 to-teal-200 border-2 border-amber-200 shadow-2xl overflow-hidden flex flex-col items-center">
              {/* Wooden Stringer center line */}
              <div className="absolute inset-y-0 w-0.5 bg-amber-800/40" />

              {/* Retro Tropical Stripe Graphic */}
              <div className="absolute top-20 inset-x-0 h-10 bg-gradient-to-r from-emerald-500/80 via-teal-400/80 to-amber-500/80 -rotate-12" />
              <div className="absolute top-28 inset-x-0 h-2 bg-amber-400/70 -rotate-12" />

              {/* Canggu Surf Co Logo */}
              <div className="relative z-10 mt-14 font-mono text-[7px] text-amber-900 font-black tracking-widest uppercase">
                Bali Wave
              </div>

              {/* Grip Pad Tail */}
              <div className="absolute bottom-2 w-10 h-12 bg-neutral-900/80 rounded-t-lg border-t border-white/20 flex flex-col items-center justify-center">
                <div className="w-6 h-1 bg-emerald-400/80 rounded-full" />
              </div>
            </div>

            {/* Subtle shadow on floor */}
            <div className="w-14 h-3 bg-black/40 rounded-full blur-xs mt-1" />
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
            {/* Electric Scooter Vector */}
            <div className="relative w-28 h-44 flex flex-col items-center justify-end">
              {/* Handlebars with Helmet */}
              <div className="w-20 h-2 bg-neutral-800 rounded-full border border-white/10 relative">
                {/* Vintage Moto Helmet hung on bar */}
                <div className="absolute -top-6 left-2 w-8 h-8 rounded-full bg-amber-600 border border-amber-400 shadow-md flex items-center justify-center">
                  <div className="w-6 h-3 rounded-full bg-neutral-950 mt-1" />
                </div>
                {/* Mirror */}
                <div className="absolute -top-3 right-1 w-2.5 h-2.5 rounded-full bg-slate-300 border border-neutral-700" />
              </div>

              {/* Steering Column */}
              <div className="w-3 h-24 bg-gradient-to-b from-neutral-800 to-neutral-950 border-x border-white/10" />

              {/* Body Chassis & Deck */}
              <div className="w-26 h-9 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 border border-white/20 shadow-xl flex items-center justify-between px-2">
                <div className="w-4 h-4 rounded-full bg-white/30" />
                <span className="text-[6.5px] font-mono text-white font-bold">NIU BALI</span>
              </div>

              {/* Front & Rear Wheels */}
              <div className="w-26 flex justify-between px-1 -mt-1">
                <div className="w-7 h-7 rounded-full bg-neutral-950 border-2 border-neutral-700 shadow-md flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-400" />
                </div>
                <div className="w-7 h-7 rounded-full bg-neutral-950 border-2 border-neutral-700 shadow-md flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-400" />
                </div>
              </div>
            </div>

            <div className="w-24 h-3 bg-black/40 rounded-full blur-xs mt-0.5" />
          </motion.div>
        )}

        {!outdoorId && (
          <button
            onClick={() => onSelectCategory?.("bali-lifestyle")}
            className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-dashed border-white/20 hover:border-emerald-400 hover:bg-emerald-500/10 text-[10px] text-neutral-300 hover:text-emerald-400 transition-all shadow-lg group backdrop-blur-md"
            title="Add Surfboard or Island Scooter"
          >
            <Plus className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform text-emerald-400" />
            <span>Add Outdoor Gear</span>
          </button>
        )}
      </div>

      {/* 2. Relax Zone (Right Side of Workspace) */}
      <div className="absolute bottom-10 right-3 sm:right-6 flex flex-col items-center z-12">
        {relaxId === "lifestyle-relax-beanbag" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pointer-events-auto cursor-pointer flex flex-col items-center group"
            onClick={() => onSelectCategory?.("bali-lifestyle")}
            title="Relax Zone: Waterproof Villa Bean Bag"
          >
            {/* Waterproof Ergonomic Bean Bag */}
            <div className="relative w-28 h-26 rounded-[2.5rem] bg-gradient-to-b from-[#2d4a3e] via-[#1f382e] to-[#15241e] border-2 border-emerald-500/30 shadow-2xl p-2 flex flex-col items-center justify-center overflow-hidden">
              {/* Fabric Folds / Seams */}
              <div className="absolute inset-2 rounded-[2rem] border border-white/10 opacity-70" />
              <div className="w-16 h-8 rounded-full bg-black/20 blur-xs" />

              {/* Monis Relax Zone Tag */}
              <div className="relative z-10 text-center">
                <div className="text-[7.5px] font-mono text-emerald-300/80 font-bold tracking-wider">
                  RELAX ZONE
                </div>
                <div className="text-[6.5px] text-neutral-400">Villa Lounger</div>
              </div>
            </div>

            {/* Shadow on Floor */}
            <div className="w-24 h-3 bg-black/50 rounded-full blur-xs mt-1" />
          </motion.div>
        )}

        {!relaxId && (
          <button
            onClick={() => onSelectCategory?.("bali-lifestyle")}
            className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-dashed border-white/20 hover:border-emerald-400 hover:bg-emerald-500/10 text-[10px] text-neutral-300 hover:text-emerald-400 transition-all shadow-lg group backdrop-blur-md"
            title="Add Waterproof Villa Bean Bag"
          >
            <Plus className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform text-emerald-400" />
            <span>Add Bean Bag</span>
          </button>
        )}
      </div>
    </div>
  );
}
