import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { Translation } from "../../i18n/types";
import WhySection from "./WhySection.astro";
import FeaturesSection from "./FeaturesSection.astro";
import BrushesSection from "./BrushesSection.astro";
import CommunitySection from "./CommunitySection.astro";
import StorySection from "./StorySection.astro";
import RoadmapSection from "./RoadmapSection.astro";

interface LandingSection {
  id: string;
  label: keyof Translation["landingNav"];
  className: string;
  Content: AstroComponentFactory;
  After?: AstroComponentFactory;
}

// The page and its navigation both render this sequence. IDs belong to the
// shared renderer, never to the individual content components.
export const landingSections: readonly LandingSection[] = [
  {
    id: "why-cozy",
    label: "why",
    className: "statement section-space content-grid",
    Content: WhySection,
    After: FeaturesSection,
  },
  {
    id: "brushes",
    label: "brushes",
    className: "brush-section section-space",
    Content: BrushesSection,
  },
  {
    id: "community",
    label: "community",
    className: "community-section section-space content-grid",
    Content: CommunitySection,
  },
  {
    id: "story",
    label: "story",
    className: "founder-section section-space content-grid",
    Content: StorySection,
  },
  {
    id: "roadmap",
    label: "roadmap",
    className: "roadmap-section section-space",
    Content: RoadmapSection,
  },
];

const ids = landingSections.map(({ id }) => id);
if (new Set(ids).size !== ids.length) {
  throw new Error("Landing section IDs must be unique.");
}
