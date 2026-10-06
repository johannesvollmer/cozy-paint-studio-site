import type { Translation } from "./types";

export const de = {
  localeName: "Deutsch",
  languageSwitchLabel: "English",
  skipLink: "Zum Inhalt springen",
  navigationLabel: "Hauptnavigation",
  nav: { home: "Startseite", support: "Support", privacy: "Datenschutz", legalNotice: "Impressum" },
  footer: {
    navigationLabel: "Rechtliches und Support",
    status: "Windows-Vorschau",
    discordUnavailable: "Discord-Einladung folgt",
  },
  landingNav: { why: "Warum Cozy", brushes: "Pinsel", community: "Community" },
  pages: {
    home: {
      title: "Cozy Paint Studio — Malen mit Stift für Windows",
      description:
        "Öffne direkt eine grenzenlose Leinwand, male mit ausdrucksstarken drucksensitiven Pinseln und bleib im Fluss. Cozy Paint Studio erscheint zuerst für Windows.",
      eyebrow: "Malen mit Stift — zuerst für Windows",
      heading: "Bleib bei der Linie.",
      intro:
        "Cozy Paint Studio öffnet sich direkt auf einer grenzenlosen Leinwand, bewahrt dein Werk beim Malen und bringt ausdrucksstarke Pinsel nah an den Stift.",
    },
    support: {
      title: "Support für Cozy Paint Studio",
      description: "Offizielle Support-Informationen für Cozy Paint Studio unter Windows.",
      heading: "Support für Cozy Paint Studio",
      intro:
        "Etwas steht zwischen dir und deinem Bild? Wir helfen dir, ein nützliches Problemprotokoll zu erstellen.",
    },
    privacy: {
      title: "Datenschutz — Cozy Paint Studio",
      description: "Datenschutzhinweise für die Cozy Paint Studio App und Website.",
      heading: "Datenschutz",
      intro:
        "Wie die Desktop-App, diese Website und freiwillig besuchte externe Dienste mit Daten umgehen.",
    },
    legalNotice: {
      title: "Impressum — Cozy Paint Studio",
      description: "Anbieterkennzeichnung für Cozy Paint Studio.",
      heading: "Impressum",
      intro: "Anbieter- und Kontaktinformationen für diese Vorab-Website.",
    },
  },
} as const satisfies Translation;
