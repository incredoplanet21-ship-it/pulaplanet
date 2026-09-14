import { CHILL_ROOMS, FLOW_STEPS, HALL_ROOMS, LAIRAGE_PENS, PHASES, ZONES, type Room, type ZoneId } from "@/lib/facility";
import { useStudio } from "@/lib/studio-store";
import { Dim, DrawingSheet, NorthArrow, ScaleBar, TitleBlock } from "./sheet";

function Rooms({
  rooms,
  scale,
  ox,
  oy,
  selectedId,
  onSelect,
}: {
  rooms: Room[];
  scale: number;
  ox: number;
  oy: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      {rooms.map((r) => {
        const active = selectedId === r.id;
        const z = ZONES[r.zone];
        return (
          <g
            key={r.id}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(r.id);
            }}
          >
            <rect
              x={ox + r.x * scale}
              y={oy + r.y * scale}
              width={r.w * scale}
              height={r.h * scale}
              fill={z.fill}
              stroke={active ? "var(--color-ink)" : z.stroke}
              strokeWidth={active ? 2 : 1}
            />
            <text
              x={ox + (r.x + r.w / 2) * scale}
              y={oy + (r.y + r.h / 2) * scale + 3}
              textAnchor="middle"
              fill="var(--color-ink)"
              fontSize={r.w * scale > 70 ? 10 : 8}
              fontFamily="var(--font-sans)"
            >
              {r.name}
            </text>
          </g>
        );
      })}
    </>
  );
}

export function LairagePlan() {
  const selectedId = useStudio((s) => s.selectedId);
  const select = useStudio((s) => s.select);
  const S = 12;
  const OX = 50;
  const OY = 40;
  return (
    <DrawingSheet viewBox="0 0 1020 640" labelledBy="lairage-title">
      <title id="lairage-title">Lairage plan</title>
      <rect x="12" y="12" width="996" height="616" fill="none" stroke="var(--color-ink)" strokeWidth="1.4" />
      <rect x={OX} y={OY} width={70 * S} height={46 * S} fill="var(--color-unclean-soft)" stroke="var(--color-unclean)" />
      <Rooms rooms={LAIRAGE_PENS} scale={S} ox={OX} oy={OY} selectedId={selectedId} onSelect={(id) => select(id === selectedId ? null : id)} />
      <path
        d={`M ${OX + 36 * S} ${OY + 22 * S} L ${OX + 50 * S} ${OY + 25 * S} L ${OX + 54 * S} ${OY + 28 * S}`}
        fill="none"
        stroke="var(--color-unclean)"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      <text x={OX + 38 * S} y={OY + 24 * S - 8} fill="var(--color-unclean)" fontSize="9" fontFamily="var(--font-mono)">
        one-way race to stun
      </text>
      <text x={OX} y={OY - 10} fill="var(--color-muted)" fontSize="10" fontFamily="var(--font-mono)">
        Roofed · paved · 1:50 fall to dirty drain · 120 cattle + 180 small stock
      </text>
      <Dim x1={OX} y1={OY + 46 * S} x2={OX + 50 * S} y2={OY + 46 * S} label="50 m cattle block" offset={18} />
      <NorthArrow x={900} y={48} />
      <ScaleBar x={50} y={590} meters={10} pxPerM={S} />
      <TitleBlock drawing="lairage" x={730} y={538} />
    </DrawingSheet>
  );
}

