# Copy Review Implementation Plan — R-01 through R-14

**Source:** `AI Readiness Assessment Copy, Conversion & Results Experience Review` (external marketing consultant, reviewed the live scorecard 2026-08-23), backlog items R-01–R-14.
**Canonical spec:** `docs/AI-Readiness-Assessment-Master-Reference.md` (v2.0) still wins on anything it already decided. This plan does not re-litigate the three-layer scoring architecture, the archetype gates, or the CTA/qualification logic — those are built and validated (8/8 personas passing, per the build log).
**Build log for the in-progress ScoreApp work:** `docs/superpowers/plans/2026-08-21-assessment-v2-scoreapp-build.md`, currently mid-Task 9.

---

## 0. What the review got right that's already solved

The consultant reviewed the live scorecard, not this repo's design docs, so several "findings" describe a gap between *what's live today* and *what's already speced* — not a gap in the design itself. No new design work needed for these; only finishing the build:

| R-ID | Finding | Actual state |
|---|---|---|
| R-03 | No next-action/CTA on result | Fully speced (§7.6) and built for Architect; same CTA logic just needs replicating to the other 3 pages (in-flight, Task 9). |
| R-04 | Two scores don't combine into consistent messaging | The Positioning Statement 2×2 (§7.3) *is* the two-axis matrix the consultant is asking for, word-for-word compatible with their recommendation table. Built for Architect; needs replicating. |
| R-06 (partial) | Result copy isn't personalized | 8 Q7-gated insight sections exist per page (fallback from the full 48-variant matrix, which ScoreApp's dynamic-content engine can't key on two answers at once). Built for Architect; needs replicating. |
| R-08 | High lead-capture friction | Consent is already optional-not-required and the form sits after the questions; results render regardless of opt-in. No further change needed. |
| R-09 | Archetype copy is paragraph-heavy | **Done 2026-08-24** — see Phase 4 below. Restructured into shorter paragraphs at existing sentence boundaries, no new writing. |
| R-13 | Some questions rely on prior context | Q7's "Other" handling was already fixed and synchronized 2026-08-23 (matches your recent commit). No other open item found. |

