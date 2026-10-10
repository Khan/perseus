import {generateTestPerseusRenderer} from "@khanacademy/perseus-core";
import {screen} from "@testing-library/react";

import * as Dependencies from "../../dependencies";
import {testDependencies} from "../../testing/test-dependencies";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {PerseusWidgetsMap} from "@khanacademy/perseus-core";

// A removed widget type and one Perseus has never known. Neither has a
// registered widget, so both render and score the same way. The cast is needed
// because PerseusWidgetsMap can't name a type Perseus has never known.
// eslint-disable-next-line no-restricted-syntax
const widgets = {
    "transformer 1": {type: "transformer", options: {}},
    "never-a-widget 1": {type: "never-a-widget", options: {}},
} as unknown as PerseusWidgetsMap;

const question = generateTestPerseusRenderer({
    content: "[[☃ transformer 1]] [[☃ never-a-widget 1]]",
    widgets,
});

describe("UnsupportedWidget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("renders in place of each widget that isn't registered", () => {
        // Arrange, Act
        renderQuestion(question);

        // Assert
        expect(
            screen.getAllByText(
                /this part of the question is no longer available/,
            ),
        ).toHaveLength(2);
    });

    it("doesn't count unregistered widgets towards the score", () => {
        // Arrange
        const {renderer} = renderQuestion(question);

        // Act
        const score = scorePerseusItemTesting(
            question,
            renderer.getUserInputMap(),
        );

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly({shouldHavePoints: false});
    });
});
