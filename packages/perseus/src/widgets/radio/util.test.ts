import {mockStrings} from "../../strings";

import {
    moveNoneOfTheAboveToEnd,
    choiceTransform,
    enforceOrdering,
    getChoiceLetter,
    shuffleUserInput,
    unshuffleUserInput,
} from "./util";

import type {RadioChoiceWithMetadata} from "./radio-component";
import type {
    PerseusRadioChoice,
    PerseusRadioUserInput,
} from "@khanacademy/perseus-core";

describe("getChoiceLetter (in English)", () => {
    it("returns the first 5 letters for most questions", () => {
        expect(getChoiceLetter(0, mockStrings)).toEqual("A");
        expect(getChoiceLetter(1, mockStrings)).toEqual("B");
        expect(getChoiceLetter(2, mockStrings)).toEqual("C");
        expect(getChoiceLetter(3, mockStrings)).toEqual("D");
        expect(getChoiceLetter(4, mockStrings)).toEqual("E");
    });

    it("returns Z as the last letter, then spaces afterwards", () => {
        expect(getChoiceLetter(25, mockStrings)).toEqual("Z");
        for (let i = 26; i < 100; i++) {
            expect(getChoiceLetter(i, mockStrings)).toEqual(" ");
        }
    });
});

describe("moveNoneOfTheAboveToEnd", () => {
    function generateTestChoices(): RadioChoiceWithMetadata[] {
        return [
            {
                content: "Option 1",
                id: "option-1",
                originalIndex: 0,
            },
            {
                content: "Option 2",
                id: "option-2",
                originalIndex: 1,
            },
            {
                content: "Option 3",
                id: "option-3",
                originalIndex: 2,
            },
        ];
    }

    it("moves isNoneOfTheAbove to the end", () => {
        const input: RadioChoiceWithMetadata[] = generateTestChoices();
        input[1].isNoneOfTheAbove = true;

        // make sure we don't accidentally break the test
        expect(input[2].isNoneOfTheAbove).toBeUndefined();

        const rv = moveNoneOfTheAboveToEnd(input);

        expect(rv[2]).toEqual({
            content: "Option 2",
            id: "option-2",
            originalIndex: 1,
            isNoneOfTheAbove: true,
        });
    });

    it("keeps isNoneOfTheAbove at the end", () => {
        const input: RadioChoiceWithMetadata[] = generateTestChoices();
        input[2].isNoneOfTheAbove = true;

        // make sure we don't accidentally break the test
        expect(input[2].isNoneOfTheAbove).not.toBeUndefined();

        const rv = moveNoneOfTheAboveToEnd(input);

        expect(rv[2]).toEqual({
            content: "Option 3",
            id: "option-3",
            originalIndex: 2,
            isNoneOfTheAbove: true,
        });
    });

    it("handles choices without isNoneOfTheAbove", () => {
        const input: RadioChoiceWithMetadata[] = generateTestChoices();

        // make sure we don't accidentally break the test
        input.forEach((choice) => {
            expect(choice.isNoneOfTheAbove).toBeUndefined();
        });

        const rv = moveNoneOfTheAboveToEnd(input);

        expect(rv).toEqual(input);
    });
});

