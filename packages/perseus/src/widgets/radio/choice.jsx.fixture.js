// @flow
export const instances: $ReadOnlyArray<mixed> = [
    ({}: {...}),
    {
        content: "Plain Content",
        goToPrevChoice: () => {},
        goToNextChoice: () => {},
    },
    {
        content: "Correct Content (Review)",
        correct: true,
        reviewMode: true,
        goToPrevChoice: () => {},
        goToNextChoice: () => {},
    },
    {
        content: "Incorrect Content (Review)",
        correct: false,
        reviewMode: true,
        goToPrevChoice: () => {},
        goToNextChoice: () => {},
    },
    {
        content: "Content (Review, correctness not specified)",
        reviewMode: true,
        goToPrevChoice: () => {},
        goToNextChoice: () => {},
    },
    {
        content: "Content with Rationale",
        rationale: "This is some additional information",
        showRationale: true,
        goToPrevChoice: () => {},
        goToNextChoice: () => {},
    },
    {
        content: "Correct Content with Rationale (Review)",
        correct: true,
        rationale: "This is some additional information",
        reviewMode: true,
        showRationale: true,
        goToPrevChoice: () => {},
        goToNextChoice: () => {},
    },
    {
        content: "Incorrect Content with Rationale (Review)",
        correct: false,
        rationale: "This is some additional information",
        reviewMode: true,
        showRationale: true,
        goToPrevChoice: () => {},
        goToNextChoice: () => {},
    },
    {
        content: "Content with Rationale (Review, correctness not specified)",
        rationale: "This is some additional information",
        reviewMode: true,
        showRationale: true,
        goToPrevChoice: () => {},
        goToNextChoice: () => {},
    },
];

export const log = ["goToPrevChoice", "goToNextChoice"];
