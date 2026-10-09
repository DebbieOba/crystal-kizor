import { speakingTopics } from "@/data/content";
import { trackAttrs } from "@/lib/analytics";
import { enquiryHrefOrContact } from "@/lib/enquiry";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./Speaking.module.css";

export function Speaking() {
  return (
    <section
      id="speaking"
      className={styles.section}
      aria-labelledby="speaking-title"
      data-theme="inverse"
      data-track-view="speaking_view"
    >
      <Container className={styles.grid}>
        <div className={styles.lead}>
          <SectionHeading
            id="speaking-title"
            index="05"
            eyebrow="Speaking"
            title={
              <>
                Conversations about how we build — <em>and who we build for.</em>
              </>
            }
            intro="Invite Crystal to give a keynote, join a panel or lead a conversation for audiences in architecture, design, business and beyond."
          />
          <div className={`${styles.cta} reveal`}>
            <Button
              href={enquiryHrefOrContact("speaking")}
              {...trackAttrs("speaking_cta_click", "invite_to_speak", "speaking")}
            >
              Invite Crystal to speak
            </Button>
          </div>
        </div>

        <div className={styles.topics}>
          <h3 className={`${styles.topicsTitle} label`}>Speaking topics</h3>
          <ol className={styles.topicList}>
            {speakingTopics.map((topic, index) => (
              <li key={topic} className={`${styles.topic} reveal`}>
                <span className={styles.topicIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {topic}
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
