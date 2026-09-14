import { create } from "zustand";
import type { ViewId } from "@/lib/enterprise";

type OpsState = {
  view: ViewId;
  selectedId: string | null;
  query: string;
  repaired: string[];
  repairStep: number;
  fmdStep: number;
  rotation: number;
  checks: Record<string, boolean>;
  setView: (view: ViewId) => void;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  advanceRepair: () => void;
  completeRepair: () => void;
  setFmdStep: (n: number) => void;
  advanceRotation: () => void;
  toggleCheck: (id: string) => void;
};

export const useOps = create<OpsState>((set, get) => ({
  view: "command",
  selectedId: null,
  query: "",
  repaired: [],
  repairStep: 0,
  fmdStep: 0,
  rotation: 0,
  checks: { c1: true, c2: true, c3: true, c4: false, c5: true, c6: true },
  setView: (view) => set({ view, selectedId: null }),
  select: (selectedId) => set({ selectedId }),
  setQuery: (query) => set({ query }),
  advanceRepair: () => set({ repairStep: Math.min(4, get().repairStep + 1) }),
  completeRepair: () =>
    set({
      repaired: get().repaired.includes("BH-05") ? get().repaired : [...get().repaired, "BH-05"],
      repairStep: 4,
    }),
  setFmdStep: (fmdStep) => set({ fmdStep }),
  advanceRotation: () => set({ rotation: get().rotation + 1 }),
  toggleCheck: (id) => set({ checks: { ...get().checks, [id]: !get().checks[id] } }),
}));
