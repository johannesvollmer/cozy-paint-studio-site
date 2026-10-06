import type { Locale } from "../config/site";
import { de } from "./de";
import { en } from "./en";

export const translations = { en, de } as const;

export function useTranslations(locale: Locale) {
  return translations[locale];
}
