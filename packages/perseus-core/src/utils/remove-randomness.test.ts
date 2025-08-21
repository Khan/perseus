import {screen} from "@testing-library/react";

import {renderQuestion} from "../../../perseus/src/widgets/__testutils__/renderQuestion";

import removeRandomness from "./remove-randomness";
import {generateTestPerseusRenderer} from "./test-utils";

function generateTestRadioRenderer() {
    return generateTestPerseusRenderer({
        content: "[[☃ radio 1]]",
        widgets: {
            "radio 1": {
                type: "radio",
                options: {
                    numCorrect: 1,
                    randomize: true, // <= important
                    choices: [
                        {
                            id: "0",
                            content: "Content 1",
                            correct: true,
                        },
                        {
                            id: "1",
                            content: "Content 2",
                            correct: false,
                        },
                        {
                            id: "2",
                            content: "Content 3",
                            correct: false,
                        },
                        {
                            id: "3",
                            content: "Content 4",
                            correct: false,
                        },
                    ],
                },
            },
        },
    });
}

describe(`removeRandomness`, () => {
    it(`converts randomized radio to pre-shuffled radio`, () => {
        // render the question
        const question = generateTestRadioRenderer();
        const radioInputOptions = question.widgets["radio 1"].options;
        const {renderer} = renderQuestion(question);

        // get the list of items post-shuffling
        const listItems = screen.getAllByRole("listitem");
        const serializedState = renderer.getSerializedState();

        // run the PerseusItem / Serialized state through the util
        const output = removeRandomness(question.widgets, serializedState);
        const radioOutputOptions = output["radio 1"].options;

        // make sure shuffling actually happened
        expect(radioOutputOptions.choices.map((c) => c.id)).not.toEqual(
            radioInputOptions.choices.map((c) => c.id),
        );
        // make sure randomization got switched off
        expect(radioOutputOptions.randomize).toBe(false);
        // make sure the output choices are in the same shuffled order
        // as originally rendered
        listItems.forEach((li, i) => {
            expect(
                li.textContent?.includes(radioOutputOptions.choices[i].content),
            ).toBe(true);
        });
    });

    it(`handles bad serialized state`, () => {
        const question = generateTestRadioRenderer();
        const output = removeRandomness(question, null);
        expect(output).toEqual(question);
    });

    it(`returns a copy`, () => {
        const question = generateTestRadioRenderer();
        const output = removeRandomness(question, null);
        expect(output).not.toBe(question);
    });
});
