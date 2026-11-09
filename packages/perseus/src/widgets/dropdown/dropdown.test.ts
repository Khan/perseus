// AGENTS.md points to this file as the model widget test, so keep it
// following the Testing Guidelines there.
import {
    generateDropdownOptions,
    generateDropdownWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {renderQuestion} from "../../__testutils__/render-question";
import {scorePerseusItemTesting} from "../../util/scoring.testutils";

import {basicDropdown} from "./dropdown.testdata";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

// Builds a question with one dropdown. Only `correctChoice` is marked
// correct, so tests state their answer key instead of inheriting one.
function generateDropdownQuestion({
    choices,
    correctChoice,
    placeholder = "",
    isStatic = false,
}: {
    choices?: ReadonlyArray<string>;
    correctChoice?: string;
    placeholder?: string;
    isStatic?: boolean;
} = {}): PerseusRenderer {
    return generateTestPerseusRenderer({
        content: "[[☃ dropdown 1]]",
        widgets: {
            "dropdown 1": generateDropdownWidget({
                static: isStatic,
                options: generateDropdownOptions({
                    placeholder,
                    ...(choices && {
                        choices: choices.map((content) => ({
                            content,
                            correct: content === correctChoice,
                        })),
                    }),
                }),
            }),
        },
    });
}

describe("Dropdown widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("matches the snapshot on initial render", () => {
        // Arrange, Act
        const {container} = renderQuestion(basicDropdown);

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    it("matches the snapshot when opened", async () => {
        // Arrange
        const {container} = renderQuestion(
            generateDropdownQuestion({choices: ["Apple", "Banana"]}),
        );

        // Act
        await userEvent.click(screen.getByRole("combobox"));

        // Assert
        expect(screen.getByRole("option", {name: "Apple"})).toBeVisible();
        expect(container).toMatchSnapshot("dropdown open");
    });

    it("shows the placeholder before an answer is selected", () => {
        // Arrange, Act
        renderQuestion(generateDropdownQuestion({placeholder: "Pick one"}));

        // Assert
        expect(screen.getByRole("combobox")).toHaveTextContent("Pick one");
    });

    it("labels the dropdown for assistive technology", () => {
        // Arrange, Act
        renderQuestion(basicDropdown);

        // Assert
        expect(
            screen.getByRole("combobox", {name: "Select an answer"}),
        ).toBeInTheDocument();
    });

    it("scores a correct choice as correct", async () => {
        // Arrange
        const question = generateDropdownQuestion({
            choices: ["Right", "Wrong"],
            correctChoice: "Right",
        });
        const {renderer} = renderQuestion(question);

        // Act
        await userEvent.click(screen.getByRole("combobox"));
        await userEvent.click(screen.getByRole("option", {name: "Right"}));

        // Assert
        expect(screen.getByRole("combobox")).toHaveTextContent("Right");
        expect(
            scorePerseusItemTesting(question, renderer.getUserInputMap()),
        ).toHaveBeenAnsweredCorrectly();
    });

    it("scores an incorrect choice as incorrect", async () => {
        // Arrange
        const question = generateDropdownQuestion({
            choices: ["Right", "Wrong"],
            correctChoice: "Right",
        });
        const {renderer} = renderQuestion(question);

        // Act
        await userEvent.click(screen.getByRole("combobox"));
        await userEvent.click(screen.getByRole("option", {name: "Wrong"}));

        // Assert
        expect(screen.getByRole("combobox")).toHaveTextContent("Wrong");
        expect(
            scorePerseusItemTesting(question, renderer.getUserInputMap()),
        ).toHaveBeenAnsweredIncorrectly();
    });

    it("scores as invalid when nothing is selected", () => {
        // Arrange
        const {renderer} = renderQuestion(basicDropdown);

        // Act
        const score = scorePerseusItemTesting(
            basicDropdown,
            renderer.getUserInputMap(),
        );

        // Assert
        expect(score).toHaveInvalidInput();
    });

    it("sends a widget-rendered analytics event", () => {
        // Arrange
        const onAnalyticsEvent = jest.fn();

        // Act
        renderQuestion(generateDropdownQuestion(), {
            dependencies: {analytics: {onAnalyticsEvent}},
        });

        // Assert
        expect(onAnalyticsEvent).toHaveBeenCalledWith({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "dropdown",
                widgetId: "dropdown 1",
            },
        });
    });

    describe("focus()", () => {
        it("focuses the dropdown and returns true", () => {
            // Arrange
            const {renderer} = renderQuestion(basicDropdown);

            // Act
            const focused = renderer.focus();

            // Assert
            expect(focused).toBe(true);
            expect(screen.getByRole("combobox")).toHaveFocus();
        });

        it("returns false when the dropdown is read-only", () => {
            // Arrange
            const {renderer} = renderQuestion(basicDropdown, {
                apiOptions: {readOnly: true},
            });

            // Act
            const focused = renderer.focus();

            // Assert
            expect(focused).toBeFalsy();
            expect(screen.getByRole("combobox")).not.toHaveFocus();
        });

        it("returns false when the dropdown is static", () => {
            // Arrange
            const {renderer} = renderQuestion(
                generateDropdownQuestion({isStatic: true}),
            );

            // Act
            const focused = renderer.focus();

            // Assert
            expect(focused).toBeFalsy();
            expect(screen.getByRole("combobox")).not.toHaveFocus();
        });

        it("returns false when the dropdown has aria-disabled", () => {
            // Arrange
            const {renderer} = renderQuestion(basicDropdown);
            const combobox = screen.getByRole("combobox");
            combobox.setAttribute("aria-disabled", "true");

            // Act
            const focused = renderer.focus();

            // Assert
            expect(focused).toBeFalsy();
            expect(combobox).not.toHaveFocus();
        });
    });

    describe("required state", () => {
        it("is required when scorable and interactive", () => {
            // Arrange, Act
            renderQuestion(generateDropdownQuestion(), {
                apiOptions: {readOnly: false},
                extraProps: {isScorable: true, reviewMode: false},
            });

            // Assert
            expect(screen.getByRole("combobox")).toBeRequired();
        });

        it("is not required when not scorable", () => {
            // Arrange, Act
            renderQuestion(generateDropdownQuestion(), {
                apiOptions: {readOnly: false},
                extraProps: {isScorable: false, reviewMode: false},
            });

            // Assert
            expect(screen.getByRole("combobox")).not.toBeRequired();
        });

        it("is not required in review mode", () => {
            // Arrange, Act
            renderQuestion(generateDropdownQuestion(), {
                apiOptions: {readOnly: false},
                extraProps: {isScorable: true, reviewMode: true},
            });

            // Assert
            expect(screen.getByRole("combobox")).not.toBeRequired();
        });

        it("is not required when static", () => {
            // Arrange, Act
            renderQuestion(generateDropdownQuestion({isStatic: true}), {
                apiOptions: {readOnly: false},
                extraProps: {isScorable: true, reviewMode: false},
            });

            // Assert
            expect(screen.getByRole("combobox")).not.toBeRequired();
        });

        it("is not required when read-only", () => {
            // Arrange, Act
            renderQuestion(generateDropdownQuestion(), {
                apiOptions: {readOnly: true},
                extraProps: {isScorable: true, reviewMode: false},
            });

            // Assert
            expect(screen.getByRole("combobox")).not.toBeRequired();
        });
    });

    // Answerless options have the `correct` flags stripped, as when the
    // client renders a question without access to its answers.
    it.each(["answerful", "answerless"] as const)(
        "is answerable when rendered with %s options",
        async (variant) => {
            // Arrange
            const question = generateDropdownQuestion({
                choices: ["Right", "Wrong"],
                correctChoice: "Right",
            });
            const item = generateTestPerseusItem({question});
            const itemToRender =
                variant === "answerless" ? splitPerseusItem(item) : item;
            const {renderer} = renderQuestion(itemToRender.question);

            // Act
            await userEvent.click(screen.getByRole("combobox"));
            await userEvent.click(screen.getByRole("option", {name: "Right"}));

            // Assert
            expect(
                scorePerseusItemTesting(question, renderer.getUserInputMap()),
            ).toHaveBeenAnsweredCorrectly();
        },
    );
});
