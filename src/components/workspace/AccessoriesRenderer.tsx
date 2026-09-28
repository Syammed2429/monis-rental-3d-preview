"use client";

import React from "react";
import { motion } from "motion/react";

interface AccessoriesRendererProps {
  peripheralsId: string;
  lightingId: string;
  lampPowered: boolean;
  onToggleLamp?: () => void;
  laptopStand: boolean;
  plantId: string | null;
  audioId: string | null;
  coffeeId: string | null;
  airPurifier: boolean;
}

export function AccessoriesRenderer({
  peripheralsId,
  lightingId,
  lampPowered,
  onToggleLamp,
  laptopStand,
  plantId,
  audioId,
  coffeeId,
  airPurifier,
}: AccessoriesRendererProps) {
  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* 1. Large Minimalist Felt Desk Mat on Table Surface */}
      <div className="absolute top-[28px] left-1/2 -translate-x-1/2 w-[460px] h-[32px] rounded-xl bg-neutral-900/90 border border-white/10 shadow-inner flex items-center justify-center">
        {/* Keyboard & Mouse Area */}
        <div className="flex items-center gap-6">
          {/* Keyboards */}
          {peripheralsId === "peripherals-mx-combo" && (
            <div className="flex items-center gap-5">
              {/* MX Keys Backlit Keyboard */}
              <div className="w-48 h-6 rounded-md bg-stone-900 border border-white/20 shadow-md flex items-center px-1.5 justify-between">
                <div className="w-36 h-3.5 bg-neutral-950 rounded flex gap-0.5 items-center px-1">
                  <div className="w-24 h-2 bg-stone-800 rounded-xs" />
                  <div className="w-8 h-2 bg-stone-800 rounded-xs" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
              </div>

              {/* MX Master 3S Mouse */}
              <div className="w-6 h-8 rounded-2xl bg-stone-900 border border-white/20 shadow-md flex flex-col items-center pt-1 relative">
                <div className="w-1.5 h-2.5 rounded-sm bg-neutral-700 border border-white/30" />
                <div className="w-1 h-1 rounded-full bg-cyan-400 mt-1" />
              </div>
            </div>
          )}

          {peripheralsId === "peripherals-apple-magic" && (
            <div className="flex items-center gap-5">
              {/* Apple Magic Keyboard Silver */}
              <div className="w-44 h-5 rounded-md bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 border border-white/80 shadow-md flex items-center px-1.5 justify-between">
                <div className="w-34 h-3 bg-white rounded-xs shadow-xs" />
                <div className="w-2 h-2 rounded-full bg-slate-300 border border-slate-400" />
              </div>

              {/* Apple Magic Trackpad Silver */}
              <div className="w-10 h-7 rounded-md bg-gradient-to-br from-slate-100 to-slate-200 border border-white shadow-md" />
            </div>
          )}

          {peripheralsId === "peripherals-custom-mech" && (
            <div className="flex items-center gap-5">
              {/* Custom Mechanical Keyboard with RGB Underglow */}
              <div className="w-46 h-6 rounded-md bg-zinc-950 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)] flex items-center px-1.5 justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-purple-500/10" />
                <div className="w-36 h-3.5 bg-neutral-900 rounded flex gap-0.5 items-center px-1 relative z-10">
                  <div className="w-24 h-2 bg-emerald-950 rounded-xs border border-emerald-500/40" />
                  <div className="w-8 h-2 bg-amber-950 rounded-xs border border-amber-500/40" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse relative z-10" />
              </div>

              {/* Ergonomic Gaming Mouse */}
              <div className="w-6 h-8 rounded-2xl bg-zinc-950 border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.3)] flex flex-col items-center pt-1">
                <div className="w-1.5 h-2.5 rounded-sm bg-emerald-600" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Aluminum Laptop Stand (Left Hand Side) */}
      {laptopStand && (
        <div className="absolute top-[2px] left-12 flex flex-col items-center z-10">
          {/* Open MacBook Screen */}
          <div className="w-28 h-20 rounded-lg bg-neutral-900 p-1 border border-neutral-700 shadow-xl flex flex-col">
            <div className="w-full flex-1 rounded bg-slate-950 flex flex-col justify-between p-1.5 font-mono text-[6px] text-emerald-400 border border-white/5">
              <div className="flex justify-between items-center text-neutral-400">
                <span>MacBook Pro 16&quot;</span>
                <span className="text-[5px] text-amber-300">100% ⚡</span>
              </div>
              <div className="space-y-0.5 text-neutral-400">
                <div>● Slack (8 unread)</div>
                <div>● Spotify: Bali Chill Lo-Fi</div>
              </div>
              <div className="text-cyan-400 text-[5px]">Dual Display Active</div>
            </div>
          </div>
          {/* Laptop Base & Keyboard */}
          <div className="w-30 h-2 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-b-md shadow-md" />
          {/* Angled CNC Aluminum Riser Stand */}
          <div className="w-16 h-8 border-x-4 border-b-4 border-slate-400/80 rounded-b-lg shadow-md -mt-0.5" />
        </div>
      )}

      {/* 3. Desk Lighting (Smart Lamp / ScreenBar) */}
      {lightingId === "light-smart-lamp" && (
        <div
          onClick={onToggleLamp}
          className="absolute -top-[125px] left-28 pointer-events-auto cursor-pointer group flex flex-col items-center z-20"
          title={`Click to turn lamp ${lampPowered ? "OFF" : "ON"}`}
        >
          {/* Light Fixture Horizontal Bar */}
          <div className="w-24 h-2 bg-slate-100 rounded-full border border-slate-300 shadow-md relative">
            {/* LED Strip Underside */}
            <div
              className={`w-20 mx-auto h-1 rounded-full transition-all duration-300 ${
                lampPowered
                  ? "bg-amber-100 shadow-[0_0_20px_rgba(254,243,199,0.9)]"
                  : "bg-neutral-300"
              }`}
            />
          </div>

          {/* Pivoting Aluminum Stem */}
          <div className="w-1.5 h-28 bg-gradient-to-b from-slate-200 to-slate-400 relative">
            {/* Iconic Xiaomi Red Cord Loop */}
            <div className="absolute top-4 -right-1 w-2.5 h-6 rounded-full border-r-2 border-rose-500" />
          </div>

          {/* Minimalist Round Base */}
          <div className="w-9 h-2 bg-slate-200 rounded-full border border-slate-300 shadow-md flex items-center justify-center">
            <div
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                lampPowered ? "bg-amber-400" : "bg-neutral-400"
              }`}
            />
          </div>

          {/* Dynamic Light Beam Cast onto Desk Surface */}
          {lampPowered && (
            <div className="absolute top-[8px] -left-12 w-48 h-40 bg-[radial-gradient(ellipse_at_top,rgba(254,240,138,0.28)_0%,transparent_75%)] pointer-events-none blur-xs" />
          )}
        </div>
      )}

      {lightingId === "light-screenbar" && (
        <div
          onClick={onToggleLamp}
          className="absolute -top-[222px] left-1/2 -translate-x-1/2 pointer-events-auto cursor-pointer group flex flex-col items-center z-20"
          title={`Click to turn ScreenBar ${lampPowered ? "OFF" : "ON"}`}
        >
          {/* ScreenBar Clamped atop Monitor Bezel */}
          <div className="w-64 h-2.5 bg-neutral-900 rounded-full border border-neutral-700 shadow-lg relative flex items-center justify-center">
            {/* Underside Asymmetric Lens */}
            <div
              className={`w-60 h-1 rounded-full transition-all duration-300 ${
                lampPowered
                  ? "bg-amber-100 shadow-[0_0_18px_rgba(254,240,138,0.9)]"
                  : "bg-neutral-800"
              }`}
            />
          </div>

          {/* Downward Light Glow Cast */}
          {lampPowered && (
            <div className="absolute top-[8px] -left-16 w-96 h-64 bg-[radial-gradient(ellipse_at_top,rgba(254,243,199,0.22)_0%,transparent_80%)] pointer-events-none blur-xs" />
          )}
        </div>
      )}

      {/* 4. Tropical Bali Monstera Deliciosa (Right Desk Edge) */}
      {plantId === "extra-plant-monstera" && (
        <div className="absolute -top-[110px] -right-14 flex flex-col items-center z-15 pointer-events-none">
          {/* Lush Monstera Leaves Vector */}
          <svg className="w-24 h-24 text-emerald-600 drop-shadow-md" viewBox="0 0 100 100" fill="none">
            {/* Left Big Split Leaf */}
            <path
              d="M 50 80 Q 20 60 15 30 Q 30 15 45 40 Q 40 55 50 80 Z"
              fill="#059669"
              stroke="#047857"
              strokeWidth="1.5"
            />
            {/* Center Fan Leaf */}
            <path
              d="M 50 80 Q 50 40 45 10 Q 60 10 65 35 Q 58 60 50 80 Z"
              fill="#10b981"
              stroke="#059669"
              strokeWidth="1.5"
            />
            {/* Right Broad Leaf */}
            <path
              d="M 50 80 Q 80 65 85 35 Q 70 20 58 45 Q 60 65 50 80 Z"
              fill="#047857"
              stroke="#065f46"
              strokeWidth="1.5"
            />
            {/* Cutout Leaf Perforations */}
            <circle cx="28" cy="35" r="2.5" fill="#181a20" opacity="0.7" />
            <circle cx="34" cy="25" r="2" fill="#181a20" opacity="0.7" />
            <circle cx="72" cy="40" r="2.5" fill="#181a20" opacity="0.7" />
            <circle cx="65" cy="26" r="2" fill="#181a20" opacity="0.7" />
          </svg>

          {/* Handcrafted Terracotta Balinese Planter */}
          <div className="w-14 h-12 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 rounded-b-2xl border-t-2 border-amber-600 shadow-xl flex items-center justify-center">
            <div className="w-10 h-1 bg-amber-900/60 rounded-full" />
          </div>
          {/* Ceramic Saucer Plate */}
          <div className="w-16 h-2 bg-amber-900 rounded-full shadow-md" />
        </div>
      )}

      {/* 5. Nespresso Essenza Mini & Coffee Mug (Right Hand Corner) */}
      {coffeeId === "extra-nespresso" && (
        <div className="absolute -top-[70px] right-14 flex items-end gap-2 z-10">
          {/* Nespresso Machine */}
          <div className="w-12 h-20 rounded-t-lg bg-neutral-900 border border-neutral-700 shadow-xl flex flex-col items-center justify-between p-1">
            {/* Chrome Dispenser Handle */}
            <div className="w-7 h-2 bg-gradient-to-r from-slate-400 via-white to-slate-400 rounded-full shadow-sm" />
            {/* Brand Logo & Spout */}
            <div className="flex flex-col items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mb-1" />
              <div className="w-3 h-2 bg-neutral-950 rounded-b" />
            </div>
            {/* Drip Tray */}
            <div className="w-10 h-2 bg-neutral-950 rounded-b border-t border-neutral-700" />
          </div>

          {/* Steaming Ceramic Espresso Cup */}
          <div className="flex flex-col items-center relative">
            {/* Animated Steam Plume */}
            <motion.div
              className="w-1.5 h-4 bg-white/20 rounded-full blur-[1px] -mb-1"
              animate={{ y: [-2, -8, -12], opacity: [0.6, 0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <div className="w-6 h-6 rounded-b-lg bg-stone-100 border border-stone-300 shadow-md flex items-center justify-center relative">
              <div className="w-4 h-4 rounded-full bg-amber-950/80 shadow-inner" />
              <div className="absolute top-1 -right-1.5 w-2 h-3.5 rounded-r-full border-r-2 border-stone-300" />
            </div>
            <div className="w-8 h-1 bg-stone-300 rounded-full shadow-xs" />
          </div>
        </div>
      )}

      {/* 6. Marshall Woburn III Bluetooth Speaker (Left Edge) */}
      {audioId === "extra-speaker-marshall" && (
        <div className="absolute -top-[80px] -left-12 flex flex-col items-center z-15">
          {/* Iconic Cabinet */}
          <div className="w-24 h-18 rounded-lg bg-[#1a1715] border-2 border-[#2b2420] shadow-2xl p-1.5 flex flex-col justify-between">
            {/* Top Brass Control Strip */}
            <div className="w-full h-3 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 rounded flex items-center justify-around px-1">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-950" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-950" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-950" />
              <div className="w-1 h-1 rounded-full bg-rose-500 animate-pulse" />
            </div>
            {/* Fret Cloth Grille */}
            <div className="w-full flex-1 rounded bg-[#2c2621] border border-black/40 flex items-center justify-center relative overflow-hidden shadow-inner">
              <div className="font-serif italic text-amber-300/80 text-[10px] tracking-wider font-bold">
                Marshall
              </div>
            </div>
          </div>
          {/* Rubber Isolation Feet */}
          <div className="w-20 flex justify-between px-2">
            <div className="w-2 h-1 bg-neutral-900 rounded-b" />
            <div className="w-2 h-1 bg-neutral-900 rounded-b" />
          </div>
        </div>
      )}

      {/* 7. Smart HEPA Air Purifier Elite (Standing on Floor beside Desk) */}
      {airPurifier && (
        <div className="absolute top-[80px] -right-28 flex flex-col items-center z-5">
          {/* Tower Body */}
          <div className="w-16 h-36 rounded-2xl bg-gradient-to-b from-stone-100 to-stone-200 border border-stone-300 shadow-2xl p-1.5 flex flex-col items-center justify-between">
            {/* Circular OLED Air Quality Display */}
            <div className="w-7 h-7 rounded-full bg-neutral-950 border-2 border-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)] flex flex-col items-center justify-center text-[6px] font-mono text-emerald-400">
              <span className="font-bold">012</span>
              <span className="text-[4px] text-neutral-400">AQI</span>
            </div>

            {/* Lower Intake Perforated Mesh Grille */}
            <div className="w-full h-18 bg-stone-300/60 rounded-xl grid grid-cols-5 gap-1 p-1">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-stone-400/80" />
              ))}
            </div>
          </div>
          {/* Base Stand */}
          <div className="w-18 h-2 bg-stone-300 rounded-full shadow-md" />
        </div>
      )}
    </div>
  );
}
