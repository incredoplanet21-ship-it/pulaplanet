import {
  BOREHOLES,
  CAMPS,
  MAP,
  PADDOCKS,
  TROUGHS,
  veldTone,
  type CampId,
  type Paddock,
} from "@/lib/enterprise";
import { useOps } from "@/lib/ops-store";
import { cn } from "@/lib/utils";

function campFill(camp: CampId, use: Paddock["use"], veld: number) {
  if (use === "rehab") return "var(--color-fault-soft)";
  if (use === "calving") return "var(--color-chill-soft)";
  if (use === "grazing") return "var(--color-accent-soft)";
  if (veldTone(veld) === "watch") return "var(--color-warn-soft)";
  return "var(--color-clean-soft)";
}

function campStroke(camp: CampId, use: Paddock["use"]) {
  if (use === "rehab") return "var(--color-fault)";
  if (use === "grazing") return "var(--color-accent)";
  if (camp === "C") return "var(--color-clean)";
  return "var(--color-effluent)";
}

export function RanchMap({
  compact = false,
}: {
  compact?: boolean;
}) {
  const selectedId = useOps((s) => s.selectedId);
  const select = useOps((s) => s.select);
  const setView = useOps((s) => s.setView);
  const repaired = useOps((s) => s.repaired);

  return (
    <svg
      viewBox={`0 0 ${MAP.w} ${MAP.h}`}
      className={cn("h-auto w-full", compact ? "max-h-72" : "max-h-screen")}
      role="img"
      aria-label="Lekhubu Range paddock and water map"
    >
      <rect width={MAP.w} height={MAP.h} fill="var(--color-bg)" />
      {PADDOCKS.map((p) => {
        const active = selectedId === p.id;
        return (
          <g
            key={p.id}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              select(p.id);
              if (compact) setView("land");
            }}
          >
            <rect
              x={p.x}
              y={p.y}
              width={p.w}
              height={p.h}
              rx="10"
              fill={campFill(p.camp, p.use, p.veld)}
              stroke={active ? "var(--color-ink)" : campStroke(p.camp, p.use)}
              strokeWidth={active ? 2.4 : 1.2}
            />
            <text
              x={p.x + 10}
              y={p.y + 22}
              fill="var(--color-ink)"
              fontSize="11"
              fontFamily="IBM Plex Mono, monospace"
            >
              {p.id}
            </text>
            {!compact && (
              <>
                <text
                  x={p.x + 10}
                  y={p.y + 40}
                  fill="var(--color-ink)"
                  fontSize="12"
                  fontFamily="Instrument Sans, sans-serif"
                >
                  {p.name}
                </text>
                <text
                  x={p.x + 10}
                  y={p.y + 58}
                  fill="var(--color-muted)"
                  fontSize="11"
                  fontFamily="IBM Plex Mono, monospace"
                >
                  {p.ha} ha · veld {p.veld}
                </text>
                {p.head > 0 && (
                  <text
                    x={p.x + 10}
                    y={p.y + 76}
                    fill="var(--color-accent)"
                    fontSize="11"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    {p.head} hd
                  </text>
                )}
                {p.use === "rest" && (
                  <text
                    x={p.x + 10}
                    y={p.y + 76}
                    fill="var(--color-muted)"
                    fontSize="11"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    rest {p.rest}d
                  </text>
                )}
              </>
            )}
          </g>
        );
      })}

      {TROUGHS.map((t) => (
        <rect
          key={t.id}
          x={t.x}
          y={t.y}
          width="16"
          height="10"
          rx="2"
          fill="var(--color-chill)"
          opacity="0.85"
        />
      ))}

      {BOREHOLES.map((b) => {
        const down = b.status === "fault" && !repaired.includes(b.id);
        const watch = b.status === "watch";
        const active = selectedId === b.id;
        return (
          <g
            key={b.id}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              select(b.id);
              if (compact) setView("water");
            }}
          >
            <circle
              cx={b.x}
              cy={b.y}
              r={active ? 11 : 9}
              fill={down ? "var(--color-fault)" : watch ? "var(--color-warn)" : "var(--color-chill)"}
              stroke="var(--color-paper)"
              strokeWidth="2"
            />
            <text
              x={b.x + 14}
              y={b.y + 4}
              fill="var(--color-ink)"
              fontSize="10"
              fontFamily="IBM Plex Mono, monospace"
            >
              {b.id}
            </text>
          </g>
        );
      })}

      <rect
        x={MAP.hq.x}
        y={MAP.hq.y}
        width={MAP.hq.w}
        height={MAP.hq.h}
        rx="10"
        fill="var(--color-ink)"
      />
      <text
        x={MAP.hq.x + 16}
        y={MAP.hq.y + 20}
        fill="var(--color-paper)"
        fontSize="12"
        fontFamily="Instrument Sans, sans-serif"
      >
        HQ · crush · dip · biosecurity gate
      </text>
      <text
        x={MAP.hq.x + 16}
        y={MAP.hq.y + 36}
        fill="var(--color-accent-fg)"
        fontSize="10"
        fontFamily="IBM Plex Mono, monospace"
      >
        South access · DVS inspection bay
      </text>

      {!compact &&
        (Object.keys(CAMPS) as CampId[]).map((c, i) => (
          <text
            key={c}
            x={8}
            y={72 + i * 122}
            fill="var(--color-muted)"
            fontSize="11"
            fontFamily="IBM Plex Mono, monospace"
            transform={`rotate(-90 8 ${72 + i * 122})`}
          >
            CAMP {c}
          </text>
        ))}
    </svg>
  );
}
