export const SITE = {
  name: "Cozy Paint Studio",
  origin: "https://cozy-paint-studio.johannesvollmer.com",
  defaultLocale: "en",
  supportedLocales: ["en", "de"],
  themeColor: "#454447",
} as const;

export type Locale = (typeof SITE.supportedLocales)[number];

export function isLocale(value: string): value is Locale {
  return SITE.supportedLocales.includes(value as Locale);
}
