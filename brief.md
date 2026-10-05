# Cozy Paint Studio Website Product and Creative Brief

This document is the self-contained source of truth for designing and building the public website for **Cozy Paint Studio**. It explains the product from a painter’s point of view, defines the landing page and supporting pages, records the visual language of the app, supplies recommended copy, and separates present capabilities from future ambitions. A website team should be able to use this brief without first reading the application repository.

The public product name is always **Cozy Paint Studio**. “Cozy Paint,” “cozy-paint,” and internal crate or executable names are development names and must not appear as the customer-facing brand.

Document date: 5 October 2026. Product state: working prototype moving toward a Windows Store alpha and beta. Any capability marked for release-candidate verification must be checked against the actual Store build before publication.

## The product in one sentence

**Cozy Paint Studio is a stylus-first painting app that gets out of the painter’s way: open it, make a mark immediately, and keep following the idea across an endless canvas.**

The simplest positioning statement is:

> Painting software should feel closer to picking up a sketchbook than starting a project.

The app is deliberately not positioned as a general-purpose image editor, a Photoshop replacement, or a feature-count competitor. It is a focused painting environment in which latency, flow, and the character of a brush matter more than toolbars, dialogs, and configuration.

## The promise to painters

A painter’s daily problem is rarely a lack of features. It is interruption.

The idea arrives, but the app asks for width, height, resolution, color profile, file name, and save location. The hand begins to move, but the stroke visibly follows the pen. The canvas edge appears just when the composition wants more room. A frequently adjusted brush property is buried in a panel. The software’s own interface competes with the painting. Saving becomes another habit the artist must remember. Brushes look like variations of the same stamp instead of distinct tools with their own behavior.

Cozy Paint Studio is valuable because it removes those interruptions one by one:

- There is no new-document ceremony. A new painting is immediately paintable.
- The canvas is infinite and adaptively detailed. No size or DPI decision is required before the first mark.
- Stylus latency is treated as a product feature, measured from input toward the display rather than dismissed as a rendering detail.
- Controls are designed around a pen in one hand and the other hand near the tablet, not around a mouse and a menu bar.
- Work is recorded continuously. A normal close and reopen restores the painting without a manual Save ritual.
- Drawings appear as a wall of their pictures rather than as a list of file names.
- Brushes are conceived as programmable, shareable creative instruments, not merely texture thumbnails.

and:
- Important brush controls can live in a quick-adjust edge column and open under the pen.
- Pressure-sensitive marks are native to the brush system.
- Recently used brushes can be selected through a radial gesture around the pen.
- The brush preview is the actual brush, not a generic circle.

The emotional result should be communicated more strongly than the implementation: **less administration, less hesitation, more time inside the mark.**

## Unique selling points in priority order

The landing page should not give every feature equal weight. The following hierarchy reflects what is distinctive and meaningful to painters.

### Start painting before the idea cools

Most painting applications begin with document administration. Cozy Paint Studio begins with the canvas. No dimensions, DPI, title, or save path are required before drawing.

Painter value: the fragile moment between imagining and making stays intact.

Recommended public phrasing:

> No canvas-size dialog. No setup ritual. Open a fresh painting and make the first mark.

### An endless canvas without an endless slowdown

The drawing surface has no fixed edge and uses a sparse, tiled representation with detail selected for the current view. The architecture is explicitly designed so that a longer painting session must not become progressively slower merely because it contains more work.

Painter value: explore composition, move outward, make studies beside studies, and zoom for detail without predicting the final format at the beginning.

Recommended public phrasing:

> Start anywhere. Follow the painting wherever it needs to go.

> Digital painting apps evolved to simulate the physical pigments. But they all could not solve a fundamental flaw of digital painting: pixels. 

(The apps that chose vector brushes as means to solve pixel problem never really had great organic brushes, due to being vector - Cozy Paint Studio does the exact middleground between pixels and vector)

> Change resolution any time! You can make no mistakes. 

> Half way between Vector and Pixel: Built to export pixels - but not to paint in pixels.

> Remember Mischief and were sad when it was discontinued? This is my next step in the evolution of that idea.

Something like: The app will never be slow (as other apps when choosing too high resolution), and never pixelate your work (as other apps when choosing too low resolution).

Do not call the canvas “infinite resolution.” The honest claim is an infinite, adaptively detailed canvas. Export frames and formal output resolution are planned, not part of the current public capability set.

### Ink that keeps up with the hand

Low latency is a governing design principle. The codebase measures input, frame production, presentation, and display timing, and the Windows roadmap explicitly targets the post-rendering latency that usually dominates the visible gap. The in-process rendering path is already fast; further Windows display-path work is planned.

Painter value: a line feels connected to the gesture. Fast hatching, delicate curves, and confident strokes are easier when the software does not make the hand feel remote.

Recommended public phrasing:

> Built around the distance that matters: the gap between your pen and your paint.

Do not publish a millisecond claim until it has been measured on the shipping build with named hardware and a stated method. Do not claim that all planned Windows low-latency phases have shipped.

### Brushes are engines, not stickers

Every shipped brush uses the same runtime package mechanism available to future third-party brushes. A brush can define its own shader behavior, parameters, textures, color response, spacing, rotation, and other dynamics. Current examples include plain textured marks, round and polygonal shapes, a relief-based paintbrush, and more complex inky marks.

The long-term product idea is a community that creates and exchanges brush models, presets, and images in self-contained `.cozypack` bundles. This exchange format and public sharing workflow are planned, not yet a shipped promise.

Painter value: a brush can embody a visual idea and a working method. The eventual shared object is not merely a tip image; it can be an authored tool.

Recommended public phrasing for the current product:

> Brushes with their own character—and controls that belong to the brush, not to a generic template.

> Each Brush is an engine, not just a bunch of textures. Let AI code your own custom brush that reacts uniquely to pressure. Make a rainbow brush!

> A community that builds and shares **brush engines**

Recommended future-facing phrasing, visibly labeled as a direction:

> We’re building toward brushes artists can make, keep, and trade as complete creative tools.

### A tablet-native interface, launching on Windows

The interaction model was invented for tablets: large physical targets, stylus-aware routing, controls that appear under the pen, a quick-adjust column for the non-painting hand, and a UI that avoids covering the artwork unnecessarily. Windows is the first release platform because it provides the fastest development and testing loop. Android and browser shells are planned; touch gesture work is designed but postponed.

