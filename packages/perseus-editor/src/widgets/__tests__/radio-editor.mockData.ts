export const mockIds = [
    "1-1-1-1-1",
    "2-2-2-2-2",
    "3-3-3-3-3",
    "4-4-4-4-4",
    "5-5-5-5-5",
];

export const singleChoice = {
    id: mockIds[0],
    content: "Choice 1",
};
export const singleChoiceWithCorrect = {...singleChoice, correct: true};

const threeChoices = [
    {id: mockIds[0], content: "Choice 1"},
    {id: mockIds[1], content: "Choice 2"},
    {id: mockIds[2], content: "Choice 3"},
];

export const threeChoicesWithCorrect = [
    {id: mockIds[0], content: "Choice 1"},
    {
        id: mockIds[1],
        content: "Choice 2",
        correct: true,
    },
    {id: mockIds[2], content: "Choice 3"},
];

export const threeChoicesWithCorrectAndNoneOfTheAbove = [
    {
        id: mockIds[1],
        content: "Choice 2",
        correct: true,
    },
    {id: mockIds[2], content: "Choice 3"},
    {id: mockIds[4], content: "None of the above", isNoneOfTheAbove: true},
];

export const fourChoices = [
    ...threeChoices,
    {id: mockIds[3], content: "Choice 4"},
];

export const fourChoicesWithAllIncorrect = [
    {
        id: mockIds[0],
        content: "Choice 1",
        correct: false,
    },
    {
        id: mockIds[1],
        content: "Choice 2",
        correct: false,
    },
    {
        id: mockIds[2],
        content: "Choice 3",
        correct: false,
    },
    {
        id: mockIds[3],
        content: "Choice 4",
        correct: false,
    },
];

export const fourChoicesWithFirstCorrect = [
    {
        id: mockIds[0],
        content: "Choice 1",
        correct: true,
    },
    {
        id: mockIds[1],
        content: "Choice 2",
        correct: false,
    },
    {
        id: mockIds[2],
        content: "Choice 3",
        correct: false,
    },
    {
        id: mockIds[3],
        content: "Choice 4",
        correct: false,
    },
];

export const fourChoicesWithSecondCorrect = [
    {
        id: mockIds[0],
        content: "Choice 1",
        correct: false,
    },
    {
        id: mockIds[1],
        content: "Choice 2",
        correct: true,
    },
    {
        id: mockIds[2],
        content: "Choice 3",
        correct: false,
    },
    {
        id: mockIds[3],
        content: "Choice 4",
        correct: false,
    },
];

export const fourChoicesWithTwoCorrect = [
    {
        id: mockIds[0],
        content: "Choice 1",
        correct: true,
    },
    {
        id: mockIds[1],
        content: "Choice 2",
        correct: true,
    },
    {
        id: mockIds[2],
        content: "Choice 3",
        correct: false,
    },
    {
        id: mockIds[3],
        content: "Choice 4",
        correct: false,
    },
];

export const fourChoicesWithNoneOfTheAboveAndCorrect = [
    ...threeChoicesWithCorrect,
    {id: mockIds[4], content: "None of the above", isNoneOfTheAbove: true},
];

export const fourChoicesWithOneChoice1A = [
    {id: mockIds[0], content: "Choice 1A"},
    {id: mockIds[1], content: "Choice 2"},
    {id: mockIds[2], content: "Choice 3"},
    {id: mockIds[3], content: "Choice 4"},
];

export const fourChoicesWithOneRationale = [
    {
        id: mockIds[0],
        content: "Choice 1",
        rationale: "A",
    },
    {id: "2-2-2-2-2", content: "Choice 2"},
    {id: mockIds[2], content: "Choice 3"},
    {id: mockIds[3], content: "Choice 4"},
];
