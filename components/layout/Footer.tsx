import { initiatives } from "@/data/initiatives";
import { navigation } from "@/data/content";
import { site } from "@/data/site";
import { trackAttrs } from "@/lib/analytics";
import { Container } from "@/components/ui/Container";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer} data-theme="inverse">
      <Container>
        <div className={styles.top}>
          <div className={styles.brandBlock}>
            <p className={styles.wordmark}>{site.name}</p>
            <p className={styles.tagline}>{site.tagline}</p>
          </div>

          <nav aria-label="Ecosystem" className={styles.column}>
            <h2 className={`${styles.columnTitle} label`}>Ecosystem</h2>
            <ul className={styles.list}>
              {initiatives.map((initiative) => (
                <li key={initiative.id}>
                  <a
                    href={initiative.anchor ?? `#${initiative.id}`}
                    className={styles.link}
                    {...trackAttrs("initiative_click", initiative.id, "footer")}
                  >
                    {initiative.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer" className={styles.column}>
            <h2 className={`${styles.columnTitle} label`}>Explore</h2>
            <ul className={styles.list}>
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={styles.link} {...trackAttrs("nav_click", item.label, "footer")}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p>
            © {site.copyrightYear} {site.name}. All rights reserved.
          </p>
          <a href="#top" className={styles.link}>
            Back to top
          </a>
        </div>
      </Container>
    </footer>
  );
}
