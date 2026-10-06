import type { RouteKey } from "./routes";

type PageCopy = {
  title: string;
  description: string;
  heading: string;
  intro: string;
  eyebrow?: string;
};

type LandingCopy = {
  why: string;
  brushes: string;
  story: string;
  community: string;
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
    discordUnavailable: string;
  };
  landingNav: LandingCopy;
  pages: Record<RouteKey, PageCopy>;
};
