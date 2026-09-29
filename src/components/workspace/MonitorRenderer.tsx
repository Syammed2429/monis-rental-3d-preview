"use client";

import { useEffect, useState } from "react";

interface MonitorRendererProps {
  monitorId: string;
  displayMode: "bali-gradient" | "sunset-surf" | "minimal-clock";
  onToggleDisplayMode?: () => void;
}

export function MonitorRenderer({
  monitorId,
  displayMode,
  onToggleDisplayMode,
}: MonitorRendererProps) {
  // Live Time & Date state (synced to Bali WITA GMT+8)
  const [timeData, setTimeData] = useState<{
    hours: string;
    minutes: string;
    seconds: string;
    date: string;
  }>({
    hours: "19",
    minutes: "08",
    seconds: "00",
    date: "Tue, Sep 29",
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      try {
        const hours = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Makassar",
          hour: "2-digit",
          hour12: false,
        }).format(now);

        const minutes = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Makassar",
          minute: "2-digit",
        }).format(now);

        const seconds = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Makassar",
          second: "2-digit",
        }).format(now);

        const date = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Makassar",
          weekday: "short",
          day: "numeric",
          month: "short",
        }).format(now);

        setTimeData({ hours, minutes, seconds, date });
      } catch {
        // Fallback to local time if timezone format fails
        const pad = (n: number) => n.toString().padStart(2, "0");
        setTimeData({
          hours: pad(now.getHours()),
          minutes: pad(now.getMinutes()),
          seconds: pad(now.getSeconds()),
          date: now.toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
          }),
        });
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Screen content renderer based on displayMode
  const renderScreenContent = (isUltrawide: boolean = false) => {
    if (displayMode === "minimal-clock") {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-neutral-950 via-stone-950 to-neutral-900 p-2 text-white/95 select-none">
          {/* Live Digital Clock */}
          <div className="flex items-baseline justify-center font-mono font-light tracking-widest text-emerald-300 drop-shadow-sm">
            <span className="text-2xl leading-none font-extralight tracking-wider sm:text-3xl">
              {timeData.hours}
            </span>
            <span className="animate-pulse px-0.5 text-xl leading-none text-emerald-400 sm:text-2xl">
              :
            </span>
            <span className="text-2xl leading-none font-extralight tracking-wider sm:text-3xl">
              {timeData.minutes}
            </span>
            <span className="ml-1 font-mono text-[9px] leading-none text-emerald-400/70 sm:text-[10px]">
              :{timeData.seconds}
            </span>
          </div>

          {/* Live Date and Bali Timezone */}
          <div className="mt-1 font-mono text-[7.5px] tracking-wider text-neutral-300 uppercase">
            {timeData.date} • Bali (GMT+8)
          </div>

          {/* Status Badge */}
          <div className="mt-1.5 flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[7px] text-emerald-300">
            <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
            <span>Monis WiFi • 250 Mbps</span>
          </div>
        </div>
      );
    }

    if (displayMode === "sunset-surf") {
      return (
        <div className="relative flex h-full w-full flex-col justify-end overflow-hidden bg-gradient-to-b from-rose-500 via-amber-500 to-emerald-800 p-2 select-none">
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
          <div className="absolute top-1.5 right-3 h-7 w-7 rounded-full bg-amber-200/40 blur-xs" />
          <div className="absolute top-1.5 left-2 flex items-center gap-1 font-mono text-[6.5px] text-white/90">
            <span>
              {timeData.hours}:{timeData.minutes}
            </span>
            <span>•</span>
            <span>{timeData.date}</span>
          </div>
          <div className="relative z-10 text-white drop-shadow-md">
            <div className="text-[8.5px] font-bold tracking-wide">Echo Beach Sunset</div>
            <div className="text-[7px] text-white/80">28°C • Canggu Bali</div>
          </div>
        </div>
      );
    }

    // Default: "bali-gradient" - Modern ambient wallpaper
    return (
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-tr from-[#091b18] via-[#064e3b] to-[#047857] p-2 select-none">
        <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-emerald-400/20 blur-xl" />
        <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-teal-500/20 blur-xl" />

        <div className="relative z-10 flex items-center justify-between text-[7px] font-medium text-emerald-200/90">
          <div className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            <span>monis.rent</span>
          </div>
          <span className="font-mono text-[6.5px] opacity-80">
            {timeData.hours}:{timeData.minutes} WITA
          </span>
        </div>

        <div className="relative z-10 flex items-end justify-between">
          <div>
            <div className="text-[9px] leading-tight font-semibold tracking-tight text-white">
              Focus & Flow
            </div>
            <div className="text-[6.5px] text-emerald-200/70">Canggu • Ubud • Uluwatu</div>
          </div>
          <div className="rounded border border-white/15 bg-white/10 px-1.5 py-0.5 font-mono text-[6.5px] text-white/90 backdrop-blur-md">
            {isUltrawide ? "WQHD" : "5K Retina"}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      onClick={onToggleDisplayMode}
      className="group flex cursor-pointer flex-col items-center transition-transform select-none hover:scale-[1.01] active:scale-[0.99]"
      title="Click screen to cycle wallpaper style"
    >
      {/* 1. Apple 27" 5K Studio Display */}
      {monitorId === "monitor-studio-display" && (
        <div className="flex flex-col items-center" style={{ transformStyle: "preserve-3d" }}>
          {/* Main Bezel Assembly with 3D Front & Rear Chassis */}
          <div className="relative h-[155px] w-[240px]" style={{ transformStyle: "preserve-3d" }}>
            {/* Front Screen Display Face (+Z) */}
            <div
              className="absolute inset-0 flex flex-col rounded-lg border-2 border-neutral-700 bg-neutral-900 p-1 shadow-2xl"
              style={{ transform: "translateZ(4px)", backfaceVisibility: "hidden" }}
            >
              {/* Top Webcam Notch */}
              <div className="absolute top-0.5 left-1/2 flex h-1 w-6 -translate-x-1/2 items-center justify-center">
                <div className="h-1 w-1 rounded-full border border-neutral-600 bg-neutral-800" />
              </div>

              {/* Active Display Surface */}
              <div className="relative w-full flex-1 overflow-hidden rounded shadow-inner">
                {renderScreenContent(false)}
              </div>

              {/* Silver Aluminum Chin */}
              <div className="mt-0.5 flex h-2.5 items-center justify-center rounded-b bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 shadow-xs">
                <div className="h-1.5 w-1.5 rounded-full bg-black/10" />
              </div>
            </div>

            {/* Rear 3D Aluminum Chassis (-Z: Visible when rotated 180deg) */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-between rounded-lg border border-slate-400/50 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 p-2.5 shadow-2xl"
              style={{ transform: "rotateY(180deg) translateZ(4px)", backfaceVisibility: "hidden" }}
            >
              {/* Top Exhaust Vent Slot */}
              <div className="h-1 w-28 rounded-full bg-black/30" />

              {/* Rear Embossed Studio Display Branding */}
              <div className="font-mono text-[7px] font-bold tracking-widest text-slate-600/80">
                APPLE STUDIO DISPLAY
              </div>

              {/* Circular Magnetic Stand Hinge Pivot */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-400 bg-slate-300 shadow-inner">
                <div className="h-3.5 w-3.5 rounded-full border border-white/40 bg-slate-400/80" />
              </div>

              {/* Power & Thunderbolt Port Bar */}
              <div className="flex items-center gap-2">
                <div className="h-1 w-3 rounded-full bg-black/50" />
                <div className="h-1 w-1 rounded-full bg-black/50" />
                <div className="h-1 w-1 rounded-full bg-black/50" />
              </div>
            </div>
          </div>

          {/* Aluminum Tilt Stand */}
          <div
            className="relative flex h-8 w-9 items-center justify-center border-x border-white/30 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 shadow-md"
            style={{ transform: "translateZ(0px)" }}
          >
            <div className="h-2.5 w-2.5 rounded-full border border-slate-400/50 bg-neutral-900 shadow-inner" />
          </div>
          {/* Aluminum Stand Base Plate */}
          <div
            className="h-1.5 w-22 rounded-t border-t border-white bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 shadow-lg"
            style={{ transform: "translateZ(0px)" }}
          />
        </div>
      )}

      {/* 2. Xiaomi 34" Curved Gaming Ultrawide */}
      {monitorId === "monitor-ultrawide-curved" && (
        <div className="flex flex-col items-center" style={{ transformStyle: "preserve-3d" }}>
          {/* Curved Panoramic Frame with 3D Front & Rear */}
          <div className="relative h-[135px] w-[290px]" style={{ transformStyle: "preserve-3d" }}>
            {/* Front Screen Surface (+Z) */}
            <div
              className="absolute inset-0 flex flex-col rounded-xl border-2 border-neutral-800 bg-neutral-950 p-1 shadow-2xl"
              style={{ transform: "translateZ(5px)", backfaceVisibility: "hidden" }}
            >
              <div className="absolute inset-x-4 top-0.5 h-0.5 rounded-full bg-cyan-400/20" />

              {/* Screen Surface */}
              <div className="relative w-full flex-1 overflow-hidden rounded-lg shadow-inner">
                {renderScreenContent(true)}
              </div>

              {/* Bottom Minimal Frame */}
              <div className="mt-0.5 flex h-1.5 items-center justify-center rounded-b bg-neutral-900">
                <div className="font-mono text-[5.5px] tracking-widest text-neutral-500">
                  180Hz WQHD CURVED
                </div>
              </div>
            </div>

            {/* Rear Curved Gaming Chassis (-Z: Visible when rotated 180deg) */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-between rounded-xl border border-neutral-700 bg-neutral-900 p-2.5 shadow-2xl"
              style={{ transform: "rotateY(180deg) translateZ(5px)", backfaceVisibility: "hidden" }}
            >
              {/* Top Heat Dissipation Grill */}
              <div className="h-1 w-36 rounded-full bg-black/60" />

              {/* Gaming Ambient Halo Ring */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-cyan-500/40 bg-neutral-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <div className="font-mono text-[6px] font-bold text-cyan-400/90">180Hz</div>
              </div>

              {/* Rear Cable Cover Clip */}
              <div className="h-2 w-8 rounded border border-white/10 bg-neutral-800" />
            </div>
          </div>

          {/* Stand Stalk */}
          <div
            className="flex h-9 w-7 items-center justify-center border-x border-white/10 bg-gradient-to-b from-neutral-800 to-neutral-900 shadow-md"
            style={{ transform: "translateZ(0px)" }}
          >
            <div className="h-5 w-1.5 rounded-full bg-neutral-700" />
          </div>
          {/* Wide V-Legs Base */}
          <div
            className="relative flex h-2.5 w-34 items-center justify-center"
            style={{ transform: "translateZ(0px)" }}
          >
            <div className="h-1.5 w-34 rounded-md border-t border-white/10 bg-neutral-800 shadow-md" />
            <div className="absolute -left-1 h-1.5 w-20 rotate-12 rounded-md bg-neutral-900" />
            <div className="absolute -right-1 h-1.5 w-20 -rotate-12 rounded-md bg-neutral-900" />
          </div>
        </div>
      )}

      {/* 3. 27" 4K USB-C Multimedia Monitor */}
      {monitorId === "monitor-4k-multimedia" && (
        <div className="flex flex-col items-center">
          {/* Frameless Thin Bezel */}
          <div className="relative flex h-[145px] w-[230px] flex-col rounded-lg border border-neutral-700 bg-neutral-900 p-1 shadow-2xl">
            <div className="relative w-full flex-1 overflow-hidden rounded shadow-inner">
              {renderScreenContent(false)}
            </div>
            <div className="mt-0.5 flex h-1 items-center justify-center rounded-b-sm bg-neutral-950">
              <div className="h-1 w-1 rounded-full bg-emerald-400" />
            </div>
          </div>

          {/* Minimalist Column Stand */}
          <div className="flex h-8 w-6 items-center justify-center border-x border-white/10 bg-neutral-800 shadow-md">
            <div className="h-4 w-1.5 rounded-full bg-neutral-950" />
          </div>
          {/* Flat Rectangular Desk Plate */}
          <div className="h-1.5 w-20 rounded-sm border-t border-white/15 bg-neutral-900 shadow-lg" />
        </div>
      )}

      {/* 4. Dual 27" IPS Pro Workstation */}
      {monitorId === "monitor-dual-setup" && (
        <div className="flex flex-col items-center">
          {/* Two Monitors Side-by-Side */}
          <div className="flex items-center gap-1.5">
            {/* Left Screen */}
            <div className="flex h-[120px] w-[138px] flex-col rounded border border-neutral-700 bg-neutral-900 p-0.5 shadow-2xl">
              <div className="w-full flex-1 overflow-hidden rounded-xs">
                {renderScreenContent(false)}
              </div>
              <div className="mt-0.5 h-1 bg-neutral-950" />
            </div>

            {/* Right Screen */}
            <div className="flex h-[120px] w-[138px] flex-col rounded border border-neutral-700 bg-neutral-900 p-0.5 shadow-2xl">
              <div className="flex w-full flex-1 flex-col justify-between overflow-hidden rounded-xs bg-gradient-to-br from-stone-900 via-neutral-900 to-zinc-950 p-2">
                <div className="flex items-center justify-between border-b border-white/10 pb-0.5 font-mono text-[6px] text-emerald-400">
                  <span>Display 2</span>
                  <span>Active</span>
                </div>
                <div className="space-y-0.5 font-mono text-[6px] text-neutral-300">
                  <div className="text-emerald-300">● Starlink: 250 Mbps</div>
                  <div className="text-neutral-400">● Zoom: 4:30 PM SGT</div>
                  <div className="text-neutral-400">● Sunset: 5:45 PM</div>
                </div>
                <div className="text-right font-mono text-[5.5px] text-neutral-500">Pro Twin</div>
              </div>
              <div className="mt-0.5 h-1 bg-neutral-950" />
            </div>
          </div>

          {/* Dual Gas-Spring Monitor Arm Clamped to Desk */}
          <div className="relative mt-0.5 flex h-7 w-6 items-center justify-center border-x border-white/10 bg-neutral-900">
            <div className="absolute -top-1 h-1 w-28 rounded-full bg-neutral-800" />
            <div className="h-2 w-2 rounded-full border border-white/20 bg-neutral-700" />
          </div>
          {/* Desk Clamp Base */}
          <div className="h-1.5 w-8 rounded border-t border-white/20 bg-neutral-950 shadow-md" />
        </div>
      )}
    </div>
  );
}
