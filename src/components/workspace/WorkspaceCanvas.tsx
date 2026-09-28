"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { WorkspaceConfig, ProductCategory } from "@/types/workspace";
import { RoomBackdrop } from "./RoomBackdrop";
import { DeskRenderer } from "./DeskRenderer";
import { ChairRenderer } from "./ChairRenderer";
import { MonitorRenderer } from "./MonitorRenderer";
import { AccessoriesRenderer } from "./AccessoriesRenderer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sun, Sunset, Moon, ArrowUpDown, Sparkles, ZoomIn, ZoomOut } from "lucide-react";
import { sound } from "@/lib/audio";

interface WorkspaceCanvasProps {
  config: WorkspaceConfig;
  onChangeConfig: (updater: (prev: WorkspaceConfig) => WorkspaceConfig) => void;
  onSelectCategory?: (category: ProductCategory) => void;
}

export function WorkspaceCanvas({
  config,
  onChangeConfig,
  onSelectCategory,
}: WorkspaceCanvasProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const isStanding = config.deskHeightState === "standing";

  // Toggle desk height
  const handleToggleHeight = () => {
    sound.playMotorHum();
    onChangeConfig((prev) => ({
      ...prev,
      deskHeightState: prev.deskHeightState === "sitting" ? "standing" : "sitting",
    }));
  };

  // Toggle Lamp power
  const handleToggleLamp = () => {
    sound.playLamp();
    onChangeConfig((prev) => ({
      ...prev,
      lampPowered: !prev.lampPowered,
    }));
  };

  // Cycle monitor screen mode
  const handleToggleScreen = () => {
    sound.playClick();
    const modes: ("code" | "bali-nature" | "minimal-clock" | "off")[] = [
      "code",
      "bali-nature",
      "minimal-clock",
      "off",
    ];
    const currentIndex = modes.indexOf(config.monitorDisplayMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    onChangeConfig((prev) => ({
      ...prev,
      monitorDisplayMode: nextMode,
    }));
  };

  // Change time of day
  const handleTimeOfDay = (mode: "daylight" | "sunset" | "studio-night") => {
    sound.playClick();
    onChangeConfig((prev) => ({
      ...prev,
      timeOfDay: mode,
    }));
  };

  return (
    <div className="relative w-full h-[580px] lg:h-full min-h-[520px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-950 flex flex-col justify-between">
      {/* 1. Dynamic Room Background */}
      <RoomBackdrop timeOfDay={config.timeOfDay} />

      {/* 2. Top Canvas Floating HUD Toolbar */}
      <div className="relative z-30 p-4 sm:p-5 flex items-center justify-between pointer-events-auto">
        {/* Left: Interactive Canvas Status & Mode */}
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-neutral-900/80 backdrop-blur-md border-white/15 text-white/90 font-medium px-3 py-1 text-xs gap-1.5 shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive 3D Canvas</span>
          </Badge>

          <Button
            size="sm"
            variant="outline"
            onClick={handleToggleHeight}
            className="hidden sm:inline-flex bg-neutral-900/80 backdrop-blur-md border-white/15 text-white hover:bg-neutral-800 text-xs h-7 gap-1.5 shadow-lg"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isStanding ? "Standing (108 cm)" : "Sitting (74 cm)"}</span>
          </Button>
        </div>

        {/* Right: Ambient Bali Time of Day & Zoom Controls */}
        <div className="flex items-center gap-1.5 bg-neutral-900/80 backdrop-blur-md border border-white/15 p-1 rounded-full shadow-lg">
          <button
            onClick={() => handleTimeOfDay("daylight")}
            className={`p-1.5 rounded-full transition-all ${
              config.timeOfDay === "daylight"
                ? "bg-amber-500/20 text-amber-300 ring-1 ring-amber-400/50"
                : "text-neutral-400 hover:text-white"
            }`}
            title="Bali Villa Daylight"
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleTimeOfDay("sunset")}
            className={`p-1.5 rounded-full transition-all ${
              config.timeOfDay === "sunset"
                ? "bg-orange-500/20 text-orange-400 ring-1 ring-orange-500/50"
                : "text-neutral-400 hover:text-white"
            }`}
            title="Bali Golden Hour Sunset"
          >
            <Sunset className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleTimeOfDay("studio-night")}
            className={`p-1.5 rounded-full transition-all ${
              config.timeOfDay === "studio-night"
                ? "bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400/50"
                : "text-neutral-400 hover:text-white"
            }`}
            title="Studio Night Ambient"
          >
            <Moon className="w-3.5 h-3.5" />
          </button>

          <div className="w-[1px] h-4 bg-white/10 mx-0.5" />

          {/* Zoom In/Out Button */}
          <button
            onClick={() => setZoomLevel((z) => (z === 1 ? 1.08 : 1))}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white transition-colors"
            title={zoomLevel === 1 ? "Zoom in setup" : "Reset zoom"}
          >
            {zoomLevel === 1 ? <ZoomIn className="w-3.5 h-3.5" /> : <ZoomOut className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 3. Main Stage Stage Vector Composite */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        <motion.div
          className="relative w-full max-w-3xl h-[450px] flex items-center justify-center transform origin-bottom"
          animate={{ scale: zoomLevel }}
          transition={{ type: "spring", stiffness: 150, damping: 25 }}
        >
          {/* Desk Surface Group: contains Monitors and Accessories that animate up/down with the desk */}
          <motion.div
            className="absolute inset-x-0 bottom-16 flex flex-col items-center z-15"
            animate={{ y: isStanding ? 0 : 64 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {/* Monitor Group */}
            <div className="absolute -top-[190px] left-1/2 -translate-x-1/2 z-10 pointer-events-auto">
              <MonitorRenderer
                monitorId={config.monitorId}
                displayMode={config.monitorDisplayMode}
                onToggleDisplayMode={handleToggleScreen}
              />
            </div>

            {/* Desktop Accessories (Lamp, Mat, Laptop, Coffee, Plants, Speaker) */}
            <div className="absolute inset-x-0 -top-[12px] h-[40px] pointer-events-auto">
              <AccessoriesRenderer
                peripheralsId={config.peripheralsId}
                lightingId={config.lightingId}
                lampPowered={config.lampPowered}
                onToggleLamp={handleToggleLamp}
                laptopStand={config.laptopStand}
                plantId={config.plantId}
                audioId={config.audioId}
                coffeeId={config.coffeeId}
                airPurifier={config.airPurifier}
              />
            </div>
          </motion.div>

          {/* Desk Frame & Motorized Legs */}
          <div
            onClick={() => {
              sound.playClick();
              onSelectCategory?.("desks");
            }}
            className="cursor-pointer"
            title="Configure Desk"
          >
            <DeskRenderer
              finish={config.deskFinish}
              isStanding={isStanding}
              onToggleHeight={handleToggleHeight}
            />
          </div>

          {/* Ergonomic Office Chair */}
          <div
            onClick={() => {
              sound.playClick();
              onSelectCategory?.("chairs");
            }}
            className="pointer-events-auto cursor-pointer"
            title="Configure Chair"
          >
            <ChairRenderer
              chairId={config.chairId}
              color={config.chairColor}
              isStanding={isStanding}
            />
          </div>
        </motion.div>
      </div>

      {/* 4. Canvas Bottom Hint Chips */}
      <div className="relative z-30 p-4 flex items-center justify-between text-[11px] text-neutral-400 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">💡 Tip:</span>
          <span>Click the monitor to switch screens • Click lamp to toggle light</span>
        </div>

        <button
          onClick={handleToggleHeight}
          className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900/90 border border-white/10 hover:border-emerald-500/50 text-neutral-300 hover:text-white transition-all text-[11px]"
        >
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span>Switch to {isStanding ? "Sitting" : "Standing"} Mode</span>
        </button>
      </div>
    </div>
  );
}
