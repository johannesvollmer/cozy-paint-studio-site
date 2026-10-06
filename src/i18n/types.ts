import type { RouteKey } from "./routes";

type PageCopy = {
  title: string;
  description: string;
  heading: string;
  intro: string;
  eyebrow?: string;
};

export type Translation = {
  localeName: string;
  languageSwitchLabel: string;
  skipLink: string;
  navigationLabel: string;
  nav: Record<RouteKey, string>;
  footer: {
    navigationLabel: string;
    status: string;
  };
  pages: Record<RouteKey, PageCopy>;
};
