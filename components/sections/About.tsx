import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Pending } from "@/components/ui/Pending";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <Container className={styles.grid}>
        <div className={`${styles.portrait} reveal`}>
          <Media asset={site.aboutPortrait} sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>

        <div className={styles.copy}>
          <SectionHeading
            id="about-title"
            index="06"
            eyebrow="About Crystal"
            title={
              <>
                The person <em>behind the work.</em>
              </>
            }
          />
          <div className={`${styles.bio} reveal`}>
            <p className={styles.lede}>
              Crystal Kizor is an architect, designer, entrepreneur, speaker, researcher and creator.
            </p>
            <p>
              Her work spans architecture, interiors and construction at Studio COKA; furniture and product
              design through ELEvated; architecture education and media with The Effective Architect;
              opportunities for young people through AKO Alliance; and Alive and Free, a Christian youth
              movement. Running through all of it is her own research, writing and speaking on architecture
              and the built environment.
            </p>
            <Pending>Extended biography, credentials and recognition — content required</Pending>
          </div>

          <dl className={`${styles.roles} reveal`}>
            <dt className="label">Roles</dt>
            <dd>
              <ul className={styles.roleList}>
                {site.roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </dd>
          </dl>
        </div>
      </Container>
    </section>
  );
}
