# AI Readiness Assessment — UX Review

Review date: August 24, 2026  
Scope: marketing landing page, draft-password entry, 14-step assessment, lead-capture gate, Architect result page, responsive behavior, and the four supplied archetype images. No design changes were made.

## Executive summary

The experience has a strong strategic premise and unusually good outcome language: the four archetypes are memorable, the distinction between AI Readiness and Workflow Opportunity is valuable, and the questions are written in direct business language. The question flow is easy to operate and performs particularly well on mobile.

The results experience is where the design currently underdelivers. It reads like a long report placed into a single column rather than a designed reveal. The result identity, two scores, workflow cost, interpretation, and next action compete without a clear hierarchy. The lead-capture overlay also says “You scored 100% overall,” even though the page presents two deliberately separate scores (100% AI Readiness and 59% Workflow Opportunity in the reviewed run). That contradiction weakens confidence at the most important moment.

The highest-value update is to redesign the first two result-page viewports as a cohesive result summary: archetype portrait + identity + one-sentence interpretation + two clearly labeled scores + one recommended next move. Everything else should follow in short, scannable sections. The supplied portraits should act as identity anchors, not decorative banners.

## What was reviewed

- Public landing page at `https://ai-opportunity.netlify.app/`
- ScoreApp draft entry and assessment flow
- Fourteen question screens, including the multi-select question
- Lead-capture gate
- Architect result generated from a high-readiness response path
- Desktop result layout at 1280 × 720
- Mobile question and result layouts at 390 × 844
- Supplied Spectator, Explorer, Builder, and Architect portraits

The live result review used the Architect outcome. Recommendations for the other archetypes assume the same underlying result template with archetype-specific copy and imagery. Content and score logic should be QA-tested across all four outcomes before launch.

## Priority findings

### P0 — Resolve the score-model contradiction

The product promise correctly says users receive “Two Scores, Not One.” The result page shows AI Readiness and Workflow Opportunity separately. The capture gate, however, says “You scored 100% overall.” This implies a single composite score and makes the 59% Workflow Opportunity score appear inconsistent or erroneous.

Recommended implementation:

- Replace “You scored [x]% overall” with “Your AI readiness result is ready” or “You’re The Architect.”
- If a number must appear, label it explicitly: “AI Readiness: 100%.”
- Never use “overall” unless a third, genuinely composite score exists and its calculation is explained.
- Keep the two metrics visually equal in structure but explain their different meanings in one line each.

Acceptance criteria:

- No screen refers to a single overall score.
- A user can explain the difference between the two scores after reading the top result section.
- The same labels and score values appear in the gate, result summary, email, and downloadable/shareable brief.

### P0 — Rebuild the result reveal around a clear first-screen hierarchy

The reviewed desktop result is approximately 3,557 px tall; the mobile version is approximately 3,885 px tall. The first major content section after the scores does not begin until roughly 1,487 px on mobile. The page is readable, but the most valuable information is spread over too much vertical distance.

Recommended first-screen hierarchy:

1. Eyebrow: “Your AI readiness identity”
2. H1: “The Architect”
3. One-sentence identity definition, limited to roughly 18–24 words
4. Archetype portrait
5. Two score cards: AI Readiness and Workflow Opportunity
6. One recommended next move
7. Primary action: “Get my AI Readiness Brief”
8. Secondary action: “Explore the full result” or an anchored down-arrow

Do not lead with several long paragraphs. Move the detailed archetype explanation beneath the summary and break it into “What this means,” “Your advantage,” and “Your watch-out.”

### P0 — Make lead capture feel like part of the reveal, not an obstruction

The current gate overlays and blurs a result page that has already loaded. This teases the content but also creates friction and makes the user feel the result is being withheld after completion. The gate asks for first name, last name, email, company, function, and an optional marketing opt-in before showing the complete result.

Recommended approach:

- Reveal the archetype name, portrait, concise description, and both score values immediately.
- Gate only the detailed cost model, personalized brief, or emailed/downloadable artifact.
- Replace a modal over a blurred long page with an inline card directly below the result summary.
- Explain the exchange: “Enter your details to get the full workflow cost estimate and a copy of your brief.”
- Consider reducing the required fields to first name and email. Collect company/function after value has been delivered, unless they are essential to calculation.
- Keep marketing consent unchecked by default and visually separate it from the action needed to view results.

Acceptance criteria:

- Users see a meaningful result before providing contact information.
- Closing, refreshing, validation errors, and keyboard focus do not lose the completed assessment.
- The CTA describes what becomes available after submission.

### P1 — Use the portraits as identity anchors

The supplied images are strong 4:5 portrait assets with clear narrative differences:

- Spectator: cool, observational, future-facing environment
- Explorer: open landscape, route-finding, discovery
- Builder: warm construction site, practical execution
- Architect: dark strategic environment, systems-level planning

