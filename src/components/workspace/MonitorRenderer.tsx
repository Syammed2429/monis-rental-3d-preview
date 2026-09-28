"use client";

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
  // Screen content renderer based on displayMode
  const renderScreenContent = (isUltrawide: boolean = false) => {
    if (displayMode === "minimal-clock") {
      return (
        <div className="w-full h-full bg-gradient-to-br from-neutral-950 via-stone-950 to-neutral-900 flex flex-col items-center justify-center text-white/95 p-2 select-none">
          <div className="font-mono text-xl sm:text-2xl font-light tracking-widest text-emerald-300 drop-shadow-sm leading-none">
            14:28
          </div>
          <div className="text-[7.5px] uppercase tracking-widest text-neutral-400 mt-1 font-mono">
            Bali • GMT+8
          </div>
          <div className="mt-1.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[7px] text-emerald-300">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            <span>Monis WiFi • 250 Mbps</span>
          </div>
        </div>
      );
    }

    if (displayMode === "sunset-surf") {
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-rose-500 via-amber-500 to-emerald-800 flex flex-col justify-end p-2 select-none">
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
          <div className="absolute top-1.5 right-3 w-7 h-7 rounded-full bg-amber-200/40 blur-xs" />
          <div className="relative z-10 text-white drop-shadow-md">
            <div className="text-[8.5px] font-bold tracking-wide">Echo Beach Sunset</div>
            <div className="text-[7px] text-white/80">28°C • Canggu Bali</div>
          </div>
        </div>
      );
    }

    // Default: "bali-gradient" - Modern ambient wallpaper
    return (
      <div className="w-full h-full relative overflow-hidden bg-gradient-to-tr from-[#091b18] via-[#064e3b] to-[#047857] flex flex-col justify-between p-2 select-none">
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-emerald-400/20 blur-xl" />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-teal-500/20 blur-xl" />

        <div className="relative z-10 flex items-center justify-between text-[7px] text-emerald-200/90 font-medium">
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            <span>monis.rent</span>
          </div>
          <span className="font-mono text-[6.5px] opacity-80">Bali Studio</span>
        </div>

        <div className="relative z-10 flex items-end justify-between">
          <div>
            <div className="text-[9px] font-semibold text-white tracking-tight leading-tight">
              Focus & Flow
            </div>
            <div className="text-[6.5px] text-emerald-200/70">
              Canggu • Ubud • Uluwatu
            </div>
          </div>
          <div className="px-1.5 py-0.5 rounded bg-white/10 backdrop-blur-md border border-white/15 text-[6.5px] text-white/90 font-mono">
            {isUltrawide ? "WQHD" : "5K Retina"}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      onClick={onToggleDisplayMode}
      className="cursor-pointer group flex flex-col items-center select-none transition-transform hover:scale-[1.01] active:scale-[0.99]"
      title="Click screen to cycle wallpaper style"
    >
      {/* 1. Apple 27" 5K Studio Display */}
      {monitorId === "monitor-studio-display" && (
        <div className="flex flex-col items-center" style={{ transformStyle: "preserve-3d" }}>
          {/* Main Bezel Assembly with 3D Front & Rear Chassis */}
          <div className="relative w-[240px] h-[155px]" style={{ transformStyle: "preserve-3d" }}>
            {/* Front Screen Display Face (+Z) */}
            <div
              className="absolute inset-0 rounded-lg bg-neutral-900 p-1 border-2 border-neutral-700 shadow-2xl flex flex-col"
              style={{ transform: "translateZ(4px)", backfaceVisibility: "hidden" }}
            >
              {/* Top Webcam Notch */}
              <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-6 h-1 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-neutral-800 border border-neutral-600" />
              </div>

              {/* Active Display Surface */}
              <div className="w-full flex-1 rounded overflow-hidden relative shadow-inner">
                {renderScreenContent(false)}
              </div>

              {/* Silver Aluminum Chin */}
              <div className="h-2.5 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 rounded-b mt-0.5 flex items-center justify-center shadow-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-black/10" />
              </div>
            </div>

            {/* Rear 3D Aluminum Chassis (-Z: Visible when rotated 180deg) */}
            <div
              className="absolute inset-0 rounded-lg bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 border border-slate-400/50 shadow-2xl p-2.5 flex flex-col items-center justify-between"
              style={{ transform: "rotateY(180deg) translateZ(4px)", backfaceVisibility: "hidden" }}
            >
              {/* Top Exhaust Vent Slot */}
              <div className="w-28 h-1 bg-black/30 rounded-full" />

              {/* Rear Embossed Studio Display Branding */}
              <div className="text-slate-600/80 font-mono text-[7px] font-bold tracking-widest">
                APPLE STUDIO DISPLAY
              </div>

              {/* Circular Magnetic Stand Hinge Pivot */}
              <div className="w-9 h-9 rounded-full bg-slate-300 border-2 border-slate-400 shadow-inner flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-slate-400/80 border border-white/40" />
              </div>

              {/* Power & Thunderbolt Port Bar */}
              <div className="flex gap-2 items-center">
                <div className="w-3 h-1 bg-black/50 rounded-full" />
                <div className="w-1 h-1 bg-black/50 rounded-full" />
                <div className="w-1 h-1 bg-black/50 rounded-full" />
              </div>
            </div>
          </div>

          {/* Aluminum Tilt Stand */}
          <div
            className="w-9 h-8 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 border-x border-white/30 shadow-md flex items-center justify-center relative"
            style={{ transform: "translateZ(0px)" }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-slate-400/50 shadow-inner" />
          </div>
          {/* Aluminum Stand Base Plate */}
          <div
            className="w-22 h-1.5 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 rounded-t border-t border-white shadow-lg"
            style={{ transform: "translateZ(0px)" }}
          />
        </div>
      )}

      {/* 2. Xiaomi 34" Curved Gaming Ultrawide */}
      {monitorId === "monitor-ultrawide-curved" && (
        <div className="flex flex-col items-center" style={{ transformStyle: "preserve-3d" }}>
          {/* Curved Panoramic Frame with 3D Front & Rear */}
          <div className="relative w-[290px] h-[135px]" style={{ transformStyle: "preserve-3d" }}>
            {/* Front Screen Surface (+Z) */}
            <div
              className="absolute inset-0 rounded-xl bg-neutral-950 p-1 border-2 border-neutral-800 shadow-2xl flex flex-col"
              style={{ transform: "translateZ(5px)", backfaceVisibility: "hidden" }}
            >
              <div className="absolute inset-x-4 top-0.5 h-0.5 bg-cyan-400/20 rounded-full" />

              {/* Screen Surface */}
              <div className="w-full flex-1 rounded-lg overflow-hidden relative shadow-inner">
                {renderScreenContent(true)}
              </div>

              {/* Bottom Minimal Frame */}
              <div className="h-1.5 bg-neutral-900 rounded-b mt-0.5 flex items-center justify-center">
                <div className="text-[5.5px] tracking-widest text-neutral-500 font-mono">180Hz WQHD CURVED</div>
              </div>
            </div>

            {/* Rear Curved Gaming Chassis (-Z: Visible when rotated 180deg) */}
            <div
              className="absolute inset-0 rounded-xl bg-neutral-900 border border-neutral-700 shadow-2xl p-2.5 flex flex-col items-center justify-between"
              style={{ transform: "rotateY(180deg) translateZ(5px)", backfaceVisibility: "hidden" }}
            >
              {/* Top Heat Dissipation Grill */}
              <div className="w-36 h-1 bg-black/60 rounded-full" />

              {/* Gaming Ambient Halo Ring */}
              <div className="w-12 h-12 rounded-full border-2 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.3)] bg-neutral-950 flex items-center justify-center">
                <div className="text-[6px] font-mono text-cyan-400/90 font-bold">180Hz</div>
              </div>

              {/* Rear Cable Cover Clip */}
              <div className="w-8 h-2 bg-neutral-800 rounded border border-white/10" />
            </div>
          </div>

          {/* Stand Stalk */}
          <div
            className="w-7 h-9 bg-gradient-to-b from-neutral-800 to-neutral-900 border-x border-white/10 shadow-md flex items-center justify-center"
            style={{ transform: "translateZ(0px)" }}
          >
            <div className="w-1.5 h-5 bg-neutral-700 rounded-full" />
          </div>
          {/* Wide V-Legs Base */}
          <div
            className="relative w-34 h-2.5 flex justify-center items-center"
            style={{ transform: "translateZ(0px)" }}
          >
            <div className="w-34 h-1.5 bg-neutral-800 rounded-md border-t border-white/10 shadow-md" />
            <div className="absolute w-20 h-1.5 bg-neutral-900 rounded-md rotate-12 -left-1" />
            <div className="absolute w-20 h-1.5 bg-neutral-900 rounded-md -rotate-12 -right-1" />
          </div>
        </div>
      )}

      {/* 3. 27" 4K USB-C Multimedia Monitor */}
      {monitorId === "monitor-4k-multimedia" && (
        <div className="flex flex-col items-center">
          {/* Frameless Thin Bezel */}
          <div className="w-[230px] h-[145px] rounded-lg bg-neutral-900 p-1 border border-neutral-700 shadow-2xl relative flex flex-col">
            <div className="w-full flex-1 rounded overflow-hidden relative shadow-inner">
              {renderScreenContent(false)}
            </div>
            <div className="h-1 bg-neutral-950 rounded-b-sm mt-0.5 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-emerald-400" />
            </div>
          </div>

          {/* Minimalist Column Stand */}
          <div className="w-6 h-8 bg-neutral-800 border-x border-white/10 shadow-md flex items-center justify-center">
            <div className="w-1.5 h-4 bg-neutral-950 rounded-full" />
          </div>
          {/* Flat Rectangular Desk Plate */}
          <div className="w-20 h-1.5 bg-neutral-900 rounded-sm border-t border-white/15 shadow-lg" />
        </div>
      )}

      {/* 4. Dual 27" IPS Pro Workstation */}
      {monitorId === "monitor-dual-setup" && (
        <div className="flex flex-col items-center">
          {/* Two Monitors Side-by-Side */}
          <div className="flex gap-1.5 items-center">
            {/* Left Screen */}
            <div className="w-[138px] h-[120px] rounded bg-neutral-900 p-0.5 border border-neutral-700 shadow-2xl flex flex-col">
              <div className="w-full flex-1 rounded-xs overflow-hidden">
                {renderScreenContent(false)}
              </div>
              <div className="h-1 bg-neutral-950 mt-0.5" />
            </div>

            {/* Right Screen */}
            <div className="w-[138px] h-[120px] rounded bg-neutral-900 p-0.5 border border-neutral-700 shadow-2xl flex flex-col">
              <div className="w-full flex-1 rounded-xs overflow-hidden bg-gradient-to-br from-stone-900 via-neutral-900 to-zinc-950 p-2 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[6px] text-emerald-400 font-mono border-b border-white/10 pb-0.5">
                  <span>Display 2</span>
                  <span>Active</span>
                </div>
                <div className="space-y-0.5 font-mono text-[6px] text-neutral-300">
                  <div className="text-emerald-300">● Starlink: 250 Mbps</div>
                  <div className="text-neutral-400">● Zoom: 4:30 PM SGT</div>
                  <div className="text-neutral-400">● Sunset: 5:45 PM</div>
                </div>
                <div className="text-[5.5px] text-neutral-500 font-mono text-right">
                  Pro Twin
                </div>
              </div>
              <div className="h-1 bg-neutral-950 mt-0.5" />
            </div>
          </div>

          {/* Dual Gas-Spring Monitor Arm Clamped to Desk */}
          <div className="w-6 h-7 bg-neutral-900 border-x border-white/10 flex items-center justify-center relative mt-0.5">
            <div className="absolute -top-1 w-28 h-1 bg-neutral-800 rounded-full" />
            <div className="w-2 h-2 rounded-full bg-neutral-700 border border-white/20" />
          </div>
          {/* Desk Clamp Base */}
          <div className="w-8 h-1.5 bg-neutral-950 rounded border-t border-white/20 shadow-md" />
        </div>
      )}
    </div>
  );
}
