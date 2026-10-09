import type { Initiative } from "@/data/types";
import { trackAttrs } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { initiativeDestination } from "@/lib/enquiry";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Media } from "@/components/ui/Media";
import styles from "./InitiativeFeature.module.css";

type InitiativeFeatureProps = {
  initiative: Initiative;
  /** wide: sole feature in a thread · lead/support: an asymmetric pair */
  layout: "wide" | "lead" | "support";
};

/** Image-led treatment for featured initiatives. */
export function InitiativeFeature({ initiative, layout }: InitiativeFeatureProps) {
  const destination = initiativeDestination(initiative);
  const sizes =
    layout === "support" ? "(min-width: 1024px) 35vw, 100vw" : "(min-width: 1024px) 50vw, 100vw";

  return (
    <article id={initiative.id} className={cn(styles.feature, styles[layout], "reveal")}>
      {initiative.media ? (
        <div className={styles.media}>
          <Media asset={initiative.media} sizes={sizes} />
        </div>
      ) : null}
      <div className={styles.body}>
        <p className={`${styles.category} label`}>{initiative.category}</p>
        <h4 className={styles.name}>{initiative.name}</h4>
        <p className={styles.description}>{initiative.description}</p>
        <ArrowLink
          href={destination.href}
          external={destination.external}
          {...trackAttrs("initiative_click", initiative.id, "ecosystem")}
        >
          {destination.label}
        </ArrowLink>
      </div>
    </article>
  );
}
