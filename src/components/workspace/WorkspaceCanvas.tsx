"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Eye,
  Lightbulb,
  Lock,
  Moon,
  Orbit,
  RotateCcw,
  RotateCw,
  Sparkles,
  Sun,
  Sunset,
  Unlock,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { motion } from "motion/react";
import { ProductCategory, WorkspaceConfig } from "@/types/workspace";
import { sound } from "@/lib/audio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AccessoriesRenderer } from "./AccessoriesRenderer";
import { ChairRenderer } from "./ChairRenderer";
import { DeskRenderer } from "./DeskRenderer";
import { LifestyleRenderer } from "./LifestyleRenderer";
import { MonitorRenderer } from "./MonitorRenderer";
import { RoomBackdrop } from "./RoomBackdrop";

interface WorkspaceCanvasProps {
  config: WorkspaceConfig;
  onChangeConfig: (updater: (prev: WorkspaceConfig) => WorkspaceConfig) => void;
  onSelectCategory?: (category: ProductCategory) => void;
  onSelectItem?: (category: ProductCategory, itemId?: string) => void;
}

export function WorkspaceCanvas({
  config,
  onChangeConfig,
  onSelectCategory,
  onSelectItem,
}: WorkspaceCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stageScale, setStageScale] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [layoutKey, setLayoutKey] = useState<number>(0);
  const [isViewLocked, setIsViewLocked] = useState<boolean>(false);
  const isStanding = config.deskHeightState === "standing";
  const currentHeight = config.deskHeightCm || (isStanding ? 108 : 74);
  const heightRatio = Math.max(0, Math.min(1, (currentHeight - 70) / (118 - 70)));
  // Smoothly zoom out in standing mode so the elevated desk, monitor, and light bar fit comfortably in view
  const standingScaleFactor = 1 - heightRatio * 0.14;
  const standingYOffset = heightRatio * 20;

  // 3D Camera Orbit & Rotation State
  const [rotY, setRotY] = useState<number>(0); // Horizontal orbit angle: -36deg to +36deg
  const [rotX, setRotX] = useState<number>(4); // Vertical pitch angle: 0deg to +24deg
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<
    "front" | "iso-left" | "iso-right" | "side" | "top" | "custom"
  >("front");

  // Pointer drag tracking refs
  const isPointerDownRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; rotY: number; rotX: number }>({
    x: 0,
    y: 0,
    rotY: 0,
    rotX: 4,
  });
  const hasDraggedRef = useRef<boolean>(false);

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

  // Pointer Event Handlers for 3D Drag Orbit
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isViewLocked) return;
    if (e.button !== 0 && e.pointerType === "mouse") return;
    isPointerDownRef.current = true;
    hasDraggedRef.current = false;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotY,
      rotX,
    };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    if (!hasDraggedRef.current && Math.hypot(dx, dy) > 5) {
      hasDraggedRef.current = true;
      setIsDragging(true);
    }

    if (hasDraggedRef.current) {
      // Fluid Studio Isometric Orbit (clamped smoothly between -44° and +44°)
      const rawRotY = dragStartRef.current.rotY + dx * 0.32;
      const clampedRotY = Math.max(-44, Math.min(44, rawRotY));
      const nextRotX = Math.max(0, Math.min(22, dragStartRef.current.rotX - dy * 0.16));
      setRotY(Number(clampedRotY.toFixed(1)));
      setRotX(Number(nextRotX.toFixed(1)));
      setActivePreset("custom");
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isPointerDownRef.current = false;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerCancel = () => {
    isPointerDownRef.current = false;
    setIsDragging(false);
  };

  // Suppress clicks on children if user performed a 3D orbit drag
  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.stopPropagation();
      e.preventDefault();
      hasDraggedRef.current = false;
    }
  };

  // Camera Presets
  const handleSelectPreset = (preset: "front" | "iso-left" | "iso-right" | "top") => {
    sound.playClick();
    setActivePreset(preset);
    switch (preset) {
      case "front":
        setRotY(0);
        setRotX(4);
        break;
      case "iso-left":
        setRotY(-28);
        setRotX(8);
        break;
      case "iso-right":
        setRotY(28);
        setRotX(8);
        break;
      case "top":
        setRotY(0);
        setRotX(18);
        break;
    }
  };

  const handleToggleLockView = () => {
    sound.playClick();
    setIsViewLocked((prev) => !prev);
  };

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
      const nextCm = Math.max(
        70,
        Math.min(
          118,
          (prev.deskHeightCm || (prev.deskHeightState === "standing" ? 108 : 74)) + delta
        )
      );
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

  // Reset all draggable desk item positions
  const handleResetLayout = () => {
    sound.playClick();
    setLayoutKey((k) => k + 1);
  };

  return (
    <div className="relative flex h-[390px] min-h-[380px] w-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 shadow-2xl select-none sm:h-[460px] lg:h-full lg:min-h-[500px]">
      {/* 1. Dynamic Room Background */}
      <RoomBackdrop timeOfDay={config.timeOfDay} />

      {/* 2. Top Canvas Floating HUD Toolbar */}
      <div className="pointer-events-auto relative z-30 flex flex-wrap items-center gap-1.5 px-2.5 py-2 sm:px-4 sm:py-3">
        {/* "Interactive 3D Studio" badge — desktop only */}
        <Badge
          variant="outline"
          className="hidden gap-1.5 border-white/15 bg-neutral-900/85 px-2.5 py-1 text-[11px] font-medium text-white/90 shadow-lg backdrop-blur-md sm:inline-flex"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span>Interactive 3D Studio</span>
        </Badge>

        {/* Quick Sit / Stand Preset Button */}
        <Button
          size="sm"
          variant="outline"
          onClick={handleToggleHeight}
          aria-label={
            isStanding
              ? `Currently standing at ${Math.round(currentHeight)} centimeters. Click to lower desk to sitting.`
              : `Currently sitting at ${Math.round(currentHeight)} centimeters. Click to raise desk to standing.`
          }
          className="h-7 gap-1 border-white/15 bg-neutral-900/85 px-2 text-[11px] text-white shadow-lg backdrop-blur-md hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <ArrowUpDown className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
          <span suppressHydrationWarning>{isStanding ? "Standing" : "Sitting"}</span>
          <span
            className="xs:inline hidden font-mono font-bold text-emerald-400"
            suppressHydrationWarning
          >
            ({Math.round(currentHeight)} cm)
          </span>
        </Button>

        {/* Micro Height Stepper (Fine-Tuning) */}
        <div className="flex items-center rounded-md border border-white/15 bg-neutral-900/85 p-0.5 shadow-lg backdrop-blur-md">
          <button
            type="button"
            onClick={() => handleStepHeight(2)}
            disabled={currentHeight >= 118}
            aria-label="Raise desk height by 2 centimeters"
            className="p-1 text-neutral-400 transition-colors hover:text-emerald-400 focus-visible:ring-1 focus-visible:ring-emerald-400 disabled:opacity-30"
            title="Raise desk +2cm"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleStepHeight(-2)}
            disabled={currentHeight <= 70}
            aria-label="Lower desk height by 2 centimeters"
            className="p-1 text-neutral-400 transition-colors hover:text-emerald-400 focus-visible:ring-1 focus-visible:ring-emerald-400 disabled:opacity-30"
            title="Lower desk -2cm"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Lock View Button */}
        <Button
          size="sm"
          variant="outline"
          onClick={handleToggleLockView}
          aria-label={
            isViewLocked
              ? "3D view locked. Click to unlock camera orbit."
              : "Lock 3D view to move desk items freely."
          }
          aria-pressed={isViewLocked}
          className={`h-7 gap-1 px-2 text-[11px] shadow-lg backdrop-blur-md transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 ${
            isViewLocked
              ? "border-amber-500/50 bg-amber-500/20 font-semibold text-amber-300 ring-1 ring-amber-400/40 hover:bg-amber-500/30"
              : "border-white/15 bg-neutral-900/85 text-neutral-300 hover:bg-neutral-800 hover:text-white"
          }`}
          title={
            isViewLocked
              ? "Unlock View (Allow 3D Orbit)"
              : "Lock View (Disable 3D rotation so you can arrange desk items freely)"
          }
        >
          {isViewLocked ? (
            <Lock className="h-3 w-3 stroke-[2.5] text-amber-400" />
          ) : (
            <Unlock className="h-3 w-3 text-neutral-400" />
          )}
          <span className="hidden sm:inline">{isViewLocked ? "View Locked" : "Lock View"}</span>
        </Button>

        {/* Quick Desk Items Layout Reset — hidden on mobile */}
        <Button
          size="sm"
          variant="outline"
          onClick={handleResetLayout}
          className="hidden h-7 gap-1 border-white/15 bg-neutral-900/85 px-2 text-[11px] text-neutral-300 shadow-lg backdrop-blur-md hover:bg-neutral-800 hover:text-white sm:inline-flex"
          title="Items on desk can be freely dragged. Click to reset items to original positions."
        >
          <Sparkles className="h-3 w-3 text-emerald-400" />
          <span>Rearrange</span>
        </Button>

        {/* Spacer pushes ambient pill to the right */}
        <div className="flex-1" />

        {/* Right: Ambient Bali Time of Day & Zoom Controls */}
        <div className="flex shrink-0 items-center gap-0.5 rounded-full border border-white/15 bg-neutral-900/85 p-1 shadow-lg backdrop-blur-md">
          <button
            type="button"
            onClick={() => handleTimeOfDay("daylight")}
            aria-label="Set room ambiance to Bali Daylight"
            aria-pressed={config.timeOfDay === "daylight"}
            className={`rounded-full p-1.5 transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              config.timeOfDay === "daylight"
                ? "bg-amber-500/20 text-amber-300 ring-1 ring-amber-400/50"
                : "text-neutral-400 hover:text-white"
            }`}
            title="Bali Daylight (Sunny)"
          >
            <Sun className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleTimeOfDay("sunset")}
            aria-label="Set room ambiance to Bali Golden Sunset"
            aria-pressed={config.timeOfDay === "sunset"}
            className={`rounded-full p-1.5 transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              config.timeOfDay === "sunset"
                ? "bg-orange-500/20 text-orange-400 ring-1 ring-orange-500/50"
                : "text-neutral-400 hover:text-white"
            }`}
            title="Bali Golden Sunset"
          >
            <Sunset className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleTimeOfDay("studio-night")}
            aria-label="Set room ambiance to Studio Night"
            aria-pressed={config.timeOfDay === "studio-night"}
            className={`rounded-full p-1.5 transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              config.timeOfDay === "studio-night"
                ? "bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400/50"
                : "text-neutral-400 hover:text-white"
            }`}
            title="Studio Night Ambient"
          >
            <Moon className="h-3.5 w-3.5" />
          </button>

          {/* Lamp toggle — only when lighting selected */}
          {config.lightingId && (
            <button
              type="button"
              onClick={handleToggleLamp}
              aria-label={config.lampPowered ? "Turn desk lamp off" : "Turn desk lamp on"}
              aria-pressed={config.lampPowered}
              className={`rounded-full p-1.5 transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                config.lampPowered
                  ? "bg-amber-400/25 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.35)] ring-1 ring-amber-400/50"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
              title={
                config.lampPowered
                  ? "Lamp is ON • Click to turn off"
                  : "Lamp is OFF • Click to turn on"
              }
            >
              <Lightbulb className="h-3.5 w-3.5" />
            </button>
          )}

          <div className="mx-0.5 h-3.5 w-[1px] bg-white/10" />

          {/* Zoom Toggle */}
          <button
            type="button"
            onClick={() => setZoomLevel((z) => (z === 1 ? 1.08 : 1))}
            aria-label={zoomLevel === 1 ? "Zoom in on workspace" : "Reset workspace zoom"}
            className="rounded-full p-1.5 text-neutral-400 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-400"
            title={zoomLevel === 1 ? "Zoom in setup" : "Reset zoom"}
          >
            {zoomLevel === 1 ? (
              <ZoomIn className="h-3.5 w-3.5" />
            ) : (
              <ZoomOut className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* 3. Main Stage Composite with 3D Perspective & Orbit Drag */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onClickCapture={handleClickCapture}
        style={{
          perspective: 1200,
          perspectiveOrigin: "50% 55%",
        }}
        className={`relative flex h-full w-full flex-1 touch-none items-center justify-center overflow-hidden select-none ${
          isViewLocked ? "cursor-default" : isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <motion.div
          style={{
            width: 760,
            height: 440,
            transformOrigin: "center center",
            transformStyle: "preserve-3d",
            rotateX: rotX,
            rotateY: rotY,
            scale: stageScale * zoomLevel * standingScaleFactor,
            y: standingYOffset,
          }}
          animate={
            isDragging
              ? {
                  scale: stageScale * zoomLevel * standingScaleFactor,
                  y: standingYOffset,
                }
              : {
                  rotateX: rotX,
                  rotateY: rotY,
                  scale: stageScale * zoomLevel * standingScaleFactor,
                  y: standingYOffset,
                }
          }
          transition={{
            type: "spring",
            stiffness: 140,
            damping: 22,
            mass: 0.8,
          }}
          className="pointer-events-auto relative shrink-0 select-none"
        >
          {/* Grounding 3D Studio Radial Shadow (Moves with Diorama Orbit) */}
          <div
            className="pointer-events-none absolute bottom-3 left-1/2 h-20 w-[540px] -translate-x-1/2 rounded-[50%] bg-black/60 blur-xl"
            style={{ transform: "translateZ(-30px)" }}
          />

          {/* Showroom Floor Pedestal Ring (Ground Floor Underneath Desk Feet) */}
          <div
            className="pointer-events-none absolute bottom-2 left-1/2 flex h-14 w-[490px] -translate-x-1/2 items-center justify-between rounded-[100%] border border-emerald-500/25 bg-gradient-to-b from-neutral-900/80 via-black/90 to-transparent px-6 shadow-[0_0_40px_rgba(16,185,129,0.18)]"
            style={{ transform: "translateZ(-15px)" }}
          >
            <span className="font-mono text-[7px] font-bold tracking-widest text-emerald-400/80">
              ◄ WEST FLANK
            </span>
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[7px] text-emerald-300">
              <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
              <span>BALI NOMAD SHOWROOM</span>
            </div>
            <span className="font-mono text-[7px] font-bold tracking-widest text-emerald-400/80">
              EAST FLANK ►
            </span>
          </div>

          {/* Bali Lifestyle Elements (Outdoor Gear Left, Relax Zone Right) */}
          <LifestyleRenderer
            outdoorId={config.outdoorId}
            relaxId={config.relaxId}
            onSelectCategory={onSelectCategory}
            onSelectItem={onSelectItem}
          />

          {/* Ergonomic Chair tucked neatly in knee hole behind desk (Tightly bounded hitbox, z-10) */}
          <ChairRenderer
            chairId={config.chairId}
            color={config.chairColor}
            isStanding={isStanding}
            onClick={() => {
              sound.playClick();
              if (onSelectItem) {
                onSelectItem("chairs", config.chairId);
              } else {
                onSelectCategory?.("chairs");
              }
            }}
          />

          {/* Desk Frame, Telescoping Legs, and Mounted Monitor & Peripherals */}
          <DeskRenderer
            finish={config.deskFinish}
            isStanding={isStanding}
            heightCm={currentHeight}
            onToggleHeight={handleToggleHeight}
            onStepHeight={handleStepHeight}
            onClick={() => {
              sound.playClick();
              if (onSelectItem) {
                onSelectItem("desks", config.deskId);
              } else {
                onSelectCategory?.("desks");
              }
            }}
          >
            {/* Monitor Mounted Directly Atop Desk Surface (Rests on bottom-0 • Horizontally Draggable along desk • z-10 behind foreground accessories) */}
            {config.monitorId && (
              <motion.div
                key={`monitor-${layoutKey}`}
                drag="x"
                dragConstraints={{ left: -140, right: 140 }}
                dragElastic={0.06}
                dragMomentum={false}
                onPointerDown={(e) => e.stopPropagation()}
                className="group/mon pointer-events-auto absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 cursor-grab flex-col items-center active:cursor-grabbing"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(5px)",
                  touchAction: "none",
                }}
                whileDrag={{ scale: 1.03 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelectItem) {
                    onSelectItem("monitors", config.monitorId!);
                  } else {
                    onSelectCategory?.("monitors");
                  }
                }}
                title="Display • Slide along desk or click to customize"
              >
                <div className="pointer-events-none absolute -top-7 z-40 rounded-full border border-white/20 bg-neutral-900/90 px-2 py-0.5 text-[9px] whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover/mon:opacity-100">
                  🖥️ Display • Slide or Click to Customize
                </div>
                <MonitorRenderer
                  monitorId={config.monitorId}
                  displayMode={config.monitorDisplayMode}
                  onToggleDisplayMode={handleToggleScreen}
                />
              </motion.div>
            )}

            {/* Desktop Accessories (Lamp, Mat, Laptop, Coffee, Plant - Foreground atop desk surface • z-30) */}
            <div
              key={`accessories-${layoutKey}`}
              className="pointer-events-none absolute inset-x-0 bottom-0 z-30"
              style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
            >
              <AccessoriesRenderer
                peripheralsId={config.peripheralsId}
                lightingId={config.lightingId}
                lampPowered={config.lampPowered}
                lampWarmth={config.lampWarmth}
                lampBrightness={config.lampBrightness ?? 100}
                onToggleLamp={handleToggleLamp}
                laptopStand={config.laptopStand}
                plantId={config.plantId}
                coffeeId={config.coffeeId}
                onSelectCategory={onSelectCategory}
                onSelectItem={onSelectItem}
              />
            </div>
          </DeskRenderer>
        </motion.div>
      </div>

      {/* 4. Floating 3D Orbit Camera Controls (Positioned above bottom bar) */}
      <div className="pointer-events-auto absolute bottom-11 left-1/2 z-30 flex max-w-[94%] -translate-x-1/2 flex-col items-center gap-1.5 sm:bottom-12">
        {/* Orbit Angle / Drag State Live Badge */}
        <div className="pointer-events-none flex items-center gap-1.5 rounded-full border border-white/10 bg-neutral-900/85 px-2.5 py-0.5 text-[10px] text-neutral-300 shadow-lg backdrop-blur-md transition-all">
          {isViewLocked ? (
            <>
              <Lock className="h-3 w-3 text-amber-400" />
              <span className="hidden font-medium text-amber-300 sm:inline">
                View locked — drag desk items freely • Click 🔓 to orbit
              </span>
              <span className="font-medium text-amber-300 sm:hidden">
                Locked — drag items freely
              </span>
            </>
          ) : isDragging ? (
            <>
              <Orbit className="h-3 w-3 animate-spin text-emerald-400" />
              <span className="font-mono font-bold text-emerald-300">
                Studio Orbit: {Math.round(rotY)}° • Pitch: {Math.round(rotX)}°
              </span>
            </>
          ) : (
            <>
              <Orbit className="h-3 w-3 text-emerald-400" />
              <span className="hidden sm:inline">
                Drag scene to orbit 3D • Tap presets below{" "}
                {rotY !== 0 ? `(${Math.round(rotY)}°)` : ""}
              </span>
              <span className="sm:hidden">
                Drag scene to rotate in 3D {rotY !== 0 ? `(${Math.round(rotY)}°)` : ""}
              </span>
            </>
          )}
        </div>

        {/* Camera Presets Pill */}
        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-neutral-900/90 p-1 shadow-2xl backdrop-blur-md">
          {/* Front 0° */}
          <button
            type="button"
            onClick={() => handleSelectPreset("front")}
            aria-label="Orbit 3D camera to front battlestation view (0 degrees)"
            aria-pressed={activePreset === "front"}
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              activePreset === "front"
                ? "bg-emerald-500/25 text-emerald-300 ring-1 ring-emerald-400/50"
                : "text-neutral-400 hover:text-white"
            }`}
            title="Front Battlestation View (0°)"
          >
            <Eye className="h-3 w-3" />
            <span>Front</span>
          </button>

          {/* 3/4 Left -28° */}
          <button
            type="button"
            onClick={() => handleSelectPreset("iso-left")}
            aria-label="Orbit 3D camera to 3/4 left isometric view (minus 28 degrees)"
            aria-pressed={activePreset === "iso-left"}
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              activePreset === "iso-left"
                ? "bg-emerald-500/25 text-emerald-300 ring-1 ring-emerald-400/50"
                : "text-neutral-400 hover:text-white"
            }`}
            title="3/4 Left Isometric View (-28°)"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Left</span>
          </button>

          {/* 3/4 Right +28° */}
          <button
            type="button"
            onClick={() => handleSelectPreset("iso-right")}
            aria-label="Orbit 3D camera to 3/4 right isometric view (plus 28 degrees)"
            aria-pressed={activePreset === "iso-right"}
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              activePreset === "iso-right"
                ? "bg-emerald-500/25 text-emerald-300 ring-1 ring-emerald-400/50"
                : "text-neutral-400 hover:text-white"
            }`}
            title="3/4 Right Isometric View (+28°)"
          >
            <RotateCw className="h-3 w-3" />
            <span>Right</span>
          </button>

          {/* Top Angle */}
          <button
            type="button"
            onClick={() => handleSelectPreset("top")}
            aria-label="Orbit 3D camera to elevated top overview angle"
            aria-pressed={activePreset === "top"}
            className={`hidden items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 sm:flex ${
              activePreset === "top"
                ? "bg-emerald-500/25 text-emerald-300 ring-1 ring-emerald-400/50"
                : "text-neutral-400 hover:text-white"
            }`}
            title="Elevated Top Overview Angle (+18°)"
          >
            <span>Top</span>
          </button>

          {/* Quick Snap Reset */}
          {(rotY !== 0 || rotX !== 4) && (
            <button
              type="button"
              onClick={() => handleSelectPreset("front")}
              aria-label="Reset 3D camera to front orientation"
              className="ml-0.5 rounded p-1 text-neutral-400 transition-colors hover:text-emerald-400 focus-visible:ring-1 focus-visible:ring-emerald-400"
              title="Reset camera to Front (0°)"
            >
              <RotateCcw className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* 5. Canvas Bottom Hint Chips */}
      <div className="pointer-events-none relative z-30 flex items-center justify-between border-t border-white/5 bg-neutral-950/50 px-3 py-2 text-[11px] text-neutral-400 backdrop-blur-xs sm:px-4 sm:py-2.5">
        <div className="flex items-center gap-1.5 truncate">
          <span className="hidden sm:inline">💡</span>
          <span className="truncate">
            Click monitors to cycle art • Click desk or chair to customize
          </span>
        </div>

        <button
          type="button"
          onClick={handleToggleHeight}
          aria-label={
            isStanding
              ? "Switch to sitting position at 74 centimeters"
              : "Switch to standing position at 108 centimeters"
          }
          className="pointer-events-auto flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-neutral-900/90 px-2.5 py-1 text-[11px] text-neutral-300 transition-all hover:border-emerald-500/50 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <Sparkles className="h-3 w-3 text-emerald-400" />
          <span suppressHydrationWarning>
            {isStanding ? "Switch to Sitting (74cm)" : "Switch to Standing (108cm)"}
          </span>
        </button>
      </div>
    </div>
  );
}