Painter value: this is not a desktop editor shrunk onto glass. The interface begins with the body posture of drawing.

A sleek UI, just like tablet apps, not a monster of a million menus as most desktop apps.

> Carries the clean design of a tablet-born app to the desktop.

> A UI well thought through - Not just another Photoshop Clone 

This line must be accompanied by an explicit Windows requirement near the download call to action so nobody assumes that an Android or iPad build is already available.

### Saving should not be a thought

Strokes are appended to the drawing’s source-of-truth log, and work survives closing and reopening the app. The Store-release plans move user drawings to a visible folder under Documents so that an MSIX uninstall does not remove them. Sharing a drawing as a portable exchange file is planned.

Painter value: closing the app is not a test of whether the last save was recent enough.

Recommended public phrasing:

> Your painting is recorded as you work. Close the app; come back to the marks.

Avoid “crash-proof,” “never lose work,” or “power-cut safe.” The present implementation does not promise an `fsync` after every stroke and explicitly acknowledges that the newest stroke can be lost after a power failure.

> Undo all the way back to the blank canvas, no matter if you closed the app, or uninstalled it, or send your files to somewhere else

> It's not your task to manage files, choose paths, open folders using the dialog, save new versions. Just paint!

## The people the website speaks to

The primary audience is the painter who owns or uses a Windows pen device: a pen display, convertible laptop, Surface-class device, or a graphics tablet paired with a Windows screen. They may be a professional illustrator, concept artist, hobby painter, art student, visual note-taker, or someone who simply enjoys making marks.

They are united less by profession than by working preference:

- They want to draw before they want to configure.
- They notice the physical feel of software—the lag, reach, interruption, and visual noise.
- They care about the behavior of a brush, not just the number of brushes listed.
- They are comfortable joining an alpha or beta if the purpose is clear and feedback visibly matters.
- They may be tired of heavyweight software but do not want to be patronized with a toy.

The secondary audience is brush makers and technically curious artists. They should recognize that the brush system is unusually open-ended, but the main page must not turn into engine documentation. A short expandable technical note or a later dedicated page can explain packages, shaders, and `.cozypack` once those are user-facing.

The website is not primarily for investors, enterprise buyers, photo editors, layout designers, or people seeking collaborative cloud documents. Do not dilute the page with generic productivity language.

## Painter jobs and the value delivered

| When the painter needs to | The familiar friction | Cozy Paint Studio’s answer | Website proof |
|---|---|---|---|
| Catch an idea immediately | New-document dialogs and file decisions | A fresh painting opens ready for a mark | A short clip that enters a new painting and draws without a dialog |
| Explore a composition | The canvas boundary was chosen too early | Infinite, adaptive canvas | A continuous zoom and pan from a small study into fine marks |
| Draw a confident line | Ink trails the hand | Latency is measured and designed as a first-order feature | Macro pen footage or honest side-by-side capture from the shipping build |
| Change a brush without breaking posture | Panels and cursor travel interrupt the hand | Quick-adjust controls and a recent-brush wheel live near the pen | A close interaction clip, ideally from an overhead hand view |
| Understand what a brush will do | A generic cursor or thumbnail hides its real footprint | Real brush preview and rendered swatches | A cursor preview crossing light and dark artwork |
| Return tomorrow | Saving and file management become chores | Work is recorded continuously and appears as image cards | Close and reopen the same drawing; show the project wall |
| Make a tool feel personal | Generic global sliders make every brush alike | Each brush declares its own meaningful controls and resources | Three visibly different brushes with their own control sets |
| Learn and exchange | Isolated workflows and disposable presets | Discord now; shareable packs are the direction | Community invitation, clearly separate from official support |

## Product truth and claims policy

Plans in the repository are explicitly “designed but not built.” The website must never flatten current behavior, work in progress, and long-term direction into one feature list.

### Safe to present as current prototype capabilities

- Windows application with native stylus input.
- Infinite canvas.
- Immediate painting without choosing a document size.
- Pressure-sensitive painting; the default plain brush can use pressure for width.
- Multiple runtime-loaded, shader-defined brushes and presets.
- Textured, rotated, round, squished, polygonal, paintbrush-like, and inky brush behavior represented in the shipped brush packages.
- Brush selection, full brush browsing, recent-brush radial selection, and brush-specific controls.
- On-canvas brush preview using the real brush footprint.
- A color picker based on Oklab.
- Continuous project persistence sufficient for work to survive a normal close and reopen.
- Undo and redo with infinite persistent history, with the honest caveat that deep history may currently rebuild slowly.
- Pan and zoom with desktop input.
- A project wall made from painting thumbnails.
- Screenshots or videos from the UI
- Local-first operation. The app does not and will not require an account or cloud service.
- Everything offline, nothing gets send, no image generation AI ever (we welcome claude code for brush packages though)
- Some basic brushes, but not an extensive library yet

### Verify in the exact alpha or beta build before publishing

- Color pipette or eyedropper. The implementation contains pipette interaction and tests, while the product README still lists the feature as ahead. Verify the release candidate and then either demonstrate it or omit it.
- Importing a painter’s own brush images. The repository contains image selection and import paths, while some planning documents still describe parts of user-selectable project images as unfinished. Verify end-to-end behavior.
- Exact brush names and which presets ship. Capture them from the build rather than copying development package names.
- Undo and redo controls and their empty-state behavior.
- Location and visibility of stored drawings in the packaged build.
- The final application title, package identity, icon, publisher name, system requirements, architecture support, and Store channel.
- Any “offline” claim. The application core is local-first and the planned About links open a browser, but packaging and Store behavior must be checked.

### Planned and suitable only for a labeled roadmap or “what we are building” section

- Microsoft Store public distribution until the listing actually exists.
- Windows alpha and beta access until the corresponding Store audience links work.
- Direct multi-touch pan and pinch navigation.
- Handedness settings and user-assigned tablet buttons.
- Share a project.
- `.cozypack` import, export, and community exchange.
- Portable `.cozydoc` drawings.
- Custom brush packages.
- Smudge or paint pickup.
- Erasing with any brush.
- Wet edges and per-stroke opacity caps.
- Export frames and image export.
- Move, liquify, layers, and clipping groups.
- Immediate deep undo
- Android and browser versions.
- A built-in community gallery or brush marketplace.
- Gradient Maps, Filters, Color Adjustments
- Reference Image Import
- Visualized undo history, Branches, Forks, Merging, etc