describe("enforceOrdering", () => {
    it("maintains true/false order", () => {
        const input: RadioChoiceWithMetadata[] = [
            {
                content: "True",
                id: "option-1",
                originalIndex: 0,
            },
            {
                content: "False",
                id: "option-2",
                originalIndex: 1,
            },
        ];

        // make sure we don't accidentally break the test
        expect(input[0].content).toBe("True");
        expect(input[1].content).toBe("False");

        const rv = enforceOrdering(input, mockStrings);

        expect(rv[0].content).toBe("True");
        expect(rv[1].content).toBe("False");
    });

    it("fixes false/true order", () => {
        const input: RadioChoiceWithMetadata[] = [
            {
                content: "False",
                id: "option-1",
                originalIndex: 0,
            },
            {
                content: "True",
                id: "option-2",
                originalIndex: 1,
            },
        ];

        // make sure we don't accidentally break the test
        expect(input[0].content).toBe("False");
        expect(input[1].content).toBe("True");

        const rv = enforceOrdering(input, mockStrings);

        expect(rv[0].content).toBe("True");
        expect(rv[1].content).toBe("False");
    });

    it("maintains yes/no order", () => {
        const input: RadioChoiceWithMetadata[] = [
            {
                content: "Yes",
                id: "option-1",
                originalIndex: 0,
            },
            {
                content: "No",
                id: "option-2",
                originalIndex: 1,
            },
        ];

        // make sure we don't accidentally break the test
        expect(input[0].content).toBe("Yes");
        expect(input[1].content).toBe("No");

        const rv = enforceOrdering(input, mockStrings);

        expect(rv[0].content).toBe("Yes");
        expect(rv[1].content).toBe("No");
    });

    it("fixes no/yes order", () => {
        const input: RadioChoiceWithMetadata[] = [
            {
                content: "No",
                id: "option-1",
                originalIndex: 0,
            },
            {
                content: "Yes",
                id: "option-2",
                originalIndex: 1,
            },
        ];

        // make sure we don't accidentally break the test
        expect(input[0].content).toBe("No");
        expect(input[1].content).toBe("Yes");

        const rv = enforceOrdering(input, mockStrings);

        expect(rv[0].content).toBe("Yes");
        expect(rv[1].content).toBe("No");
    });

    it("doesn't affect unordered strings", () => {
        const input: RadioChoiceWithMetadata[] = [
            {
                content: "Hello",
                id: "option-1",
                originalIndex: 0,
            },
            {
                content: "World",
                id: "option-2",
                originalIndex: 1,
            },
        ];

        // make sure we don't accidentally break the test
        expect(input[0].content).toBe("Hello");
        expect(input[1].content).toBe("World");

        const rv = enforceOrdering(input, mockStrings);

        expect(rv[0].content).toBe("Hello");
        expect(rv[1].content).toBe("World");
    });
});

describe("choiceTransform", () => {
    it("moves none of the above to the end", () => {
        const choices: PerseusRadioChoice[] = [
            {
                content: "Choice 1",
                id: "choice-1",
                isNoneOfTheAbove: true,
            },
            {
                content: "Choice 2",
                id: "choice-2",
            },
        ];

        // test the test data
        expect(choices[0].isNoneOfTheAbove).toBe(true);
        expect(choices[1].isNoneOfTheAbove).toBeUndefined();

        const rv = choiceTransform(choices, false, mockStrings, 0);

        expect(rv[0].isNoneOfTheAbove).toBeUndefined();
        expect(rv[1].isNoneOfTheAbove).toBe(true);
    });

    it("enforces yes/no ordering", () => {
        const choices: PerseusRadioChoice[] = [
            {
                content: "No",
                id: "choice-1",
            },
            {
                content: "Yes",
                id: "choice-2",
            },
        ];

        // test the test data
        expect(choices[0].content).toBe("No");
        expect(choices[1].content).toBe("Yes");

        const rv = choiceTransform(choices, false, mockStrings, 0);

        expect(rv[0].content).toBe("Yes");
        expect(rv[1].content).toBe("No");
    });

    it("shuffles", () => {
        const choices: PerseusRadioChoice[] = [
            {
                content: "Choice 1",
                id: "choice-1",
                correct: true,
            },
            {
                content: "Choice 2",
                id: "choice-2",
            },
            {
                content: "Choice 3",
                id: "choice-3",
            },
            {
                content: "Choice 4",
                id: "choice-4",
            },
        ];

        expect(choices[0].id).toBe("choice-1");
        expect(choices[1].id).toBe("choice-2");
        expect(choices[2].id).toBe("choice-3");
        expect(choices[3].id).toBe("choice-4");

        const rv = choiceTransform(choices, true, mockStrings, 0);

        expect(rv[0].id).toBe("choice-4");
        expect(rv[1].id).toBe("choice-2");
        expect(rv[2].id).toBe("choice-1");
        expect(rv[3].id).toBe("choice-3");
    });

    it("populates correct", () => {
        const choices: PerseusRadioChoice[] = [
            {
                content: "Choice 1",
                id: "choice-1",
                correct: true,
            },
            {
                content: "Choice 2",
                id: "choice-2",
            },
        ];

        // test the test data
        expect(choices[0].correct).toBe(true);
        expect(choices[1].correct).toBeUndefined();

        const rv = choiceTransform(choices, false, mockStrings, 0);

        expect(rv[0].correct).toBe(true);
        expect(rv[1].correct).toBe(false);
    });

    it("populates original index", () => {
        const choices: PerseusRadioChoice[] = [
            {
                content: "Choice 1",
                id: "choice-1",
            },
            {
                content: "Choice 2",
                id: "choice-2",
            },
        ];

        const rv = choiceTransform(choices, false, mockStrings, 0);

        expect(rv[0].originalIndex).toBe(0);
        expect(rv[1].originalIndex).toBe(1);
    });

    it("is deterministic", () => {
        const choices: PerseusRadioChoice[] = [
            {
                content: "Choice 1",
                id: "choice-1",
                correct: true,
            },
            {
                content: "Choice 2",
                id: "choice-2",
            },
            {
                content: "Choice 3",
                id: "choice-3",
            },
            {
                content: "Choice 4",
                id: "choice-4",
            },
        ];

        const rv1 = choiceTransform(choices, true, mockStrings, 0);
        const rv2 = choiceTransform(choices, true, mockStrings, 0);

        expect(choices).not.toEqual(rv1);
        expect(choices).not.toEqual(rv2);
        expect(rv1).toEqual(rv2);
    });

    it("randomizes differently with different seeds", () => {
        const choices: PerseusRadioChoice[] = [
            {
                content: "Choice 1",
                id: "choice-1",
                correct: true,
            },
            {
                content: "Choice 2",
                id: "choice-2",
            },
            {
                content: "Choice 3",
                id: "choice-3",
            },
            {
                content: "Choice 4",
                id: "choice-4",
            },
        ];

        const rv1 = choiceTransform(choices, true, mockStrings, 0);
        const rv2 = choiceTransform(choices, true, mockStrings, 1);

        expect(rv1).not.toEqual(choices);
        expect(rv2).not.toEqual(choices);
        expect(rv1).not.toEqual(rv2);
    });
});

