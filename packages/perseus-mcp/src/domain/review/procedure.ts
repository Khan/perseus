import {CHECKLIST, CHECKLIST_URI} from "./checklist";

// Steps 2 on, shared by the review_item tool and prompt. Step 1 differs:
// the tool's result already holds the draft's validation issues.
const JUDGMENT_STEPS = `\
2. Solve the question from its text alone, before reading the key. An
   answer different from the key is a finding.
3. Read the wording as a learner would: rounding, units, the requested form,
   thousands separators, equivalent forms. Write the answers a learner is
   likely to give, labelled with the outcome your own solution expects, and
   run check_user_inputs with them.
4. Check that the last hint gives the same answer as the key and your
   solution. If not, solve again to decide which is wrong.
5. Check that every interactive widget can be answered and is graded as
   intended, and that static and ungraded widgets are deliberate.
6. Test several equivalent forms of complex expressions; the expression
   scorer can reject valid ones. Report any it rejects.
7. If the author's intent is unclear, ask or report it. Don't guess.`;

function report(): string {
    const kinds = CHECKLIST.map((entry) => `\`${entry.id}\``).join(", ");
    return `\
Don't change the draft while reviewing. Report:

{
  "guesses": <the inputs you gave check_user_inputs, with their results>,
  "findings": [{"widget": <widget id or null>, "kind": <kind>,
    "witness": <the input or text that shows it>, "note": <what's wrong>}]
}

where kind is one of ${kinds}.`;
}

/**
 * The review procedure for a draft, as instructions to the agent, for the
 * review_item prompt, which a person starts. The mechanical checks run in
 * validate_item; these steps are the judgment calls it can't make.
 */
export function reviewPrompt(itemId: string): string {
    return `\
Review the Perseus item in draft "${itemId}" before it goes to learners.
Read it with export_item. The review checklist shows what each kind of
defect looks like:
${CHECKLIST_URI}

1. Run validate_item. Fix every error, and fix or explain each warning;
   each issue's \`see\` links to its checklist entry.
${JUDGMENT_STEPS}

${report()}`;
}

/**
 * The same procedure for the review_item tool, whose result also holds the
 * draft's validation issues and the checklist entries that apply.
 */
export function reviewProcedure(itemId: string): string {
    return `\
Review the Perseus item in draft "${itemId}" before it goes to learners.
Read it with export_item. \`checklist\` describes the defects to look for,
each with an example.

1. \`issues\` are validate_item's for this revision. Fix every error, and
   fix or explain each warning; each issue's \`see\` ends with the id of its
   entry in \`checklist\`. Then call review_item again.
${JUDGMENT_STEPS}

${report()}`;
}
