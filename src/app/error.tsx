"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected runtime errors for observability
    console.error("Next.js App Router Caught Error:", error);
  }, [error]);

  const handleResetStorage = () => {
    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.clear();
        window.localStorage.removeItem("monis-workspace-store");
      }
    } catch {}
    reset();
  };

  return (
    <div className="min-h-screen bg-[#0c0e14] text-neutral-100 flex-center flex-col p-4 text-center selection:bg-emerald-500 selection:text-neutral-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full p-6 sm:p-8 rounded-3xl bg-neutral-900/70 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6">
        {/* Error icon badge */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500/20 to-amber-500/20 border border-rose-500/30 text-rose-400 flex-center mx-auto shadow-lg shadow-rose-500/10">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="flex-center gap-2">
            <Badge
              variant="outline"
              className="bg-rose-500/10 text-rose-400 border-rose-500/30 text-[10px] font-mono px-2 py-0.5"
            >
              Application Error {error.digest ? `• #${error.digest.slice(0, 8)}` : ""}
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Unexpected Workspace Error
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            An unexpected error occurred while rendering the interactive designer. Your configuration can be restored safely.
          </p>

          {error.message && (
            <div className="p-2.5 rounded-xl bg-neutral-950/80 border border-rose-500/20 text-rose-300 font-mono text-[11px] text-left truncate mt-3">
              <code>{error.message}</code>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="pt-2 space-y-2.5">
          <Button
            onClick={() => reset()}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs h-10 rounded-xl shadow-lg shadow-emerald-500/25 gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>

          <Button
            variant="outline"
            onClick={handleResetStorage}
            className="w-full border-white/10 hover:border-white/20 text-neutral-300 hover:text-white text-xs h-9 rounded-xl"
          >
            Reset Setup to Default
          </Button>

          <Link
            href="/"
            className="w-full text-neutral-400 hover:text-white text-xs h-9 rounded-xl flex-center gap-1.5 hover:bg-white/5 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Reload Workspace Designer</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
