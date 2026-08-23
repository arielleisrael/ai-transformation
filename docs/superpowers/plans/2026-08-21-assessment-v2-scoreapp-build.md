# AI Readiness Assessment v2 — ScoreApp Build Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Configure the live ScoreApp assessment so it collects 14 questions, shows respondents an archetype plus two scores, and silently routes the Diagnostic CTA on a hidden qualification score — launch-ready without any external automation.

**Architecture:** Three ScoreApp Categories carry the three scoring layers; only AI Readiness counts toward the total. Four priority-ordered Audiences keyed to the AI Readiness category percentage plus answer-level conditions assign the archetype and route to four result pages. A separate Audience on the hidden Diagnostic Fit category controls whether the booking CTA section is visible. No code is written.

**Tech stack:** ScoreApp (Business plan, $99/mo) · Calendly · the account's email sender. No repository code changes except the landing page.

---

## This Is Not a Software Build — Read This First

There is no codebase, no test runner, and no git repository here. Adapting the usual TDD rhythm honestly:

| Normal | Here |
|---|---|
| Write a failing test | State the expected result for a named test persona |
| Run it, watch it fail | Take that persona through the live quiz, confirm current behavior is wrong or absent |
| Write the implementation | Configure it in the ScoreApp UI |
| Run it, watch it pass | Re-take the quiz as that persona, confirm the expected result |
| Commit | Record the result in the build log (§Build Log) |

**The test personas in §Test Fixtures are the test suite.** They are not illustrative — they have exact answers and exact expected outputs, and every task verifies against specific ones.

**UI paths are from official documentation, not the live account.** Where a path is written as `Build → Questions → Categories`, treat it as a strong hint, not gospel. If the UI differs, find the equivalent and note the real path in the build log.

**Recommended before starting:** run `git init` in this directory. Five content files were substantially rewritten and there is currently no history to recover from.

```bash
git init && git add -A && git commit -m "chore: baseline before v2 assessment build"
```

---

## Global Constraints

- **Plan tier:** ScoreApp Business ($99/mo) or higher. Audiences, multiple result pages, and section-level audience visibility all gate here.
- **Never use `max selections`** on any question. Undocumented denominator behavior would depress every score by a constant and corrupt the tier cutoffs invisibly.
- **Never put jump logic on a scored question.** Logic-skipping changes total points available, so two respondents get normalized against different denominators. The only permitted jump is Q7 → Q7b, and Q7b is unscored Open Text.
- **Every scored question is Required.** This sidesteps the undocumented question of whether an optional blank leaves the denominator.
- **Only one multi-select question exists: Q11b.** Its option values must sum to exactly its budget (10 in Layer B, 5 in Layer C). Per-option severity stays flat; differentiating it silently raises the question's weight.
- **Layer C must never render.** No result page, PDF, or respondent-facing email may display the Diagnostic Fit category or any value derived from it.
- **No email sequence may fire without `opt_in = true`.**
- **Copy is already written.** Question text and answer options come verbatim from `content/quiz-questions.md`; results copy from `content/results-copy.md`; archetype copy from `content/archetypes.md`. Do not rewrite copy while configuring. If copy looks wrong, stop and raise it.
- **Changes are NOT auto-saved.** The builder requires an explicit **Save** (top right). Leaving the page raises an "Unsaved Changes" dialog; clicking "Leave Page" discards everything. Save after every question.
- **Save is blocked by any validation error anywhere in the scorecard.** A single question with no text produces "You have 1 question error" and blocks saving *all* pending work, including unrelated category settings. Never leave a half-built question when moving on.
- **Admin URL is `manage.scoreapp.com`** (not `app.` — that redirects to the marketing site). Audiences and most builder screens are scoped to a selected scorecard and cannot be reached by direct URL.
- **Two different Save controls.** The *builder* (questions, categories, result pages) saves from a button top-right. *Settings* pages have their own **Save** at the bottom of the page, after scrolling. They are not the same control and one does not save the other.
- **Scorecard rename lives at `Settings → General → NAME`**, not in the card's `…` menu (which only offers Go to / Move / Clone / Delete).
- **Canonical spec:** `docs/AI-Readiness-Assessment-Master-Reference.md`. If any other document disagrees, that one wins.

---

## Test Fixtures

Eight personas. Each has exact answers to all 14 questions and an exact expected outcome. Every one exercises a distinct behavior — none is redundant, and between them they exercise **all three demotion gates and all the hard gates the quiz can detect**.

**Shared answers unless the persona overrides:** Q7 varies per persona and is unscored; function and consent are set at Q14.

| | **P1 Priya** | **P2 Marcus** | **P3 Dana** | **P4 Ellen** | **P5 Tom** | **P6 Raj** | **P7 Nadia** | **P8 Sofia** |
|---|---|---|---|---|---|---|---|---|
| **Q1** Role | VP | C-Suite | Owner/CEO | Director | Owner/CEO | **Individual Contributor** | VP | Director |
| **Q2** Size | 51–100 | 101–200 | **Under 25** | **Over 500** | 51–100 | 101–200 | 101–200 | 51–100 |
| **Q3** Breadth | across teams, differently | woven into ops | a few experimenting | across teams, differently | a few experimenting | across teams, differently | woven into ops | woven into ops |
| **Q4** Leadership | have a plan | top priority | starting to discuss | have a plan | top priority | have a plan | top priority | **no formal strategy** |
| **Q5** ROI | tools, no impact | measurable results | not really using | productivity gains | not really using | tools, no impact | productivity gains | productivity gains |
| **Q6** Ownership | part of wider role | dedicated team | no one | part of wider role | dedicated team | informal champions | dedicated team | dedicated team |
| **Q7** Category | Reporting | Research | Document creation | Approvals | Client comms | Sales ops | Approvals | Sales ops |
| **Q8** People | 6–15 | 2–5 | 2–5 | 16+ | 6–15 | 6–15 | 6–15 | 6–15 |
| **Q9** Frequency | Daily | Monthly | Weekly | Multiple daily | Daily | Daily | Weekly | Daily |
| **Q10** Hours | 21–40 | **Less than 5** | 5–10 | More than 40 | 11–20 | 21–40 | 11–20 | 21–40 |
| **Q11a** State | partly automated | **runs smoothly** | partly automated | entirely manual | entirely manual | tools don't talk | tools don't talk | entirely manual |
| **Q11b** Symptoms | 2 selected | **None of these** | 1 selected | 4 selected | 2 selected | 1 selected | 2 selected | 3 selected |
| **Q12** Cost | Money | Time | Time | Scale | Errors | Money | Scale | Money |
| **Q13** Act | Likely | Possibly | Possibly | Likely | **Very likely** | Likely | Likely | Likely |
| **Function** | Operations | Technology | Operations | Operations | Operations | Sales & Marketing | Technology | Operations |

### Expected outcomes

| Persona | Layer A | Archetype | Gate | Layer B | Tier | Layer C | Pillars | Decision | CTA? |
|---|---|---|---|---|---|---|---|---|---|
| **P1 Priya** | 54 | Explorer | — | 79 | Significant | 85 | 27/25/20/13 | **ACCEPT** | Yes |
| **P2 Marcus** | 100 | Architect | — | 26 | Contained | 53 | 8/19/12/14 | **REJECT · HG3** | **No** |
| **P3 Dana** | 18 | Spectator | G3 | 52 | Meaningful | 46 | 17/10/4/15 | **REJECT · below raised bar** | **No** |
| **P4 Ellen** | 62 | Builder | — | 98 | Substantial | 81 | 34/25/13/9 | **ACCEPT** | Yes |
| **P5 Tom** | 55 | **Spectator** | G3 | 75 | Significant | 80 | 25/29/11/15 | **ACCEPT** | **Yes** |
| **P6 Raj** | 46 | Explorer | — | 79 | Significant | 68 | 26/22/20/0 | **REJECT · HG2** | **No** |
| **P7 Nadia** | 91 | **Builder** | G1 | 71 | Significant | 77 | 24/25/15/13 | **ACCEPT** | Yes |
| **P8 Sofia** | 69 | **Explorer** | **G2** | 85 | Substantial | 70 | 29/17/15/9 | **ACCEPT** | Yes |

### What each persona proves

| Persona | Proves |
|---|---|
| **P1** | The baseline path works end to end. |
| **P2** | A perfect 100 AI Readiness Score with no workflow pain gets **no CTA**. v1 flagged this profile as a hot lead. |
| **P3** | The out-of-band size modifier turns a 46 from HOLD into REJECT. Without it, a sub-25-person company qualifies on the strength of Q1 = Owner alone. |
| **P4** | The same modifier lets the intentional exception through — 81 against a raised bar of 80. Both directions work. |
| **P5** | **A Spectator receives the Diagnostic CTA.** The single most important behavioral change in v2. If this persona sees no CTA, the archetype and the qualification are still coupled somewhere. |
| **P6** | A hard gate beats a strong score: 68 points, still REJECT, because an Individual Contributor cannot move a buying process. |
| **P7** | G1 demotion — 91 points lands in the Architect band, but no measurable results means the copy would lie, so they become a Builder. |
| **P8** | **G2 demotion** — 69 lands in the Builder band, but with no leadership strategy the Builder copy's opening line ("Leadership is paying attention") would be false. Also the profile the spec flags as worth watching: it reaches ACCEPT on workflow economics alone, with SF7 as the only warning. |

**Flags expected:** P1 → SF8, SF9 · P2 → SF4, SF5 · P4 → SF1, SF2, SF3, SF9, SF10 · P6 → none (HG2 gates them out before flags matter) · P7 → SF8 · P8 → **SF7**, SF2, SF8

---

## Build Order and Why

```
Task 1  Verify the two load-bearing platform behaviors   ← GO / NO-GO
Task 2  Verify multi-select, audience nesting, section hiding
        │
Task 3  Create the three Categories
Task 4  Build Q1–Q6  (Phase 1 + 2)
Task 5  Build Q7–Q12 (Phase 3, incl. the only multi-select and the only jump)
Task 6  Build Q13 + the contact form
        │
Task 7  Archetype Audiences + End Logic routing
Task 8  Qualification Audiences
Task 9  Build the four result pages
Task 10 Wire conditional CTA visibility
        │
Task 11 Run all seven personas end to end        ← acceptance gate
        │
Task 12 Internal notification email
Task 13 Email sequences with consent gating
Task 14 Landing page, Calendly, launch checks
```

Task 1 comes first because it can invalidate the whole approach. Do not build questions before it passes.

---

## Task 1: Verify the Two Load-Bearing Platform Behaviors

