import {generateGroupOptions} from "@khanacademy/perseus-core";

import {scoreWidgetsFunctional} from "../../score";
import {getTestDropdownWidget} from "../../util/widgets.testutils";

import scoreGroup from "./score-group";

import type {
    PerseusGroupWidgetOptions,
    ScorerContext,
} from "@khanacademy/perseus-core";

const context: ScorerContext = {scoreWidgets: scoreWidgetsFunctional};

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
        const result = scoreGroup(userInput, rubric, "en", context);

        // Assert:
        expect(result).toHaveInvalidInput();
    });

    describe("a widget that isn't in the content", () => {
        it("isn't required to be answered", () => {
            // Arrange
            const rubric = generateGroupOptions({
                content: "[[☃ dropdown 1]]",
                widgets: {
                    "dropdown 1": getTestDropdownWidget(),
                    "dropdown 2": getTestDropdownWidget(),
                },
            });

            // Act
            const result = scoreGroup(
                {"dropdown 1": {value: 1}},
                rubric,
                "en",
                context,
            );

            // Assert
            expect(result).toHaveBeenAnsweredCorrectly();
        });

        it("doesn't add to the score", () => {
            // Arrange
            const rubric = generateGroupOptions({
                content: "[[☃ dropdown 1]]",
                widgets: {
                    "dropdown 1": getTestDropdownWidget(),
                    "dropdown 2": getTestDropdownWidget(),
                },
            });

            // Act
            const result = scoreGroup(
                {"dropdown 1": {value: 1}, "dropdown 2": {value: 1}},
                rubric,
                "en",
                context,
            );

            // Assert
            expect(result).toEqual({
                type: "points",
                earned: 1,
                total: 1,
                message: null,
            });
        });
    });
});
