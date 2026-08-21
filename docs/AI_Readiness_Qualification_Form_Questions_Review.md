# AI Readiness Qualification Form — Question Review

*Strategic review of the drafted 12-question assessment, scoring model, archetypes, and Diagnostic routing*

| Overall assessment: Very strong concept and question flow. Keep the structure, but revise the scoring/qualification logic before launch. |
| :---: |

# **Executive Assessment**

The draft is much stronger than a typical B2B qualification form. It feels like an assessment first and a sales filter second, which is exactly what the funnel needs. The four-phase progression is intuitive: identify the respondent, understand the company's AI story, surface one economically meaningful workflow, then deliver a result.

I would preserve most of the question copy. My main concern is not the user experience; it is the scoring architecture. Several current point assignments mix three different concepts into one 0–100 number: company fit, AI maturity, and economic opportunity. Those concepts are related, but they are not the same thing. If combined carelessly, the score can become difficult to explain and can route the wrong prospects.

# **What Is Working Very Well**

## **The assessment is short enough to finish.**

Eleven scored questions plus contact capture is appropriate for the four-minute promise. The respondent is not being asked to complete a disguised discovery questionnaire.

## **The language is conversational.**

Questions such as “Honestly — is AI actually moving the needle at your company?” are substantially better than technical maturity-model language. They invite a business leader to answer plainly.

## **The workflow section gets economically useful quickly.**

People involved, frequency, collective hours, current state, and primary cost are exactly the kinds of signals needed to estimate whether a workflow is worth deeper investigation.

## **The archetype concept supports shareability.**

Observer, Tinkerer, Catalyst, and Architect are memorable enough to create an internal conversation, which supports the goal of making results travel inside the company.

## **The form is doing two jobs without looking like it.**

To the prospect it is a useful AI-readiness assessment. To the business it gathers early signals about authority, company fit, AI maturity, workflow pain, and potential economic value.

# **The Most Important Issue: Separate Maturity From Opportunity**

The current Overall AI Opportunity Score combines Company Fit (\~21%), AI Readiness (\~31%), and Workflow Opportunity (\~49%). I would change this before launch.

**Why:** a company can be highly mature with AI and have little remaining opportunity, or relatively immature with AI and have an enormous expensive workflow. A single score that rewards both maturity and pain can produce counterintuitive results.

For example, Q5 currently gives the highest points to a company that can already point to measurable AI results. That makes sense for readiness, but it does not necessarily mean the company has the greatest opportunity for your service. Likewise, a company with weaker current AI ROI may actually be a more compelling commercial opportunity if leadership is committed and the workflow economics are strong.

## **Recommended scoring architecture**

| Output | Purpose | Inputs | Prospect-facing? |
| :---- | :---- | :---- | :---- |
| AI Readiness Identity | Describes AI maturity/archetype | Q3–Q5 | Yes |
| Workflow Opportunity Score | Estimates how economically interesting the selected workflow appears | Primarily Q7–Q11 | Yes |
| Internal Fit / Qualification | Determines whether you should offer a Diagnostic | Role, company size, readiness, workflow economics, disqualifiers | No |

This gives the prospect a clearer story: “Here is where your company stands with AI, and here is how much opportunity appears to exist in the workflow you identified.” Internally, you can still use a separate qualification rule to decide whether the Diagnostic CTA appears.

# **Question-by-Question Review**

## **Q1 — Role**

**KEEP, with one adjustment** — Good qualification signal, but role should not inflate a prospect-facing AI Opportunity Score. A CEO is not inherently a better AI opportunity than a Director. Use role primarily as an internal authority/champion signal. Consider adding “Operations / Technology / Transformation leader” only if the platform allows role \+ function without making the question cumbersome.

## **Q2 — Team Size**

**REVISE** — The question asks “How big is your team?” while the ICP is defined primarily at the company level. A respondent could lead a 12-person department inside a 2,000-person company, which would distort qualification. Ask company size separately, or change this to “About how many employees does your company have?” If team size matters for workflow economics, collect it separately.

## **Q3 — AI Adoption Breadth**

