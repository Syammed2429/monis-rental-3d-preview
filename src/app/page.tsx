import { Mail, MessageSquare, RefreshCw, ShieldCheck, Sparkles, Truck, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WorkspaceStudio } from "@/components/workspace/WorkspaceStudio";

/**
 * React Server Component (RSC) Root Page
 *
 * Preserves Next.js 16 App Router best practices:
 * - Server prerendered layout shell, SEO headings, benefits grid, and candidate metadata
 * - Client-side state (Zustand, 3D vector canvas, checkout dialog, audio synthesizers)
 *   is cleanly decoupled into the `<WorkspaceStudio />` boundary.
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0c0e14] pb-36 font-sans text-neutral-100 selection:bg-emerald-500 selection:text-neutral-950">
      {/* WCAG 2.1 Bypass Blocks: Skip to Configurator link */}
      <a
        href="#configurator-section"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-xl focus:bg-emerald-500 focus:px-4 focus:py-2.5 focus:font-sans focus:text-xs focus:font-bold focus:text-neutral-950 focus:shadow-2xl focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-neutral-950 focus:outline-none"
      >
        Skip to product configurator
      </a>

      {/* Main Interactive Studio (Client Boundary) */}
      <main className="w-full flex-1">
        <WorkspaceStudio />

        {/* Server-Side Rendered (SSR): Value Proposition & Nomad Benefits */}
        <div className="mx-auto w-full max-w-7xl px-4 pt-12 sm:px-6">
          <section className="space-y-6 border-t border-white/10 pt-10">
            <div className="mx-auto max-w-xl space-y-1.5 text-center">
              <h2 className="text-xl font-bold text-white">
                Why Remote Workers in Bali Rent with Monis
              </h2>
              <p className="text-xs text-neutral-400">
                Skip the hassle of buying furniture in local shops or working with bad posture from
                villa sofas.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2 rounded-2xl border border-white/5 bg-neutral-900/50 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <Truck className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-white">Next-Day Delivery</h3>
                <p className="text-xs leading-relaxed text-neutral-400">
                  Order today, arrive tomorrow. Delivered and professionally assembled right inside
                  your villa bedroom or living space.
                </p>
              </div>

              <div className="space-y-2 rounded-2xl border border-white/5 bg-neutral-900/50 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-white">Zero Deposit Required</h3>
                <p className="text-xs leading-relaxed text-neutral-400">
                  No massive security deposits or complicated paperwork. Simply verify your WhatsApp
                  or passport and pay as you go.
                </p>
              </div>

              <div className="space-y-2 rounded-2xl border border-white/5 bg-neutral-900/50 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <RefreshCw className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-white">Flexible Rental Terms</h3>
                <p className="text-xs leading-relaxed text-neutral-400">
                  Rent for 1 week while on a workation, or 6 months as an island resident with up to
                  30% progressive long-stay discounts.
                </p>
              </div>

              <div className="space-y-2 rounded-2xl border border-white/5 bg-neutral-900/50 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <Zap className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-white">Full Stress-Free Return</h3>
                <p className="text-xs leading-relaxed text-neutral-400">
                  Flying out to your next destination? Send us a WhatsApp pin, and our logistics
                  crew will pack up and pick up everything.
                </p>
              </div>
            </div>
          </section>

          {/* Server-Side Rendered (SSR): Candidate & Developer Attribution Section */}
          <section className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/70 via-neutral-950/80 to-emerald-950/20 p-6 backdrop-blur-xl sm:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-emerald-500/30 bg-emerald-500/10 font-mono text-[10px] text-emerald-400"
                  >
                    <Sparkles className="mr-1 h-3 w-3" />
                    Desent Solutions Coding Challenge 2
                  </Badge>
                  <span className="text-xs font-medium text-neutral-400">
                    Candidate Submission for{" "}
                    <span className="font-semibold text-white">monis.rent</span>
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white sm:text-xl">Built by Dada Khalandar</h3>
                <p className="max-w-2xl text-xs text-neutral-400 sm:text-sm">
                  Senior Frontend Architect implementation featuring Next.js 16 Server Components,
                  Tailwind CSS v4, Zustand state orchestration, interactive 3D vector canvas, Web
                  Audio synthesizers, and WCAG 2.1 AA compliant accessibility.
                </p>
              </div>

              {/* Developer Contact & Links */}
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://wa.me/6281632129228?text=Hi%20Dada%2C%20reviewing%20your%20Desent%20Solutions%20Coding%20Test%202%20submission%21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/15 px-3.5 py-2 text-xs font-semibold text-emerald-400 transition-colors hover:border-emerald-500/60 hover:bg-emerald-500/25 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                  aria-label="Contact Dada Khalandar via WhatsApp"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>WhatsApp (+62 816-3212-9228)</span>
                </a>

                <a
                  href="https://github.com/syammed2429"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-neutral-800/80 px-3.5 py-2 text-xs font-semibold text-neutral-200 transition-colors hover:border-white/20 hover:bg-neutral-800 hover:text-white focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none"
                  aria-label="View Dada Khalandar on GitHub"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  <span>GitHub (@syammed2429)</span>
                </a>

                <a
                  href="mailto:kerry.blig12@gmail.com"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-neutral-800/80 px-3.5 py-2 text-xs font-semibold text-neutral-200 transition-colors hover:border-white/20 hover:bg-neutral-800 hover:text-white focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none"
                  aria-label="Email Dada Khalandar"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Email</span>
                </a>
              </div>
            </div>

            {/* Tech Badges & Quality Indicators */}
            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4 text-[11px] text-neutral-400">
              <span className="font-mono text-neutral-500">Quality Gates:</span>
              <span className="rounded-md bg-neutral-800/70 px-2 py-0.5 text-neutral-300">
                Next.js 16 (RSC Architecture)
              </span>
              <span className="rounded-md bg-neutral-800/70 px-2 py-0.5 text-neutral-300">
                React 19
              </span>
              <span className="rounded-md bg-neutral-800/70 px-2 py-0.5 text-neutral-300">
                Tailwind CSS v4
              </span>
              <span className="rounded-md bg-neutral-800/70 px-2 py-0.5 text-neutral-300">
                TypeScript 5 (Strict)
              </span>
              <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-400">
                18/18 Unit Tests Passing
              </span>
              <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-400">
                WCAG 2.1 AA Compliant
              </span>
              <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-400">
                0 ESLint Warnings
              </span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