Recommended image treatment:

- Desktop: two-column hero, approximately 55–60% content and 40–45% image.
- Mobile: place the portrait immediately after the archetype name/definition and before the score cards.
- Use a consistent 4:5 media container, 16–24 px corner radius, and `object-fit: cover`.
- Store an archetype-specific focal point rather than applying one crop to all four images. Suggested starting points: Architect 62% center, Spectator 66% center, Explorer 68% center, Builder 48% center.
- Add descriptive alt text based on the metaphor, not the filename. Example: “The Architect planning an interconnected system.”
- Do not place body copy over these images. Their backgrounds vary too much for reliable contrast.
- Preserve one visual system across archetypes; do not let each image’s color palette redefine the entire component library.

### P1 — Turn both scores into explanations, not just percentages

A percentage without a scale or benchmark invites false precision. “Workflow Opportunity: 59%” does not immediately tell the user whether 59% is good, urgent, or average.

Recommended score-card content:

- Metric name
- Large score
- Plain-language band, such as “Advanced readiness” or “Meaningful opportunity”
- One-sentence definition
- Optional four-band scale showing where the score falls

Avoid gauge charts unless the scale is meaningful and accessible. A horizontal banded scale is easier to compare and explain. Do not imply that AI Readiness and Workflow Opportunity are the same construct or should move in the same direction.

### P1 — Convert the long report into a decision sequence

The current content order includes identity, two scores, interpretation, workflow cost, workflow category, a brief CTA, and next steps. That is useful material, but the single-column treatment makes each section feel equally important.

Recommended order:

1. Result summary
2. “What this means” — advantage, watch-out, next move
3. “Your workflow opportunity” — named workflow, score, primary friction
4. “What it may be costing” — estimate, assumptions, confidence/disclaimer
5. “What to do next” — three staged actions
6. Brief/share CTA
7. Methodology and source notes

Use cards only for discrete, comparable objects (scores, next steps, assumptions). Keep narrative copy on the page background to avoid a wall of containers.

### P1 — Make the cost estimate transparent and credible

The result displayed an estimate of 2,250+ hours per year and approximately $113,000–$169,000. This is compelling, but users need to understand how the number follows from their answers.

Recommended implementation:

- Show the inputs used: people involved, hours per week, frequency, and assumed loaded hourly cost.
- Label calculated values as estimates.
- Provide a short “How we calculated this” disclosure.
- Separate gross time/labor exposure from realistically recoverable value.
- Place the methodology source close to the claim it supports, not only at the bottom.
- Review the current McKinsey citation for exact wording, date, and link before launch.

### P1 — Strengthen the next action

“Where to go from here” should behave as a recommendation, not a generic conclusion. Tailor the action to the combination of readiness and opportunity, not only to the archetype.

Example for the reviewed Architect / moderate-opportunity combination:

- Headline: “Choose one end-to-end workflow to redesign.”
- Step 1: Validate the baseline cost and cycle time.
- Step 2: Map decisions, handoffs, and data dependencies.
- Step 3: Run a constrained redesign pilot with measurable success criteria.

Use one primary CTA. If “Send my Brief” emails or creates a file, say so explicitly: “Email my brief” or “Download my brief.”

## Question-flow review

### What works

- One question per screen keeps cognitive load low.
- Language is direct, conversational, and relevant to decision-makers.
- Answer buttons are large (48 px high in reviewed desktop and mobile states).
- The mobile layout forms a clean single column with no horizontal overflow.
- Back navigation appears after the first answer.
- Progress feedback is persistent.
- The flow separates organizational readiness from a specific workflow opportunity.

### Recommended improvements

#### Set expectations more precisely

The landing page promises four minutes. Add the number of questions and clarify that contact details are requested before the full report: “14 questions · about 4 minutes · instant summary.” This makes the commitment concrete.

#### Make the progress model feel honest

The first screen shows 0% complete; the second shows 7%. Consider “Question 1 of 14” alongside the bar. A count is easier to interpret and avoids ambiguity about whether demographic questions count.

#### Separate context questions from scored questions

Role and company size appear before maturity questions. Add a short section cue such as “About you,” followed by “AI readiness” and “Workflow opportunity.” This creates a sense of movement and helps users understand why questions are being asked.

#### Review answer-order effects

The maturity questions consistently progress from low to high readiness, making the scoring model obvious and encouraging socially desirable responses. Consider rotating the direction on selected questions only if it does not reduce comprehension, or keep the order but add “Choose the answer closest to reality today.”

#### Improve the multi-select instruction

“Which of these also apply? Select all that apply.” requires at least one choice, including “None of these.” Make that requirement explicit: “Select all that apply, or choose ‘None of these.’” Keep “None” mutually exclusive and automatically clear other selections when chosen.