### Claims the website must not make

- “Available on Android,” “available on tablets,” or “available in your browser.”
- “Zero latency,” “instantaneous,” or an unsupported numeric latency claim.
- “Lossless forever,” “crash-proof,” or “you can never lose a stroke.”
- “Infinite resolution.”
- “Full tilt and twist brush support.” The input is decoded, but current shipped brushes do not yet use tilt and twist as general modulation sources.
- “Exports at any resolution” before frames and export ship.
- “Share brushes” before `.cozypack` import and export ship.
- “Private because we collect nothing” without distinguishing the desktop app, the website host’s access logs, Microsoft Store processing, and the optional Discord link.
- “Open source” unless that public positioning is intentionally approved. The repository is dual-licensed, but a public product claim should still be a product decision.

### What must be said somewhere

- Build with the help of AI (but do not worry, I am a professional software engineer, it is not vibe coded).

## The author's personal story

> When I was 12, I started to learn Photoshop and blender. That is what got me into programming in the first place. Graphics programming, generative art, procedural generation. I've always wanted to build a better Photoshop. I built many small proof of concepts, prototypes. That's why I am a professional software engineer and UX designer today. I am a passionate oil painter, and bringing this lifelong dream of mine to life. I want to make this project open source in the future, but I want to build the community first, so it will not be just copied by some greedy publicly listed company. Don't worry, this will never evolve into the overloaded Photoshop monster. It will remain an ultra focused painting app. This is my passion, it is everything I ever worked towards. 

> Ever since I tried Mischief, I was amazed. Perhaps you remember too? It just felt magical. I was so sad when I heard that Mischief was discontinued. That's why I built this app to feel the same, but without the limitations of Mischief. Brushes can be textured, colored, they can be full blown brush engines with custom rendering code. I built it to do all the stuff that pixel-based painting apps do, just at any resolution.

## Brand character and voice

Cozy means calm, close at hand, and hospitable. It must not mean childish, sleepy, imprecise, or unserious. Studio means a place where real work can happen. Together, **Cozy Paint Studio** should feel like a favorite physical workspace: quiet enough to think in, distinctive enough to love, and robust enough to trust with a long painting.

The voice should be:

- Direct and warm.
- Painter-centered rather than technology-centered.
- Confident about decisions, candid about beta status.
- Sensory when describing the act of painting.
- Precise when describing availability and limitations.
- Lightly playful in small interface labels, never cute at the expense of clarity.

Prefer:

> Make the mark while it is still in your hand.

Over:

> Leverage our high-performance GPU architecture for enhanced creative productivity.

Prefer:

> Join the Windows alpha.

Over:

> Download the revolutionary future of digital creativity today.

Words that fit: paint, mark, hand, pen, canvas, brush, flow, quiet, room, character, texture, studio, sketch, return, yours.

Words to avoid unless literally required: solution, workflow optimization, powerful, intuitive, seamless, game-changing, ecosystem, AI-powered, infinite resolution.

### Focus on the author

I am Johannes Vollmer, hobby oil painter and creative mind, professional software engineer and designer, brought this to life in his free time. This is a personal project born out of passion, not a venture capital cash grab. 
A few weird grammatical soft-errors are okay. It can be personal. But no spelling mistakes or real grammatical errors. 

This product is my personal dream. I wrote this. The website should subtly communicate that. You may see the Kala Paint website for reference, it is a similar story (but not exactly the same of course).

## Website goals and conversion order

The site has four jobs, in this order:

1. Make a painter understand the product’s difference within one screen.
2. Convert an interested Windows painter into the currently available Store alpha or beta channel.
3. Invite conversation and exchange in Discord without presenting Discord as required or as official support.
4. Provide durable support, privacy, and legal URLs for the Microsoft Store and the app’s About page.

The primary conversion is the Microsoft Store channel. The secondary conversion is Discord. Email is the official support route. These roles must remain visually and semantically distinct.

Success measures should be privacy-preserving. If the site remains analytics-free as planned, use Store acquisition data and Discord invite joins rather than adding third-party tracking. Server logs should not be repurposed into behavioral analytics without revising the privacy policy.

## Required information architecture

The minimum routes are:

```text
/
├── /support
├── /privacy
├── /impressum
├── /de/
│   ├── /de/support
│   ├── /de/datenschutz
│   └── /de/impressum
└── /terms                 only if a real need is established
```

The landing, support, privacy, and legal notice pages must each have stable, direct HTTPS URLs. The Store needs a website and support destination; a Win32 or Desktop Bridge product must have a privacy policy under current Microsoft Store policy even when it does not collect personal information. The legal notice must be easy to find, directly reachable, and continuously available where German law applies.

The footer on every page must link to Support, Privacy or Datenschutz, Impressum or Legal notice, the language switcher, and Discord. “Terms” is shown only when a real terms page exists.

Do not create a blog, account system, mailing list, contact form, cookie banner, gallery, marketplace, or documentation section for the first release. Each adds maintenance, moderation, personal-data processing, or empty navigation without helping the alpha launch.

## Landing page structure and recommended copy

The page should feel like entering the app: artwork fills the available space, while controls appear as tactile patterned objects around it. It may be more theatrical than the product UI, but it should use the same materials and proportions.

### Header

Keep the header small and fixed or gently sticky. It should contain:

- Cozy Paint Studio wordmark at left.
- “Why Cozy,” “Brushes,” and “Community” anchors on wider screens.
- A language toggle, `EN / DE`.
- One primary status-aware Store button at right.

Do not reproduce a generic SaaS navigation bar. The header should resemble one of the app’s opaque halftone surfaces, with the artwork visually continuing behind the space around it.

### Hero

Eyebrow:

> Stylus-first painting for Windows

Headline:

> Stay with the mark.

Body:

> Cozy Paint Studio opens straight onto an endless canvas, keeps your work as you paint, and puts expressive brushes close to your pen. No size dialog. No save ritual. Less between the idea and your hand.

Primary call to action by release state:

