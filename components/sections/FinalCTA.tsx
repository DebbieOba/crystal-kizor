import { visitorIntents } from "@/data/content";
import type { VisitorIntent } from "@/data/types";
import { trackAttrs } from "@/lib/analytics";
import { enquiryHref } from "@/lib/enquiry";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Pending } from "@/components/ui/Pending";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./FinalCTA.module.css";

function IntentAction({ intent }: { intent: VisitorIntent }) {
  if (intent.target.type === "anchor") {
    return (
      <ArrowLink href={intent.target.href} {...trackAttrs("contact_click", intent.id, "final_cta")}>
        {intent.action}
      </ArrowLink>
    );
  }

  const href = enquiryHref(intent.target.intent);
  if (!href) return <Pending>Enquiry email — required</Pending>;

  const event = intent.target.intent === "speaking" ? "speaking_cta_click" : "contact_click";
  return (
    <ArrowLink href={href} {...trackAttrs(event, intent.id, "final_cta")}>
      {intent.action}
    </ArrowLink>
  );
}

/** Intent-based routing: visitors pick why they came, not a generic "Contact". */
export function FinalCTA() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <Container>
        <SectionHeading
          id="contact-title"
          index="07"
          eyebrow="Next step"
          title={
            <>
              What brings <em>you here?</em>
            </>
          }
          intro="Choose the path that fits. Enquiries arrive already routed, so the right conversation starts sooner."
        />
        <ul className={styles.intents}>
          {visitorIntents.map((intent) => (
            <li key={intent.id} className={`${styles.intent} reveal`}>
              <p className={styles.prompt}>{intent.prompt}</p>
              <IntentAction intent={intent} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
