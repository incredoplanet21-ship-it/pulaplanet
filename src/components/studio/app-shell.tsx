import { DRAWINGS, type DrawingId, type LayerId } from "@/lib/facility";
import { useStudio } from "@/lib/studio-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Cover } from "./cover";
import { Inspector, ScheduleTable } from "./inspector";
import { ChillPlan, FlowPlan, HallPlan, LairagePlan, PhasingPlan, SectionPlan, UtilitiesPlan } from "./plans";
import { SitePlan } from "./site-plan";
import { Layers, Map } from "lucide-react";

const LAYER_OPTS: { id: LayerId; label: string }[] = [
  { id: "zones", label: "Zones" },
  { id: "livestock", label: "Livestock" },
  { id: "product", label: "Product" },
  { id: "personnel", label: "Personnel" },
  { id: "waste", label: "Waste" },
  { id: "labels", label: "Labels" },
];

function DrawingView({ id }: { id: DrawingId }) {
  switch (id) {
    case "cover":
      return <Cover />;
    case "site":
      return <SitePlan />;
    case "flow":
      return <FlowPlan />;
    case "lairage":
      return <LairagePlan />;
    case "hall":
      return <HallPlan />;
    case "chill":
      return <ChillPlan />;
    case "section":
      return <SectionPlan />;
    case "utilities":
      return <UtilitiesPlan />;
    case "phasing":
      return <PhasingPlan />;
    case "schedule":
      return <ScheduleTable />;
  }
}

export function AppShell() {
  const drawing = useStudio((s) => s.drawing);
  const setDrawing = useStudio((s) => s.setDrawing);
  const layers = useStudio((s) => s.layers);
  const toggleLayer = useStudio((s) => s.toggleLayer);
  const select = useStudio((s) => s.select);
  const showLayers = drawing === "site";
  const showInspector = drawing !== "cover";

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 md:px-6">
        <button type="button" className="flex min-h-11 items-baseline gap-2 text-left" onClick={() => setDrawing("cover")}>
          <span className="font-display text-xl text-ink">Tholo Works</span>
          <span className="hidden font-mono text-xs tracking-wide text-muted uppercase sm:inline">
            Red meat abattoir · Botswana
          </span>
        </button>
        <div className="flex items-center gap-2">
          <span className="hidden font-mono text-xs text-muted md:inline">Rev A · Sept 2026</span>
          <Button variant="outline" size="sm" onClick={() => setDrawing("site")}>
            <Map className="size-3.5" />
            Site
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <nav
          className="flex shrink-0 flex-row flex-nowrap gap-1 overflow-x-auto border-b border-border p-2 lg:w-56 lg:flex-col lg:overflow-y-auto lg:border-r lg:border-b-0 lg:p-3"
          aria-label="Drawing set"
        >
          {DRAWINGS.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDrawing(d.id)}
              className={cn(
                "flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-3 text-left transition-colors duration-150",
                drawing === d.id ? "bg-accent text-accent-fg" : "text-muted hover:bg-surface hover:text-ink",
              )}
            >
              <span className="font-mono text-xs">{d.code}</span>
              <span className="text-sm">{d.title}</span>
            </button>
          ))}
        </nav>

        <main className="flex min-h-0 min-w-0 flex-1 flex-col">
          {showLayers && (
            <div className="flex flex-wrap items-center gap-1 border-b border-border px-3 py-2">
              <Layers className="size-3.5 text-muted" />
              {LAYER_OPTS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => toggleLayer(l.id)}
                  className={cn(
                    "h-11 rounded-full px-3 font-mono text-xs tracking-wide uppercase transition-colors duration-150 md:h-8",
                    layers[l.id] ? "bg-ink text-paper" : "bg-surface text-muted",
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
          <div className="min-h-0 flex-1 overflow-auto p-3 md:p-5" onClick={() => select(null)}>
            <div className="mx-auto max-w-6xl" onClick={(e) => e.stopPropagation()}>
              <DrawingView id={drawing} />
            </div>
          </div>
        </main>

        {showInspector && (
          <aside className="max-h-[40vh] overflow-y-auto border-t border-border bg-bg-elevated p-4 lg:max-h-none lg:w-80 lg:border-t-0 lg:border-l">
            <Inspector />
          </aside>
        )}
      </div>
    </div>
  );
}
