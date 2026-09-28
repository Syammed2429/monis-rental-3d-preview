"use client";

import { useState } from "react";
import Link from "next/link";
import { PresetSetup, Currency, WorkspaceConfig } from "@/types/workspace";
import { PRESETS } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sparkles, Volume2, VolumeX, Globe, ChevronDown, Share2, Check } from "lucide-react";
import { sound } from "@/lib/audio";

interface HeaderProps {
  currentConfig: WorkspaceConfig;
  onApplyPreset: (preset: PresetSetup) => void;
  currency: Currency;
  onCurrencyToggle: () => void;
  onOpenCheckout: () => void;
}

export function Header({
  currentConfig: _currentConfig,
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
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <header className="w-full bg-neutral-950/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Client Identity */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            title="monis.rent - Remote Work Made Efficient in Bali"
          >
            {/* Monis Brand Logo Mark */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-[0_0_16px_rgba(16,185,129,0.35)] group-hover:scale-105 transition-transform">
              <span className="font-mono font-black text-neutral-950 text-lg leading-none">
                m
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-base tracking-tight font-sans">
                  monis<span className="text-emerald-400">.rent</span>
                </span>
                <Badge
                  variant="outline"
                  className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[10px] px-1.5 py-0 h-4 font-mono font-medium hidden sm:inline-flex"
                >
                  Bali Hub
                </Badge>
              </div>
              <p className="text-[10px] text-neutral-400 hidden sm:block">
                Interactive Workspace Designer
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Presets Quick Switcher */}
        <div className="hidden md:flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-neutral-900/90 px-3.5 h-8 text-xs font-medium text-white hover:bg-neutral-800 shadow-md transition-colors cursor-pointer outline-none">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Curated Nomadic Presets</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 bg-neutral-950 border-neutral-800 text-white p-1 rounded-2xl shadow-2xl">
              <DropdownMenuLabel className="text-[10px] font-mono uppercase text-neutral-400 px-3 py-1.5">
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
                  className="p-2.5 rounded-xl hover:bg-neutral-900 cursor-pointer flex flex-col items-start gap-1"
                >
                  <div className="w-full flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">
                      {preset.name}
                    </span>
                    <Badge
                      variant="secondary"
                      className="text-[9px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-1.5 py-0"
                    >
                      {preset.badge}
                    </Badge>
                  </div>
                  <span className="text-[10px] text-neutral-400 line-clamp-1">
                    {preset.tagline}
                  </span>
                </DropdownMenuItem>
              ))}
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
            className="w-8 h-8 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-900"
            title={isMuted ? "Unmute audio clicks" : "Mute audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </Button>

          {/* Currency Toggle (USD vs IDR) */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              sound.playClick();
              onCurrencyToggle();
            }}
            className="bg-neutral-900 border-white/15 text-neutral-200 hover:text-white text-xs h-8 px-2.5 rounded-full font-mono flex items-center gap-1.5 shadow-sm"
            title="Toggle between USD and Indonesian Rupiah (IDR)"
          >
            <Globe className="w-3.5 h-3.5 text-neutral-400" />
            <span className="font-bold">{currency}</span>
          </Button>

          {/* Share Setup Link */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="bg-neutral-900 border-white/15 text-neutral-200 hover:text-white text-xs h-8 px-2.5 rounded-full flex items-center gap-1.5 shadow-sm"
            title="Copy shareable link to this workspace setup"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
            ) : (
              <Share2 className="w-3.5 h-3.5 text-neutral-400" />
            )}
            <span className="hidden sm:inline font-medium">
              {copied ? "Link Copied!" : "Share"}
            </span>
          </Button>

          {/* Quick Rent Setup Button */}
          <Button
            size="sm"
            onClick={onOpenCheckout}
            className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs h-8 px-3.5 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 transition-all"
          >
            <span>Rent Setup</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
