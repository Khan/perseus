import scoreGroup from "./score-group";

import type {PerseusGroupRubric} from "@khanacademy/perseus-core";

describe("scoreGroup", () => {
    it("returns a score of 'invalid' when the user input is undefined", () => {
        // Arrange:
        const userInput = undefined;
        const rubric: PerseusGroupRubric = {
            content: "",
            images: {},
            widgets: {
                "radio 1": {
                    type: "radio",
                    options: {
                        choices: [{content: "A", correct: true}],
                    },
                },
            },
        };

        // Act:
        const result = scoreGroup(userInput, rubric, "en");

        // Assert:
        expect(result).toHaveInvalidInput();
    });
});
