import Link from "next/link";
import { ArrowLeft, Compass, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0c0e14] text-neutral-100 flex-center flex-col p-4 text-center selection:bg-emerald-500 selection:text-neutral-950">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6">
        {/* Brand Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-400/20 border border-emerald-500/30 text-emerald-400 flex-center mx-auto shadow-lg shadow-emerald-500/10">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: "12s" }} />
        </div>

        <div className="space-y-2">
          <div className="flex-center gap-2">
            <Badge
              variant="outline"
              className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[11px] font-mono px-2 py-0.5"
            >
              404 • Page Not Found
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Lost in the Canggu Surf?
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            The workspace or page you are looking for does not exist or may have been moved.
            Let&apos;s get you back to building your dream Bali office.
          </p>
        </div>

        {/* Quick Recovery Options */}
        <div className="pt-2 space-y-3">
          <Link
            href="/"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs h-10 rounded-xl shadow-lg shadow-emerald-500/25 flex-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Workspace Designer</span>
          </Link>

          <div className="pt-3 border-t border-white/5">
            <p className="text-[10px] text-neutral-500 mb-2 uppercase font-mono tracking-wider">
              Need assistance?
            </p>
            <a
              href="https://wa.me/6281234567890?text=Hi%20Monis%20team,%20I%20hit%20a%20404%20error%20on%20the%20workspace%20designer."
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1 font-medium"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Contact Monis Villa Concierge on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
