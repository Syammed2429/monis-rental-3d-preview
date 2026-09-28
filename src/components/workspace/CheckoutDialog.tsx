"use client";

import React, { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import confetti from "canvas-confetti";
import { WorkspaceConfig, Currency } from "@/types/workspace";
import { PRODUCTS, BALI_DELIVERY_AREAS } from "@/data/products";
import { checkoutFormSchema, CheckoutFormData } from "@/lib/validations/checkout";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Truck,
  ArrowRight,
  Share2,
  Check,
  ShoppingBag,
  AlertCircle,
} from "lucide-react";
import { sound } from "@/lib/audio";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: WorkspaceConfig;
  currency: Currency;
}

function generateBookingRef(): string {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return String(1000 + (array[0] % 9000));
  }
  return String(Date.now()).slice(-4);
}

export function CheckoutDialog({
  open,
  onOpenChange,
  config,
  currency,
}: CheckoutDialogProps) {
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>("7842");
  const [submittedData, setSubmittedData] = useState<CheckoutFormData | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Setup react-hook-form with Zod validation schema
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      whatsapp: "",
      areaId: "canggu",
      durationWeeks: 4,
      villaAddress: "",
      specialRequests: "",
    },
    mode: "onTouched",
  });

  // Watch fields reactively with useWatch (React Compiler fully compatible)
  const durationWeeks = useWatch({ control, name: "durationWeeks" }) ?? 4;
  const selectedAreaId = useWatch({ control, name: "areaId" }) ?? "canggu";

  // Selected products lookup
  const selectedDesk = PRODUCTS.find((p) => p.id === config.deskId);
  const selectedChair = PRODUCTS.find((p) => p.id === config.chairId);
  const selectedMonitor = PRODUCTS.find((p) => p.id === config.monitorId);
  const selectedPeripherals = PRODUCTS.find((p) => p.id === config.peripheralsId);
  const selectedLighting = PRODUCTS.find((p) => p.id === config.lightingId);
  const selectedPlant = config.plantId ? PRODUCTS.find((p) => p.id === config.plantId) : null;
  const selectedCoffee = config.coffeeId ? PRODUCTS.find((p) => p.id === config.coffeeId) : null;
  const selectedAudio = config.audioId ? PRODUCTS.find((p) => p.id === config.audioId) : null;
  const selectedLaptopStand = config.laptopStand ? PRODUCTS.find((p) => p.id === "extra-laptop-stand") : null;
  const selectedAirPurifier = config.airPurifier ? PRODUCTS.find((p) => p.id === "extra-air-purifier") : null;

  const allSelectedItems = [
    selectedDesk,
    selectedChair,
    selectedMonitor,
    selectedPeripherals,
    selectedLighting,
    selectedPlant,
    selectedCoffee,
    selectedAudio,
    selectedLaptopStand,
    selectedAirPurifier,
  ].filter(Boolean);

  // Calculate pricing
  const baseWeeklyUSD = allSelectedItems.reduce((acc, curr) => acc + (curr?.weeklyPriceUSD || 0), 0);
  const baseWeeklyIDR = allSelectedItems.reduce((acc, curr) => acc + (curr?.weeklyPriceIDR || 0), 0);

  // Progressive nomad discounts
  let discountRate = 0;
  let discountBadge = "Standard Weekly";
  if (durationWeeks >= 12) {
    discountRate = 0.30;
    discountBadge = "30% Resident Discount";
  } else if (durationWeeks >= 8) {
    discountRate = 0.20;
    discountBadge = "20% Nomad Discount";
  } else if (durationWeeks >= 4) {
    discountRate = 0.10;
    discountBadge = "10% Monthly Discount";
  }

  const deliveryArea = BALI_DELIVERY_AREAS.find((a) => a.id === selectedAreaId) || BALI_DELIVERY_AREAS[0];
  const deliveryFeeUSD = deliveryArea.feeUSD;
  const deliveryFeeIDR = deliveryFeeUSD * 16000;

  const subtotalUSD = baseWeeklyUSD * durationWeeks;
  const discountAmountUSD = Math.round(subtotalUSD * discountRate);
  const totalUSD = subtotalUSD - discountAmountUSD + deliveryFeeUSD;

  const subtotalIDR = baseWeeklyIDR * durationWeeks;
  const discountAmountIDR = Math.round(subtotalIDR * discountRate);
  const totalIDR = subtotalIDR - discountAmountIDR + deliveryFeeIDR;

  const formatMoney = (usd: number, idr: number) => {
    if (currency === "IDR") {
      return `Rp ${(idr).toLocaleString()}`;
    }
    return `$${usd}`;
  };

  const onValidSubmit = (data: CheckoutFormData) => {
    sound.playFanfare();
    const refCode = generateBookingRef();
    setBookingRef(refCode);
    setSubmittedData(data);
    setOrderConfirmed(true);

    // Confetti celebration
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#10b981", "#3b82f6", "#f59e0b", "#ec4899"],
    });
  };

  const handleCopySummary = () => {
    sound.playClick();
    const summaryText = `🌴 My Monis Bali Workspace Setup:
- Customer: ${submittedData?.fullName || "Bali Nomad"}
- Desk: ${selectedDesk?.name} (${config.deskFinish})
- Chair: ${selectedChair?.name} (${config.chairColor})
- Monitor: ${selectedMonitor?.name}
- Keyboard/Mouse: ${selectedPeripherals?.name}
- Rental Duration: ${durationWeeks} weeks
- Location: ${deliveryArea.name}
Total: ${formatMoney(totalUSD, totalIDR)} (${discountBadge})
Designed on monis.rent visual configurator`;

    navigator.clipboard.writeText(summaryText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-neutral-950 border border-white/15 text-white max-h-[90vh] overflow-y-auto p-0 rounded-3xl shadow-2xl">
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-white/10 bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-white">
                  {orderConfirmed ? "Setup Reserved Successfully! 🌴" : "Review & Rent Your Setup"}
                </DialogTitle>
                <DialogDescription className="text-xs text-neutral-400">
                  {orderConfirmed
                    ? "Our Canggu operations crew is assembling your equipment."
                    : "Zero deposit • Delivered & assembled at your Bali villa • Stress-free return"}
                </DialogDescription>
              </div>
            </div>

            <Badge
              variant="secondary"
              className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-2.5 py-0.5"
            >
              Bali Fast Dispatch
            </Badge>
          </div>
        </div>

        {/* Confirmed Order State */}
        {orderConfirmed ? (
          <div className="p-6 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">
                Booking Reference: #MN-BALI-{bookingRef}
              </h3>
              <p className="text-sm text-neutral-300">
                Thank you{submittedData?.fullName ? `, ${submittedData.fullName}` : ""}! We have reserved your setup for{" "}
                <span className="text-emerald-400 font-bold">{durationWeeks} weeks</span> in{" "}
                <span className="text-white font-medium">{deliveryArea.name}</span>.
              </p>
            </div>

            {/* Delivery Timeline Card */}
            <div className="bg-neutral-900/80 rounded-2xl p-4 border border-white/10 text-left space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <Truck className="w-4 h-4" /> Next Steps & Delivery Timeline
              </div>
              <div className="text-xs text-neutral-300 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center text-[10px] text-white shrink-0 mt-0.5">
                    1
                  </div>
                  <span>
                    Our Bali logistics team will WhatsApp you at{" "}
                    <strong className="text-white">{submittedData?.whatsapp || "your phone"}</strong> in the next 15 minutes to confirm villa location.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center text-[10px] text-white shrink-0 mt-0.5">
                    2
                  </div>
                  <span>
                    Equipment delivery & white-glove setup: <strong className="text-emerald-400">{deliveryArea.estimatedDelivery}</strong>.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center text-[10px] text-white shrink-0 mt-0.5">
                    3
                  </div>
                  <span>Pay upon arrival at your villa (Cash IDR, Wise, Card, or Transfer). No upfront deposit.</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="outline"
                onClick={handleCopySummary}
                className="flex-1 border-white/15 text-white hover:bg-neutral-800 text-xs h-10 gap-2"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                {isCopied ? "Summary Copied!" : "Copy Setup Summary"}
              </Button>

              <Button
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs h-10"
                onClick={() => {
                  onOpenChange(false);
                  setOrderConfirmed(false);
                  reset();
                }}
              >
                Done / Back to Designer
              </Button>
            </div>
          </div>
        ) : (
          /* Normal Checkout View with React Hook Form + Zod */
          <form onSubmit={handleSubmit(onValidSubmit)} className="p-6 space-y-6">
            {/* 1. Itemized Setup Summary */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Configured Hardware ({allSelectedItems.length} items)
                </span>
                <span className="text-xs text-emerald-400 font-mono">
                  {formatMoney(baseWeeklyUSD, baseWeeklyIDR)}/wk base
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {allSelectedItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-neutral-900/60 border border-white/5 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium text-white truncate max-w-[190px]">
                        {item?.name}
                      </div>
                      <div className="text-[10px] text-neutral-400 font-mono">
                        {item?.brand}
                      </div>
                    </div>
                    <div className="font-mono text-neutral-300 shrink-0">
                      {formatMoney(item?.weeklyPriceUSD || 0, item?.weeklyPriceIDR || 0)}
                      <span className="text-[9px] text-neutral-500">/wk</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Rental Duration Slider (Controlled via react-hook-form Controller) */}
            <div className="p-4 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <Label className="text-xs font-semibold text-white">
                    Rental Duration:{" "}
                    <span className="text-emerald-400 font-bold font-mono text-sm">
                      {durationWeeks} {durationWeeks === 1 ? "Week" : "Weeks"}
                    </span>
                    <span className="text-neutral-400 text-[11px] ml-2 font-normal">
                      (~{Math.round(durationWeeks / 4.33 * 10) / 10} mo)
                    </span>
                  </Label>
                </div>
                <Badge
                  variant="outline"
                  className="bg-emerald-500/10 text-emerald-300 border-emerald-500/30 text-[10px] font-mono"
                >
                  {discountBadge}
                </Badge>
              </div>

              <Controller
                name="durationWeeks"
                control={control}
                render={({ field }) => (
                  <Slider
                    value={[field.value]}
                    min={1}
                    max={24}
                    step={1}
                    onValueChange={(val) => {
                      sound.playClick();
                      const nextVal = Array.isArray(val) ? val[0] : (typeof val === "number" ? val : 4);
                      field.onChange(nextVal);
                    }}
                    className="py-2"
                  />
                )}
              />

              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>1 wk</span>
                <span>4 wks (-10%)</span>
                <span>8 wks (-20%)</span>
                <span>12+ wks (-30%)</span>
                <span>24 wks</span>
              </div>
            </div>

            {/* 3. Bali Delivery Details with Zod validations */}
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Nomad Delivery Details (Bali)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Delivery Zone Selector */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-neutral-300">Delivery Zone</Label>
                  <Controller
                    name="areaId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={(val) => {
                          if (val) field.onChange(val);
                        }}
                      >
                        <SelectTrigger className="bg-neutral-900 border-white/15 text-xs text-white">
                          <SelectValue placeholder="Select Bali Area" />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-950 border-neutral-800 text-white">
                          {BALI_DELIVERY_AREAS.map((area) => (
                            <SelectItem key={area.id} value={area.id} className="text-xs">
                              {area.name} {area.feeUSD === 0 ? "(Free Delivery)" : `(+$${area.feeUSD})`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.areaId && (
                    <p className="text-[10px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.areaId.message}
                    </p>
                  )}
                </div>

                {/* Estimated Delivery Slot */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-neutral-300">Estimated Arrival</Label>
                  <div className="h-9 px-3 rounded-md bg-neutral-900 border border-white/10 flex items-center text-xs text-emerald-400 font-mono">
                    <Calendar className="w-3.5 h-3.5 mr-2 shrink-0" />
                    <span>{deliveryArea.estimatedDelivery}</span>
                  </div>
                </div>

                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-neutral-300">Your Full Name *</Label>
                  <Input
                    {...register("fullName")}
                    placeholder="e.g. Alex Rivera"
                    className={`bg-neutral-900 text-xs text-white ${
                      errors.fullName ? "border-rose-500 focus-visible:ring-rose-500" : "border-white/15"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[10px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* WhatsApp / Telegram Number */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-neutral-300">WhatsApp Number *</Label>
                  <Input
                    {...register("whatsapp")}
                    placeholder="e.g. +62 812 3456 7890"
                    className={`bg-neutral-900 text-xs text-white ${
                      errors.whatsapp ? "border-rose-500 focus-visible:ring-rose-500" : "border-white/15"
                    }`}
                  />
                  {errors.whatsapp && (
                    <p className="text-[10px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.whatsapp.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Villa / Hotel Address */}
              <div className="space-y-1.5">
                <Label className="text-xs text-neutral-300">
                  Villa / Resort Name & Room Number *
                </Label>
                <Textarea
                  {...register("villaAddress")}
                  placeholder="e.g. Villa Luna Canggu, Jl. Pantai Batu Bolong Gang Nyepi No. 12, Room 3"
                  className={`bg-neutral-900 text-xs text-white h-18 resize-none ${
                    errors.villaAddress ? "border-rose-500 focus-visible:ring-rose-500" : "border-white/15"
                  }`}
                />
                {errors.villaAddress && (
                  <p className="text-[10px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.villaAddress.message}
                  </p>
                )}
              </div>
            </div>

            {/* 4. White-Glove Inclusions */}
            <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl flex items-center justify-between text-xs text-emerald-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Included: Free ergonomic white-glove assembly + Bali surge protectors</span>
              </div>
              <span className="font-bold font-mono">FREE</span>
            </div>

            {/* 5. Pricing Receipt Breakdown */}
            <div className="pt-3 border-t border-white/10 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-neutral-400">
                <span>Equipment Subtotal ({durationWeeks} weeks):</span>
                <span>{formatMoney(subtotalUSD, subtotalIDR)}</span>
              </div>

              {discountRate > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Nomad Duration Discount ({discountBadge}):</span>
                  <span>-{formatMoney(discountAmountUSD, discountAmountIDR)}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-400">
                <span>Bali Villa Delivery & Assembly:</span>
                <span>{deliveryFeeUSD === 0 ? "FREE" : formatMoney(deliveryFeeUSD, deliveryFeeIDR)}</span>
              </div>

              <div className="pt-2 border-t border-white/10 flex justify-between items-baseline text-white">
                <span className="text-sm font-sans font-bold">Total Rental Due:</span>
                <div className="text-right">
                  <div className="text-xl font-bold text-emerald-400 font-mono">
                    {formatMoney(totalUSD, totalIDR)}
                  </div>
                  <div className="text-[10px] text-neutral-400 font-normal">
                    Equivalent to {formatMoney(Math.round(totalUSD / durationWeeks), Math.round(totalIDR / durationWeeks))}/week
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="text-xs text-neutral-400 hover:text-white"
              >
                Back to Customizing
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs h-10 px-6 gap-2 shadow-lg hover:shadow-emerald-500/25 transition-all cursor-pointer"
              >
                <span>Confirm & Rent Setup</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
