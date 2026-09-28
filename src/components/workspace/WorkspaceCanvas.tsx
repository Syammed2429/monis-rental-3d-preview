"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { WorkspaceConfig, ProductCategory } from "@/types/workspace";
import { RoomBackdrop } from "./RoomBackdrop";
import { DeskRenderer } from "./DeskRenderer";
import { ChairRenderer } from "./ChairRenderer";
import { MonitorRenderer } from "./MonitorRenderer";
import { AccessoriesRenderer } from "./AccessoriesRenderer";
import { LifestyleRenderer } from "./LifestyleRenderer";
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
    const modes: ("bali-gradient" | "sunset-surf" | "minimal-clock")[] = [
      "bali-gradient",
      "sunset-surf",
      "minimal-clock",
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
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-full min-h-[360px] lg:min-h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-950 flex flex-col justify-between select-none">
      {/* 1. Dynamic Room Background */}
      <RoomBackdrop timeOfDay={config.timeOfDay} />

      {/* 2. Top Canvas Floating HUD Toolbar */}
      <div className="relative z-30 p-3 sm:p-5 flex items-center justify-between pointer-events-auto">
        {/* Left: Mode Badge & Height Toggle */}
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-neutral-900/80 backdrop-blur-md border-white/15 text-white/90 font-medium px-2.5 py-1 text-[11px] gap-1.5 shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">Interactive Studio Canvas</span>
            <span className="sm:hidden">Studio Canvas</span>
          </Badge>

          <Button
            size="sm"
            variant="outline"
            onClick={handleToggleHeight}
            className="bg-neutral-900/80 backdrop-blur-md border-white/15 text-white hover:bg-neutral-800 text-[11px] h-7 px-2.5 gap-1.5 shadow-lg"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isStanding ? "Standing 108 cm" : "Sitting 74 cm"}</span>
          </Button>
        </div>

        {/* Right: Ambient Bali Time of Day & Zoom Controls */}
        <div className="flex items-center gap-1 bg-neutral-900/80 backdrop-blur-md border border-white/15 p-1 rounded-full shadow-lg">
          <button
            onClick={() => handleTimeOfDay("daylight")}
            className={`p-1.5 rounded-full transition-all ${
              config.timeOfDay === "daylight"
                ? "bg-amber-500/20 text-amber-300 ring-1 ring-amber-400/50"
                : "text-neutral-400 hover:text-white"
            }`}
            title="Bali Daylight"
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
            title="Bali Golden Sunset"
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

          <div className="w-[1px] h-3.5 bg-white/10 mx-0.5" />

          {/* Zoom Toggle */}
          <button
            onClick={() => setZoomLevel((z) => (z === 1 ? 1.08 : 1))}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white transition-colors"
            title={zoomLevel === 1 ? "Zoom in" : "Reset zoom"}
          >
            {zoomLevel === 1 ? <ZoomIn className="w-3.5 h-3.5" /> : <ZoomOut className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 3. Main Stage Composite */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Bali Lifestyle Elements (Outdoor Gear Left, Relax Zone Right) */}
        <LifestyleRenderer
          outdoorId={config.outdoorId}
          relaxId={config.relaxId}
          onSelectCategory={onSelectCategory}
        />

        {/* Central Workspace Rig (Scaled with Zoom) */}
        <motion.div
          className="relative w-full max-w-2xl sm:max-w-3xl h-[420px] flex items-center justify-center transform origin-bottom"
          animate={{ scale: zoomLevel }}
          transition={{ type: "spring", stiffness: 150, damping: 25 }}
        >
          {/* Desk Surface, Monitors & Accessories Group: elevates together */}
          <motion.div
            className="absolute inset-x-0 bottom-16 flex flex-col items-center z-20"
            animate={{ y: isStanding ? 0 : 56 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {/* Monitor Mounted atop Desk */}
            <div
              className="absolute -top-[175px] left-1/2 -translate-x-1/2 z-10 pointer-events-auto"
              onClick={() => onSelectCategory?.("monitors")}
              title="Click to configure Monitor (or click screen to cycle wallpaper)"
            >
              <MonitorRenderer
                monitorId={config.monitorId}
                displayMode={config.monitorDisplayMode}
                onToggleDisplayMode={handleToggleScreen}
              />
            </div>

            {/* Desktop Accessories (Lamp, Mat, Laptop, Coffee, Plant) */}
            <div className="absolute inset-x-0 -top-[12px] h-[40px] pointer-events-auto">
              <AccessoriesRenderer
                peripheralsId={config.peripheralsId}
                lightingId={config.lightingId}
                lampPowered={config.lampPowered}
                onToggleLamp={handleToggleLamp}
                laptopStand={config.laptopStand}
                plantId={config.plantId}
                coffeeId={config.coffeeId}
                onSelectCategory={onSelectCategory}
              />
            </div>
          </motion.div>

          {/* Desk Frame & Legs (DeskRenderer) */}
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

          {/* Ergonomic Chair tucked neatly behind the desk opening */}
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
      <div className="relative z-30 px-4 py-2.5 sm:py-3 flex items-center justify-between text-[11px] text-neutral-400 pointer-events-none border-t border-white/5 bg-neutral-950/40 backdrop-blur-xs">
        <div className="flex items-center gap-1.5 truncate">
          <span className="hidden sm:inline">💡</span>
          <span className="truncate">Click monitors to cycle art • Click desk items to customize</span>
        </div>

        <button
          onClick={handleToggleHeight}
          className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900/90 border border-white/10 hover:border-emerald-500/50 text-neutral-300 hover:text-white transition-all text-[11px] shrink-0"
        >
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span>Switch to {isStanding ? "Sitting" : "Standing"}</span>
        </button>
      </div>
    </div>
  );
}