**Bottom line: finishing Task 9 (replicate the Architect page's structure to Builder, Explorer, Spectator) closes most of R-03, R-04, and R-06 by itself**, and is already the acknowledged bottleneck in the build log. It should run first regardless of the rest of this plan.

---

## 1. Genuinely new scope

These have no existing decision to build on — they need a call made, then implementation:

- **R-01** — Locked-preview vs. unlocked-result distinction. *Recommendation: do not build an artificial partial-preview state.* It would add a UI step and re-introduce the friction R-08 just removed, and the consultant's own guardrail says "favor delivery" over narrowing. Instead: fix the *promise*, not the *gate* — see R-02.
- **R-02** — Landing-page promises vs. delivered result. **Cost-estimate gap closed 2026-08-24.** The landing page promises "what it plausibly costs you a year" (index.html:634-635) but no result page displayed a dollar figure — only the generic 2021 McKinsey stat. Built the missing piece: 5 new Q10-audience sections ("Q10 — Less than 5 hours" through "Q10 — More than 40 hours") added to Audiences, each showing "What this workflow is costing you" with the exact dynamic-benchmark copy from `content/results-copy.md` §Benchmark Stats, verified live on all four result pages (Architect, Builder, Explorer, Spectator). Landing-page copy now matches delivered content for this claim. Remaining gap: the shareability promise (R-11) — flagged, not built this session per user decision.
- **R-05** — Score interpretation. **Done 2026-08-24.** Added a one-line plain-language definition under each score card, set once in `Questions & Scoring → Categories` (a global per-category field, not per-page) and confirmed live on all four result pages via reload. Did *not* enable the scorecard-wide "Show score tier" badge — it would also stamp AI Readiness with the Contained/Meaningful/Significant/Substantial labels built for Workflow Opportunity, which reads oddly next to the archetype name already doing that job for AI Readiness (build log's own flagged risk). Full copy and rationale in `content/results-copy.md` §Score Display.
- **R-07** — Organizational scope. **Done 2026-08-24.** Used Q1's built-in "Show instruction" toggle (Questions → Q1 → Question settings) to add subtext above the headline: "Quick note before you start: answer for your company as a whole, not just your own team. If you don't have full visibility everywhere, answer based on what you can see — a partial view is still useful." Verified live on the actual quiz flow (draft-mode run-through), not just the editor preview.
- **R-10** — Landing-page trust signals. **Done 2026-08-24.** Added a second `.meta-row` under both primary CTAs (`index.html` hero and final-cta sections) reusing the existing meta-item/meta-sep styling, no new CSS: "Built by ReinventOps · A real scoring methodology, not a personality quiz · Follow-up emails are opt-in only" (hero) and the shortened "Built by ReinventOps · Follow-up emails are opt-in only" (final CTA). Brand name confirmed with user (only appeared in internal filenames before this, never in live copy). Privacy claim is accurate per `content/results-copy.md` §CTA: "No sequence fires without `opt_in = true`." Verified visually in-browser at both placements.
- **R-11** — Shareable artifact. **Done 2026-08-24 — scoped and built, turned out much smaller than assumed.** No PDF export or third-party service needed: ScoreApp has a **native "Share" section type** (Add Section → Tailored for Results → Share), already unlocked on the current plan. It renders a card with the score, a headline/subhead, a share-message field (for the social pre-fill text), and native Copy Link / Facebook / X / LinkedIn / WhatsApp buttons. Added it to the end of all four result pages, with archetype-specific copy: headline "Don't keep this to yourself.", subhead "Send it to your leadership team, your peers, or anyone who should see where your company stands.", share message "I just found out my company is a[n] {Archetype} on the AI Readiness Assessment — see where yours stands.", and card title "My {Archetype} score". Verified live on all four pages after save. Also fixed a real bug found along the way: the scorecard's own name was "The AI Readiness Assessment," which combined with the card's default "My {name} score" template to read "My The AI Readiness Assessment score" — renamed the scorecard to "AI Readiness Assessment" in Scorecard Settings → General, which fixed the grammar scorecard-wide (title bar, browser tab, any other place the name merge tag appears), independent of the archetype-specific card titles already typed in.
   - **Minor, not fixed:** each card also shows a small tier badge (e.g. "growth stage") pulled from Score Tiers automatically; it isn't a directly editable text field and wasn't investigated further given its low visual weight — flagged, not blocking.
- **R-12** — Verify/update the McKinsey 2021 statistic. **Done 2026-08-24.** The old "23% of the workweek, McKinsey 2021" figure did not check out against any McKinsey publication — treated as a fabricated citation and replaced with a verified one: "today's technologies could theoretically automate more than half — 57% — of current US work hours" (McKinsey Global Institute, "Agents, robots, and us: Skill partnerships in the age of AI," November 2025), confirmed across three independent sources. The stat appears 4× per result page (one per Workflow Opportunity band in the "Where this leaves you" positioning section) × 4 pages = 16 live instances, all updated and saved. Docs updated: `content/results-copy.md` §Benchmark Stats, Master Reference §7.5, build log Task 14 Step 5.
- **R-14** — Result-page finish (copyright/brand footer). **Done 2026-08-24** for the copyright text. The footer is a single **Global Footer** section (ScoreApp scorecard-wide, not per-page) — found it showing the literal unconfigured placeholder "© Copyright". Replaced with "© 2026 ReinventOps. All rights reserved."; verified it now renders correctly on every result page automatically (spot-checked Spectator and Builder) since it's one shared setting. **Resolved 2026-08-25:** the user uploaded the real ReinventOps logo via the scorecard's Footer/Theme Logo picker. Verified live in the builder — the Footer section on Architect and Explorer result pages now shows "Main logo" (with the real ReinventOps mark rendering in the thumbnail), not the "YOUR BRAND LOGO" placeholder, on both spot-checked pages.

---

## 2. Sequence

**Phase 1 — Finish what's already in motion (unblocks R-03, R-04, most of R-06)**

**Status: already complete, verified live 2026-08-24.** The build log (`docs/superpowers/plans/2026-08-21-assessment-v2-scoreapp-build.md`, Task 9 Step 2) reads as if only the Architect page had its 8 Q7-gated insight sections and the log entries below it only explicitly confirm Architect — but that log was stale. Live inspection of all four result pages in ScoreApp (2026-08-24) found:
- All four pages (Spectator, Explorer, Builder, Architect — note the page *slugs* are cosmetically mismatched, e.g. the page titled "Result — The Spectator" lives at `/result-the-explorer-copy`; this was already flagged as a known cosmetic issue, not a functional one) have the full section structure: hero, both scores, Category Scores, positioning+benchmark (dynamic content, 4 bands), all 8 Q7-gated insight sections with the correct "Time (bottlenecks)" copy per category, both CTA sections, and the not-qualified note.
- The positioning-statement dynamic content bands (relabeled "Early Stage / Growth Stage / High Opportunity / Ready for Transformation" instead of the raw tier names) were spot-checked on the Builder page and match the master reference's 2×2 cells exactly (readiness-high row, both opportunity-low and opportunity-high cells confirmed correct).
- CTA visibility and gate-specific behavior were already verified end-to-end for all four pages via the 15-persona regression in Task 11 (build log, 2026-08-23) — not re-verified again here since nothing about it changed.

No further action needed for Phase 1. ~~Replicate the Architect result page's structure...~~ ~~Verify Score Tiers...~~ ~~Re-run the 8-persona test matrix...~~ — all done.

**Phase 2 — Close the promise gap (R-02, part of R-01)**
4. Audit `index.html` claims against the now-complete result pages. Adjust any landing copy that promises something the result doesn't deliver (or vice versa — surface something built that isn't promised).
5. Check the lead-gate copy: does it say "complete results"? If so, confirm the unlocked page is materially richer than anything shown pre-gate (it is, once Phase 1 lands) — no wording change needed unless a pre-gate teaser exists that duplicates content.

**Phase 3 — Make the diagnosis feel earned (R-05, R-07). Done 2026-08-24.**
6. ~~Add a one-line plain-language definition under each visible score, plus its band label.~~ Done — see R-05 above.
7. ~~Add a scope-setting instruction before Q1.~~ Done — see R-07 above.

**Phase 4 — Credibility and polish (R-09, R-10, R-12, R-14). R-10/R-12/R-14 done 2026-08-24; R-09 not started.**
8. Tighten archetype narrative structure (diagnosis / risk / evidence / next-move visual separation) without rewriting the strategic content. **Done 2026-08-24.** Found the live ScoreApp hero text already differs from `content/archetypes.md`'s fuller version (it's a condensed variant, not a rendering bug — flagged as a separate drift issue below, not fixed here) and was rendered as 2 dense walls of text per page regardless. Split each of the 4 archetype heroes into 3–5 shorter paragraphs at *existing* sentence boundaries only — zero words added, changed, or removed — following a diagnosis → risk → evidence → next-move beat structure, and bolded the "Your next move:" label to match the visual pattern already used elsewhere on the page (CTA headlines, benchmark call-outs). Verified live on all four pages after save.
   - **New finding — copy drift, not part of this task:** the live archetype hero text is a condensed rewrite of `content/archetypes.md`'s copy (e.g. Architect's live version compresses "They don't ask... would we build it this way at all?" and drops the "companies that lead this transition" paragraph entirely). Not reconciled this session — restructuring formatting is in scope, auditing/resolving a live-vs-source-of-truth divergence is a separate content decision the user should weigh in on before any text changes.