**This is a GO / NO-GO gate.** Both behaviors are confirmed in ScoreApp's official documentation but neither has been seen in this account. If either fails, the native build is impossible and the project pivots to the webhook plan immediately — before any configuration work is wasted.

**Where:** ScoreApp → a **throwaway scorecard**, not the live one. Name it `ZZ-SANDBOX — delete me`.

**Interfaces:**
- Produces: a confirmed yes/no on both behaviors, recorded in the build log. Every later task assumes both are YES.

- [ ] **Step 1: State the expected results**

Write these down before touching the UI, so the test cannot be rationalized after the fact:

> **Behavior A —** one answer option can award *different* point values to two different categories. Expected: an option can hold 25 in Category "AI Readiness" and 8 in Category "Diagnostic Fit" simultaneously.
>
> **Behavior B —** a category can be excluded from the total score. Expected: a setting exists (documented as `scoring_logic: none`) that keeps a category scoring itself while contributing nothing to the overall percentage.

- [ ] **Step 2: Build the sandbox**

Create scorecard `ZZ-SANDBOX — delete me`. Add two categories: `TEST-A` and `TEST-B`. Add one single-choice question, "Sandbox question", with two options: "High" and "Low".

- [ ] **Step 3: Test Behavior A**

On the option "High", assign **25 points to TEST-A** and **8 points to TEST-B**.

- PASS: the UI accepts both values and they persist after save/reload.
- FAIL: the option holds only one shared point value across categories.

- [ ] **Step 4: Test Behavior B**

Open TEST-B's category settings and look for a toggle governing whether it contributes to the total score (wording may be "add to total score", "include in overall score", or a scoring-logic dropdown with a "none" option). Set TEST-B to **not** contribute.

Submit the sandbox quiz selecting "High". Read the overall score.

- PASS: overall reflects TEST-A's 25 only; TEST-B still reports its own subscore.
- FAIL: overall includes TEST-B's 8, or TEST-B stops scoring entirely.

- [ ] **Step 5: Record and decide**

| Result | Action |
|---|---|
| Both PASS | **GO.** Record both, delete the sandbox, continue to Task 2. |
| A fails | **STOP.** Layer C cannot coexist with Layer A natively. Do not proceed — the webhook becomes a launch prerequisite, not a phase 2. |
| B fails only | **STOP AND RAISE.** Layer B and C would inflate the visible score. A workaround may exist (a second scorecard, or reweighting so contamination is tolerable) but it is a design decision, not an implementation one. |

- [x] **Step 6: Log the outcome** — ✅ **COMPLETE 2026-08-21. Both behaviors PASS. GO.**

Real UI paths, confirmed in the account:
- Categories: left icon rail → **Categories** (creatable with no questions present)
- Per-category score logic: select category → **LOGIC** tab → `Score logic` dropdown + `Hidden` toggle
- Per-answer scoring: left icon rail → **Questions** → select question → **ANSWERS** tab → per-answer `Scores` block listing each category with its own points field, plus `+ Add scoring` to attach more categories

Behavior A evidence: a single `Yes` answer held `TEST-A +25` and `TEST-B +8` simultaneously, in separate fields.

---

## Task 2: Verify Multi-Select, Audience Nesting, and Section Hiding

Three behaviors that shape *how* things get built rather than *whether*. None is a go/no-go, but each has a documented fallback that must be chosen now rather than mid-build.

**Interfaces:**
- Consumes: sandbox scorecard from Task 1 (recreate if deleted).
- Produces: a decision on Q11b's scoring, and on how the CTA section gets hidden (Task 10 branches on this).

- [ ] **Step 1: State the expected results**

> **C — multi-select denominator.** A 6-option checkbox at 2 points each has a potential of 12. Ticking one option should score **2/12 ≈ 17%**. This confirms `Σ(selected) ÷ Σ(all options)`.
>
> **D — audience nesting.** An Audience should express `X AND (Y OR Z)` — an AND of an OR-group. Hard gates HG4 and HG5 need this.
>
> **E — section hiding.** A result-page section should be controllable by audience membership — ideally both "show only to" and "hide from".

- [x] **Step 2: Test C — the multi-select denominator** — ✅ **CONFIRMED as documented, 2026-08-21**

Sandbox: `Yes` = 25 into TEST-A, plus a 6-option checkbox at 2 points each.

| Run | Ticked | Expected | Observed |
|---|---|---|---|
| 1 | 1 box | `(25+2)/(25+12)` = 73% | **73%** ✓ |
| 2 | 4 boxes | `(25+8)/(25+12)` = 89% | **89%** ✓ |

Had the denominator been the highest single option rather than the sum, run 1 would have read 100%. It read 73%. **`Σ(selected) ÷ Σ(all options)` confirmed — Q11b's design is safe exactly as specified in Task 5 Step 6, no recalculation needed.**

Run 1 also proved the total-score exclusion works in practice: TEST-B read 100% while the Overall Score read 73%, identical to TEST-A alone. Had TEST-B counted, the overall would have been 78%.

*(Original instructions retained below for reference.)*

- [ ] ~~Step 2 (original)~~

Add a multi-select question to the sandbox with 6 options at 2 points each into TEST-A. Submit, ticking exactly one.

- ~17% → confirmed as documented. **Q11b's design is safe as specified.**
- 100% → the denominator is the highest option, not the sum. Q11b's point values must be recalculated; **stop and raise** before Task 5.
- Anything else → record the exact number and raise.

- [x] **Step 3: Test D — audience nesting** — ✅ **RESOLVED 2026-08-21: no bracket control, but none needed**

The audience builder is **OR of AND-groups** (disjunctive normal form): each grey block is a set of conditions joined by AND, blocks are joined by OR via `Add an OR condition`. There is no nesting or bracket control.

That is sufficient. Any boolean expression distributes into this form — `X AND (Y OR Z)` becomes `(X AND Y) OR (X AND Z)`.

**But do not build the positive form.** Distributing the full CTA condition (four simple terms plus a 2-way and a 3-way OR-group) yields **6 blocks × 6 conditions = 36 hand-entered conditions**, where one wrong dropdown silently changes who gets a sales call. Build the inverse instead — see Task 8 Step 3.

Other details confirmed in the builder: condition rows offer `Category Score Actual` (with sibling options for percentage / tier), operators including `Is greater than or equal to`, and lead-answer conditions of the form *question → Answer → Is → value*. The audience header shows a live **"N existing matches"** count, and there is an `UPDATE PREVIOUS RESPONSES` action for retroactive segmentation.

*(Original instructions retained below.)*

- [ ] ~~Step 3 (original)~~

Create an Audience and try to build: `TEST-A score ≥ 10 AND (Sandbox question is not "High" OR Sandbox question is not "Low")`.

- PASS: build HG4 and HG5 as specified in Task 8.
- FAIL: use the fallback in Task 8 Step 5 — one Audience per gate, combined at the section-visibility layer.

- [x] **Step 4: Test E — section visibility direction** — ✅ **BOTH DIRECTIONS AVAILABLE, 2026-08-21**

Result page → select section → visibility dialog offers three radio options:
- `Visible` — everyone sees it
- `Hidden` — nobody sees it
- `Audience Based` — **show *or hide*** this section to a specific audience, with a toggle for direction and an audience picker

Hide-from-audience is available, which is what the Task 8 Step 3 construction depends on.

*(Original instructions retained below.)*

- [ ] ~~Step 4 (original)~~

On a sandbox result page, add a text section and open its visibility control. Determine whether it offers **show-if-in-audience**, **hide-if-in-audience**, or both.

Record which. Task 10 needs this: the CTA section is most simply built as *show-if-in* a "Diagnostic Qualified" audience, but if only *hide-if-in* exists, the audiences must be built inverted.

- [ ] **Step 5: Delete the sandbox and log**

Record all three results and the exact UI paths. Delete `ZZ-SANDBOX`.

---

## Task 3: Create the Three Categories

**Interfaces:**
- Consumes: Task 1's confirmation of Behaviors A and B.
- Produces: three named categories every subsequent question scores into. **Names must match exactly** — later tasks reference them by name.

- [ ] **Step 1: State the expected result**

> Three categories exist. A test submission returns three independent subscores. The overall score equals the AI Readiness subscore exactly.

- [ ] **Step 2: Create them**

`Build → Questions → Categories`. Create in this order (order matters — ScoreApp breaks ties by list position, and AI Readiness should win any tie):

| # | Name (exact) | Contributes to total? | Visible on results? |
|---|---|---|---|
| 1 | `AI Readiness` | **Yes** (`Add category score to total score`) | Yes |
| 2 | `Workflow Opportunity` | **No** (`Do not affect total score`) | Yes |
| 3 | `Diagnostic Fit` | **No** (`Do not affect total score`) | **Never — set `Hidden` = ON** |

> **Verified 2026-08-21 in the account.** Both controls live on the category's **LOGIC** tab: a `Score logic` dropdown (`Add category score to total score` / `Do not affect total score`) and a separate `Hidden` toggle.
>
> **These are two independent settings and `Diagnostic Fit` needs both.** Excluding a category from the total does **not** hide it from the respondent — this was proven empirically in the sandbox: TEST-B was set to "do not affect total score" and still rendered on the results page, in the donut legend and as its own score card. Setting `Hidden` = ON removed it completely.
>
> Without the Hidden toggle, every prospect would see their own qualification score. The configuration looks correct while this is wrong; it is only visible by taking the quiz and scrolling.

- [ ] **Step 3: Set the exclusion toggles**

Set `Workflow Opportunity` and `Diagnostic Fit` to not contribute to the total, using the control found in Task 1 Step 4.

- [ ] **Step 4: Verify**

Setting overall score = AI Readiness is deliberate: any stray ScoreApp UI that displays "your score" then shows the right number.

There are no questions yet, so full verification happens at the end of Task 4. Confirm now only that all three categories exist, are spelled exactly as above, and that two are marked as non-contributing.

- [ ] **Step 5: Log**

Record the three names and their toggle states.

---

## Task 4: Build Questions Q1–Q6

Six single-choice questions. Q1 and Q2 score into `Diagnostic Fit` only. Q3–Q6 score into **both** `AI Readiness` and `Diagnostic Fit`, at different values — this is where Behavior A does its work.

**Files:** source copy is `content/quiz-questions.md` §2–§3.

**Interfaces:**
- Consumes: the three categories from Task 3.
- Produces: a complete `AI Readiness` score (0–100) and Pillars 2–4 of `Diagnostic Fit`.

- [ ] **Step 1: State the expected result**

