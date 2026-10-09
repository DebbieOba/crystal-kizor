import { initiatives } from "@/data/initiatives";
import { site } from "@/data/site";
import { trackAttrs } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Container className={styles.grid}>
        <div className={styles.copy}>
          <p className={`${styles.roles} label`}>
            {site.roles.slice(0, 5).map((role) => (
              <span key={role}>{role}</span>
            ))}
          </p>
          <h1 id="hero-title" className={styles.title}>
            {site.headline}
          </h1>
          <p className={styles.intro}>{site.intro}</p>
          <div className={styles.actions}>
            <Button href="#ecosystem" {...trackAttrs("hero_cta_click", "explore_work", "hero")}>
              Explore the work
            </Button>
            <Button href="#speaking" variant="secondary" {...trackAttrs("hero_cta_click", "invite_to_speak", "hero")}>
              Invite Crystal to speak
            </Button>
          </div>
        </div>

        <div className={styles.portrait}>
          <Media asset={site.portrait} sizes="(min-width: 1024px) 40vw, 100vw" preload />
        </div>
      </Container>

      <Container>
        <nav aria-label="Ecosystem index" className={styles.index}>
          <p className={`${styles.indexLabel} label`}>The ecosystem</p>
          <ol className={styles.indexList}>
            {initiatives.map((initiative) => (
              <li key={initiative.id}>
                <a
                  href={initiative.anchor ?? `#${initiative.id}`}
                  className={styles.indexLink}
                  {...trackAttrs("initiative_click", initiative.id, "hero_index")}
                >
                  {initiative.name}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </Container>
    </section>
  );
}