export function HallPlan() {
  const selectedId = useStudio((s) => s.selectedId);
  const select = useStudio((s) => s.select);
  const S = 14;
  const OX = 40;
  const OY = 50;
  const lineX = OX + 34.2 * S;
  return (
    <DrawingSheet viewBox="0 0 1020 640" labelledBy="hall-title">
      <title id="hall-title">Slaughter hall plan</title>
      <rect x="12" y="12" width="996" height="616" fill="none" stroke="var(--color-ink)" strokeWidth="1.4" />
      <rect x={OX} y={OY} width={52 * S} height={24 * S} fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1.6" />
      <Rooms rooms={HALL_ROOMS} scale={S} ox={OX} oy={OY} selectedId={selectedId} onSelect={(id) => select(id === selectedId ? null : id)} />
      <line x1={lineX} y1={OY} x2={lineX} y2={OY + 18 * S} stroke="var(--color-clean)" strokeWidth="3" />
      <text
        x={lineX + 6}
        y={OY - 8}
        fill="var(--color-clean)"
        fontSize="10"
        fontFamily="var(--font-mono)"
      >
        HYGIENE LINE — no return
      </text>
      <text x={OX + 8} y={OY - 10} fill="var(--color-unclean)" fontSize="10" fontFamily="var(--font-mono)">
        UNCLEAN
      </text>
      <text x={OX + 40 * S} y={OY - 10} fill="var(--color-clean)" fontSize="10" fontFamily="var(--font-mono)">
        CLEAN
      </text>
      <path
        d={`M ${OX + 1} ${OY + 3.2 * S} L ${OX + 51 * S} ${OY + 3.2 * S}`}
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="1.2"
        strokeDasharray="8 4"
      />
      <text x={OX + 18 * S} y={OY + 3.2 * S - 6} fill="var(--color-ink)" fontSize="8" fontFamily="var(--font-mono)">
        overhead dressing rail
      </text>
      <Dim x1={OX} y1={OY + 24 * S} x2={OX + 52 * S} y2={OY + 24 * S} label="52 m" offset={16} />
      <NorthArrow x={900} y={40} />
      <ScaleBar x={40} y={590} meters={5} pxPerM={S} />
      <TitleBlock drawing="hall" x={730} y={538} />
    </DrawingSheet>
  );
}

export function ChillPlan() {
  const selectedId = useStudio((s) => s.selectedId);
  const select = useStudio((s) => s.select);
  const S = 10;
  const OX = 40;
  const OY = 70;
  return (
    <DrawingSheet viewBox="0 0 1020 640" labelledBy="chill-title">
      <title id="chill-title">Chill, bone and dispatch</title>
      <rect x="12" y="12" width="996" height="616" fill="none" stroke="var(--color-ink)" strokeWidth="1.4" />
      <rect x={OX} y={OY} width={80 * S} height={24 * S} fill="var(--color-paper)" stroke="var(--color-ink)" />
      <Rooms rooms={CHILL_ROOMS} scale={S} ox={OX} oy={OY} selectedId={selectedId} onSelect={(id) => select(id === selectedId ? null : id)} />
      <text x={OX} y={OY - 16} fill="var(--color-chill)" fontSize="11" fontFamily="var(--font-mono)">
        0–4 °C carcass air · red offal on separate plant
      </text>
      <path
        d={`M ${OX + 14 * S} ${OY + 12 * S} L ${OX + 70 * S} ${OY + 18 * S}`}
        fill="none"
        stroke="var(--color-clean)"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      <Dim x1={OX} y1={OY + 24 * S} x2={OX + 80 * S} y2={OY + 24 * S} label="80 m cold suite" offset={18} />
      <NorthArrow x={900} y={40} />
      <ScaleBar x={40} y={590} meters={10} pxPerM={S} />
      <TitleBlock drawing="chill" x={730} y={538} />
    </DrawingSheet>
  );
}

const FLOW_PROCESS = FLOW_STEPS.filter((s) => s.side === "process" || s.side === "inspect");
const FLOW_WASTE = FLOW_STEPS.filter((s) => s.side === "waste");