> After this task, submitting **P1 Priya's** Q1–Q6 answers yields `AI Readiness = 54`. Submitting **P2 Marcus's** yields `AI Readiness = 100`.

> **Head start from Task 3:** the scorecard's default placeholder question has already been given Q1's text — *"What's your role at your company?"* — because a question with no text blocked saving the category settings. **Its type is still `Yes/No/Maybe` and it has no answer options or scoring.** Change the type to multiple choice and build it out as below.

- [ ] **Step 2: Build Q1 and Q2**

All questions: single choice, **Required**, no jump logic.

**Q1 — "What's your role at your company?"**

| Option | AI Readiness | Diagnostic Fit |
|---|---|---|
| Owner / Founder / CEO | 0 | 15 |
| C-Suite (COO, CTO, CIO, CFO…) | 0 | 14 |
| VP | 0 | 13 |
| Director / Head of Department | 0 | 9 |
| Manager | 0 | 5 |
| Individual Contributor | 0 | 0 |

**Q2 — "About how many employees does your company have?"**

| Option | AI Readiness | Diagnostic Fit |
|---|---|---|
| Under 25 | 0 | 1 |
| 25–50 | 0 | 4 |
| 51–100 | 0 | 8 |
| 101–200 | 0 | 8 |
| 201–300 | 0 | 5 |
| 301–500 | 0 | 3 |
| Over 500 | 0 | 2 |

- [ ] **Step 3: Build Q3–Q6 with dual-category scoring**

**Q3 — "Which best describes AI adoption across your company right now?"**

| Option | AI Readiness | Diagnostic Fit |
|---|---|---|
| A few people are experimenting on their own | 4 | 2 |
| We use AI across teams, but each team does it differently — no shared approach | 11 | **6** |
| Most of our team uses AI as part of how they work | 18 | 4 |
| AI is woven into our operations — it's infrastructure, not just a tool | 25 | 2 |

**Q4 — "Where does your leadership stand on AI?"**

| Option | AI Readiness | Diagnostic Fit |
|---|---|---|
| No formal strategy yet — mostly individual decisions | 3 | 0 |
| We're starting to discuss it at a leadership level | 10 | 4 |
| We have an AI plan and we're actively working on it | 18 | 7 |
| AI is a top strategic priority with full executive buy-in | 25 | 8 |

**Q5 — "Honestly — is AI actually moving the needle at your company?"**

| Option | AI Readiness | Diagnostic Fit |
|---|---|---|
| We're not really using it yet | 1 | 1 |
| We're using AI tools but haven't seen clear business impact | 8 | **6** |
| We see productivity gains, but nothing that's changed the company overall | 16 | 5 |
| Yes — we can point to real, measurable business results | 25 | 2 |

**Q6 — "Who's accountable for AI at your company?"**

| Option | AI Readiness | Diagnostic Fit |
|---|---|---|
| No one specifically — it's whoever's interested | 3 | 1 |
| A few informal champions, but it isn't anyone's actual job | 9 | 4 |
| Someone owns it as part of a wider role | 17 | **7** |
| We have a dedicated owner or team accountable for AI outcomes | 25 | 6 |

**The Q3 and Q5 Diagnostic Fit columns are inverted-U on purpose.** The middle answers score highest because fragmented adoption and unproven ROI are the ICP's target state. If a reviewer flags these as errors, point them at the master reference §6.2 — they are the entire reason two scores exist.

- [ ] **Step 4: Verify**

Take the quiz twice, answering only Q1–Q6:

| Answers | Expected AI Readiness | Expected Diagnostic Fit so far |
|---|---|---|
| P1 Priya's Q1–Q6 | **54** | 13 + 8 + 6 + 7 + 6 + 7 = **47** |
| P2 Marcus's Q1–Q6 | **100** | 14 + 8 + 2 + 8 + 2 + 6 = **40** |

If AI Readiness is right but Diagnostic Fit is wrong, a per-category value was entered into the wrong column — recheck each option rather than adjusting totals.

- [ ] **Step 5: Log**

Record both observed scores against expected.

---

## Task 5: Build Questions Q7–Q12

The most intricate task: it contains the only unscored question, the only jump, and the only multi-select.

**Files:** source copy is `content/quiz-questions.md` §4.

**Interfaces:**
- Consumes: categories from Task 3.
- Produces: the complete `Workflow Opportunity` score (0–100) and Pillar 1 of `Diagnostic Fit`.

- [x] **Step 1: State the expected result**

> Submitting **P4 Ellen's** Q7–Q12 answers yields `Workflow Opportunity = 98`. Submitting **P2 Marcus's** yields `26`.

- [x] **Step 2: Build Q7 — unscored**

**"Think about one workflow that consistently costs more time, effort, or money than it should. Which category fits best?"** — single choice, Required, **zero points in every category**.

Reporting & data aggregation · Document creation & review · Client or customer communications · Research & analysis · Approval & review processes · Employee or client onboarding · Sales operations & CRM · Other — something else

Leave it uncategorised or explicitly set every option to 0 in all three categories. Q7's job is selecting the insight paragraph, not scoring. In v1 it scored 8–10 for named categories and 0 for "Other", so the honest answer silently tanked the respondent's score.

- [x] **Step 3: Build Q7b — the only jump**

**"In a sentence, what is it?"** — **Open Text**, **Optional**, unscored.

Set jump logic on **Q7** so that selecting "Other — something else" routes to Q7b, and every other option skips it to Q8.

This is the one permitted exception to the no-jump-logic rule, and only because Open Text is never scored — a skipped unscored question cannot change the denominator.

**Route taken: native.** Q7 uses ScoreApp's built-in `"Other" option` toggle; no Q7b question and no jump logic were created. Whether that native option captures free text is unconfirmed — verify at Task 11 and add Q7b as Open Text if it does not.

- [x] **Step 4: Build Q8–Q10**

All single choice, Required, no jump logic.

**Q8 — "How many people on your team touch this workflow?"**

| Option | Workflow Opportunity | Diagnostic Fit |
|---|---|---|
| Just me | 2 | 1 |
| 2–5 people | 7 | 2 |
| 6–15 people | 12 | 4 |
| 16 or more people | 15 | 5 |

Monotonic on purpose. v1 scored 16+ *below* 6–15; more people on a repetitive workflow means more leverage, and the complexity concern is now flag SF3.

**Q9 — "How often does this workflow run?"**

| Option | Workflow Opportunity | Diagnostic Fit |
|---|---|---|
| Multiple times per day | 15 | 5 |
| Daily | 13 | 4 |
| Weekly | 10 | 3 |
| Monthly | 5 | 2 |
| Quarterly | 1 | 0 |

**Q10 — "How many hours per week does your team collectively spend on this workflow?"**

| Option | Workflow Opportunity | Diagnostic Fit |
|---|---|---|
| Less than 5 hours | 4 | 1 |
| 5–10 hours | 13 | 5 |
| 11–20 hours | 22 | 8 |
| 21–40 hours | 29 | 10 |
| More than 40 hours | 35 | 12 |

- [x] **Step 5: Build Q11a**

**"Which best describes how this workflow runs today?"** — single choice, Required.

| Option | Workflow Opportunity | Diagnostic Fit |
|---|---|---|
| Entirely manual — spreadsheets, email, or paper | 15 | 4 |
| We have tools for it, but they don't talk to each other | 13 | 3 |
| Partly automated, but it still takes significant hands-on work | 11 | 3 |
| It runs smoothly — I'm mostly here to explore what's possible | 1 | 0 |

That last option is hard gate HG3. Its exact wording is referenced by an Audience condition in Task 8 — **do not reword it.**

- [x] **Step 6: Build Q11b — the only multi-select**

**"Which of these also apply? Select all that apply."** — **multi-select**, Required, **no min/max selections**.

| Option | Workflow Opportunity | Diagnostic Fit |
|---|---|---|
| It depends on one or two people — if they're out, it stalls | 2 | 1 |
| It's complex, with a lot of steps or handoffs | 2 | 1 |
| Work sits waiting for someone to review or approve it | 2 | 1 |
| Mistakes slip through and get caught later | 2 | 1 |
| The same information gets entered or copied more than once | 2 | 1 |
| None of these | 0 | 0 |

Σ(all options) = 10 in Workflow Opportunity and 5 in Diagnostic Fit — exactly the budgets. This is the only configuration that bounds a multi-select natively.

**Do not vary the per-option values.** Making "depends on one or two people" worth 3 would raise Σ to 11 and silently increase the whole question's weight inside Layer B.

**"None of these" is worth 0**, so a respondent ticking it alongside symptoms cannot move the score — necessary because ScoreApp has no exclusive-option behavior.

- [x] **Step 7: Build Q12**

**"What does this workflow cost your company most?"** — single choice, Required.

| Option | Workflow Opportunity | Diagnostic Fit |
|---|---|---|
| Money — the labor cost is significant | 10 | 4 |
| Scale — we can't grow without adding headcount | 10 | 4 |
| Errors — mistakes happen and they're expensive | 9 | 3 |
| Time — it creates constant bottlenecks | 9 | 3 |
| Customer experience — slow or inconsistent handling costs us business | 9 | 3 |
| Team morale — it's tedious and people hate it | 7 | 2 |

- [x] **Step 8: Verify**

| Answers | Expected Workflow Opportunity |
|---|---|
| P4 Ellen's Q7–Q12 (16+, multiple daily, >40hrs, entirely manual, 4 symptoms, Scale) | **98** |
| P2 Marcus's Q7–Q12 (2–5, monthly, <5hrs, runs smoothly, None of these, Time) | **26** |

Then verify the multi-select specifically: take the quiz twice as P4 but tick **1** symptom, then **4**. Workflow Opportunity should differ by exactly **6** (2 points × 3 extra symptoms). If it differs by more or less, the per-option values are wrong.

Also confirm Q7 = "Other" reveals Q7b, and that any other Q7 answer skips it.

- [x] **Step 9: Log**

Record both scores, the multi-select delta, and whether the jump fired correctly.

---

## Task 6: Build Q13 and the Contact Form

**Files:** source copy is `content/quiz-questions.md` §5–§6.

**Interfaces:**
- Consumes: categories from Task 3.
- Produces: Pillar 2's largest input, plus `function` and `opt_in` — both consumed by Audiences in Task 8 and by every email sequence in Task 13.

- [x] **Step 1: State the expected result**

> Q13 exists, scores into `Diagnostic Fit` only, and adds nothing to either visible score. The contact form captures function and consent, and consent is optional rather than blocking.

- [x] **Step 2: Build Q13**

