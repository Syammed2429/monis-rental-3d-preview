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
import {
  Sun,
  Sunset,
  Moon,
  ArrowUpDown,
  Sparkles,
  Lock,
  Unlock,
  ZoomIn,
  ZoomOut,
  ChevronUp,
  ChevronDown,
  Orbit,
  RotateCcw,
  RotateCw,
  Eye,
  Lightbulb,
} from "lucide-react";
import { sound } from "@/lib/audio";

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
    <div className="relative w-full h-[390px] sm:h-[460px] lg:h-full min-h-[380px] lg:min-h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-950 flex flex-col justify-between select-none">
      {/* 1. Dynamic Room Background */}
      <RoomBackdrop timeOfDay={config.timeOfDay} />

      {/* 2. Top Canvas Floating HUD Toolbar */}
      <div className="relative z-30 px-2.5 py-2 sm:px-4 sm:py-3 flex flex-wrap items-center gap-1.5 pointer-events-auto">
        {/* "Interactive 3D Studio" badge — desktop only */}
        <Badge
          variant="outline"
          className="bg-neutral-900/85 backdrop-blur-md border-white/15 text-white/90 font-medium px-2.5 py-1 text-[11px] gap-1.5 shadow-lg hidden sm:inline-flex"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive 3D Studio</span>
        </Badge>

        {/* Quick Sit / Stand Preset Button */}
        <Button
          size="sm"
          variant="outline"
          onClick={handleToggleHeight}
          className="bg-neutral-900/85 backdrop-blur-md border-white/15 text-white hover:bg-neutral-800 text-[11px] h-7 px-2 gap-1 shadow-lg"
        >
          <ArrowUpDown className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
          <span suppressHydrationWarning>{isStanding ? "Standing" : "Sitting"}</span>
          <span className="font-mono text-emerald-400 font-bold hidden xs:inline" suppressHydrationWarning>
            ({Math.round(currentHeight)} cm)
          </span>
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

        {/* Lock View Button */}
        <Button
          size="sm"
          variant="outline"
          onClick={handleToggleLockView}
          className={`backdrop-blur-md text-[11px] h-7 px-2 gap-1 shadow-lg transition-all ${
            isViewLocked
              ? "bg-amber-500/20 border-amber-500/50 text-amber-300 hover:bg-amber-500/30 ring-1 ring-amber-400/40 font-semibold"
              : "bg-neutral-900/85 border-white/15 text-neutral-300 hover:text-white hover:bg-neutral-800"
          }`}
          title={
            isViewLocked
              ? "Unlock View (Allow 3D Orbit)"
              : "Lock View (Disable 3D rotation so you can arrange desk items freely)"
          }
        >
          {isViewLocked ? (
            <Lock className="w-3 h-3 text-amber-400 stroke-[2.5]" />
          ) : (
            <Unlock className="w-3 h-3 text-neutral-400" />
          )}
          <span className="hidden sm:inline">{isViewLocked ? "View Locked" : "Lock View"}</span>
        </Button>

        {/* Quick Desk Items Layout Reset — hidden on mobile */}
        <Button
          size="sm"
          variant="outline"
          onClick={handleResetLayout}
          className="bg-neutral-900/85 backdrop-blur-md border-white/15 text-neutral-300 hover:text-white hover:bg-neutral-800 text-[11px] h-7 px-2 gap-1 shadow-lg hidden sm:inline-flex"
          title="Items on desk can be freely dragged. Click to reset items to original positions."
        >
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span>Rearrange</span>
        </Button>

        {/* Spacer pushes ambient pill to the right */}
        <div className="flex-1" />

        {/* Right: Ambient Bali Time of Day & Zoom Controls */}
        <div className="flex items-center gap-0.5 bg-neutral-900/85 backdrop-blur-md border border-white/15 p-1 rounded-full shadow-lg shrink-0">
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

          {/* Lamp toggle — only when lighting selected */}
          {config.lightingId && (
            <button
              onClick={handleToggleLamp}
              className={`p-1.5 rounded-full transition-all ${
                config.lampPowered
                  ? "bg-amber-400/25 text-amber-300 ring-1 ring-amber-400/50 shadow-[0_0_12px_rgba(251,191,36,0.35)]"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
              title={config.lampPowered ? "Lamp is ON • Click to turn off" : "Lamp is OFF • Click to turn on"}
            >
              <Lightbulb className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="w-[1px] h-3.5 bg-white/10 mx-0.5" />

          {/* Zoom Toggle */}
          <button
            onClick={() => setZoomLevel((z) => (z === 1 ? 1.08 : 1))}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white transition-colors"
            title={zoomLevel === 1 ? "Zoom in setup" : "Reset zoom"}
          >
            {zoomLevel === 1 ? (
              <ZoomIn className="w-3.5 h-3.5" />
            ) : (
              <ZoomOut className="w-3.5 h-3.5" />
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
        className={`relative flex-1 w-full h-full flex items-center justify-center overflow-hidden touch-none select-none ${
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
          className="relative shrink-0 select-none pointer-events-auto"
        >
          {/* Grounding 3D Studio Radial Shadow (Moves with Diorama Orbit) */}
          <div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[540px] h-20 rounded-[50%] bg-black/60 blur-xl pointer-events-none"
            style={{ transform: "translateZ(-30px)" }}
          />

          {/* Showroom Floor Pedestal Ring (Ground Floor Underneath Desk Feet) */}
          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[490px] h-14 rounded-[100%] pointer-events-none border border-emerald-500/25 bg-gradient-to-b from-neutral-900/80 via-black/90 to-transparent shadow-[0_0_40px_rgba(16,185,129,0.18)] flex items-center justify-between px-6"
            style={{ transform: "translateZ(-15px)" }}
          >
            <span className="text-[7px] font-mono text-emerald-400/80 font-bold tracking-widest">
              ◄ WEST FLANK
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[7px] font-mono text-emerald-300">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
              <span>BALI NOMAD SHOWROOM</span>
            </div>
            <span className="text-[7px] font-mono text-emerald-400/80 font-bold tracking-widest">
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
                className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-auto group/mon flex flex-col items-center cursor-grab active:cursor-grabbing"
                style={{ transformStyle: "preserve-3d", transform: "translateZ(5px)", touchAction: "none" }}
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
                <div className="absolute -top-7 opacity-0 group-hover/mon:opacity-100 transition-opacity bg-neutral-900/90 text-white text-[9px] px-2 py-0.5 rounded-full border border-white/20 shadow-lg pointer-events-none whitespace-nowrap z-40">
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
              className="absolute inset-x-0 bottom-0 pointer-events-none z-30"
              style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
            >
              <AccessoriesRenderer
                peripheralsId={config.peripheralsId}
                lightingId={config.lightingId}
                lampPowered={config.lampPowered}
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
      <div className="absolute bottom-11 sm:bottom-12 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex flex-col items-center gap-1.5 max-w-[94%]">
        {/* Orbit Angle / Drag State Live Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-900/85 backdrop-blur-md border border-white/10 text-[10px] text-neutral-300 shadow-lg pointer-events-none transition-all">
          {isViewLocked ? (
            <>
              <Lock className="w-3 h-3 text-amber-400" />
              <span className="text-amber-300 font-medium hidden sm:inline">
                View locked — drag desk items freely • Click 🔓 to orbit
              </span>
              <span className="text-amber-300 font-medium sm:hidden">
                Locked — drag items freely
              </span>
            </>
          ) : isDragging ? (
            <>
              <Orbit className="w-3 h-3 text-emerald-400 animate-spin" />
              <span className="font-mono text-emerald-300 font-bold">
                Studio Orbit: {Math.round(rotY)}° • Pitch: {Math.round(rotX)}°
              </span>
            </>
          ) : (
            <>
              <Orbit className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">
                Drag scene to orbit 3D • Tap presets below {rotY !== 0 ? `(${Math.round(rotY)}°)` : ""}
              </span>
              <span className="sm:hidden">
                Drag scene to rotate in 3D {rotY !== 0 ? `(${Math.round(rotY)}°)` : ""}
              </span>
            </>
          )}
        </div>

        {/* Camera Presets Pill */}
        <div className="flex items-center gap-1 bg-neutral-900/90 backdrop-blur-md border border-white/15 p-1 rounded-full shadow-2xl">
          {/* Front 0° */}
          <button
            onClick={() => handleSelectPreset("front")}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1 ${
              activePreset === "front"
                ? "bg-emerald-500/25 text-emerald-300 ring-1 ring-emerald-400/50"
                : "text-neutral-400 hover:text-white"
            }`}
            title="Front Battlestation View (0°)"
          >
            <Eye className="w-3 h-3" />
            <span>Front</span>
          </button>

          {/* 3/4 Left -28° */}
          <button
            onClick={() => handleSelectPreset("iso-left")}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1 ${
              activePreset === "iso-left"
                ? "bg-emerald-500/25 text-emerald-300 ring-1 ring-emerald-400/50"
                : "text-neutral-400 hover:text-white"
            }`}
            title="3/4 Left Isometric View (-28°)"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Left</span>
          </button>

          {/* 3/4 Right +28° */}
          <button
            onClick={() => handleSelectPreset("iso-right")}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1 ${
              activePreset === "iso-right"
                ? "bg-emerald-500/25 text-emerald-300 ring-1 ring-emerald-400/50"
                : "text-neutral-400 hover:text-white"
            }`}
            title="3/4 Right Isometric View (+28°)"
          >
            <RotateCw className="w-3 h-3" />
            <span>Right</span>
          </button>

          {/* Top Angle */}
          <button
            onClick={() => handleSelectPreset("top")}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all hidden sm:flex items-center gap-1 ${
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
              onClick={() => handleSelectPreset("front")}
              className="p-1 text-neutral-400 hover:text-emerald-400 transition-colors ml-0.5"
              title="Reset camera to Front (0°)"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* 5. Canvas Bottom Hint Chips */}
      <div className="relative z-30 px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between text-[11px] text-neutral-400 pointer-events-none border-t border-white/5 bg-neutral-950/50 backdrop-blur-xs">
        <div className="flex items-center gap-1.5 truncate">
          <span className="hidden sm:inline">💡</span>
          <span className="truncate">
            Click monitors to cycle art • Click desk or chair to customize
          </span>
        </div>

        <button
          onClick={handleToggleHeight}
          className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900/90 border border-white/10 hover:border-emerald-500/50 text-neutral-300 hover:text-white transition-all text-[11px] shrink-0"
        >
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span suppressHydrationWarning>{isStanding ? "Switch to Sitting (74cm)" : "Switch to Standing (108cm)"}</span>
        </button>
      </div>
    </div>
  );
}
