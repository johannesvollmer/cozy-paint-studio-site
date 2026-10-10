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
    status: "Free Windows preview",
    discordUnavailable: "Discord invite coming soon",
  },
  landingNav: {
    why: "Why it’s different",
    brushes: "Brushes",
    roadmap: "Roadmap",
    story: "My story",
    community: "Community",
  },
  pages: {
    home: {
      title: "Cozy Paint Studio — Organic brushes that scale like vector art",
      description:
        "Soft, pressure-sensitive brush engines meet an endless, fully scalable canvas in an independently built painting app for Windows.",
      eyebrow: "A painting app that gets ouf of your way, all the way",
      heading: "As organic as pixels. As scalable as vectors.",
      intro:
        "Pixel painting feels organic but has a fixed resolution. Vector art scales, but rarely feels like paint. Cozy Paint Studio brings both together: soft, pressure-sensitive brush engines on an endless canvas. Keep zooming in and keep painting.",
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
