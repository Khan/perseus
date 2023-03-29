export const instances: ReadonlyArray<unknown> = [
    {} as Record<any, any>,
    {
        content: "Plain Content",
    },
    {
        content: "Correct Content (Review)",
        correct: true,
        reviewMode: true,
    },
    {
        content: "Incorrect Content (Review)",
        correct: false,
        reviewMode: true,
    },
    {
        content: "Content (Review, correctness not specified)",
        reviewMode: true,
    },
    {
        content: "Content with Rationale",
        rationale: "This is some additional information",
        showRationale: true,
    },
    {
        content: "Correct Content with Rationale (Review)",
        correct: true,
        rationale: "This is some additional information",
        reviewMode: true,
        showRationale: true,
    },
    {
        content: "Incorrect Content with Rationale (Review)",
        correct: false,
        rationale: "This is some additional information",
        reviewMode: true,
        showRationale: true,
    },
    {
        content: "Content with Rationale (Review, correctness not specified)",
        rationale: "This is some additional information",
        reviewMode: true,
        showRationale: true,
    },
];
