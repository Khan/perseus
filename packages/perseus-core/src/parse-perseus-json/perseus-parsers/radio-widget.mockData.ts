export const v0Widget = {
    type: "radio" as const,
    version: {major: 0, minor: 0},
    graded: true,
    options: {
        choices: [
            {
                content: "I am a correct choice",
                correct: true,
                clue: "I am a clue for a choice",
                isNoneOfTheAbove: true,
                widgets: undefined,
            },
            {
                content: "I am an incorrect choice",
                correct: false,
                clue: "I am a clue for a choice",
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
                clue: "I am a clue for a choice",
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
                clue: "I am a clue for a choice",
                isNoneOfTheAbove: true,
                widgets: undefined,
            },
            {
                content: "I am an incorrect choice",
                correct: false,
                clue: "I am a clue for a choice",
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
                clue: "I am a clue for a choice",
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
                clue: "I am a clue for a choice",
                isNoneOfTheAbove: true,
                widgets: undefined,
            },
            {
                content: "I am an incorrect choice",
                correct: false,
                clue: "I am a clue for a choice",
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
                clue: "I am a clue for a choice",
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
                clue: "I am a clue for a choice",
                isNoneOfTheAbove: true,
            },
            {
                content: "I am an incorrect choice",
                correct: false,
                clue: "I am a clue for a choice",
            },
            {
                content: "I am an incorrect choice",
                correct: false,
                isNoneOfTheAbove: false,
            },
            {
                content: "I am content for a choice",
                clue: "I am a clue for a choice",
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
