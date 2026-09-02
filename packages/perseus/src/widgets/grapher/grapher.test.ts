import {screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import * as Dependencies from "../../dependencies";
import {
    testDependencies,
    testDependenciesV2,
} from "../../testing/test-dependencies";
import {waitForInitialGraphieRender} from "../../testing/wait";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {
    linearQuestion,
    multipleAvailableTypesQuestion,
} from "./grapher.testdata";

import type {Coord} from "../../interactive2/types";
import type {PerseusDependenciesV2} from "../../types";

describe("grapher widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

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

    it("preserves the user's plot when the selected type button is clicked again", async () => {
        // Arrange - a user who has already answered by moving the plot
        const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        const movedCoords: [Coord, Coord] = [
            [-3, 2],
            [4, 7],
        ];
        const {renderer} = renderQuestion(
            multipleAvailableTypesQuestion,
            undefined,
            undefined,
            {"grapher 1": {type: "linear", coords: movedCoords}},
        );
        await waitForInitialGraphieRender();

        // Act
        await user.click(screen.getByRole("button", {name: "Linear"}));

        // Assert
        expect(renderer.getUserInputMap()).toMatchObject({
            "grapher 1": {type: "linear", coords: movedCoords},
        });
    });

    it("does not log an error when the selected type button is clicked again", async () => {
        // Arrange
        const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        const consoleErrorSpy = jest
            .spyOn(console, "error")
            .mockImplementation(() => {});
        renderQuestion(multipleAvailableTypesQuestion);
        await waitForInitialGraphieRender();

        const linearButton = screen.getByRole("button", {name: "Linear"});
        await user.click(linearButton);

        // Act
        await user.click(linearButton);

        // Assert
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it("should send analytics event when widget is rendered", () => {
        // Arrange
        const onAnalyticsEventSpy = jest.fn();
        const depsV2: PerseusDependenciesV2 = {
            ...testDependenciesV2,
            analytics: {onAnalyticsEvent: onAnalyticsEventSpy},
        };

        // Act
        renderQuestion(linearQuestion, undefined, undefined, undefined, depsV2);
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
