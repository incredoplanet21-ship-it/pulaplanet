import { AREA_SCHEDULE, BUILDINGS, CHILL_ROOMS, FLOW_STEPS, HALL_ROOMS, LAIRAGE_PENS, PROJECT, ZONES, areaTotal, type ZoneId } from "@/lib/facility";
import { useStudio } from "@/lib/studio-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function findItem(id: string | null) {
  if (!id) return null;
  const b = BUILDINGS.find((x) => x.id === id);
  if (b) {
    return {
      name: b.name,
      zone: b.zone,
      body: b.program,
      dvs: b.dvs,
      materials: b.materials,
      area: b.area,
      photo: b.photo,
      drawing: b.drawing,
    };
  }
  const rooms = [...HALL_ROOMS, ...LAIRAGE_PENS, ...CHILL_ROOMS];
  const r = rooms.find((x) => x.id === id);
  if (r) {
    return {
      name: r.name,
      zone: r.zone,
      body: r.note,
      dvs: undefined,
      materials: undefined,
      area: Math.round(r.w * r.h),
      photo: undefined,
      drawing: undefined,
    };
  }
  const f = FLOW_STEPS.find((x) => x.id === id);
  if (f) {
    return {
      name: f.name,
      zone: f.zone,
      body: f.note,
      dvs: undefined,
      materials: undefined,
      area: undefined,
      photo: undefined,
      drawing: undefined,
    };
  }
  return null;
}

export function Inspector() {
  const selectedId = useStudio((s) => s.selectedId);
  const drawing = useStudio((s) => s.drawing);
  const setDrawing = useStudio((s) => s.setDrawing);
  const item = findItem(selectedId);

  if (drawing === "schedule") {
    const total = areaTotal();
    return (
      <div className="flex h-full min-h-0 flex-col">
        <p className="font-mono text-[10px] tracking-wide text-muted uppercase">Accommodation</p>
        <h2 className="mt-1 font-display text-2xl text-ink">Schedule of areas</h2>
        <p className="mt-2 text-sm text-muted">
          Enclosed programme {total.toLocaleString()} m² excluding ponds. Click a row on the sheet.
        </p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex h-full min-h-0 flex-col gap-4">
        <div>
          <p className="font-mono text-[10px] tracking-wide text-muted uppercase">{PROJECT.schedule}</p>
          <h2 className="mt-1 font-display text-2xl text-ink">{PROJECT.name}</h2>
          <p className="mt-2 text-sm text-muted">{PROJECT.act}. {PROJECT.wind}.</p>
        </div>
        <p className="text-sm text-muted">
          Select a building, room or process step on the drawing. Paths are one-way: livestock west, product east, waste north.
        </p>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="font-mono text-[10px] text-muted uppercase">Kill</dt>
            <dd className="text-ink">{PROJECT.yield}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] text-muted uppercase">Power</dt>
            <dd className="text-ink">{PROJECT.powerKva} kVA class</dd>
          </div>
        </dl>
        <div className="mt-auto overflow-hidden rounded-lg">
          <img src="/renders/axon.jpg" alt="Axonometric of the campus" className="aspect-16/10 w-full object-cover" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <div>
        <Badge tone={item.zone as ZoneId}>{ZONES[item.zone as ZoneId].label}</Badge>
        <h2 className="mt-2 font-display text-2xl text-ink">{item.name}</h2>
        {item.area ? (
          <p className="mt-1 font-mono text-xs text-muted tabular-nums">{item.area.toLocaleString()} m²</p>
        ) : null}
      </div>
      <p className="text-sm text-fg">{item.body}</p>
      {item.dvs ? (
        <div>
          <p className="font-mono text-[10px] tracking-wide text-muted uppercase">DVS / FAO</p>
          <p className="mt-1 text-sm text-muted">{item.dvs}</p>
        </div>
      ) : null}
      {item.materials ? (
        <div>
          <p className="font-mono text-[10px] tracking-wide text-muted uppercase">Fabric</p>
          <p className="mt-1 text-sm text-muted">{item.materials}</p>
        </div>
      ) : null}
      {item.drawing ? (
        <Button variant="outline" size="sm" onClick={() => setDrawing(item.drawing!)}>
          Open detailed plan
        </Button>
      ) : null}
      {item.photo ? (
        <div className="mt-auto overflow-hidden rounded-lg">
          <img src={item.photo} alt="" className="aspect-16/10 w-full object-cover" />
        </div>
      ) : null}
    </div>
  );
}

export function ScheduleTable() {
  const total = areaTotal();
  return (
    <div className="h-full overflow-auto rounded-xl bg-paper p-4 shadow-[var(--shadow-border)] md:p-6">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] tracking-wide text-muted uppercase">DWG 09</p>
          <h2 className="font-display text-3xl text-ink">Schedule of areas</h2>
        </div>
        <p className="font-mono text-xs text-muted tabular-nums">Σ {total.toLocaleString()} m² enclosed + ponds</p>
      </div>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border font-mono text-[10px] tracking-wide text-muted uppercase">
            <th className="py-2 pr-3 font-medium">Space</th>
            <th className="py-2 pr-3 font-medium">Zone</th>
            <th className="py-2 pr-3 font-medium">m²</th>
            <th className="py-2 font-medium">Note</th>
          </tr>
        </thead>
        <tbody>
          {AREA_SCHEDULE.map((row) => (
            <tr key={row.id} className="border-b border-border/70">
              <td className="py-2.5 pr-3 text-ink">{row.name}</td>
              <td className="py-2.5 pr-3">
                <Badge tone={row.zone}>{ZONES[row.zone].label}</Badge>
              </td>
              <td className="py-2.5 pr-3 font-mono tabular-nums text-ink">{row.area.toLocaleString()}</td>
              <td className="py-2.5 text-muted">{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
