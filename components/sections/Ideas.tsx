import { ideaStreams } from "@/data/content";
import { trackAttrs } from "@/lib/analytics";
import { enquiryHrefOrContact } from "@/lib/enquiry";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Pending } from "@/components/ui/Pending";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./Ideas.module.css";

export function Ideas() {
  return (
    <section id="ideas" className={styles.section} aria-labelledby="ideas-title">
      <Container>
        <div className={styles.header}>
          <SectionHeading
            id="ideas-title"
            index="04"
            eyebrow="Ideas, research & writing"
            title={
              <>
                Thinking that <em>travels</em> beyond the studio.
              </>
            }
            intro="Alongside her practice, Crystal researches, writes and shares ideas about architecture and the built environment — the thread that ties every initiative together."
          />
        </div>

        <ol className={styles.streams}>
          {ideaStreams.map((stream, index) => (
            <li key={stream.id} className={`${styles.stream} reveal`}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.title}>{stream.title}</h3>
              <p className={styles.description}>{stream.description}</p>
              {stream.latest ? (
                <ArrowLink href={stream.latest.href} external {...trackAttrs("work_item_click", stream.id, "ideas")}>
                  {stream.latest.title}
                </ArrowLink>
              ) : (
                <Pending>{`Latest ${stream.title.toLowerCase()} piece — content required`}</Pending>
              )}
            </li>
          ))}
        </ol>

        <div className={`${styles.footer} reveal`}>
          <p>Commissioning research, an essay or an interview?</p>
          <ArrowLink
            href={enquiryHrefOrContact("general", "Research & writing")}
            {...trackAttrs("contact_click", "research_writing", "ideas")}
          >
            Discuss research or writing with Crystal
          </ArrowLink>
        </div>
      </Container>
    </section>
  );
}
