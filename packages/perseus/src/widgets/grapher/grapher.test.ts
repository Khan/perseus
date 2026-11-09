import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {renderQuestion} from "../../__testutils__/render-question";
import {waitForInitialGraphieRender} from "../../testing/wait";

import {
    linearQuestion,
    multipleAvailableTypesQuestion,
    quadraticQuestion,
} from "./grapher.testdata";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

describe("grapher widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        // Mocked for loading graphie in svg-image
        // eslint-disable-next-line no-restricted-syntax
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => "",
                ok: true,
            }),
        ) as jest.Mock;
    });

    it("should snapshot linear graph question", async () => {
        // Arrange and Act
        const {container} = renderQuestion(linearQuestion);
        // A grapher with a single available type renders using the
        // Interactive Graph components, which wrap the graph in an ARIA
        // `figure`.
        expect(await screen.findByRole("figure")).toBeInTheDocument();

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    it("should snapshot question with multiple graph types", async () => {
        // Arrange and Act
        const {container} = renderQuestion(multipleAvailableTypesQuestion);
        await waitForInitialGraphieRender();

        // Assert
        // Note: the curve's stroke resolves to "" in jsdom because
        // tokenValue() reads CSS custom properties, which jsdom doesn't
        // define. Raphael then renders "" as stroke="none" in the DOM
        // (visible in the snapshot). The correct hex resolves in a real
        // browser (Chromatic).
        expect(container).toMatchSnapshot("initial render");
    });

    it("does not log an error when the selected type button is clicked again", async () => {
        // Arrange
        const consoleErrorSpy = jest
            .spyOn(console, "error")
            .mockImplementation(() => {});
        renderQuestion(multipleAvailableTypesQuestion);
        await waitForInitialGraphieRender();

        const linearButton = screen.getByRole("button", {name: "Linear"});
        await userEvent.click(linearButton);

        // Act
        await userEvent.click(linearButton);

        // Assert
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    describe("legacy grapher", () => {
        function getMovablePointTargets(container: HTMLElement) {
            // Graphie's mouse targets are bare SVG elements with no
            // accessible role, so Testing Library queries can't find them.
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            return container.querySelectorAll(
                "[data-interactive-kind-for-testing='movable-point']",
            );
        }

        it("renders draggable points when interactive", async () => {
            // Arrange, Act
            // Quadratic graphers can't be converted to Interactive Graph, so
            // they always render with the legacy grapher.
            const {container} = renderQuestion(quadraticQuestion);
            await waitForInitialGraphieRender();

            // Assert
            expect(getMovablePointTargets(container).length).toBeGreaterThan(0);
        });

        describe.each([
            {name: "static", isStatic: true, readOnly: false},
            {name: "read-only", isStatic: false, readOnly: true},
        ])("when $name", ({isStatic, readOnly}) => {
            function withStatic(question: PerseusRenderer): PerseusRenderer {
                return {
                    ...question,
                    widgets: {
                        "grapher 1": {
                            ...question.widgets["grapher 1"],
                            static: isStatic,
                        },
                    },
                };
            }

            it("does not render draggable points", async () => {
                // Arrange, Act
                const {container} = renderQuestion(
                    withStatic(quadraticQuestion),
                    {apiOptions: {readOnly}},
                );
                await waitForInitialGraphieRender();

                // Assert
                expect(getMovablePointTargets(container)).toHaveLength(0);
            });
        });
    });

    it("should send analytics event when widget is rendered", () => {
        // Arrange
        const onAnalyticsEventSpy = jest.fn();
        const dependencies = {
            analytics: {onAnalyticsEvent: onAnalyticsEventSpy},
        };

        // Act
        renderQuestion(linearQuestion, {dependencies});
        // Assert
        expect(onAnalyticsEventSpy).toHaveBeenCalledWith({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "grapher",
                widgetId: "grapher 1",
            },
        });
    });
});