New phase, "Ready to move". Placed **after** the workflow block and **before** contact capture — by then the respondent has articulated concrete pain, so the commitment question reads as a consequence rather than a sales probe.

**"If there were a clear business case for improving this workflow with AI or automation, how likely is your company to act on it in the next 6 months?"** — single choice, Required.

| Option | AI Readiness | Workflow Opportunity | Diagnostic Fit |
|---|---|---|---|
| Very likely — this is already a priority | 0 | 0 | 15 |
| Likely — if the ROI is compelling | 0 | 0 | 11 |
| Possibly — we're exploring | 0 | 0 | 5 |
| Unlikely — mostly curious right now | 0 | 0 | 0 |

That last option is hard gate HG1. Its wording is referenced by an Audience in Task 8 — **do not reword it.**

- [x] **Step 3: Build the contact form**

`Settings → Lead Form`. Heading: **"Almost done. Where should we send your results?"** Subtext: **"We'll send your personalized AI Readiness Brief here — your archetype, your score, and a summary of your biggest opportunity."**

| Field | Type | Required |
|---|---|---|
| First name | Text | Yes |
| Last name | Text | Yes |
| Company name | Text | Yes |
| Email address | Email | Yes |
| Which area do you lead or work in? | **Dropdown** | Yes |

**Last name added 2026-08-23.** It ships enabled by default and `content/internal-brief-template.md` consumes it in both the subject line (`{first_name} {last_initial}.`) and the respondent block. Removing it would break the brief.

**Set `DEFAULT LEAD FORM BEHAVIOUR` to `After Questions`.** It defaults to `Before Questions`, which forces signup ahead of Q1 and contradicts the whole design — the form belongs after Q13.

Dropdown options: Operations · Technology / IT / Engineering · Transformation / Strategy / Innovation · Finance · Sales & Marketing · HR & People · Customer Service · Other

Lead-form fields cannot be scored. Function drives flag SF8 through an Audience, not through points — this is why Pillar 4 is Q1 alone at 15.

- [x] **Step 4: Configure consent**

Set consent mode to **Explicit Consent (Optional)** — checkbox shown, submission allowed without ticking.

Optional rather than Required so a missing tick does not cost the lead: the results page delivers instantly on screen regardless. ScoreApp stores a timestamp plus the exact wording and passes `opt_in` on every webhook event.

Add the Privacy Policy URL if the account has one.

- [ ] **Step 5: Verify** — ⏸ **DEFERRED TO TASK 11.** Result pages do not exist until Task 9, so "both should complete and show results" cannot be evaluated yet. Run the consent-on / consent-off pair as part of the P1 and P2 persona runs.

Submit once ticking consent and once not. Both should complete and show results. In `Leads`, confirm the two records differ in opt-in status and that function was captured.

Confirm Q13 moved `Diagnostic Fit` but left `AI Readiness` and `Workflow Opportunity` unchanged.

- [x] **Step 6: Log**

Record consent mode, and confirm both submissions completed.

---

## Task 7: Build Archetype Audiences and End Logic Routing

Where the three demotion gates get implemented. Priority ordering does the work — ScoreApp evaluates top-down and the first match wins, so each rule only needs to express its own gates.

**Interfaces:**
- Consumes: `AI Readiness` category percentage; exact answer wording from Q3, Q4, Q5.
- Produces: exactly one archetype audience per respondent, consumed by End Logic and by Task 9's result pages.

- [x] **Step 1: State the expected result**

> Each of the eight personas lands in exactly one archetype audience, matching the Expected Outcomes table. Critically: **P7 Nadia scores 91 and must land in Builder, not Architect** (G1); **P8 Sofia scores 69 and must land in Explorer, not Builder** (G2); **P5 Tom scores 55 and must land in Spectator, not Builder** (G3). One persona per gate.

- [ ] **Step 2: Confirm they currently fail** — ⏸ **DEFERRED TO TASK 11.** Needs a completed submission, which needs the result pages from Task 9.

Before creating any audience, take the quiz as **P7 Nadia**. With no gates in place, 91 falls in the 80–100 band and would be an Architect. Confirm this is the current behavior. That is the bug the gates fix.

- [x] **Step 3: Create the four audiences in this exact order**

`Audiences → Create`.

**Correction, 2026-08-23: creation order is NOT load-bearing.** The Audiences list has no priority — it sorts by Name or Size, and audiences are overlapping membership sets (a 91-scoring Architect also satisfies Builder, Explorer and Spectator). First-match-wins priority is configured in **End Logic → Audience Redirects** at Step 4. Build the four in any order; get the ordering right there.

**1. `Archetype — Architect`**
```
AI Readiness percentage  is greater than or equal to  80
AND  Q5  is  "Yes — we can point to real, measurable business results"
```
The second condition is gate G1.

**2. `Archetype — Builder`**
```
AI Readiness percentage  is greater than or equal to  55
AND  Q4  is not  "No formal strategy yet — mostly individual decisions"
AND ( Q3  is not  "A few people are experimenting on their own"
      OR  Q5  is not  "We're not really using it yet" )
```
The second condition is G2; the OR-group is G3, expressed as `NOT(A AND B) = (NOT A) OR (NOT B)`.

**3. `Archetype — Explorer`**
```
AI Readiness percentage  is greater than or equal to  30
AND ( Q3  is not  "A few people are experimenting on their own"
      OR  Q5  is not  "We're not really using it yet" )
```

**4. `Archetype — Spectator`** — no conditions, or a condition matching everyone. This is the catch-all and **must sit last**.

- [ ] **Step 4: Set End Logic** — ⏸ **BLOCKED ON TASK 9.** Return here once the four result pages exist. **This is where archetype priority is actually enforced** — the Audiences list itself has no ordering.

`End Logic → Configure Logic → Audience Redirects`. Map each audience to its result page (created in Task 9 — return here if pages must exist first). Confirm the drag-to-order priority matches the order above.

**Do not use "Outcome / Highest Category" routing.** These archetypes are ordinal levels, not parallel personality types; highest-category matching would be conceptually wrong and would inherit ScoreApp's arbitrary tie-breaking.

- [ ] **Step 5: Verify all seven** — ⏸ **DEFERRED TO TASK 11**, which already runs all eight personas.

| Persona | AI Readiness | Expected audience | Why |
|---|---|---|---|
| P1 Priya | 54 | Explorer | band |
| P2 Marcus | 100 | Architect | band, G1 passes |
| P3 Dana | 18 | Spectator | band |
| P4 Ellen | 62 | Builder | band |
| **P5 Tom** | **55** | **Spectator** | **G3 demotes from Builder** |
| P6 Raj | 46 | Explorer | band |
| **P7 Nadia** | **91** | **Builder** | **G1 demotes from Architect** |
| **P8 Sofia** | **69** | **Explorer** | **G2 demotes from Builder** |

P5, P7 and P8 are the whole point of this task — one per demotion gate. If any lands in its un-demoted band, that gate's condition is wrong.

- [x] **Step 6: Log**

Record all eight observed audiences against expected.

---

## Task 8: Build Qualification Audiences

The invisible half. Two audiences on the hidden `Diagnostic Fit` category, carrying all five hard gates.

**Interfaces:**
- Consumes: `Diagnostic Fit` percentage; exact wording from Q1, Q3, Q4, Q5, Q8, Q10, Q11a, Q13.
- Produces: `Diagnostic Qualified` and `Diagnostic Priority`, consumed by Task 10's section visibility and Task 13's sequences.

- [x] **Step 1: State the expected result**

> **P1, P4, P5, P7, P8** land in `Diagnostic Qualified`. **P2, P3, P6** do not. P6 is the sharp test: 68 points, comfortably above 45, still excluded because HG2 fires.

- [ ] **Step 2: Confirm it currently fails** — ⏸ **DEFERRED TO TASK 11.** Needs a completed submission, which needs the result pages from Task 9.

Take the quiz as **P6 Raj**. Diagnostic Fit should read 68. With no gates, that qualifies. Confirm — that is the bug.

- [x] **Step 3: Create `Diagnostic Disqualified` — the inverse, not the positive**

**Build who is EXCLUDED, not who qualifies.** Verified 2026-08-21: the audience builder is OR-of-AND-groups with no nesting. The positive form distributes to 36 hand-entered conditions; the inverse collapses to **9**, because each hard gate is conjunctive and inverts into a single block.

One block per gate — so it is auditable at a glance, and a gate can be changed without touching the others. It also uses only the `Is` operator, so it does not depend on `Is not` existing.

| Block | Conditions (AND within the block) | Gate |
|---|---|---|
| 1 | Q13 **is** "Unlikely — mostly curious right now" | HG1 |
| 2 | Q1 **is** "Individual Contributor" | HG2 |
| 3 | Q11a **is** "It runs smoothly — I'm mostly here to explore what's possible" | HG3 |
| 4 | Q10 **is** "Less than 5 hours" **AND** Q8 **is** "Just me" | HG4 |
| 5 | Q3 **is** "A few people are experimenting on their own" **AND** Q4 **is** "No formal strategy yet — mostly individual decisions" **AND** Q5 **is** "We're not really using it yet" | HG5 |
| 6 | Diagnostic Fit percentage **is less than or equal to** 44 | below threshold |
| 7 | ( Q2 **is** "Under 25" **OR** "Over 500" ) **AND** Diagnostic Fit **≤** 59 | out-of-band raised bar — see Step 6 |

Blocks are joined with `Add an OR condition`. Use the **percentage** variant of the category-score condition, not `Category Score Actual`, so the thresholds stay meaningful if any point total is ever retuned.

Note block 7 replaces the separate out-of-band audience: an out-of-band respondent below 60 is disqualified, and one at 60+ falls through to the ACCEPT/HOLD logic in Step 6.

HG5 is deliberately narrower than archetype gate G3 — it additionally requires Q4. A Spectator who clears HG5 is **not** in this audience and therefore **does** see the CTA. That is P5 Tom, and it is the point.

- [x] **Step 4: Create `Diagnostic Priority`**

A positive audience this time, and simple because it has no OR-groups — it only ever *adds* emphasis, never grants a CTA:

```
Diagnostic Fit percentage  is greater than or equal to  65
```

Drives internal ranking and the CRM tag. A respondent in both `Diagnostic Priority` and `Diagnostic Disqualified` is disqualified — the CTA hide rule in Task 10 wins, because hiding is applied at the section level regardless of other audience membership. Verify this precedence during Task 11 with **P6 Raj** (Diagnostic Fit 68, HG2 fired): he must land in `Diagnostic Priority` and still see **no CTA**.

