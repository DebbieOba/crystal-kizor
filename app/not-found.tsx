import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: `Page not found — ${site.name}`,
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className={styles.main}>
      <Container className={styles.inner}>
        <p className="label">Error 404</p>
        <h1 className={styles.title}>This page isn&rsquo;t part of the plan.</h1>
        <p className={styles.copy}>The page you were looking for doesn&rsquo;t exist or has moved.</p>
        <Button href="/">Return to {site.name}</Button>
      </Container>
    </main>
  );
}
