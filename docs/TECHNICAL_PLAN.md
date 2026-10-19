# Release Verification Tasks

Website implementation and deployment setup are complete. Track the remaining release checks here and in [LEGAL_RELEASE_PLAN.md](./LEGAL_RELEASE_PLAN.md).

## Automated checks

The repository's validation scripts and CI workflow cover these checks:

- Release-state configuration and localized release copy are internally consistent.
- A live Store destination uses HTTPS and an expected Microsoft host.
- Required English and German page routes exist.
- Release-blocking placeholders and the incomplete product name are absent from source content.
- The live landing page includes structured data.
- Build, formatting, lint, browser accessibility and navigation checks, and external-link checks run in CI.
- Lighthouse performance checks run after deployment.

These checks do not establish that legal statements are correct or that real-world release tasks are complete. The CI link checker currently excludes the production domain and Microsoft Store URL; verify both destinations manually before release.

## Manual release checks

- Confirm the live custom domain and HTTPS work, and the GitHub Pages configuration and DNS are correct.
- Open the Store destination and support, privacy, and legal pages from a clean device; confirm each works in English and German.
- Compare public release claims, screenshots, app behavior, and Store information against the exact packaged release build.
- Verify app storage, deletion, backup, export, sharing, networking, telemetry, crash reporting, updates, and uninstall behavior; update the privacy text if any claim differs.
- Review the privacy notice against GitHub Pages request logging, the active IONOS mail service, and the actual external links and embeds.
- Complete legal review, Microsoft Store badge review, and the business, address, telephone, and tax actions in [LEGAL_RELEASE_PLAN.md](./LEGAL_RELEASE_PLAN.md).
- After Store certification, verify all calls to action and release disclosures against the certified listing.
