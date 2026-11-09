import {
    generateRadioChoice,
    generateRadioOptions,
    generateRadioWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {announceMessage} from "@khanacademy/wonder-blocks-announcer";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {renderQuestion} from "../../../__testutils__/render-question";
import * as Dependencies from "../../../dependencies";
import {ApiOptions} from "../../../perseus-api";
import {testDependencies} from "../../../testing/test-dependencies";
import {scorePerseusItemTesting} from "../../../util/scoring.testutils";
import {containerSizeClass} from "../../../util/sizing-utils";
import CrossOutContext from "../cross-out-context";
import Radio from "../radio-widget";

import type {APIOptions, CrossOutOptions, WidgetProps} from "../../../types";
import type {RadioProps} from "../radio-widget";
import type {
    PerseusRadioUserInput,
    PerseusRadioWidgetOptions,
    PerseusRenderer,
} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

jest.mock("@khanacademy/wonder-blocks-announcer", () => ({
    announceMessage: jest.fn(),
}));

const generateQuestion = (multipleSelect = false): PerseusRenderer =>
    generateTestPerseusRenderer({
        content: "Which is a fruit?\n\n[[☃ radio 1]]",
        widgets: {
            "radio 1": generateRadioWidget({
                options: generateRadioOptions({
                    multipleSelect,
                    numCorrect: 1,
                    choices: [
                        generateRadioChoice("Apple", {
                            id: "choice-a",
                            correct: true,
                        }),
                        generateRadioChoice("Brick", {id: "choice-b"}),
                        generateRadioChoice("Chair", {id: "choice-c"}),
                    ],
                }),
            }),
        },
    });

function crossOutWrapper(options: CrossOutOptions) {
    return function CrossOutWrapper({children}: {children: React.ReactNode}) {
        return (
            <CrossOutContext.Provider value={options}>
                {children}
            </CrossOutContext.Provider>
        );
    };
}

const crossOutOn = {wrapper: crossOutWrapper({enabled: true})};

const getToggle = () => screen.getByRole("switch", {name: "Cross out answers"});

const getChoice = (letter: string) =>
    screen.getByRole("button", {name: new RegExp(`^\\(Choice ${letter}`)});

const getCrossOutButton = (letter: string) =>
    screen.getByRole("button", {name: `Cross out choice ${letter}`});

describe("Radio cross-out", () => {
    let userEvent: UserEvent;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        jest.mocked(announceMessage).mockClear();
    });

    it("renders no toggle or cross-out buttons when cross-out isn't enabled", () => {
        // Arrange, Act
        renderQuestion(generateQuestion());

        // Assert
        expect(screen.queryByRole("switch")).not.toBeInTheDocument();
        expect(
            screen.queryByRole("button", {name: /Cross out choice/}),
        ).not.toBeInTheDocument();
    });

    it("renders no toggle or cross-out buttons when cross-out is disabled", () => {
        // Arrange, Act
        renderQuestion(generateQuestion(), {
            wrapper: crossOutWrapper({enabled: false}),
        });

        // Assert
        expect(screen.queryByRole("switch")).not.toBeInTheDocument();
    });

    it("renders the toggle off by default, with no cross-out buttons", () => {
        // Arrange, Act
        renderQuestion(generateQuestion(), crossOutOn);

        // Assert
        expect(getToggle()).not.toBeChecked();
        expect(
            screen.queryByRole("button", {name: /Cross out choice/}),
        ).not.toBeInTheDocument();
    });

    it("describes what the toggle does", () => {
        // Arrange, Act
        renderQuestion(generateQuestion(), crossOutOn);

        // Assert
        expect(
            screen.getByRole("switch", {
                description:
                    "Adds a cross-out button after each answer choice.",
            }),
        ).toBeInTheDocument();
    });

    it("places the toggle before the choices in tab order", async () => {
        // Arrange
        renderQuestion(generateQuestion(), crossOutOn);

        // Act
        await userEvent.tab();
        await userEvent.tab();

        // Assert
        expect(getChoice("A")).toHaveFocus();
    });

    it("shows a cross-out button on every choice when the toggle is turned on", async () => {
        // Arrange
        renderQuestion(generateQuestion(), crossOutOn);

        // Act
        await userEvent.click(getToggle());

        // Assert
        expect(getToggle()).toBeChecked();
        expect(
            screen.getAllByRole("button", {name: /Cross out choice/}),
        ).toHaveLength(3);
    });

    it("turns the toggle on when Space is pressed on it", async () => {
        // Arrange
        renderQuestion(generateQuestion(), crossOutOn);
        getToggle().focus();

        // Act
        await userEvent.keyboard(" ");

        // Assert
        expect(getToggle()).toBeChecked();
    });

    it("turns the toggle on when Enter is pressed on it", async () => {
        // Arrange
        renderQuestion(generateQuestion(), crossOutOn);
        getToggle().focus();

        // Act
        await userEvent.keyboard("{Enter}");

        // Assert
        expect(getToggle()).toBeChecked();
    });

    it("turns the toggle off when Enter is pressed on it again", async () => {
        // Arrange
        renderQuestion(generateQuestion(), crossOutOn);
        getToggle().focus();
        await userEvent.keyboard("{Enter}");

        // Act
        await userEvent.keyboard("{Enter}");

        // Assert
        expect(getToggle()).not.toBeChecked();
    });

    it("doesn't submit the form when Enter is pressed on the toggle", async () => {
        // Arrange
        const onSubmit = jest.fn((e: React.FormEvent) => e.preventDefault());
        renderQuestion(generateQuestion(), {
            wrapper: ({children}) => (
                <form onSubmit={onSubmit}>
                    <CrossOutContext.Provider value={{enabled: true}}>
                        {children}
                    </CrossOutContext.Provider>
                    <button type="submit">Check</button>
                </form>
            ),
        });
        getToggle().focus();

        // Act
        await userEvent.keyboard("{Enter}");

        // Assert
        expect(onSubmit).not.toHaveBeenCalled();
    });

    it("doesn't pass Enter on the toggle up to the host's keydown handlers", async () => {
        // Arrange
        const onKeyDown = jest.fn();
        renderQuestion(generateQuestion(), {
            wrapper: ({children}) => (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <div onKeyDown={onKeyDown}>
                    <CrossOutContext.Provider value={{enabled: true}}>
                        {children}
                    </CrossOutContext.Provider>
                </div>
            ),
        });
        getToggle().focus();

        // Act
        await userEvent.keyboard("{Enter}");

        // Assert
        expect(onKeyDown).not.toHaveBeenCalled();
    });

    it("tabs from each choice to its cross-out button", async () => {
        // Arrange
        renderQuestion(generateQuestion(), crossOutOn);
        await userEvent.click(getToggle());

        // Act & Assert
        await userEvent.tab();
        expect(getChoice("A")).toHaveFocus();
        await userEvent.tab();
        expect(getCrossOutButton("A")).toHaveFocus();
        await userEvent.tab();
        expect(getChoice("B")).toHaveFocus();
    });

    it("crosses out a choice without selecting it", async () => {
        // Arrange
        const {renderer} = renderQuestion(generateQuestion(), {
            ...crossOutOn,
        });
        await userEvent.click(getToggle());

        // Act
        await userEvent.click(getCrossOutButton("B"));

        // Assert
        expect(getCrossOutButton("B")).toHaveAttribute("aria-pressed", "true");
        expect(
            screen.getByRole("button", {name: "(Choice B, crossed out) Brick"}),
        ).toHaveAttribute("aria-pressed", "false");
        expect(renderer.getUserInputMap()).toEqual({
            "radio 1": {selectedChoiceIds: []},
        });
    });

    it("announces the cross-out and how many choices are left", async () => {
        // Arrange
        renderQuestion(generateQuestion(), crossOutOn);
        await userEvent.click(getToggle());

        // Act
        await userEvent.click(getCrossOutButton("B"));

        // Assert
        expect(announceMessage).toHaveBeenCalledWith({
            message: "Choice B crossed out. 2 choices left.",
        });
    });

    it("restores a crossed-out choice when its cross-out button is pressed again", async () => {
        // Arrange
        renderQuestion(generateQuestion(), crossOutOn);
        await userEvent.click(getToggle());
        await userEvent.click(getCrossOutButton("B"));

        // Act
        await userEvent.click(getCrossOutButton("B"));

        // Assert
        expect(getCrossOutButton("B")).toHaveAttribute("aria-pressed", "false");
        expect(
            screen.getByRole("button", {name: "(Choice B) Brick"}),
        ).toBeInTheDocument();
        expect(announceMessage).toHaveBeenLastCalledWith({
            message: "Choice B restored. 3 choices left.",
        });
    });

    it("stops showing cross-outs when the toggle is turned off", async () => {
        // Arrange
        renderQuestion(generateQuestion(), crossOutOn);
        await userEvent.click(getToggle());
        await userEvent.click(getCrossOutButton("B"));

        // Act
        await userEvent.click(getToggle());

        // Assert
        expect(
            screen.queryByRole("button", {name: /Cross out choice/}),
        ).not.toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: "(Choice B) Brick"}),
        ).toBeInTheDocument();
    });

    it("shows cross-outs again when the toggle is turned back on", async () => {
        // Arrange
        renderQuestion(generateQuestion(), crossOutOn);
        await userEvent.click(getToggle());
        await userEvent.click(getCrossOutButton("B"));
        await userEvent.click(getToggle());

        // Act
        await userEvent.click(getToggle());

        // Assert
        expect(
            screen.getByRole("button", {name: "(Choice B, crossed out) Brick"}),
        ).toBeInTheDocument();
        expect(getCrossOutButton("B")).toHaveAttribute("aria-pressed", "true");
    });

    it("announces how many choices are crossed out when the toggle is turned back on", async () => {
        // Arrange
        renderQuestion(generateQuestion(), crossOutOn);
        await userEvent.click(getToggle());
        await userEvent.click(getCrossOutButton("B"));
        await userEvent.click(getCrossOutButton("C"));
        await userEvent.click(getToggle());
        jest.mocked(announceMessage).mockClear();

        // Act
        await userEvent.click(getToggle());

        // Assert
        expect(announceMessage).toHaveBeenCalledTimes(1);
        expect(announceMessage).toHaveBeenCalledWith({
            message: "2 choices crossed out.",
        });
    });

    it("announces a single crossed-out choice when the toggle is turned back on", async () => {
        // Arrange
        renderQuestion(generateQuestion(), crossOutOn);
        await userEvent.click(getToggle());
        await userEvent.click(getCrossOutButton("B"));
        await userEvent.click(getToggle());
        jest.mocked(announceMessage).mockClear();

        // Act
        await userEvent.click(getToggle());

        // Assert
        expect(announceMessage).toHaveBeenCalledWith({
            message: "1 choice crossed out.",
        });
    });

    it("doesn't announce anything when the toggle is turned on with no cross-outs", async () => {
        // Arrange
        renderQuestion(generateQuestion(), crossOutOn);

        // Act
        await userEvent.click(getToggle());

        // Assert
        expect(announceMessage).not.toHaveBeenCalled();
    });

    it("doesn't announce the cross-outs when the toggle is turned off", async () => {
        // Arrange
        renderQuestion(generateQuestion(), crossOutOn);
        await userEvent.click(getToggle());
        await userEvent.click(getCrossOutButton("B"));
        jest.mocked(announceMessage).mockClear();

        // Act
        await userEvent.click(getToggle());

        // Assert
        expect(announceMessage).not.toHaveBeenCalled();
    });

    it("forgets a cross-out when its choice is selected while the toggle is off", async () => {
        // Arrange
        renderQuestion(generateQuestion(), crossOutOn);
        await userEvent.click(getToggle());
        await userEvent.click(getCrossOutButton("B"));
        await userEvent.click(getToggle());
        jest.mocked(announceMessage).mockClear();

        // Act
        await userEvent.click(getChoice("B"));
        await userEvent.click(getToggle());

        // Assert
        expect(getCrossOutButton("B")).toHaveAttribute("aria-pressed", "false");
        expect(announceMessage).not.toHaveBeenCalledWith({
            message: "Choice B restored and selected.",
        });
    });

    it("unselects a selected choice when it's crossed out, with one announcement", async () => {
        // Arrange
        const {renderer} = renderQuestion(generateQuestion(), {
            ...crossOutOn,
        });
        await userEvent.click(getToggle());
        await userEvent.click(getChoice("A"));
        jest.mocked(announceMessage).mockClear();

        // Act
        await userEvent.click(getCrossOutButton("A"));

        // Assert
        expect(renderer.getUserInputMap()).toEqual({
            "radio 1": {selectedChoiceIds: []},
        });
        expect(announceMessage).toHaveBeenCalledTimes(1);
        expect(announceMessage).toHaveBeenCalledWith({
            message: "Choice A crossed out. It was unselected. 2 choices left.",
        });
    });

    it("restores and selects a crossed-out choice when it's selected", async () => {
        // Arrange
        const {renderer} = renderQuestion(generateQuestion(), {
            ...crossOutOn,
        });
        await userEvent.click(getToggle());
        await userEvent.click(getCrossOutButton("A"));
        jest.mocked(announceMessage).mockClear();

        // Act
        await userEvent.click(getChoice("A"));

        // Assert
        expect(getChoice("A")).toHaveAccessibleName("(Choice A) Apple");
        expect(renderer.getUserInputMap()).toEqual({
            "radio 1": {selectedChoiceIds: ["choice-a"]},
        });
        expect(announceMessage).toHaveBeenCalledTimes(1);
        expect(announceMessage).toHaveBeenCalledWith({
            message: "Choice A restored and selected.",
        });
    });

    it("crosses out choices in multi-select questions", async () => {
        // Arrange
        renderQuestion(generateQuestion(true), crossOutOn);
        await userEvent.click(getToggle());

        // Act
        await userEvent.click(getCrossOutButton("B"));
        await userEvent.click(getCrossOutButton("C"));

        // Assert
        expect(announceMessage).toHaveBeenLastCalledWith({
            message: "Choice C crossed out. 1 choice left.",
        });
    });

    it("scores the same with and without cross-outs", async () => {
        // Arrange
        const question = generateQuestion();
        const {renderer} = renderQuestion(question, crossOutOn);
        await userEvent.click(getToggle());
        await userEvent.click(getChoice("A"));

        // Act
        await userEvent.click(getCrossOutButton("B"));
        await userEvent.click(getCrossOutButton("C"));
        const score = scorePerseusItemTesting(
            question,
            renderer.getUserInputMap(),
        );

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("hides the toggle and clears cross-outs in review mode", async () => {
        // Arrange
        const question = generateQuestion();
        const {rerender} = renderQuestion(question, crossOutOn);
        await userEvent.click(getToggle());
        await userEvent.click(getCrossOutButton("B"));

        // Act
        rerender(question, {reviewMode: true});

        // Assert
        expect(screen.queryByRole("switch")).not.toBeInTheDocument();
        expect(
            screen.queryByRole("button", {name: /crossed out/}),
        ).not.toBeInTheDocument();
    });

    it("keeps cross-outs cleared after review mode ends", async () => {
        // Arrange
        const question = generateQuestion();
        const {rerender} = renderQuestion(question, crossOutOn);
        await userEvent.click(getToggle());
        await userEvent.click(getCrossOutButton("B"));
        rerender(question, {reviewMode: true});

        // Act
        rerender(question, {reviewMode: false});

        // Assert
        expect(
            screen.getByRole("button", {name: "(Choice B) Brick"}),
        ).toBeInTheDocument();
    });
});

