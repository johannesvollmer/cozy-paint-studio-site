import type { Translation } from "./types";

export const de = {
  localeName: "Deutsch",
  languageSwitchLabel: "English",
  skipLink: "Zum Inhalt springen",
  navigationLabel: "Hauptnavigation",
  nav: {
    home: "Startseite",
    support: "Support",
    privacy: "Datenschutz",
    legalNotice: "Impressum",
  },
  footer: {
    navigationLabel: "Rechtliches und Support",
    status: "Windows-Vorschau",
  },
  pages: {
    home: {
      title: "Cozy Paint Studio — Malen mit Stift für Windows",
      description:
        "Öffne direkt eine grenzenlose Leinwand, male mit ausdrucksstarken drucksensitiven Pinseln und bleib im Fluss. Cozy Paint Studio erscheint zuerst für Windows.",
      eyebrow: "Malen mit Stift — zuerst für Windows",
      heading: "Bleib bei der Linie.",
      intro:
        "Das Fundament steht. Die vollständige, auf Malende ausgerichtete Startseite folgt in der nächsten Lieferphase.",
    },
    support: {
      title: "Support für Cozy Paint Studio",
      description: "Offizielle Support-Informationen für Cozy Paint Studio unter Windows.",
      heading: "Support für Cozy Paint Studio",
      intro:
        "Die Support-Inhalte werden in der Phase der Kernseiten fertiggestellt und verifiziert.",
    },
    privacy: {
      title: "Datenschutz — Cozy Paint Studio",
      description: "Datenschutzhinweise für die Cozy Paint Studio App und Website.",
      heading: "Datenschutz",
      intro:
        "Die endgültige Erklärung benötigt geprüfte Veröffentlichungs- und Hosting-Fakten sowie eine rechtliche Prüfung.",
    },
    legalNotice: {
      title: "Impressum — Cozy Paint Studio",
      description: "Anbieterkennzeichnung für Cozy Paint Studio.",
      heading: "Impressum",
      intro:
        "Die Anbieterangaben werden veröffentlicht, sobald eine ladungsfähige Anschrift freigegeben wurde.",
    },
  },
} as const satisfies Translation;