- [x] **Step 5: Optional — split the gates into separate audiences for internal reporting**

The single `Diagnostic Disqualified` audience is enough to drive the CTA. But the internal brief and the four gate-specific nurture emails (Task 13) need to know *which* gate fired, and a single audience cannot tell you that.

If ScoreApp's Leads view is where you will triage, build five additional single-purpose audiences — `DQ-HG1` through `DQ-HG5` — each containing just that gate's block from Step 3. They cost nothing, they make the Leads list filterable by disqualification reason, and Task 13's nurture routing can key off them directly.

Skip this only if you intend to do that routing in the phase-2 webhook instead.

- [x] **Step 6: Handle the company-size threshold modifier** — ⚠️ **SKIPPED AS REDUNDANT, 2026-08-23.** Already implemented by Step 3 blocks 6 and 7; see below.

Out-of-band companies face a raised bar: HOLD 60 / ACCEPT 80 instead of 45 / 65.

> ⚠️ **Superseded 2026-08-23 — do not build what follows.** Step 3's blocks 6 and 7 already implement this. Disqualified-by-score is `DF ≤ 44 OR (out-of-band AND DF ≤ 59)`, which qualifies at **45+ in band** and **60+ out of band** — exactly the intended raised bar. The construction below cannot be executed as written anyway: it amends a `Diagnostic Qualified` audience that Step 3 never creates (Step 3 builds the inverse), and its positive form restates all five hard gates conjunctively, reintroducing the 36-condition explosion the inverse construction exists to avoid. Task 10 hides the CTA from `Diagnostic Disqualified`, so no positive audience is needed anywhere. Retained below for the record only.

<details><summary>Superseded original text</summary>

Add a third audience, `Diagnostic Qualified — Out of Band`:
```
( Q2 is "Under 25"  OR  Q2 is "Over 500" )
AND  Diagnostic Fit percentage  is greater than or equal to  60
AND  [all five hard-gate conditions, as Step 3]
```

Then amend `Diagnostic Qualified` (Step 3) to additionally require:
```
AND  Q2  is not  "Under 25"
AND  Q2  is not  "Over 500"
```

so the two audiences are mutually exclusive and in-band respondents keep the 45 threshold. Task 10 shows the CTA to **either** audience.

This is what makes **P3 Dana** (46, Under 25) fail while **P4 Ellen** (81, Over 500) passes.

</details>

**What actually ships:** nothing extra. P3 Dana (46, Under 25) is caught by block 7a because 46 ≤ 59; P4 Ellen (81, Over 500) clears it because 81 > 59 and no hard gate fires.

- [ ] **Step 7: Verify all seven** — ⏸ **DEFERRED TO TASK 11**, which already runs all eight personas. Logic verified on paper (see build log).

| Persona | Diagnostic Fit | Size band | Qualified? | Reason |
|---|---|---|---|---|
| P1 Priya | 85 | in | **Yes** | ≥ 65, priority |
| P2 Marcus | 53 | in | **No** | HG3 |
| P3 Dana | 46 | **out** | **No** | 46 < 60 raised bar |
| P4 Ellen | 81 | **out** | **Yes** | 81 ≥ 80 |
| P5 Tom | 80 | in | **Yes** | clears HG5 despite Spectator |
| P6 Raj | 68 | in | **No** | HG2 beats the score |
| P7 Nadia | 77 | in | **Yes** | ≥ 65, priority |
| P8 Sofia | 70 | in | **Yes** | ≥ 65 despite zero leadership — SF7 flags it |

- [x] **Step 8: Log**

Record all eight, plus which audience construction was used.

---

## Task 9: Build the Four Result Pages

**Files:** copy comes from `content/archetypes.md` (hero) and `content/results-copy.md` (everything else).

**Interfaces:**
- Consumes: the four archetype audiences from Task 7.
- Produces: four result pages, each with a CTA section that Task 10 makes conditional.

- [x] **Step 1: State the expected result**

> Four pages exist, each showing the correct archetype hero, both scores, the positioning statement, benchmark, insight paragraph, and both CTAs. **No page displays anything from `Diagnostic Fit`.**

- [ ] **Step 2: Build the shared structure** — 🚧 **IN PROGRESS.** Architect page has items 1–5 (hero, both scores, positioning, benchmark). Items 6–9 (insight, CTAs, not-qualified note) outstanding; Builder / Explorer / Spectator pages not started.

Each page, top to bottom:

1. **Archetype hero** — name, tagline, full description, "Your next move". Verbatim from `content/archetypes.md`.
2. **AI Readiness Score** + the archetype sub-headline from `results-copy.md` §Score Display.
3. **Workflow Opportunity Score** + tier label + tier sub-headline.
4. **Positioning statement** — the 2×2 cell matching this archetype's readiness half. Architect and Builder pages use the "Readiness high" row; Explorer and Spectator use "Readiness low".
5. **Benchmark** — static McKinsey stat + the dynamic Q10 annual-hours and cost line.
6. **Insight paragraph** — conditional on Q7 + Q12, 48 variants.
7. **Primary CTA** — "Get your AI Readiness Brief".
8. **Secondary CTA** — booking. Made conditional in Task 10.
9. **Not-qualified note.** Made conditional in Task 10.

- [x] **Step 3: Suppress the default headline** — ✅ **SATISFIED BY CONSTRUCTION.** "Start without a template" yields a blank page with no default headline. Avoid the pre-built section templates, which inject "Thank you for taking the {scorecard name}".

Remove or blank the default "Thank you for taking the AI Readiness Assessment" heading. The archetype reveal is the hero; reintroducing the quiz name above it reads as a reset. Move the email delivery notice **below** the score card.

- [ ] **Step 4: Configure the insight paragraph** — ⚠️ **NOT BUILDABLE AS WRITTEN — needs an owner decision.** Dynamic content is score-keyed only; question answers are unavailable. See the build log and the open question in Task 9 notes.

48 variants: 8 workflow categories × 6 pain types, triggered by Q7 + Q12.

If ScoreApp supports only single-question conditional copy, use **Q7** as the trigger and each category's **"Time (bottlenecks)"** variant as the default — it is the most broadly applicable. Record which route was taken; falling back costs real personalization and is worth revisiting in phase 2.

- [ ] **Step 5: Verify**

Take the quiz as each of P1, P2, P4, P5. Confirm the correct archetype hero, that both scores display and match the expected table, and that the insight paragraph matches that persona's Q7 + Q12.

Then the critical negative check: **scroll each page to the bottom looking for any Diagnostic Fit value.**

This is not hypothetical. In the Task 1 sandbox, a category excluded from the total score still rendered in the results donut legend *and* as a standalone score card further down the page. The `Hidden` toggle set in Task 3 is what prevents it — this step confirms that toggle actually took effect.

A respondent seeing their own qualification score is the worst failure this build can produce, and it is invisible from the configuration screens.

- [ ] **Step 6: Log**

Record all four pages built, and explicitly confirm Diagnostic Fit is invisible on every one.

---

## Task 10: Wire Conditional CTA Visibility

The step that decouples qualification from archetype.

**Interfaces:**
- Consumes: `Diagnostic Qualified` and `Diagnostic Qualified — Out of Band` from Task 8; the four result pages from Task 9.
- Produces: launch-ready results pages.

- [ ] **Step 1: State the expected result**

> **P5 Tom sees the booking CTA on the Spectator page.** **P2 Marcus does not see it on the Architect page.** Under v1 both were exactly backwards.

- [ ] **Step 2: Confirm it currently fails**

Take the quiz as P2 Marcus. The booking CTA is currently unconditional, so it shows. Confirm — that is the bug.

- [ ] **Step 3: Make the booking CTA conditional**

On **all four** result pages, select the booking CTA section and open its visibility dialog. Choose **`Audience Based`**, set the direction toggle to **hide** rather than show, and pick **`Diagnostic Disqualified`**.

Verified 2026-08-21: the dialog offers `Visible` / `Hidden` / `Audience Based — show or hide this section to a specific audience`, with a direction toggle and audience picker.

Hiding from the disqualified audience — rather than showing to a qualified one — is what lets Task 8 use the 9-condition construction instead of the 36-condition one.

- [ ] **Step 4: Apply the two CTA framings**

Same Calendly link, different body copy — from `results-copy.md` §CTA:

| Pages | Body copy |
|---|---|
| Builder, Architect | "Talk through your results with our team. We'll examine the workflow you identified from both the business and technical sides and determine whether there's a practical opportunity worth pursuing — and roughly what it's worth." |
| Spectator, Explorer | "You don't need an AI strategy to have this conversation — you need one workflow worth examining, and you've just described one. We'll look at it from both the business and technical sides and tell you honestly whether it's the right place to start." |

A qualifying Spectator is not a lesser lead. Framing the Diagnostic as prerequisite-free is what makes it reachable for them.

- [ ] **Step 5: Add the not-qualified note**

Inverse visibility of the booking CTA — shown only to respondents in neither qualified audience.

Four variants keyed to which gate fired, from `results-copy.md`. If per-gate conditional visibility is too fiddly for launch, use the **HG5 / early-stage** variant as a single default — it is the least presumptuous — and record the simplification.

Never imply the respondent failed. Every variant gives them something to do and a reason to keep the page.

- [ ] **Step 6: Verify the full 2×2**

| Persona | Page | CTA? | This proves |
|---|---|---|---|
| **P5 Tom** | Spectator | **Yes** | low archetype **can** qualify |
| **P2 Marcus** | Architect | **No** | high archetype **can** fail |
| P1 Priya | Explorer | Yes | mid/mid baseline |
| P3 Dana | Spectator | No | Spectator without pain still excluded |

The first two rows are the entire behavioral change in v2. If either is wrong, qualification and archetype are still coupled somewhere.

- [ ] **Step 7: Log**

Record the 2×2 results.

---

## Task 11: Full Persona Regression

Acceptance gate. Everything built so far, verified end to end in one pass.

**Interfaces:**
- Consumes: all previous tasks.
- Produces: a signed-off results table. Do not proceed to launch tasks until every row passes.

- [ ] **Step 1: Run all eight personas end to end**

Complete the live quiz as each persona, answering all 14 questions exactly as specified in §Test Fixtures. Record every observed value.

Eight runs, roughly 45 minutes. Do not sample — each persona exercises a behavior no other one does.

- [ ] **Step 2: Compare against expected**

