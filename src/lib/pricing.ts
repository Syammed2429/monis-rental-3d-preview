import { WorkspaceConfig, Currency, ProductItem } from "@/types/workspace";
import { PRODUCTS } from "@/data/products";

/**
 * Format rental pricing based on active currency (USD / IDR)
 */
export function formatPrice(usd: number, idr: number, currency: Currency): string {
  if (currency === "IDR") {
    return `Rp ${(idr / 1000).toLocaleString()}k`;
  }
  return `$${usd}`;
}

/**
 * Calculate progressive digital nomad discounts based on rental duration
 */
export function calculateDurationDiscount(durationWeeks: number): {
  discountRate: number;
  discountBadge: string;
} {
  if (durationWeeks >= 12) {
    return { discountRate: 0.30, discountBadge: "30% Resident Discount" };
  }
  if (durationWeeks >= 8) {
    return { discountRate: 0.20, discountBadge: "20% Nomad Discount" };
  }
  if (durationWeeks >= 4) {
    return { discountRate: 0.10, discountBadge: "10% Monthly Discount" };
  }
  return { discountRate: 0, discountBadge: "Standard Weekly" };
}

/**
 * Resolve all selected hardware items from the workspace configuration
 */
export function getSelectedProducts(config: WorkspaceConfig): ProductItem[] {
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

  return [
    selectedDesk,
    selectedChair,
    selectedMonitor,
    selectedPeripherals,
    selectedLighting,
    selectedPlant,
    selectedCoffee,
    selectedOutdoor,
    selectedRelax,
    selectedLaptopStand,
  ].filter((item): item is ProductItem => Boolean(item));
}

/**
 * Calculate financial totals (weekly base, discounts, deposit, and total for duration)
 */
export function calculateWorkspaceTotals(config: WorkspaceConfig, durationWeeks: number) {
  const items = getSelectedProducts(config);
  const baseWeeklyUSD = items.reduce((acc, curr) => acc + curr.weeklyPriceUSD, 0);
  const baseWeeklyIDR = items.reduce((acc, curr) => acc + curr.weeklyPriceIDR, 0);

  const { discountRate, discountBadge } = calculateDurationDiscount(durationWeeks);

  const discountedWeeklyUSD = Math.round(baseWeeklyUSD * (1 - discountRate));
  const discountedWeeklyIDR = Math.round(baseWeeklyIDR * (1 - discountRate));

  const totalRentalUSD = discountedWeeklyUSD * durationWeeks;
  const totalRentalIDR = discountedWeeklyIDR * durationWeeks;

  // 1-week refundable security deposit
  const totalDepositUSD = baseWeeklyUSD;
  const totalDepositIDR = baseWeeklyIDR;

  const grandTotalUSD = totalRentalUSD + totalDepositUSD;
  const grandTotalIDR = totalRentalIDR + totalDepositIDR;

  return {
    items,
    itemCount: items.length,
    baseWeeklyUSD,
    baseWeeklyIDR,
    discountRate,
    discountBadge,
    discountedWeeklyUSD,
    discountedWeeklyIDR,
    totalRentalUSD,
    totalRentalIDR,
    totalDepositUSD,
    totalDepositIDR,
    grandTotalUSD,
    grandTotalIDR,
  };
}

/**
 * Generate a random 4-digit booking reference string
 */
export function generateBookingRef(): string {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return String(1000 + (array[0] % 9000));
  }
  return String(Date.now()).slice(-4);
}

/**
 * Generate direct WhatsApp order confirmation URL
 */
export function generateWhatsAppOrderUrl(params: {
  bookingRef: string;
  fullName: string;
  areaName: string;
  durationWeeks: number;
  totalUSD: number;
  totalIDR: number;
  items: ProductItem[];
}): string {
  const itemListText = params.items.map((it) => `• ${it.name}`).join("\n");
  const text = encodeURIComponent(
    `🌴 *New Monis.rent Booking #${params.bookingRef}*\n\n` +
    `👤 *Name:* ${params.fullName}\n` +
    `📍 *Area:* ${params.areaName}\n` +
    `⏱ *Duration:* ${params.durationWeeks} weeks\n` +
    `💰 *Total:* $${params.totalUSD} (Rp ${(params.totalIDR / 1000).toLocaleString()}k)\n\n` +
    `📦 *Equipment:*\n${itemListText}\n\n` +
    `Hi Monis Team! I just customized my Bali workspace online and would like to confirm villa delivery.`
  );
  return `https://wa.me/6281234567890?text=${text}`;
}