- Before Store access: **Windows alpha coming soon**. The control must not look clickable unless it opens a useful Store registration or access page.
- Closed or invite alpha: **Join the Windows alpha**.
- Public beta: **Get the Windows beta**.
- Stable release: **Get it from Microsoft** using the official Store badge and asset rules.

Secondary call to action:

> Join the Discord

Small availability line:

> Designed for tablets. First release: Windows. Android and web are later directions, not current downloads.

Hero visual: a real app capture with a painterly work in progress, one quick-adjust control open under the pen, and enough clear canvas to understand the interface. If practical, layer a real pen or hand above the capture in video. Never build a fictional UI montage that suggests tools the app does not have.

Optional hero ambient motion: the three halftone ink layers may drift by a few pixels at different speeds while the pointer is not over a control. Respect `prefers-reduced-motion`, stop the movement when the tab is hidden, and do not make the dots shimmer or crawl behind text.

### The friction statement

Heading:

> The idea should come before the setup.

Copy:

> A blank document should not begin with paperwork. Cozy Paint Studio skips the width, height, DPI, file name, and save location. A new painting is simply there—ready for the first line.

Proof visual: a three-beat clip or scroll sequence: project wall, new card, first mark. No dialog appears.

#### Embed The Real Deal as WASM?

Idea: Can we add a reduced cozy-paint canvas to the website? The real thing? Of course, just as a toy. No file persistence, no dynamic stuff, perhaps not even a UI? Just the engine in paint mode, with a random brush on each stroke or something similar? Zooming should be possible though. Or perhaps the whole background is a painter app? Or perhaps the app logo is in that canvas? (regular mouse scroll should not zoom though).

Or perhaps it should only activate on click, to avoid the wasm download blocking anything else, and to prevent the painting engine from eating the framerate and latency on every visit by default.

### Three core benefits

Use three large editorial blocks, not a six-card feature grid.

#### Room to follow the painting

> The canvas has no edge you need to choose in advance. Pull back to explore, move outward when the composition grows, and come close for detail.

Supporting label: **Infinite, adaptive canvas**.

#### Ink close to the pen

> A painting app lives or dies in the space between motion and mark. Cozy Paint Studio measures that space and builds around making it smaller.

Supporting label: **Latency is a feature**.

#### Your work, already kept

> Paint, close, return. The drawing is recorded as you work, without turning Save into another interruption.

Supporting label: **Continuous local persistence**.

### The interface follows the hand

Heading:

> Controls where the hand already is.

Copy:

> Hold a brush control and its adjustment appears beneath the pen. Keep favorite properties on the tablet edge for the other hand. Reach for a recent brush with a radial gesture instead of hunting through a palette.

Use a close-up interaction sequence showing one property scrub and the recent-brush wheel. Explain the posture visually: pen hand in the canvas, other hand near the edge column. Do not show unbuilt handedness switching as a current feature.

### Brushes with character

Heading:

> A brush can be an idea, not just an image.

Copy:

> Every Cozy Paint Studio brush is a brush engine on its own. One may be a clean textured pencil; another a relief-rich paintbrush, a sharp polygon, or colorful rainbow that reacts dynamically to pressure! You can expose sliders, images, and color properties controls to the painter.

Use a horizontal “brush table” of real rendered swatches. Each swatch should be labeled with the name shown in the release build and one meaningful characteristic, such as pressure-shaped width, paper relief, polygon sides, or ink buildup. Let AI code a brush for you!

Add a visually subordinate future note:

> The direction: self-contained packs of brush models, presets, and textures that artists can exchange. Join the Discord to follow and shape that work.

Do not place a “Download brushes” button until import and export are genuinely usable.

### Projects as pictures

Heading:

> Find the painting by seeing it.

Copy:

> Cozy Paint Studio opens onto a wall of work. Wide sketches stay wide. Tall studies stay tall. The image—not a generated file name—is the identity you reach for.

The web composition may echo the app’s brick-masonry project wall. Use real, permission-cleared art. Include the “new painting” brick as a simple plus card.

### Built for tablets, Windows first

Heading:

> Born on glass. Beginning on Windows.

Copy:

> The interface was designed around a stylus, touch-sized controls, and the reach of two hands on a tablet. Windows is the first release platform while the tablet foundations continue toward Android.

Show a Windows pen display or convertible, not an iPad or Android tablet that would imply current availability. If a generic device frame is used, the Windows status must sit inside the same composition.

### Alpha or beta expectations

This section is required while the product is pre-1.0.

Heading:

> A working studio, still being built.

Recommended alpha copy:

> The Windows alpha is for painters who enjoy trying an early tool and telling us where it breaks the flow. Core painting works; parts of export, touch navigation, sharing, packaging, and polish are still on the easel. Expect changes, and keep copies of work you cannot replace.

Recommended beta copy:

> The Windows beta is ready for broader painting and feedback, but it is still pre-release software. Some planned tools and platform work are not finished. The Store keeps the app updated; the release notes say what changed.

Add links to the Store channel and support page. Never hide “alpha” or “beta” in fine print.

### Community

Heading:

> Bring the brush marks. Stay for the exchange.

Copy:

> Share what you made, compare brushes, ask for help, and influence what comes next in the Cozy Paint Studio Discord.

Suggested initial channel purposes, without exposing internal naming if the actual server differs:

- Announcements for releases and known issues.
- Feature requests grounded in real painting work.
- Show your art.
- Brush models and future `.cozypack` exchange.
- Community help.
- General conversation.

Disclosure beside the call to action:

> Discord is a third-party service with its own terms and privacy policy. The Cozy Paint Studio app does not connect to Discord.

Do not embed a Discord widget, member counter, online-status script, or remote avatar grid. Use a normal link. Discord is not the official support channel; support remains an email address on the owned domain.

### Final call to action

Heading:

> Make the first mark.

Body:

> Cozy Paint Studio is coming first to Windows through the Microsoft Store.

Buttons: the same status-aware Store action as the hero and a secondary Discord link.

### Footer

Include the full product name, a short status such as “Windows alpha,” copyright owner and year, Support, Privacy, Impressum, language switcher, Discord, and Microsoft Store link when live.

Do not put repository names, build hashes, internal plan links, or unapproved social accounts in the public footer.

## Visual design system for the website

