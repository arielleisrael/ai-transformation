# AI Readiness Quiz & Qualified-Prospect Scheduling Workflow

**WORKING DRAFT — Revised August 14, 2026**

*To be finalized with Arielle after confirming the quiz platform, scoring logic, integrations, and automation approach.*

# **Objective**

Create a low-friction, mostly automated path that turns curiosity about a company’s AI effectiveness into a qualified AI Workflow ROI Diagnostic booking. The prospect should experience this as a useful, engaging AI-readiness quiz with an immediate personalized result—not as a tedious intake form or a disguised sales process. The result should be compelling and shareable enough that the prospect wants to bring it back to coworkers or leadership, creating internal discussion about whether the company’s AI activity is actually producing meaningful business value. Behind the scenes, the quiz should collect the information needed to qualify the company, automatically determine the appropriate next step, and allow qualified prospects to book directly through Calendly with minimal manual work from Uzziah or Arielle.

| Prospect experience: “That was useful and kind of fun—and my team needs to see this.”Internal function: qualify the prospect, segment them, and route the right companies to a Diagnostic automatically. |
| :---: |

# **Workflow at a Glance**

CTA / LinkedIn / Referral  →  **AI Readiness Quiz**  →  **AI Readiness Score \+ Archetype**  →  **Automated Qualification Logic**  →  **Qualified → Calendly | Not Qualified → Free Assessment Only**  →  Automatic Founder Notification  →  **Diagnostic with Uzziah \+ Arielle**  →  Revenue Pipeline Updated

# **1\. Prospect-Facing Entry Point: The AI Readiness Quiz**

**Core challenge/question:** Is your company actually using AI effectively?

**Suggested framing:** You may be using ChatGPT, Claude, Copilot, or other AI tools—but is AI actually changing how your company works, improving productivity, and benefiting the bottom line?

**Primary CTA:** Take the AI Readiness Quiz

**Experience goal:** Make the assessment short, conversational, visually engaging, and inherently shareable. The user should feel they are discovering something interesting and useful about their company—not completing a lead form. The result should be specific enough to spark curiosity, disagreement, or recognition internally and make the prospect want to share it with coworkers or leadership. The ideal reaction is: “This describes us. We should talk about this.”

# **2\. What the Quiz Must Accomplish Behind the Scenes**

The quiz should collect the same qualification information required by the Diagnostic Qualification Criteria, but the questions should be written and presented in a friendly, gamified way.

* Company size and basic company context.  
* How AI is currently being used across the organization.  
* Whether AI use is isolated to a few employees or connected to end-to-end workflows.  
* Whether meaningful manual/repetitive knowledge work still exists.  
* Whether there is a workflow problem with enough business value to investigate.  
* Approximate people, time, frequency, and/or cost involved in the workflow.  
* The respondent’s role and influence over a potential improvement initiative.  
* Relevant technical/readiness signals needed to identify obvious fit or feasibility concerns.

# **3\. Instant AI Readiness Score \+ Archetype**

Every prospect should receive something useful immediately after completing the quiz: an AI readiness score, an archetype, a short explanation of what that archetype means, and the most appropriate next step.

## **Draft Archetype Structure**

**Important:** These archetypes are working concepts. Arielle and Uzziah should finalize the names, scoring thresholds, and logic before launch.

| Draft Archetype | What It Means |
| :---- | :---- |
| AI-Optimized | AI is already embedded into meaningful workflows, adoption is broad, systems are coordinated, and the company can demonstrate measurable business impact. This company may not need the initial Diagnostic. |
| Transformation-Ready | Leadership is committed to AI and there are meaningful workflow opportunities, but the organization has not yet connected adoption to an end-to-end transformation and measurable ROI. This is likely a strong-fit profile. |
| AI Tinkerer | Some employees or teams are experimenting with AI tools, but usage is fragmented and has not yet translated into consistent operational or bottom-line impact. This may be a strong opportunity if the workflow pain, authority, and economics are sufficient. |
| Not Ready Yet | The company may be early in AI adoption, lack the necessary workflow/data conditions, or not have enough urgency or ownership to justify a Diagnostic right now. They still receive a useful assessment, but no immediate sales call is required. |

