import type { Locale } from "./site";

export type ReleaseState = "coming-soon" | "alpha" | "beta" | "stable";
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
 * Keep the action disabled until a durable HTTPS Store or access URL exists.
 */
export const releaseChannel: ReleaseChannel = {
  state: "coming-soon",
  access: "none",
  label: {
    en: "Windows preview coming soon",
    de: "Windows-Vorschau kommt bald",
  },
  disclosure: {
    en: "Cozy Paint Studio is a working prototype preparing for a Windows preview.",
    de: "Cozy Paint Studio ist ein funktionsfähiger Prototyp in Vorbereitung auf eine Windows-Vorschau.",
  },
  windowsRequirement: {
    en: "Windows requirements will be confirmed against the release build.",
    de: "Die Windows-Anforderungen werden mit der Veröffentlichungsversion bestätigt.",
  },
};

export function hasStoreDestination(
  channel: ReleaseChannel = releaseChannel,
): channel is ReleaseChannel & { storeUrl: `https://${string}` } {
  return channel.access !== "none" && channel.storeUrl !== undefined;
}
