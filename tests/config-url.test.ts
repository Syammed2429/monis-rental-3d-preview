import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { WorkspaceConfig } from "@/types/workspace";
import { parseConfigFromUrl, serializeConfigToUrl } from "@/lib/config-url";

const testConfig: WorkspaceConfig = {
  deskId: "desk-dual-motor",
  deskFinish: "natural-bamboo",
  deskHeightState: "standing",
  deskHeightCm: 108,
  chairId: "chair-ergonomic-mesh",
  chairColor: "terracotta",
  monitorId: "monitor-ultrawide-curved",
  monitorDisplayMode: "sunset-surf",
  peripheralsId: "peripherals-mx-combo",
  lightingId: "light-smart-lamp",
  lampPowered: false,
  lampWarmth: "warm",
  laptopStand: false,
  plantId: "lifestyle-plant-monstera",
  coffeeId: "lifestyle-coffee-nespresso",
  outdoorId: "lifestyle-outdoor-surfboard",
  relaxId: null,
  timeOfDay: "daylight",
};

describe("URL Serialization and Security Sanitization", () => {
  it("serializes workspace configuration into URL query parameters", () => {
    const query = serializeConfigToUrl(testConfig);
    assert.ok(query.startsWith("?"), "Serialized URL must start with ?");

    const params = new URLSearchParams(query);
    assert.equal(params.get("desk"), "desk-dual-motor");
    assert.equal(params.get("finish"), "natural-bamboo");
    assert.equal(params.get("height"), "standing");
    assert.equal(params.get("cm"), "108");
    assert.equal(params.get("chair"), "chair-ergonomic-mesh");
    assert.equal(params.get("color"), "terracotta");
    assert.equal(params.get("lamp"), "off");
    assert.equal(params.get("laptop"), "none");
    assert.equal(params.get("ambiance"), "daylight");
  });

  it("parses valid URL query parameters back into configuration state", () => {
    const search =
      "?desk=desk-dual-motor&finish=walnut&height=standing&cm=110&chair=chair-ergonomic-mesh&color=stealth-black";
    const parsed = parseConfigFromUrl(search);

    assert.equal(parsed.deskId, "desk-dual-motor");
    assert.equal(parsed.deskFinish, "walnut");
    assert.equal(parsed.deskHeightState, "standing");
    assert.equal(parsed.deskHeightCm, 110);
    assert.equal(parsed.chairId, "chair-ergonomic-mesh");
    assert.equal(parsed.chairColor, "stealth-black");
  });

  describe("Security Parameter Tampering Defense (Pentest / QA)", () => {
    it("rejects non-existent desk IDs injected via query string", () => {
      const maliciousUrl = "?desk=<script>alert(1)</script>&finish=natural-bamboo";
      const parsed = parseConfigFromUrl(maliciousUrl);
      assert.equal(parsed.deskId, undefined, "Untrusted deskId must not be accepted");
      assert.equal(parsed.deskFinish, "natural-bamboo");
    });

    it("rejects invalid finish types not in permitted enum", () => {
      const tamperUrl = "?finish=carbon-fiber";
      const parsed = parseConfigFromUrl(tamperUrl);
      assert.equal(parsed.deskFinish, undefined, "Unapproved desk finish must be rejected");
    });

    it("rejects out-of-bounds desk height (too low < 70cm or too high > 118cm)", () => {
      const lowTamper = "?cm=40";
      const parsedLow = parseConfigFromUrl(lowTamper);
      assert.equal(parsedLow.deskHeightCm, undefined, "Height below 70cm must be discarded");

      const highTamper = "?cm=999";
      const parsedHigh = parseConfigFromUrl(highTamper);
      assert.equal(parsedHigh.deskHeightCm, undefined, "Height above 118cm must be discarded");

      const nanTamper = "?cm=NaN";
      const parsedNan = parseConfigFromUrl(nanTamper);
      assert.equal(parsedNan.deskHeightCm, undefined, "NaN height must be discarded");
    });

    it("accepts valid boundary desk heights [70cm, 118cm]", () => {
      const minBoundary = parseConfigFromUrl("?cm=70");
      assert.equal(minBoundary.deskHeightCm, 70);

      const maxBoundary = parseConfigFromUrl("?cm=118");
      assert.equal(maxBoundary.deskHeightCm, 118);
    });

    it("rejects invalid ambiance modes", () => {
      const invalidAmbiance = parseConfigFromUrl("?ambiance=cyberpunk-neon");
      assert.equal(invalidAmbiance.timeOfDay, undefined);
    });

    it("validates and parses lamp warmth, rejecting invalid values", () => {
      const validWarmth = parseConfigFromUrl("?warmth=daylight");
      assert.equal(validWarmth.lampWarmth, "daylight");

      const invalidWarmth = parseConfigFromUrl("?warmth=toxic_green");
      assert.equal(invalidWarmth.lampWarmth, undefined, "Invalid lamp warmth must be discarded");
    });

    it("validates and parses lamp dimming, enforcing bounds [20, 100]", () => {
      const validDim = parseConfigFromUrl("?dim=65");
      assert.equal(validDim.lampBrightness, 65);

      const highDim = parseConfigFromUrl("?dim=500");
      assert.equal(highDim.lampBrightness, undefined, "Out-of-bounds dim must be rejected");

      const lowDim = parseConfigFromUrl("?dim=5");
      assert.equal(lowDim.lampBrightness, undefined, "Too low dim must be rejected");

      const nanDim = parseConfigFromUrl("?dim=NaN");
      assert.equal(nanDim.lampBrightness, undefined, "NaN dim must be rejected");
    });
  });
});