| Persona | Layer A | Archetype | Layer B | Layer C | Decision | CTA |
|---|---|---|---|---|---|---|
| P1 Priya | 54 | Explorer | 79 | 85 | ACCEPT | Yes |
| P2 Marcus | 100 | Architect | 26 | 53 | REJECT · HG3 | No |
| P3 Dana | 18 | Spectator | 52 | 46 | REJECT · raised bar | No |
| P4 Ellen | 62 | Builder | 98 | 81 | ACCEPT | Yes |
| P5 Tom | 55 | Spectator | 75 | 80 | ACCEPT | Yes |
| P6 Raj | 46 | Explorer | 79 | 68 | REJECT · HG2 | No |
| P7 Nadia | 91 | Builder | 71 | 77 | ACCEPT | Yes |
| P8 Sofia | 69 | Explorer | 85 | 70 | ACCEPT | Yes |

**Any mismatch stops the build.** Diagnose before continuing:

| Symptom | Likely cause |
|---|---|
| Layer A wrong | A Q3–Q6 point value in the wrong category column (Task 4) |
| Layer B wrong by a multiple of 2 | Q11b per-option values (Task 5 Step 6) |
| Layer C wrong, A and B correct | A Diagnostic Fit value mistyped (Tasks 4–6) |
| Archetype wrong, Layer A correct | Audience ordering or a gate condition (Task 7) |
| CTA wrong, Layer C correct | Section visibility or a hard-gate condition (Tasks 8, 10) |

- [ ] **Step 3: Expand to fifteen profiles**

The question review recommends 10–15 before launch. Add seven more of your own invention, answering as a real company would, then ask of each: **does the archetype feel obviously correct to a human reading these answers?**

If not, move the bands — do not adjust individual point values to force one profile. Bands are the tuning dial; point values encode meaning.

- [ ] **Step 4: Delete every test lead**

`Leads → filter to test submissions → delete`. Test data will otherwise corrupt the first real calibration read at ~50 submissions.

- [ ] **Step 5: Log**

Record the full eight-row results table and the seven added profiles.

---

## Task 12: Internal Notification Email

**Files:** source is `content/internal-brief-template.md`.

**Interfaces:**
- Consumes: all three category scores; the audiences from Tasks 7–8.
- Produces: a founder-facing notification. **Phase 1 delivers a flat version** — the full conditional brief needs the webhook.

- [ ] **Step 1: State the expected result**

> Submitting the quiz sends Uzziah and Arielle an email within 30 minutes containing every answer, all three scores, and the archetype.

- [ ] **Step 2: Set the expectation honestly**

ScoreApp documents Dynamic Content for result pages and PDFs but **never for emails**. The `{IF …}` blocks in the template will not render natively. Phase 1 gets a flat brief; the conditional talking points, pillar breakdown, and FAEO pre-fill arrive with the webhook.

Do not spend hours fighting the email editor to approximate conditionals. Build the flat version, note the gap, move on.

- [ ] **Step 3: Configure**

`Integrate → Notification Settings`. Add both founders' addresses. Set the delay to 30 minutes if supported; if not, accept immediate and note it.

- [ ] **Step 4: Build the flat body**

Using whatever merge tags the editor exposes — the full inventory is undocumented, so open the merge-tag picker and see what is actually available:

```
DECISION: {IF audience merge tag available: Qualified / Not qualified}
Archetype: {archetype or highest category}
AI Readiness: {AI Readiness score}
Workflow Opportunity: {Workflow Opportunity score}
Diagnostic Fit: {Diagnostic Fit score}

{first_name} {last_name} · {company} · {email}
Role: {Q1} · Function: {function} · Size: {Q2}
Consent: {opt_in}

AI STORY
Breadth: {Q3} | Leadership: {Q4} | ROI: {Q5} | Ownership: {Q6}
Willingness to act: {Q13}

WORKFLOW
{Q7}{Q7b} · {Q8} · {Q9} · {Q10}
Runs as: {Q11a}
Also true: {Q11b}
Costs most: {Q12}
```

Subject line: `[{Diagnostic Fit score} · {archetype}] {first_name} at {company}`

The Diagnostic score leads, not the respondent-facing one. High readiness plus REJECT is now common, and the subject line must make that unmissable.

- [ ] **Step 5: Record which merge tags exist**

Write the actual available list into the build log. Phase 2 planning depends on knowing exactly what phase 1 could not express.

- [ ] **Step 6: Verify**

Submit as P2 Marcus. Confirm the email arrives at both addresses, that all three scores are present and correct, and that the subject line makes a 100-readiness REJECT legible at a glance.

- [ ] **Step 7: Log**

Record delivery, delay achieved, and the merge-tag inventory.

---

## Task 13: Email Sequences with Consent Gating

**Files:** source is `content/follow-up-sequences.md`.

**Interfaces:**
- Consumes: `opt_in`; the qualified audiences from Task 8.
- Produces: three respondent-facing sequences.

- [ ] **Step 1: State the expected result**

> A respondent who did not tick consent receives **no** email. A REJECT respondent receives the brief without a booking link, and never receives the non-booker follow-up.

- [ ] **Step 2: Build Sequence 1 — the Brief**

Immediate on results-page email submission. Body from `follow-up-sequences.md` §Sequence 1: archetype, both scores, positioning statement, what they identified, the insight paragraph, and the cost estimate.

Make the booking block conditional on the qualified audiences. If email conditionals are unsupported, build **two versions** of Sequence 1 — with and without the booking block — triggered by audience membership.

Sending a booking link to someone the results page deliberately withheld it from would undo the entire qualification logic.

- [ ] **Step 3: Gate everything on consent**

Every sequence: `opt_in = true`. If ScoreApp cannot condition on opt-in natively, **do not send automated email at all** — export and send manually to opted-in leads only. This is a compliance requirement, not a preference.

- [ ] **Step 4: Build Sequence 2 — Non-booker**

Day 5, only to qualified respondents with no booking. Never to a REJECT: they were not offered a booking, so following up as though they were reads as a bot.

- [ ] **Step 5: Build Sequence 3 — Nurture**

Day 14, to non-qualified respondents. Four gate-specific variants (3a workflow is fine · 3b not ready · 3c early stage · 3d access).

If four audience-triggered emails are impractical for launch, ship **3c** as the single default and note the simplification. But do not merge the four into one generic message: "your workflow is fine", "you're not ready", and "you can't reach the buyer" are three different conversations and a generic one gets all three wrong.

- [ ] **Step 6: Verify**

Submit four times with real addresses you control:

| Submission | Expected |
|---|---|
| P1 Priya, consent ticked | Brief **with** booking link |
| P1 Priya, consent **not** ticked | **No email at all** |
| P2 Marcus, consent ticked | Brief **without** booking link |
| P2 Marcus, wait 14 days or trigger manually | Nurture variant |

The second row is the compliance test. If an email arrives, stop and fix before launch.

- [ ] **Step 7: Log**

Record all four results and any simplifications taken.

---

## Task 14: Landing Page, Calendly, and Launch Checks

**Files:** Modify `index.html` (already updated for v2 copy — verify only).

**Interfaces:**
- Consumes: the live quiz URL; the Calendly link.
- Produces: a launchable funnel.

- [ ] **Step 1: State the expected result**

> A visitor reaches the landing page, takes the assessment, receives their result, and — if qualified — books a call that notifies both founders.

- [ ] **Step 2: Verify landing page copy**

`index.html` was updated for v2. Confirm on the live page:
- The three "What you'll find out" cards read Archetype / Two Scores Not One / Biggest Workflow Gap.
- No text claims the score is "calibrated to your company size" — company size no longer touches any visible score.
- The audience list does not say "Anyone shaping how their company works". Individual Contributors hit HG2 and get no CTA; recruiting people the quiz will reject is a bad experience and wasted traffic.

- [ ] **Step 3: Confirm the quiz URL**

Three CTAs in `index.html` point at `https://arielle-86mp1dws.scoreapp.com/questions`. Confirm this is still the live scorecard; update all three if it changed.

- [ ] **Step 4: Configure Calendly**

Confirm: 30-minute Diagnostic; both founders on every invite; availability excludes Saturdays, holy days, and blocked commitments; confirmation and reminders active. Paste the link into the secondary CTA on all four result pages.

- [ ] **Step 5: Verify the McKinsey statistic**

`results-copy.md` cites "23% of the workweek on automatable tasks" (McKinsey Global Institute, 2021) with a standing note to verify before launch. Confirm it at mckinsey.com or replace it with a current sourced figure. **Do not launch with an unverified statistic** on a page whose whole purpose is credibility.

- [ ] **Step 6: Full funnel dry run**

Landing page → quiz → results → book → confirm. Do it once as **P4 Ellen** (qualified, should book cleanly) and once as **P3 Dana** (not qualified, should reach no booking path anywhere — results page, brief email, or follow-up).

- [ ] **Step 7: Mobile check**

Complete the quiz on a phone. 14 questions is longer than v1's 12; confirm the multi-select Q11b is comfortably tappable and that the progress indicator does not read as discouraging.

- [ ] **Step 8: Delete remaining test leads and log**

Final sweep of test data. Record the dry-run results and launch date.

---

## Live Account Map — confirmed 2026-08-21

Working scorecard: **`The AI Readiness Assessment`** at `arielle-69xcouvy.scoreapp.com` (draft).
Archived v1: **`AI Readiness Assessment — v1 (archive)`** at `arielle-86mp1dws.scoreapp.com` — do not edit.

| Need | Where |
|---|---|
| Categories, score logic, Hidden | Builder → **Categories** (icon rail) → select category → **LOGIC** tab |
| Per-answer scoring | Builder → **Questions** → select question → **ANSWERS** tab → per-answer `Scores` block |
| Question type, Required, Jump to | Builder → **Questions** → **QUESTION** tab |
| Audiences (Tasks 7, 8) | Left nav → **Audiences** (scorecard-scoped) |
| Result pages, section visibility (Tasks 9, 10) | Left nav → **Result Pages** → select section → visibility dialog |
| Lead form + consent (Task 6) | **Settings → Lead Form** |
| Internal notification (Task 12) | **Settings → Notifications** |
| Score tier bands | **Settings → Score Tiers** |
| Respondent result email (Task 13) | **Settings → Result Email** |
| Rename, URL, draft mode | **Settings → General** |

**Draft mode** is on by default, and Settings → General holds a generated password that grants a visitor access to the draft scorecard — useful for Task 11 testing without publishing.

---

## Build Log

Append one row per completed task. This replaces commit history.

