"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Layout Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-[#0c0e14] p-4 font-sans text-neutral-100">
        <div className="w-full max-w-md space-y-6 rounded-3xl border border-white/10 bg-neutral-900 p-8 text-center shadow-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/20 text-2xl font-bold text-rose-400">
            !
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold text-white">System Error</h1>
            <p className="text-xs text-neutral-400">
              A critical layout error occurred. Please refresh or reset the application.
            </p>
          </div>

          <button
            type="button"
            onClick={() => reset()}
            className="h-10 w-full rounded-xl bg-emerald-500 text-xs font-bold text-neutral-950 transition-all hover:bg-emerald-400"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
