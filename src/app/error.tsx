"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    <div className="flex-center min-h-screen flex-col bg-[#0c0e14] p-4 text-center text-neutral-100 selection:bg-emerald-500 selection:text-neutral-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 w-full max-w-md space-y-6 rounded-3xl border border-white/10 bg-neutral-900/70 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
        {/* Error icon badge */}
        <div className="mx-auto flex-center h-16 w-16 rounded-2xl border border-rose-500/30 bg-gradient-to-tr from-rose-500/20 to-amber-500/20 text-rose-400 shadow-lg shadow-rose-500/10">
          <ShieldAlert className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <div className="flex-center gap-2">
            <Badge
              variant="outline"
              className="border-rose-500/30 bg-rose-500/10 px-2 py-0.5 font-mono text-[10px] text-rose-400"
            >
              Application Error {error.digest ? `• #${error.digest.slice(0, 8)}` : ""}
            </Badge>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Unexpected Workspace Error
          </h1>
          <p className="text-xs leading-relaxed text-neutral-400 sm:text-sm">
            An unexpected error occurred while rendering the interactive designer. Your
            configuration can be restored safely.
          </p>

          {error.message && (
            <div className="mt-3 truncate rounded-xl border border-rose-500/20 bg-neutral-950/80 p-2.5 text-left font-mono text-[11px] text-rose-300">
              <code>{error.message}</code>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="space-y-2.5 pt-2">
          <Button
            onClick={() => reset()}
            className="h-10 w-full gap-2 rounded-xl bg-emerald-500 text-xs font-bold text-neutral-950 shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.01] hover:bg-emerald-400 active:scale-[0.99]"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>

          <Button
            variant="outline"
            onClick={handleResetStorage}
            className="h-9 w-full rounded-xl border-white/10 text-xs text-neutral-300 hover:border-white/20 hover:text-white"
          >
            Reset Setup to Default
          </Button>

          <Link
            href="/"
            className="flex-center h-9 w-full gap-1.5 rounded-xl text-xs text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Reload Workspace Designer</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