9. ~~Add landing-page trust signals near the primary CTA.~~ Done — see R-10 above.
10. ~~Verify and, if needed, replace the McKinsey 2021 statistic.~~ Done — see R-12 above.
11. ~~Fix the result-page footer.~~ Done for copyright text — see R-14 above. Logo placeholder still needs a real asset from the user.

**Phase 5 — was flagged, done anyway**
12. ~~R-11 shareable artifact — needs its own scoping pass.~~ Scoped and built same session — see R-11 above. Turned out to be ScoreApp's native Share section, not a custom PDF/export build.

---

## Session status — 2026-08-24

**All 14 backlog items (R-01–R-14) are implemented and verified live.** Nothing deferred.

Two open follow-ups, neither blocking: the footer logo needs a real ReinventOps logo file from the user (asset gap, not a copy gap — R-14); and R-09's restructuring surfaced that the live archetype hero copy is a condensed rewrite of `content/archetypes.md`, not a verbatim match — flagged as a separate background task (not resolved unilaterally, since it's a content decision) rather than fixed in this pass.

---

## 4. Secondary CTA copy replacement — DONE (2026-08-24)

**Decision:** adapted into two variants rather than unifying to one. The user-supplied copy became the base for both, keeping the Builder/Architect (assumes-capability) vs. Spectator/Explorer (no-prerequisites-reassurance) split from Master Reference §7.6 — the two framings exist for a reason ("never imply the respondent failed" lands differently for a company already building vs. one still watching). Implemented on all four result pages (Architect 1967706, Builder 1967850, Explorer 1967860, Spectator 1967864) and verified live after reload. `content/results-copy.md` §CTA and Master Reference §7.6 updated to match.

<details>
<summary>Original pending-item note (superseded)</summary>

User supplied a specific replacement copy for the secondary "Book a Diagnostic Call" CTA section (currently the archetype-conditional "Talk through your results..." / "You don't need an AI strategy..." pair, `content/results-copy.md` §CTA, second CTA). This new copy is a single unified version, not archetype-conditional:

> **Don't stop at the score.**
>
> Your results suggest there may be a real opportunity inside your business. Now it's time to find out how big it is—and whether it's practical to act on.
>
> On a free call, we'll look at one workflow with you, pinpoint where AI could save you meaningful time or money, and help you figure out whether the opportunity is worth pursuing.
>
> **If there's something there, you'll leave knowing where to focus. If there isn't, you'll know that too.**
>
> [ Find Out If It's Worth Pursuing → ]
>
> *Free · No obligation*

**Decision needed before implementing:** does this replace both archetype-conditional variants with one unified CTA (simpler, but loses the Builder/Architect vs. Spectator/Explorer framing distinction that was deliberately built), or does it get adapted into two variants preserving that split? Master Reference §7.6 currently specifies two variants for a reason (see the "never imply the respondent failed" principle) — worth a quick gut-check against that before applying verbatim. If replacing both: this needs to be pasted into the second CTA section on all four result pages (Architect: page id 1967706, Builder: 1967850, Explorer: 1967860, Spectator: 1967864), and `content/results-copy.md` §CTA updated to match so the doc doesn't drift from the live copy.

</details>

---

## 3. Guardrails carried over from the consultant's handoff instructions

- Preserve the archetype progression and two-score concept as-is — no redesign.
- Don't invent benchmarks, ROI, or savings figures not already in the Master Reference.
- Implement by phase, verify each phase against the live site before moving to the next.
- Keep marketing consent separate from result access (already true — don't regress it).
- Any change to scoring bands, gates, or qualification logic is out of scope for this plan — that's the Master Reference's territory, not a copy review's.
