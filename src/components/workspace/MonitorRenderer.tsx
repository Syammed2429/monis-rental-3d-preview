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
        <div className="w-full h-full bg-gradient-to-br from-neutral-950 via-stone-950 to-neutral-900 flex flex-col items-center justify-center text-white/95 p-3 select-none">
          <div className="font-mono text-2xl sm:text-3xl font-light tracking-widest text-emerald-300 drop-shadow-sm">
            14:28
          </div>
          <div className="text-[9px] uppercase tracking-widest text-neutral-400 mt-1 font-mono">
            Bali, Indonesia • GMT+8
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[8px] text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Monis High-Speed Fiber • 250 Mbps</span>
          </div>
        </div>
      );
    }

    if (displayMode === "sunset-surf") {
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-rose-500 via-amber-500 to-emerald-800 flex flex-col justify-end p-3 select-none">
          {/* Sunset Sky & Horizon Ocean */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
          <div className="absolute top-2 right-4 w-10 h-10 rounded-full bg-amber-200/40 blur-md" />
          <div className="relative z-10 text-white drop-shadow-md">
            <div className="text-[10px] font-bold tracking-wide">Echo Beach Sunset • Canggu</div>
            <div className="text-[8px] text-white/80">28°C • Offshore swell 4-6ft</div>
          </div>
        </div>
      );
    }

    // Default: "bali-gradient" - Sleek modern ambient wallpaper
    return (
      <div className="w-full h-full relative overflow-hidden bg-gradient-to-tr from-[#091b18] via-[#064e3b] to-[#047857] flex flex-col justify-between p-3 select-none">
        {/* Soft geometric ambient mesh glow */}
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-emerald-400/20 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-teal-500/20 blur-2xl" />

        {/* Minimalist Top Bar */}
        <div className="relative z-10 flex items-center justify-between text-[8px] text-emerald-200/90 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>monis.rent</span>
          </div>
          <span className="font-mono text-[7.5px] opacity-80">Bali Studio Setup</span>
        </div>

        {/* Center / Bottom Info Pill */}
        <div className="relative z-10 flex items-end justify-between">
          <div>
            <div className="text-[11px] font-semibold text-white tracking-tight">
              Focus & Flow
            </div>
            <div className="text-[8px] text-emerald-200/70">
              Canggu • Seminyak • Ubud • Uluwatu
            </div>
          </div>
          <div className="px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-[7.5px] text-white/90 font-mono">
            {isUltrawide ? "3440 × 1440 WQHD" : "5120 × 2880 5K"}
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
        <div className="flex flex-col items-center">
          {/* Main Bezel */}
          <div className="w-[310px] h-[195px] rounded-xl bg-neutral-900 p-1.5 border-2 border-neutral-700 shadow-2xl relative flex flex-col">
            {/* Top Webcam Notch */}
            <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 border border-neutral-600" />
            </div>

            {/* Active Display Surface */}
            <div className="w-full flex-1 rounded-lg overflow-hidden relative shadow-inner">
              {renderScreenContent(false)}
            </div>

            {/* Silver Aluminum Chin */}
            <div className="h-3 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 rounded-b-md mt-1 flex items-center justify-center shadow-xs">
              <div className="w-2 h-2 rounded-full bg-black/10" />
            </div>
          </div>

          {/* Aluminum Tilt Stand */}
          <div className="w-12 h-10 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 border-x border-white/30 shadow-md flex items-center justify-center relative">
            <div className="w-3.5 h-3.5 rounded-full bg-neutral-900 border border-slate-400/50 shadow-inner" />
          </div>
          {/* Aluminum Stand Base Plate */}
          <div className="w-28 h-2 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 rounded-t-md border-t border-white shadow-lg" />
        </div>
      )}

      {/* 2. Xiaomi 34" Curved Gaming Ultrawide */}
      {monitorId === "monitor-ultrawide-curved" && (
        <div className="flex flex-col items-center">
          {/* Curved Panoramic Frame */}
          <div className="w-[380px] h-[175px] rounded-xl bg-neutral-950 p-1.5 border-2 border-neutral-800 shadow-2xl relative flex flex-col">
            {/* Subtle Curve Light Highlight on Rim */}
            <div className="absolute inset-x-4 top-0.5 h-0.5 bg-cyan-400/20 rounded-full" />

            {/* Screen Surface */}
            <div className="w-full flex-1 rounded-lg overflow-hidden relative shadow-inner">
              {renderScreenContent(true)}
            </div>

            {/* Bottom Minimal Frame */}
            <div className="h-2 bg-neutral-900 rounded-b-md mt-0.5 flex items-center justify-center">
              <div className="text-[6px] tracking-widest text-neutral-500 font-mono">180Hz WQHD CURVED</div>
            </div>
          </div>

          {/* Stand Stalk */}
          <div className="w-9 h-11 bg-gradient-to-b from-neutral-800 to-neutral-900 border-x border-white/10 shadow-md flex items-center justify-center">
            <div className="w-2 h-6 bg-neutral-700 rounded-full" />
          </div>
          {/* Wide V-Legs Base */}
          <div className="relative w-44 h-3 flex justify-center items-center">
            <div className="w-44 h-2 bg-neutral-800 rounded-md border-t border-white/10 shadow-md" />
            <div className="absolute w-24 h-2 bg-neutral-900 rounded-md rotate-12 -left-1" />
            <div className="absolute w-24 h-2 bg-neutral-900 rounded-md -rotate-12 -right-1" />
          </div>
        </div>
      )}

      {/* 3. 27" 4K USB-C Multimedia Monitor */}
      {monitorId === "monitor-4k-multimedia" && (
        <div className="flex flex-col items-center">
          {/* Frameless Thin Bezel */}
          <div className="w-[290px] h-[185px] rounded-lg bg-neutral-900 p-1 border border-neutral-700 shadow-2xl relative flex flex-col">
            <div className="w-full flex-1 rounded-md overflow-hidden relative shadow-inner">
              {renderScreenContent(false)}
            </div>
            <div className="h-1.5 bg-neutral-950 rounded-b-sm mt-0.5 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-emerald-400" />
            </div>
          </div>

          {/* Minimalist Column Stand */}
          <div className="w-7 h-10 bg-neutral-800 border-x border-white/10 shadow-md flex items-center justify-center">
            <div className="w-2 h-5 bg-neutral-950 rounded-full" />
          </div>
          {/* Flat Rectangular Desk Plate */}
          <div className="w-26 h-2 bg-neutral-900 rounded-sm border-t border-white/15 shadow-lg" />
        </div>
      )}

      {/* 4. Dual 27" IPS Pro Workstation */}
      {monitorId === "monitor-dual-setup" && (
        <div className="flex flex-col items-center">
          {/* Two Monitors Side-by-Side */}
          <div className="flex gap-2 items-center">
            {/* Left Screen */}
            <div className="w-[185px] h-[155px] rounded-lg bg-neutral-900 p-1 border border-neutral-700 shadow-2xl flex flex-col">
              <div className="w-full flex-1 rounded overflow-hidden">
                {renderScreenContent(false)}
              </div>
              <div className="h-1 bg-neutral-950 mt-0.5" />
            </div>

            {/* Right Screen */}
            <div className="w-[185px] h-[155px] rounded-lg bg-neutral-900 p-1 border border-neutral-700 shadow-2xl flex flex-col">
              <div className="w-full flex-1 rounded overflow-hidden bg-gradient-to-br from-stone-900 via-neutral-900 to-zinc-950 p-2.5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[7px] text-emerald-400 font-mono border-b border-white/10 pb-1">
                  <span>Secondary Screen</span>
                  <span>Active</span>
                </div>
                <div className="space-y-1 font-mono text-[7px] text-neutral-300">
                  <div className="text-emerald-300">● Starlink Villa WiFi: 220 Mbps</div>
                  <div className="text-neutral-400">● Zoom Call: 4:30 PM (Singapore)</div>
                  <div className="text-neutral-400">● Sunset Surf: 5:45 PM Echo Beach</div>
                </div>
                <div className="text-[6.5px] text-neutral-500 font-mono text-right">
                  Monis Pro Twin
                </div>
              </div>
              <div className="h-1 bg-neutral-950 mt-0.5" />
            </div>
          </div>

          {/* Dual Gas-Spring Monitor Arm Clamped to Desk */}
          <div className="w-8 h-9 bg-neutral-900 border-x border-white/10 flex items-center justify-center relative mt-0.5">
            <div className="absolute -top-1 w-36 h-1.5 bg-neutral-800 rounded-full" />
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-700 border border-white/20" />
          </div>
          {/* Desk Clamp Base */}
          <div className="w-10 h-2 bg-neutral-950 rounded border-t border-white/20 shadow-md" />
        </div>
      )}
    </div>
  );
}
