import { work } from "@/data/content";
import { getInitiative } from "@/data/initiatives";
import type { WorkItem } from "@/data/types";
import { trackAttrs } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Pending } from "@/components/ui/Pending";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./SelectedWork.module.css";

function WorkCard({ item, lead }: { item: WorkItem; lead: boolean }) {
  const initiative = getInitiative(item.initiativeId);
  const initiativeName = initiative?.name ?? "";
  const href = item.href ?? `#${item.initiativeId}`;

  return (
    <article className={cn(styles.card, lead && styles.lead, "reveal")}>
      <div className={styles.media}>
        <Media
          asset={item.media}
          sizes={lead ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 34vw, 100vw"}
        />
      </div>
      <div className={styles.meta}>
        <p className={`${styles.initiative} label`}>{initiativeName}</p>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.context}>{item.context}</p>
        {item.pending ? <Pending>Project name, location and year — content required</Pending> : null}
        <ArrowLink
          href={href}
          external={Boolean(item.href)}
          {...trackAttrs("work_item_click", item.id, "selected_work")}
        >
          {item.href ? `View ${item.title}` : `More from ${initiativeName}`}
        </ArrowLink>
      </div>
    </article>
  );
}

export function SelectedWork() {
  const [lead, ...rest] = work;

  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <Container>
        <SectionHeading
          id="work-title"
          index="03"
          eyebrow="Selected work"
          title={
            <>
              Ideas, <em>built.</em>
            </>
          }
          intro="A curated selection across architecture, interiors and product design — the most tangible evidence of the thinking behind the ecosystem."
        />
        <div className={styles.grid}>
          {lead ? <WorkCard item={lead} lead /> : null}
          <div className={styles.stack}>
            {rest.map((item) => (
              <WorkCard key={item.id} item={item} lead={false} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
