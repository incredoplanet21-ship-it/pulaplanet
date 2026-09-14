import {
  BOREHOLES,
  ENTERPRISE,
  WATER_CHECKS,
  herdDemandM3,
  liveYieldLs,
  tankCapacityKl,
} from "@/lib/enterprise";
import { useOps } from "@/lib/ops-store";
import { Button } from "@/components/ui/button";
import { Inspector, KeyRow, Kpi, Panel, SectionTitle, StatusPill } from "./shared";
import { RanchMap } from "./ranch-map";

const REPAIR = ["Isolate", "Record", "Repair", "Verify"];

export function WaterView() {
  const selectedId = useOps((s) => s.selectedId);
  const select = useOps((s) => s.select);
  const repaired = useOps((s) => s.repaired);
  const repairStep = useOps((s) => s.repairStep);
  const advanceRepair = useOps((s) => s.advanceRepair);
  const completeRepair = useOps((s) => s.completeRepair);
  const checks = useOps((s) => s.checks);
  const toggleCheck = useOps((s) => s.toggleCheck);

  const bh = BOREHOLES.find((b) => b.id === selectedId);
  const demand = herdDemandM3();
  const tanks = tankCapacityKl();
  const yieldLs = liveYieldLs(repaired);
  const solarHours = 6;
  const dailyKl = +((yieldLs * solarHours * 3.6)).toFixed(1);
  const reserve = +(tanks / demand).toFixed(1);
  const bh05Up = repaired.includes("BH-05");

  return (
    <div className="flex flex-col gap-4">
      <SectionTitle
        kicker="Section 02 · Infrastructure"
        title="Solar water network"
      />
      <p className="max-w-2xl text-sm text-muted">
        Eight off-grid boreholes, 12 tanks, 42 km of HDPE, 36 troughs. Demand is {ENTERPRISE.waterLpd} L
        per mature animal. Reserve band 3–7 days. Faults go isolate → record → repair → verify.
      </p>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <Kpi label="Herd demand" value={`${demand} m³`} hint="1,840 hd × 60 L" />
        <Kpi label="Solar yield" value={`${dailyKl} m³`} hint={`${yieldLs.toFixed(1)} L/s × ${solarHours} h`} />
        <Kpi label="Storage" value={`${tanks} kL`} hint={`${reserve} days at full herd`} />
        <Kpi
          label="BH-05 Tshimo"
          value={bh05Up ? "Online" : "Down"}
          hint={bh05Up ? "Verified after repair" : "Crossfeed from BH-03"}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <Panel className="overflow-hidden p-2 md:p-3">
          <RanchMap />
        </Panel>
        <Panel>
          <SectionTitle kicker="Daily checks" title="13 Sep patrol" />
          <ul className="flex flex-col gap-1">
            {WATER_CHECKS.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => toggleCheck(c.id)}
                  className="flex min-h-11 w-full items-center justify-between gap-3 rounded-md px-2 text-left text-sm hover:bg-bg-elevated"
                >
                  <span>
                    <span className="block text-ink">{c.task}</span>
                    <span className="block text-xs text-muted">{c.cadence}</span>
                  </span>
                  <span className={`font-mono text-xs ${checks[c.id] ? "text-ok" : "text-fault"}`}>
                    {checks[c.id] ? "Logged" : "Open"}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel className="overflow-x-auto p-0">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="font-mono text-xs tracking-wide text-muted uppercase">
            <tr className="border-b border-border">
              <th className="px-4 py-3 font-medium">Borehole</th>
              <th className="px-3 py-3 font-medium">Yield</th>
              <th className="px-3 py-3 font-medium">Tank</th>
              <th className="px-3 py-3 font-medium">Solar</th>
              <th className="px-3 py-3 font-medium">Quality</th>
              <th className="px-3 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {BOREHOLES.map((b) => {
              const status = b.id === "BH-05" && bh05Up ? "ok" : b.status;
              return (
                <tr
                  key={b.id}
                  onClick={() => select(b.id)}
                  className={`cursor-pointer border-b border-border last:border-0 ${
                    selectedId === b.id ? "bg-accent-soft" : "hover:bg-bg-elevated"
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs">{b.id}</span> {b.name}
                  </td>
                  <td className="px-3 py-3 tabular-nums">{b.yieldLs} L/s</td>
                  <td className="px-3 py-3 tabular-nums">{b.tankKl} kL</td>
                  <td className="px-3 py-3 tabular-nums">{b.solarKw} kW</td>
                  <td className="px-3 py-3">{b.quality}</td>
                  <td className="px-3 py-3">
                    <StatusPill status={status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Panel>

      {bh ? (
        <Inspector title={`${bh.id} · ${bh.name}`} onClose={() => select(null)}>
          <StatusPill status={bh.id === "BH-05" && bh05Up ? "ok" : bh.status} />
          <div className="mt-3">
            <KeyRow k="Yield" v={`${bh.yieldLs} L/s`} />
            <KeyRow k="Tank" v={`${bh.tankKl} kL`} />
            <KeyRow k="Array" v={`${bh.solarKw} kW off-grid`} />
            <KeyRow k="Last check" v={bh.lastCheck} />
            <KeyRow k="Quality" v={bh.quality} />
          </div>
          <p className="mt-3 text-sm text-muted">{bh.note}</p>
          {bh.id === "BH-05" && !bh05Up ? (
            <div className="mt-4 rounded-md bg-fault-soft p-3">
              <p className="text-sm text-fault">Repair workflow — 24 h response</p>
              <ol className="mt-2 flex flex-wrap gap-2">
                {REPAIR.map((step, i) => (
                  <li
                    key={step}
                    className={`rounded-full px-3 py-1 font-mono text-xs ${
                      i < repairStep ? "bg-ink text-paper" : "bg-paper text-muted"
                    }`}
                  >
                    {i + 1} {step}
                  </li>
                ))}
              </ol>
              <div className="mt-3">
                {repairStep < 4 ? (
                  <Button size="sm" onClick={() => (repairStep === 3 ? completeRepair() : advanceRepair())}>
                    {repairStep === 3 ? "Verify and return to service" : `Mark ${REPAIR[repairStep]} done`}
                  </Button>
                ) : (
                  <Button size="sm" onClick={completeRepair}>
                    Return BH-05 to service
                  </Button>
                )}
              </div>
            </div>
          ) : null}
        </Inspector>
      ) : null}
    </div>
  );
}
