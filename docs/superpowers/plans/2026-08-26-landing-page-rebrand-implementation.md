# Landing Page Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand `index.html` (the pre-quiz marketing landing page) from the current purple palette to the ReinventOps brand kit, and implement the "Landing-page recommendations" from `docs/AI-readiness-assessment-UX-review.md`, per the approved design at `docs/superpowers/specs/2026-08-26-landing-page-rebrand-design.md`.

**Architecture:** This is a single-file HTML/CSS content change plus a new static-asset folder — no build step, no JS framework, no automated test suite. Every task replaces the skill's default "write failing test → implement → pass" cycle with "make the change → verify with grep and/or a visual browser check → commit." Each task produces one independently reviewable, committed change to `index.html` (or, for Task 1, to a new `assets/images/` folder consumed by later tasks).

**Tech Stack:** Static HTML/CSS/vanilla JS in `index.html`. Image optimization via macOS `sips` (no ImageMagick installed on this machine — confirmed absent).

## Global Constraints

- Light mode only. No `@media (prefers-color-scheme: dark)` block and no `:root[data-theme="dark"]` block may remain in the final file (spec §1).
- Brand palette only: `#0F3D37` deep teal, `#2E3338` slate, `#8FA3B5` blue-gray, `#E8ECF0` light gray, plus white and CSS-derived tints of those four (spec §1). No purple, amber, blue, orange, or green remain anywhere in `index.html`'s `<style>` block.
- CTA buttons (`.btn-primary`): solid teal fill, white text (spec §1).
- Nav brand element must not be an `<a>` tag (spec §4).
- Meta-row text must never include a question count (spec §3, explicit user instruction).
- "Built by ReinventOps" and "A real scoring methodology, not a personality quiz" must not appear anywhere in the rendered page (explicit user instruction).
- Keep the CTA destination URL (`https://reinventops.scoreapp.com/questions`) and element IDs (`hero-cta`, `bottom-cta`) unchanged (spec §6).
- Keep the three "What you'll discover" cards, "Who it's for" audience list, and "Results built to travel" share panel content unchanged (spec §5/§6) — only their surrounding colors change.

---

### Task 1: Generate optimized archetype tile images

**Files:**
- Create: `assets/images/archetype-spectator.jpg`
- Create: `assets/images/archetype-explorer.jpg`
- Create: `assets/images/archetype-builder.jpg`
- Create: `assets/images/archetype-architect.jpg`

**Interfaces:**
- Consumes: `docs/the spectator.png`, `docs/the explorer.png`, `docs/the builder.png`, `docs/the architect.png` (source portraits, ~1122×1402px, ~2MB each)
- Produces: four JPEGs at the paths above, each ≤100KB, for Task 3 to reference as CSS `background-image` URLs.

- [ ] **Step 1: Create the assets folder**

```bash
mkdir -p assets/images
```

- [ ] **Step 2: Generate the four resized, compressed JPEGs**

```bash
sips -Z 400 -s format jpeg -s formatOptions 80 "docs/the spectator.png" --out assets/images/archetype-spectator.jpg
sips -Z 400 -s format jpeg -s formatOptions 80 "docs/the explorer.png" --out assets/images/archetype-explorer.jpg
sips -Z 400 -s format jpeg -s formatOptions 80 "docs/the builder.png" --out assets/images/archetype-builder.jpg
sips -Z 400 -s format jpeg -s formatOptions 80 "docs/the architect.png" --out assets/images/archetype-architect.jpg
```

`-Z 400` caps the longest edge at 400px (source is portrait-oriented, so this caps height at 400px and scales width proportionally — roughly 320×400). `formatOptions 80` is JPEG quality 80.

- [ ] **Step 3: Verify file sizes and dimensions**

```bash
sips -g pixelWidth -g pixelHeight assets/images/*.jpg
du -h assets/images/*.jpg
```

Expected: each file reports non-zero width/height (roughly 320×400 or similar) and each is under 100KB. If any file exceeds 100KB, re-run its `sips` command with `formatOptions 65` instead of `80` and re-check.

- [ ] **Step 4: Commit**

```bash
git add assets/images/
git commit -m "content: generate optimized archetype tile images for landing page"
```

---

### Task 2: Rebuild color tokens to the ReinventOps brand kit

