import { DRAWINGS, PROJECT, type DrawingId } from "@/lib/facility";
import { useStudio } from "@/lib/studio-store";
import { Cover } from "@/components/studio/cover";
import { ScheduleTable } from "@/components/studio/inspector";
import {
  ChillPlan,
  FlowPlan,
  HallPlan,
  LairagePlan,
  PhasingPlan,
  SectionPlan,
  UtilitiesPlan,
} from "@/components/studio/plans";
import { SitePlan } from "@/components/studio/site-plan";
import { Badge } from "@/components/ui/badge";
import { Kpi, Panel, SectionTitle } from "./shared";
import { cn } from "@/lib/utils";

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

export function WorksView() {
  const drawing = useStudio((s) => s.drawing);
  const setDrawing = useStudio((s) => s.setDrawing);

  return (
    <div className="flex flex-col gap-4">
      <SectionTitle
        kicker="Section 09 · Processing"
        title="Tholo Works"
      />
      <p className="max-w-2xl text-sm text-muted">
        DVS-licensed red-meat plant on a 9.6 ha plot. Clean and unclean paths never cross.
        Laid out for Eighteenth Schedule submission — slaughter, chill, bone, pack, effluent.
      </p>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <Kpi label="Cattle / day" value={String(PROJECT.throughputCattle)} hint={PROJECT.yield} />
        <Kpi label="Chill places" value={String(PROJECT.chillCarcasses)} hint="Carcass hold" />
        <Kpi label="Lairage" value={`${PROJECT.lairageCattle} hd`} hint="1.5-day hold" />
        <Kpi label="Water" value={`${PROJECT.waterM3} m³/d`} hint={`${PROJECT.powerKva} kVA plant`} />
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge tone="ok">Ante-mortem</Badge>
        <Badge tone="hold">Hygiene line</Badge>
        <Badge tone="chill">0–2 °C dispatch</Badge>
        <Badge tone="effluent">Ponds downwind</Badge>
      </div>

      <Panel className="p-2 md:p-3">
        <nav
          className="mb-3 flex gap-1 overflow-x-auto pb-1"
          aria-label="Works drawings"
        >
          {DRAWINGS.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDrawing(d.id)}
              className={cn(
                "flex h-11 shrink-0 items-center gap-2 rounded-md px-3 text-sm transition-colors duration-150",
                drawing === d.id ? "bg-accent text-accent-fg" : "bg-bg-elevated text-muted hover:text-ink",
              )}
            >
              <span className="font-mono text-xs">{d.code}</span>
              {d.title}
            </button>
          ))}
        </nav>
        <div className="rounded-lg bg-bg p-2 md:p-3">
          <DrawingView id={drawing} />
        </div>
      </Panel>
    </div>
  );
}