#### Avoid auto-advance surprises

Single-select answers auto-advance. This is fast, but users may not realize the click immediately commits the answer. Preserve the visible selected state briefly, ensure Back restores it, and avoid auto-advance for questions where answers are long or nuanced. A 200–300 ms acknowledgement is sufficient; do not slow the whole flow.

#### Add brief definitions where ambiguity affects scoring

Terms such as “AI plan,” “embedded,” “automation,” “measurable business results,” and “workflow” can be interpreted differently. Add optional helper text or a tooltip rather than longer answer labels.

#### Ensure keyboard and screen-reader behavior

- Use a radio group for single-select questions and a checkbox group for multi-select.
- Announce question changes and progress through an ARIA live region.
- Move focus to the new H1 after auto-advance.
- Maintain visible focus states.
- Ensure the progress bar has an accessible label and current value.
- Do not rely on color alone for selected states or score bands.

## Landing-page recommendations

The landing page communicates the offer clearly and repeats the primary CTA effectively. Its strongest content is the “Two Scores, Not One” distinction.

Improvements:

- Bring “14 questions · 4 minutes · instant result” closer to the first CTA.
- Preview all four identities visually so the outcome feels tangible; use small, consistently cropped image tiles rather than full portraits.
- Reduce repeated explanatory copy below the first two sections.
- Clarify whether “instant results” means an on-screen summary before contact capture or a gated full report.
- Replace the non-functional/logo-like `#` navigation link with a true home link or non-link brand element.

## Content and visual-system guidance

- Use “archetype” or “identity” consistently. The current experience uses both.
- Prefer “The Architect” in the title; “You are The Architect” can be supporting reveal copy.
- Maintain a content width around 680–760 px for long-form copy, but let the hero use a wider grid.
- Keep body text at least 16 px with approximately 1.5 line height.
- Limit text paragraphs to 3–5 lines where possible.
- Use sentence case for labels and CTAs.
- Preserve the calm, executive tone; avoid gamified badges or celebratory confetti, which would undermine the strategic positioning.

## Recommended result-page component specification

### Hero / result summary

- Max width: 1120–1200 px
- Desktop grid: `minmax(0, 1.2fr) minmax(320px, .8fr)`
- Gap: 48–72 px
- Vertical padding: 64–80 px desktop; 24–32 px mobile
- Portrait: 4:5, capped around 460–520 px high on desktop
- H1: archetype name
- Definition: maximum two lines desktop, three lines mobile
- Score cards: two columns desktop; stacked or two compact equal cards mobile

### Narrative sections

- Max readable width: 720 px
- Section spacing: 64–80 px desktop; 40–56 px mobile
- Each section begins with an outcome-oriented heading
- Use short subheads and bullets for advantage/watch-out/next move

### Lead-capture card

- Inline after the ungated result summary
- One-column fields on mobile
- Clear value statement above fields
- Required/optional state in persistent labels, not placeholder-only text
- Consent visually separated from result-access action
- Success state confirms whether the brief was emailed, downloaded, or both

## QA checklist before launch

- Generate and inspect all four archetype outcomes.
- Test lowest, boundary, and highest score paths for each band.
- Confirm tie-breaking behavior at archetype thresholds.
- Confirm workflow score changes independently of readiness score.
- Verify all cost estimates against the displayed assumptions.
- Test Back on every question and ensure scores recalculate.
- Test multi-select “None” exclusivity.
- Test refresh/revisit behavior at the gate and result page.
- Test validation errors without clearing entered values.
- Test keyboard-only completion and screen-reader announcements.
- Test 320, 390, 768, 1024, and 1440 px widths.
- Check portrait cropping at every breakpoint.
- Check heading wrapping with the longest archetype and workflow names.
- Verify email/brief content matches the on-screen archetype and both scores.
- Validate analytics events for start, section completion, gate view, gate completion, result view, and CTA conversion.

## Suggested implementation sequence

1. Correct score naming and lead-gate copy.
2. Build the new result-summary hero and integrate the four portraits.
3. Reorder and compress the result content into the decision sequence.
4. Convert the gate from a blocking overlay to an inline value exchange.
5. Add score interpretation and calculation transparency.
6. Refine question progress, section cues, and multi-select behavior.
7. Complete accessibility and multi-breakpoint QA.
8. Run five moderated usability sessions with target decision-makers, focusing on whether they can explain their archetype, distinguish the two scores, and identify the recommended next action.

## Success measures

- Assessment start-to-completion rate
- Drop-off by question and at lead capture
- Percentage of users who can correctly distinguish the two scores
- Brief request/completion rate
- Primary next-step CTA conversion
- Result share rate
- Time from result reveal to first meaningful action

