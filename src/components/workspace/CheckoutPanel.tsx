"use client";

import { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import confetti from "canvas-confetti";
import { WorkspaceConfig, Currency } from "@/types/workspace";
import { BALI_DELIVERY_AREAS } from "@/data/products";
import { checkoutFormSchema, CheckoutFormData } from "@/lib/validations/checkout";
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
  ChevronLeft,
  MessageCircle,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";
import { sound } from "@/lib/audio";
import {
  calculateWorkspaceTotals,
  formatPrice,
  generateBookingRef,
  generateWhatsAppOrderUrl,
} from "@/lib/pricing";

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

  const deliveryArea = BALI_DELIVERY_AREAS.find((a) => a.id === selectedAreaId) || BALI_DELIVERY_AREAS[0];
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
    <div className="w-full h-full flex flex-col bg-neutral-900/70 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      {/* Panel Header */}
      <div className="flex-between px-4 py-3 border-b border-white/10 bg-neutral-950/60 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 flex-center">
            <ShoppingBag className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none">
              {orderConfirmed ? "Booking Confirmed 🌴" : "Rent Your Setup"}
            </p>
            <p className="text-[10px] text-neutral-400 mt-0.5">
              {orderConfirmed ? `Ref #MN-BALI-${bookingRef}` : "Zero deposit · Next-day Bali delivery"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 hidden sm:flex">
            Fast Dispatch
          </Badge>
          {!orderConfirmed && (
            <button
              onClick={() => {
                sound.playClick();
                onCancel();
              }}
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Designer</span>
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto">
        {orderConfirmed ? (
          /* Confirmation View */
          <div className="p-5 space-y-5 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Setup Reserved!</h3>
              <p className="text-xs text-neutral-400">
                Next-day delivery scheduled for your Bali villa.
              </p>
            </div>

            {/* Booking Card */}
            <div className="p-4 rounded-2xl bg-neutral-950/80 border border-white/10 text-left space-y-3 font-mono text-xs">
              <div className="flex-between pb-2 border-b border-white/10">
                <span className="text-neutral-400 text-[10px] uppercase font-sans">Booking Ref</span>
                <span className="text-emerald-400 font-bold">#MN-BALI-{bookingRef}</span>
              </div>
              <div className="flex-between">
                <span className="text-neutral-400 text-[10px] font-sans">Guest</span>
                <span className="text-white truncate max-w-40">{submittedData?.fullName}</span>
              </div>
              <div className="flex-between">
                <span className="text-neutral-400 text-[10px] font-sans">WhatsApp</span>
                <span className="text-white">{submittedData?.whatsapp}</span>
              </div>
              <div className="flex-between">
                <span className="text-neutral-400 text-[10px] font-sans">Villa Area</span>
                <span className="text-white">{deliveryArea.name}</span>
              </div>
              <div className="flex-between">
                <span className="text-neutral-400 text-[10px] font-sans">Duration</span>
                <span className="text-white">{durationWeeks} wks ({discountBadge})</span>
              </div>
              <div className="flex-between pt-2 border-t border-white/10 font-bold">
                <span className="text-white text-[10px] font-sans">Total Rental</span>
                <span className="text-emerald-400 text-sm">
                  {formatPrice(totalUSD, totalIDR, currency)}
                </span>
              </div>
            </div>

            {/* Delivery Timeline Pill */}
            <div className="p-3 bg-neutral-950/60 border border-white/10 rounded-2xl space-y-2 text-left">
              <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">What happens next</p>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-neutral-300">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex-center text-[10px] shrink-0 mt-0.5 font-mono">1</div>
                  <span>Our dispatch team contacts you on WhatsApp within 1 hour.</span>
                </div>
                <div className="flex items-start gap-2 text-neutral-300">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex-center text-[10px] shrink-0 mt-0.5 font-mono">2</div>
                  <span>Next-day courier delivery & white-glove assembly at your villa.</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Direct Action Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-neutral-950 font-bold text-xs h-10 rounded-xl flex-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 fill-neutral-950" />
              <span>Confirm on WhatsApp Instantly</span>
            </a>

            {/* Secondary Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-white/15 text-xs h-9 hover:bg-white/5 gap-1.5"
                onClick={handleCopySummary}
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                {isCopied ? "Copied!" : "Copy Summary"}
              </Button>
              <Button
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs h-9"
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
          <form onSubmit={handleSubmit(onValidSubmit)} className="p-4 space-y-5">
            {/* Items Summary */}
            <div className="space-y-2">
              <div className="flex-between">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
                  Your Setup ({items.length} items)
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">
                  {formatPrice(baseWeeklyUSD, baseWeeklyIDR, currency)}/wk
                </span>
              </div>
              <div className="space-y-1">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className="flex-between p-2 rounded-xl bg-neutral-950/60 border border-white/5 text-xs gap-2"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="truncate mr-1">
                        <div className="text-white font-medium truncate">{item.name}</div>
                        <div className="text-neutral-500 text-[10px] font-mono">{item.brand}</div>
                      </div>
                    </div>
                    <span className="text-neutral-300 font-mono shrink-0 text-right">
                      {formatPrice(item.weeklyPriceUSD, item.weeklyPriceIDR, currency)}
                      <span className="text-[9px] text-neutral-500">/wk</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Duration Slider */}
            <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-white/10 space-y-3">
              <div className="flex-between">
                <Label className="text-xs font-semibold text-white">
                  Duration:{" "}
                  <span className="text-emerald-400 font-bold font-mono">
                    {durationWeeks} {durationWeeks === 1 ? "wk" : "wks"}
                  </span>
                  <span className="text-neutral-500 text-[10px] ml-1.5 font-normal">
                    (~{Math.round((durationWeeks / 4.33) * 10) / 10} mo)
                  </span>
                </Label>
                {discountRate > 0 && (
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-300 border-emerald-500/30 text-[10px] font-mono">
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
              <div className="flex justify-between text-[9px] text-neutral-500 font-mono">
                <span>1 wk</span>
                <span>4 wks −10%</span>
                <span>8 wks −20%</span>
                <span>12+ wks −30%</span>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
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
                        <SelectTrigger className="bg-neutral-950 border-white/15 text-xs text-white h-9 font-sans w-full px-3">
                          <SelectValue placeholder="Area">{deliveryArea.name}</SelectValue>
                        </SelectTrigger>
                        <SelectContent
                          align="start"
                          side="bottom"
                          sideOffset={6}
                          className="bg-neutral-950/95 backdrop-blur-xl border border-white/15 text-white min-w-[320px] max-w-95 p-1.5 font-sans shadow-2xl rounded-2xl"
                        >
                          {BALI_DELIVERY_AREAS.map((a) => (
                            <SelectItem key={a.id} value={a.id} className="text-xs py-2 px-2.5 rounded-xl cursor-pointer">
                              <div className="flex-between w-full gap-3">
                                <span className="font-medium text-white">{a.name}</span>
                                <span
                                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold shrink-0 ${
                                    a.feeUSD === 0
                                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                      : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
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
                  <div className="h-9 px-2.5 rounded-md bg-neutral-950 border border-white/10 flex items-center text-[11px] text-emerald-400 font-mono gap-1.5">
                    <Calendar className="w-3 h-3 shrink-0" />
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
                    className={`bg-neutral-950 text-xs text-white h-9 ${
                      errors.fullName ? "border-rose-500" : "border-white/15"
                    }`}
                  />
                  {errors.fullName && (
                    <p id="name-error" className="text-[10px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName.message}
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
                    className={`bg-neutral-950 text-xs text-white h-9 ${
                      errors.whatsapp ? "border-rose-500" : "border-white/15"
                    }`}
                  />
                  {errors.whatsapp && (
                    <p id="whatsapp-error" className="text-[10px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.whatsapp.message}
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
                  className={`bg-neutral-950 text-xs text-white h-16 resize-none ${
                    errors.villaAddress ? "border-rose-500" : "border-white/15"
                  }`}
                />
                {errors.villaAddress && (
                  <p id="address-error" className="text-[10px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.villaAddress.message}
                  </p>
                )}
              </div>
            </div>

            {/* Inclusions strip */}
            <div className="px-3 py-2 bg-emerald-950/20 border border-emerald-500/20 rounded-xl flex-between text-xs text-emerald-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>White-glove setup · Surge protectors included</span>
              </div>
              <span className="font-bold font-mono shrink-0">FREE</span>
            </div>

            {/* Pricing breakdown */}
            <div className="border-t border-white/10 pt-3 space-y-1.5 text-xs font-mono">
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
                  {deliveryFeeUSD === 0 ? "FREE" : formatPrice(deliveryFeeUSD, deliveryFeeIDR, currency)}
                </span>
              </div>
              <div className="flex-between text-sm font-bold text-white pt-2 border-t border-white/10">
                <span>Total ({durationWeeks} {durationWeeks === 1 ? "week" : "weeks"}):</span>
                <span className="text-emerald-400">{formatPrice(totalUSD, totalIDR, currency)}</span>
              </div>
              <div className="text-[10px] text-neutral-400 font-sans text-right">
                (~{formatPrice(discountedWeeklyUSD, discountedWeeklyIDR, currency)}/week)
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs h-10 rounded-xl shadow-lg shadow-emerald-500/20 gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <Truck className="w-4 h-4" />
              <span>Confirm & Schedule Next-Day Delivery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
