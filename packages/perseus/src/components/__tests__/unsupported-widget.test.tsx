import {Errors, generateTestPerseusRenderer} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";
import UnsupportedWidgetMessage from "../unsupported-widget-message";

import type {PerseusWidgetsMap} from "@khanacademy/perseus-core";

const question = generateTestPerseusRenderer({
    content: "[[☃ transformer 1]] [[☃ never-a-widget 1]]",
    // eslint-disable-next-line no-restricted-syntax
    widgets: {
        "transformer 1": {type: "transformer", options: {}},
        "never-a-widget 1": {type: "never-a-widget", options: {}},
    } as unknown as PerseusWidgetsMap,
});

describe("UnsupportedWidgetMessage", () => {
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

    it("logs the widget's type, ID and reason", () => {
        // Arrange
        const logErrorSpy = jest.spyOn(testDependencies.Log, "error");
        const widget = (
            <UnsupportedWidgetMessage
                type="transformer"
                widgetId="transformer 1"
            />
        );

        // Act
        render(widget);

        // Assert
        expect(logErrorSpy).toHaveBeenCalledWith(
            "Unsupported widget rendered",
            Errors.NotAllowed,
            {
                loggedMetadata: {
                    type: "transformer",
                    widgetId: "transformer 1",
                    reason: "widget-not-registered",
                },
            },
        );
    });

    it("does not log more than once per component instance", () => {
        // Arrange
        const logErrorSpy = jest.spyOn(testDependencies.Log, "error");
        const widget = (
            <UnsupportedWidgetMessage
                type="transformer"
                widgetId="transformer 1"
            />
        );

        const {rerender} = render(widget);

        // Act
        rerender(widget);

        // Assert
        expect(logErrorSpy).toHaveBeenCalledTimes(1);
    });
});
