import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Ideas } from "@/components/sections/Ideas";
import { Positioning } from "@/components/sections/Positioning";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Speaking } from "@/components/sections/Speaking";
import { initiatives } from "@/data/initiatives";
import { site } from "@/data/site";

/** Person structured data — limited strictly to facts from the brief. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  description: site.intro,
  jobTitle: site.roles.slice(0, 5),
  knowsAbout: ["Architecture", "Interior design", "Furniture design", "Climate-responsive design", "African cities"],
  ...(site.contactEmail ? { email: `mailto:${site.contactEmail}` } : {}),
  affiliation: initiatives
    .filter((initiative) => !initiative.anchor)
    .map((initiative) => ({
      "@type": "Organization",
      name: initiative.name,
      description: initiative.description,
      ...(initiative.href ? { url: initiative.href } : {}),
    })),
};

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <span id="top" aria-hidden="true" />
        <Hero />
        <Positioning />
        <Ecosystem />
        <SelectedWork />
        <Ideas />
        <Speaking />
        <About />
        <FinalCTA />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        // Static, build-time data only; `<` is escaped to keep the payload inert.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
