"use client";

interface MonitorRendererProps {
  monitorId: string;
  displayMode: "code" | "bali-nature" | "minimal-clock" | "off";
  onToggleDisplayMode?: () => void;
}

export function MonitorRenderer({
  monitorId,
  displayMode,
  onToggleDisplayMode,
}: MonitorRendererProps) {
  // Screen content renderer based on displayMode
  const renderScreenContent = (isUltrawide: boolean = false) => {
    if (displayMode === "off") {
      return (
        <div className="w-full h-full bg-[#0b0f17] flex items-center justify-center opacity-90">
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
        </div>
      );
    }

    if (displayMode === "minimal-clock") {
      return (
        <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-stone-900 to-zinc-950 flex flex-col items-center justify-center text-white/90 p-4">
          <div className="font-mono text-3xl font-extralight tracking-widest text-emerald-300">
            14:28
          </div>
          <div className="text-[9px] uppercase tracking-widest text-neutral-400 mt-1 font-mono">
            Bali, Indonesia • GMT+8
          </div>
          <div className="mt-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[8px] text-emerald-300">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
            <span>Monis WiFi • 220 Mbps</span>
          </div>
        </div>
      );
    }

    if (displayMode === "bali-nature") {
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-sky-400 via-teal-300 to-emerald-600 flex flex-col justify-end p-3">
          {/* Sunset Horizon / Surf Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-800/40 to-transparent" />
          <div className="relative z-10 text-white drop-shadow-md">
            <div className="text-[10px] font-bold tracking-wide">Canggu Coast, Bali</div>
            <div className="text-[8px] opacity-80">28°C • Sunny offshore surf</div>
          </div>
        </div>
      );
    }

    // Default: "code" IDE (VS Code Theme)
    return (
      <div className="w-full h-full bg-[#1e1e2e] flex flex-col font-mono text-[8px] text-neutral-300 select-none overflow-hidden">
        {/* Editor Title Bar */}
        <div className="h-4.5 bg-[#181825] border-b border-white/5 flex items-center px-2 justify-between">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-[7px] text-neutral-400">monis-workspace.tsx</span>
          </div>
          <div className="text-[7px] text-emerald-400 font-bold">● Git Main</div>
        </div>

        {/* Code Lines Body */}
        <div className={`p-2 flex-1 flex gap-2 ${isUltrawide ? "grid grid-cols-2 gap-4" : ""}`}>
          {/* Code Window 1 */}
          <div className="space-y-0.5 leading-tight">
            <div className="flex gap-2">
              <span className="text-neutral-600">1</span>
              <span><span className="text-purple-400">import</span> {"{ createWorkspace }"} <span className="text-purple-400">from</span> <span className="text-amber-300">&quot;monis&quot;</span>;</span>
            </div>
            <div className="flex gap-2">
              <span className="text-neutral-600">2</span>
              <span><span className="text-blue-400">const</span> <span className="text-yellow-300">baliOffice</span> = <span className="text-emerald-300">await</span> createWorkspace({"{"}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-neutral-600">3</span>
              <span className="pl-2">location: <span className="text-amber-300">&quot;Canggu, Bali&quot;</span>,</span>
            </div>
            <div className="flex gap-2">
              <span className="text-neutral-600">4</span>
              <span className="pl-2">desk: <span className="text-cyan-300">&quot;Dual-Motor Standing&quot;</span>,</span>
            </div>
            <div className="flex gap-2">
              <span className="text-neutral-600">5</span>
              <span className="pl-2">chair: <span className="text-cyan-300">&quot;Ergonomic 4D Mesh&quot;</span>,</span>
            </div>
            <div className="flex gap-2">
              <span className="text-neutral-600">6</span>
              <span className="pl-2">wifi: <span className="text-cyan-300">&quot;Starlink 220 Mbps&quot;</span></span>
            </div>
            <div className="flex gap-2">
              <span className="text-neutral-600">7</span>
              <span>{"});"}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-neutral-600">8</span>
              <span><span className="text-emerald-400">console</span>.<span className="text-blue-300">log</span>(<span className="text-amber-300">&quot;🌴 Remote life activated!&quot;</span>);</span>
            </div>
          </div>

          {/* Ultrawide Split Pane: Live Preview or Terminal */}
          {isUltrawide && (
            <div className="bg-[#11111b] rounded p-1.5 border border-white/5 space-y-1">
              <div className="text-[7px] text-neutral-400 font-bold flex items-center gap-1">
                <span className="w-1 h-1 bg-emerald-400 rounded-full" /> Terminal (zsh)
              </div>
              <div className="text-emerald-400 text-[7px]">$ monis rent --deploy bali</div>
              <div className="text-neutral-400 text-[6.5px]">✓ Verified equipment availability in Canggu Hub</div>
              <div className="text-neutral-400 text-[6.5px]">✓ Delivery scheduled: Tomorrow 11:00 AM</div>
              <div className="text-cyan-300 text-[6.5px]">✓ Ergonomic assembly team dispatched</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      onClick={onToggleDisplayMode}
      className="cursor-pointer group flex flex-col items-center select-none"
      title="Click screen to cycle wallpaper / IDE / clock"
    >
      {/* 1. Apple 27" 5K Studio Display */}
      {monitorId === "monitor-studio-display" && (
        <div className="flex flex-col items-center">
          {/* Main Bezel */}
          <div className="w-[340px] h-[215px] rounded-xl bg-neutral-900 p-1.5 border-2 border-neutral-700 shadow-2xl relative flex flex-col">
            {/* Top Webcam Notch */}
            <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 border border-neutral-600" />
            </div>

            {/* Active Display Surface */}
            <div className="w-full flex-1 rounded-lg overflow-hidden relative shadow-inner">
              {renderScreenContent(false)}
            </div>

            {/* Silver Aluminum Chin */}
            <div className="h-3.5 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 rounded-b-md mt-1 flex items-center justify-center shadow-xs">
              <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
            </div>
          </div>

          {/* Aluminum Tilt Stand */}
          <div className="w-14 h-12 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 border-x border-white/30 shadow-md flex items-center justify-center relative">
            {/* Cable Pass-Through Hole */}
            <div className="w-4 h-4 rounded-full bg-neutral-900 border border-slate-400/50 shadow-inner" />
          </div>
          {/* Aluminum Stand Base Plate */}
          <div className="w-32 h-2.5 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 rounded-t-md border-t border-white shadow-lg" />
        </div>
      )}

      {/* 2. Xiaomi 34" Curved Gaming Ultrawide */}
      {monitorId === "monitor-ultrawide-curved" && (
        <div className="flex flex-col items-center">
          {/* Curved Panoramic Frame */}
          <div className="w-[430px] h-[195px] rounded-xl bg-neutral-950 p-1.5 border-2 border-neutral-800 shadow-2xl relative flex flex-col transform perspective-500">
            {/* Subtle Curve Light Highlight on Rim */}
            <div className="absolute inset-x-4 top-0.5 h-0.5 bg-cyan-400/20 rounded-full" />

            {/* Screen Surface */}
            <div className="w-full flex-1 rounded-lg overflow-hidden relative shadow-inner">
              {renderScreenContent(true)}
            </div>

            {/* Bottom Minimal Frame */}
            <div className="h-2.5 bg-neutral-900 rounded-b-md mt-0.5 flex items-center justify-center">
              <div className="text-[6px] tracking-widest text-neutral-500 font-mono">180Hz WQHD</div>
            </div>
          </div>

          {/* Heavy Duty Y-Stand Stalk */}
          <div className="w-10 h-14 bg-gradient-to-b from-neutral-800 to-neutral-900 border-x border-white/10 shadow-md flex items-center justify-center">
            <div className="w-2 h-7 bg-neutral-700 rounded-full" />
          </div>
          {/* Wide V-Legs Base */}
          <div className="relative w-48 h-3 flex justify-center items-center">
            <div className="w-48 h-2 bg-neutral-800 rounded-md border-t border-white/10 shadow-md" />
            <div className="absolute w-28 h-2 bg-neutral-900 rounded-md rotate-12 -left-1" />
            <div className="absolute w-28 h-2 bg-neutral-900 rounded-md -rotate-12 -right-1" />
          </div>
        </div>
      )}

      {/* 3. 27" 4K USB-C Multimedia Monitor */}
      {monitorId === "monitor-4k-multimedia" && (
        <div className="flex flex-col items-center">
          {/* Frameless Thin Bezel */}
          <div className="w-[330px] h-[210px] rounded-lg bg-neutral-900 p-1 border border-neutral-700 shadow-2xl relative flex flex-col">
            <div className="w-full flex-1 rounded-md overflow-hidden relative shadow-inner">
              {renderScreenContent(false)}
            </div>
            <div className="h-2 bg-neutral-950 rounded-b-sm mt-0.5 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-emerald-400" />
            </div>
          </div>

          {/* Minimalist Column Stand */}
          <div className="w-8 h-12 bg-neutral-800 border-x border-white/10 shadow-md flex items-center justify-center">
            <div className="w-2 h-6 bg-neutral-950 rounded-full" />
          </div>
          {/* Flat Rectangular Desk Plate */}
          <div className="w-30 h-2 bg-neutral-900 rounded-sm border-t border-white/15 shadow-lg" />
        </div>
      )}

      {/* 4. Dual 27" IPS Pro Workstation */}
      {monitorId === "monitor-dual-setup" && (
        <div className="flex flex-col items-center">
          {/* Two Monitors Side-by-Side */}
          <div className="flex gap-2 items-center">
            {/* Left Screen (Main IDE) */}
            <div className="w-[220px] h-[180px] rounded-lg bg-neutral-900 p-1 border border-neutral-700 shadow-2xl flex flex-col">
              <div className="w-full flex-1 rounded overflow-hidden">
                {renderScreenContent(false)}
              </div>
              <div className="h-1.5 bg-neutral-950 mt-0.5" />
            </div>

            {/* Right Screen (Secondary Vertical or Terminal) */}
            <div className="w-[200px] h-[180px] rounded-lg bg-neutral-900 p-1 border border-neutral-700 shadow-2xl flex flex-col">
              <div className="w-full flex-1 rounded overflow-hidden bg-[#11111b] p-2 font-mono text-[7px] text-cyan-300">
                <div className="text-neutral-400 text-[6.5px] border-b border-white/10 pb-1 mb-1">
                  Docs & System Metrics
                </div>
                <div className="space-y-1">
                  <div>CPU: 18% | RAM: 14.2 GB</div>
                  <div>Network: 220 Mbps (Bali Starlink)</div>
                  <div className="text-emerald-400">✓ All systems operational</div>
                  <div className="text-amber-300 mt-2">Next Zoom: 4:30 PM (San Francisco)</div>
                </div>
              </div>
              <div className="h-1.5 bg-neutral-950 mt-0.5" />
            </div>
          </div>

          {/* Dual Gas-Spring Monitor Arm Clamped to Desk */}
          <div className="w-10 h-10 bg-neutral-900 border-x border-white/10 flex items-center justify-center relative mt-1">
            <div className="absolute -top-1 w-44 h-1.5 bg-neutral-800 rounded-full" />
            <div className="w-3 h-3 rounded-full bg-neutral-700 border border-white/20" />
          </div>
          {/* Desk Clamp Base */}
          <div className="w-12 h-2.5 bg-neutral-950 rounded border-t border-white/20 shadow-md" />
        </div>
      )}
    </div>
  );
}
