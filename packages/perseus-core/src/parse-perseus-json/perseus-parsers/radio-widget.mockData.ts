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
                id: "a1b2c3d4-e5f6-4789-a012-345678901234",
                content: "I am a correct choice",
                correct: true,
                rationale: "I am some rationale for a choice",
                isNoneOfTheAbove: true,
            },
            {
                id: "3e4d5c6b-7a89-4012-b345-6789cdef0123",
                content: "I am an incorrect choice",
                correct: false,
                rationale: "I am some rationale for a choice",
            },
            {
                id: "9c8b7a65-4321-4fed-9876-543210fedcba",
                content: "I am an incorrect choice",
                correct: false,
                isNoneOfTheAbove: false,
            },
            {
                id: "2468ace0-1357-4bdf-9024-68ace1357bdf",
                content: "I am content for a choice",
                rationale: "I am some rationale for a choice",
                isNoneOfTheAbove: false,
            },
            {
                id: "7f8e9d0c-1b2a-4567-8901-23456789abcd",
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
        major: 4,
        minor: 0,
    },
};