describe("shuffleUserInput", () => {
    it("shuffles user input", () => {
        const choices: RadioChoiceWithMetadata[] = [
            {
                id: "3-3-3-3-3",
                content: "Incorrect Choice 3",
                correct: false,
                originalIndex: 3,
            },
            {
                id: "1-1-1-1-1",
                content: "Incorrect Choice 2",
                correct: false,
                originalIndex: 1,
            },
            {
                id: "0-0-0-0-0",
                content: "Incorrect Choice 1",
                correct: false,
                originalIndex: 0,
            },
            {
                id: "2-2-2-2-2",
                content: "Correct Choice",
                correct: true,
                originalIndex: 2,
            },
        ];

        const unshuffledUserInput: PerseusRadioUserInput = {
            choicesSelected: [true, false, false, false],
        };

        expect(shuffleUserInput(choices, unshuffledUserInput)).toEqual({
            choicesSelected: [false, false, true, false],
        });
    });
});

describe("unshuffleUserInput", () => {
    it("unshuffles user input", () => {
        const choices: RadioChoiceWithMetadata[] = [
            {
                id: "3-3-3-3-3",
                content: "Incorrect Choice 3",
                correct: false,
                originalIndex: 3,
            },
            {
                id: "1-1-1-1-1",
                content: "Incorrect Choice 2",
                correct: false,
                originalIndex: 1,
            },
            {
                id: "0-0-0-0-0",
                content: "Incorrect Choice 1",
                correct: false,
                originalIndex: 0,
            },
            {
                id: "2-2-2-2-2",
                content: "Correct Choice",
                correct: true,
                originalIndex: 2,
            },
        ];

        const unshuffledUserInput: PerseusRadioUserInput = {
            choicesSelected: [false, false, true, false],
        };

        expect(unshuffleUserInput(choices, unshuffledUserInput)).toEqual({
            choicesSelected: [true, false, false, false],
        });
    });
});
