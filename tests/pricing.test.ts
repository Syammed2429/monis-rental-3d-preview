import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { WorkspaceConfig } from "@/types/workspace";
import {
  calculateDurationDiscount,
  calculateWorkspaceTotals,
  formatPrice,
  generateBookingRef,
  generateWhatsAppOrderUrl,
  getSelectedProducts,
} from "@/lib/pricing";

const baseTestConfig: WorkspaceConfig = {
  deskId: "desk-dual-motor",
  deskFinish: "natural-bamboo",
  deskHeightState: "sitting",
  deskHeightCm: 74,
  chairId: "chair-ergonomic-mesh",
  chairColor: "stealth-black",
  monitorId: "monitor-ultrawide-curved",
  monitorDisplayMode: "sunset-surf",
  peripheralsId: "peripherals-mx-combo",
  lightingId: "light-smart-lamp",
  lampPowered: true,
  laptopStand: true,
  plantId: "lifestyle-plant-monstera",
  coffeeId: "lifestyle-coffee-nespresso",
  outdoorId: "lifestyle-outdoor-surfboard",
  relaxId: "lifestyle-beanbag",
  timeOfDay: "sunset",
};

describe("Pricing and Discount Business Logic", () => {
  it("formats prices correctly for both USD and IDR currencies", () => {
    assert.equal(formatPrice(120, 1850000, "USD"), "$120");
    assert.equal(formatPrice(120, 1850000, "IDR"), "Rp 1,850k");
    assert.equal(formatPrice(50, 750000, "IDR"), "Rp 750k");
  });

  it("calculates progressive duration discounts according to business rules", () => {
    // 1-3 weeks: 0%
    assert.deepEqual(calculateDurationDiscount(1), {
      discountRate: 0,
      discountBadge: "Standard Weekly",
    });
    assert.deepEqual(calculateDurationDiscount(3), {
      discountRate: 0,
      discountBadge: "Standard Weekly",
    });

    // 4-7 weeks: 10%
    assert.deepEqual(calculateDurationDiscount(4), {
      discountRate: 0.1,
      discountBadge: "10% Monthly Discount",
    });
    assert.deepEqual(calculateDurationDiscount(7), {
      discountRate: 0.1,
      discountBadge: "10% Monthly Discount",
    });

    // 8-11 weeks: 20%
    assert.deepEqual(calculateDurationDiscount(8), {
      discountRate: 0.2,
      discountBadge: "20% Nomad Discount",
    });
    assert.deepEqual(calculateDurationDiscount(11), {
      discountRate: 0.2,
      discountBadge: "20% Nomad Discount",
    });

    // 12+ weeks: 30%
    assert.deepEqual(calculateDurationDiscount(12), {
      discountRate: 0.3,
      discountBadge: "30% Resident Discount",
    });
    assert.deepEqual(calculateDurationDiscount(24), {
      discountRate: 0.3,
      discountBadge: "30% Resident Discount",
    });
  });

  it("resolves selected hardware items from the catalog", () => {
    const items = getSelectedProducts(baseTestConfig);
    assert.ok(items.length >= 6, "Expected at least 6 core products");
    assert.ok(items.some((i) => i.id === "desk-dual-motor"));
    assert.ok(items.some((i) => i.id === "chair-ergonomic-mesh"));
    assert.ok(items.some((i) => i.id === "monitor-ultrawide-curved"));
  });

  it("computes accurate workspace financial totals including deposits and discounts", () => {
    // 4 weeks: 10% discount
    const totals4w = calculateWorkspaceTotals(baseTestConfig, 4);

    assert.ok(totals4w.baseWeeklyUSD > 0);
    assert.equal(totals4w.discountRate, 0.1);
    assert.equal(totals4w.discountedWeeklyUSD, Math.round(totals4w.baseWeeklyUSD * 0.9));
    assert.equal(totals4w.totalRentalUSD, totals4w.discountedWeeklyUSD * 4);
    assert.equal(totals4w.totalDepositUSD, totals4w.baseWeeklyUSD);
    assert.equal(totals4w.grandTotalUSD, totals4w.totalRentalUSD + totals4w.totalDepositUSD);

    // IDR totals consistency
    assert.equal(totals4w.grandTotalIDR, totals4w.totalRentalIDR + totals4w.totalDepositIDR);
  });

  it("generates a valid 4-digit booking reference", () => {
    const ref = generateBookingRef();
    assert.match(ref, /^\d{4}$/, "Booking ref must be 4 digits");
  });

  it("generates an encoded WhatsApp checkout URL with complete cart summary", () => {
    const items = getSelectedProducts(baseTestConfig);
    const totals = calculateWorkspaceTotals(baseTestConfig, 4);

    const waUrl = generateWhatsAppOrderUrl({
      bookingRef: "8492",
      fullName: "Alex Rivera",
      areaName: "Canggu",
      durationWeeks: 4,
      totalUSD: totals.grandTotalUSD,
      totalIDR: totals.grandTotalIDR,
      items,
    });

    assert.ok(waUrl.startsWith("https://wa.me/6281234567890?text="));
    assert.ok(waUrl.includes(encodeURIComponent("Alex Rivera")));
    assert.ok(waUrl.includes(encodeURIComponent("Canggu")));
    assert.ok(waUrl.includes(encodeURIComponent("8492")));
    assert.ok(waUrl.includes(encodeURIComponent(items[0].name)));
  });
});