**KEEP** — Strong archetype question. The answer progression is understandable and maps well from fragmented experimentation to operationalized adoption.

## **Q4 — Leadership AI Strategy**

**KEEP** — One of the most important readiness questions because executive sponsorship affects whether a real transformation can move. The progression is clear.

## **Q5 — Current AI ROI**

**KEEP, but separate its scoring purpose** — Excellent question and wording. It should influence maturity/archetype, but be careful about treating high current ROI as automatically creating more opportunity for your service. A company with tools but no measurable impact may actually be the exact pain state you want.

## **Q6 — Workflow Category**

**KEEP, but add an escape hatch** — The categories are strong starting points, but forcing every workflow into seven categories may lose good opportunities. Add “Other / something else” with a short optional description if ScoreApp supports it. Also consider whether Finance/Accounting, HR/People Ops, Support/Service, and IT operations are sufficiently represented by the current categories.

## **Q7 — People Involved**

**REVISE SCORING** — The question is useful, but 16+ people receiving fewer points than 6–15 is hard to justify without a specific reason. More people touching a repetitive workflow generally increases economic leverage, though complexity can also increase. Unless you intentionally want to penalize implementation complexity, make the scoring monotonic or move complexity into an internal feasibility factor.

## **Q8 — Frequency**

**KEEP** — Strong. Multiple-times-per-day and daily being equal may be fine for simplicity, although multiple-times-per-day could reasonably score slightly higher if the score is meant to estimate opportunity.

## **Q9 — Hours Per Week**

**KEEP, with math caveats** — This may be the most economically valuable question in the assessment. However, label the dollar figures as internal estimates rather than presenting them as actual savings. Labor cost is not the same as recoverable cash savings, and not every hour can or should be automated. The Diagnostic should validate loaded labor rate, automatable percentage, rework, error cost, and capacity value.

## **Q10 — Current State**

**KEEP, but consider multi-select or 'best description'** — The options are excellent pain signals, but several can be true simultaneously: a workflow can be partially automated, have disconnected tools, and depend on one person. If single-choice is required, explicitly ask for the “best description.” If the platform supports weighted multi-select cleanly, that could produce richer qualification data.

## **Q11 — Primary Cost**

**KEEP** — Very good business-centered question. It forces the respondent to translate workflow annoyance into an economic/operational consequence. Consider whether “Customer experience / revenue” deserves an option because some workflows create lost sales, slower response, or customer friction rather than primarily internal labor cost.

## **Q12 — Contact Capture**

**KEEP** — The placement is right: after the prospect has invested in the assessment and expects a result. The copy makes the email feel like delivery rather than lead capture. Keep the form minimal. Company name is valuable; avoid adding phone number or unnecessary fields at this stage.

# **Archetypes: Good Concept, But Validate the Boundaries**

The four archetypes are strong enough to use: AI Observer, AI Tinkerer, AI Catalyst, and AI Architect. They create a natural progression and are easy to understand.

Before locking the score bands, test them against fictional companies. Build at least 10–15 sample respondent profiles and answer the quiz exactly as each company would. Then ask: does the archetype feel obviously correct when a human reads the answers? If not, adjust the bands before launch. Do not let the platform's scoring limitations dictate a result that feels wrong.

**I would avoid the proposed fallback of simply increasing Q3–Q5 to 25 points each unless absolutely necessary.** That changes the meaning of the overall score merely to work around platform constraints. It is cleaner to use separate ScoreApp categories/subscores, hidden fields, branching logic, or external automation if available.

# **Qualification Routing Needs One More Layer**

Archetype \+ score is a useful starting point, but I would not make it the only gate for the Diagnostic. The CTA is valuable because your time is scarce; qualification should protect it.

A strong Diagnostic candidate should generally satisfy four conditions:

* Fit: company and respondent are reasonably close to the ICP, or there is a compelling exception.  
* Readiness: leadership has enough interest, sponsorship, or organizational capacity to act.  
* Economic pain: the identified workflow consumes enough time, labor, capacity, money, or error cost to matter.  
* Actionability: the problem appears plausible for AI/workflow redesign and the respondent has enough influence to move the conversation forward.

