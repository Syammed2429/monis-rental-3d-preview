"use client";

import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import confetti from "canvas-confetti";
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  ChevronLeft,
  MessageCircle,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { Currency, WorkspaceConfig } from "@/types/workspace";
import { sound } from "@/lib/audio";
import {
  calculateWorkspaceTotals,
  formatPrice,
  generateBookingRef,
  generateWhatsAppOrderUrl,
} from "@/lib/pricing";
import { CheckoutFormData, checkoutFormSchema } from "@/lib/validations/checkout";
import { BALI_DELIVERY_AREAS } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

interface CheckoutPanelProps {
  config: WorkspaceConfig;
  currency: Currency;
  onCancel: () => void;
}

export function CheckoutPanel({ config, currency, onCancel }: CheckoutPanelProps) {
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState("7842");
  const [submittedData, setSubmittedData] = useState<CheckoutFormData | null>(null);
  const [isCopied, setIsCopied] = useState(false);

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

  const durationWeeks = useWatch({ control, name: "durationWeeks" }) ?? 4;
  const selectedAreaId = useWatch({ control, name: "areaId" }) ?? "canggu";

  // Centralized calculations
  const {
    items,
    baseWeeklyUSD,
    baseWeeklyIDR,
    discountRate,
    discountBadge,
    discountedWeeklyUSD,
    discountedWeeklyIDR,
  } = calculateWorkspaceTotals(config, durationWeeks);

  const deliveryArea =
    BALI_DELIVERY_AREAS.find((a) => a.id === selectedAreaId) || BALI_DELIVERY_AREAS[0];
  const deliveryFeeUSD = deliveryArea.feeUSD;
  const deliveryFeeIDR = deliveryFeeUSD * 16000;

  const subtotalUSD = baseWeeklyUSD * durationWeeks;
  const discountAmountUSD = Math.round(subtotalUSD * discountRate);
  const totalUSD = subtotalUSD - discountAmountUSD + deliveryFeeUSD;

  const subtotalIDR = baseWeeklyIDR * durationWeeks;
  const discountAmountIDR = Math.round(subtotalIDR * discountRate);
  const totalIDR = subtotalIDR - discountAmountIDR + deliveryFeeIDR;

  const onValidSubmit = (data: CheckoutFormData) => {
    sound.playFanfare();
    const ref = generateBookingRef();
    setBookingRef(ref);
    setSubmittedData(data);
    setOrderConfirmed(true);
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#10b981", "#3b82f6", "#f59e0b", "#ec4899"],
    });
  };

  const handleCopySummary = () => {
    sound.playClick();
    const desk = items.find((p) => p.category === "desks");
    const chair = items.find((p) => p.category === "chairs");
    const monitor = items.find((p) => p.category === "monitors");

    const text = `🌴 My Monis Bali Workspace Setup:
- Customer: ${submittedData?.fullName || "Bali Nomad"}
- Desk: ${desk?.name} (${config.deskFinish})
- Chair: ${chair?.name} (${config.chairColor})
- Monitor: ${monitor?.name || "None"}
- Rental: ${durationWeeks} weeks in ${deliveryArea.name}
- Total: ${formatPrice(totalUSD, totalIDR, currency)} (${discountBadge})
Designed on monis.rent`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const whatsappUrl = generateWhatsAppOrderUrl({
    bookingRef,
    fullName: submittedData?.fullName || "Bali Nomad",
    areaName: deliveryArea.name,
    durationWeeks,
    totalUSD,
    totalIDR,
    items,
  });

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/70 shadow-2xl backdrop-blur-xl">
      {/* Panel Header */}
      <div className="flex-between shrink-0 border-b border-white/10 bg-neutral-950/60 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex-center h-7 w-7 rounded-xl border border-emerald-500/25 bg-emerald-500/15 text-emerald-400">
            <ShoppingBag className="h-3.5 w-3.5" />
          </div>
          <div>
            <p className="text-sm leading-none font-bold text-white">
              {orderConfirmed ? "Booking Confirmed 🌴" : "Rent Your Setup"}
            </p>
            <p className="mt-0.5 text-[10px] text-neutral-400">
              {orderConfirmed
                ? `Ref #MN-BALI-${bookingRef}`
                : "Zero deposit · Next-day Bali delivery"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="hidden border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400 sm:flex">
            Fast Dispatch
          </Badge>
          {!orderConfirmed && (
            <button
              onClick={() => {
                sound.playClick();
                onCancel();
              }}
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Designer</span>
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto">
        {orderConfirmed ? (
          /* Confirmation View */
          <div className="space-y-5 p-5 text-center">
            <div className="mx-auto flex-center h-14 w-14 animate-bounce rounded-full border border-emerald-500/40 bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="h-7 w-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Setup Reserved!</h3>
              <p className="text-xs text-neutral-400">
                Next-day delivery scheduled for your Bali villa.
              </p>
            </div>

            {/* Booking Card */}
            <div className="space-y-3 rounded-2xl border border-white/10 bg-neutral-950/80 p-4 text-left font-mono text-xs">
              <div className="flex-between border-b border-white/10 pb-2">
                <span className="font-sans text-[10px] text-neutral-400 uppercase">
                  Booking Ref
                </span>
                <span className="font-bold text-emerald-400">#MN-BALI-{bookingRef}</span>
              </div>
              <div className="flex-between">
                <span className="font-sans text-[10px] text-neutral-400">Guest</span>
                <span className="max-w-40 truncate text-white">{submittedData?.fullName}</span>
              </div>
              <div className="flex-between">
                <span className="font-sans text-[10px] text-neutral-400">WhatsApp</span>
                <span className="text-white">{submittedData?.whatsapp}</span>
              </div>
              <div className="flex-between">
                <span className="font-sans text-[10px] text-neutral-400">Villa Area</span>
                <span className="text-white">{deliveryArea.name}</span>
              </div>
              <div className="flex-between">
                <span className="font-sans text-[10px] text-neutral-400">Duration</span>
                <span className="text-white">
                  {durationWeeks} wks ({discountBadge})
                </span>
              </div>
              <div className="flex-between border-t border-white/10 pt-2 font-bold">
                <span className="font-sans text-[10px] text-white">Total Rental</span>
                <span className="text-sm text-emerald-400">
                  {formatPrice(totalUSD, totalIDR, currency)}
                </span>
              </div>
            </div>

            {/* Delivery Timeline Pill */}
            <div className="space-y-2 rounded-2xl border border-white/10 bg-neutral-950/60 p-3 text-left">
              <p className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
                What happens next
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-neutral-300">
                  <div className="mt-0.5 flex-center h-4 w-4 shrink-0 rounded-full bg-emerald-500/20 font-mono text-[10px] text-emerald-400">
                    1
                  </div>
                  <span>Our dispatch team contacts you on WhatsApp within 1 hour.</span>
                </div>
                <div className="flex items-start gap-2 text-neutral-300">
                  <div className="mt-0.5 flex-center h-4 w-4 shrink-0 rounded-full bg-emerald-500/20 font-mono text-[10px] text-emerald-400">
                    2
                  </div>
                  <span>Next-day courier delivery & white-glove assembly at your villa.</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Direct Action Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-center h-10 w-full gap-2 rounded-xl bg-[#25D366] text-xs font-bold text-neutral-950 shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.02] hover:bg-[#20ba59] active:scale-[0.98]"
            >
              <MessageCircle className="h-4 w-4 fill-neutral-950" />
              <span>Confirm on WhatsApp Instantly</span>
            </a>

            {/* Secondary Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="h-9 flex-1 gap-1.5 border-white/15 text-xs hover:bg-white/5"
                onClick={handleCopySummary}
              >
                {isCopied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Share2 className="h-3.5 w-3.5" />
                )}
                {isCopied ? "Copied!" : "Copy Summary"}
              </Button>
              <Button
                className="h-9 flex-1 bg-emerald-500 text-xs font-bold text-neutral-950 hover:bg-emerald-400"
                onClick={() => {
                  onCancel();
                  setOrderConfirmed(false);
                  reset();
                }}
              >
                Back to Designer
              </Button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit(onValidSubmit)} className="space-y-5 p-4">
            {/* Items Summary */}
            <div className="space-y-2">
              <div className="flex-between">
                <span className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
                  Your Setup ({items.length} items)
                </span>
                <span className="font-mono text-[11px] text-emerald-400">
                  {formatPrice(baseWeeklyUSD, baseWeeklyIDR, currency)}/wk
                </span>
              </div>
              <div className="space-y-1">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className="flex-between gap-2 rounded-xl border border-white/5 bg-neutral-950/60 p-2 text-xs"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div className="mr-1 truncate">
                        <div className="truncate font-medium text-white">{item.name}</div>
                        <div className="font-mono text-[10px] text-neutral-500">{item.brand}</div>
                      </div>
                    </div>
                    <span className="shrink-0 text-right font-mono text-neutral-300">
                      {formatPrice(item.weeklyPriceUSD, item.weeklyPriceIDR, currency)}
                      <span className="text-[9px] text-neutral-500">/wk</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Duration Slider */}
            <div className="space-y-3 rounded-2xl border border-white/10 bg-neutral-950/60 p-3.5">
              <div className="flex-between">
                <Label className="text-xs font-semibold text-white">
                  Duration:{" "}
                  <span className="font-mono font-bold text-emerald-400">
                    {durationWeeks} {durationWeeks === 1 ? "wk" : "wks"}
                  </span>
                  <span className="ml-1.5 text-[10px] font-normal text-neutral-500">
                    (~{Math.round((durationWeeks / 4.33) * 10) / 10} mo)
                  </span>
                </Label>
                {discountRate > 0 && (
                  <Badge
                    variant="outline"
                    className="border-emerald-500/30 bg-emerald-500/10 font-mono text-[10px] text-emerald-300"
                  >
                    {discountBadge}
                  </Badge>
                )}
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
                      field.onChange(Array.isArray(val) ? val[0] : val);
                    }}
                    className="py-1"
                  />
                )}
              />
              <div className="flex justify-between font-mono text-[9px] text-neutral-500">
                <span>1 wk</span>
                <span>4 wks −10%</span>
                <span>8 wks −20%</span>
                <span>12+ wks −30%</span>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="space-y-3">
              <span className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
                Delivery Details
              </span>

              <div className="grid grid-cols-2 gap-2">
                {/* Zone */}
                <div className="space-y-1">
                  <Label className="text-[11px] text-neutral-300">Zone</Label>
                  <Controller
                    name="areaId"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={(v) => v && field.onChange(v)}>
                        <SelectTrigger className="h-9 w-full border-white/15 bg-neutral-950 px-3 font-sans text-xs text-white">
                          <SelectValue placeholder="Area">{deliveryArea.name}</SelectValue>
                        </SelectTrigger>
                        <SelectContent
                          align="start"
                          side="bottom"
                          sideOffset={6}
                          className="max-w-95 min-w-[320px] rounded-2xl border border-white/15 bg-neutral-950/95 p-1.5 font-sans text-white shadow-2xl backdrop-blur-xl"
                        >
                          {BALI_DELIVERY_AREAS.map((a) => (
                            <SelectItem
                              key={a.id}
                              value={a.id}
                              className="cursor-pointer rounded-xl px-2.5 py-2 text-xs"
                            >
                              <div className="flex-between w-full gap-3">
                                <span className="font-medium text-white">{a.name}</span>
                                <span
                                  className={`shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold ${
                                    a.feeUSD === 0
                                      ? "border border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
                                      : "border border-amber-500/30 bg-amber-500/15 text-amber-300"
                                  }`}
                                >
                                  {a.feeUSD === 0 ? "FREE" : `+$${a.feeUSD}`}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* ETA */}
                <div className="space-y-1">
                  <Label className="text-[11px] text-neutral-300">ETA</Label>
                  <div className="flex h-9 items-center gap-1.5 rounded-md border border-white/10 bg-neutral-950 px-2.5 font-mono text-[11px] text-emerald-400">
                    <Calendar className="h-3 w-3 shrink-0" />
                    <span className="truncate">{deliveryArea.estimatedDelivery}</span>
                  </div>
                </div>
              </div>

              {/* Name + WhatsApp */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="full-name" className="text-[11px] text-neutral-300">
                    Full Name *
                  </Label>
                  <Input
                    id="full-name"
                    {...register("fullName")}
                    autoComplete="name"
                    aria-invalid={errors.fullName ? "true" : "false"}
                    aria-describedby={errors.fullName ? "name-error" : undefined}
                    placeholder="Alex Rivera"
                    className={`h-9 bg-neutral-950 text-xs text-white ${
                      errors.fullName ? "border-rose-500" : "border-white/15"
                    }`}
                  />
                  {errors.fullName && (
                    <p
                      id="name-error"
                      className="flex items-center gap-1 text-[10px] text-rose-400"
                    >
                      <AlertCircle className="h-3 w-3" /> {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="whatsapp-number" className="text-[11px] text-neutral-300">
                    WhatsApp *
                  </Label>
                  <Input
                    id="whatsapp-number"
                    {...register("whatsapp")}
                    autoComplete="tel"
                    aria-invalid={errors.whatsapp ? "true" : "false"}
                    aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
                    placeholder="+62 812 ..."
                    className={`h-9 bg-neutral-950 text-xs text-white ${
                      errors.whatsapp ? "border-rose-500" : "border-white/15"
                    }`}
                  />
                  {errors.whatsapp && (
                    <p
                      id="whatsapp-error"
                      className="flex items-center gap-1 text-[10px] text-rose-400"
                    >
                      <AlertCircle className="h-3 w-3" /> {errors.whatsapp.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Villa Address */}
              <div className="space-y-1">
                <Label htmlFor="villa-address" className="text-[11px] text-neutral-300">
                  Villa / Hotel Address *
                </Label>
                <Textarea
                  id="villa-address"
                  {...register("villaAddress")}
                  autoComplete="street-address"
                  aria-invalid={errors.villaAddress ? "true" : "false"}
                  aria-describedby={errors.villaAddress ? "address-error" : undefined}
                  placeholder="Villa Luna Canggu, Jl. Pantai Batu Bolong No. 12, Room 3"
                  className={`h-16 resize-none bg-neutral-950 text-xs text-white ${
                    errors.villaAddress ? "border-rose-500" : "border-white/15"
                  }`}
                />
                {errors.villaAddress && (
                  <p
                    id="address-error"
                    className="flex items-center gap-1 text-[10px] text-rose-400"
                  >
                    <AlertCircle className="h-3 w-3" /> {errors.villaAddress.message}
                  </p>
                )}
              </div>
            </div>

            {/* Inclusions strip */}
            <div className="flex-between rounded-xl border border-emerald-500/20 bg-emerald-950/20 px-3 py-2 text-xs text-emerald-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span>White-glove setup · Surge protectors included</span>
              </div>
              <span className="shrink-0 font-mono font-bold">FREE</span>
            </div>

            {/* Pricing breakdown */}
            <div className="space-y-1.5 border-t border-white/10 pt-3 font-mono text-xs">
              <div className="flex-between text-neutral-400">
                <span>Subtotal ({durationWeeks} wks):</span>
                <span>{formatPrice(subtotalUSD, subtotalIDR, currency)}</span>
              </div>
              {discountRate > 0 && (
                <div className="flex-between text-emerald-400">
                  <span>Discount ({discountBadge}):</span>
                  <span>−{formatPrice(discountAmountUSD, discountAmountIDR, currency)}</span>
                </div>
              )}
              <div className="flex-between text-neutral-400">
                <span>Delivery & Assembly:</span>
                <span>
                  {deliveryFeeUSD === 0
                    ? "FREE"
                    : formatPrice(deliveryFeeUSD, deliveryFeeIDR, currency)}
                </span>
              </div>
              <div className="flex-between border-t border-white/10 pt-2 text-sm font-bold text-white">
                <span>
                  Total ({durationWeeks} {durationWeeks === 1 ? "week" : "weeks"}):
                </span>
                <span className="text-emerald-400">
                  {formatPrice(totalUSD, totalIDR, currency)}
                </span>
              </div>
              <div className="text-right font-sans text-[10px] text-neutral-400">
                (~{formatPrice(discountedWeeklyUSD, discountedWeeklyIDR, currency)}/week)
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-10 w-full gap-2 rounded-xl bg-emerald-500 text-xs font-bold text-neutral-950 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01] hover:bg-emerald-400 active:scale-[0.99]"
            >
              <Truck className="h-4 w-4" />
              <span>Confirm & Schedule Next-Day Delivery</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
