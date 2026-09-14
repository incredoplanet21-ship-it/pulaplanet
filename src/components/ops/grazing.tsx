import {
  CAMPS,
  ENTERPRISE,
  PADDOCKS,
  ROTATION,
  type CampId,
} from "@/lib/enterprise";
import { useOps } from "@/lib/ops-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Kpi, Panel, SectionTitle } from "./shared";

const ORDER: CampId[] = ["A", "B", "C", "D"];

export function GrazingView() {
  const rotation = useOps((s) => s.rotation);
  const advance = useOps((s) => s.advanceRotation);
  const graze = ORDER[rotation % 4];

  return (
    <div className="flex flex-col gap-4">
      <SectionTitle
        kicker="Section 03 · Grazing systems"
        title="Four-camp rotation"
        action={
          <Button variant="outline" size="sm" onClick={advance}>
            Advance rotation
          </Button>
        }
      />
      <p className="max-w-2xl text-sm text-muted">
        Paddocks grouped by soil, vegetation and water. One camp in, three at rest for 45–60
        days. Safe stocking on this ranch: 4–8 ha per AUE. Utilisation capped at 25–30%.
      </p>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <Kpi label="Current camp" value={`Camp ${graze}`} hint="Demo offset from live A" />
        <Kpi label="Ha / AUE" value={String(ENTERPRISE.haPerAue)} hint="Within 4–8 ha band" />
        <Kpi label="Utilisation" value="27%" hint={`Cap ${(ENTERPRISE.utilisationCap * 100).toFixed(0)}%`} />
        <Kpi label="Tswana AUE" value="0.85" hint="350–400 kg cow" />
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {ORDER.map((id) => {
          const c = CAMPS[id];
          const active = id === graze;
          const pads = PADDOCKS.filter((p) => p.camp === id);
          const ha = pads.reduce((s, p) => s + p.ha, 0);
          return (
            <Panel key={id} className={active ? "ring-2 ring-accent" : ""}>
              <p className="font-mono text-xs text-muted">CAMP {id}</p>
              <h3 className="font-display text-2xl text-ink">{active ? "Grazing" : c.use}</h3>
              <p className="mt-1 text-sm text-muted">{c.note}</p>
              <p className="mt-3 font-mono text-xs text-muted tabular-nums">
                {ha} ha · {pads.length} paddocks · rest {active ? 0 : c.rest}d
              </p>
              {active ? <Badge tone="ok" className="mt-3">Herd here</Badge> : null}
            </Panel>
          );
        })}
      </div>

      <Panel>
        <SectionTitle kicker="Seasonal calendar" title="Rainfall, rest and licks" />
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {ROTATION.map((m) => {
            const now = m.month === "Sep";
            return (
              <li
                key={m.month}
                className={`rounded-lg p-3 ${now ? "bg-accent text-accent-fg" : "bg-bg-elevated"}`}
              >
                <p className="font-mono text-xs uppercase tracking-wide">
                  {m.month} · {m.season}
                </p>
                <p className={`mt-1 text-sm ${now ? "text-accent-fg" : "text-ink"}`}>{m.action}</p>
              </li>
            );
          })}
        </ol>
      </Panel>

      <Panel>
        <SectionTitle kicker="Stocking math" title="One AUE = 450 kg cow with calf" />
        <p className="max-w-2xl text-sm text-muted">
          A 450 kg cow with calf eats ~10 kg dry matter per day. Tswana-type cattle (350–400 kg)
          rate 0.8–0.9 AUE. Lekhubu carries 1,840 head = 1,564 AUE on 10,000 ha → 6.4 ha/AUE,
          inside the semi-arid band, with Camp C held as a dry-season buffer.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="font-mono text-xs text-muted uppercase">
              <tr className="border-b border-border">
                <th className="py-2 font-medium">Class</th>
                <th className="py-2 font-medium">Head</th>
                <th className="py-2 font-medium">AUE factor</th>
                <th className="py-2 font-medium">AUE</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Breeding cows", 920, 0.9, 828],
                ["Heifers / young cows", 310, 0.75, 232],
                ["Weaners / growers", 420, 0.7, 294],
                ["Bulls / finishers", 140, 1.1, 154],
                ["Calves at foot", 50, 0.3, 15],
              ].map((r) => (
                <tr key={r[0] as string} className="border-b border-border last:border-0">
                  <td className="py-2">{r[0]}</td>
                  <td className="py-2 tabular-nums">{r[1]}</td>
                  <td className="py-2 tabular-nums">{r[2]}</td>
                  <td className="py-2 tabular-nums">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