The website should inherit the app’s material language rather than merely borrowing its colors. The defining visual is an opaque dark surface printed with three rotated fields of small colored dots. It feels somewhere between screen print, art paper, and a well-used studio object.

### Typography

Use the exact vendored app family:

- **Iosevka Charon Mono Regular** for body copy, navigation, buttons, labels, captions, and numerical details.
- **Iosevka Charon Mono Medium** for headings and stronger labels.
- Material Symbols Rounded may be used for ordinary interface icons when licensing and subset delivery are handled correctly.

Self-host the font files. Do not request Google Fonts or another font CDN. Prefer WOFF2 web subsets derived from the licensed TTFs, preserving the font’s OFL notice. Use system monospace only as a fallback.

Suggested web scale, adjusted for reading rather than copied literally from the app:

```css
--font-body: "Iosevka Charon Mono", ui-monospace, monospace;
--text-small: clamp(0.78rem, 0.74rem + 0.15vw, 0.9rem);
--text-body: clamp(1rem, 0.95rem + 0.25vw, 1.2rem);
--text-lead: clamp(1.18rem, 1rem + 0.7vw, 1.65rem);
--text-h2: clamp(2rem, 1.3rem + 3vw, 4.5rem);
--text-hero: clamp(3.1rem, 1.5rem + 7vw, 8.5rem);
```

The monospace face gives the product its identity, but long legal text needs comfortable measure and line height. Keep body columns around 62–72 characters and use a line height near 1.55.

### Core palette

These values come directly from the app's current dark theme:

| Role | Value | Web use |
|---|---:|---|
| Ground and opaque container | `#454447` | Page furniture, chips, nav surfaces |
| Raised card tint | `#2F1E3B` at 30% | Cards over the ground |
| Control purple | `#635A72` at 50% | Resting controls and secondary tags |
| Engaged purple | `#635A72` | Active structural controls |
| Warm halftone ink | `#5F403D` at 40% | Dot layer at 0° |
| Purple halftone ink | `#5D445B` at 40% | Dot layer at +120° |
| Olive halftone ink | `#817560` at 40% | Dot layer at −120° |
| Hover brown | `#695353` | Hover surface and inverted text color |
| Active blush | `#DDBFBF` | Primary highlight and selected controls |
| Field outline | `#DDBFBF` at 60% | Fine borders and input outline |
| Primary text | `#FFFFFF` | Main text |
| Secondary text | `#929292` | Only for large or nonessential text; see accessibility caveat |
| Rail | `#7F797D` | Tracks and subdued rules |
| Divider | `#9D9190` | Dividers |
| Picker neutral | `#636363` | Color-neutral comparison surface |

The app's secondary `#929292` has weak contrast on some app surfaces. The public website must meet WCAG contrast requirements rather than reproducing a known readability compromise. Lighten secondary text for ordinary web copy—provisionally `#C4C0C3`—and reserve the exact token for decorative or large nonessential labels.

### Halftone surface

The app pattern consists of three offset dot lattices over `#454447`:

- Base spacing: `10.9641` design units.
- Dot diameter: 25% of the spacing.
- Lattice row ratio: 1.0, intentionally not a hexagonal `√3/2` ratio.
- Angles: 0°, +120°, and −120°.
- Ink opacity: 40% per layer.

For the web, implement the pattern with local CSS gradients or a tiny local SVG/CSS paint asset. Do not use a remote image. At normal reading distance one lattice should be apparent first, with the other colors emerging on closer inspection. Avoid moiré, hard seams, and animation that makes the background vibrate.

The pattern is a material, not wallpaper for every square pixel. Use it on header surfaces, buttons, captions, and large framing shapes. Long reading areas and legal pages should use quieter solid or very low-contrast grounds.

### Shape, spacing, and elevation

The app uses a family of nested corner radii rather than one universal pill:

- 4 units for content frames.
- 9 units for outlined controls.
- 10 units for surfaces, cards, panels, and active segments.
- 11 units for outer tracks.

On the website, scale these proportionally and keep the nesting visible. Avoid fashionable full-pill buttons unless the content truly calls for a capsule. Primary buttons should feel like tactile app controls: moderate radius, halftone at rest, blush when active.

The app’s control shadow is a restrained black shadow at 15% opacity, offset 4 units with 15 units of blur. The website may deepen the hero’s layers, but it should avoid glassmorphism. The app surfaces are deliberately opaque so the artwork never shows through interface decoration.

### A fancier expression that still belongs to the app

The landing page can extend the app language in four ways:

1. Use enormous Iosevka headings as compositional shapes, sometimes cropped at a section edge.
2. Let real brush strokes cross section boundaries and act as masks or reveals for app footage.
3. Use slow parallax between the three halftone lattices in decorative, non-reading areas.
4. Build editorial layouts from the app’s masonry wall, radial brush wheel, and under-pen popovers rather than importing generic marketing cards.

Do not extend it with neon gradients, glossy glass panels, generic 3D blobs, stock illustrations, AI-generated fake paintings, or an unrelated serif display font. “Fancier” should mean more spatial, painterly, and cinematic—not less recognizable.

### Artwork and screenshots

The website needs real work made in the app. Each artwork requires the artist’s explicit permission for website and Store use, credit terms, and confirmation that any included textures or brush resources permit promotional reproduction.

Required captures:

- Hero painting with clean composition and enough negative space for UI legibility.
- First-mark sequence with no new-document dialog.
- Infinite-canvas zoom and pan sequence.
- Quick-adjust interaction under the pen.
- Recent-brush radial selector.
- Three to six brush swatches and their controls.
- Project masonry wall.
- Close, reopen, and restored work sequence.
- One honest alpha or beta overview showing the real app state.

Capture the release build, not a development build with diagnostics. Hide personal paths and project data. Do not retouch the UI into states the app cannot produce. Color-grade surrounding photography if desired, but preserve the pixels of the product capture.

Preferred media delivery:

- AV1 or WebM plus MP4 fallback for short, muted clips.
- Poster images for every video.
- Explicit dimensions to prevent layout shift.
- Responsive images in AVIF/WebP with PNG or JPEG fallback as needed.
- No autoplay with sound; no video required to understand the page.

## Interaction and responsive behavior

The website must work well with mouse, keyboard, touch, pen, reduced motion, and high zoom. It should echo a tablet interface without becoming a touch-only site.

### Desktop and wide screens

