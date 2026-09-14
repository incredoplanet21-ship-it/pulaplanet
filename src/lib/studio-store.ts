import { create } from "zustand";
import type { DrawingId, LayerId } from "@/lib/facility";

const LAYERS: Record<LayerId, boolean> = {
  zones: true,
  livestock: true,
  product: true,
  personnel: false,
  waste: true,
  labels: true,
};

type StudioState = {
  drawing: DrawingId;
  selectedId: string | null;
  layers: Record<LayerId, boolean>;
  setDrawing: (d: DrawingId) => void;
  select: (id: string | null) => void;
  toggleLayer: (id: LayerId) => void;
};

export const useStudio = create<StudioState>((set) => ({
  drawing: "cover",
  selectedId: null,
  layers: LAYERS,
  setDrawing: (drawing) => set({ drawing, selectedId: null }),
  select: (selectedId) => set({ selectedId }),
  toggleLayer: (id) =>
    set((s) => ({ layers: { ...s.layers, [id]: !s.layers[id] } })),
}));
