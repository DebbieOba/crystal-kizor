import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
};

/**
 * Editorial section header: numbered eyebrow over a display heading.
 * `id` is the heading id the parent section references via aria-labelledby.
 */
export function SectionHeading({ id, index, eyebrow, title, intro, className }: SectionHeadingProps) {
  return (
    <header className={cn(styles.heading, "reveal", className)}>
      <p className={cn(styles.eyebrow, "label")}>
        <span className={styles.index}>{index}</span>
        <span aria-hidden="true" className={styles.rule} />
        {eyebrow}
      </p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {intro ? <p className={styles.intro}>{intro}</p> : null}
    </header>
  );
}