| Date | Task | Result | Deviations from plan / actual UI paths |
|---|---|---|---|
| 2026-08-21 | 1 — platform go/no-go | ✅ **PASS — GO** | Both behaviors confirmed. Categories live in the left icon rail, creatable before any questions exist. Score logic + Hidden are on the category's **LOGIC** tab. Per-answer scoring is on the question's **ANSWERS** tab, one points field per category. |
| 2026-08-21 | 2 — item C, multi-select denominator | ✅ **CONFIRMED** | 73% at one tick / 89% at four, both matching prediction exactly. Denominator = Σ(all options), as documented. |
| 2026-08-21 | 2 — bonus finding | ⚠️ **Plan amended** | A category excluded from the total still **displays** on the results page. `Hidden` toggle is required, not optional. Tasks 3 and 9 updated. |
| 2026-08-21 | 2 — item D, audience nesting | ✅ **RESOLVED** | No bracket control; builder is OR-of-AND-groups (DNF). Sufficient via distribution, but Task 8 rewritten to build the **inverse** audience — 9 conditions instead of 36. |
| 2026-08-21 | 2 — item E, section visibility | ✅ **BOTH DIRECTIONS** | `Audience Based` offers show *or* hide, with a direction toggle. Unlocks the Task 8 inverse construction. |
| 2026-08-21 | — | ✅ **Task 1 & 2 complete** | Sandbox may now be deleted. Ready to begin Task 3. |
| 2026-08-21 | 3 — categories | ✅ **COMPLETE & SAVED** | New scorecard `The AI Readiness Assessment` created from scratch at **arielle-69xcouvy.scoreapp.com** (draft). All three categories created and configured: AI Readiness = *Add category score to total score* / Hidden off; Workflow Opportunity = *Do not affect total score* / Hidden off; Diagnostic Fit = *Do not affect total score* / **Hidden ON**. Verified each individually after saving. |
| 2026-08-21 | 3 — UI notes | ℹ️ | Categories are creatable before any question exists. Create dialog is name-only with a *More Settings* link; score logic and Hidden live on the category's **LOGIC** tab after creation. The dropdown needs the option click confirmed — one selection silently failed and had to be redone. |
| 2026-08-21 | 3 — ⚠️ open risk | ✅ **CLOSED — no impact** | Toggling Hidden warns that highest/lowest-category merge tags, sections and audiences will drop the category. Verified directly: the Audience condition dropdown has a **`Category Scores`** group listing **AI Readiness, Workflow Opportunity, and Diagnostic Fit** — Diagnostic Fit is present despite `Hidden = ON`. The warning applies only to the separate *Highest/Lowest Category* condition type, which this design does not use. **Task 8's construction is viable as written.** |
| 2026-08-21 | 8 — advance finding | ℹ️ | Audience condition dropdown groups: **Lead** (Status) · **Lead Form Answer** (Email, **Opt In**) · **Scorecard Answer** (one entry per question) · Highest/Lowest Category · **Category Scores** (one per category) · **Total Score** · **Source** (UTM source/campaign/medium/content/term). `Opt In` being available as an audience condition means Task 13's consent gating can be done natively. |
| 2026-08-21 | 4 — questions Q1–Q6 | ✅ **COMPLETE & SAVED** | All six built as **Multiple Choice Buttons** (better mobile tap targets than radio for a 14-question quiz). Q1 6 answers, Q2 7, Q3–Q6 4 each. Every value verified on screen after entry. Q1: 15/14/13/9/5, IC unscored. Q2: 1/4/8/8/5/3/2. Q3: 4·2, 11·6, 18·4, 25·2. Q4: 3, 10·4, 18·7, 25·8. Q5: 1·1, 8·6, 16·5, 25·2. Q6: 3·1, 9·4, 17·7, 25·6. Layer A maxes to 25×4 = 100 as designed. |
| 2026-08-21 | 4 — UI technique | ℹ️ | Per-answer scoring: **ANSWERS** tab → toggle `Scoring` → `Choose an option` → category → points box to its right → `+ Add scoring` for a second category. **The second dropdown lists only unused categories and omits "Overall only"**, so its item offsets differ from the first. Dropdowns **flip upward** when near the viewport bottom. When batching browser actions, insert a 1s wait after any click that creates or focuses a field — without it the subsequent typing silently goes nowhere. |
| 2026-08-21 | 4 — zero-value answers | ℹ️ | Answers whose value is 0 (Q1 Individual Contributor, Q4 "No formal strategy" in Diagnostic Fit) were left **unscored** rather than explicitly set to 0. Equivalent for single-select, since the question's potential is its highest-scoring answer. The gates that reference these answers key on **answer text**, not score, so they are unaffected. |
| 2026-08-23 | 5 — questions Q7–Q12 | ✅ **COMPLETE & SAVED** | All seven built (Q11 splits into Q11a + Q11b). Q7 workflow category — 7 answers, unscored, native **"Other" option** toggle used. Q8 people: 2/1, 7/2, 12/4, 15/5. Q9 frequency: 15/5, 13/4, 10/3, 5/2, 1/—. Q10 hours: 4/1, 13/5, 22/8, 29/10, 35/12. Q11a state: 15/4, 13/3, 11/3, 1/—. Q11b symptoms (multi-select): five at 2/1 each, "None of these" unscored — Σ = 10 WO / 5 DF, exactly the budgets. Q12 cost: Money 10/4, Scale 10/4, Errors 9/3, Time 9/3, Customer experience 9/3, Team morale 7/2. Every value verified on screen after saving. |
| 2026-08-23 | 5 — "Other" option | ℹ️ **Pending confirmation** | Q7 uses ScoreApp's native `"Other" option` toggle, which appends an "Other" answer automatically. **Whether it captures free text is not yet confirmed** — verify in the Task 11 preview run. If it does not, add Q7b as a separate Open Text question shown only when Q7 = Other (SF6 depends on that text). |
| 2026-08-23 | 5 — UI notes | ℹ️ | Answer buttons reflow between 2 and 3 per row as text length changes, which moves `Add answer` — several answers silently failed to be created and had to be re-added. Question text wrapping to a second line shifts Answer 1 down ~22px. Changes are **not** auto-saved, and a single validation error anywhere blocks saving everything. |
| 2026-08-23 | 6 — Q13 | ✅ **COMPLETE & SAVED** | Multiple Choice Buttons, Required, no jump logic. Scores `Diagnostic Fit` only — 15 / 11 / 5, with "Unlikely — mostly curious right now" left unscored (HG1). AI Readiness and Workflow Opportunity untouched, confirmed by each answer carrying exactly one score row. Question Flow now reports **14 questions · 3 categories**. |
| 2026-08-23 | 6 — contact form | ✅ **COMPLETE & SAVED** | `Settings → Lead Form`. Fields: First name, **Last name**, Email (all three built in and Required), Company name (Text, Required), "Which area do you lead or work in?" (Drop down, Required) with all eight options in spec order. |
| 2026-08-23 | 6 — deviation: Last name kept | ℹ️ | The plan's field table omitted Last name, but it ships enabled by default and `content/internal-brief-template.md` §1 and §3 both consume it (`{first_name} {last_initial}.` in the subject line, `{last_name}` in the respondent block). Removing it would have broken the brief, so it was kept. |
| 2026-08-23 | 6 — ⚠️ correction: form position | ✅ **FIXED** | `DEFAULT LEAD FORM BEHAVIOUR` defaults to **Before Questions**, which would have put contact capture ahead of Q1 and forced signup before anyone saw a question. Switched to **After Questions**, matching the design (contact capture follows Q13). Worth re-checking after any settings change — this default is easy to miss because it sits below the fold. |
| 2026-08-23 | 6 — consent | ✅ **Explicit Consent (Optional)** | Selecting it reveals an `OPTIN WORDING` field, defaulting to the vague "Opt in to receive updates via email". Set to: *"Yes — send me follow-up insights on AI readiness and workflow automation by email."* **Not specified in any source-of-truth doc — flagged for the owner's review.** `PRIVACY STATEMENT` and `PRIVACY POLICY URL` left blank pending a URL from the account owner; fill before launch (Task 14). |
| 2026-08-23 | 6 — UI gotcha | ⚠️ | In the lead-form option list, **Tab moves focus to the row's delete button, not the next field** — and typing any string containing a space then presses that button, silently deleting the row you just filled. Always click each option field directly. Once ~4 options exist the dialog stops recentering and scrolls internally, after which the empty row sits at a stable position following a scroll-to-bottom. |
| 2026-08-23 | 6 — Step 5 deferred | ⏸ **BLOCKED ON TASK 9** | The two verification submissions (one with consent ticked, one without — "both should complete and show results") cannot be evaluated until result pages exist. Folded into **Task 11**, where P1 and P2 run the consent-on / consent-off pair and `Leads` is checked for differing opt-in status and captured function. |
| 2026-08-23 | 6 — open item | ℹ️ | The lead form's **heading and subtext** ("Almost done. Where should we send your results?") are not in `Settings → Lead Form`, `Share Appearance`, or `Page Settings`. Expected to live on the result page as a lead-form section — **set during Task 9**. |
| 2026-08-23 | 7 — four archetype audiences | ✅ **CREATED & SAVED** | `Archetype — Architect` (2 conditions), `Archetype — Builder` (6, two OR-groups), `Archetype — Explorer` (4, two OR-groups), `Archetype — Spectator` (1, catch-all). Every condition re-read from the saved record afterwards and matches the plan exactly. |
| 2026-08-23 | 7 — condition builder shape | ℹ️ | Confirmed DNF as expected: each panel is one AND-group, `Add an OR condition` appends another group. The **duplicate-group icon** (top-right of a group) copies a whole group — the efficient way to express `A AND B AND (C OR D)`: build group 1, duplicate it, then change only the last condition. Category fields expose **`Category Score Percent`**, which is the percentage the plan's thresholds are written against. |
| 2026-08-23 | 7 — ⚠️ gotcha: operator resets value | ⚠️ | Changing an answer condition's operator from `Is` to `Is not` **silently clears the selected answer**, leaving the value box blank. Re-select the answer every time. Conversely, changing the *question* keeps the operator and auto-fills the first answer as the value — convenient, but verify rather than assume: it happened to be the wanted answer for both G3 disjuncts, which is exactly the kind of coincidence that hides a mistake. |
| 2026-08-23 | 7 — operator inventory | ℹ️ | Category conditions: Is · Is not · Is greater than or equal to · Is less than or equal to · Same as · **Is greater than or equal to category** · Is less than or equal to category. The last two are a different comparison (category-vs-category) and the dropdown renders the labels overlapping and cramped, so they are easy to mis-click — verify the chip text after selecting. Answer conditions: Is · Is not · Contains · Does not contain · Is answered · Is not answered · Is skipped. |
| 2026-08-23 | 7 — ⚠️ correction: where priority lives | ⚠️ **PLAN AMENDED** | The plan's Step 3 says "create the four audiences in this exact order — order is load-bearing." **The Audiences list carries no priority.** It is a plain list sorted by Name or Size, and audiences are overlapping membership sets: a respondent scoring 91 with measurable results satisfies Architect *and* Builder *and* Explorer *and* Spectator simultaneously. First-match-wins priority exists only in **End Logic → Audience Redirects** (Step 4). Until that is configured no archetype is resolved, so creating the audiences proves the gate logic is expressible but does not yet assign anything. |
| 2026-08-23 | 7 — display note | ℹ️ | An audience's **Overview** tab flattens all OR-groups into one flat condition list with no group boundary shown — Builder reads as six conditions with `AI Readiness ≥ 55` appearing twice. That repetition is the only visible trace of the two groups. Use **Edit** to see the actual OR structure. |
| 2026-08-23 | 7 — Steps 2, 4, 5 deferred | ⏸ **BLOCKED ON TASK 9** | Step 4 (End Logic audience redirects) needs result pages to point at. Steps 2 and 5 (the P7-fails-without-gates baseline, and verifying all eight personas land in one audience each) need completed submissions, which need result pages. All three move to **Task 11**, which already runs every persona. |
| 2026-08-23 | 8 — `Diagnostic Disqualified` | ✅ **BUILT & VERIFIED** | 8 OR-groups, **13 conditions**, exactly as Step 3 specifies. Re-read from the saved record condition by condition: Q13=Unlikely · Q1=Individual Contributor · Q11a=runs smoothly · (Q10=Less than 5 **AND** Q8=Just me) · (Q3=few experimenting **AND** Q4=no formal strategy **AND** Q5=not really using) · DF≤44 · (Q2=Under 25 **AND** DF≤59) · (Q2=Over 500 **AND** DF≤59). Uses only `Is` and `Is less than or equal to`, so it never touches the operator-resets-value bug from Task 7. |
| 2026-08-23 | 8 — `Diagnostic Priority` | ✅ **BUILT** | `Diagnostic Fit` Category Score Percent ≥ 65. Single condition, as specified. |
| 2026-08-23 | 8 — five gate audiences | ✅ **BUILT** (Step 5 taken) | `DQ-HG1 — Unwilling to act` · `DQ-HG2 — No access or authority` · `DQ-HG3 — No operational pain` · `DQ-HG4 — Too trivial to engage` (2 conditions) · `DQ-HG5 — Dormant on all three signals` (3 conditions). Built rather than skipped because Task 13's four gate-specific nurture emails need to know *which* gate fired, and the phase-2 webhook that would otherwise do that routing is explicitly out of scope for phase 1. |
| 2026-08-23 | 8 — ⚠️ Step 6 skipped as redundant and unbuildable | ⚠️ **PLAN AMENDED** | Step 6 tells you to build `Diagnostic Qualified — Out of Band` and then amend `Diagnostic Qualified`. **Neither is possible or needed.** (a) Step 3 builds the *inverse* audience — there is no `Diagnostic Qualified` audience to amend. (b) The positive out-of-band form restates all five hard gates conjunctively, which is precisely the 36-condition explosion the inverse construction exists to avoid. (c) **Step 3's blocks 6 and 7 already implement the raised bar**: disqualified-by-score = `DF≤44 OR (out-of-band AND DF≤59)`, which yields qualification at **45+ in band** and **60+ out of band**, exactly as designed. Step 6 is a leftover from an earlier positive-audience design. Task 10 hides the CTA from `Diagnostic Disqualified`, so no positive audience is required anywhere. |
| 2026-08-23 | 8 — logic check against all eight personas | ✅ **PASSES ON PAPER** | P1 85 in-band no gate → qualified · P2 HG3 (runs smoothly) → disqualified · P3 46 **Under 25** → block 7a fires (46≤59) → disqualified · P4 81 **Over 500** → 81>59, no gate → qualified · P5 80, Q4=top priority so **HG5 does not fire** → qualified despite Spectator archetype · P6 HG2 (Individual Contributor) → disqualified despite DF 68 · P7 77 → qualified · P8 70 → qualified. Matches Step 7's expected table row for row. **Still paper only** — no submission has run. |
| 2026-08-23 | 8 — Steps 2 and 7 deferred | ⏸ **BLOCKED ON TASK 9** | The P6-currently-qualifies baseline and the eight-persona verification both need completed submissions, which need result pages. Folded into **Task 11**. The precedence check the plan calls out — P6 in `Diagnostic Priority` **and** `Diagnostic Disqualified`, and still seeing no CTA — must be run there. |
| 2026-08-23 | 9 — ✅ **CRITICAL NEGATIVE CHECK PASSES at config level** | ✅ | A `Category Scores` section set to **"Number of categories shown: All"** renders **only AI Readiness and Workflow Opportunity**. **Diagnostic Fit does not appear.** It is also absent from the `Individual category` section's category list. The `Hidden` toggle set in Task 3 is therefore respected by the result-page renderer — this is the exact failure that occurred in the Task 1 sandbox, and it is now fixed. **Still to do: the live end-to-end check on a real submission (Step 5).** |
| 2026-08-23 | 9 — ⚠️ Diagnostic Fit *is* offered as a dynamic-content trigger | ⚠️ **FOOTGUN** | `Dynamic content is based on` lists **Diagnostic Fit** alongside the visible categories. Using it as a trigger does not display the value, so it is a legitimate (and convenient) way to drive conditional content. **But any copy written into those bands is chosen by the qualification score**, so wording like "you're a strong fit" would leak the internal decision. Task 10 must either avoid this trigger or keep the band copy free of qualification language. |
| 2026-08-23 | 9 — ⚠️ **dynamic content is score-keyed only** | ⚠️ **PLAN AMENDED — Step 4 not buildable as written** | The `Dynamic content is based on` dropdown offers **only** Overall Score, AI Readiness, Workflow Opportunity, Diagnostic Fit. **Question answers are not available.** So the 48-variant insight paragraph keyed to Q7 + Q12 cannot use this mechanism — and neither can the plan's Q7-only fallback. The only answer-keyed lever is **section visibility → Audience Based**, which needs one audience *and one duplicated section* per variant: 8 audiences × 8 sections × 4 pages = **32 sections** for the Q7 fallback; 48 variants is impractical. Decision deferred to the owner — see the open question below. |
| 2026-08-23 | 9 — ⚠️ dynamic content has 3 bands, not 4 | ⚠️ **NEW DEPENDENCY** | Bands are **Low / Medium / High** only, and their boundaries come from `Settings → Score Tiers`, **which has never been configured**. The design specifies four Workflow Opportunity tiers (Substantial 80+/Significant 60–79/Meaningful 35–59/Contained 0–34) and a two-way split at 60 for the positioning statement. Score Tiers must be set before the positioning copy is correct, and it is unclear whether tiers are per-scorecard or per-category — **verify before Task 11.** |
| 2026-08-23 | 9 — section type notes | ℹ️ | `Individual category` **cannot pin a chosen category** — only `Highest Scoring` / `Lowest Scoring` — so it is unusable for "show AI Readiness here, Workflow Opportunity there". Use `Category Scores` instead. Generic `Show score tier` badges (Low/Medium/High) were switched **off**, since the design supplies its own tier language. `Answer insights` is answer-*distribution charts*, not conditional copy. |
| 2026-08-23 | 9 — Step 3 satisfied by construction | ✅ | Creating the page via **"Start without a template"** yields a genuinely blank page with no default headline, so there is nothing to suppress. **Note:** the pre-built section templates *do* inject "Thank you for taking the {scorecard name}" — avoid them, or delete that line wherever one is used. |
| 2026-08-23 | 9 — Architect page progress | 🚧 **PARTIAL** | `Result — The Architect` created and saved with three sections: **archetype hero** (name, tagline, description, next move — verbatim from `content/archetypes.md`), **Category Scores** (both visible scores, tier badges off), and **positioning + benchmark** (dynamic on Workflow Opportunity, all three bands written, McKinsey stat in each). **Not yet built:** primary CTA, booking CTA, not-qualified note, dynamic Q10 benchmark, insight paragraph. **Pages for Builder / Explorer / Spectator not yet started.** |
| 2026-08-23 | 9 — editor gotcha | ⚠️ | In a CTA section, `cmd+A` inside a text block selects the **entire content group**, not the block — it deleted the body paragraph. Separately, typing into a position that has reflowed can **replace the button element itself**, and undo did not cleanly restore it (the section had to be deleted and rebuilt). **Edit these sections bottom-up**, and re-screenshot between every edit. |
| 2026-08-21 | housekeeping | ✅ **DONE** | v1 renamed to `AI Readiness Assessment — v1 (archive)` (still at arielle-86mp1dws, draft, 50% built — preserved, not deleted). No more name collision. Sandbox `ZZ-SANDBOX` can be deleted at will. |

