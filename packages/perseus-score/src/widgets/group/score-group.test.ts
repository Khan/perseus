import {generateGroupOptions} from "@khanacademy/perseus-core";

import {getTestDropdownWidget} from "../../util/widgets.testutils";

import scoreGroup from "./score-group";

import type {PerseusGroupWidgetOptions} from "@khanacademy/perseus-core";

describe("scoreGroup", () => {
    it("returns a score of 'invalid' when the user input is undefined", () => {
        // Arrange:
        const userInput = undefined;
        const rubric: PerseusGroupWidgetOptions = {
            content: "",
            images: {},
            widgets: {
                "radio 1": {
                    type: "radio",
                    options: {
                        choices: [
                            {
                                id: "0-0-0-0-0",
                                content: "A",
                                correct: true,
                            },
                        ],
                    },
                },
            },
        };

        // Act:
        const result = scoreGroup(userInput, rubric, "en");

        // Assert:
        expect(result).toHaveInvalidInput();
    });

    describe("a widget that isn't in the content", () => {
        it("isn't required to be answered", () => {
            // Arrange: "dropdown 2" is in the options but not the content, so
            // the learner never sees it and can't answer it.
            const rubric = generateGroupOptions({
                content: "[[☃ dropdown 1]]",
                widgets: {
                    "dropdown 1": getTestDropdownWidget(),
                    "dropdown 2": getTestDropdownWidget(),
                },
            });

            // Act:
            const result = scoreGroup({"dropdown 1": {value: 1}}, rubric, "en");

            // Assert:
            expect(result).toHaveBeenAnsweredCorrectly();
        });

        it("doesn't add to the score", () => {
            // Arrange:
            const rubric = generateGroupOptions({
                content: "[[☃ dropdown 1]]",
                widgets: {
                    "dropdown 1": getTestDropdownWidget(),
                    "dropdown 2": getTestDropdownWidget(),
                },
            });

            // Act:
            const result = scoreGroup(
                {"dropdown 1": {value: 1}, "dropdown 2": {value: 1}},
                rubric,
                "en",
            );

            // Assert:
            expect(result).toEqual({
                type: "points",
                earned: 1,
                total: 1,
                message: null,
            });
        });
    });
});
