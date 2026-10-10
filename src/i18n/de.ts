import type { Translation } from "./types";

export const de = {
  localeName: "Deutsch",
  languageSwitchLabel: "English",
  skipLink: "Zum Inhalt springen",
  navigationLabel: "Hauptnavigation",
  nav: { home: "Startseite", support: "Support", privacy: "Datenschutz", legalNotice: "Impressum" },
  footer: {
    navigationLabel: "Rechtliches und Support",
    status: "Kostenlose Windows-Vorschau",
    discordUnavailable: "Discord-Einladung folgt",
  },
  landingNav: {
    why: "Der Unterschied",
    brushes: "Pinsel",
    roadmap: "Roadmap",
    story: "Meine Geschichte",
    community: "Community",
  },
  pages: {
    home: {
      title: "Cozy Paint Studio — Organische Pinsel, skalierbar wie Vektorgrafik",
      description:
        "Weiche, drucksensitive Pinsel-Engines treffen auf eine grenzenlose, vollständig skalierbare Leinwand — in einer unabhängig entwickelten Mal-App für Windows.",
      eyebrow: "Eine Mal-App die dir nicht im Weg steht, egal wohin du gehst",
      heading: "So organisch wie Pixel. So skalierbar wie Vektoren.",
      intro:
        "Pixelmalerei fühlt sich organisch an, ist aber an eine feste Auflösung gebunden. Vektorgrafik skaliert, fühlt sich aber selten wie Malen an. Cozy Paint Studio bringt beides zusammen: weiche, drucksensitive Pinsel-Engines auf einer grenzenlosen Leinwand. Zoome weiter hinein und male einfach weiter.",
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
