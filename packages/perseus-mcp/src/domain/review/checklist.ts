/** Where the checklist is served; entries are its `#<id>` fragments. */
export const CHECKLIST_URI = "perseus://guides/review-checklist.md";

/**
 * One kind of defect that has reached learners, and how to catch it before
 * an item ships.
 */
export type ChecklistEntry = {
    /** A stable name, used as the entry's anchor. */
    id: string;
    title: string;
    /** How to find it: the check that catches it, or what to look at. */
    check: string;
    /** A short instance of the defect. */
    example: string;
    /** The validate_item issue codes this entry explains, if any. */
    issueCodes: ReadonlyArray<string>;
};

export const CHECKLIST: ReadonlyArray<ChecklistEntry> = [
    {
        id: "no-correct-answer",
        title: "Radio with no correct choice",
        check:
            "validate_item reports it (lint:radio-widget-error). Also check " +
            "that the choice marked correct is the one your own solution " +
            "picks.",
        example: "Four choices, none with `correct: true`.",
        issueCodes: ["lint:radio-widget-error"],
    },
    {
        id: "unanswerable",
        title: "Widget the learner can't answer",
        check:
            "validate_item reports a static widget in the question " +
            "(lint:static-widget-in-question-stem). Check that every other " +
            "static or ungraded widget is deliberate.",
        example:
            "A numeric-input left `static: true` after copying it from a " +
            "hint, so it shows the answer and can't be typed in.",
        issueCodes: ["lint:static-widget-in-question-stem"],
    },
    {
        id: "too-many-sorter-cards",
        title: "Sorter with too many cards",
        check:
            "validate_item warns (lint:sorter-widget-warning) above 10 " +
            "cards, or above 5 in horizontal layout.",
        example: "A horizontal sorter with 7 dates to put in order.",
        issueCodes: ["lint:sorter-widget-warning", "lint:sorter-widget-error"],
    },
    {
        id: "table-missing-caption",
        title: "Table with no caption or headers",
        check:
            "validate_item warns (lint:table-missing-caption). Give the " +
            "table a caption and a header row.",
        example: "A markdown table of values with no header row.",
        issueCodes: ["lint:table-missing-caption"],
    },
    {
        id: "duplicate-choices",
        title: "Duplicate radio or dropdown choices",
        check:
            "Compare the choices with whitespace and `$` signs ignored; " +
            "two that read the same are a finding.",
        example: 'Choices A "$\\frac{1}{2}$" and D "$\\frac{1}{2}$ ".',
        issueCodes: [],
    },
    {
        id: "untranslatable-graphie-image",
        title: "Graphie image used as a flat PNG",
        check:
            "An image URL like `https://ka-perseus-graphie…/X.png` loses " +
            "its labels' translations. Use `web+graphie://…/X` instead.",
        example:
            "`https://ka-perseus-graphie.s3.amazonaws.com/ab12.png` in an " +
            "image widget.",
        issueCodes: [],
    },
    {
        id: "key-contradicts-hints",
        title: "Key contradicts the hints",
        check:
            "Work through the last hint and compare its answer with the key " +
            "and with your own solution. If they differ, solve again to " +
            "decide which is wrong.",
        example: "The hints conclude 11 cm; the key accepts 16 cm.",
        issueCodes: [],
    },
    {
        id: "wording-invites-rejected-answer",
        title: "Wording invites an answer the key rejects",
        check:
            "Read the question as a learner: rounding, units, the requested " +
            "form, thousands separators. Put each likely answer through " +
            "check_user_inputs with the outcome your solution expects.",
        example:
            '"Round to the nearest thousand" with a key of 19, while ' +
            "learners type 19000.",
        issueCodes: [],
    },
    {
        id: "correct-rejected",
        title: "Equivalent correct answers rejected",
        check:
            "Give check_user_inputs several equivalent forms of each correct " +
            "answer (0.75, 3/4, 75%). The expression scorer can reject " +
            "valid forms of complex expressions; report any it rejects.",
        example: "An expression widget that accepts 2(x+1) but rejects 2x+2.",
        issueCodes: [],
    },
    {
        id: "incorrect-accepted",
        title: "Wrong answers accepted",
        check:
            "Give check_user_inputs the mistakes learners are likely to " +
            "make, each expected incorrect. One that scores correct is a " +
            "finding.",
        example:
            "A dropdown where a distractor is also marked correct, so a " +
            "learner who guesses it gets credit.",
        issueCodes: [],
    },
    {
        id: "placeholder-mismatch",
        title: "Placeholders and widgets don't match",
        check:
            "validate_item reports a placeholder with no widget, a widget " +
            "never placed, a placeholder used twice, or a widget id that " +
            "won't render.",
        example:
            "Content with [[☃ radio 1]] whose widgets map only has " +
            '"radio 2".',
        issueCodes: [
            "missing-widget",
            "orphaned-widget",
            "duplicate-placeholder",
            "unrenderable-widget-id",
        ],
    },
    {
        id: "widget-to-avoid",
        title: "Unfinished or deprecated widget",
        check:
            "validate_item notes free-response (unfinished) and deprecated " +
            "widgets; get_widget_spec says what to use instead.",
        example: "A grapher where interactive-graph would do.",
        issueCodes: ["unfinished-widget", "deprecated-widget"],
    },
];

const ENTRY_BY_ISSUE_CODE: ReadonlyMap<string, ChecklistEntry> = new Map(
    CHECKLIST.flatMap((entry) =>
        entry.issueCodes.map((code) => [code, entry] as const),
    ),
);

/** The checklist entry explaining a validate_item issue code, as a URI. */
export function checklistLinkFor(issueCode: string): string | undefined {
    const entry = ENTRY_BY_ISSUE_CODE.get(issueCode);
    return entry == null ? undefined : `${CHECKLIST_URI}#${entry.id}`;
}

/** The checklist as Markdown, one section per entry, headed with its id. */
export function renderChecklist(): string {
    const sections = CHECKLIST.map(
        (entry) =>
            `## ${entry.title} (\`${entry.id}\`)\n\n` +
            `**Check:** ${entry.check}\n\n` +
            `**Example:** ${entry.example}`,
    );
    return [
        "# Perseus item review checklist",
        "Defects that have reached learners, and how to catch each one " +
            "before an item ships. Findings use the entry ids as their " +
            "`kind`.",
        ...sections,
    ].join("\n\n");
}
