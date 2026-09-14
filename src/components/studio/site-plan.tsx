import { BUILDINGS, PROJECT, ZONES, type Building } from "@/lib/facility";
import { useStudio } from "@/lib/studio-store";
import { Dim, DrawingSheet, NorthArrow, ScaleBar, TitleBlock } from "./sheet";

const OX = 48;
const OY = 36;
const S = 2.2;

function m(n: number) {
  return n * S;
}

function box(b: Building) {
  return {
    x: OX + m(b.x),
    y: OY + m(b.y),
    w: m(b.w),
    h: m(b.h),
  };
}

const PATH_LIVESTOCK = [
  [16, 198],
  [36, 198],
  [52, 172],
  [96, 148],
  [140, 148],
  [154, 153],
  [172, 148],
  [190, 146],
].map(([x, y]) => `${OX + m(x)},${OY + m(y)}`).join(" ");

const PATH_PRODUCT = [
  [218, 148],
  [240, 148],
  [265, 148],
  [292, 148],
  [310, 146],
  [330, 150],
].map(([x, y]) => `${OX + m(x)},${OY + m(y)}`).join(" ");

const PATH_WASTE = [
  [190, 168],
  [190, 176],
  [188, 55],
  [70, 36],
].map(([x, y]) => `${OX + m(x)},${OY + m(y)}`).join(" ");

export function SitePlan() {
  const selectedId = useStudio((s) => s.selectedId);
  const select = useStudio((s) => s.select);
  const layers = useStudio((s) => s.layers);

  return (
    <DrawingSheet viewBox="0 0 1020 680" labelledBy="site-title">
      <title id="site-title">Tholo Works site masterplan</title>
      <rect x="12" y="12" width="996" height="656" fill="none" stroke="var(--color-ink)" strokeWidth="1.4" />
      <rect x="18" y="18" width="984" height="644" fill="none" stroke="var(--color-ink)" strokeWidth="0.4" />

      <rect x={OX} y={OY} width={m(PROJECT.plotW)} height={m(PROJECT.plotH)} fill="#e8e0d0" stroke="var(--color-ink)" strokeDasharray="4 3" />

      {layers.zones && (
        <>
          <rect x={OX + m(16)} y={OY + m(118)} width={m(200)} height={m(96)} fill="var(--color-unclean-soft)" opacity="0.55" />
          <rect x={OX + m(216)} y={OY + m(118)} width={m(120)} height={m(72)} fill="var(--color-clean-soft)" opacity="0.5" />
          <rect x={OX + m(16)} y={OY + m(12)} width={m(368)} height={m(78)} fill="var(--color-effluent-soft)" opacity="0.45" />
        </>
      )}

      <rect x={OX + m(10)} y={OY + m(198)} width={m(380)} height={m(8)} fill="#d7cfc0" />
      <rect x={OX + m(150)} y={OY + m(88)} width={m(100)} height={m(6)} fill="#d7cfc0" />

      {BUILDINGS.map((b) => {
        const r = box(b);
        const active = selectedId === b.id;
        const z = ZONES[b.zone];
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
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              rx={b.zone === "effluent" && b.w > 40 ? 10 : 1.5}
              fill={z.fill}
              stroke={active ? "var(--color-ink)" : z.stroke}
              strokeWidth={active ? 2.2 : 1}
            />
            {layers.labels && r.w > 28 && r.h > 16 && (
              <text
                x={r.x + r.w / 2}
                y={r.y + r.h / 2 + 3}
                textAnchor="middle"
                fill="var(--color-ink)"
                fontSize={r.w > 70 ? 9 : 7}
                fontFamily="var(--font-sans)"
              >
                {b.short}
              </text>
            )}
          </g>
        );
      })}

      {layers.livestock && (
        <polyline
          points={PATH_LIVESTOCK}
          fill="none"
          stroke="var(--color-unclean)"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
      )}
      {layers.product && (
        <polyline
          points={PATH_PRODUCT}
          fill="none"
          stroke="var(--color-clean)"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
      )}
      {layers.waste && (
        <polyline
          points={PATH_WASTE}
          fill="none"
          stroke="var(--color-effluent)"
          strokeWidth="1.6"
          strokeDasharray="2 4"
        />
      )}
      {layers.personnel && (
        <>
          <polyline
            points={`${OX + m(20)},${OY + m(210)} ${OX + m(174)},${OY + m(128)}`}
            fill="none"
            stroke="var(--color-unclean)"
            strokeWidth="1.2"
            strokeDasharray="1 3"
          />
          <polyline
            points={`${OX + m(390)},${OY + m(210)} ${OX + m(260)},${OY + m(128)}`}
            fill="none"
            stroke="var(--color-clean)"
            strokeWidth="1.2"
            strokeDasharray="1 3"
          />
        </>
      )}

      <g fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-muted)">
        <text x={OX + m(8)} y={OY + m(226)}>Dirty gate</text>
        <text x={OX + m(360)} y={OY + m(226)}>Clean gate</text>
      </g>

      <Dim x1={OX} y1={OY + m(240)} x2={OX + m(400)} y2={OY + m(240)} label="400 m" offset={16} />
      <Dim x1={OX + m(400)} y1={OY} x2={OX + m(400)} y2={OY + m(240)} label="240 m" offset={14} />

      <NorthArrow x={OX + m(372)} y={OY + m(200)} />
      <ScaleBar x={OX + 8} y={OY + m(240) + 36} meters={50} pxPerM={S} />

      <g transform={`translate(${OX + 8} ${OY + m(240) + 62})`}>
        <text fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-muted)">
          {PROJECT.wind}
        </text>
      </g>

      <TitleBlock drawing="site" x={730} y={578} />
    </DrawingSheet>
  );
}