**3A. Design the Result to Be Shared Internally**

The assessment result should do more than inform the person who took the quiz. It should give them a simple, credible way to show coworkers or leadership where the company currently stands and why the result matters.

The result experience should be designed to create an internal conversation such as: “Are we really getting ROI from AI?” “Is this actually how we operate?” “Why are we still doing this manually?” or “Should we be further along?”

• Give each archetype a memorable name and a short, plain-English explanation that people can easily repeat to others.

• Show the company’s AI Readiness Score prominently enough that it feels worth discussing or comparing internally.

• Include 2–4 concise observations explaining why the company landed in that archetype and what the business implication may be.

• Include a short “What this means for your company” section focused on business impact—not technical jargon.

• Make the result easy to share with a copyable link, downloadable/shareable summary, or simple share action if the chosen quiz platform supports it without delaying launch.

• For qualified companies, frame the Diagnostic as the natural next step for the team to validate where the biggest workflow/ROI opportunity actually exists.

• Avoid fear-based or embarrassing language. The result should create productive curiosity and urgency, not make the prospect feel judged for being behind.

**Internal activation goal:** The assessment should be useful enough on its own that the prospect becomes an internal messenger for the problem. Rather than Uzziah and Arielle having to convince an entire company that AI transformation matters, the quiz should help the prospect start that conversation from inside the organization.

# **4\. Automated Qualification & Routing Logic**

**The AI readiness archetype is the prospect-facing result.** The internal qualification decision should use the Diagnostic Qualification Criteria and the prospect’s quiz responses. The two systems should work together, but an archetype by itself should not automatically override important qualification factors such as company fit, workflow economics, decision influence, or feasibility.

## **Branch A — Qualified for a Diagnostic**

* Display the prospect’s AI Readiness Score, archetype, and brief personalized assessment.  
* Explain why their company appears to have a meaningful opportunity to improve AI-driven workflow performance.  
* Present a clear CTA to book an AI Workflow ROI Diagnostic.  
* Send or display the existing Calendly booking link.  
* Automatically notify Uzziah and Arielle that a qualified prospect completed the quiz.

## **Branch B — Not Qualified / Not Needed Right Now**

* Display the AI Readiness Score, archetype, and brief personalized assessment.  
* Give the prospect a helpful explanation of where the company currently stands and what would need to change before a Diagnostic would be valuable.  
* Do not present the Diagnostic booking CTA.  
* Optionally invite the prospect to follow future content or retake the assessment later, without creating another manual follow-up obligation.

## **Optional Exception Branch — Needs Review**

If Arielle determines that certain quiz combinations cannot be safely or accurately auto-qualified, those submissions can be flagged for internal review rather than automatically invited or rejected. This should only be used if necessary; the default design goal is automated routing.

# **5\. Qualified Prospect → Calendly Booking**

1\.  A qualified prospect reaches the booking CTA directly from the results experience.

2\.  The CTA points to Uzziah’s existing Calendly account.

3\.  Calendly should only expose approved Diagnostic availability and should exclude Saturdays, holy days, and other blocked commitments.

4\.  The Diagnostic is 30 minutes by default unless Uzziah and Arielle later approve a different standard.

5\.  Calendly generates the meeting confirmation, meeting link, and normal reminders.

6\.  Uzziah and Arielle are both included on every Diagnostic call.

# **6\. Diagnostic Call Roles**

| Person | Primary Lens | Responsibility During the Diagnostic |
| :---- | :---- | :---- |
| Uzziah | Business / Economic | Lead business diagnosis: workflow, people, time, cost, urgency, business impact, decision authority, ROI potential, and whether the problem is commercially worth solving. |
| Arielle | Technical / Implementation | Lead technical diagnosis: systems, data, integrations, constraints, feasibility, security considerations, automation potential, human-review needs, and delivery risk. |

**Operating principle:** Both founders attend every Diagnostic. Uzziah determines whether the business problem is valuable enough to solve; Arielle determines whether the technical path is realistic enough to deliver.

# **7\. Automation, Notifications & Internal Sync**

