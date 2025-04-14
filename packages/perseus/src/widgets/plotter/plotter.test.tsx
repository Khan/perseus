import {splitPerseusItem} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";
import {render, screen, waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {ApiOptions} from "../../perseus-api";
import {registerAllWidgetsForTesting} from "../../util/register-all-widgets-for-testing";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {Plotter} from "./plotter";

import type {
    PerseusPlotterWidgetOptions,
    PerseusRenderer,
    PerseusWidgetTypes,
    WidgetOptions,
} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

export function getAnswerfulItem<T extends keyof PerseusWidgetTypes>(
    widgetType: T,
    options: PerseusWidgetTypes[T]["options"],
): PerseusRenderer {
    const widgetName = `${widgetType} 1`;
    const widget: WidgetOptions<T, PerseusWidgetTypes[T]["options"]> = {
        type: widgetType,
        options,
    };
    const widgets = {};
    widgets[widgetName] = widget;
    return {
        content: `[[☃ ${widgetName}]]`,
        images: {},
        widgets,
    };
}

export function getAnswerlessItem<T extends keyof PerseusWidgetTypes>(
    widgetType: T,
    options: PerseusWidgetTypes[T]["options"],
): PerseusRenderer {
    return splitPerseusItem(getAnswerfulItem(widgetType, options));
}

describe("plotter widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should show drag text when not static", async () => {
        // Arrange and Act
        render(
            // @ts-expect-error - TS2769 - test works, but I can't figure out how to make the types happy
            <Plotter
                static={false}
                trackInteraction={() => {}}
                onChange={() => {}}
                apiOptions={{
                    ...ApiOptions.defaults,
                    isMobile: true,
                }}
                starting={[0]}
            />,
        );

        // Assert
        expect(
            await screen.findByText("Drag handles to make graph"),
        ).toBeInTheDocument();
    });

    it("should not show drag text when static", async () => {
        // Arrange and Act
        render(
            // @ts-expect-error - TS2769 - test works, but I can't figure out how to make the types happy
            <Plotter
                static={true}
                trackInteraction={() => {}}
                onChange={() => {}}
                apiOptions={{
                    ...ApiOptions.defaults,
                    isMobile: true,
                }}
                starting={[0]}
            />,
        );

        // Assert
        await waitFor(() => {
            expect(
                screen.queryByText("Drag handles to make graph"),
            ).not.toBeInTheDocument();
        });
    });

    describe("interactive: full vs answerless", () => {
        beforeAll(() => {
            registerAllWidgetsForTesting();
        });

        const plotterOptions: PerseusPlotterWidgetOptions = {
            categories: ["$1^{\\text{st}} \\text{}$"],
            picBoxHeight: 300,
            picSize: 300,
            picUrl: "",
            plotDimensions: [380, 300],
            correct: [15],
            labelInterval: 1,
            labels: ["School grade", "Number of absent students"],
            maxY: 30,
            scaleY: 5,
            snapsPerLine: 1,
            starting: [0],
            type: "bar",
        };

        test("the answerless test data doesn't contain answers", () => {
            expect(
                getAnswerlessItem("plotter", plotterOptions).widgets[
                    "plotter 1"
                ].options.correct,
            ).toBeUndefined();
        });

        test.each([
            ["answerless", getAnswerlessItem("plotter", plotterOptions)],
            ["answerful", getAnswerfulItem("plotter", plotterOptions)],
        ])("is interactive with widget options: %p", async (_, item) => {
            // Arrange / Act
            const {renderer} = renderQuestion(item);

            const draggableElement = screen.getByText((_, element) => {
                return (
                    element?.getAttribute(
                        "data-interactive-kind-for-testing",
                    ) === "movable-line"
                );
            });

            // Get element's position
            const rect = draggableElement.getBoundingClientRect();
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;

            // Calculate the target Y position based on the plotter's scale
            // The plotter has a scaleY of 5 and maxY of 30, so we'll drag to 15
            // which is the correct answer according to plotterOptions
            const targetY = startY - (15 / plotterOptions.scaleY) * rect.height;

            // Simulate mouse down, move to target position, and release
            await userEvent.pointer([
                {
                    keys: "[MouseLeft>]",
                    target: draggableElement,
                    coords: {clientX: startX, clientY: startY},
                },
                {coords: {clientX: startX, clientY: targetY}},
                {keys: "[/MouseLeft]"},
            ]);

            const userInput = renderer.getUserInputMap();
            const score = scorePerseusItem(
                getAnswerfulItem("plotter", plotterOptions),
                userInput,
                "en",
            );

            // Assert
            expect(score).toHaveBeenAnsweredCorrectly();
        });
    });
});
