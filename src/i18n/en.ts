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
  },
  pages: {
    home: {
      title: "Cozy Paint Studio — Stylus-first painting for Windows",
      description:
        "Open straight onto an endless canvas, paint with expressive pressure-sensitive brushes, and keep your flow. Cozy Paint Studio launches first on Windows.",
      eyebrow: "Stylus-first painting for Windows",
      heading: "Stay with the mark.",
      intro:
        "The foundation is ready. The full painter-focused landing page arrives in the next delivery phase.",
    },
    support: {
      title: "Support for Cozy Paint Studio",
      description: "Official support information for Cozy Paint Studio on Windows.",
      heading: "Support for Cozy Paint Studio",
      intro: "Support content will be completed and release-verified in the core-pages phase.",
    },
    privacy: {
      title: "Privacy — Cozy Paint Studio",
      description: "Privacy information for the Cozy Paint Studio app and website.",
      heading: "Privacy",
      intro: "The final policy requires verified release and hosting facts and legal review.",
    },
    legalNotice: {
      title: "Legal notice — Cozy Paint Studio",
      description: "Legal provider information for Cozy Paint Studio.",
      heading: "Legal notice",
      intro: "Provider details will be published after a serviceable address has been approved.",
    },
  },
} as const satisfies Translation;