- Allow art to occupy most of the viewport.
- Keep copy in strong editorial blocks rather than centered narrow columns everywhere.
- Use the left and right edges as “tablet edges” for occasional controls or section labels.
- A sticky Store action is acceptable, but it must never cover art controls or legal text.

### Tablet

- This is the most important responsive breakpoint conceptually, even though the product ships on Windows first.
- Maintain targets of at least 44 CSS pixels.
- Avoid hover-only explanations.
- Keep critical copy and calls to action outside decorative overlap.
- Reduce parallax and GPU-heavy masks if they compromise scroll or pen responsiveness; the marketing page must embody the product’s respect for latency.

### Mobile

- Collapse to a single clear narrative.
- Replace interaction montages with poster-first short clips.
- Keep the first Store status, Windows requirement, and product sentence visible without excessive scrolling.
- Do not imply that the website visitor can install the app on that phone.

### Motion

- Motion should demonstrate cause and effect: pen moves, mark appears; control opens, brush changes; canvas zooms, detail remains.
- Decorative motion should be slow, sparse, and pause off screen.
- Under `prefers-reduced-motion: reduce`, remove parallax, scroll-linked transforms, cursor followers, stroke drawing animations, and auto-advancing sequences. Show stable final frames instead.
- Do not hijack scroll, smooth-scroll legal anchor links, or make the pointer into a custom brush cursor over ordinary page content.

## Accessibility requirements

The app aesthetic is not an excuse for low-contrast marketing or inaccessible legal pages.

- Target WCAG 2.2 AA.
- Preserve a visible keyboard focus ring of at least 2 CSS pixels with sufficient contrast.
- Use semantic HTML landmarks, heading order, buttons, and links.
- Every video has a descriptive text equivalent; spoken material requires captions.
- Decorative halftone layers are hidden from assistive technology.
- Artwork alternative text should describe what matters about the art or interaction, not say “image.”
- Never encode alpha versus beta state by color alone.
- Give external Discord and Store links clear accessible names.
- The language switcher preserves the corresponding route when a translation exists.
- Set `lang="en"` and `lang="de"` correctly per page.
- Legal text remains selectable, printable, and useful without CSS or JavaScript.

## Technical and privacy architecture

The preferred implementation is a statically generated site in a separate repository, deployed to a custom domain over HTTPS. The content should remain usable with JavaScript disabled. JavaScript is acceptable only for progressive visual enhancement, release-state configuration, and accessible media controls.

Required characteristics:

- No accounts or authentication.
- No database.
- No contact form; use a displayed and linked support email.
- No analytics, ad pixels, session replay, fingerprinting, or marketing cookies.
- No third-party font requests.
- No embedded Discord, Microsoft Store, YouTube, Vimeo, map, or social widgets.
- No consent banner when nothing requiring consent is loaded. If the architecture changes, reassess rather than adding a decorative banner.
- Self-hosted fonts, screenshots, icons, and videos.
- A strict Content Security Policy suitable for a static site.
- `Referrer-Policy: strict-origin-when-cross-origin` or stricter after checking Store and Discord referral needs.
- `X-Content-Type-Options: nosniff` and sensible permissions policy.
- A generated sitemap, canonical URLs, language alternates, and a useful 404 page.
- Automated broken-link checks for Store, support, privacy, Impressum, and Discord URLs.
- Dependency update automation and a minimal client-side dependency set.

The release channel should be a small configuration object rather than copy duplicated through components. Suggested model:

```ts
type ReleaseState = "coming-soon" | "alpha" | "beta" | "stable";

interface ReleaseChannel {
  state: ReleaseState;
  storeUrl?: string;
  label: string;
  shortDisclosure: string;
  windowsRequirement: string;
}
```

The build should fail if a clickable Store call to action has no valid HTTPS URL, if legal placeholders remain, or if the product name is rendered as “Cozy Paint.”

## Search and social metadata

Recommended home title:

> Cozy Paint Studio — Stylus-first painting for Windows

Recommended description:

> Open straight onto an endless canvas, paint with expressive pressure-sensitive brushes, and keep your flow. Cozy Paint Studio launches first on Windows.

Suggested social card copy:

> Stay with the mark.

The social image should use a real app capture, the full name, and “Windows alpha” or “Windows beta” when applicable. Do not put a Microsoft Store badge in the image unless its usage follows Microsoft’s current brand rules.

Structured data may use `SoftwareApplication` with `applicationCategory` appropriate to graphics and design, `operatingSystem: Windows`, the real offer state, and the canonical Store URL. Do not add ratings, price, version, or availability that are not factual.

## Support page specification

The Support page is the stable, owned support destination used by the Microsoft Store. Discord is secondary community help, not the support system of record.

Recommended structure:

1. Title: **Support for Cozy Paint Studio**.
2. State the current channel and version scope: Windows alpha or beta.
3. Display and link the support email on the owned domain.
4. Explain what to include in a useful report:
   - app version;
   - Windows version;
   - pen and tablet or display model;
   - GPU model if the issue is visual or performance-related;
   - what happened, what was expected, and whether it repeats;
   - screenshots or a short recording when safe;
   - never send a private drawing unless the support team explicitly asks and the painter chooses to.
5. Link to known issues or release notes when those pages genuinely exist.
6. Explain where drawings are stored in the shipping build and how to back them up. This text must be verified against the packaged build.
7. Link to Discord with the third-party disclosure, framed as community conversation.
8. Link to Privacy and Impressum.

Suggested copy:

> Something got between you and the painting? Write to **cozy-paint-studio@johannesvollmer.com**. Tell us which version of Cozy Paint Studio you are using, what pen or tablet you use, and the shortest path to make the problem happen again.

Do not promise a response time until one can be reliably met. Do not ask users to post crash logs or drawings publicly in Discord.

## Privacy page specification

The privacy page must cover two distinct subjects: the Cozy Paint Studio desktop app and this website. It must not collapse “the app has no network features” into “no personal data exists anywhere,” because the web host ordinarily processes request metadata and Microsoft or Discord process data when users choose those services.

The final text must be reviewed against the actual host, Store build, release features, and controller identity. The following is an implementation-ready structure, not a substitute for legal review.

### Required identity and scope

