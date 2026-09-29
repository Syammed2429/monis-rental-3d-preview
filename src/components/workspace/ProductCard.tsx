"use client";

import React from "react";
import { ProductItem, Currency } from "@/types/workspace";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";
import { formatPrice } from "@/lib/pricing";

interface ProductCardProps {
  item: ProductItem;
  isSelected: boolean;
  isFocused?: boolean;
  currency: Currency;
  onSelect: () => void;
  selectedLabel?: string;
  unselectedLabel?: string;
  pricePrefix?: string;
  children?: React.ReactNode;
  className?: string;
}

export function ProductCard({
  item,
  isSelected,
  isFocused = false,
  currency,
  onSelect,
  selectedLabel,
  unselectedLabel,
  pricePrefix = "",
  children,
  className = "",
}: ProductCardProps) {
  const defaultSelectedLabel = `Selected on Desk`;
  const defaultUnselectedLabel = `Select ${item.name.split(" ")[0]}`;

  return (
    <Card
      id={`product-card-${item.id}`}
      onClick={onSelect}
      className={`border transition-all duration-300 cursor-pointer overflow-hidden ${
        isFocused
          ? "bg-neutral-950/90 border-emerald-400 ring-2 ring-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.35)] scale-[1.01]"
          : isSelected
          ? "bg-neutral-950/80 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40"
          : "bg-neutral-950/40 border-white/10 hover:border-white/20 hover:bg-neutral-950/60"
      } ${className}`}
    >
      <CardHeader className="p-3.5 pb-2 space-y-1.5">
        <div className="flex-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {item.brand && (
                <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-semibold">
                  {item.brand}
                </span>
              )}
              {item.tag && (
                <Badge
                  variant="secondary"
                  className="text-[10px] px-1.5 py-0 h-4 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                >
                  {item.tag}
                </Badge>
              )}
              {isFocused && (
                <Badge className="text-[9px] px-1.5 py-0 h-4 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                  Active in 3D
                </Badge>
              )}
              {item.popular && item.tag !== "Most Popular" && (
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-[9px] hover:bg-emerald-500/30">
                  Most Popular
                </Badge>
              )}
            </div>
            <CardTitle className="text-sm font-semibold text-white mt-1">
              {item.name}
            </CardTitle>
          </div>

          <div className="text-right shrink-0">
            <div className="text-sm font-bold text-white font-mono">
              {pricePrefix}
              {formatPrice(item.weeklyPriceUSD, item.weeklyPriceIDR, currency)}
              <span className="text-[10px] text-neutral-400 font-normal">/wk</span>
            </div>
          </div>
        </div>

        <CardDescription className="text-xs text-neutral-400 mt-1 line-clamp-2">
          {item.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-3.5 pt-1 space-y-3">
        {/* Specs Tags */}
        {item.specs && item.specs.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.specs.map((spec, i) => (
              <span
                key={i}
                className="text-[10px] bg-neutral-900 text-neutral-300 px-2 py-0.5 rounded-md border border-white/5"
              >
                {spec}
              </span>
            ))}
          </div>
        )}

        {/* Custom content slot (e.g. FinishPicker, Power toggle, etc.) */}
        {children}

        {/* Action Button */}
        <Button
          size="sm"
          variant={isSelected ? "default" : "outline"}
          onClick={onSelect}
          className={`w-full text-xs h-9 transition-all ${
            isSelected
              ? "bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold"
              : "border-white/10 hover:border-emerald-500/40 text-neutral-300 hover:text-white"
          }`}
        >
          {isSelected ? (
            <span className="flex-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-neutral-950 stroke-[3]" />
              <span>{selectedLabel || defaultSelectedLabel}</span>
            </span>
          ) : (
            <span className="flex-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-neutral-400" />
              <span>{unselectedLabel || defaultUnselectedLabel}</span>
            </span>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
