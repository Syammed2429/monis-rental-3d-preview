"use client";

import React from "react";
import { Check, Plus } from "lucide-react";
import { Currency, ProductItem } from "@/types/workspace";
import { formatPrice } from "@/lib/pricing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
      className={`cursor-pointer overflow-hidden border transition-all duration-300 ${
        isFocused
          ? "scale-[1.01] border-emerald-400 bg-neutral-950/90 shadow-[0_0_25px_rgba(16,185,129,0.35)] ring-2 ring-emerald-400"
          : isSelected
            ? "border-emerald-500/80 bg-neutral-950/80 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40"
            : "border-white/10 bg-neutral-950/40 hover:border-white/20 hover:bg-neutral-950/60"
      } ${className}`}
    >
      <CardHeader className="space-y-1.5 p-3.5 pb-2">
        <div className="flex-between gap-2">
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              {item.brand && (
                <span className="font-mono text-[10px] font-semibold tracking-wider text-emerald-400 uppercase">
                  {item.brand}
                </span>
              )}
              {item.tag && (
                <Badge
                  variant="secondary"
                  className="h-4 border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0 text-[10px] text-emerald-300"
                >
                  {item.tag}
                </Badge>
              )}
              {isFocused && (
                <Badge className="h-4 animate-pulse border border-emerald-500/40 bg-emerald-500/20 px-1.5 py-0 text-[9px] text-emerald-300">
                  Active in 3D
                </Badge>
              )}
              {item.popular && item.tag !== "Most Popular" && (
                <Badge className="border-emerald-500/40 bg-emerald-500/20 text-[9px] text-emerald-300 hover:bg-emerald-500/30">
                  Most Popular
                </Badge>
              )}
            </div>
            <CardTitle className="mt-1 text-sm font-semibold text-white">{item.name}</CardTitle>
          </div>

          <div className="shrink-0 text-right">
            <div className="font-mono text-sm font-bold text-white">
              {pricePrefix}
              {formatPrice(item.weeklyPriceUSD, item.weeklyPriceIDR, currency)}
              <span className="text-[10px] font-normal text-neutral-400">/wk</span>
            </div>
          </div>
        </div>

        <CardDescription className="mt-1 line-clamp-2 text-xs text-neutral-400">
          {item.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 p-3.5 pt-1">
        {/* Specs Tags */}
        {item.specs && item.specs.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.specs.map((spec, i) => (
              <span
                key={i}
                className="rounded-md border border-white/5 bg-neutral-900 px-2 py-0.5 text-[10px] text-neutral-300"
              >
                {spec}
              </span>
            ))}
          </div>
        )}

        {/* Custom content slot (e.g. FinishPicker, Power toggle, Brightness slider) */}
        {children && (
          <div
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onPointerUp={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        )}

        {/* Action Button */}
        <Button
          size="sm"
          type="button"
          variant={isSelected ? "default" : "outline"}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          aria-pressed={isSelected}
          aria-label={
            isSelected
              ? `${item.name} is currently selected on desk`
              : `Select ${item.name} for workspace`
          }
          className={`h-9 w-full text-xs transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 ${
            isSelected
              ? "bg-emerald-500 font-semibold text-neutral-950 hover:bg-emerald-400"
              : "border-white/10 text-neutral-300 hover:border-emerald-500/40 hover:text-white"
          }`}
        >
          {isSelected ? (
            <span className="flex-center gap-1.5">
              <Check className="h-3.5 w-3.5 stroke-[3] text-neutral-950" />
              <span>{selectedLabel || defaultSelectedLabel}</span>
            </span>
          ) : (
            <span className="flex-center gap-1.5">
              <Plus className="h-3.5 w-3.5 text-neutral-400" />
              <span>{unselectedLabel || defaultUnselectedLabel}</span>
            </span>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
