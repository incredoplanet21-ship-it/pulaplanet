import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ALERTS, CHAIN, ENTERPRISE, KPIS, SERIES } from "@/lib/enterprise";
import { useOps } from "@/lib/ops-store";
import { Badge } from "@/components/ui/badge";
import { toneOf } from "./shared";
import { Kpi, Panel, SectionTitle } from "./shared";
import { RanchMap } from "./ranch-map";

const CHART = SERIES.months.map((m, i) => ({
  m,
  adg: SERIES.adg[i],
  bcs: SERIES.bcs[i],
  water: SERIES.waterKl[i],
  biomass: SERIES.biomass[i],
}));

export function CommandView() {
  const setView = useOps((s) => s.setView);
  const select = useOps((s) => s.select);
  const repaired = useOps((s) => s.repaired);

  return (
    <div className="flex flex-col gap-4 md:gap-5">
      <Panel className="overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-[1.4fr_1fr]">
          <div className="p-5 md:p-7">
            <p className="font-mono text-xs tracking-widest text-muted uppercase">
              {ENTERPRISE.location} · {ENTERPRISE.asOf}
            </p>
            <h1 className="mt-2 font-display text-4xl leading-[0.95] text-ink md:text-5xl">
              {ENTERPRISE.ranch}
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted">
              {ENTERPRISE.hectares.toLocaleString()} ha of semi-arid rangeland, solar water,
              RFID-to-BAITS records, and DVS-ready offtake — from pasture to premium markets.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge tone="ok">{ENTERPRISE.seasonLabel}</Badge>
              <Badge tone="ink">{ENTERPRISE.fmdZone}</Badge>
              <Badge tone="hold">{ENTERPRISE.baits}</Badge>
            </div>
          </div>
          <div className="border-t border-border bg-bg-elevated p-3 lg:border-t-0 lg:border-l">
            <RanchMap compact />
          </div>
        </div>
      </Panel>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {KPIS.map((k) => (
          <Kpi key={k.key} label={k.label} value={k.value} hint={k.hint} />
        ))}
      </div>

      <Panel>
        <SectionTitle kicker="Value chain" title="Land to market" />
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CHAIN.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setView(c.id)}
              className="flex h-11 shrink-0 items-center gap-2 rounded-md bg-bg-elevated px-3 text-sm text-ink transition-colors duration-150 hover:bg-surface"
            >
              <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              {c.label}
            </button>
          ))}
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel>
          <SectionTitle kicker="Alerts" title="What needs a hand" />
          <ul className="flex flex-col gap-2">
            {ALERTS.map((a) => {
              const silent = a.asset === "BH-05" && repaired.includes("BH-05");
              return (
                <li key={a.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setView(a.view);
                      if (a.asset) select(a.asset);
                    }}
                    className="flex w-full min-h-11 items-start gap-3 rounded-md bg-bg-elevated px-3 py-3 text-left transition-colors duration-150 hover:bg-surface"
                  >
                    <Badge tone={silent ? "ok" : toneOf(a.tone)}>
                      {silent ? "Cleared" : a.tone}
                    </Badge>
                    <span>
                      <span className="block text-sm text-ink">{a.title}</span>
                      <span className="block text-xs text-muted">{a.detail}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel>
          <SectionTitle kicker="Twelve months" title="ADG through the dry" />
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} width={32} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-paper)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="adg"
                  stroke="var(--color-accent)"
                  fill="var(--color-accent-soft)"
                  strokeWidth={2}
                  name="ADG kg"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-xs text-muted">
            Green-season gain fades into May–Aug. Licks and destock keep the curve from breaking.
          </p>
        </Panel>
      </div>
    </div>
  );
}
