import { WorkspaceConfig, DeskFinish, ChairColor, TimeOfDay } from "@/types/workspace";

export function serializeConfigToUrl(config: WorkspaceConfig): string {
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
  return query ? `?${query}` : window.location.pathname;
}

export function parseConfigFromUrl(search: string): Partial<WorkspaceConfig> {
  const params = new URLSearchParams(search);
  const result: Partial<WorkspaceConfig> = {};

  const desk = params.get("desk");
  if (desk) result.deskId = desk;

  const finish = params.get("finish");
  if (finish) result.deskFinish = finish as DeskFinish;

  const height = params.get("height");
  if (height === "sitting" || height === "standing") result.deskHeightState = height;

  const cm = params.get("cm");
  if (cm && !isNaN(Number(cm))) result.deskHeightCm = Number(cm);

  const chair = params.get("chair");
  if (chair) result.chairId = chair;

  const color = params.get("color");
  if (color) result.chairColor = color as ChairColor;

  const monitor = params.get("monitor");
  if (monitor) result.monitorId = monitor;

  const screen = params.get("screen");
  if (screen === "bali-gradient" || screen === "sunset-surf" || screen === "minimal-clock") {
    result.monitorDisplayMode = screen;
  }

  const peripherals = params.get("peripherals");
  if (peripherals) result.peripheralsId = peripherals;

  const lighting = params.get("lighting");
  if (lighting) result.lightingId = lighting;

  if (params.get("lamp") === "off") result.lampPowered = false;
  if (params.get("laptop") === "none") result.laptopStand = false;

  const plant = params.get("plant");
  if (plant) result.plantId = plant;

  const coffee = params.get("coffee");
  if (coffee) result.coffeeId = coffee;

  const outdoor = params.get("outdoor");
  if (outdoor) result.outdoorId = outdoor;

  const relax = params.get("relax");
  if (relax) result.relaxId = relax;

  const ambiance = params.get("ambiance");
  if (ambiance === "daylight" || ambiance === "sunset" || ambiance === "studio-night") {
    result.timeOfDay = ambiance as TimeOfDay;
  }

  return result;
}
