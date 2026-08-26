# Task 6 — Opt-in removal, unsubscribe, and rename verification

**Status:** DONE_WITH_CONCERNS — content docs, live Lead Form, scorecard name, transactional email, and logo all verified; unsubscribe-link and automated-sequence conditions are not testable because no live ScoreApp email automation exists yet for Sequences 2/3 (confirmed, not assumed — see Step 4 below).

## Step 1: No consent checkbox on the contact form

Verified live via the contact form rendered at the end of two fresh quiz runs this session (Scenario 22 reruns, `qa-test-scenario22@reinventops-test.com` and `qa-test-scenario22b@reinventops-test.com`). The form shows exactly: First name, Email, Company name, "Which area do you lead or work in?" — **no marketing-consent checkbox**. Confirmed the change at the source: `manage.scoreapp.com` → Settings → Lead Form → Data Protection Settings is now set to **Implied Consent** ("Your visitors will not see any optin checkbox"), saved and showing "Changes saved".

**Result: PASS.**

## Step 2: Results email delivered

`manage.scoreapp.com` → Settings → Result Email confirms **Send Result Email** is enabled, from `results@scoreappmail.com` / "ReinventOps Group", subject `{scorecard_name} Report`, body reading "Thank you for completing the {Scorecard | Name}." Not independently verified via inbox access in this session (no inbox access available) — the setting is on and unconditional (no opt-in-gate field exists on this settings page to disable it).

**Result: PASS (config-level; inbox delivery not independently observed).**

## Step 3: Follow-up sequence enrolls without any opt-in action

There is no separate opt-in gate remaining anywhere in the live account: confirmed no `Opt In` condition exists in any of the 20+ Audiences on this scorecard (`manage.scoreapp.com` → Audiences, full list read). Sequences 2/3 (non-booker follow-up, nurture) are documented in `content/follow-up-sequences.md` as a **manual process** (the doc's own "Automation vs. Manual" table says native ScoreApp emails don't support the conditional-block logic Sequence 3's four gate variants need) — confirmed live: `manage.scoreapp.com` → Integrate → Available Integrations shows Zapier/Webhooks/ActiveCampaign/etc. all in "Configure" (not-yet-connected) state, no automation is live. So there is nothing gating enrollment because there is no automated enrollment yet — this is unchanged from before Task 6 and out of Task 6's scope (Task 6 only had to remove the opt_in gate, not build the automation).

**Result: PASS (no opt-in gate exists to block enrollment) — with the caveat that "enrollment" itself remains a manual process, unrelated to this task.**

## Step 4: Marketing/nurture templates carry an Unsubscribe link

**Not testable live.** No ScoreApp-native email template exists yet for Sequences 2 or 3 (confirmed via the Integrate page above — no automation is connected). There is nothing to inspect for an Unsubscribe link. `content/follow-up-sequences.md` and `content/internal-brief-template.md` now correctly document the Unsubscribe requirement for whenever that automation is built (Task 6 Steps 3–4), but building the automation itself is future work, not part of this task's scope.

**Result: N/A — no live template exists to check.**

## Step 5: Unsubscribe suppresses future marketing/nurture email

**Not testable**, same reason as Step 4 — there is no live send to unsubscribe from yet.

**Result: N/A.**

## Steps 11–13 (rename, transactional email, logo) — verified in passing

- **Scorecard name:** `manage.scoreapp.com` → Settings → General confirms the name field reads exactly "AI Readiness Assessment" (no "The" prefix). **PASS.**
- **Transactional email copy:** Result Email body reads "Thank you for completing the {Scorecard \| Name}." → resolves to "Thank you for completing the AI Readiness Assessment." — no duplicate article. **PASS.**
- **Logo:** Footer section's Logo field reads "Main logo" with the real ReinventOps mark rendering in the thumbnail (not the "YOUR BRAND LOGO" placeholder), spot-checked on the Architect and Explorer result pages. **PASS.** Noted in `docs/superpowers/plans/2026-08-24-copy-review-implementation.md` (R-14) as resolved.

## Overall verdict

The opt-in removal is fully shipped and live-verified (Steps 1, 3, 11, 12, 13 all PASS). Steps 4–5 (unsubscribe behavior) cannot be tested because the underlying email automation this task depends on was never built in ScoreApp — that's a pre-existing gap unrelated to Task 6's opt-in-removal scope, tracked in `content/follow-up-sequences.md`'s own "Automation vs. Manual" section, not newly introduced or newly discovered here.

## Commit

See commit for this task.
