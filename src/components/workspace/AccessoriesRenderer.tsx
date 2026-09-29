"use client";

import { motion } from "motion/react";
import { ProductCategory } from "@/types/workspace";
import { Plus } from "lucide-react";

interface AccessoriesRendererProps {
  peripheralsId: string | null;
  lightingId: string | null;
  lampPowered: boolean;
  onToggleLamp?: () => void;
  laptopStand: boolean;
  plantId: string | null;
  coffeeId: string | null;
  onSelectCategory?: (category: ProductCategory) => void;
  onSelectItem?: (category: ProductCategory, itemId?: string) => void;
}

export function AccessoriesRenderer({
  peripheralsId,
  lightingId,
  lampPowered,
  onToggleLamp,
  laptopStand,
  plantId,
  coffeeId,
  onSelectCategory,
  onSelectItem,
}: AccessoriesRendererProps) {
  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* 1. Large Minimalist Felt Desk Mat (Rests directly on desk surface • Draggable • z-20) */}
      {peripheralsId && (
        <motion.div
          drag="x"
          dragConstraints={{ left: -70, right: 70 }}
          dragElastic={0.06}
          dragMomentum={false}
          style={{ touchAction: "none" }}
          whileDrag={{ scale: 1.02 }}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onSelectItem ? onSelectItem("peripherals", peripheralsId) : onSelectCategory?.("peripherals");
          }}
          className="absolute top-1 left-1/2 -translate-x-1/2 w-[410px] h-[34px] rounded-xl bg-neutral-900/90 border border-white/10 shadow-inner flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing group/mat z-20"
          title="Slide desk mat • Click to configure peripherals"
        >
          <div className="absolute -top-6 opacity-0 group-hover/mat:opacity-100 transition-opacity bg-neutral-900/90 text-white text-[8px] px-2 py-0.5 rounded-full border border-white/20 shadow-lg pointer-events-none whitespace-nowrap">
            ⌨️ Slide Mat & Keyboard • Click to Select
          </div>
          {/* Keyboard & Mouse Area */}
          <div className="flex items-center gap-6">
            {/* Keyboards */}
            {peripheralsId === "peripherals-mx-combo" && (
              <div className="flex items-center gap-5">
                {/* MX Keys Backlit Keyboard */}
                <div className="w-44 h-5.5 rounded-md bg-stone-900 border border-white/20 shadow-md flex items-center px-1.5 justify-between">
                  <div className="w-32 h-3 bg-neutral-950 rounded flex gap-0.5 items-center px-1">
                    <div className="w-22 h-1.5 bg-stone-700 rounded-xs" />
                    <div className="w-7 h-1.5 bg-stone-700 rounded-xs" />
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/90" />
                </div>

                {/* MX Master 3S Mouse */}
                <div className="w-5.5 h-7 rounded-2xl bg-stone-900 border border-white/20 shadow-md flex flex-col items-center pt-1 relative">
                  <div className="w-1.5 h-2 rounded-sm bg-neutral-700 border border-white/30" />
                  <div className="w-1 h-1 rounded-full bg-cyan-400 mt-0.5" />
                </div>
              </div>
            )}

            {peripheralsId === "peripherals-apple-magic" && (
              <div className="flex items-center gap-5">
                {/* Apple Magic Keyboard Silver */}
                <div className="w-40 h-5 rounded-md bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 border border-white/80 shadow-md flex items-center px-1.5 justify-between">
                  <div className="w-30 h-2.5 bg-white rounded-xs shadow-xs" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 border border-slate-400" />
                </div>

                {/* Apple Magic Trackpad Silver */}
                <div className="w-9 h-6.5 rounded-md bg-gradient-to-br from-slate-100 to-slate-200 border border-white shadow-md" />
              </div>
            )}

            {peripheralsId === "peripherals-custom-mech" && (
              <div className="flex items-center gap-5">
                {/* Custom Mechanical Keyboard */}
                <div className="w-42 h-5.5 rounded-md bg-zinc-950 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.25)] flex items-center px-1.5 justify-between relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-amber-500/10" />
                  <div className="w-32 h-3 bg-neutral-900 rounded flex gap-0.5 items-center px-1 relative z-10">
                    <div className="w-22 h-1.5 bg-emerald-950 rounded-xs border border-emerald-500/40" />
                    <div className="w-7 h-1.5 bg-amber-950 rounded-xs border border-amber-500/40" />
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse relative z-10" />
                </div>

                {/* Ergonomic Gaming Mouse */}
                <div className="w-5.5 h-7 rounded-2xl bg-zinc-950 border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.25)] flex flex-col items-center pt-1">
                  <div className="w-1.5 h-2 rounded-sm bg-emerald-600" />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* 2. Aluminum Laptop Stand (Rests flush on desk surface • Draggable across desk • z-35 foreground) */}
      {laptopStand && (
        <motion.div
          drag
          dragConstraints={{ left: -20, right: 280, top: -12, bottom: 12 }}
          dragElastic={0.06}
          dragMomentum={false}
          style={{ touchAction: "none" }}
          whileDrag={{ scale: 1.05 }}
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute bottom-0 left-8 flex flex-col items-center z-35 pointer-events-auto cursor-grab active:cursor-grabbing group/laptop"
          title="Drag anywhere on desk • Click to configure"
          onClick={(e) => {
            e.stopPropagation();
            onSelectItem ? onSelectItem("bali-lifestyle", "lifestyle-laptop-stand") : onSelectCategory?.("bali-lifestyle");
          }}
        >
          <div className="absolute -top-6 opacity-0 group-hover/laptop:opacity-100 transition-opacity bg-neutral-900/90 text-white text-[8px] px-2 py-0.5 rounded-full border border-white/20 shadow-lg pointer-events-none whitespace-nowrap">
            💻 Slide Laptop Stand • Click to Select
          </div>
          {/* Laptop Screen with clean modern wallpaper */}
          <div className="w-24 h-16 rounded-md bg-neutral-900 p-1 border border-neutral-700 shadow-xl flex flex-col">
            <div className="w-full flex-1 rounded bg-gradient-to-tr from-emerald-950 via-teal-900 to-slate-900 flex flex-col justify-between p-1 select-none border border-white/5">
              <div className="flex justify-between items-center text-[5.5px] text-neutral-300">
                <span className="font-semibold text-emerald-300">Secondary</span>
                <span>100% ⚡</span>
              </div>
              <div className="text-[6px] text-white/90 font-medium tracking-tight text-center">
                Villa Desk
              </div>
              <div className="text-[5px] text-emerald-400/80 font-mono text-right">
                Connected
              </div>
            </div>
          </div>
          {/* Laptop Base */}
          <div className="w-26 h-1.5 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-b shadow-sm" />
          {/* Angled CNC Aluminum Riser Stand (Grounded on wooden surface) */}
          <div className="w-14 h-7 border-x-3 border-b-3 border-slate-400/80 rounded-b-md shadow-md -mt-0.5" />
        </motion.div>
      )}

      {/* 3. Desk Lighting (Anglepoise Lamp / ScreenBar) */}
      {lightingId === "light-smart-lamp" && (
        <motion.div
          drag
          dragConstraints={{ left: -70, right: 260, top: -12, bottom: 12 }}
          dragElastic={0.06}
          dragMomentum={false}
          style={{ touchAction: "none" }}
          whileDrag={{ scale: 1.05 }}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onToggleLamp?.();
            onSelectItem ? onSelectItem("lighting", lightingId) : onSelectCategory?.("lighting");
          }}
          className="absolute bottom-0 left-22 pointer-events-auto cursor-pointer group/lamp flex flex-col items-center z-35 cursor-grab active:cursor-grabbing"
          title={`Slide along desk • Click to turn ${lampPowered ? "OFF" : "ON"}`}
        >
          <div className="absolute -top-6 opacity-0 group-hover/lamp:opacity-100 transition-opacity bg-neutral-900/90 text-white text-[8px] px-2 py-0.5 rounded-full border border-white/20 shadow-lg pointer-events-none whitespace-nowrap z-50">
            💡 Slide Lamp • Click to Turn {lampPowered ? "OFF" : "ON"}
          </div>
          {/* Light Fixture Horizontal Bar */}
          <div className="w-22 h-2 bg-slate-100 rounded-full border border-slate-300 shadow-md relative">
            {/* LED Underside */}
            <div
              className={`w-18 mx-auto h-1 rounded-full transition-all duration-300 ${
                lampPowered
                  ? "bg-amber-100 shadow-[0_0_20px_rgba(254,243,199,0.9)]"
                  : "bg-neutral-300"
              }`}
            />
          </div>

          {/* Pivoting Stem */}
          <div className="w-1.5 h-26 bg-gradient-to-b from-slate-200 to-slate-400 relative">
            <div className="absolute top-4 -right-1 w-2.5 h-6 rounded-full border-r-2 border-amber-500" />
          </div>

          {/* Minimalist Round Base (Rests flush on desk surface) */}
          <div className="w-8 h-2 bg-slate-200 rounded-full border border-slate-300 shadow-md flex items-center justify-center">
            <div
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                lampPowered ? "bg-amber-400" : "bg-neutral-400"
              }`}
            />
          </div>

          {/* Dynamic Light Beam Cast */}
          {lampPowered && (
            <div className="absolute top-[8px] -left-12 w-44 h-36 bg-[radial-gradient(ellipse_at_top,rgba(254,240,138,0.25)_0%,transparent_75%)] pointer-events-none blur-xs" />
          )}
        </motion.div>
      )}

      {lightingId === "light-screenbar" && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onToggleLamp?.();
            onSelectItem ? onSelectItem("lighting", "light-screenbar") : onSelectCategory?.("lighting");
          }}
          className="absolute -top-[195px] left-1/2 -translate-x-1/2 pointer-events-auto cursor-pointer group flex flex-col items-center z-35"
          title={`Click to turn ScreenBar ${lampPowered ? "OFF" : "ON"}`}
        >
          <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900/90 text-white text-[8px] px-2 py-0.5 rounded-full border border-white/20 shadow-lg pointer-events-none whitespace-nowrap z-50">
            💡 ScreenBar • Click to Turn {lampPowered ? "OFF" : "ON"}
          </div>
          {/* ScreenBar Clamped atop Monitor Bezel */}
          <div className="w-56 h-2 bg-neutral-900 rounded-full border border-neutral-700 shadow-lg relative flex items-center justify-center">
            <div
              className={`w-52 h-1 rounded-full transition-all duration-300 ${
                lampPowered
                  ? "bg-amber-100 shadow-[0_0_18px_rgba(254,240,138,0.9)]"
                  : "bg-neutral-800"
              }`}
            />
          </div>

          {/* Downward Light Glow Cast */}
          {lampPowered && (
            <div className="absolute top-[6px] -left-16 w-88 h-60 bg-[radial-gradient(ellipse_at_top,rgba(254,243,199,0.2)_0%,transparent_80%)] pointer-events-none blur-xs" />
          )}
        </div>
      )}

      {/* 4. Tropical Bali Monstera Deliciosa (Right Desk Edge • Draggable) */}
      {plantId === "lifestyle-plant-monstera" ? (
        <motion.div
          drag
          dragConstraints={{ left: -340, right: 40, top: -12, bottom: 12 }}
          dragElastic={0.06}
          dragMomentum={false}
          style={{ touchAction: "none" }}
          whileDrag={{ scale: 1.05 }}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onSelectItem ? onSelectItem("bali-lifestyle", "lifestyle-plant-monstera") : onSelectCategory?.("bali-lifestyle");
          }}
          className="absolute bottom-0 right-4 flex flex-col items-center z-35 pointer-events-auto cursor-grab active:cursor-grabbing group/plant"
          title="Drag plant along desk • Click to customize"
        >
          <div className="absolute -top-6 opacity-0 group-hover/plant:opacity-100 transition-opacity bg-neutral-900/90 text-white text-[8px] px-2 py-0.5 rounded-full border border-white/20 shadow-lg pointer-events-none whitespace-nowrap">
            🌿 Slide Plant • Click to Select
          </div>
          {/* Lush Monstera Leaves Vector */}
          <svg className="w-20 h-20 text-emerald-600 drop-shadow-md" viewBox="0 0 100 100" fill="none">
            <path
              d="M 50 80 Q 20 60 15 30 Q 30 15 45 40 Q 40 55 50 80 Z"
              fill="#059669"
              stroke="#047857"
              strokeWidth="1.5"
            />
            <path
              d="M 50 80 Q 50 40 45 10 Q 60 10 65 35 Q 58 60 50 80 Z"
              fill="#10b981"
              stroke="#059669"
              strokeWidth="1.5"
            />
            <path
              d="M 50 80 Q 80 65 85 35 Q 70 20 58 45 Q 60 65 50 80 Z"
              fill="#047857"
              stroke="#065f46"
              strokeWidth="1.5"
            />
            <circle cx="28" cy="35" r="2.5" fill="#181a20" opacity="0.6" />
            <circle cx="34" cy="25" r="2" fill="#181a20" opacity="0.6" />
            <circle cx="72" cy="40" r="2.5" fill="#181a20" opacity="0.6" />
          </svg>

          {/* Terracotta Balinese Planter (Rests flush on desk wood) */}
          <div className="w-12 h-9 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 rounded-b-xl border-t-2 border-amber-600 shadow-xl flex items-center justify-center">
            <div className="w-8 h-1 bg-amber-900/60 rounded-full" />
          </div>
          <div className="w-14 h-1.5 bg-amber-900 rounded-full shadow-md" />
        </motion.div>
      ) : (
        /* Dotted Hotspot: + Place a Plant! */
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectItem ? onSelectItem("bali-lifestyle", "lifestyle-plant-monstera") : onSelectCategory?.("bali-lifestyle");
          }}
          className="absolute bottom-2 right-4 pointer-events-auto flex items-center gap-1 px-2 py-1 rounded-full bg-neutral-900/90 border border-dashed border-emerald-500/50 hover:border-emerald-400 hover:bg-emerald-500/10 text-[9px] text-emerald-400 transition-all shadow-md group"
          title="Place a tropical plant on desk"
        >
          <Plus className="w-3 h-3 group-hover:rotate-90 transition-transform" />
          <span>Place Plant</span>
        </button>
      )}

      {/* 5. Nespresso Machine & Coffee (Right Desk Surface • Draggable) */}
      {coffeeId === "lifestyle-coffee-nespresso" ? (
        <motion.div
          drag
          dragConstraints={{ left: -300, right: 80, top: -12, bottom: 12 }}
          dragElastic={0.06}
          dragMomentum={false}
          style={{ touchAction: "none" }}
          whileDrag={{ scale: 1.05 }}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onSelectItem ? onSelectItem("bali-lifestyle", "lifestyle-coffee-nespresso") : onSelectCategory?.("bali-lifestyle");
          }}
          className="absolute bottom-0 right-16 flex items-end gap-2 z-35 pointer-events-auto cursor-grab active:cursor-grabbing group/coffee"
          title="Drag coffee along desk • Click to customize"
        >
          <div className="absolute -top-6 opacity-0 group-hover/coffee:opacity-100 transition-opacity bg-neutral-900/90 text-white text-[8px] px-2 py-0.5 rounded-full border border-white/20 shadow-lg pointer-events-none whitespace-nowrap">
            ☕ Slide Coffee • Click to Select
          </div>
          {/* Nespresso Machine */}
          <div className="w-10 h-18 rounded-t-lg bg-neutral-900 border border-neutral-700 shadow-xl flex flex-col items-center justify-between p-1">
            <div className="w-6 h-1.5 bg-gradient-to-r from-slate-400 via-white to-slate-400 rounded-full shadow-sm" />
            <div className="flex flex-col items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mb-0.5" />
              <div className="w-2.5 h-2 bg-neutral-950 rounded-b" />
            </div>
            <div className="w-8 h-2 bg-neutral-950 rounded-b border-t border-neutral-700" />
          </div>

          {/* Steaming Ceramic Espresso Cup */}
          <div className="flex flex-col items-center relative">
            <motion.div
              className="w-1 h-3 bg-white/25 rounded-full blur-[0.5px] -mb-1"
              animate={{ y: [-2, -7, -10], opacity: [0.6, 0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <div className="w-5 h-5 rounded-b-md bg-stone-100 border border-stone-300 shadow-md flex items-center justify-center relative">
              <div className="w-3.5 h-3.5 rounded-full bg-amber-950/80 shadow-inner" />
              <div className="absolute top-0.5 -right-1.5 w-1.5 h-3 rounded-r-full border-r-2 border-stone-300" />
            </div>
            <div className="w-7 h-1 bg-stone-300 rounded-full shadow-xs" />
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