- Controller’s full legal name or entity: `Johannes Vollmer`.
- Serviceable postal address: `[POSTAL_ADDRESS]`.
- Privacy contact: `cozy-paint-studio@johannesvollmer.com`.
- Effective date and change date.
- Scope: Cozy Paint Studio desktop application and `https://cozy-paint-studio.johannesvollmer.com`.

### Desktop application disclosure

Proposed text, valid only if release verification confirms it:

> Cozy Paint Studio does not require an account and does not send drawings, brush content, usage analytics, or telemetry to us. Drawings and application data are stored locally on your device. They leave your device only when you deliberately use an operating-system sharing or export action. Links in the About page open your system browser; the app itself does not connect to Discord.

Then specify:

- local storage categories and locations;
- retention and deletion under the user’s control;
- whether crash reporting exists and, if so, whether it is opt-in and what it sends;
- whether the Store supplies aggregate acquisition or reliability information to the publisher;
- whether alpha or beta distribution uses Microsoft account audience membership;
- any future networking, gallery, update, telemetry, or sharing feature before it launches.

### Website disclosure

Name the hosting provider and region, and describe unavoidable server log data such as IP address, request time, requested path, referrer, user agent, and response status. State purpose, legal basis, retention, and recipients based on the actual host contract and configuration. Do not assert that logs are absent without confirming it.

Proposed principle:

> The website uses no analytics, advertising, tracking pixels, third-party fonts, contact forms, or embedded social media. The hosting provider processes the technical request data needed to deliver and secure the site.

### External destinations

Explain that the Microsoft Store and Discord are separate services under their own privacy terms. A plain link does not transfer data to them until the user follows it; this must remain true by avoiding embeds and preconnects.

### Rights and authority

Include applicable data-subject rights, the right to complain to the competent supervisory authority, and contact instructions. The exact legal bases, rights language, international-transfer disclosures, processor list, and authority depend on the controller and host and require legal review.

### Language

Publish a German Datenschutz page and an English Privacy page. Identify which version governs only if counsel recommends doing so; both should describe the same processing, not two different policies.

