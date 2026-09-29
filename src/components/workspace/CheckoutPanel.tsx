"use client";

import { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import confetti from "canvas-confetti";
import { WorkspaceConfig, Currency } from "@/types/workspace";
import { PRODUCTS, BALI_DELIVERY_AREAS } from "@/data/products";
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

interface CheckoutPanelProps {
  config: WorkspaceConfig;
  currency: Currency;
  onCancel: () => void;
}

function generateBookingRef(): string {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return String(1000 + (array[0] % 9000));
  }
  return String(Date.now()).slice(-4);
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

  const selectedDesk = PRODUCTS.find((p) => p.id === config.deskId);
  const selectedChair = PRODUCTS.find((p) => p.id === config.chairId);
  const selectedMonitor = PRODUCTS.find((p) => p.id === config.monitorId);
  const selectedPeripherals = PRODUCTS.find((p) => p.id === config.peripheralsId);
  const selectedLighting = PRODUCTS.find((p) => p.id === config.lightingId);
  const selectedPlant = config.plantId ? PRODUCTS.find((p) => p.id === config.plantId) : null;
  const selectedCoffee = config.coffeeId ? PRODUCTS.find((p) => p.id === config.coffeeId) : null;
  const selectedOutdoor = config.outdoorId ? PRODUCTS.find((p) => p.id === config.outdoorId) : null;
  const selectedRelax = config.relaxId ? PRODUCTS.find((p) => p.id === config.relaxId) : null;
  const selectedLaptopStand = config.laptopStand ? PRODUCTS.find((p) => p.id === "lifestyle-laptop-stand") : null;

  const allSelectedItems = [
    selectedDesk, selectedChair, selectedMonitor, selectedPeripherals,
    selectedLighting, selectedPlant, selectedCoffee, selectedOutdoor,
    selectedRelax, selectedLaptopStand,
  ].filter(Boolean);

  const baseWeeklyUSD = allSelectedItems.reduce((acc, curr) => acc + (curr?.weeklyPriceUSD || 0), 0);
  const baseWeeklyIDR = allSelectedItems.reduce((acc, curr) => acc + (curr?.weeklyPriceIDR || 0), 0);

  let discountRate = 0;
  let discountBadge = "Standard Weekly";
  if (durationWeeks >= 12) { discountRate = 0.30; discountBadge = "30% Resident Discount"; }
  else if (durationWeeks >= 8) { discountRate = 0.20; discountBadge = "20% Nomad Discount"; }
  else if (durationWeeks >= 4) { discountRate = 0.10; discountBadge = "10% Monthly Discount"; }

  const deliveryArea = BALI_DELIVERY_AREAS.find((a) => a.id === selectedAreaId) || BALI_DELIVERY_AREAS[0];
  const deliveryFeeUSD = deliveryArea.feeUSD;
  const deliveryFeeIDR = deliveryFeeUSD * 16000;

  const subtotalUSD = baseWeeklyUSD * durationWeeks;
  const discountAmountUSD = Math.round(subtotalUSD * discountRate);
  const totalUSD = subtotalUSD - discountAmountUSD + deliveryFeeUSD;
  const subtotalIDR = baseWeeklyIDR * durationWeeks;
  const discountAmountIDR = Math.round(subtotalIDR * discountRate);
  const totalIDR = subtotalIDR - discountAmountIDR + deliveryFeeIDR;

  const fmt = (usd: number, idr: number) =>
    currency === "IDR" ? `Rp ${idr.toLocaleString()}` : `$${usd}`;

  const onValidSubmit = (data: CheckoutFormData) => {
    sound.playFanfare();
    setBookingRef(generateBookingRef());
    setSubmittedData(data);
    setOrderConfirmed(true);
    confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 }, colors: ["#10b981", "#3b82f6", "#f59e0b", "#ec4899"] });
  };

  const handleCopySummary = () => {
    sound.playClick();
    const text = `🌴 My Monis Bali Workspace Setup:
- Customer: ${submittedData?.fullName || "Bali Nomad"}
- Desk: ${selectedDesk?.name} (${config.deskFinish})
- Chair: ${selectedChair?.name} (${config.chairColor})
- Monitor: ${selectedMonitor?.name}
- Rental: ${durationWeeks} weeks in ${deliveryArea.name}
- Total: ${fmt(totalUSD, totalIDR)} (${discountBadge})
Designed on monis.rent`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="w-full h-full flex flex-col bg-neutral-900/70 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      {/* Panel Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-neutral-950/60 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 flex items-center justify-center">
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
              onClick={onCancel}
              className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
        {orderConfirmed ? (
          /* ── Confirmed State ── */
          <div className="p-4 space-y-4">
            <div className="flex flex-col items-center text-center py-2 space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <p className="text-base font-bold text-white">Booking #MN-BALI-{bookingRef}</p>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {submittedData?.fullName ? `Hi ${submittedData.fullName}! ` : ""}
                  Reserved for <span className="text-emerald-400 font-bold">{durationWeeks} weeks</span> in {deliveryArea.name}.
                </p>
              </div>
            </div>

            <div className="bg-neutral-900/80 rounded-2xl p-3.5 border border-white/10 space-y-2.5">
              <p className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" /> Next Steps
              </p>
              {[
                `Our team will WhatsApp ${submittedData?.whatsapp || "you"} within 15 minutes.`,
                `Equipment delivery & white-glove setup: ${deliveryArea.estimatedDelivery}.`,
                "Pay on arrival — Cash, Wise, or Card. No deposit needed.",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                  <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center text-[9px] text-white shrink-0 mt-0.5">{i + 1}</div>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <Button
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs h-10 gap-2 shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all"
              onClick={() => {
                sound.playClick();
                const msg = `🌴 Halo Monis Bali! Booking #MN-BALI-${bookingRef}:\n• ${submittedData?.fullName} · ${submittedData?.whatsapp}\n• Villa: ${submittedData?.villaAddress} (${deliveryArea.name})\n• ${durationWeeks} weeks · ${fmt(totalUSD, totalIDR)} (${discountBadge})\n• Items: ${allSelectedItems.map((i) => i?.name).filter(Boolean).join(", ")}\nPlease confirm delivery: ${deliveryArea.estimatedDelivery}!`;
                window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`, "_blank");
              }}
            >
              <MessageCircle className="w-4 h-4 fill-white" /> Open WhatsApp to Confirm Delivery
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-white/15 text-white hover:bg-neutral-800 text-xs h-9 gap-1.5"
                onClick={handleCopySummary}
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                {isCopied ? "Copied!" : "Copy Summary"}
              </Button>
              <Button
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs h-9"
                onClick={() => { onCancel(); setOrderConfirmed(false); reset(); }}
              >
                Back to Designer
              </Button>
            </div>
          </div>
        ) : (
          /* ── Checkout Form ── */
          <form onSubmit={handleSubmit(onValidSubmit)} className="p-4 space-y-5">

            {/* Items Summary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
                  Your Setup ({allSelectedItems.length} items)
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">{fmt(baseWeeklyUSD, baseWeeklyIDR)}/wk</span>
              </div>
              <div className="space-y-1">
                {allSelectedItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-xl bg-neutral-950/60 border border-white/5 text-xs"
                  >
                    <div className="truncate mr-2">
                      <span className="text-white font-medium">{item?.name}</span>
                      <span className="text-neutral-500 ml-1.5 text-[10px]">{item?.brand}</span>
                    </div>
                    <span className="text-neutral-400 font-mono shrink-0">
                      {fmt(item?.weeklyPriceUSD || 0, item?.weeklyPriceIDR || 0)}
                      <span className="text-[9px] text-neutral-600">/wk</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Duration Slider */}
            <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-white/10 space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-xs font-semibold text-white">
                  Duration:{" "}
                  <span className="text-emerald-400 font-bold font-mono">{durationWeeks} {durationWeeks === 1 ? "wk" : "wks"}</span>
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
                    min={1} max={24} step={1}
                    onValueChange={(val) => {
                      sound.playClick();
                      field.onChange(Array.isArray(val) ? val[0] : val);
                    }}
                    className="py-1"
                  />
                )}
              />
              <div className="flex justify-between text-[9px] text-neutral-500 font-mono">
                <span>1 wk</span><span>4 wks −10%</span><span>8 wks −20%</span><span>12+ wks −30%</span>
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
                        <SelectTrigger className="bg-neutral-950 border-white/15 text-xs text-white h-9 font-sans w-full">
                          <SelectValue placeholder="Area" />
                        </SelectTrigger>
                        <SelectContent
                          align="start"
                          side="bottom"
                          sideOffset={6}
                          className="bg-neutral-950/95 backdrop-blur-xl border border-white/15 text-white min-w-[320px] max-w-[380px] p-1.5 font-sans shadow-2xl rounded-2xl"
                        >
                          {BALI_DELIVERY_AREAS.map((a) => (
                            <SelectItem key={a.id} value={a.id} className="text-xs py-2 px-2.5 rounded-xl cursor-pointer">
                              <div className="flex items-center justify-between w-full gap-3">
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
                  <Label className="text-[11px] text-neutral-300">Full Name *</Label>
                  <Input
                    {...register("fullName")}
                    placeholder="Alex Rivera"
                    className={`bg-neutral-950 text-xs text-white h-9 ${errors.fullName ? "border-rose-500" : "border-white/15"}`}
                  />
                  {errors.fullName && (
                    <p className="text-[10px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label className="text-[11px] text-neutral-300">WhatsApp *</Label>
                  <Input
                    {...register("whatsapp")}
                    placeholder="+62 812 ..."
                    className={`bg-neutral-950 text-xs text-white h-9 ${errors.whatsapp ? "border-rose-500" : "border-white/15"}`}
                  />
                  {errors.whatsapp && (
                    <p className="text-[10px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.whatsapp.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Villa Address */}
              <div className="space-y-1">
                <Label className="text-[11px] text-neutral-300">Villa / Hotel Address *</Label>
                <Textarea
                  {...register("villaAddress")}
                  placeholder="Villa Luna Canggu, Jl. Pantai Batu Bolong No. 12, Room 3"
                  className={`bg-neutral-950 text-xs text-white h-16 resize-none ${errors.villaAddress ? "border-rose-500" : "border-white/15"}`}
                />
                {errors.villaAddress && (
                  <p className="text-[10px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.villaAddress.message}
                  </p>
                )}
              </div>
            </div>

            {/* Inclusions strip */}
            <div className="px-3 py-2 bg-emerald-950/20 border border-emerald-500/20 rounded-xl flex items-center justify-between text-xs text-emerald-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>White-glove setup · Surge protectors included</span>
              </div>
              <span className="font-bold font-mono shrink-0">FREE</span>
            </div>

            {/* Pricing breakdown */}
            <div className="border-t border-white/10 pt-3 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal ({durationWeeks} wks):</span>
                <span>{fmt(subtotalUSD, subtotalIDR)}</span>
              </div>
              {discountRate > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount ({discountBadge}):</span>
                  <span>−{fmt(discountAmountUSD, discountAmountIDR)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>Delivery & Assembly:</span>
                <span>{deliveryFeeUSD === 0 ? "FREE" : fmt(deliveryFeeUSD, deliveryFeeIDR)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-white/10 text-white">
                <span className="text-sm font-sans font-bold">Total Due:</span>
                <div className="text-right">
                  <div className="text-lg font-bold text-emerald-400">{fmt(totalUSD, totalIDR)}</div>
                  <div className="text-[9px] text-neutral-500 font-normal">
                    ≈ {fmt(Math.round(totalUSD / durationWeeks), Math.round(totalIDR / durationWeeks))}/week
                  </div>
                </div>
              </div>
            </div>

            {/* Submit row */}
            <div className="flex items-center gap-2 pt-1 pb-2">
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
                className="text-xs text-neutral-400 hover:text-white h-10 px-3 gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs h-10 gap-2 shadow-lg hover:shadow-emerald-500/25 transition-all cursor-pointer"
              >
                <span>Confirm & Rent Setup</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
