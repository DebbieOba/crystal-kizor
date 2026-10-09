import { initiativesByThread, threads } from "@/data/initiatives";
import type { Thread } from "@/data/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InitiativeEntry } from "@/components/ecosystem/InitiativeEntry";
import { InitiativeFeature } from "@/components/ecosystem/InitiativeFeature";
import styles from "./Ecosystem.module.css";

/**
 * Layout follows the data: featured initiatives get image-led features
 * (one runs wide; two form an asymmetric pair), the rest become entries.
 */
function ThreadGroup({ thread }: { thread: Thread }) {
  const members = initiativesByThread(thread.id);
  const featured = members.filter((initiative) => initiative.featured);
  const entries = members.filter((initiative) => !initiative.featured);

  return (
    <div id={`thread-${thread.id}`} className={styles.group}>
      <header className={`${styles.groupHeader} reveal`}>
        <p className={`${styles.groupIndex} label`}>Thread {thread.index}</p>
        <h3 className={styles.groupTitle}>{thread.title}</h3>
        <p className={styles.groupSummary}>{thread.summary}</p>
      </header>

      {featured.length > 0 ? (
        <div className={featured.length > 1 ? styles.pair : styles.single}>
          {featured.map((initiative, index) => (
            <InitiativeFeature
              key={initiative.id}
              initiative={initiative}
              layout={featured.length === 1 ? "wide" : index === 0 ? "lead" : "support"}
            />
          ))}
        </div>
      ) : null}

      {entries.length > 0 ? (
        <div className={styles.entries}>
          {entries.map((initiative) => (
            <InitiativeEntry key={initiative.id} initiative={initiative} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function Ecosystem() {
  return (
    <section
      id="ecosystem"
      className={styles.section}
      aria-labelledby="ecosystem-title"
      data-track-view="ecosystem_view"
    >
      <Container>
        <SectionHeading
          id="ecosystem-title"
          index="02"
          eyebrow="The ecosystem"
          title={
            <>
              Three threads. <em>Seven expressions.</em>
            </>
          }
          intro="Each initiative is a different way into the same body of work. Start with the one closest to why you're here."
        />
        <div className={styles.groups}>
          {threads.map((thread) => (
            <ThreadGroup key={thread.id} thread={thread} />
          ))}
        </div>
      </Container>
    </section>
  );
}
