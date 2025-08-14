import {mockStrings} from "../../strings";

import {
    addNoneOfAbove,
    choiceTransform,
    enforceOrdering,
    getChoiceLetter,
    maybeRandomize,
} from "./util";

import type {RadioChoiceWithMetadata} from "./radio-component";
import type {PerseusRadioWidgetOptions} from "@khanacademy/perseus-core";

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

describe("addNoneOfAbove", () => {
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

        const rv = addNoneOfAbove(input);

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

        const rv = addNoneOfAbove(input);

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

        const rv = addNoneOfAbove(input);

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

describe("maybeRandomize", () => {
    function generateChoices(): RadioChoiceWithMetadata[] {
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
            {
                content: "Option 4",
                id: "option-4",
                originalIndex: 3,
            },
        ];
    }

    it("doesn't randomize when randomize is false", () => {
        const input = generateChoices();
        const rv = maybeRandomize(input, 0, false);
        expect(rv).toEqual(input);
    });

    it("does randomize when randomize is true", () => {
        const input = generateChoices();
        const rv = maybeRandomize(input, 0, true);
        expect(rv).not.toEqual(input);
    });

    // todo, finish test
    it("randomizes deterministically with the same seed", () => {
        const input = generateChoices();
        const rv1 = maybeRandomize(input, 0, true);
        const rv2 = maybeRandomize(input, 0, true);
        expect(rv1).not.toEqual(input);
        expect(rv1).toEqual(rv2);
    });

    // todo, finish test
    it("randomizes differently with different seeds", () => {
        const input = generateChoices();
        const rv1 = maybeRandomize(input, 0, true);
        const rv2 = maybeRandomize(input, 1, true);
        expect(rv1).not.toEqual(input);
        expect(rv1).not.toEqual(rv2);
    });
});

describe("choiceTransform", () => {
    it("moves none of the above to the end", () => {
        const options: PerseusRadioWidgetOptions = {
            choices: [
                {
                    content: "Choice 1",
                    id: "choice-1",
                    isNoneOfTheAbove: true,
                },
                {
                    content: "Choice 2",
                    id: "choice-2",
                },
            ],
            randomize: false,
        };

        // test the test data
        expect(options.choices[0].isNoneOfTheAbove).toBe(true);
        expect(options.choices[1].isNoneOfTheAbove).toBeUndefined();

        const rv = choiceTransform(options, mockStrings, 0);

        expect(rv[0].isNoneOfTheAbove).toBeUndefined();
        expect(rv[1].isNoneOfTheAbove).toBe(true);
    });

    it("enforces yes/no ordering", () => {
        const options: PerseusRadioWidgetOptions = {
            choices: [
                {
                    content: "No",
                    id: "choice-1",
                },
                {
                    content: "Yes",
                    id: "choice-2",
                },
            ],
            randomize: false,
        };

        // test the test data
        expect(options.choices[0].content).toBe("No");
        expect(options.choices[1].content).toBe("Yes");

        const rv = choiceTransform(options, mockStrings, 0);

        expect(rv[0].content).toBe("Yes");
        expect(rv[1].content).toBe("No");
    });

    it("shuffles", () => {
        const options: PerseusRadioWidgetOptions = {
            choices: [
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
            ],
            randomize: true,
        };

        expect(options.choices[0].id).toBe("choice-1");
        expect(options.choices[1].id).toBe("choice-2");
        expect(options.choices[2].id).toBe("choice-3");
        expect(options.choices[3].id).toBe("choice-4");

        const rv = choiceTransform(options, mockStrings, 0);

        expect(rv[0].id).toBe("choice-4");
        expect(rv[1].id).toBe("choice-2");
        expect(rv[2].id).toBe("choice-1");
        expect(rv[3].id).toBe("choice-3");
    });

    it("populates correct", () => {
        const options: PerseusRadioWidgetOptions = {
            choices: [
                {
                    content: "Choice 1",
                    id: "choice-1",
                    correct: true,
                },
                {
                    content: "Choice 2",
                    id: "choice-2",
                },
            ],
            randomize: false,
        };

        // test the test data
        expect(options.choices[0].correct).toBe(true);
        expect(options.choices[1].correct).toBeUndefined();

        const rv = choiceTransform(options, mockStrings, 0);

        expect(rv[0].correct).toBe(true);
        expect(rv[1].correct).toBe(false);
    });

    it("populates original index", () => {
        const options: PerseusRadioWidgetOptions = {
            choices: [
                {
                    content: "Choice 1",
                    id: "choice-1",
                },
                {
                    content: "Choice 2",
                    id: "choice-2",
                },
            ],
            randomize: false,
        };

        const rv = choiceTransform(options, mockStrings, 0);

        expect(rv[0].originalIndex).toBe(0);
        expect(rv[1].originalIndex).toBe(1);
    });

    it("is deterministic", () => {
        const options: PerseusRadioWidgetOptions = {
            choices: [
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
            ],
            randomize: true,
        };

        const rv1 = choiceTransform(options, mockStrings, 0);
        const rv2 = choiceTransform(options, mockStrings, 0);

        expect(rv1).toEqual(rv2);
    });
});