**Files:**
- Modify: `index.html:16-71` (the `:root` design-tokens block, its dark-mode `@media` block, and the `:root[data-theme="dark"]` block)
- Modify: `index.html:137-161` (hero orb elements' CSS: `.hero-orb`, `.orb-1`, `.orb-2`, `.orb-3`)
- Modify: `index.html:182-195` (`.gradient-word` rule and its `spectrumShift` keyframes)
- Modify: `index.html:515-534` (`orbDrift1`/`orbDrift2`/`orbDrift3` and `spectrumShift` keyframes — delete unused ones)
- Modify: `index.html:536-548` (`@media (prefers-reduced-motion: reduce)` block — remove references to deleted `.gradient-word` fallback and orb opacity)
- Modify: `index.html:577-605` (hero section markup: remove the three `.hero-orb` divs, change the `<span class="gradient-word">` to a plain accent-colored span)

**Interfaces:**
- Produces: the CSS custom properties `--bg`, `--bg-surface`, `--bg-raised`, `--text-primary`, `--text-secondary`, `--text-muted`, `--accent`, `--accent-light`, `--accent-glow`, `--cta`, `--cta-hover`, `--cta-text`, `--cta-shadow`, `--border` (same variable *names* as before, new brand-kit values) — every later task and every existing unmodified CSS rule in the file continues to reference these same names, so no other rule needs to change.

- [ ] **Step 1: Replace the entire token block**

Replace lines 16–71 (from `/* === DESIGN TOKENS === */` through the closing `}` of the `:root[data-theme="dark"]` block) with:

```css
  /* === DESIGN TOKENS === */
  :root {
    --bg:             #FFFFFF;
    --bg-surface:     #FFFFFF;
    --bg-raised:      #E8ECF0;
    --text-primary:   #2E3338;
    --text-secondary: #4A545E;
    --text-muted:     #8FA3B5;
    --accent:         #0F3D37;
    --accent-light:   #1B5C52;
    --accent-glow:    rgba(15, 61, 55, 0.08);
    --cta:            #0F3D37;
    --cta-hover:      #1B5C52;
    --cta-text:       #FFFFFF;
    --cta-shadow:     rgba(15, 61, 55, 0.32);
    --border:         rgba(15, 61, 55, 0.12);
  }
```

This deletes the `@media (prefers-color-scheme: dark)` block and the `:root[data-theme="dark"]` block entirely — there is now exactly one token set.

- [ ] **Step 2: Remove the hero orb CSS**

Delete the `.hero-orb`, `.orb-1`, `.orb-2`, and `.orb-3` rules (originally lines 137–161).

- [ ] **Step 3: Replace `.gradient-word` with a static accent color**

Replace the `.gradient-word` rule (originally lines 182–195) with:

```css
  .accent-word {
    color: var(--accent);
  }
```

- [ ] **Step 4: Delete unused keyframes**

Delete the `@keyframes spectrumShift`, `@keyframes orbDrift1`, `@keyframes orbDrift2`, and `@keyframes orbDrift3` blocks (originally lines 515–534). Keep `@keyframes riseIn` and `@keyframes cardFloat` — both are still used.

- [ ] **Step 5: Update the reduced-motion fallback**

In the `@media (prefers-reduced-motion: reduce)` block (originally lines 536–548), delete the `.gradient-word { ... }` override sub-rule (it referenced the now-deleted class). The rest of the block (`.hero .eyebrow, .hero-h1, .hero-sub, .hero-actions { opacity: 1; }` and `.reveal { opacity: 1; transform: none; }`) stays as-is.

- [ ] **Step 6: Update the responsive block**

In the `@media (max-width: 700px)` block, delete the three lines that resize `.orb-1`, `.orb-2`, `.orb-3` (they no longer exist).

- [ ] **Step 7: Update the hero markup**

In the hero `<section class="hero">` (originally lines 578–605), delete the three lines:
```html
  <div class="hero-orb orb-1" aria-hidden="true"></div>
  <div class="hero-orb orb-2" aria-hidden="true"></div>
  <div class="hero-orb orb-3" aria-hidden="true"></div>
```

And change:
```html
  <h1 class="hero-h1">Your company has an <span class="gradient-word">AI identity</span>. Find out what it is.</h1>
```
to:
```html
  <h1 class="hero-h1">Your company has an <span class="accent-word">AI identity</span>. Find out what it is.</h1>
```

- [ ] **Step 8: Verify no old colors or removed identifiers remain**

```bash
grep -n "5341F2\|7C6CF8\|9333EA\|F59E0B\|FBBF24\|10B981\|2563EB\|EA580C\|gradient-word\|hero-orb\|orb-1\|orb-2\|orb-3\|orbDrift\|spectrumShift\|data-theme\|prefers-color-scheme" index.html
```

Expected: no output (zero matches). If anything matches, it was missed in a prior step — remove it.

- [ ] **Step 9: Visual check in browser**

Open `index.html` directly in the Browser tool (file:// URL) and confirm: page background is white, hero headline's "AI identity" is solid deep teal (no animation, no rainbow gradient), no colored glowing orbs are visible behind the hero text, and the primary CTA button is solid teal with white text.

- [ ] **Step 10: Commit**

```bash
git add index.html
git commit -m "content: rebrand landing page color tokens to ReinventOps brand kit"
```

---

### Task 3: Replace archetype gradient tiles with photo tiles

**Files:**
- Modify: `index.html:276-331` (`.archetype-grid`, `.archetype-card`, `.card-shine`, `.ac-1`–`.ac-4` CSS rules)
- Modify: `index.html:610-615` (the four `.archetype-card` divs in the mystery section)

**Interfaces:**
- Consumes: `assets/images/archetype-spectator.jpg`, `archetype-explorer.jpg`, `archetype-builder.jpg`, `archetype-architect.jpg` from Task 1
- Produces: no new names consumed elsewhere — this section is self-contained.

- [ ] **Step 1: Replace the tile CSS**

Replace the `.archetype-card`, `.ac-1`, `.ac-2`, `.ac-3`, `.ac-4` rules (originally lines 283–320) with:

```css
  .archetype-card {
    aspect-ratio: 2 / 3;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    cursor: default;
    background-size: cover;
    background-position: center;
    box-shadow: 0 8px 36px rgba(15, 61, 55, 0.28);
    transition: transform 0.3s ease;
    animation: cardFloat 7s ease-in-out infinite;
  }
  .archetype-card:hover {
    transform: translateY(-6px) scale(1.02);
    animation-play-state: paused;
  }
  .ac-1 {
    background-image: linear-gradient(rgba(15, 61, 55, 0.58), rgba(15, 61, 55, 0.58)), url('assets/images/archetype-spectator.jpg');
    animation-delay: 0s;
  }
  .ac-2 {
    background-image: linear-gradient(rgba(15, 61, 55, 0.58), rgba(15, 61, 55, 0.58)), url('assets/images/archetype-explorer.jpg');
    animation-delay: 1.4s;
  }
  .ac-3 {
    background-image: linear-gradient(rgba(15, 61, 55, 0.58), rgba(15, 61, 55, 0.58)), url('assets/images/archetype-builder.jpg');
    animation-delay: 2.8s;
  }
  .ac-4 {
    background-image: linear-gradient(rgba(15, 61, 55, 0.58), rgba(15, 61, 55, 0.58)), url('assets/images/archetype-architect.jpg');
    animation-delay: 4.2s;
  }
```

This assigns tiles in Spectator → Explorer → Builder → Architect order, matching the order used later in the page copy ("Spectator, Explorer, Builder, or Architect"). The `.card-shine` rule and its child `<div>` are removed — the teal overlay gradient now provides the unifying visual treatment, and a separate diagonal shine on top of a darkened photo reads as visual clutter rather than polish.

- [ ] **Step 2: Remove `.card-shine` from the CSS**

Delete the `.card-shine { ... }` rule (originally part of the block replaced in Step 1 — confirm it's gone).

- [ ] **Step 3: Update the mystery section markup**

Replace:
```html
  <div class="archetype-grid reveal" style="transition-delay:0.1s" aria-hidden="true">
    <div class="archetype-card ac-1"><div class="card-shine"></div></div>
    <div class="archetype-card ac-2"><div class="card-shine"></div></div>
    <div class="archetype-card ac-3"><div class="card-shine"></div></div>
    <div class="archetype-card ac-4"><div class="card-shine"></div></div>
  </div>
```
with:
```html
  <div class="archetype-grid reveal" style="transition-delay:0.1s" aria-hidden="true">
    <div class="archetype-card ac-1"></div>
    <div class="archetype-card ac-2"></div>
    <div class="archetype-card ac-3"></div>
    <div class="archetype-card ac-4"></div>
  </div>
```

The container remains `aria-hidden="true"` — these tiles are still a decorative teaser, not interactive/informational content, so no alt text is needed (matches spec §2).

- [ ] **Step 4: Verify no dangling references**

```bash
grep -n "card-shine" index.html
```

Expected: no output.

- [ ] **Step 5: Visual check in browser**

Open `index.html` in the Browser tool and confirm: the four mystery-section tiles show teal-tinted photo crops (not solid gradient blocks), all four look like one cohesive set (consistent overlay darkness, consistent crop framing), and the hover-lift animation still works on each tile.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "content: replace archetype gradient tiles with photo tiles"
```

---

### Task 4: Trim CTA meta-rows and final-CTA copy

**Files:**
- Modify: `index.html:592-604` (hero `.hero-actions` meta-rows)
- Modify: `index.html:676-691` (final-CTA paragraph and `.hero-actions` meta-rows)

**Interfaces:** None — this task only removes/edits text nodes; no CSS classes or JS hooks change.

- [ ] **Step 1: Trim the hero meta-rows**

Replace:
```html
    <div class="meta-row">
      <span class="meta-item">4 minutes</span>
      <span class="meta-sep" aria-hidden="true"></span>
      <span class="meta-item">Instant results</span>
      <span class="meta-sep" aria-hidden="true"></span>
      <span class="meta-item">Free</span>
    </div>
    <div class="meta-row">
      <span class="meta-item">Built by ReinventOps</span>
      <span class="meta-sep" aria-hidden="true"></span>
      <span class="meta-item">A real scoring methodology, not a personality quiz</span>
    </div>
```
with:
```html
    <div class="meta-row">
      <span class="meta-item">4 minutes</span>
      <span class="meta-sep" aria-hidden="true"></span>
      <span class="meta-item">instant result</span>
      <span class="meta-sep" aria-hidden="true"></span>
      <span class="meta-item">Free</span>
    </div>
```

("Instant results" → "instant result", singular, matching the UX review's exact suggested phrase. The second meta-row is deleted entirely — no question count is added per explicit user instruction.)

- [ ] **Step 2: Trim the final-CTA paragraph and meta-rows**

Replace:
```html
  <p class="reveal" style="transition-delay:0.1s">
    Four minutes. Instant results. A clear picture of your company's AI identity — and what's waiting on the other side.
  </p>
  <div class="hero-actions reveal" style="transition-delay:0.2s; opacity:1; animation:none;">
    <a href="https://reinventops.scoreapp.com/questions" class="btn-primary" id="bottom-cta">
      Take the Assessment <span class="btn-arrow">→</span>
    </a>
    <div class="meta-row">
      <span class="meta-item">4 minutes</span>
      <span class="meta-sep" aria-hidden="true"></span>
      <span class="meta-item">Free</span>
    </div>
    <div class="meta-row">
      <span class="meta-item">Built by ReinventOps</span>
    </div>
  </div>
```
with:
```html
  <p class="reveal" style="transition-delay:0.1s">
    A clear picture of your company's AI identity — and what's waiting on the other side.
  </p>
  <div class="hero-actions reveal" style="transition-delay:0.2s; opacity:1; animation:none;">
    <a href="https://reinventops.scoreapp.com/questions" class="btn-primary" id="bottom-cta">
      Take the Assessment <span class="btn-arrow">→</span>
    </a>
    <div class="meta-row">
      <span class="meta-item">4 minutes</span>
      <span class="meta-sep" aria-hidden="true"></span>
      <span class="meta-item">Free</span>
    </div>
  </div>
```

("Four minutes. Instant results." is cut from the prose since the meta-row directly below it already states both facts — keeping both was a same-section duplicate. The "Built by ReinventOps" row is deleted per explicit user instruction.)

- [ ] **Step 3: Verify removed strings are gone and required strings remain**

```bash
grep -n "Built by ReinventOps\|real scoring methodology\|Instant results\|Four minutes\." index.html
```

Expected: no output.

```bash
grep -n "instant result\b" index.html
```

Expected: one match (the hero meta-row).

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "content: trim landing page CTA meta-rows and remove low-value lines"
```

---

### Task 5: Make the nav brand a non-link element

**Files:**
- Modify: `index.html:572-575` (`<nav>` markup)
- Modify: `index.html:96-103` (`.nav-brand` CSS rule)

**Interfaces:** None.

- [ ] **Step 1: Update the nav markup**

Replace:
```html
<nav>
  <a href="#" class="nav-brand">AI Readiness Assessment</a>
  <a href="https://reinventops.scoreapp.com/questions" class="nav-link">Take the Assessment →</a>
</nav>
```
with:
```html
<nav>
  <span class="nav-brand">AI Readiness Assessment</span>
  <a href="https://reinventops.scoreapp.com/questions" class="nav-link">Take the Assessment →</a>
</nav>
```

- [ ] **Step 2: Update the `.nav-brand` CSS rule**

The existing rule includes `text-decoration: none;`, which is meaningless on a `<span>`. Replace:
```css
  .nav-brand {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent-light);
    text-decoration: none;
  }
```
with:
```css
  .nav-brand {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent-light);
  }
```

- [ ] **Step 3: Verify**

```bash
grep -n '<a href="#"' index.html
```

Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "content: make landing page nav brand a non-link element"
```

---

### Task 6: Final cross-breakpoint visual QA

**Files:** None modified — verification only. If this task finds a defect, fix it in `index.html` and commit the fix as part of this task (Step 5 covers that).

**Interfaces:** None.

- [ ] **Step 1: Open the page and check desktop layout**

Open `index.html` in the Browser tool at a desktop width (1440px). Confirm:
- No purple, amber, blue, orange, or green is visible anywhere on the page.
- Hero CTA and final CTA buttons are solid teal with white text and white arrow.
- The four archetype tiles show teal-tinted photos in Spectator/Explorer/Builder/Architect order.
- Nav brand text is not underlined and not a clickable link (hovering shows no pointer cursor / no href in status).
- Hero meta-row reads "4 minutes · instant result · Free" with no second row beneath it.
- Final CTA section has no "Built by ReinventOps" text anywhere on the page.

- [ ] **Step 2: Check mobile layout**

Resize the Browser tool viewport to 390px width (or use the mobile preset). Confirm:
- Archetype tiles lay out as a 2×2 grid and remain legible (teal overlay isn't so dark the photo is unrecognizable).
- Hero and final-CTA meta-rows wrap cleanly with no overflow.
- Nav padding/brand text doesn't overlap the "Take the Assessment" link.

- [ ] **Step 3: Check for console errors**

Use the Browser tool's console-reading capability to confirm there are no JavaScript errors (the existing scroll-reveal and nav-blur-on-scroll script should still run correctly against the new markup).

- [ ] **Step 4: Confirm both CTAs still point to the quiz**

```bash
grep -n 'href="https://reinventops.scoreapp.com/questions"' index.html
```

Expected: two matches (`hero-cta` and `bottom-cta`).

- [ ] **Step 5: Fix any defects found, then do a final full-file review**

If Steps 1–4 found any issue, fix it directly in `index.html` and re-run the relevant check. Once clean, run a last comprehensive grep to confirm no leftover artifacts from earlier tasks:

```bash
grep -n "5341F2\|F59E0B\|gradient-word\|hero-orb\|Built by ReinventOps\|real scoring methodology\|<a href=\"#\"" index.html
```

Expected: no output.

- [ ] **Step 6: Commit (only if Step 5 required fixes)**

```bash
git add index.html
git commit -m "content: fix landing page QA findings"
```

If no fixes were needed, skip this step — Task 6 is verification-only and doesn't require its own commit.

---

## Self-Review Notes

- **Spec coverage:** §1 (palette/dark-mode removal) → Task 2. §2 (photo tiles + duotone) → Task 3. §3 (meta-row trim, no question count, instant result phrasing) → Task 4. §4 (nav non-link) → Task 5. §5 (copy trim beyond meta-rows — the final-CTA paragraph redundancy) → Task 4, Step 2. §6 (structure/URLs/IDs unchanged) → enforced as a Global Constraint and checked in Task 6. Out-of-scope items (ScoreApp pages, logo image, discovery-card copy) are not touched by any task.
- **Placeholder scan:** no TBD/TODO markers; every step has literal code or literal shell commands.
- **Type/name consistency:** CSS variable names introduced in Task 2 (`--accent`, `--cta`, etc.) are the same names already used by untouched rules elsewhere in the file (`.eyebrow`, `.find-card`, `.share-tag`, `.btn-primary`, etc.), so no downstream task or existing rule needs renaming. Asset filenames introduced in Task 1 (`archetype-spectator.jpg`, etc.) match exactly what Task 3 references.