---

## Explicitly Out of Scope — Separate Plan

**Phase 2: the webhook automation.** Different tooling (Make or Zapier), different failure modes, and phase 1 is fully launchable without it. It should be planned separately once phase 1 is live and producing real submissions to test against.

It delivers four things phase 1 cannot:

1. **The full conditional internal brief** — pillar breakdown, demotion-gate explanations, all ten soft flags, per-symptom talking points.
2. **Exact Layer C recomputation**, including any hard gate that audience nesting could not express.
3. **FAEO pre-population** — five of nine criteria arriving pre-filled.
4. **CRM write-through** to the Revenue Pipeline.

Two payload facts already established for that plan: the `QUIZ_FINISHED` webhook carries **no per-question scores**, so Layer C must be re-derived from answer text (which is preferable — it makes the automation the single source of truth for gate logic); and multi-select answers arrive as an **array of objects**, `[{"answer": "..."}]`, not bare strings.

**Also deferred — post-launch, not implementation:**

- **Calibration at ~50 real submissions.** Every threshold in this build is a tuning dial, not a finding. Per the master reference §12: if more than ~60% qualify, the ACCEPT threshold is too low; if archetype distribution skews hard to one level, move the Layer A bands; if Diagnostic calls keep surfacing a disqualifier the quiz missed, that needs a new question or gate. Watch **P8 Sofia's profile** specifically — it reaches ACCEPT on workflow economics with zero leadership sponsorship, and if those calls stall on the missing sponsor, raising Q4's Pillar 2 weight is the first dial to turn.
- **The archetypes reference artifact** linked in project memory still shows the v1 names and needs regenerating.
