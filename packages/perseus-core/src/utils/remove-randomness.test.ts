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
        const question = generateTestRadioRenderer();
        const {renderer} = renderQuestion(question);

        const listItems = screen.getAllByRole("listitem");

        const serializedState = renderer.getSerializedState();
        const output = removeRandomness(question, serializedState);

        expect(output.widgets["radio 1"].options.randomize).toBe(false);
        listItems.forEach((li, i) => {
            expect(
                li.textContent?.includes(
                    output.widgets["radio 1"].options.choices[i].content,
                ),
            ).toBe(true);
        });
    });
});
