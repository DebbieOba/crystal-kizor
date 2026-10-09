/**
 * Provider-agnostic analytics.
 *
 * Components never call a vendor SDK directly. Server-rendered elements
 * declare intent with `trackAttrs()` data attributes; a single delegated
 * listener (components/layout/Analytics.tsx) turns clicks into `track()`
 * calls. `track()` forwards to GA4 when configured and always emits a DOM
 * event so the stream can be inspected in tests or bridged to other tools.
 *
 * No personal data is collected: payloads carry only labels and locations.
 */

export const ANALYTICS_EVENT = "ck:analytics";

export type AnalyticsEventName =
  | "page_view"
  | "nav_click"
  | "hero_cta_click"
  | "ecosystem_view"
  | "speaking_view"
  | "initiative_click"
  | "initiative_external_click"
  | "work_item_click"
  | "speaking_cta_click"
  | "contact_click"
  | "email_click"
  | "social_click"
  | "scroll_25"
  | "scroll_50"
  | "scroll_75"
  | "scroll_90"
  | "web_vitals";

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export type AnalyticsPayload = { name: AnalyticsEventName; params: AnalyticsParams };

type Gtag = (command: "event", name: string, params?: AnalyticsParams) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

export function track(name: AnalyticsEventName, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
  window.dispatchEvent(
    new CustomEvent<AnalyticsPayload>(ANALYTICS_EVENT, { detail: { name, params } }),
  );
}

/**
 * Declarative tracking for server components:
 * `<a {...trackAttrs("initiative_click", "studio-coka")}>`.
 */
export function trackAttrs(name: AnalyticsEventName, label: string, location?: string) {
  return {
    "data-track": name,
    "data-track-label": label,
    ...(location ? { "data-track-location": location } : {}),
  };
}
