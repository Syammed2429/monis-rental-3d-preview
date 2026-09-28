"use client";

import { useState, useRef, useEffect } from "react";
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
import { Sun, Sunset, Moon, ArrowUpDown, Sparkles, ZoomIn, ZoomOut, ChevronUp, ChevronDown } from "lucide-react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [stageScale, setStageScale] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const isStanding = config.deskHeightState === "standing";
  const currentHeight = config.deskHeightCm || (isStanding ? 108 : 74);
  const heightRatio = Math.max(0, Math.min(1, (currentHeight - 70) / (118 - 70)));
  const elevationY = -(heightRatio * 44);

  // ResizeObserver dynamically measures container and auto-scales the 760x440 stage
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleResize = () => {
      const { clientWidth, clientHeight } = el;
      if (clientWidth > 0 && clientHeight > 0) {
        // Stage baseline coordinates: 760px width x 440px height
        const scaleX = clientWidth / 760;
        const scaleY = clientHeight / 440;
        const computed = Math.min(scaleX, scaleY);
        setStageScale(Number.isFinite(computed) && computed > 0 ? Math.min(computed, 1.35) : 1);
      }
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Toggle desk height preset (74cm / 108cm)
  const handleToggleHeight = () => {
    sound.playMotorHum();
    const targetState = isStanding ? "sitting" : "standing";
    const targetCm = isStanding ? 74 : 108;
    onChangeConfig((prev) => ({
      ...prev,
      deskHeightState: targetState,
      deskHeightCm: targetCm,
    }));
  };

  // Step height continuously (+/- delta cm)
  const handleStepHeight = (delta: number) => {
    sound.playMotorHum();
    onChangeConfig((prev) => {
      const nextCm = Math.max(70, Math.min(118, (prev.deskHeightCm || (prev.deskHeightState === "standing" ? 108 : 74)) + delta));
      return {
        ...prev,
        deskHeightCm: nextCm,
        deskHeightState: nextCm >= 95 ? "standing" : "sitting",
      };
    });
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
    <div className="relative w-full h-[390px] sm:h-[460px] lg:h-full min-h-[380px] lg:min-h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-950 flex flex-col justify-between select-none">
      {/* 1. Dynamic Room Background */}
      <RoomBackdrop timeOfDay={config.timeOfDay} />

      {/* 2. Top Canvas Floating HUD Toolbar */}
      <div className="relative z-30 p-2.5 sm:p-5 flex items-center justify-between pointer-events-auto">
        {/* Left: Mode Badge & Motorized Height Controller */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Badge
            variant="outline"
            className="bg-neutral-900/85 backdrop-blur-md border-white/15 text-white/90 font-medium px-2.5 py-1 text-[11px] gap-1.5 shadow-lg hidden sm:inline-flex"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive Studio Canvas</span>
          </Badge>

          {/* Quick Sit / Stand Preset Button */}
          <Button
            size="sm"
            variant="outline"
            onClick={handleToggleHeight}
            className="bg-neutral-900/85 backdrop-blur-md border-white/15 text-white hover:bg-neutral-800 text-[11px] h-7.5 px-2.5 gap-1.5 shadow-lg"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isStanding ? "Standing" : "Sitting"}</span>
            <span className="font-mono text-emerald-400 font-bold">({Math.round(currentHeight)} cm)</span>
          </Button>

          {/* Micro Height Stepper (Fine-Tuning) */}
          <div className="flex items-center bg-neutral-900/85 backdrop-blur-md border border-white/15 rounded-md p-0.5 shadow-lg">
            <button
              onClick={() => handleStepHeight(2)}
              disabled={currentHeight >= 118}
              className="p-1 text-neutral-400 hover:text-emerald-400 disabled:opacity-30 transition-colors"
              title="Raise desk +2cm"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleStepHeight(-2)}
              disabled={currentHeight <= 70}
              className="p-1 text-neutral-400 hover:text-emerald-400 disabled:opacity-30 transition-colors"
              title="Lower desk -2cm"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Ambient Bali Time of Day & Zoom Controls */}
        <div className="flex items-center gap-1 bg-neutral-900/85 backdrop-blur-md border border-white/15 p-1 rounded-full shadow-lg">
          <button
            onClick={() => handleTimeOfDay("daylight")}
            className={`p-1.5 rounded-full transition-all ${
              config.timeOfDay === "daylight"
                ? "bg-amber-500/20 text-amber-300 ring-1 ring-amber-400/50"
                : "text-neutral-400 hover:text-white"
            }`}
            title="Bali Daylight (Sunny)"
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
            title={zoomLevel === 1 ? "Zoom in setup" : "Reset zoom"}
          >
            {zoomLevel === 1 ? <ZoomIn className="w-3.5 h-3.5" /> : <ZoomOut className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 3. Main Stage Composite */}
      <div
        ref={containerRef}
        className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden"
      >
        <motion.div
          style={{
            width: 760,
            height: 440,
            transformOrigin: "center center",
          }}
          className="relative shrink-0 select-none pointer-events-auto"
          animate={{ scale: stageScale * zoomLevel }}
          transition={{ type: "spring", stiffness: 180, damping: 25 }}
        >
          {/* Bali Lifestyle Elements (Outdoor Gear Left, Relax Zone Right) */}
          <LifestyleRenderer
            outdoorId={config.outdoorId}
            relaxId={config.relaxId}
            onSelectCategory={onSelectCategory}
          />

          {/* Ergonomic Chair tucked neatly in knee hole */}
          <div
            onClick={() => {
              sound.playClick();
              onSelectCategory?.("chairs");
            }}
            className="pointer-events-auto cursor-pointer group/chair relative flex flex-col items-center"
            title="Configure Chair"
          >
            <div className="absolute -top-6 opacity-0 group-hover/chair:opacity-100 transition-opacity bg-neutral-900/90 text-white text-[9px] px-2 py-0.5 rounded-full border border-white/20 shadow-lg pointer-events-none whitespace-nowrap z-30">
              Ergonomic Chair • Click to Customize
            </div>
            <ChairRenderer
              chairId={config.chairId}
              color={config.chairColor}
              isStanding={isStanding}
            />
          </div>

          {/* Desk Frame & Telescoping Legs */}
          <div
            onClick={() => {
              sound.playClick();
              onSelectCategory?.("desks");
            }}
            className="cursor-pointer group/desk relative flex flex-col items-center"
            title="Configure Desk"
          >
            <DeskRenderer
              finish={config.deskFinish}
              isStanding={isStanding}
              heightCm={currentHeight}
              onToggleHeight={handleToggleHeight}
              onStepHeight={handleStepHeight}
            />
          </div>

          {/* Desk Surface Mounted Items: Monitor & Accessories (Elevates with Tabletop) */}
          <motion.div
            className="absolute inset-x-0 bottom-[92px] h-[56px] flex flex-col items-center z-25 pointer-events-none"
            animate={{ y: elevationY }}
            transition={{ type: "spring", stiffness: 140, damping: 22 }}
          >
            {/* Monitor Mounted atop Desk */}
            <div
              className="absolute -top-[165px] left-1/2 -translate-x-1/2 z-10 pointer-events-auto group/mon flex flex-col items-center"
              onClick={() => onSelectCategory?.("monitors")}
              title="Click to configure Monitor (or click screen to cycle wallpaper)"
            >
              <div className="absolute -top-7 opacity-0 group-hover/mon:opacity-100 transition-opacity bg-neutral-900/90 text-white text-[9px] px-2 py-0.5 rounded-full border border-white/20 shadow-lg pointer-events-none whitespace-nowrap">
                Display • Click to Cycle Wallpaper
              </div>
              <MonitorRenderer
                monitorId={config.monitorId}
                displayMode={config.monitorDisplayMode}
                onToggleDisplayMode={handleToggleScreen}
              />
            </div>

            {/* Desktop Accessories (Lamp, Mat, Laptop, Coffee, Plant) */}
            <div className="absolute inset-x-0 -top-[10px] h-[40px] pointer-events-auto">
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
        </motion.div>
      </div>

      {/* 4. Canvas Bottom Hint Chips */}
      <div className="relative z-30 px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between text-[11px] text-neutral-400 pointer-events-none border-t border-white/5 bg-neutral-950/50 backdrop-blur-xs">
        <div className="flex items-center gap-1.5 truncate">
          <span className="hidden sm:inline">💡</span>
          <span className="truncate">Click monitors to cycle art • Click desk or chair to customize</span>
        </div>

        <button
          onClick={handleToggleHeight}
          className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900/90 border border-white/10 hover:border-emerald-500/50 text-neutral-300 hover:text-white transition-all text-[11px] shrink-0"
        >
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span>{isStanding ? "Switch to Sitting (74cm)" : "Switch to Standing (108cm)"}</span>
        </button>
      </div>
    </div>
  );
}
