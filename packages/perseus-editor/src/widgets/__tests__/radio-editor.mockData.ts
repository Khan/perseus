export const mockIds = [
    "1-1-1-1-1",
    "2-2-2-2-2",
    "3-3-3-3-3",
    "4-4-4-4-4",
    "5-5-5-5-5",
];

export const singleChoice = {
    id: "1-1-1-1-1",
    content: "Choice 1",
};
export const singleChoiceWithCorrect = {...singleChoice, correct: true};

const threeChoices = [
    {id: "1-1-1-1-1", content: "Choice 1"},
    {id: "2-2-2-2-2", content: "Choice 2"},
    {id: "3-3-3-3-3", content: "Choice 3"},
];

export const threeChoicesWithCorrect = [
    {id: "1-1-1-1-1", content: "Choice 1"},
    {
        id: "2-2-2-2-2",
        content: "Choice 2",
        correct: true,
    },
    {id: "3-3-3-3-3", content: "Choice 3"},
];

export const threeChoicesWithCorrectAndNoneOfTheAbove = [
    {
        id: "2-2-2-2-2",
        content: "Choice 2",
        correct: true,
    },
    {id: "3-3-3-3-3", content: "Choice 3"},
    {id: mockIds[4], content: "None of the above", isNoneOfTheAbove: true},
];

export const fourChoices = [
    ...threeChoices,
    {id: "4-4-4-4-4", content: "Choice 4"},
];

export const fourChoicesWithAllIncorrect = [
    {
        id: "1-1-1-1-1",
        content: "Choice 1",
        correct: false,
    },
    {
        id: "2-2-2-2-2",
        content: "Choice 2",
        correct: false,
    },
    {
        id: "3-3-3-3-3",
        content: "Choice 3",
        correct: false,
    },
    {
        id: "4-4-4-4-4",
        content: "Choice 4",
        correct: false,
    },
];

export const fourChoicesWithFirstCorrect = [
    {
        id: "1-1-1-1-1",
        content: "Choice 1",
        correct: true,
    },
    {
        id: "2-2-2-2-2",
        content: "Choice 2",
        correct: false,
    },
    {
        id: "3-3-3-3-3",
        content: "Choice 3",
        correct: false,
    },
    {
        id: "4-4-4-4-4",
        content: "Choice 4",
        correct: false,
    },
];

export const fourChoicesWithSecondCorrect = [
    {
        id: "1-1-1-1-1",
        content: "Choice 1",
        correct: false,
    },
    {
        id: "2-2-2-2-2",
        content: "Choice 2",
        correct: true,
    },
    {
        id: "3-3-3-3-3",
        content: "Choice 3",
        correct: false,
    },
    {
        id: "4-4-4-4-4",
        content: "Choice 4",
        correct: false,
    },
];

export const fourChoicesWithTwoCorrect = [
    {
        id: "1-1-1-1-1",
        content: "Choice 1",
        correct: true,
    },
    {
        id: "2-2-2-2-2",
        content: "Choice 2",
        correct: true,
    },
    {
        id: "3-3-3-3-3",
        content: "Choice 3",
        correct: false,
    },
    {
        id: "4-4-4-4-4",
        content: "Choice 4",
        correct: false,
    },
];

export const fourChoicesWithNoneOfTheAboveAndCorrect = [
    ...threeChoicesWithCorrect,
    {id: mockIds[4], content: "None of the above", isNoneOfTheAbove: true},
];

export const fourChoicesWithOneChoice1A = [
    {id: "1-1-1-1-1", content: "Choice 1A"},
    {id: "2-2-2-2-2", content: "Choice 2"},
    {id: "3-3-3-3-3", content: "Choice 3"},
    {id: "4-4-4-4-4", content: "Choice 4"},
];

export const fourChoicesWithOneRationale = [
    {
        id: "1-1-1-1-1",
        content: "Choice 1",
        rationale: "A",
    },
    {id: "2-2-2-2-2", content: "Choice 2"},
    {id: "3-3-3-3-3", content: "Choice 3"},
    {id: "4-4-4-4-4", content: "Choice 4"},
];
