import { cn } from "@/lib/cn";
import styles from "./Pending.module.css";

/**
 * Marks content that is intentionally missing. Searchable in the DOM via
 * `[data-placeholder]` so nothing pending can slip into launch unnoticed.
 */
export function Pending({ children, className }: { children: string; className?: string }) {
  return (
    <span className={cn(styles.pending, className)} data-placeholder>
      [{children}]
    </span>
  );
}
