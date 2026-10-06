import type { Translation } from "./types";

export const en = {
  localeName: "English",
  languageSwitchLabel: "Deutsch",
  skipLink: "Skip to content",
  navigationLabel: "Primary navigation",
  nav: {
    home: "Home",
    support: "Support",
    privacy: "Privacy",
    legalNotice: "Legal notice",
  },
  footer: {
    navigationLabel: "Legal and support",
    status: "Windows preview",
    discordUnavailable: "Discord invite coming soon",
  },
  landingNav: {
    why: "Why Cozy",
    brushes: "Brushes",
    community: "Community",
  },
  pages: {
    home: {
      title: "Cozy Paint Studio — Stylus-first painting for Windows",
      description:
        "Open straight onto an endless canvas, paint with expressive pressure-sensitive brushes, and keep your flow. Cozy Paint Studio launches first on Windows.",
      eyebrow: "Stylus-first painting for Windows",
      heading: "Stay with the mark.",
      intro:
        "Cozy Paint Studio opens straight onto an endless canvas, keeps your work as you paint, and puts expressive brushes close to your pen.",
    },
    support: {
      title: "Support for Cozy Paint Studio",
      description: "Official support information for Cozy Paint Studio on Windows.",
      heading: "Support for Cozy Paint Studio",
      intro: "Something got between you and the painting? We’ll help you make a useful report.",
    },
    privacy: {
      title: "Privacy — Cozy Paint Studio",
      description: "Privacy information for the Cozy Paint Studio app and website.",
      heading: "Privacy",
      intro: "How the desktop app, this website, and the services you choose to visit handle data.",
    },
    legalNotice: {
      title: "Legal notice — Cozy Paint Studio",
      description: "Legal provider information for Cozy Paint Studio.",
      heading: "Legal notice",
      intro: "Provider and contact information for this pre-release website.",
    },
  },
} as const satisfies Translation;
