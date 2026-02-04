import {screen, within} from "@testing-library/react";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import {getPromptJSON} from "./matcher-ai-utils";

import type {widgetDataPartial} from "./matcher-ai-utils";
import type {
    PerseusRenderer,
    PerseusMatcherUserInput,
} from "@khanacademy/perseus-core";

const question1: PerseusRenderer = {
    content:
        "**Match each claim with its supporting evidence.**\n\n[[\u2603 matcher 1]]",
    images: {},
    widgets: {
        "matcher 1": {
            version: {major: 0, minor: 0},
            type: "matcher",
            graded: true,
            options: {
                labels: ["**Claims**", "**Evidence**"],
                padding: true,
                orderMatters: false,
                right: [
                    "Right - One",
                    "Right - Two",
                    "Right - Three",
                    "Right - Four",
                    "Right - Five",
                ],
                left: [
                    "Left - One",
                    "Left - Two",
                    "Left - Three",
                    "Left - Four",
                    "Left - Five",
                ],
            },
        },
    },
};

describe("Matcher AI utils", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            TeX: ({
                children,
                onRender: onLoad,
            }: {
                children: React.ReactNode;
                onRender?: () => unknown;
            }) => {
                React.useLayoutEffect(() => {
                    onLoad?.();
                }, [onLoad]);
                return <span className="tex-mock">{children}</span>;
            },
        });
    });

    it("it returns JSON with the expected format and fields", () => {
        const userInput: PerseusMatcherUserInput = {
            left: ["3", "1", "2"],
            right: ["a", "b", "c"],
        };

        const widgetData: widgetDataPartial = {
            labels: ["Number", "Letter"],
            left: ["1", "2", "3"],
            right: ["a", "b", "c"],
            orderMatters: false,
            userInput,
        };

        const resultJSON = getPromptJSON(widgetData);

        expect(resultJSON).toEqual({
            type: "matcher",
            options: {
                labels: ["Number", "Letter"],
                left: ["1", "2", "3"],
                right: ["a", "b", "c"],
                orderMatters: false,
            },
            userInput: {
                left: ["3", "1", "2"],
                right: ["a", "b", "c"],
            },
        });
    });

    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1, {isMobile: false});

        // Act
        const rightColumn = screen.getAllByRole("cell")[1];
        const rightItems = within(rightColumn).getAllByRole("listitem");
        const shuffledRightItems = rightItems.map((item) => item.textContent);

        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content:
                "**Match each claim with its supporting evidence.**\n\n[[\u2603 matcher 1]]",
            widgets: {
                "matcher 1": {
                    type: "matcher",
                    options: {
                        labels: ["**Claims**", "**Evidence**"],
                        left: [
                            "Left - One",
                            "Left - Two",
                            "Left - Three",
                            "Left - Four",
                            "Left - Five",
                        ],
                        right: [
                            "Right - One",
                            "Right - Two",
                            "Right - Three",
                            "Right - Four",
                            "Right - Five",
                        ],
                        orderMatters: false,
                    },
                    userInput: {
                        left: [
                            "Left - One",
                            "Left - Two",
                            "Left - Three",
                            "Left - Four",
                            "Left - Five",
                        ],
                        right: shuffledRightItems,
                    },
                },
            },
        });
    });
});
