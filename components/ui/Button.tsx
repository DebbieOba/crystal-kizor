import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Button.module.css";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
};

/** Call-to-action link. Every CTA on this page navigates, so it is always an anchor. */
export function Button({ href, variant = "primary", className, children, ...rest }: ButtonProps) {
  return (
    <a href={href} className={cn(styles.button, styles[variant], className)} {...rest}>
      <span>{children}</span>
      <svg aria-hidden="true" className={styles.arrow} viewBox="0 0 16 16" width="16" height="16">
        <path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    </a>
  );
}