describe("Radio cross-out settings from CrossOutContext", () => {
    let userEvent: UserEvent;

    const choices = generateRadioOptions({
        numCorrect: 1,
        choices: [
            generateRadioChoice("Apple", {id: "choice-a", correct: true}),
            generateRadioChoice("Brick", {id: "choice-b"}),
        ],
    }).choices.map((choice, index) => ({...choice, originalIndex: index}));

    const getProps = (
        apiOverrides: Partial<APIOptions> = {},
    ): WidgetProps<
        RadioProps,
        PerseusRadioUserInput,
        PerseusRadioWidgetOptions
    > => ({
        options: {numCorrect: 1, choices},
        trackInteraction: jest.fn(),
        widgetId: "radio 1",
        widgetIndex: 0,
        alignment: null,
        static: false,
        problemNum: 0,
        apiOptions: {...ApiOptions.defaults, ...apiOverrides},
        onFocus: jest.fn(),
        onBlur: jest.fn(),
        findWidgets: () => [],
        reviewMode: false,
        isScorable: true,
        showSolutions: "none",
        handleUserInput: jest.fn(),
        userInput: {selectedChoiceIds: []},
        linterContext: {
            contentType: "radio",
            highlightLint: false,
            stack: [],
        },
        containerSizeClass: containerSizeClass.MEDIUM,
    });

    const radioWithCrossOut = (
        crossOut: CrossOutOptions,
        apiOverrides: Partial<APIOptions> = {},
    ) => (
        <CrossOutContext.Provider value={crossOut}>
            <Radio {...getProps(apiOverrides)} />
        </CrossOutContext.Provider>
    );

    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("uses the toggle state the host passes", () => {
        // Arrange, Act
        render(radioWithCrossOut({enabled: true, toggleOn: true}));

        // Assert
        expect(getToggle()).toBeChecked();
        expect(getCrossOutButton("A")).toBeInTheDocument();
    });

    it("tells the host when the learner changes the toggle", async () => {
        // Arrange
        const onToggleChange = jest.fn();
        render(
            radioWithCrossOut({enabled: true, toggleOn: false, onToggleChange}),
        );

        // Act
        await userEvent.click(getToggle());

        // Assert
        expect(onToggleChange).toHaveBeenCalledWith(true);
    });

    it("clears cross-outs when the host changes the reset key", async () => {
        // Arrange
        const {rerender} = render(
            radioWithCrossOut({enabled: true, toggleOn: true, resetKey: 1}),
        );
        await userEvent.click(getCrossOutButton("B"));

        // Act
        rerender(
            radioWithCrossOut({enabled: true, toggleOn: true, resetKey: 2}),
        );

        // Assert
        expect(getCrossOutButton("B")).toHaveAttribute("aria-pressed", "false");
    });

    it("disables the toggle and cross-out buttons when read-only", () => {
        // Arrange, Act
        render(
            radioWithCrossOut(
                {enabled: true, toggleOn: true},
                {readOnly: true},
            ),
        );

        // Assert
        expect(getToggle()).toHaveAttribute("aria-disabled", "true");
        expect(getCrossOutButton("A")).toHaveAttribute("aria-disabled", "true");
    });

    it("doesn't change the toggle when Enter is pressed on it while read-only", async () => {
        // Arrange
        const onToggleChange = jest.fn();
        render(
            radioWithCrossOut(
                {enabled: true, toggleOn: false, onToggleChange},
                {readOnly: true},
            ),
        );
        getToggle().focus();

        // Act
        await userEvent.keyboard("{Enter}");

        // Assert
        expect(onToggleChange).not.toHaveBeenCalled();
    });

    it("doesn't cross out a choice when read-only", async () => {
        // Arrange
        render(
            radioWithCrossOut(
                {enabled: true, toggleOn: true},
                {readOnly: true},
            ),
        );

        // Act
        await userEvent.click(getCrossOutButton("A"));

        // Assert
        expect(getCrossOutButton("A")).toHaveAttribute("aria-pressed", "false");
    });
});
