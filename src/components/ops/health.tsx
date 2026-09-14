import { FMD_STEPS, VAX_SCHEDULE } from "@/lib/enterprise";
import { useOps } from "@/lib/ops-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Panel, SectionTitle } from "./shared";

export function HealthView() {
  const fmdStep = useOps((s) => s.fmdStep);
  const setFmdStep = useOps((s) => s.setFmdStep);

  return (
    <div className="flex flex-col gap-4">
      <SectionTitle
        kicker="Section 06 · Biosecurity"
        title="Herd health and DVS"
      />
      <p className="max-w-2xl text-sm text-muted">
        Movement permits, quarantine, FMD / brucellosis / TB testing, tick control, and
        withdrawal discipline. Nothing leaves Lekhubu without veterinary sign-off.
      </p>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <SectionTitle kicker="Zone schedule" title="Vaccination coverage" />
          <ul className="flex flex-col gap-2">
            {VAX_SCHEDULE.map((v) => (
              <li key={v.name} className="rounded-md bg-bg-elevated px-3 py-3">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm text-ink">{v.name}</p>
                  <p className="font-mono text-xs tabular-nums text-muted">
                    {(v.coverage * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${v.coverage * 100}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted">
                  {v.when} · {v.note}
                </p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <SectionTitle kicker="Transboundary" title="FMD drill" />
          <p className="text-sm text-muted">
            On suspicion: isolate, restrict movement, notify DVS within 24 hours. This is a
            walk-through — it does not file a real report.
          </p>
          <ol className="mt-4 flex flex-col gap-2">
            {FMD_STEPS.map((s) => {
              const done = s.id <= fmdStep;
              const current = s.id === fmdStep + 1;
              return (
                <li
                  key={s.id}
                  className={`rounded-md px-3 py-3 ${
                    done ? "bg-ok-soft" : current ? "bg-warn-soft" : "bg-bg-elevated"
                  }`}
                >
                  <p className="font-mono text-xs text-muted">
                    Step {s.id} {done ? "· done" : current ? "· now" : ""}
                  </p>
                  <p className="text-sm text-ink">{s.title}</p>
                  <p className="text-xs text-muted">{s.detail}</p>
                </li>
              );
            })}
          </ol>
          <div className="mt-4 flex flex-wrap gap-2">
            {fmdStep < FMD_STEPS.length ? (
              <Button size="sm" onClick={() => setFmdStep(fmdStep + 1)}>
                Complete step {fmdStep + 1}
              </Button>
            ) : (
              <Badge tone="ok">Drill complete — farm still clean</Badge>
            )}
            {fmdStep > 0 ? (
              <Button size="sm" variant="outline" onClick={() => setFmdStep(0)}>
                Reset drill
              </Button>
            ) : null}
          </div>
        </Panel>
      </div>

      <Panel>
        <SectionTitle kicker="Gate" title="Biosecurity and parasite control" />
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              t: "Movement",
              d: "DVS permits on every offtake. Quarantine inbound stock. RFID scan at the gate.",
            },
            {
              t: "Vectors",
              d: "Tick surveillance, dip / pour-on, FEC, anthelmintic rotation under the vet.",
            },
            {
              t: "Records",
              d: "Treatment, batch, withdrawal and inspector sign-off live on the animal card.",
            },
          ].map((x) => (
            <div key={x.t} className="rounded-lg bg-bg-elevated p-4">
              <h3 className="font-display text-xl text-ink">{x.t}</h3>
              <p className="mt-2 text-sm text-muted">{x.d}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