export function FlowPlan() {
  const selectedId = useStudio((s) => s.selectedId);
  const select = useStudio((s) => s.select);
  const unclean = FLOW_PROCESS.filter((_, i) => i < 8);
  const clean = FLOW_PROCESS.filter((_, i) => i >= 8);
  return (
    <DrawingSheet viewBox="0 0 1020 640" labelledBy="flow-title">
      <title id="flow-title">Hygiene and process flow</title>
      <rect x="12" y="12" width="996" height="616" fill="none" stroke="var(--color-ink)" strokeWidth="1.4" />
      <rect x="40" y="40" width="460" height="300" fill="var(--color-unclean-soft)" opacity="0.75" />
      <rect x="520" y="40" width="450" height="300" fill="var(--color-clean-soft)" opacity="0.75" />
      <line x1="500" y1="40" x2="500" y2="340" stroke="var(--color-ink)" strokeWidth="3" />
      <text x="56" y="64" fontFamily="var(--font-mono)" fontSize="12" fill="var(--color-unclean)">
        UNCLEAN / BLACK SIDE
      </text>
      <text x="540" y="64" fontFamily="var(--font-mono)" fontSize="12" fill="var(--color-clean)">
        CLEAN / WHITE SIDE
      </text>
      {unclean.map((step, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 56 + col * 108;
        const y = 88 + row * 110;
        const active = selectedId === step.id;
        return (
          <g
            key={step.id}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              select(active ? null : step.id);
            }}
          >
            <rect
              x={x}
              y={y}
              width="100"
              height="92"
              rx="8"
              fill="var(--color-paper)"
              stroke={active ? "var(--color-ink)" : ZONES[step.zone].stroke}
              strokeWidth={active ? 2 : 1}
            />
            <text x={x + 50} y={y + 28} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="var(--color-muted)">
              {String(step.n).padStart(2, "0")}
            </text>
            {step.name.split(" ").length === 1 ? (
              <text x={x + 50} y={y + 56} textAnchor="middle" fontSize="13" fontFamily="var(--font-sans)" fill="var(--color-ink)">
                {step.name}
              </text>
            ) : (
              <>
                <text x={x + 50} y={y + 50} textAnchor="middle" fontSize="12" fontFamily="var(--font-sans)" fill="var(--color-ink)">
                  {step.name.split(" ")[0]}
                </text>
                <text x={x + 50} y={y + 66} textAnchor="middle" fontSize="12" fontFamily="var(--font-sans)" fill="var(--color-ink)">
                  {step.name.split(" ").slice(1).join(" ")}
                </text>
              </>
            )}
          </g>
        );
      })}
      {clean.map((step, i) => {
        const x = 540;
        const y = 88 + i * 48;
        const active = selectedId === step.id;
        return (
          <g
            key={step.id}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              select(active ? null : step.id);
            }}
          >
            <rect
              x={x}
              y={y}
              width="410"
              height="42"
              rx="8"
              fill="var(--color-paper)"
              stroke={active ? "var(--color-ink)" : ZONES[step.zone].stroke}
              strokeWidth={active ? 2 : 1}
            />
            <text x={x + 24} y={y + 26} fontSize="12" fontFamily="var(--font-mono)" fill="var(--color-muted)">
              {String(step.n).padStart(2, "0")}
            </text>
            <text x={x + 56} y={y + 26} fontSize="13" fontFamily="var(--font-sans)" fill="var(--color-ink)">
              {step.name}
            </text>
          </g>
        );
      })}
      <text x="56" y="370" fontFamily="var(--font-sans)" fontSize="13" fill="var(--color-muted)">
        Staff, livestock, meat and waste each have one direction. Criss-crossing is a DVS refusal.
      </text>
      <text x="56" y="410" fontFamily="var(--font-mono)" fontSize="12" fill="var(--color-effluent)">
        WASTE — never crosses the hygiene line
      </text>
      {FLOW_WASTE.map((step, i) => {
        const x = 56 + i * 230;
        const active = selectedId === step.id;
        return (
          <g
            key={step.id}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              select(active ? null : step.id);
            }}
          >
            <rect
              x={x}
              y="424"
              width="214"
              height="48"
              rx="8"
              fill={ZONES[step.zone].fill}
              stroke={active ? "var(--color-ink)" : ZONES[step.zone].stroke}
            />
            <text x={x + 16} y="454" fontFamily="var(--font-sans)" fontSize="14" fill="var(--color-ink)">
              {step.name}
            </text>
          </g>
        );
      })}
      <TitleBlock drawing="flow" x={730} y={538} />
    </DrawingSheet>
  );
}

