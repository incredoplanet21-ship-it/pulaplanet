import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BUYERS, ENTERPRISE, GRADES, REINVEST, ROADMAP } from "@/lib/enterprise";
import { Badge } from "@/components/ui/badge";
import { Kpi, Panel, SectionTitle } from "./shared";

const TONE = {
  active: "ok",
  pilot: "hold",
  standby: "watch",
} as const;

export function MarketView() {
  return (
    <div className="flex flex-col gap-4">
      <SectionTitle
        kicker="Section 10 · Offtake"
        title="Buyers, grades, reinvestment"
      />
      <p className="max-w-2xl text-sm text-muted">
        Contracts name carcass weight, fat cover, grade and traceability. Contingencies:
        flexibility clauses, emergency sale to approved abattoirs, fallback for underweight
        or non-compliant animals.
      </p>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <Kpi label="Sale weight" value={`${ENTERPRISE.saleWeight} kg`} hint="Last 90 days" />
        <Kpi label="Dressing" value={ENTERPRISE.dressing} hint="Breed and finish" />
        <Kpi label="Fat cover" value={ENTERPRISE.fatCover} hint="P8 / rib" />
        <Kpi label="Margin / hd" value="P 3,320" hint="After P 4,820 cost" />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {BUYERS.map((b) => (
          <Panel key={b.id}>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-2xl text-ink">{b.name}</h3>
              <Badge tone={TONE[b.status]}>{b.status}</Badge>
            </div>
            <p className="mt-2 text-sm text-muted">{b.spec}</p>
            <p className="mt-3 font-mono text-xs text-muted">
              {b.volume} · {b.price}
            </p>
            <p className="mt-1 text-sm text-ink">{b.next}</p>
          </Panel>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <SectionTitle kicker="Carcass mix" title="Grade share" />
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={GRADES} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="grade" tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-paper)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="share" fill="var(--color-accent)" radius={[6, 6, 0, 0]} name="% of kill" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel>
          <SectionTitle kicker="Cycle" title="Reinvest the margin" />
          <ul className="flex flex-col gap-2">
            {REINVEST.map((r) => (
              <li key={r.into}>
                <div className="flex items-baseline justify-between gap-2 text-sm">
                  <span className="text-ink">{r.into}</span>
                  <span className="font-mono text-xs tabular-nums text-muted">{r.share}%</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${r.share * 3}%` }} />
                </div>
                <p className="mt-1 text-xs text-muted">{r.note}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel>
        <SectionTitle kicker="Roadmap" title="Pilot. Prove. Scale." />
        <ol className="grid gap-2 md:grid-cols-5">
          {ROADMAP.map((r, i) => (
            <li
              key={r.id}
              className={`rounded-lg p-3 ${r.now ? "bg-accent text-accent-fg" : "bg-bg-elevated"}`}
            >
              <p className="font-mono text-xs uppercase tracking-wide">0{i + 1}</p>
              <p className={`mt-1 text-sm font-medium ${r.now ? "text-accent-fg" : "text-ink"}`}>
                {r.title}
              </p>
              <p className={`mt-1 text-xs ${r.now ? "text-accent-fg/80" : "text-muted"}`}>{r.detail}</p>
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  );
}
