export type ProductCategory = 
  | "desks" 
  | "chairs" 
  | "monitors" 
  | "peripherals" 
  | "lighting" 
  | "bali-lifestyle";

export type DeskFinish = "natural-bamboo" | "walnut" | "matte-black" | "minimal-white";
export type ChairColor = "stealth-black" | "mineral-grey" | "cognac-leather" | "terracotta";
export type TimeOfDay = "daylight" | "sunset" | "studio-night";
export type Currency = "USD" | "IDR";

export interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  weeklyPriceUSD: number;
  weeklyPriceIDR: number;
  description: string;
  tag?: string;
  specs: string[];
  dimensions?: string;
  defaultFinish?: string;
  availableFinishes?: { id: string; name: string; hex: string }[];
  popular?: boolean;
}

export interface WorkspaceConfig {
  deskId: string;
  deskFinish: DeskFinish;
  deskHeightState: "sitting" | "standing"; // sitting = 74cm, standing = 108cm
  deskHeightCm: number; // 70 to 118 cm
  chairId: string;
  chairColor: ChairColor;
  monitorId: string;
  monitorDisplayMode: "bali-gradient" | "sunset-surf" | "minimal-clock";
  peripheralsId: string;
  lightingId: string;
  lampPowered: boolean;
  laptopStand: boolean;
  plantId: string | null;
  coffeeId: string | null;
  outdoorId: string | null; // surfboard or scooter
  relaxId: string | null;  // beanbag
  timeOfDay: TimeOfDay;
}

export interface PresetSetup {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  config: Partial<WorkspaceConfig>;
}

export interface BaliDeliveryArea {
  id: string;
  name: string;
  zone: string;
  estimatedDelivery: string;
  feeUSD: number;
}
