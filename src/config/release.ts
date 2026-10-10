import type { Locale } from "./site";

export type ReleaseState = "coming-soon" | "preview" | "alpha" | "beta" | "stable";
export type ReleaseAccess = "none" | "invite-only" | "unlisted" | "public";

export interface ReleaseChannel {
  state: ReleaseState;
  storeUrl?: `https://${string}`;
  access: ReleaseAccess;
  label: Record<Locale, string>;
  disclosure: Record<Locale, string>;
  windowsRequirement: Record<Locale, string>;
}

/**
 * The single source of truth for every Store-facing surface.
 * Keep Store-facing copy and destinations synchronized across the site.
 */
export const releaseChannel: ReleaseChannel = {
  state: "preview",
  storeUrl: "https://apps.microsoft.com/detail/9PPM8C4ZT882",
  access: "public",
  label: {
    en: "Get the free preview from Microsoft Store",
    de: "Kostenlose Vorschau im Microsoft Store",
  },
  disclosure: {
    en: "The Windows preview is available now and free while it remains in preview.",
    de: "Die Windows-Vorschau ist jetzt verfügbar und bleibt während der Vorschauphase kostenlos.",
  },
  windowsRequirement: {
    en: "The preview is available for Windows through Microsoft Store.",
    de: "Die Vorschau ist für Windows im Microsoft Store verfügbar.",
  },
};

export function hasStoreDestination(
  channel: ReleaseChannel = releaseChannel,
): channel is ReleaseChannel & { storeUrl: `https://${string}` } {
  return channel.access !== "none" && channel.storeUrl !== undefined;
}
