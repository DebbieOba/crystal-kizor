import type { Initiative } from "@/data/types";
import { trackAttrs } from "@/lib/analytics";
import { initiativeDestination } from "@/lib/enquiry";
import { ArrowLink } from "@/components/ui/ArrowLink";
import styles from "./InitiativeEntry.module.css";

/** Typographic treatment for initiatives without a featured image. */
export function InitiativeEntry({ initiative }: { initiative: Initiative }) {
  const destination = initiativeDestination(initiative);

  return (
    <article id={initiative.id} className={`${styles.entry} reveal`}>
      <p className={`${styles.category} label`}>{initiative.category}</p>
      <h4 className={styles.name}>{initiative.name}</h4>
      <p className={styles.description}>{initiative.description}</p>
      <ArrowLink
        href={destination.href}
        external={destination.external}
        className={styles.link}
        {...trackAttrs("initiative_click", initiative.id, "ecosystem")}
      >
        {destination.label}
      </ArrowLink>
    </article>
  );
}
