import { ENTERPRISE, VIEWS, type ViewId } from "@/lib/enterprise";
import { useOps } from "@/lib/ops-store";
import { Input } from "@/components/ui/input";
import { CommandView } from "./command";
import { GrazingView } from "./grazing";
import { HealthView } from "./health";
import { HerdView } from "./herd";
import { LandView } from "./land";
import { MarketView } from "./market";
import { PlantView } from "./plant";
import { WaterView } from "./water";
import { WorksView } from "./works";
import { cn } from "@/lib/utils";

function ViewBody({ id }: { id: ViewId }) {
  switch (id) {
    case "command":
      return <CommandView />;
    case "land":
      return <LandView />;
    case "water":
      return <WaterView />;
    case "grazing":
      return <GrazingView />;
    case "herd":
      return <HerdView />;
    case "health":
      return <HealthView />;
    case "works":
      return <WorksView />;
    case "market":
      return <MarketView />;
    case "plant":
      return <PlantView />;
  }
}

export function OpsShell() {
  const view = useOps((s) => s.view);
  const setView = useOps((s) => s.setView);
  const query = useOps((s) => s.query);
  const setQuery = useOps((s) => s.setQuery);
  const select = useOps((s) => s.select);

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <header className="flex flex-col gap-3 border-b border-border px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
        <button
          type="button"
          className="flex min-h-11 items-baseline gap-2 text-left"
          onClick={() => setView("command")}
        >
          <span className="font-display text-xl leading-none text-ink sm:text-2xl">{ENTERPRISE.name}</span>
          <span className="hidden font-mono text-xs tracking-wide text-muted uppercase sm:inline">
            {ENTERPRISE.ranch} · {ENTERPRISE.seasonLabel}
          </span>
        </button>
        <form
          className="w-full max-w-sm"
          onSubmit={(e) => {
            e.preventDefault();
            if (query.trim()) {
              setView("herd");
              select(null);
            }
          }}
        >
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Trace RFID or tag…"
            aria-label="Trace animal"
          />
        </form>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <nav
          className="flex shrink-0 flex-row flex-nowrap gap-1 overflow-x-auto border-b border-border p-2 lg:w-52 lg:flex-col lg:overflow-y-auto lg:border-r lg:border-b-0 lg:p-3"
          aria-label="Enterprise sections"
        >
          {VIEWS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setView(v.id)}
              className={cn(
                "flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-3 text-left transition-colors duration-150",
                view === v.id ? "bg-accent text-accent-fg" : "text-muted hover:bg-surface hover:text-ink",
              )}
            >
              <span className="font-mono text-xs">{v.code}</span>
              <span className="text-sm">{v.label}</span>
            </button>
          ))}
        </nav>

        <main className="min-h-0 flex-1 overflow-auto p-3 md:p-5">
          <div className="mx-auto max-w-6xl">
            <ViewBody id={view} />
          </div>
        </main>
      </div>
    </div>
  );
}
