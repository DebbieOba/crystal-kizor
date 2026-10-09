import { initiativesByThread, threads } from "@/data/initiatives";
import { site } from "@/data/site";
import { trackAttrs } from "@/lib/analytics";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./Positioning.module.css";

export function Positioning() {
  return (
    <section id="positioning" className={styles.section} aria-labelledby="positioning-title">
      <Container>
        <div className={styles.intro}>
          <SectionHeading
            id="positioning-title"
            index="01"
            eyebrow="The approach"
            title={
              <>
                One body of work. <em>Many expressions.</em>
              </>
            }
          />
          <p className={`${styles.lede} reveal`}>
            Architecture is where Crystal&rsquo;s work begins, not where it ends. The same attention to
            context, materials and people runs through the spaces she designs, the products she makes,
            the knowledge she shares and the communities she serves.
          </p>
        </div>

        <figure className={`${styles.map} reveal`}>
          <figcaption className="visually-hidden">
            How Crystal Kizor&rsquo;s work is organised: three threads — places and objects, knowledge,
            and people — each expressed through her initiatives.
          </figcaption>
          <p className={styles.root}>
            <span className="label">{site.name}</span>
          </p>
          <ol className={styles.threads}>
            {threads.map((thread) => (
              <li key={thread.id} className={styles.thread}>
                <p className={`${styles.threadIndex} label`}>Thread {thread.index}</p>
                <h3 className={styles.threadTitle}>{thread.title}</h3>
                <p className={styles.threadSummary}>{thread.summary}</p>
                <ul className={styles.expressions}>
                  {initiativesByThread(thread.id).map((initiative) => (
                    <li key={initiative.id}>
                      <a
                        href={initiative.anchor ?? `#${initiative.id}`}
                        className={styles.expression}
                        {...trackAttrs("initiative_click", initiative.id, "positioning_map")}
                      >
                        {initiative.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </figure>
      </Container>
    </section>
  );
}
