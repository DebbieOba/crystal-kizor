"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { navigation } from "@/data/content";
import { site } from "@/data/site";
import { trackAttrs } from "@/lib/analytics";
import styles from "./Header.module.css";

const DESKTOP_QUERY = "(min-width: 768px)";
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Solid header after the first scroll. Written straight to the DOM so
  // scrolling never triggers a React render.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const update = () => {
      header.dataset.scrolled = String(window.scrollY > 8);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // While the menu is open: lock page scroll and close if the viewport
  // grows to desktop. Cleanup always restores scrolling.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => {
      root.style.overflow = "";
      desktop.removeEventListener("change", onChange);
    };
  }, [open]);

  // Escape closes; Tab stays inside the header while the menu covers the page.
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!open) return;
    if (event.key === "Escape") {
      close(true);
      return;
    }
    if (event.key !== "Tab" || !headerRef.current) return;
    const focusable = Array.from(headerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (element) => element.getClientRects().length > 0,
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <header ref={headerRef} className={styles.header} data-open={open} onKeyDown={onKeyDown}>
      <div className={styles.bar}>
        <a href="#top" className={styles.brand} onClick={() => close(false)}>
          {site.name}
        </a>

        <nav aria-label="Primary" className={styles.desktopNav}>
          <ul className={styles.desktopList}>
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={styles.desktopLink}
                  {...trackAttrs("nav_click", item.label, "header")}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span aria-hidden="true" className={styles.toggleIcon} />
        </button>
      </div>

      <nav id="mobile-menu" aria-label="Mobile" className={styles.mobileNav}>
        <ol className={styles.mobileList}>
          {navigation.map((item, index) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={styles.mobileLink}
                onClick={() => close(false)}
                {...trackAttrs("nav_click", item.label, "mobile_menu")}
              >
                <span className={styles.mobileIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ol>
        <p className={styles.mobileTagline}>{site.tagline}</p>
      </nav>
    </header>
  );
}