The goal is to avoid requiring Uzziah or Arielle to manually review every quiz submission. The system should do the first-pass scoring, archetype assignment, qualification routing, and scheduling handoff automatically.

## **Must-Have Automation for Initial Launch**

* Quiz scoring and AI-readiness archetype assignment.  
* Qualified vs. not-qualified routing based on approved logic.  
* Immediate prospect results/assessment.  
* Qualified prospect CTA/redirect to Calendly.  
* Automatic notification to Uzziah and Arielle when a qualified prospect completes the quiz.  
* Calendly booking confirmation and calendar invitation.

## **Preferred Automation (If Simple to Implement)**

* Create or update the prospect’s Revenue Pipeline card when a qualified submission is received or a call is booked.  
* Record quiz result/archetype, qualification status, contact information, call date/time, source, and next action in the Revenue Pipeline.  
* Reflect the booked Diagnostic in the Sprint Calendar without duplicate manual entry.

**Complexity rule:** Do not delay launch to automate a Basecamp integration if the quiz → qualification → assessment → Calendly → founder notification flow is already working. Revenue Pipeline/Sprint Calendar automation can be added only if Arielle confirms it is straightforward.

# **8\. Pre-Diagnostic Preparation**

1\.  At least 24 hours before the call, review the prospect’s quiz submission and archetype.

2\.  Complete concise company/prospect research focused on size, business model, likely workflows, AI signals, relevant tools/technology, and the attendee’s role.

3\.  Prepare 3–5 business hypotheses/questions for Uzziah to test.

4\.  Prepare the most important technical questions or feasibility risks for Arielle to test.

5\.  Ensure the Revenue Pipeline card contains the company, contact, quiz result, call date/time, source, and next action.

# **9\. After the Diagnostic**

1\.  Immediately document what was learned about the workflow, economics, technical feasibility, urgency, authority, and next step.

2\.  Move the Revenue Pipeline card based on evidence—not enthusiasm.

3\.  If a real expensive, feasible problem exists, move toward economic analysis/FAEO scoring and the paid-offer process.

4\.  If the opportunity is not qualified after deeper discovery, close or hold it with a documented reason.

# **10\. Draft Prospect-Facing Copy**

## **Quiz Hook**

**Is Your Company Actually Using AI Effectively?**

Your team may already be using AI tools. But are they actually changing how the company works—and creating measurable business value? Take the AI Readiness Quiz to find out where your company stands.

## **Qualified Result CTA**

Your results suggest your company may have a meaningful opportunity to turn AI adoption into measurable workflow improvement. Share these results with the people responsible for operations, technology, or AI inside your company and compare notes: does this assessment match what you’re seeing internally? If you’d like to take the next step, book a 30-minute AI Workflow ROI Diagnostic with Uzziah and Arielle. We’ll examine one workflow from both the business and technical sides and determine whether there’s a practical opportunity worth pursuing.

# **11\. Items to Finalize with Arielle**

* Quiz/form platform.  
* Final question set and scoring weights.  
* Final archetype names, thresholds, and result copy.  
* Exact qualification logic that triggers the Diagnostic CTA.  
* Whether any submissions require a manual-review exception branch.  
* How the results page is generated/personalized.  
* How qualified-result notifications are sent to both founders.  
* Calendly routing/availability and both-founder attendance setup.  
* Whether Revenue Pipeline and Sprint Calendar updates can be automated simply enough for launch.  
* Testing plan for every logic branch before public release.

# **Completion Standard for This Workflow Task**

**This workflow is complete when:** a prospect can move from the AI Readiness Quiz to an immediate archetype assessment that is useful, memorable, and easy to share internally; qualified prospects can then move to a confirmed Calendly appointment without Uzziah or Arielle manually screening the submission; both founders are notified, both are included on the Diagnostic, and the Revenue Pipeline/Sprint Calendar can be kept synchronized without ambiguous or duplicate scheduling. The result experience should be strong enough to encourage internal discussion about the company’s AI effectiveness and, for qualified companies, make the Diagnostic feel like a logical next step.

**Current status:** Working draft. The business flow is defined, but the technical implementation, scoring logic, and final automation choices must be confirmed with Arielle before this document becomes the final operating standard.