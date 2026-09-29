"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Globe, Share2, Sparkles, Volume2, VolumeX } from "lucide-react";
import { Currency, PresetSetup, WorkspaceConfig } from "@/types/workspace";
import { sound } from "@/lib/audio";
import { serializeConfigToUrl } from "@/lib/config-url";
import { PRESETS } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  currentConfig: WorkspaceConfig;
  onApplyPreset: (preset: PresetSetup) => void;
  currency: Currency;
  onCurrencyToggle: () => void;
  onOpenCheckout: () => void;
}

export function Header({
  currentConfig,
  onApplyPreset,
  currency,
  onCurrencyToggle,
  onOpenCheckout,
}: HeaderProps) {
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());
  const [copied, setCopied] = useState<boolean>(false);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    sound.setMuted(nextMuted);
    setIsMuted(nextMuted);
    if (!nextMuted) sound.playClick();
  };

  const handleShare = () => {
    sound.playSelect();
    if (typeof window !== "undefined") {
      const shareParams = serializeConfigToUrl(currentConfig);
      const shareUrl = `${window.location.origin}${window.location.pathname}${shareParams.startsWith("?") ? shareParams : ""}`;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex-between h-16 max-w-7xl gap-4 px-4 sm:px-6">
        {/* Brand & Client Identity */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            title="monis.rent - Remote Work Made Efficient in Bali"
          >
            {/* Monis Brand Logo Mark */}
            <div className="flex-center h-9 w-9 rounded-xl bg-linear-to-tr from-emerald-500 to-teal-400 shadow-[0_0_16px_rgba(16,185,129,0.35)] transition-transform group-hover:scale-105">
              <span className="font-mono text-lg leading-none font-black text-neutral-950">m</span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-sans text-base font-bold tracking-tight text-white">
                  monis<span className="text-emerald-400">.rent</span>
                </span>
                <Badge
                  variant="outline"
                  className="hidden h-4 border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0 font-mono text-[10px] font-medium text-emerald-400 sm:inline-flex"
                >
                  Bali Hub
                </Badge>
              </div>
              <p className="hidden text-[10px] text-neutral-400 sm:block">
                Interactive Workspace Designer
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Presets Quick Switcher */}
        <div className="hidden items-center gap-2 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-8 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/15 bg-neutral-900/90 px-3.5 text-xs font-medium text-white shadow-md transition-colors outline-none hover:bg-neutral-800">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Curated Nomadic Presets</span>
              <ChevronDown className="h-3 w-3 text-neutral-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 rounded-2xl border-neutral-800 bg-neutral-950 p-1 text-white shadow-2xl">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="px-3 py-1.5 font-mono text-[10px] text-neutral-400 uppercase">
                  Popular Bali Villa Setups
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-neutral-800" />
                {PRESETS.map((preset) => (
                  <DropdownMenuItem
                    key={preset.id}
                    onClick={() => {
                      sound.playSelect();
                      onApplyPreset(preset);
                    }}
                    className="flex cursor-pointer flex-col items-start gap-1 rounded-xl p-2.5 hover:bg-neutral-900"
                  >
                    <div className="flex-between w-full">
                      <span className="text-xs font-semibold text-white">{preset.name}</span>
                      <Badge
                        variant="secondary"
                        className="border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0 text-[9px] text-emerald-300"
                      >
                        {preset.badge}
                      </Badge>
                    </div>
                    <span className="line-clamp-1 text-[10px] text-neutral-400">
                      {preset.tagline}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right Actions: Currency, Sound FX, Rent CTA */}
        <div className="flex items-center gap-2.5">
          {/* Audio Sound FX Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleMute}
            className="h-8 w-8 rounded-full text-neutral-400 hover:bg-neutral-900 hover:text-white"
            title={isMuted ? "Unmute audio clicks" : "Mute audio"}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4 text-emerald-400" />
            )}
          </Button>

          {/* Currency Toggle (USD vs IDR) */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              sound.playClick();
              onCurrencyToggle();
            }}
            className="flex h-8 items-center gap-1.5 rounded-full border-white/15 bg-neutral-900 px-2.5 font-mono text-xs text-neutral-200 shadow-sm hover:text-white"
            title="Toggle between USD and Indonesian Rupiah (IDR)"
          >
            <Globe className="h-3.5 w-3.5 text-neutral-400" />
            <span className="font-bold">{currency}</span>
          </Button>

          {/* Share Setup Link */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="flex h-8 items-center gap-1.5 rounded-full border-white/15 bg-neutral-900 px-2.5 text-xs text-neutral-200 shadow-sm hover:text-white"
            title="Copy shareable link to this workspace setup"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 stroke-3 text-emerald-400" />
            ) : (
              <Share2 className="h-3.5 w-3.5 text-neutral-400" />
            )}
            <span className="hidden font-medium sm:inline">
              {copied ? "Link Copied!" : "Share"}
            </span>
          </Button>

          {/* Quick Rent Setup Button */}
          <Button
            size="sm"
            onClick={onOpenCheckout}
            className="h-8 rounded-full bg-emerald-500 px-3.5 text-xs font-bold text-neutral-950 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all hover:scale-105 hover:bg-emerald-400 active:scale-95"
          >
            <span>Rent Setup</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
