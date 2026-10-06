import type { Locale } from "../config/site";

export type RouteKey = "home" | "support" | "privacy" | "legalNotice";

export const localizedRoutes = {
  home: { en: "/", de: "/de/" },
  support: { en: "/support/", de: "/de/support/" },
  privacy: { en: "/privacy/", de: "/de/datenschutz/" },
  legalNotice: { en: "/impressum/", de: "/de/impressum/" },
} as const satisfies Record<RouteKey, Record<Locale, `/${string}`>>;

export function routeFor(route: RouteKey, locale: Locale): string {
  return localizedRoutes[route][locale];
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "en" ? "de" : "en";
}
