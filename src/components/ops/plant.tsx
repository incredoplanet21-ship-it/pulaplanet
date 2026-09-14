import { useMemo, useState } from "react";
import {
  PLANT,
  PLANT_GROUPS,
  plantTotals,
  pula,
  type PlantItem,
} from "@/lib/enterprise";
import { Badge } from "@/components/ui/badge";
import { Inspector, KeyRow, Kpi, Panel, SectionTitle } from "./shared";

const STATUS_TONE = {
  "in-service": "ok",
  specified: "hold",
  tender: "watch",
  planned: "planned",
} as const;

export function PlantView() {
  const [group, setGroup] = useState<string>("All");
  const [selected, setSelected] = useState<string | null>(null);
  const totals = plantTotals();
  const rows = useMemo(
    () => (group === "All" ? PLANT : PLANT.filter((p) => p.group === group)),
    [group],
  );
  const item: PlantItem | undefined = PLANT.find((p) => p.id === selected);
  const groupedCapex = PLANT_GROUPS.map((g) => ({
    g,
    n: PLANT.filter((p) => p.group === g).length,
    capex: PLANT.filter((p) => p.group === g).reduce((s, p) => s + p.capex, 0),
  }));

  return (
    <div className="flex flex-col gap-4">
      <SectionTitle
        kicker="Bill of plant"
        title="Everything the enterprise needs"
      />
      <p className="max-w-2xl text-sm text-muted">
        Land, fence, water, energy, handling, digital IDs, health, transport, Tholo Works,
        cold chain and people — specified for a 10,000 ha Botswana beef operation. Capex is
        indicative, in Pula, excluding land purchase.
      </p>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <Kpi label="Line items" value={String(totals.count)} hint="Across 12 groups" />
        <Kpi label="In service" value={String(totals.byStatus["in-service"])} hint="Pilot ranch live" />
        <Kpi label="Specified / tender" value={String(totals.byStatus.specified + totals.byStatus.tender)} hint="Works + EU pack" />
        <Kpi label="Indicative capex" value={pula(totals.capex)} hint="Ex-land, 2026 prices" />
      </div>

      <div className="flex gap-1 overflow-x-auto pb-1">
        {["All", ...PLANT_GROUPS].map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGroup(g)}
            className={`h-11 shrink-0 rounded-md px-3 text-sm transition-colors duration-150 ${
              group === g ? "bg-ink text-paper" : "bg-paper text-muted shadow-[var(--shadow-border)]"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_18rem]">
        <Panel className="overflow-x-auto p-0">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="font-mono text-xs tracking-wide text-muted uppercase">
              <tr className="border-b border-border">
                <th className="px-4 py-3 font-medium">Asset</th>
                <th className="px-3 py-3 font-medium">Qty</th>
                <th className="px-3 py-3 font-medium">Phase</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">Capex</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  className={`cursor-pointer border-b border-border last:border-0 ${
                    selected === p.id ? "bg-accent-soft" : "hover:bg-bg-elevated"
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className="block text-ink">{p.name}</span>
                    <span className="block text-xs text-muted">{p.group}</span>
                  </td>
                  <td className="px-3 py-3 font-mono text-xs">{p.qty}</td>
                  <td className="px-3 py-3 text-xs">{p.phase}</td>
                  <td className="px-3 py-3">
                    <Badge tone={STATUS_TONE[p.status]}>{p.status}</Badge>
                  </td>
                  <td className="px-3 py-3 tabular-nums">
                    {p.capex ? pula(p.capex) : "in plant"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        {item ? (
          <Inspector title={item.name} onClose={() => setSelected(null)}>
            <Badge tone={STATUS_TONE[item.status]}>{item.status}</Badge>
            <div className="mt-3">
              <KeyRow k="Group" v={item.group} />
              <KeyRow k="Quantity" v={item.qty} />
              <KeyRow k="Phase" v={item.phase} />
              <KeyRow k="Capex" v={item.capex ? pula(item.capex) : "Rolled into Tholo Works"} />
            </div>
            <p className="mt-3 text-sm text-muted">{item.spec}</p>
          </Inspector>
        ) : (
          <Panel>
            <h3 className="font-display text-xl text-ink">By group</h3>
            <ul className="mt-2">
              {groupedCapex.map((g) => (
                <li key={g.g} className="flex items-baseline justify-between gap-2 border-b border-border py-2 text-sm last:border-0">
                  <button type="button" className="text-left text-ink hover:text-accent" onClick={() => setGroup(g.g)}>
                    {g.g}
                    <span className="ml-2 font-mono text-xs text-muted">{g.n}</span>
                  </button>
                  <span className="tabular-nums text-muted">{g.capex ? pula(g.capex) : "—"}</span>
                </li>
              ))}
            </ul>
          </Panel>
        )}
      </div>
    </div>
  );
}
