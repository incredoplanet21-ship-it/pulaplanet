import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import type { AssetStatus } from "@/lib/enterprise";
import { cn } from "@/lib/utils";

export function toneOf(s: AssetStatus): "ok" | "watch" | "fault" | "hold" | "planned" {
  if (s === "service") return "watch";
  return s;
}

export function statusLabel(s: AssetStatus) {
  switch (s) {
    case "ok":
      return "In service";
    case "watch":
      return "Watch";
    case "fault":
      return "Fault";
    case "hold":
      return "Hold";
    case "planned":
      return "Planned";
    case "service":
      return "Service";
  }
}

export function StatusPill({ status }: { status: AssetStatus }) {
  return <Badge tone={toneOf(status)}>{statusLabel(status)}</Badge>;
}

export function Panel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-xl bg-paper p-4 shadow-[var(--shadow-border)] md:p-5",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs tracking-widest text-muted uppercase">{children}</p>
  );
}

export function SectionTitle({
  kicker,
  title,
  action,
}: {
  kicker?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        {kicker ? <Eyebrow>{kicker}</Eyebrow> : null}
        <h2 className="font-display text-2xl leading-tight text-ink md:text-3xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function Kpi({
  label,
  value,
  hint,
  onClick,
}: {
  label: string;
  value: string;
  hint?: string;
  onClick?: () => void;
}) {
  const inner = (
    <>
      <p className="font-mono text-xs tracking-wide text-muted uppercase">{label}</p>
      <p className="mt-1 font-display text-2xl leading-none text-ink tabular-nums md:text-3xl">
        {value}
      </p>
      {hint ? <p className="mt-2 text-xs text-muted">{hint}</p> : null}
    </>
  );
  const cls =
    "rounded-lg bg-paper p-3 text-left shadow-[var(--shadow-border)] md:p-4";
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(cls, "transition-shadow duration-150 hover:shadow-[var(--shadow-border-hover)]")}
      >
        {inner}
      </button>
    );
  }
  return <div className={cls}>{inner}</div>;
}

export function EmptyHint({ children }: { children: ReactNode }) {
  return <p className="text-sm text-muted">{children}</p>;
}

export function KeyRow({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-border py-2 last:border-0">
      <span className="text-xs text-muted">{k}</span>
      <span className="text-right text-sm text-ink tabular-nums">{v}</span>
    </div>
  );
}

export function Inspector({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose?: () => void;
}) {
  return (
    <div className="rounded-lg bg-bg-elevated p-4">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="font-display text-xl leading-tight text-ink">{title}</h3>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="h-11 min-w-11 rounded-md px-2 text-sm text-muted hover:text-ink"
          >
            Close
          </button>
        ) : null}
      </div>
      {children}
    </div>
  );
}
