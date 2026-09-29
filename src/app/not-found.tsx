import Link from "next/link";
import { ArrowLeft, Compass, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function NotFound() {
  return (
    <div className="flex-center min-h-screen flex-col bg-[#0c0e14] p-4 text-center text-neutral-100 selection:bg-emerald-500 selection:text-neutral-950">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 w-full max-w-md space-y-6 rounded-3xl border border-white/10 bg-neutral-900/60 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
        {/* Brand Icon */}
        <div className="mx-auto flex-center h-16 w-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-tr from-emerald-500/20 to-teal-400/20 text-emerald-400 shadow-lg shadow-emerald-500/10">
          <Compass className="h-8 w-8 animate-spin" style={{ animationDuration: "12s" }} />
        </div>

        <div className="space-y-2">
          <div className="flex-center gap-2">
            <Badge
              variant="outline"
              className="border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] text-emerald-400"
            >
              404 • Page Not Found
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Lost in the Canggu Surf?
          </h1>
          <p className="text-xs leading-relaxed text-neutral-400 sm:text-sm">
            The workspace or page you are looking for does not exist or may have been moved.
            Let&apos;s get you back to building your dream Bali office.
          </p>
        </div>

        {/* Quick Recovery Options */}
        <div className="space-y-3 pt-2">
          <Link
            href="/"
            className="flex-center h-10 w-full gap-2 rounded-xl bg-emerald-500 text-xs font-bold text-neutral-950 shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] hover:bg-emerald-400 active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Workspace Designer</span>
          </Link>

          <div className="border-t border-white/5 pt-3">
            <p className="mb-2 font-mono text-[10px] tracking-wider text-neutral-500 uppercase">
              Need assistance?
            </p>
            <a
              href="https://wa.me/6281234567890?text=Hi%20Monis%20team,%20I%20hit%20a%20404%20error%20on%20the%20workspace%20designer."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 transition-colors hover:text-emerald-300"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Contact Monis Villa Concierge on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
