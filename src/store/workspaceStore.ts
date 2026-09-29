"use client";

import { create } from "zustand";
import { StateStorage, createJSONStorage, persist } from "zustand/middleware";
import { Currency, PresetSetup, ProductCategory, WorkspaceConfig } from "@/types/workspace";
import { parseConfigFromUrl, serializeConfigToUrl } from "@/lib/config-url";
import { PRESETS } from "@/data/products";

export const DEFAULT_CONFIG: WorkspaceConfig = {
  deskId: "desk-dual-motor",
  deskFinish: "natural-bamboo",
  deskHeightState: "sitting",
  deskHeightCm: 74,
  chairId: "chair-ergonomic-mesh",
  chairColor: "stealth-black",
  monitorId: "monitor-ultrawide-curved",
  monitorDisplayMode: "bali-gradient",
  peripheralsId: "peripherals-mx-combo",
  lightingId: "light-smart-lamp",
  lampPowered: true,
  laptopStand: true,
  plantId: "lifestyle-plant-monstera",
  coffeeId: "lifestyle-coffee-nespresso",
  outdoorId: "lifestyle-outdoor-surfboard",
  relaxId: null,
  timeOfDay: "sunset",
};

export interface WorkspaceStore {
  config: WorkspaceConfig;
  currency: Currency;
  activeCategory: ProductCategory;
  selectedItemId: string | null;
  checkoutOpen: boolean;
  hasHydrated: boolean;

  // Actions
  setConfig: (updater: WorkspaceConfig | ((prev: WorkspaceConfig) => WorkspaceConfig)) => void;
  updateConfig: (updater: (prev: WorkspaceConfig) => WorkspaceConfig) => void;
  patchConfig: (partial: Partial<WorkspaceConfig>) => void;
  setCurrency: (currency: Currency) => void;
  toggleCurrency: () => void;
  setActiveCategory: (category: ProductCategory) => void;
  setSelectedItemId: (id: string | null) => void;
  setCheckoutOpen: (open: boolean) => void;
  selectItem: (category: ProductCategory, itemId?: string) => void;
  applyPreset: (preset: PresetSetup) => void;
  resetConfig: () => void;
  getShareableUrl: () => string;
  initFromUrlIfPresent: () => void;
  setHasHydrated: (val: boolean) => void;
}

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set, get) => ({
      config: DEFAULT_CONFIG,
      currency: "USD",
      activeCategory: "desks",
      selectedItemId: null,
      checkoutOpen: false,
      hasHydrated: false,

      setHasHydrated: (val) => set({ hasHydrated: val }),

      setConfig: (updater) =>
        set((state) => ({
          config: typeof updater === "function" ? updater(state.config) : updater,
        })),

      updateConfig: (updater) =>
        set((state) => ({
          config: updater(state.config),
        })),

      patchConfig: (partial) =>
        set((state) => ({
          config: { ...state.config, ...partial },
        })),

      setCurrency: (currency) => set({ currency }),

      toggleCurrency: () =>
        set((state) => ({
          currency: state.currency === "USD" ? "IDR" : "USD",
        })),

      setActiveCategory: (activeCategory) => set({ activeCategory }),

      setSelectedItemId: (selectedItemId) => set({ selectedItemId }),

      setCheckoutOpen: (checkoutOpen) => set({ checkoutOpen }),

      selectItem: (category, itemId) => {
        set({ checkoutOpen: false, activeCategory: category });
        if (itemId) {
          set({ selectedItemId: itemId });
          get().updateConfig((prev) => {
            if (category === "desks" && itemId.startsWith("desk-")) {
              return { ...prev, deskId: itemId };
            }
            if (category === "chairs" && itemId.startsWith("chair-")) {
              return { ...prev, chairId: itemId };
            }
            if (category === "monitors" && itemId.startsWith("monitor-")) {
              return { ...prev, monitorId: itemId };
            }
            if (category === "peripherals" && itemId.startsWith("peripherals-")) {
              return { ...prev, peripheralsId: itemId };
            }
            if (category === "lighting" && itemId.startsWith("light-")) {
              return {
                ...prev,
                lightingId: itemId,
                lampPowered: prev.lightingId === itemId ? prev.lampPowered : true,
              };
            }
            if (itemId === "lifestyle-plant-monstera") {
              return { ...prev, plantId: prev.plantId ? prev.plantId : itemId };
            }
            if (itemId === "lifestyle-coffee-nespresso") {
              return { ...prev, coffeeId: prev.coffeeId ? prev.coffeeId : itemId };
            }
            if (
              itemId === "lifestyle-outdoor-surfboard" ||
              itemId === "lifestyle-outdoor-scooter"
            ) {
              return { ...prev, outdoorId: itemId };
            }
            if (itemId === "lifestyle-relax-beanbag") {
              return { ...prev, relaxId: prev.relaxId ? prev.relaxId : itemId };
            }
            if (itemId === "lifestyle-laptop-stand") {
              return { ...prev, laptopStand: true };
            }
            return prev;
          });
        }
      },

      applyPreset: (preset) => {
        get().updateConfig((prev) => ({
          ...prev,
          ...preset.config,
        }));
      },

      resetConfig: () => {
        if (typeof window !== "undefined") {
          try {
            sessionStorage.removeItem("monis_bali_workspace_session");
            window.history.replaceState(null, "", window.location.pathname);
          } catch {
            // ignore
          }
        }
        set({
          config: DEFAULT_CONFIG,
          activeCategory: "desks",
          selectedItemId: null,
        });
      },

      getShareableUrl: () => {
        if (typeof window === "undefined") return "";
        const query = serializeConfigToUrl(get().config);
        return `${window.location.origin}${window.location.pathname}${query.startsWith("?") ? query : ""}`;
      },

      initFromUrlIfPresent: () => {
        if (typeof window === "undefined") return;
        try {
          const urlParams = new URLSearchParams(window.location.search);
          const presetParam = urlParams.get("preset");
          if (presetParam) {
            const found = PRESETS.find((p) => p.id === presetParam);
            if (found) {
              get().setConfig((prev) => ({ ...prev, ...found.config }));
              window.history.replaceState(null, "", window.location.pathname);
              return;
            }
          }

          if (window.location.search && window.location.search.length > 1) {
            const parsed = parseConfigFromUrl(window.location.search);
            if (Object.keys(parsed).length > 0) {
              get().setConfig((prev) => ({ ...prev, ...parsed }));
              window.history.replaceState(null, "", window.location.pathname);
              return;
            }
          }
        } catch {
          // ignore
        }
      },
    }),
    {
      name: "monis_bali_workspace_session",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return window.sessionStorage;
        }
        const fallbackStorage: StateStorage = {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
        return fallbackStorage;
      }),
      partialize: (state) => ({
        config: state.config,
        currency: state.currency,
        activeCategory: state.activeCategory,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
