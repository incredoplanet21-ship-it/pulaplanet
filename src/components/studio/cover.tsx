import { PROJECT } from "@/lib/facility";
import { useStudio } from "@/lib/studio-store";
import { Button } from "@/components/ui/button";

const STATS = [
  { label: "Plot", value: `${PROJECT.plotHa} ha` },
  { label: "Cattle / day", value: String(PROJECT.throughputCattle) },
  { label: "Small stock / day", value: String(PROJECT.throughputSmall) },
  { label: "Chill places", value: String(PROJECT.chillCarcasses) },
  { label: "Water", value: `${PROJECT.waterM3} m³/d` },
  { label: "Staff", value: String(PROJECT.staff) },
];

export function Cover() {
  const setDrawing = useStudio((s) => s.setDrawing);
  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-xl bg-paper shadow-[var(--shadow-border)]">
        <img
          src="/renders/aerial.jpg"
          alt="Aerial view of Tholo Works campus in the Botswana savanna"
          className="h-52 w-full object-cover object-center md:h-80"
        />
        <div className="p-4 md:p-6">
          <p className="font-mono text-xs tracking-widest text-muted uppercase">
            Drawing set 01 · {PROJECT.location}
          </p>
          <h1 className="mt-1 font-display text-3xl leading-tight text-ink md:text-5xl">
            {PROJECT.name}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            DVS-compliant red-meat plant. Clean and unclean paths never cross. Laid out for
            Eighteenth Schedule submission.
          </p>
          <div className="mt-4">
            <Button onClick={() => setDrawing("site")}>Open masterplan</Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-lg bg-paper px-3 py-3 shadow-[var(--shadow-border)]">
            <p className="font-mono text-xs tracking-wide text-muted uppercase">{s.label}</p>
            <p className="mt-1 font-display text-xl text-ink tabular-nums">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {[
          { src: "/renders/lairage.jpg", cap: "Lairage", dwg: "lairage" as const },
          { src: "/renders/hall.jpg", cap: "Process hall", dwg: "hall" as const },
          { src: "/renders/boning.jpg", cap: "Cutting hall", dwg: "chill" as const },
          { src: "/renders/effluent.jpg", cap: "Effluent", dwg: "utilities" as const },
        ].map((p) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setDrawing(p.dwg)}
            className="group overflow-hidden rounded-lg bg-paper text-left shadow-[var(--shadow-border)]"
          >
            <img
              src={p.src}
              alt={p.cap}
              className="h-28 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 md:h-36"
            />
            <p className="px-3 py-2 text-xs text-muted">{p.cap}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
