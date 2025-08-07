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
                id: "options.choices.0",
                content: "I am a correct choice",
                correct: true,
                rationale: "I am some rationale for a choice",
                isNoneOfTheAbove: true,
            },
            {
                id: "options.choices.1",
                content: "I am an incorrect choice",
                correct: false,
                rationale: "I am some rationale for a choice",
            },
            {
                id: "options.choices.2",
                content: "I am an incorrect choice",
                correct: false,
                isNoneOfTheAbove: false,
            },
            {
                id: "options.choices.3",
                content: "I am content for a choice",
                rationale: "I am some rationale for a choice",
                isNoneOfTheAbove: false,
            },
            {
                id: "options.choices.4",
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
