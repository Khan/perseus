import {act, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {
    article1,
    groupSetRadioRationaleQuestion,
} from "./graded-group-set.testdata";

import type {PerseusDependenciesV2} from "../../types";
import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

describe("graded group set widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        // Mocked for loading graphie in svg-image
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => "",
                ok: true,
            }),
        ) as jest.Mock;
    });

    it("should snapshot", () => {
        // Arrange and Act
        const {container} = renderQuestion(article1);

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("should send analytics event when widget is rendered", () => {
        // Arrange
        const onAnalyticsEventSpy = jest.fn();
        const depsV2: PerseusDependenciesV2 = {
            ...testDependenciesV2,
            analytics: {onAnalyticsEvent: onAnalyticsEventSpy},
        };

        // Act
        renderQuestion(article1, undefined, undefined, undefined, depsV2);

        // Assert
        expect(onAnalyticsEventSpy).toHaveBeenCalledWith({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "graded-group-set",
                widgetId: "graded-group-set 1",
            },
        });
    });

    it("should render error message when no current group", () => {
        // Arrange
        const articleWithNoGradedGroups: PerseusRenderer = {
            ...article1,
            widgets: {
                "graded-group-set 1": {
                    ...article1.widgets["graded-group-set 1"],
                    type: "graded-group-set",
                    options: {
                        gradedGroups: [],
                    },
                },
            },
        };

        // Act
        renderQuestion(articleWithNoGradedGroups);

        // Assert
        expect(screen.getByText("No current group...")).toBeVisible();
    });

    it("should show 'Next question' button when answered correctly", async () => {
        // Arrange
        renderQuestion(article1);

        // Act
        // Answer first question correctly
        await userEvent.type(screen.getByRole("textbox"), "0.9");
        await userEvent.click(screen.getByRole("button", {name: "Check"}));

        // Assert
        expect(
            screen.getByRole("button", {name: "Next question"}),
        ).toBeVisible();
    });

    it("should not show 'Next question' button when answered incorrectly", async () => {
        // Arrange
        renderQuestion(article1);

        // Act
        // Answer first question IN-correctly
        await userEvent.type(screen.getByRole("textbox"), "0.000000000001");
        await userEvent.click(screen.getByRole("button", {name: "Check"}));

        // Assert
        expect(screen.getByRole("alert")).toHaveTextContent("Incorrect");
        expect(
            screen.queryByRole("button", {name: "Next question"}),
        ).toBeNull();
    });

    it("should be able to advance to next group", async () => {
        // Arrange
        renderQuestion(article1);
        // Answer first question correctly
        await userEvent.type(screen.getByRole("textbox"), "0.9");
        await userEvent.click(screen.getByRole("button", {name: "Check"}));

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Next question"}),
        );

        // Assert
        expect(screen.getByText("Problem 1b")).toBeVisible();
    });

    it("should not allow advancing past the last group", async () => {
        // Arrange
        renderQuestion(article1);

        await userEvent.type(screen.getByRole("textbox"), "0.9");
        await userEvent.click(screen.getByRole("button", {name: "Check"}));
        await userEvent.click(
            screen.getByRole("button", {name: "Next question"}),
        );

        await userEvent.type(screen.getByRole("textbox"), "1");
        await userEvent.click(screen.getByRole("button", {name: "Check"}));
        await userEvent.click(
            screen.getByRole("button", {name: "Next question"}),
        );

        await userEvent.type(screen.getByRole("textbox"), "1.2");

        // Act
        await userEvent.click(screen.getByRole("button", {name: "Check"}));

        // Assert
        expect(screen.getByRole("alert")).toHaveTextContent("Correct");
        expect(
            screen.queryByRole("button", {name: "Next question"}),
        ).not.toBeInTheDocument();
    });

    describe("should be able to jump to an arbitrary question using Indicators", () => {
        it("by click", async () => {
            // Arrange
            renderQuestion(article1);

            // Act
            await userEvent.click(
                screen.getByRole("button", {name: "Skip to Problem 1c"}),
            );

            // Assert
            expect(screen.getByText("Problem 1c")).toBeVisible();
        });

        it("by key", async () => {
            // Arrange
            renderQuestion(article1);

            // Act
            await userEvent.tab(); // 1a
            await userEvent.tab(); // 1b
            await userEvent.keyboard(" ");

            // Assert
            expect(screen.getByText("Problem 1b")).toBeVisible();

            await userEvent.tab(); // 1c
            await userEvent.keyboard("[Enter]");

            expect(screen.getByText("Problem 1c")).toBeVisible();
        });
    });

    it("should return input paths", async () => {
        // Arrange
        const {renderer} = renderQuestion(article1);

        // Act
        const inputPaths = renderer.getInputPaths();

        // Assert
        expect(inputPaths).toMatchInlineSnapshot(`
            [
              [
                "graded-group-set 1",
                "numeric-input 1",
              ],
            ]
        `);
    });

    it("should be able to focus the widgets", () => {
        // Arrange
        const {renderer} = renderQuestion(article1);

        // Act
        // The first "focusable" widget receives focus...
        act(() => renderer.focus());

        // Assert
        expect(screen.getByRole("textbox")).toHaveFocus();
    });

    it("should be able to focus a specific input path", () => {
        // Arrange
        const {renderer} = renderQuestion(article1);

        // Act
        act(() =>
            renderer.focusPath(["graded-group-set 1", "numeric-input 1"]),
        );

        // Assert
        expect(screen.getByRole("textbox")).toHaveFocus();
    });

    it("should be able to blur a specific input path", async () => {
        // Arrange
        const {renderer} = renderQuestion(article1);
        await userEvent.click(screen.getByRole("textbox"));

        // Act
        act(() => renderer.blurPath(["graded-group-set 1", "numeric-input 1"]));

        // Assert
        expect(screen.getByRole("textbox")).not.toHaveFocus();
    });

    it("should be able to Explain (via mouse)", async () => {
        // Arrange
        renderQuestion(article1);

        // Act
        await userEvent.click(screen.getByRole("button", {name: "Explain"}));

        // Assert
        expect(
            screen.getByRole("button", {name: "Hide explanation"}),
        ).toBeVisible();
        expect(
            screen.getByText(/There are many ways to solve this problem/),
        ).toBeVisible();
    });

    it("should be able to Explain (via keyboard)", async () => {
        // Arrange
        renderQuestion(article1);

        // Act
        const explainButton = screen.getByRole("button", {
            name: "Explain",
        });
        explainButton.focus();
        await userEvent.type(explainButton, "{enter}");

        // Assert
        expect(
            screen.getByRole("button", {name: "Hide explanation"}),
        ).toBeVisible();
        expect(
            screen.getByText(/There are many ways to solve this problem/),
        ).toBeVisible();
    });

    it("should be able to hide explanation (via mouse)", async () => {
        // Arrange
        renderQuestion(article1);
        await userEvent.click(screen.getByRole("button", {name: "Explain"}));

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Hide explanation"}),
        );

        // Assert
        expect(screen.getByRole("button", {name: "Explain"})).toBeVisible();
        expect(
            screen.queryByRole("button", {name: "Hide explanation"}),
        ).not.toBeInTheDocument();
    });

    it("should be able to hide explanation (via keyboard)", async () => {
        // Arrange
        renderQuestion(article1);
        await userEvent.click(screen.getByRole("button", {name: "Explain"}));

        // Act
        const hideExplanationButton = screen.getByRole("button", {
            name: "Hide explanation",
        });
        hideExplanationButton.focus();
        await userEvent.type(hideExplanationButton, "{enter}");

        // Assert
        expect(screen.getByRole("button", {name: "Explain"})).toBeVisible();
        expect(
            screen.queryByRole("button", {name: "Hide explanation"}),
        ).not.toBeInTheDocument();
    });

    it("should show rationales when answer is correct", async () => {
        // Arrange
        renderQuestion(groupSetRadioRationaleQuestion);

        // Select the correct answer: "$8$" (index 2)
        await userEvent.click(screen.getAllByRole("radio")[2]);

        // Act
        await userEvent.click(screen.getByRole("button", {name: "Check"}));

        // Assert
        expect(screen.getByRole("alert", {name: "Correct"})).toBeVisible();
        // Verify the rationale for the correct answer is shown
        expect(screen.getByText("This is the correct answer.")).toBeVisible();
    });

    it("should not show rationales when answer is incorrect", async () => {
        // Arrange
        renderQuestion(groupSetRadioRationaleQuestion);

        // Select an incorrect answer: "$-8$" (index 1)
        await userEvent.click(screen.getAllByRole("radio")[1]);

        // Act
        await userEvent.click(screen.getByRole("button", {name: "Check"}));

        // Assert
        expect(screen.getByRole("alert", {name: "Incorrect"})).toBeVisible();
        // Verify that rationales are not shown
        expect(
            screen.queryByText("This is not the correct answer."),
        ).not.toBeInTheDocument();
    });
});
