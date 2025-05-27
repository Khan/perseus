export const v0Widget = {
    type: "radio" as const,
    version: {major: 0, minor: 0},
    graded: true,
    options: {
        choices: [
            {
                content: "I am a correct choice",
                correct: true,
                clue: "I am some rationale for a choice",
                isNoneOfTheAbove: true,
                widgets: undefined,
            },
            {
                content: "I am an incorrect choice",
                correct: false,
                clue: "I am some rationale for a choice",
                widgets: undefined,
            },
            {
                content: "I am an incorrect choice",
                correct: false,
                isNoneOfTheAbove: false,
                widgets: {},
            },
            {
                content: "I am content for a choice",
                clue: "I am some rationale for a choice",
                isNoneOfTheAbove: false,
            },
            {
                content: "I am a choice with only content",
            },
        ],
        countChoices: false,
        randomize: false,
        multipleSelect: false,
        deselectEnabled: false,
        onePerLine: false,
        displayCount: false,
        noneOfTheAbove: false as const,
    },
};

export const v1Widget = {
    type: "radio" as const,
    graded: true,
    options: {
        choices: [
            {
                content: "I am a correct choice",
                correct: true,
                clue: "I am some rationale for a choice",
                isNoneOfTheAbove: true,
                widgets: undefined,
            },
            {
                content: "I am an incorrect choice",
                correct: false,
                clue: "I am some rationale for a choice",
                widgets: undefined,
            },
            {
                content: "I am an incorrect choice",
                correct: false,
                isNoneOfTheAbove: false,
                widgets: {},
            },
            {
                content: "I am content for a choice",
                clue: "I am some rationale for a choice",
                isNoneOfTheAbove: false,
            },
            {
                content: "I am a choice with only content",
            },
        ],
        hasNoneOfTheAbove: false,
        countChoices: false,
        randomize: false,
        multipleSelect: false,
        deselectEnabled: false,
        onePerLine: false,
        displayCount: false,
        noneOfTheAbove: undefined,
    },
    version: {
        major: 1,
        minor: 0,
    },
};

export const v2Widget = {
    type: "radio" as const,
    graded: true,
    options: {
        choices: [
            {
                content: "I am a correct choice",
                correct: true,
                clue: "I am some rationale for a choice",
                isNoneOfTheAbove: true,
                widgets: undefined,
            },
            {
                content: "I am an incorrect choice",
                correct: false,
                clue: "I am some rationale for a choice",
                widgets: undefined,
            },
            {
                content: "I am an incorrect choice",
                correct: false,
                isNoneOfTheAbove: false,
                widgets: {},
            },
            {
                content: "I am content for a choice",
                clue: "I am some rationale for a choice",
                isNoneOfTheAbove: false,
            },
            {
                content: "I am a choice with only content",
            },
        ],
        numCorrect: 1,
        hasNoneOfTheAbove: false,
        countChoices: false,
        randomize: false,
        multipleSelect: false,
        deselectEnabled: false,
        onePerLine: false,
        displayCount: false,
        noneOfTheAbove: undefined,
    },
    version: {
        major: 2,
        minor: 0,
    },
};

export const v3Widget = {
    type: "radio" as const,
    graded: true,
    options: {
        choices: [
            {
                content: "I am a correct choice",
                correct: true,
                rationale: "I am some rationale for a choice",
                isNoneOfTheAbove: true,
            },
            {
                content: "I am an incorrect choice",
                correct: false,
                rationale: "I am some rationale for a choice",
            },
            {
                content: "I am an incorrect choice",
                correct: false,
                isNoneOfTheAbove: false,
            },
            {
                content: "I am content for a choice",
                rationale: "I am some rationale for a choice",
                isNoneOfTheAbove: false,
            },
            {
                content: "I am a choice with only content",
            },
        ],
        numCorrect: 1,
        hasNoneOfTheAbove: false,
        countChoices: false,
        randomize: false,
        multipleSelect: false,
        deselectEnabled: false,
    },
    version: {
        major: 3,
        minor: 0,
    },
};

export const v4Widget = {
    type: "radio" as const,
    graded: true,
    options: {
        choices: [
            {
                content: "I am a correct choice",
                correct: true,
                rationale: "I am some rationale for a choice",
                isNoneOfTheAbove: true,
                id: "choice-f2ed8705-8e24-47f3-8dc6-9f2b0ede4e1a",
            },
            {
                content: "I am an incorrect choice",
                correct: false,
                rationale: "I am some rationale for a choice",
                id: "choice-9eef127a-244c-45fd-b050-ec90e47508e7",
            },
            {
                content: "I am an incorrect choice",
                correct: false,
                isNoneOfTheAbove: false,
                id: "choice-c493992c-f7bd-4147-ad52-1707371841c3",
            },
            {
                content: "I am content for a choice",
                rationale: "I am some rationale for a choice",
                isNoneOfTheAbove: false,
                id: "choice-cea0601c-a7e1-4372-ac2d-8dcd2189b599",
            },
            {
                content: "I am a choice with only content",
                id: "choice-a88fb0e1-0fe8-4a05-9f11-5e9735eccf9b",
            },
        ],
        numCorrect: 1,
        hasNoneOfTheAbove: false,
        countChoices: false,
        randomize: false,
        multipleSelect: false,
        deselectEnabled: false,
    },
    version: {
        major: 4,
        minor: 0,
    },
};