export function SectionPlan() {
  return (
    <DrawingSheet viewBox="0 0 1020 640" labelledBy="section-title">
      <title id="section-title">Long section A–A looking north</title>
      <rect x="12" y="12" width="996" height="616" fill="none" stroke="var(--color-ink)" strokeWidth="1.4" />
      <line x1="40" y1="420" x2="980" y2="420" stroke="var(--color-ink)" strokeWidth="1.4" />
      <g fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-muted)">
        <text x="40" y="436">GL</text>
      </g>
      {/* lairage shade */}
      <rect x="50" y="360" width="160" height="60" fill="var(--color-unclean-soft)" stroke="var(--color-unclean)" />
      <line x1="50" y1="360" x2="210" y2="348" stroke="var(--color-ink)" />
      <line x1="210" y1="348" x2="210" y2="360" stroke="var(--color-ink)" />
      <text x="130" y="396" textAnchor="middle" fontSize="10" fill="var(--color-ink)" fontFamily="var(--font-sans)">
        Lairage shade 4.2 m
      </text>
      {/* race */}
      <rect x="210" y="380" width="50" height="40" fill="var(--color-unclean-soft)" stroke="var(--color-unclean)" />
      {/* hall */}
      <rect x="260" y="250" width="280" height="170" fill="var(--color-unclean-soft)" stroke="var(--color-ink)" strokeWidth="1.4" />
      <line x1="260" y1="292" x2="500" y2="292" stroke="var(--color-ink)" strokeDasharray="4 3" />
      <text x="400" y="286" textAnchor="middle" fontSize="9" fill="var(--color-ink)" fontFamily="var(--font-mono)">
        dressing rail 4.2 m
      </text>
      <text x="400" y="340" textAnchor="middle" fontSize="11" fill="var(--color-ink)" fontFamily="var(--font-sans)">
        Slaughter hall · eaves 8.5 m
      </text>
      <line x1="500" y1="250" x2="500" y2="420" stroke="var(--color-clean)" strokeWidth="3" />
      {/* chill */}
      <rect x="500" y="300" width="160" height="120" fill="var(--color-chill-soft)" stroke="var(--color-chill)" strokeWidth="1.4" />
      <text x="580" y="364" textAnchor="middle" fontSize="11" fill="var(--color-ink)" fontFamily="var(--font-sans)">
        Chill 6.0 m · PIR
      </text>
      {/* boning */}
      <rect x="660" y="310" width="140" height="110" fill="var(--color-clean-soft)" stroke="var(--color-clean)" />
      <text x="730" y="370" textAnchor="middle" fontSize="11" fill="var(--color-ink)" fontFamily="var(--font-sans)">
        Boning 5.5 m
      </text>
      {/* dock */}
      <rect x="800" y="330" width="120" height="90" fill="var(--color-chill-soft)" stroke="var(--color-chill)" />
      <text x="860" y="380" textAnchor="middle" fontSize="11" fill="var(--color-ink)" fontFamily="var(--font-sans)">
        Dispatch
      </text>
      <rect x="800" y="400" width="40" height="20" fill="var(--color-surface)" stroke="var(--color-ink)" />
      <text x="50" y="470" fontFamily="var(--font-sans)" fontSize="12" fill="var(--color-muted)">
        Section A–A · west (unclean) → east (clean). Hygiene line is a full-height wall with a carcass rail hatch only.
      </text>
      <text x="50" y="494" fontFamily="var(--font-mono)" fontSize="10" fill="var(--color-muted)">
        Falls: dirty floor 1:50 west to effluent · clean floor 1:80 east to isolated drains
      </text>
      <NorthArrow x={920} y={48} />
      <TitleBlock drawing="section" x={730} y={538} />
    </DrawingSheet>
  );
}

