import type { ReactNode } from "react";
import { DRAWINGS, PROJECT, type DrawingId } from "@/lib/facility";
import { cn } from "@/lib/utils";

export function NorthArrow({ x, y, size = 36 }: { x: number; y: number; size?: number }) {
  const s = size;
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden="true">
      <circle cx={s / 2} cy={s / 2} r={s / 2 - 1} fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1" />
      <path d={`M ${s / 2} 6 L ${s / 2 + 7} ${s - 8} L ${s / 2} ${s - 14} L ${s / 2 - 7} ${s - 8} Z`} fill="var(--color-ink)" />
      <text x={s / 2} y={-4} textAnchor="middle" fill="var(--color-ink)" fontSize="9" fontFamily="var(--font-mono)">
        N
      </text>
    </g>
  );
}

export function ScaleBar({
  x,
  y,
  meters,
  pxPerM,
}: {
  x: number;
  y: number;
  meters: number;
  pxPerM: number;
}) {
  const w = meters * pxPerM;
  const half = w / 2;
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden="true">
      <text x="0" y="-6" fill="var(--color-muted)" fontSize="8" fontFamily="var(--font-mono)">
        {meters} m
      </text>
      <rect x="0" y="0" width={half} height="6" fill="var(--color-ink)" />
      <rect x={half} y="0" width={half} height="6" fill="var(--color-paper)" stroke="var(--color-ink)" />
      <text x="0" y="18" fill="var(--color-muted)" fontSize="8" fontFamily="var(--font-mono)">
        0
      </text>
      <text x={w} y="18" textAnchor="end" fill="var(--color-muted)" fontSize="8" fontFamily="var(--font-mono)">
        {meters}
      </text>
    </g>
  );
}

export function TitleBlock({
  drawing,
  x,
  y,
  w = 260,
  h = 78,
}: {
  drawing: DrawingId;
  x: number;
  y: number;
  w?: number;
  h?: number;
}) {
  const d = DRAWINGS.find((item) => item.id === drawing);
  if (!d) return null;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1.2" />
      <line x1="0" y1="22" x2={w} y2="22" stroke="var(--color-ink)" strokeWidth="0.6" />
      <text x="8" y="15" fill="var(--color-ink)" fontSize="10" fontFamily="var(--font-display)">
        {PROJECT.name}
      </text>
      <text x={w - 8} y="15" textAnchor="end" fill="var(--color-muted)" fontSize="8" fontFamily="var(--font-mono)">
        DWG {d.code}
      </text>
      <text x="8" y="42" fill="var(--color-ink)" fontSize="11" fontFamily="var(--font-sans)" fontWeight="600">
        {d.title}
      </text>
      <text x="8" y="58" fill="var(--color-muted)" fontSize="8" fontFamily="var(--font-mono)">
        {PROJECT.location}
      </text>
      <text x="8" y="70" fill="var(--color-muted)" fontSize="8" fontFamily="var(--font-mono)">
        Scale {d.scale} · Rev A · Sept 2026 · For DVS / DEA
      </text>
    </g>
  );
}

export function DrawingSheet({
  children,
  viewBox,
  className,
  labelledBy,
}: {
  children: ReactNode;
  viewBox: string;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      className={cn("h-auto w-full select-none", className)}
      role="img"
      aria-labelledby={labelledBy}
    >
      <rect width="100%" height="100%" fill="var(--color-paper)" />
      {children}
    </svg>
  );
}

export function Dim({
  x1,
  y1,
  x2,
  y2,
  label,
  offset = 10,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  offset?: number;
}) {
  const horizontal = Math.abs(x2 - x1) >= Math.abs(y2 - y1);
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g fill="var(--color-muted)" stroke="var(--color-subtle)">
      {horizontal ? (
        <>
          <line x1={x1} y1={y1 + offset} x2={x2} y2={y2 + offset} strokeWidth="0.6" />
          <line x1={x1} y1={y1 + offset - 4} x2={x1} y2={y1 + offset + 4} strokeWidth="0.6" />
          <line x1={x2} y1={y2 + offset - 4} x2={x2} y2={y2 + offset + 4} strokeWidth="0.6" />
          <text x={mx} y={my + offset + 12} textAnchor="middle" stroke="none" fontSize="8" fontFamily="var(--font-mono)">
            {label}
          </text>
        </>
      ) : (
        <>
          <line x1={x1 + offset} y1={y1} x2={x2 + offset} y2={y2} strokeWidth="0.6" />
          <line x1={x1 + offset - 4} y1={y1} x2={x1 + offset + 4} y2={y1} strokeWidth="0.6" />
          <line x1={x2 + offset - 4} y1={y2} x2={x2 + offset + 4} y2={y2} strokeWidth="0.6" />
          <text
            x={mx + offset + 6}
            y={my + 3}
            stroke="none"
            fontSize="8"
            fontFamily="var(--font-mono)"
          >
            {label}
          </text>
        </>
      )}
    </g>
  );
}