Microsoft states that Win32 and Desktop Bridge products must maintain privacy policies. Its submission documentation also makes clear that Microsoft does not provide a default policy for the app. Reference: [Microsoft Store Policies section 10.5](https://learn.microsoft.com/en-us/windows/apps/publish/store-policies) and [Privacy policy and support info for MSIX apps](https://learn.microsoft.com/en-us/windows/apps/publish/publish-your-app/msix/support-info).

## Impressum and legal notice specification

Provide German **Impressum** and English **Legal notice** routes. The final content depends on whether the publisher is an individual or company, whether the offering is commercial, and which registrations or regulated professions apply. Do not publish a home address by accident; decide the publisher structure and obtain a serviceable address appropriate for legal notices.

Required template fields:

```text
Angaben gemäß § 5 DDG

Herr Johannes Vollmer
[SERVICEABLE STREET ADDRESS]
[POSTCODE AND CITY]
Deutschland

Kontakt
E-Mail: cozy-paint-studio@johannesvollmer.com
Telefon: [PHONE, IF REQUIRED/CHOSEN]

Registereintrag: [REGISTER AND NUMBER, IF APPLICABLE]
Umsatzsteuer-ID / Wirtschafts-ID: [IF APPLICABLE]
Aufsichtsbehörde / Berufsangaben: [IF APPLICABLE]

Inhaltlich verantwortlich: [ONLY IF A SEPARATE REQUIREMENT APPLIES]
```

German DDG section 5 requires applicable provider information to be easily recognizable, directly reachable, and continuously available, including name, address, and information enabling rapid electronic contact. Add the conditional fields only when they apply. Primary source: [§ 5 Digitale-Dienste-Gesetz](https://www.gesetze-im-internet.de/ddg/__5.html).

The footer link should say “Impressum” in German and “Legal notice” in English. The page must not be hidden behind a menu that requires JavaScript, a login, or a cookie choice.

This brief does not decide whether the product is sold, whether the publisher account is individual or company, or whether the activity is commercial. Those decisions affect the notice, public address, Store verification, taxation, and potentially consumer information. Resolve them before Partner Center registration and before replacing placeholders.

## Terms page policy

Do not create generic terms merely because many sites have them. The current branch plan notes that Microsoft’s Store terms cover the Store transaction and that a custom terms page becomes relevant when something is sold outside the Store or the app supplies its own service.

Create `/terms` only after counsel identifies a concrete need, such as direct sales, accounts, hosted services, a gallery, paid brush packs, or separate community terms. Discord server rules belong in Discord and should cover conduct, moderation, age requirements, and rights to shared artwork or `.cozypack` files.

## Localization

The website and legal pages should be available in English and German even if the initial Store listing declares English only.

English is the product’s first UI and Store language. German is necessary for the German legal audience and valuable for the local launch. Translation must preserve the painter-centered tone rather than translating slogans word for word.

Recommended German hero direction:

- Eyebrow: **Malen mit Stift — zuerst für Windows**
- Headline: **Bleib bei der Linie.**
- Body direction: **Cozy Paint Studio öffnet sich direkt auf einer grenzenlosen Leinwand, bewahrt deine Arbeit beim Malen und bringt ausdrucksstarke Pinsel nah an deinen Stift. Kein Größen-Dialog. Kein Speicherritual. Weniger zwischen Idee und Hand.**

This German marketing copy needs a native editorial pass. Legal translation needs legal review. Keep the product name untranslated.

Use route-based localization rather than runtime machine translation. Every page should link to its counterpart and include `hreflang` metadata.

## Microsoft Store and release-channel requirements

The website must be ready for alpha and beta without a redesign.

Before any Store call to action goes live, confirm:

- The reserved product name and listing say **Cozy Paint Studio**, not the current development manifest’s “Cozy Paint.”
- The Store listing URL is permanent and points to the intended audience or public product page.
- The site’s privacy and support URLs are entered in Partner Center.
- Screenshots show the shipping app and disclose meaningful limits.
- The description names Windows as the only current platform.
- Language declarations match the product UI.
- The package publisher and public legal identity are consistent.
- The age-rating questionnaire reflects community links and any later network features.
- The `runFullTrust` capability is accurately justified for a native painting application with low-latency pen input and local file access.
- The public domain, support email, privacy page, legal notice, and non-expiring Discord invite all work.

Microsoft Store Policies version 7.20 was published on 15 September 2026 with an effective date of 22 October 2026. It emphasizes distinct value, accurate representation, and an up-to-date privacy policy for Win32 and Desktop Bridge products. Source: [Microsoft Store Policies](https://learn.microsoft.com/en-us/windows/apps/publish/store-policies). Re-check the effective policy version at submission time rather than treating this dated brief as legal or submission authority.

## Discord community requirements

Initial channels proposed by the branch plan are announcements, feature requests, show your art, brush models, help, and general conversation. The exact names may change, but the responsibilities should remain separated.

Before opening the link publicly:

- Use a non-expiring invite controlled by the project owner.
- Publish concise rules.
- Name at least one active moderator and a backup.
- State Discord’s age requirement and link its terms and privacy information.
- Establish a reporting and escalation path.
- Tell members not to share artwork, brush images, shaders, or packs unless they have the right to do so.
- Ask pack authors to state reuse terms when sharing files.
- Separate announcements from community support and official email support.
- Decide how security-sensitive bug reports are handled privately.

Do not advertise the Discord as an in-app network feature. The planned app behavior is a browser link only.

## Content and asset production checklist

The website cannot be finished from code alone. The owner must supply or approve:

- Final domain and canonical URLs.
- Publisher identity and legal structure.
- Serviceable legal address.
- Support and privacy email addresses on the domain.
- Microsoft Partner Center account type.
- Store product URL for each live channel.
- Final pricing decision.
- Final system requirements.
- Stable Discord invite and moderation owner.
- Product logo and Store icon under the **Cozy Paint Studio** name.
- Real artwork with promotional permission and credit decisions.
- Release-build screenshots and video captures.
- Verified feature matrix for the exact alpha or beta build.
- Host, region, access-log behavior, processor terms, and retention.
- Legal review of Datenschutz or Privacy and Impressum or Legal notice.
- A decision on whether any custom terms are needed.

## Recommended build sequence

1. Reserve the domain and Cozy Paint Studio Store name; decide publisher identity and release model.
2. Establish design tokens, local font assets, base layout, language routing, and legal-page templates.
3. Build the static landing page with placeholder-safe release states.
4. Capture the actual release candidate and replace all provisional imagery and feature statements.
5. Finalize Support, Privacy or Datenschutz, and Impressum or Legal notice with hosting facts and legal review.
6. Open and moderate Discord; install the non-expiring invite.
7. Run accessibility, performance, metadata, broken-link, placeholder, and no-tracker checks.
8. Deploy to the final HTTPS domain.
9. Enter the live URLs in the app About page and Partner Center.
10. After Store certification, switch the release configuration and verify every call to action from a clean device and both languages.

## Acceptance criteria

The website is ready when all of the following are true:

- Every public reference uses **Cozy Paint Studio**.
- A first-time visitor can state what makes the app different after the hero and first benefit section.
- Current, planned, alpha, and beta capabilities are visually distinguishable.
- No unavailable platform or unfinished feature is presented as downloadable.
- The main call to action reflects one configured release state and has a valid destination.
- Discord is clearly optional, external, and not official support.
- Real app footage proves the no-dialog start, canvas, brush interaction, and project wall.
- Fonts, media, icons, and patterns are self-hosted.
- No analytics, advertising, cookies, embeds, or third-party font calls are present.
- The site is useful without JavaScript.
- Keyboard, screen-reader, contrast, reduced-motion, 200% zoom, touch-target, and language tests pass.
- Core Web Vitals are not sacrificed for decorative motion; the hero loads a useful poster before video.
- Support, Privacy or Datenschutz, and Impressum or Legal notice have direct stable HTTPS URLs.
- Legal placeholders are absent from production.
- Privacy text matches both the release build and hosting configuration.
- The Store badge and product screenshots follow current Microsoft rules.
- External links are checked in CI and immediately before each Store submission.
- A plain-text or printable rendering of every legal page remains readable.

## Decisions still required from the product owner

These questions cannot be answered from the repository and materially affect the site:

1. What domain will be registered? -> cozy-paint-studio.johannesvollmer.com first, published via github pages, later then cozy-paint-studio.com
2. Is the publisher an individual or a company, and is the app free, paid, or intended for later monetization? -> Individual. No monetization during beta/alpha. Perhaps later.
3. What serviceable address may be published in the Impressum?
4. Which static host will be used, in which region, with what log retention? -> github pages
5. Is the first public channel called alpha, beta, preview, or early access in both Store and website? -> preview
6. Is Store access public, invite-only, or tied to a Discord cohort? -> first invite only, later public unlisted, later listed
7. What is the minimum supported Windows version and hardware baseline? -> can we find out which the lowest windows version is where our app will run on, by emulating it?
8. Which current implementation conflicts—especially pipette and image import—are present in the release candidate?
9. Which painter-created artworks may be used, and how are artists credited?
10. Is a separate terms page actually needed? -> Is it needed for windows store listing or by german laws?

## Internal source map

This brief reconciles the following product evidence as of its document date:

- `README.md` for product principles, current prototype scope, roadmap, and painter-facing behavior.
- `docs/ui-design-system.md` and `crates/ui/src/theme.rs` for fonts, palette, halftone construction, spacing, radii, and interaction surfaces.
- `docs/latency.md` for measured latency scope and the distinction between current in-process performance and future Windows display-path work.
- `docs/brush-library.md`, brush manifests, UI code, and tests for the current brush and library model.
- `.claude/worktrees/bridge-cse_01867JYDkg7wkECBq9LbQngw/plans/README.md` for Store-release order and the rule that plans are not shipped features.
- That worktree’s `plans/msix-packaging.md` for Store, website, support, privacy, Impressum, Discord, and packaging requirements.
- Its `plans/settings-and-keymap.md` for the planned About page and external links.
- Its `plans/ux-plan.md`, `plans/stylus-quick-actions.md`, and `plans/touch-gestures.md` for the tablet interaction direction and what remains unbuilt.
- Its `plans/cozypack.md`, `plans/frames.md`, `plans/export.md`, `plans/stroke-modes.md`, `plans/paint-pickup.md`, and related plans for future-facing language that must remain labeled.

When code, docs, and plans disagree, the release candidate is the final authority for a current capability, and the more conservative public claim wins until it is verified.
