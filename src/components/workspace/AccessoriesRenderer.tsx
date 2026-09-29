"use client";

import { Plus } from "lucide-react";
import { motion } from "motion/react";
import { ProductCategory } from "@/types/workspace";

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
    <div className="pointer-events-none absolute inset-0 select-none">
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
            if (onSelectItem) {
              onSelectItem("peripherals", peripheralsId);
            } else {
              onSelectCategory?.("peripherals");
            }
          }}
          className="group/mat pointer-events-auto absolute top-1 left-1/2 z-20 flex h-8.5 w-102.5 -translate-x-1/2 cursor-grab items-center justify-center rounded-xl border border-white/10 bg-neutral-900/90 shadow-inner active:cursor-grabbing"
          title="Slide desk mat • Click to configure peripherals"
        >
          <div className="pointer-events-none absolute -top-6 rounded-full border border-white/20 bg-neutral-900/90 px-2 py-0.5 text-[8px] whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover/mat:opacity-100">
            ⌨️ Slide Mat & Keyboard • Click to Select
          </div>
          {/* Keyboard & Mouse Area */}
          <div className="flex items-center gap-6">
            {/* Keyboards */}
            {peripheralsId === "peripherals-mx-combo" && (
              <div className="flex items-center gap-5">
                {/* MX Keys Backlit Keyboard */}
                <div className="flex h-5.5 w-44 items-center justify-between rounded-md border border-white/20 bg-stone-900 px-1.5 shadow-md">
                  <div className="flex h-3 w-32 items-center gap-0.5 rounded bg-neutral-950 px-1">
                    <div className="h-1.5 w-22 rounded-xs bg-stone-700" />
                    <div className="h-1.5 w-7 rounded-xs bg-stone-700" />
                  </div>
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400/90" />
                </div>

                {/* MX Master 3S Mouse */}
                <div className="relative flex h-7 w-5.5 flex-col items-center rounded-2xl border border-white/20 bg-stone-900 pt-1 shadow-md">
                  <div className="h-2 w-1.5 rounded-sm border border-white/30 bg-neutral-700" />
                  <div className="mt-0.5 h-1 w-1 rounded-full bg-cyan-400" />
                </div>
              </div>
            )}

            {peripheralsId === "peripherals-apple-magic" && (
              <div className="flex items-center gap-5">
                {/* Apple Magic Keyboard Silver */}
                <div className="flex h-5 w-40 items-center justify-between rounded-md border border-white/80 bg-linear-to-r from-slate-200 via-slate-100 to-slate-200 px-1.5 shadow-md">
                  <div className="h-2.5 w-30 rounded-xs bg-white shadow-xs" />
                  <div className="h-1.5 w-1.5 rounded-full border border-slate-400 bg-slate-300" />
                </div>

                {/* Apple Magic Trackpad Silver */}
                <div className="h-6.5 w-9 rounded-md border border-white bg-linear-to-br from-slate-100 to-slate-200 shadow-md" />
              </div>
            )}

            {peripheralsId === "peripherals-custom-mech" && (
              <div className="flex items-center gap-5">
                {/* Custom Mechanical Keyboard */}
                <div className="relative flex h-5.5 w-42 items-center justify-between overflow-hidden rounded-md border border-emerald-500/40 bg-zinc-950 px-1.5 shadow-[0_0_12px_rgba(16,185,129,0.25)]">
                  <div className="absolute inset-0 bg-linear-to-r from-emerald-500/10 via-cyan-500/10 to-amber-500/10" />
                  <div className="relative z-10 flex h-3 w-32 items-center gap-0.5 rounded bg-neutral-900 px-1">
                    <div className="h-1.5 w-22 rounded-xs border border-emerald-500/40 bg-emerald-950" />
                    <div className="h-1.5 w-7 rounded-xs border border-amber-500/40 bg-amber-950" />
                  </div>
                  <div className="relative z-10 h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                </div>

                {/* Ergonomic Gaming Mouse */}
                <div className="flex h-7 w-5.5 flex-col items-center rounded-2xl border border-emerald-500/30 bg-zinc-950 pt-1 shadow-[0_0_8px_rgba(16,185,129,0.25)]">
                  <div className="h-2 w-1.5 rounded-sm bg-emerald-600" />
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
          className="group/laptop pointer-events-auto absolute bottom-0 left-16 z-35 flex cursor-grab flex-col items-center active:cursor-grabbing"
          title="Drag anywhere on desk • Click to configure"
          onClick={(e) => {
            e.stopPropagation();
            if (onSelectItem) {
              onSelectItem("bali-lifestyle", "lifestyle-laptop-stand");
            } else {
              onSelectCategory?.("bali-lifestyle");
            }
          }}
        >
          <div className="pointer-events-none absolute -top-6 rounded-full border border-white/20 bg-neutral-900/90 px-2 py-0.5 text-[8px] whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover/laptop:opacity-100">
            💻 Slide Laptop Stand • Click to Select
          </div>
          {/* Laptop Screen with clean modern wallpaper */}
          <div className="flex h-16 w-24 flex-col rounded-md border border-neutral-700 bg-neutral-900 p-1 shadow-xl">
            <div className="flex w-full flex-1 flex-col justify-between rounded border border-white/5 bg-linear-to-tr from-emerald-950 via-teal-900 to-slate-900 p-1 select-none">
              <div className="flex items-center justify-between text-[5.5px] text-neutral-300">
                <span className="font-semibold text-emerald-300">Secondary</span>
                <span>100% ⚡</span>
              </div>
              <div className="text-center text-[6px] font-medium tracking-tight text-white/90">
                Villa Desk
              </div>
              <div className="text-right font-mono text-[5px] text-emerald-400/80">Connected</div>
            </div>
          </div>
          {/* Laptop Base */}
          <div className="h-1.5 w-26 rounded-b bg-linear-to-r from-slate-400 via-slate-200 to-slate-400 shadow-sm" />
          {/* Angled CNC Aluminum Riser Stand (Grounded on wooden surface) */}
          <div className="-mt-0.5 h-7 w-14 rounded-b-md border-x-3 border-b-3 border-slate-400/80 shadow-md" />
        </motion.div>
      )}

      {/* 3. Desk Lighting (Xiaomi 1S / Anglepoise Lamp / ScreenBar) */}

      {/* 3A. Xiaomi Smart LED Desk Lamp 1S */}
      {lightingId === "light-xiaomi-1s" && (
        <motion.div
          drag
          dragConstraints={{ left: -10, right: 320, top: -10, bottom: 10 }}
          dragElastic={0.06}
          dragMomentum={false}
          style={{ touchAction: "none" }}
          whileDrag={{ scale: 1.05 }}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onToggleLamp?.();
            if (onSelectItem) {
              onSelectItem("lighting", "light-xiaomi-1s");
            } else {
              onSelectCategory?.("lighting");
            }
          }}
          className="group/lamp pointer-events-auto absolute bottom-0 left-3 z-40 flex cursor-pointer flex-col items-center active:cursor-grabbing"
          title={`Xiaomi Smart Lamp 1S • Click to turn ${lampPowered ? "OFF" : "ON"}`}
        >
          <div className="pointer-events-none absolute -top-6 z-50 rounded-full border border-white/20 bg-neutral-900/90 px-2 py-0.5 text-[8px] whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover/lamp:opacity-100">
            💡 Xiaomi 1S Lamp • Click to Turn {lampPowered ? "OFF" : "ON"}
          </div>

          {/* Minimalist Folding Arm (Pure White with LED Underside) */}
          <div className="relative flex flex-col items-center">
            {/* Horizontal Lamp Bar (Slightly angled forwards) */}
            <div className="relative h-2 w-24 rounded-full border border-neutral-300 bg-white shadow-md">
              {/* LED Diffuser Strip */}
              <div
                className={`mx-auto h-1 w-21 rounded-full transition-all duration-300 ${
                  lampPowered
                    ? "bg-amber-100 shadow-[0_0_24px_rgba(254,240,138,1)]"
                    : "bg-neutral-300"
                }`}
              />
            </div>

            {/* Signature Red Loop Wire at Joint */}
            <div className="absolute top-1.5 -right-1 h-3.5 w-2 rounded-r-full border-t-2 border-r-2 border-rose-500" />

            {/* Ultra-Slim Vertical Stem */}
            <div className="relative h-28 w-2 rounded-full border-x border-neutral-200 bg-gradient-to-b from-white via-neutral-100 to-neutral-200 shadow-sm" />

            {/* Minimalist Circular Base with Center Rotary Knob */}
            <div className="relative flex h-2.5 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white shadow-md">
              {/* Center Click Knob */}
              <div
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  lampPowered ? "bg-amber-400 ring-2 ring-amber-300/50" : "bg-neutral-400"
                }`}
              />
            </div>
          </div>

          {/* Dynamic Warm Ambient Light Cone */}
          {lampPowered && (
            <div className="pointer-events-none absolute -top-2 -left-12 h-44 w-56 bg-[radial-gradient(ellipse_at_top,rgba(254,243,199,0.35)_0%,rgba(253,230,138,0.18)_45%,transparent_75%)] blur-xs" />
          )}
        </motion.div>
      )}

      {/* 3B. Anglepoise Architectural Desk Lamp */}
      {lightingId === "light-smart-lamp" && (
        <motion.div
          drag
          dragConstraints={{ left: -10, right: 320, top: -10, bottom: 10 }}
          dragElastic={0.06}
          dragMomentum={false}
          style={{ touchAction: "none" }}
          whileDrag={{ scale: 1.05 }}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onToggleLamp?.();
            if (onSelectItem) {
              onSelectItem("lighting", "light-smart-lamp");
            } else {
              onSelectCategory?.("lighting");
            }
          }}
          className="group/lamp pointer-events-auto absolute bottom-0 left-3 z-40 flex cursor-pointer flex-col items-center active:cursor-grabbing"
          title={`Anglepoise Desk Lamp • Click to turn ${lampPowered ? "OFF" : "ON"}`}
        >
          <div className="pointer-events-none absolute -top-6 z-50 rounded-full border border-white/20 bg-neutral-900/90 px-2 py-0.5 text-[8px] whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover/lamp:opacity-100">
            💡 Anglepoise Lamp • Click to Turn {lampPowered ? "OFF" : "ON"}
          </div>

          {/* Angled Cone Shade & Stem */}
          <div className="relative flex flex-col items-center">
            {/* Cone Shade */}
            <div className="relative h-4 w-12 rounded-t-sm rounded-b-xl border border-amber-900/40 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 shadow-md">
              <div
                className={`mx-auto mt-2 h-1.5 w-6 rounded-full transition-all duration-300 ${
                  lampPowered
                    ? "bg-amber-100 shadow-[0_0_24px_rgba(254,240,138,1)]"
                    : "bg-neutral-800"
                }`}
              />
            </div>

            {/* Articulated Double Spring Arm */}
            <div className="relative flex h-26 w-2.5 items-center justify-center">
              <div className="h-full w-0.5 bg-gradient-to-b from-neutral-600 via-neutral-500 to-neutral-700" />
              <div className="absolute top-6 left-0 h-8 w-2 rotate-12 border-r border-amber-500/80" />
            </div>

            {/* Heavy Cast Iron Base */}
            <div className="flex h-2.5 w-9 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 shadow-lg">
              <div
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  lampPowered ? "bg-amber-400 ring-2 ring-amber-300/50" : "bg-neutral-600"
                }`}
              />
            </div>
          </div>

          {/* Dynamic Light Beam Cast */}
          {lampPowered && (
            <div className="pointer-events-none absolute -top-2 -left-14 h-48 w-60 bg-[radial-gradient(ellipse_at_top,rgba(254,240,138,0.35)_0%,rgba(251,191,36,0.15)_50%,transparent_75%)] blur-xs" />
          )}
        </motion.div>
      )}

      {/* 3C. ScreenBar Halo Monitor Light Bar */}
      {lightingId === "light-screenbar" && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onToggleLamp?.();
            if (onSelectItem) {
              onSelectItem("lighting", "light-screenbar");
            } else {
              onSelectCategory?.("lighting");
            }
          }}
          className="group pointer-events-auto absolute -top-49 left-1/2 z-40 flex -translate-x-1/2 cursor-pointer flex-col items-center"
          title={`ScreenBar Halo • Click to turn ${lampPowered ? "OFF" : "ON"}`}
        >
          <div className="pointer-events-none absolute -top-6 z-50 rounded-full border border-white/20 bg-neutral-900/90 px-2 py-0.5 text-[8px] whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            💡 ScreenBar • Click to Turn {lampPowered ? "OFF" : "ON"}
          </div>
          {/* ScreenBar Clamped atop Monitor Bezel */}
          <div className="relative flex h-2.5 w-56 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 shadow-xl">
            <div
              className={`h-1.5 w-52 rounded-full transition-all duration-300 ${
                lampPowered
                  ? "bg-amber-100 shadow-[0_0_24px_rgba(254,240,138,1)]"
                  : "bg-neutral-800"
              }`}
            />
          </div>

          {/* Downward Light Glow Cast */}
          {lampPowered && (
            <div className="pointer-events-none absolute top-2 -left-20 h-64 w-96 bg-[radial-gradient(ellipse_at_top,rgba(254,243,199,0.3)_0%,rgba(253,230,138,0.15)_45%,transparent_80%)] blur-xs" />
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
            if (onSelectItem) {
              onSelectItem("bali-lifestyle", "lifestyle-plant-monstera");
            } else {
              onSelectCategory?.("bali-lifestyle");
            }
          }}
          className="group/plant pointer-events-auto absolute right-4 bottom-0 z-35 flex cursor-grab flex-col items-center active:cursor-grabbing"
          title="Drag plant along desk • Click to customize"
        >
          <div className="pointer-events-none absolute -top-6 rounded-full border border-white/20 bg-neutral-900/90 px-2 py-0.5 text-[8px] whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover/plant:opacity-100">
            🌿 Slide Plant • Click to Select
          </div>
          {/* Lush Monstera Leaves Vector */}
          <svg
            className="h-20 w-20 text-emerald-600 drop-shadow-md"
            viewBox="0 0 100 100"
            fill="none"
          >
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
          <div className="flex h-9 w-12 items-center justify-center rounded-b-xl border-t-2 border-amber-600 bg-linear-to-b from-amber-700 via-amber-800 to-amber-950 shadow-xl">
            <div className="h-1 w-8 rounded-full bg-amber-900/60" />
          </div>
          <div className="h-1.5 w-14 rounded-full bg-amber-900 shadow-md" />
        </motion.div>
      ) : (
        /* Dotted Hotspot: + Place a Plant! */
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onSelectItem) {
              onSelectItem("bali-lifestyle", "lifestyle-plant-monstera");
            } else {
              onSelectCategory?.("bali-lifestyle");
            }
          }}
          className="group pointer-events-auto absolute right-4 bottom-2 flex items-center gap-1 rounded-full border border-dashed border-emerald-500/50 bg-neutral-900/90 px-2 py-1 text-[9px] text-emerald-400 shadow-md transition-all hover:border-emerald-400 hover:bg-emerald-500/10"
          title="Place a tropical plant on desk"
        >
          <Plus className="h-3 w-3 transition-transform group-hover:rotate-90" />
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
            if (onSelectItem) {
              onSelectItem("bali-lifestyle", "lifestyle-coffee-nespresso");
            } else {
              onSelectCategory?.("bali-lifestyle");
            }
          }}
          className="group/coffee pointer-events-auto absolute right-16 bottom-0 z-35 flex cursor-grab items-end gap-2 active:cursor-grabbing"
          title="Drag coffee along desk • Click to customize"
        >
          <div className="pointer-events-none absolute -top-6 rounded-full border border-white/20 bg-neutral-900/90 px-2 py-0.5 text-[8px] whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover/coffee:opacity-100">
            ☕ Slide Coffee • Click to Select
          </div>
          {/* Nespresso Machine */}
          <div className="flex h-18 w-10 flex-col items-center justify-between rounded-t-lg border border-neutral-700 bg-neutral-900 p-1 shadow-xl">
            <div className="h-1.5 w-6 rounded-full bg-linear-to-r from-slate-400 via-white to-slate-400 shadow-sm" />
            <div className="flex flex-col items-center">
              <div className="mb-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <div className="h-2 w-2.5 rounded-b bg-neutral-950" />
            </div>
            <div className="h-2 w-8 rounded-b border-t border-neutral-700 bg-neutral-950" />
          </div>

          {/* Steaming Ceramic Espresso Cup */}
          <div className="relative flex flex-col items-center">
            <motion.div
              className="-mb-1 h-3 w-1 rounded-full bg-white/25 blur-[0.5px]"
              animate={{ y: [-2, -7, -10], opacity: [0.6, 0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <div className="relative flex h-5 w-5 items-center justify-center rounded-b-md border border-stone-300 bg-stone-100 shadow-md">
              <div className="h-3.5 w-3.5 rounded-full bg-amber-950/80 shadow-inner" />
              <div className="absolute top-0.5 -right-1.5 h-3 w-1.5 rounded-r-full border-r-2 border-stone-300" />
            </div>
            <div className="h-1 w-7 rounded-full bg-stone-300 shadow-xs" />
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
