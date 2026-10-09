import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./ArrowLink.module.css";

type ArrowLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  external?: boolean;
};

/** Inline text link with a directional arrow. Labels should name the destination. */
export function ArrowLink({ href, children, external = false, className, ...rest }: ArrowLinkProps) {
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a href={href} className={cn(styles.link, className)} {...externalProps} {...rest}>
      <span className={styles.text}>{children}</span>
      {external ? <span className="visually-hidden"> (opens in a new tab)</span> : null}
      <svg aria-hidden="true" className={styles.arrow} viewBox="0 0 16 16" width="14" height="14">
        {external ? (
          <path d="M4 12L12 4M5 4h7v7" fill="none" stroke="currentColor" strokeWidth="1.25" />
        ) : (
          <path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.25" />
        )}
      </svg>
    </a>
  );
}
