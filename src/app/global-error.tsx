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
      <body className="min-h-screen bg-[#0c0e14] text-neutral-100 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full p-8 rounded-3xl bg-neutral-900 border border-white/10 text-center space-y-6 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto text-2xl font-bold">
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
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs h-10 rounded-xl transition-all"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
