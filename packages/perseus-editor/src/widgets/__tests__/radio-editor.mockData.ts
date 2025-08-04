export const mockIds = [
    "a1b2c3d4-e5f6-4789-a012-345678901234",
    "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "3e4d5c6b-7a89-4012-b345-6789cdef0123",
    "9c8b7a65-4321-4fed-9876-543210fedcba",
];

export const singleChoice = {
    id: "a1b2c3d4-e5f6-4789-a012-345678901234",
    content: "Choice 1",
};
export const singleChoiceWithCorrect = {...singleChoice, correct: true};

const threeChoices = [
    {id: "a1b2c3d4-e5f6-4789-a012-345678901234", content: "Choice 1"},
    {id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", content: "Choice 2"},
    {id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", content: "Choice 3"},
];

export const threeChoicesWithCorrect = [
    {id: "a1b2c3d4-e5f6-4789-a012-345678901234", content: "Choice 1"},
    {
        id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        content: "Choice 2",
        correct: true,
    },
    {id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", content: "Choice 3"},
];

export const threeChoicesWithCorrectandNota = [
    {
        id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        content: "Choice 2",
        correct: true,
    },
    {id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", content: "Choice 3"},
    {id: mockIds[4], content: "None of the above", isNoneOfTheAbove: true},
];

export const fourChoices = [
    ...threeChoices,
    {id: "3e4d5c6b-7a89-4012-b345-6789cdef0123", content: "Choice 4"},
];

export const fourChoicesWithAllIncorrect = [
    {
        id: "a1b2c3d4-e5f6-4789-a012-345678901234",
        content: "Choice 1",
        correct: false,
    },
    {
        id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        content: "Choice 2",
        correct: false,
    },
    {
        id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        content: "Choice 3",
        correct: false,
    },
    {
        id: "3e4d5c6b-7a89-4012-b345-6789cdef0123",
        content: "Choice 4",
        correct: false,
    },
];

export const fourChoicesWithFirstCorrect = [
    {
        id: "a1b2c3d4-e5f6-4789-a012-345678901234",
        content: "Choice 1",
        correct: true,
    },
    {
        id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        content: "Choice 2",
        correct: false,
    },
    {
        id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        content: "Choice 3",
        correct: false,
    },
    {
        id: "3e4d5c6b-7a89-4012-b345-6789cdef0123",
        content: "Choice 4",
        correct: false,
    },
];

export const fourChoicesWithSecondCorrect = [
    {
        id: "a1b2c3d4-e5f6-4789-a012-345678901234",
        content: "Choice 1",
        correct: false,
    },
    {
        id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        content: "Choice 2",
        correct: true,
    },
    {
        id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        content: "Choice 3",
        correct: false,
    },
    {
        id: "3e4d5c6b-7a89-4012-b345-6789cdef0123",
        content: "Choice 4",
        correct: false,
    },
];

export const fourChoicesWithTwoCorrect = [
    {
        id: "a1b2c3d4-e5f6-4789-a012-345678901234",
        content: "Choice 1",
        correct: true,
    },
    {
        id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        content: "Choice 2",
        correct: true,
    },
    {
        id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        content: "Choice 3",
        correct: false,
    },
    {
        id: "3e4d5c6b-7a89-4012-b345-6789cdef0123",
        content: "Choice 4",
        correct: false,
    },
];

export const fourChoicesWithNotaAndCorrect = [
    ...threeChoicesWithCorrect,
    {id: mockIds[4], content: "None of the above", isNoneOfTheAbove: true},
];

export const fourChoicesWithOneChoice1A = [
    {id: "a1b2c3d4-e5f6-4789-a012-345678901234", content: "Choice 1A"},
    {id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", content: "Choice 2"},
    {id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", content: "Choice 3"},
    {id: "3e4d5c6b-7a89-4012-b345-6789cdef0123", content: "Choice 4"},
];

export const fourChoicesWithOneRationale = [
    {
        id: "a1b2c3d4-e5f6-4789-a012-345678901234",
        content: "Choice 1",
        rationale: "A",
    },
    {id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", content: "Choice 2"},
    {id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", content: "Choice 3"},
    {id: "3e4d5c6b-7a89-4012-b345-6789cdef0123", content: "Choice 4"},
];

// id: "a1b2c3d4-e5f6-4789-a012-345678901234",
// id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
// id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
// id: "3e4d5c6b-7a89-4012-b345-6789cdef0123",
// id: "9c8b7a65-4321-4fed-9876-543210fedcba"
