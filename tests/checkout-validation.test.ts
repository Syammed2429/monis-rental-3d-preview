import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { checkoutFormSchema } from "@/lib/validations/checkout";

describe("Checkout Zod Schema Validation (QA & Pentest)", () => {
  const validData = {
    fullName: "Elena Rostova",
    whatsapp: "+62 812-3456-7890",
    areaId: "canggu",
    durationWeeks: 4,
    villaAddress: "Villa Sunset 4B, Jl. Pantai Batu Bolong, Canggu",
    specialRequests: "Please deliver around 2 PM if possible.",
  };

  it("accepts valid checkout form submission", () => {
    const parsed = checkoutFormSchema.safeParse(validData);
    assert.equal(parsed.success, true);
  });

  it("validates full names properly (Unicode, hyphens, apostrophes)", () => {
    const validNames = [
      "Elena Rostova",
      "Muhammed Ghouse",
      "Jean-Luc Picard",
      "O'Connor",
      "María García",
      "René Müller",
      "Dada Khalandar",
      "Li Wei",
    ];
    for (const name of validNames) {
      const parsed = checkoutFormSchema.safeParse({ ...validData, fullName: name });
      assert.equal(parsed.success, true, `Expected valid name: ${name}`);
    }

    const invalidNames = [
      "A", // too short (<2 chars)
      "123456", // numbers only
      "John123", // numbers mixed
      "<script>alert(1)</script>", // XSS / code injection
      "--", // punctuation only
      "...", // punctuation only
      "@#$%^", // symbols
      "a".repeat(65), // over max 60 chars
    ];
    for (const name of invalidNames) {
      const parsed = checkoutFormSchema.safeParse({ ...validData, fullName: name });
      assert.equal(parsed.success, false, `Expected invalid name to fail: ${name}`);
      if (!parsed.success) {
        assert.ok(parsed.error.issues.some((i) => i.path.includes("fullName")));
      }
    }
  });

  it("validates international and Indonesian WhatsApp formats", () => {
    const validNumbers = ["+6281234567890", "+1 (555) 234-5678", "08123456789", "+44 20 7946 0991"];
    for (const num of validNumbers) {
      const parsed = checkoutFormSchema.safeParse({ ...validData, whatsapp: num });
      assert.equal(parsed.success, true, `Expected ${num} to be valid`);
    }

    const invalidNumbers = [
      "123", // too short (<7 chars)
      "1234567", // only 7 digits (<8 digits)
      "54542454516464646565353535333", // excessively long (29 digits > 15 ITU-T E.164 max)
      "+1 234567890123456789", // formatted string > 20 chars
      "call me on signal", // letters only
      "javascript:alert(1)", // XSS payload attempt
    ];
    for (const num of invalidNumbers) {
      const parsed = checkoutFormSchema.safeParse({ ...validData, whatsapp: num });
      assert.equal(parsed.success, false, `Expected ${num} to be rejected`);
    }
  });

  it("enforces rental duration bounds [1, 24] weeks", () => {
    const zeroWeeks = checkoutFormSchema.safeParse({ ...validData, durationWeeks: 0 });
    assert.equal(zeroWeeks.success, false);

    const negativeWeeks = checkoutFormSchema.safeParse({
      ...validData,
      durationWeeks: -2,
    });
    assert.equal(negativeWeeks.success, false);

    const overMaxWeeks = checkoutFormSchema.safeParse({
      ...validData,
      durationWeeks: 25,
    });
    assert.equal(overMaxWeeks.success, false);

    const boundaryMin = checkoutFormSchema.safeParse({ ...validData, durationWeeks: 1 });
    assert.equal(boundaryMin.success, true);

    const boundaryMax = checkoutFormSchema.safeParse({ ...validData, durationWeeks: 24 });
    assert.equal(boundaryMax.success, true);
  });

  it("rejects empty or overly short villa address", () => {
    const emptyAddress = checkoutFormSchema.safeParse({ ...validData, villaAddress: "" });
    assert.equal(emptyAddress.success, false);

    const shortAddress = checkoutFormSchema.safeParse({
      ...validData,
      villaAddress: "Vila",
    });
    assert.equal(shortAddress.success, false);
  });
});
