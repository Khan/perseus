import {
    generateGradedGroupOptions,
    generateGradedGroupWidget,
    generateRadioChoice,
    generateRadioOptions,
    generateRadioWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {renderQuestion} from "../__testutils__/render-question";
import CrossOutContext from "../radio/cross-out-context";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const generateQuestion = (): PerseusRenderer =>
    generateTestPerseusRenderer({
        content: "[[☃ graded-group 1]]",
        widgets: {
            "graded-group 1": generateGradedGroupWidget({
                options: generateGradedGroupOptions({
                    content: "Which is a fruit?\n\n[[☃ radio 1]]",
                    widgets: {
                        "radio 1": generateRadioWidget({
                            options: generateRadioOptions({
                                choices: [
                                    generateRadioChoice("Apple", {
                                        correct: true,
                                    }),
                                    generateRadioChoice("Brick"),
                                    generateRadioChoice("Chair"),
                                ],
                            }),
                        }),
                    },
                }),
            }),
        },
    });

const crossOutOn = {
    wrapper: function CrossOutWrapper({children}: {children: React.ReactNode}) {
        return (
            <CrossOutContext.Provider value={{enabled: true}}>
                {children}
            </CrossOutContext.Provider>
        );
    },
};

const getToggle = () => screen.getByRole("switch", {name: "Cross out answers"});

const getChoice = (letter: string) =>
    screen.getByRole("button", {name: new RegExp(`^\\(Choice ${letter}`)});

const getCrossOutButton = (letter: string) =>
    screen.getByRole("button", {name: `Cross out choice ${letter}`});

describe("Graded group cross-out", () => {
    let userEvent: UserEvent;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("renders no cross-out toggle on a Radio inside a graded group without a host provider", () => {
        // Arrange, Act
        renderQuestion(generateQuestion());

        // Assert
        expect(screen.queryByRole("switch")).not.toBeInTheDocument();
    });

    it("crosses out a choice in a Radio inside a graded group when the host turns cross-out on", async () => {
        // Arrange
        renderQuestion(generateQuestion(), crossOutOn);
        await userEvent.click(getToggle());

        // Act
        await userEvent.click(getCrossOutButton("B"));

        // Assert
        expect(
            screen.getByRole("button", {name: "(Choice B, crossed out) Brick"}),
        ).toBeInTheDocument();
    });

    it("clears cross-outs when the graded group's Check finds a wrong answer", async () => {
        // Arrange
        renderQuestion(generateQuestion(), crossOutOn);
        await userEvent.click(getToggle());
        await userEvent.click(getCrossOutButton("B"));
        await userEvent.click(getChoice("C"));

        // Act
        await userEvent.click(screen.getByRole("button", {name: "Check"}));

        // Assert
        expect(
            screen.getByRole("button", {name: "(Choice B) Brick"}),
        ).toBeInTheDocument();
    });

    it("keeps the cross-out toggle on after the graded group's Check finds a wrong answer", async () => {
        // Arrange
        renderQuestion(generateQuestion(), crossOutOn);
        await userEvent.click(getToggle());
        await userEvent.click(getChoice("C"));

        // Act
        await userEvent.click(screen.getByRole("button", {name: "Check"}));

        // Assert
        expect(getToggle()).toBeChecked();
    });

    it("hides the cross-out toggle once the graded group's answer is correct", async () => {
        // Arrange
        renderQuestion(generateQuestion(), crossOutOn);
        await userEvent.click(getChoice("A"));

        // Act
        await userEvent.click(screen.getByRole("button", {name: "Check"}));

        // Assert
        expect(screen.queryByRole("switch")).not.toBeInTheDocument();
    });
});
