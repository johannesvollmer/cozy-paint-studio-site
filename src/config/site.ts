export const SITE = {
  name: "Cozy Paint Studio",
  origin: "https://cozy-paint-studio.johannesvollmer.com",
  defaultLocale: "en",
  supportedLocales: ["en", "de"],
  themeColor: "#454447",
  socialImage: "/images/social-preview.jpg",
} as const;

export const SUPPORT_EMAIL = "cozy-paint-studio@johannesvollmer.com";
export const ADDRESS = `
  Johannes Vollmer,
  Stuttgarter Str. 106,
  70736 Fellbach, Deutschland.
`;

export type Locale = (typeof SITE.supportedLocales)[number];

export function isLocale(value: string): value is Locale {
  return SITE.supportedLocales.includes(value as Locale);
}
