import { useMemo } from "react";
import { ANIMALS, ANIMAL_EVENTS, ENTERPRISE } from "@/lib/enterprise";
import { useOps } from "@/lib/ops-store";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Inspector, KeyRow, Panel, SectionTitle } from "./shared";

const KLASS_TONE = {
  calf: "chill",
  weaner: "hold",
  growing: "ok",
  breeding: "ink",
  finishing: "ok",
  cull: "fault",
} as const;

export function HerdView() {
  const query = useOps((s) => s.query);
  const setQuery = useOps((s) => s.setQuery);
  const selectedId = useOps((s) => s.selectedId);
  const select = useOps((s) => s.select);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ANIMALS;
    return ANIMALS.filter(
      (a) =>
        a.id.toLowerCase().includes(q) ||
        a.rfid.includes(q) ||
        a.breed.toLowerCase().includes(q) ||
        a.klass.includes(q) ||
        a.paddock.toLowerCase().includes(q),
    );
  }, [query]);

  const animal = ANIMALS.find((a) => a.id === selectedId || a.rfid === selectedId);
  const events = animal ? ANIMAL_EVENTS[animal.id] : undefined;

  return (
    <div className="flex flex-col gap-4">
      <SectionTitle
        kicker="Section 04 · Identification"
        title="RFID herd book"
      />
      <p className="max-w-2xl text-sm text-muted">
        Paired electronic and visual tags at birth. Crush-side weights, BCS and treatments
        write to BAITS-compatible records. BAITS is not sole proof of ownership — farm books
        remain the audit trail.
      </p>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Scan RFID, visual tag, breed, class…"
          aria-label="Search herd"
          className="max-w-md"
        />
        <p className="font-mono text-xs text-muted">
          {rows.length} / {ANIMALS.length} shown · herd {ENTERPRISE.herd.toLocaleString()} hd
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_20rem]">
        <Panel className="overflow-x-auto p-0">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="font-mono text-xs tracking-wide text-muted uppercase">
              <tr className="border-b border-border">
                <th className="px-4 py-3 font-medium">Tag</th>
                <th className="px-3 py-3 font-medium">Breed</th>
                <th className="px-3 py-3 font-medium">Class</th>
                <th className="px-3 py-3 font-medium">Kg</th>
                <th className="px-3 py-3 font-medium">BCS</th>
                <th className="px-3 py-3 font-medium">Camp</th>
                <th className="px-3 py-3 font-medium">Hold</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => (
                <tr
                  key={a.id}
                  onClick={() => select(a.id)}
                  className={`cursor-pointer border-b border-border last:border-0 ${
                    selectedId === a.id ? "bg-accent-soft" : "hover:bg-bg-elevated"
                  }`}
                >
                  <td className="px-4 py-3 font-mono text-xs">
                    {a.id}
                    <span className="mt-0.5 block text-muted">{a.rfid}</span>
                  </td>
                  <td className="px-3 py-3">
                    {a.breed}
                    <span className="block text-xs text-muted">
                      {a.sex === "F" ? "Female" : "Male"}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <Badge tone={KLASS_TONE[a.klass]}>{a.klass}</Badge>
                  </td>
                  <td className="px-3 py-3 tabular-nums">{a.kg}</td>
                  <td className="px-3 py-3 tabular-nums">{a.bcs.toFixed(2)}</td>
                  <td className="px-3 py-3 font-mono text-xs">{a.paddock}</td>
                  <td className="px-3 py-3">
                    {a.withdrawal ? (
                      <Badge tone="hold">{a.withdrawal.slice(5)}</Badge>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        {animal ? (
          <Inspector title={animal.id} onClose={() => select(null)}>
            <p className="font-mono text-xs text-muted">{animal.rfid}</p>
            <div className="mt-3">
              <KeyRow k="Breed" v={animal.breed} />
              <KeyRow k="Born" v={animal.born} />
              <KeyRow k="Dam / sire" v={`${animal.dam ?? "—"} / ${animal.sire}`} />
              <KeyRow k="Weight" v={`${animal.kg} kg`} />
              <KeyRow k="BCS" v={animal.bcs.toFixed(2)} />
              <KeyRow k="ADG" v={`${animal.adg} kg/d`} />
              <KeyRow k="Paddock" v={animal.paddock} />
              <KeyRow k="BAITS" v={animal.baits ? "Linked" : "Gap"} />
              <KeyRow k="Vaccinated" v={animal.vax ? "Current" : "Due"} />
              <KeyRow k="Withdrawal" v={animal.withdrawal ?? "Clear"} />
            </div>
            <p className="mt-3 text-sm text-muted">{animal.note}</p>
            {events ? (
              <ol className="mt-4 flex flex-col gap-2">
                {events.map((e) => (
                  <li key={e.date + e.kind} className="rounded-md bg-paper px-3 py-2">
                    <p className="font-mono text-xs text-muted">
                      {e.date} · {e.kind}
                    </p>
                    <p className="text-sm text-ink">{e.detail}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-4 text-xs text-muted">Full lifetime log on the crush tablet.</p>
            )}
          </Inspector>
        ) : (
          <Panel>
            <p className="text-sm text-muted">
              Select an animal, or paste an RFID into search — try{" "}
              <button
                type="button"
                className="font-mono text-accent underline-offset-2 hover:underline"
                onClick={() => {
                  setQuery("98600000001847");
                  select("LK-1847");
                }}
              >
                98600000001847
              </button>
              .
            </p>
          </Panel>
        )}
      </div>
    </div>
  );
}