export function UtilitiesPlan() {
  const select = useStudio((s) => s.select);
  const selectedId = useStudio((s) => s.selectedId);
  const blocks: { id: string; name: string; x: number; y: number; w: number; h: number; zone: ZoneId }[] = [
    { id: "effluent-works", name: "Screen / DAF", x: 420, y: 220, w: 140, h: 70, zone: "effluent" },
    { id: "pond-1", name: "Anaerobic 1", x: 60, y: 80, w: 220, h: 120, zone: "effluent" },
    { id: "pond-2", name: "Anaerobic 2", x: 300, y: 90, w: 140, h: 100, zone: "effluent" },
    { id: "facultative", name: "Facultative", x: 580, y: 80, w: 160, h: 90, zone: "effluent" },
    { id: "reed", name: "Reed bed", x: 760, y: 80, w: 160, h: 90, zone: "effluent" },
    { id: "water", name: "Water 150 m³/d", x: 80, y: 280, w: 150, h: 70, zone: "service" },
    { id: "boiler", name: "Boiler 82 °C", x: 250, y: 280, w: 130, h: 70, zone: "service" },
    { id: "plant", name: "Refrigeration", x: 400, y: 320, w: 180, h: 80, zone: "service" },
    { id: "generator", name: "Standby gen", x: 600, y: 320, w: 130, h: 80, zone: "service" },
  ];
  return (
    <DrawingSheet viewBox="0 0 1020 640" labelledBy="util-title">
      <title id="util-title">Effluent and services</title>
      <rect x="12" y="12" width="996" height="616" fill="none" stroke="var(--color-ink)" strokeWidth="1.4" />
      {blocks.map((b) => {
        const z = ZONES[b.zone];
        const active = selectedId === b.id;
        return (
          <g
            key={b.id}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              select(active ? null : b.id);
            }}
          >
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx={b.zone === "effluent" ? 12 : 2}
              fill={z.fill}
              stroke={active ? "var(--color-ink)" : z.stroke}
              strokeWidth={active ? 2 : 1}
            />
            <text x={b.x + b.w / 2} y={b.y + b.h / 2 + 4} textAnchor="middle" fontSize="12" fill="var(--color-ink)" fontFamily="var(--font-sans)">
              {b.name}
            </text>
          </g>
        );
      })}
      <path
        d="M490 255 L180 160 L370 140 L660 125 L840 125"
        fill="none"
        stroke="var(--color-effluent)"
        strokeWidth="2"
        strokeDasharray="5 4"
      />
      <text x="56" y="500" fontFamily="var(--font-sans)" fontSize="13" fill="var(--color-muted)">
        Water: 1,000 L per cattle + 100 L per small stock + wash ≈ 150 m³/day potable.
      </text>
      <text x="56" y="522" fontFamily="var(--font-sans)" fontSize="13" fill="var(--color-muted)">
        Effluent: screen → DAF → anaerobic → facultative → reed bed → irrigation. No river discharge.
      </text>
      <TitleBlock drawing="utilities" x={730} y={538} />
    </DrawingSheet>
  );
}

export function PhasingPlan() {
  return (
    <DrawingSheet viewBox="0 0 1020 640" labelledBy="phase-title">
      <title id="phase-title">Construction phasing</title>
      <rect x="12" y="12" width="996" height="616" fill="none" stroke="var(--color-ink)" strokeWidth="1.4" />
      {PHASES.map((p, i) => (
        <g key={p.id} transform={`translate(48 ${40 + i * 112})`}>
          <rect width="920" height="100" rx="10" fill="var(--color-bg-elevated)" stroke="var(--color-border)" />
          <text x="24" y="32" fontFamily="var(--font-display)" fontSize="22" fill="var(--color-ink)">
            {p.name}
          </text>
          <text x="780" y="32" fontFamily="var(--font-mono)" fontSize="12" fill="var(--color-muted)">
            {p.months}
          </text>
          {p.items.slice(0, 2).map((item, j) => (
            <text key={item} x="24" y={58 + j * 18} fontFamily="var(--font-sans)" fontSize="13" fill="var(--color-muted)">
              {item}
            </text>
          ))}
        </g>
      ))}
      <TitleBlock drawing="phasing" x={730} y={538} />
    </DrawingSheet>
  );
}