This is especially important for AI Architects. A mature company should not receive a Diagnostic CTA merely because it is mature. If it already has strong AI infrastructure and the selected workflow mostly works fine, it may be a poor opportunity. Conversely, a Tinkerer with executive buy-in and a $100,000+ annual workflow burden could be an excellent prospect.

# **A Missing Signal I Would Strongly Consider**

**Add one lightweight question about willingness/ability to act.**

The current form tells you about AI maturity and workflow pain, but it does not directly tell you whether the company is actively interested in improving the workflow. A prospect can have a painful workflow and still be purely curious.

**Possible question:** “If there were a clear business case for improving this workflow with AI or automation, how likely would your company be to act on it in the next 6 months?”

* Very likely — this is already a priority  
* Likely — if the ROI is compelling  
* Possibly — we're exploring  
* Unlikely — mostly curious right now

This would be extremely useful as an internal qualification signal. If keeping the public promise at 12 questions is important, consider replacing a lower-value scoring question or collecting this on the results/CTA step rather than simply adding length.

# **Economic Estimate: Use It Carefully**

The Q9 annual-hours math is useful for internal triage. At 3, 7.5, 15, 30, and 45 hours per week, the draft estimates roughly 150, 375, 750, 1,500, and 2,250 annual hours using a 50-week year. That is a reasonable rough model for screening.

However, do not imply that the entire labor-cost range is available as savings. During the Diagnostic, convert this into a more defensible economic model:

* Annual workflow hours × realistic loaded hourly cost  
* × realistically automatable/reducible percentage  
* \+ avoidable error/rework cost  
* \+ capacity/revenue value where defensible  
* − implementation and ongoing operating cost

That produces a much stronger ROI story than simply saying a 30-hour-per-week workflow “costs $75,000–$112,500.”

# **Recommended Pre-Launch Test**

Before publishing, run the assessment against deliberately different mock companies. The goal is not statistical validation yet; it is to catch obvious logical failures.

| Mock Company | Expected Result | What to Verify |
| :---- | :---- | :---- |
| AI-curious small company with little adoption and a minor workflow | Observer / low opportunity / nurture | Should not reach Diagnostic. |
| AI-active 100-person company with fragmented adoption and a $100K workflow burden | Tinkerer or Catalyst / high opportunity | Should be a prime Diagnostic candidate. |
| AI-mature company with strong measurable ROI and no meaningful workflow pain | Architect / low opportunity | Should not be treated as a hot lead merely because maturity is high. |
| Department leader inside a large enterprise with a severe workflow problem | Potential exception | Company-size logic and authority routing should behave intentionally. |
| Strong workflow economics but no leadership support | High opportunity / low readiness | Result should acknowledge opportunity while avoiding an aggressive Diagnostic CTA. |

# **My Recommended Changes Before Arielle Builds the Final Logic**

* Change Q2 from team size to company size, or collect both separately.  
* Separate the prospect-facing AI maturity/archetype from the workflow opportunity score.  
* Use role/company fit primarily for internal qualification rather than inflating the public opportunity score.  
* Make Q7 scoring monotonic unless there is a deliberate complexity penalty.  
* Add an “Other” workflow category or another way to capture unlisted workflows.  
* Consider a willingness-to-act / timing signal.  
* Treat Q9 dollar values as screening estimates, not promised savings.  
* Test archetype and routing logic against 10–15 fictional company profiles before launch.  
* Verify ScoreApp's category/subscore and conditional-result capabilities before using the weighting fallback.  
* Make Diagnostic eligibility depend on fit \+ readiness \+ economic pain \+ actionability, not archetype maturity alone.

# **Final Recommendation**

**Do not start over.** The question set is fundamentally good and the prospect experience is on the right track. Most of the work now is refinement of the scoring and routing architecture, not rewriting the quiz.

If those logic issues are corrected, the assessment can do exactly what the funnel needs: attract curiosity, give the prospect a result worth discussing internally, identify a real workflow opportunity, and quietly tell you whether the company deserves scarce Diagnostic time.