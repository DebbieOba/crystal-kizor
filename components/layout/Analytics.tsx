"use client";

import { useEffect } from "react";
import { useReportWebVitals } from "next/web-vitals";
import { track, type AnalyticsEventName } from "@/lib/analytics";

const SCROLL_MILESTONES = [25, 50, 75, 90] as const;

type WebVitalMetric = Parameters<Parameters<typeof useReportWebVitals>[0]>[0];

// Stable reference so metrics are not reported twice.
function reportWebVital(metric: WebVitalMetric) {
  track("web_vitals", {
    metric: metric.name,
    value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
    rating: metric.rating,
  });
}

/**
 * The page's only analytics code. One delegated click listener reads the
 * `data-track` attributes that server components declare, plus scroll-depth
 * milestones and section-view observation. Renders nothing.
 */
export function Analytics() {
  useReportWebVitals(reportWebVital);

  useEffect(() => {
    track("page_view", { path: window.location.pathname });

    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a, button") : null;
      if (!target) return;

      const href = target.getAttribute("href") ?? "";
      const name = target.getAttribute("data-track") as AnalyticsEventName | null;
      const label = target.getAttribute("data-track-label") ?? undefined;
      const location = target.getAttribute("data-track-location") ?? undefined;

      if (name) track(name, { label, location });
      if (href.startsWith("mailto:")) track("email_click", { label, location });
      if (name === "initiative_click" && /^https?:/.test(href)) {
        track("initiative_external_click", { label, destination: new URL(href).hostname });
      }
    };

    const reached = new Set<number>();
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = (window.scrollY / scrollable) * 100;
      for (const milestone of SCROLL_MILESTONES) {
        if (percent >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          track(`scroll_${milestone}`);
        }
      }
    };

    // Fires once per section when at least 30% of it is on screen.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const name = entry.target.getAttribute("data-track-view") as AnalyticsEventName | null;
          if (name) track(name, { section: entry.target.id });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 },
    );
    document.querySelectorAll("[data-track-view]").forEach((element) => observer.observe(element));

    document.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return null;
}
