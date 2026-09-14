import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide",
  {
    variants: {
      tone: {
        unclean: "bg-unclean-soft text-unclean",
        clean: "bg-clean-soft text-clean",
        chill: "bg-chill-soft text-chill",
        effluent: "bg-effluent-soft text-effluent",
        service: "bg-surface text-service",
        admin: "bg-bg-elevated text-admin",
        external: "bg-surface text-muted",
        ink: "bg-ink text-paper",
        ok: "bg-ok-soft text-ok",
        watch: "bg-warn-soft text-warn",
        fault: "bg-fault-soft text-fault",
        hold: "bg-chill-soft text-chill",
        planned: "bg-surface text-muted",
        serviceWait: "bg-surface text-service",
      },
    },
    defaultVariants: { tone: "ink" },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
