# Landing Page Rebrand — Design Spec

Date: 2026-08-26
Scope: `index.html` only — the pre-quiz marketing landing page. Does not touch the ScoreApp-hosted quiz or result pages (covered separately by `docs/ScoreApp-UX-Implementation-Spec.md`, [PR #2](https://github.com/arielleisrael/ai-transformation/pull/2), [PR #3](https://github.com/arielleisrael/ai-transformation/pull/3)).

Source documents:
- ReinventOps brand kit (`docs/ReinventOps-logo-brand.png`) — palette `#0F3D37` deep teal, `#2E3338` slate, `#8FA3B5` blue-gray, `#E8ECF0` light gray.
- Four archetype portraits: `docs/the architect.png`, `docs/the builder.png`, `docs/the explorer.png`, `docs/the spectator.png`.
- `docs/AI-readiness-assessment-UX-review.md`, "Landing-page recommendations" section.

## 1. Palette and tokens

Replace the current purple system (`--accent: #5341F2` and friends) with the ReinventOps brand kit, **light mode only**:

- `--teal: #0F3D37` — primary accent: CTA button fill, link/hover color, borders, eyebrow text
- `--slate: #2E3338` — primary body/heading text
- `--blue-gray: #8FA3B5` — secondary/muted text, meta labels
- `--light-gray: #E8ECF0` — raised surface backgrounds (cards, share panel)
- `--bg: #FFFFFF` — page background
- CTA button: solid `--teal` fill, white text (was amber `#F59E0B` fill, near-black text).

Remove entirely:
- All `@media (prefers-color-scheme: dark)` and `:root[data-theme="dark"]` blocks — no dark-mode token set.
- The `.gradient-word` animated rainbow text effect on "AI identity" in the hero headline — replace with static `--teal` colored text (no animation, no multi-color gradient).
- The three colorful drifting hero orbs (`orb-1`/`orb-2`/`orb-3`, blue/purple/green) — replace with at most one subtle teal-tinted glow, sized and positioned similarly to the current `orb-1`, or omit background glow entirely if it reads as visual noise against the calmer palette. Implementer's call at build time; keep whichever reads as "calm, executive" per the UX review's tone guidance.
- The `orbDrift1/2/3` and `spectrumShift` keyframes become unused and should be deleted along with their orb/gradient-word elements.

## 2. Archetype tiles (mystery section)

Replace the four abstract gradient blocks (`.ac-1`–`.ac-4`) with real crops of the four supplied portraits:

- Source images: the four PNGs in `docs/` (paths contain spaces — copy, don't move, since other docs may reference them by current name).
- Create `assets/images/` at repo root. Export web-sized copies with `sips` (available on macOS, no ImageMagick installed): resize to ~400px wide, convert to JPEG ~80% quality. Target well under 100KB per tile (originals are ~2MB PNGs each — too heavy for four thumbnails). Suggested filenames: `assets/images/archetype-architect.jpg`, `-builder.jpg`, `-explorer.jpg`, `-spectator.jpg`.
- Keep the existing `aspect-ratio: 2/3` tile shape and grid layout (2×2 mobile, 4×1 desktop, `object-fit: cover`).
- Apply a **uniform teal duotone/overlay** across all four tiles (e.g. a `--teal`-tinted linear-gradient or `mix-blend-mode` layer over each image) so the four very differently-lit/graded photos (warm sunset, cool blue-purple, teal outdoor, dark navy) read as one designed set rather than four unrelated stock photos. This also preserves the "mystery" framing — full-color detail isn't revealed until the quiz result.
- Keep the existing hover lift/float animation; it still works with photo tiles.
- Add `aria-label` or per-tile alt text only if tiles stop being purely decorative; since they remain a teaser (no click-through, `aria-hidden="true"` container as today), no alt text is required.

## 3. Meta-row and CTA copy

Current state has two stacked meta-rows under each CTA. New state: **one line per CTA**, tightly coupled to the button, with only the highest-value facts:

- Hero: `4 minutes · instant result · Free`
- Final CTA: `4 minutes · Free`
- Remove entirely, both instances: "Built by ReinventOps", "A real scoring methodology, not a personality quiz". These are cut for value, not accuracy — confirmed with user as not worth the space.
- Do **not** state the question count ("14 questions") anywhere on the landing page — a specific number could read as a bigger commitment than "a few minutes" and discourage starting. This intentionally diverges from the UX review's literal suggested phrase ("14 questions · 4 minutes · instant result").
- Keep "instant result" (singular, matching the UX review's phrasing) even though the underlying flow gates the result behind contact-info submission. This is accurate — the result appears immediately upon submitting, no email-wait — and the landing page does not need to explain the gating mechanic.

## 4. Nav

- Replace `<a href="#" class="nav-brand">AI Readiness Assessment</a>` with a non-link element (e.g. `<span class="nav-brand">`) — honest that it doesn't navigate anywhere, since this is a single-page site with no other destination for it to point to.
- "Take the Assessment →" remains the one functional nav link, restyled to the new palette (`--teal` on hover instead of the current purple).

## 5. Copy trim

Per UX review ("reduce repeated explanatory copy below the first two sections"), remove restatements of timing/price/instant-ness that appear beyond the hero and final CTA:

- Mystery-section caption ("One of these is yours...") stays — it's not a timing/price restatement, it's the archetype teaser copy.
- Any other line that only re-says "4 minutes / instant / free" a third or later time should be cut.
- Keep as-is (not a restatement, substantive content): the three "What you'll discover" cards, the "Who it's for" audience list, and the "Results built to travel" share panel.

## 6. What stays the same

- Overall page structure/section order (hero → mystery tiles → discover cards → who-it's-for/share → final CTA → footer).
- Scroll-reveal behavior and nav background-blur-on-scroll script.
- The CTA destination URL (`https://reinventops.scoreapp.com/questions`) and CTA element IDs (`hero-cta`, `bottom-cta`).
- Responsive breakpoints (700px, 440px) — same layout logic, restyled with new tokens.

## Out of scope

- Any change to the ScoreApp-hosted quiz or result pages (separate spec/PRs already in review).
- Adding the ReinventOps logo image asset anywhere (nav stays text-only per decision above).
- New copy beyond trims and the meta-row changes above — no rewriting of the three discovery cards, audience list, or share panel content.
