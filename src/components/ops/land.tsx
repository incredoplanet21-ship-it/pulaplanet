import {
  PADDOCKS,
  VELD_INDICATORS,
  veldTone,
  type Paddock,
} from "@/lib/enterprise";
import { useOps } from "@/lib/ops-store";
import { Badge } from "@/components/ui/badge";
import { Inspector, KeyRow, Panel, SectionTitle, StatusPill } from "./shared";
import { RanchMap } from "./ranch-map";

function selectedPaddock(id: string | null): Paddock | undefined {
  return PADDOCKS.find((p) => p.id === id);
}

export function LandView() {
  const selectedId = useOps((s) => s.selectedId);
  const select = useOps((s) => s.select);
  const p = selectedPaddock(selectedId);

  return (
    <div className="flex flex-col gap-4">
      <SectionTitle
        kicker="Section 01 · 10,000 hectares"
        title="Rangeland, veld and camps"
      />
      <p className="max-w-2xl text-sm text-muted">
        GPS/GIS boundary, 24 paddocks, four camps. Each camp is scored on seven veld
        indicators. Forage utilisation capped at 25–30% of standing dry matter.
      </p>

      <Panel className="overflow-hidden p-2 md:p-3">
        <RanchMap />
        <div className="mt-3 flex flex-wrap gap-3 px-2 pb-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-accent-soft ring-1 ring-accent" /> Grazing
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-clean-soft ring-1 ring-clean" /> Rest
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-chill-soft ring-1 ring-chill" /> Calving
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-fault-soft ring-1 ring-fault" /> Rehab
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-chill" /> Borehole
          </span>
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-[1fr_20rem]">
        <Panel className="overflow-x-auto p-0">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="font-mono text-xs tracking-wide text-muted uppercase">
              <tr className="border-b border-border">
                <th className="px-4 py-3 font-medium">Paddock</th>
                <th className="px-3 py-3 font-medium">Use</th>
                <th className="px-3 py-3 font-medium">Ha</th>
                <th className="px-3 py-3 font-medium">Veld</th>
                <th className="px-3 py-3 font-medium">DM kg/ha</th>
                <th className="px-3 py-3 font-medium">Bush</th>
                <th className="px-3 py-3 font-medium">Head</th>
              </tr>
            </thead>
            <tbody>
              {PADDOCKS.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => select(row.id)}
                  className={`cursor-pointer border-b border-border last:border-0 ${
                    selectedId === row.id ? "bg-accent-soft" : "hover:bg-bg-elevated"
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs">{row.id}</span> {row.name}
                  </td>
                  <td className="px-3 py-3 capitalize">{row.use}</td>
                  <td className="px-3 py-3 tabular-nums">{row.ha}</td>
                  <td className="px-3 py-3">
                    <StatusPill status={veldTone(row.veld)} />
                    <span className="ml-2 tabular-nums">{row.veld}</span>
                  </td>
                  <td className="px-3 py-3 tabular-nums">{row.biomass}</td>
                  <td className="px-3 py-3 tabular-nums">{row.bush}%</td>
                  <td className="px-3 py-3 tabular-nums">{row.head || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        {p ? (
          <Inspector title={`${p.id} · ${p.name}`} onClose={() => select(null)}>
            <StatusPill status={veldTone(p.veld)} />
            <div className="mt-3">
              <KeyRow k="Camp" v={p.camp} />
              <KeyRow k="Use" v={p.use} />
              <KeyRow k="Area" v={`${p.ha} ha`} />
              <KeyRow k="Veld score" v={p.veld} />
              <KeyRow k="Biomass" v={`${p.biomass} kg DM/ha`} />
              <KeyRow k="Basal cover" v={`${p.basal}%`} />
              <KeyRow k="Bush encroachment" v={`${p.bush}%`} />
              <KeyRow k="Erosion" v={p.erosion} />
              <KeyRow k="Water" v={p.waterId} />
              <KeyRow k="Stock" v={p.head ? `${p.head} hd · ${p.aue} AUE` : "Empty"} />
              <KeyRow k="Safe AUE" v={p.safeAue} />
              {p.rest > 0 ? <KeyRow k="Rest remaining" v={`${p.rest} days`} /> : null}
            </div>
            <p className="mt-3 text-xs text-muted">
              Seven-indicator score: {VELD_INDICATORS.join(" · ")}. Encroachment above 30%
              triggers destock and clearing.
            </p>
          </Inspector>
        ) : (
          <Panel>
            <p className="text-sm text-muted">Select a paddock on the map or table.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone="ok">Veld ≥ 65</Badge>
              <Badge tone="watch">50–64</Badge>
              <Badge tone="fault">{`< 50 rehab`}</Badge>
            </div>
          </Panel>
        )}
      </div>
    </div>
  );
}
