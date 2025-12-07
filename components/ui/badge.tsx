import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "outline" | "success" | "warning";

const styles: Record<BadgeVariant, string> = {
  default: "bg-secondary text-secondary-foreground border-transparent",
  outline: "border border-border text-foreground",
  success: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  warning: "bg-amber-500/15 text-amber-700 dark:text-amber-200",
};

export function Badge({
  children,
  className,
  variant = "default",
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

