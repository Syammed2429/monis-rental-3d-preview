import { ChairColor, DeskFinish, TimeOfDay, WorkspaceConfig } from "@/types/workspace";
import { PRODUCTS } from "@/data/products";

const VALID_DESK_FINISHES: DeskFinish[] = [
  "natural-bamboo",
  "walnut",
  "matte-black",
  "minimal-white",
];

const VALID_CHAIR_COLORS: ChairColor[] = [
  "stealth-black",
  "mineral-grey",
  "cognac-leather",
  "terracotta",
];

const VALID_TIME_OF_DAY: TimeOfDay[] = ["daylight", "sunset", "studio-night"];

export function serializeConfigToUrl(config: WorkspaceConfig): string {
  try {
    const params = new URLSearchParams();

    if (config.deskId) params.set("desk", config.deskId);
    if (config.deskFinish) params.set("finish", config.deskFinish);
    if (config.deskHeightState) params.set("height", config.deskHeightState);
    if (config.deskHeightCm) params.set("cm", config.deskHeightCm.toString());
    if (config.chairId) params.set("chair", config.chairId);
    if (config.chairColor) params.set("color", config.chairColor);
    if (config.monitorId) params.set("monitor", config.monitorId);
    if (config.monitorDisplayMode) params.set("screen", config.monitorDisplayMode);
    if (config.peripheralsId) params.set("peripherals", config.peripheralsId);
    if (config.lightingId) params.set("lighting", config.lightingId);
    if (!config.lampPowered) params.set("lamp", "off");
    if (!config.laptopStand) params.set("laptop", "none");
    if (config.plantId) params.set("plant", config.plantId);
    if (config.coffeeId) params.set("coffee", config.coffeeId);
    if (config.outdoorId) params.set("outdoor", config.outdoorId);
    if (config.relaxId) params.set("relax", config.relaxId);
    if (config.timeOfDay && config.timeOfDay !== "sunset") params.set("ambiance", config.timeOfDay);

    const query = params.toString();
    return query ? `?${query}` : typeof window !== "undefined" ? window.location.pathname : "";
  } catch (err) {
    console.warn("Failed to serialize config to URL:", err);
    return "";
  }
}

export function parseConfigFromUrl(search: string): Partial<WorkspaceConfig> {
  const result: Partial<WorkspaceConfig> = {};

  try {
    const params = new URLSearchParams(search);

    // Validate desk
    const desk = params.get("desk");
    if (desk && PRODUCTS.some((p) => p.id === desk && p.category === "desks")) {
      result.deskId = desk;
    }

    // Validate desk finish
    const finish = params.get("finish");
    if (finish && VALID_DESK_FINISHES.includes(finish as DeskFinish)) {
      result.deskFinish = finish as DeskFinish;
    }

    // Validate height state
    const height = params.get("height");
    if (height === "sitting" || height === "standing") {
      result.deskHeightState = height;
    }

    // Validate height in cm (clamped 70-118)
    const cm = params.get("cm");
    if (cm) {
      const parsedCm = Number(cm);
      if (!isNaN(parsedCm) && parsedCm >= 70 && parsedCm <= 118) {
        result.deskHeightCm = Math.round(parsedCm);
      }
    }

    // Validate chair
    const chair = params.get("chair");
    if (chair && PRODUCTS.some((p) => p.id === chair && p.category === "chairs")) {
      result.chairId = chair;
    }

    // Validate chair color
    const color = params.get("color");
    if (color && VALID_CHAIR_COLORS.includes(color as ChairColor)) {
      result.chairColor = color as ChairColor;
    }

    // Validate monitor
    const monitor = params.get("monitor");
    if (monitor && PRODUCTS.some((p) => p.id === monitor && p.category === "monitors")) {
      result.monitorId = monitor;
    }

    // Validate screen wallpaper
    const screen = params.get("screen");
    if (screen === "bali-gradient" || screen === "sunset-surf" || screen === "minimal-clock") {
      result.monitorDisplayMode = screen;
    }

    // Validate peripherals
    const peripherals = params.get("peripherals");
    if (peripherals && PRODUCTS.some((p) => p.id === peripherals && p.category === "peripherals")) {
      result.peripheralsId = peripherals;
    }

    // Validate lighting
    const lighting = params.get("lighting");
    if (lighting && PRODUCTS.some((p) => p.id === lighting && p.category === "lighting")) {
      result.lightingId = lighting;
    }

    if (params.get("lamp") === "off") result.lampPowered = false;
    if (params.get("laptop") === "none") result.laptopStand = false;

    // Validate lifestyle extras
    const plant = params.get("plant");
    if (plant && PRODUCTS.some((p) => p.id === plant && p.category === "bali-lifestyle")) {
      result.plantId = plant;
    }

    const coffee = params.get("coffee");
    if (coffee && PRODUCTS.some((p) => p.id === coffee && p.category === "bali-lifestyle")) {
      result.coffeeId = coffee;
    }

    const outdoor = params.get("outdoor");
    if (outdoor && PRODUCTS.some((p) => p.id === outdoor && p.category === "bali-lifestyle")) {
      result.outdoorId = outdoor;
    }

    const relax = params.get("relax");
    if (relax && PRODUCTS.some((p) => p.id === relax && p.category === "bali-lifestyle")) {
      result.relaxId = relax;
    }

    // Validate time of day
    const ambiance = params.get("ambiance");
    if (ambiance && VALID_TIME_OF_DAY.includes(ambiance as TimeOfDay)) {
      result.timeOfDay = ambiance as TimeOfDay;
    }
  } catch (err) {
    console.warn("Failed to parse URL config, falling back to defaults:", err);
  }

  return result;
}
