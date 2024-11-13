import {act, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {PerseusRenderer} from "../../perseus-types";
import type {UserEvent} from "@testing-library/user-event";

const question: PerseusRenderer = {
    content: "---\n\n##Check your understanding!\n\n[[☃ graded-group 1]]\n\n",
    images: {},
    widgets: {
        "graded-group 1": {
            type: "graded-group",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                title: "Metabolic strategies of bacteria",
                content:
                    "1. **Which of the following statements about metabolic strategies of bacteria are true?**\n\n [[☃ categorizer 1]]",
                images: {},
                widgets: {
                    "categorizer 1": {
                        type: "categorizer",
                        alignment: "default",
                        static: false,
                        graded: true,
                        options: {
                            static: false,
                            items: [
                                "Some bacteria conduct photosynthesis and produce oxygen, much like plants.",
                                "Bacteria are always autotrophic but they may get energy from either light or chemical sources.",
                                "Some chemosynthetic bacteria introduce energy and fixed carbon into communities where photosynthesis is not possible (e.g., deep-sea vents).",
                                "Some bacteria live symbiotically inside of host organisms and provide the host with nutrients.",
                            ],
                            categories: ["True", "False"],
                            values: [0, 1, 0, 0],
                            randomizeItems: false,
                        },
                        version: {major: 0, minor: 0},
                    },
                },
                hint: {
                    content:
                        "Some bacteria synthesize their own fuel molecules/fix their own carbon (autotrophic), while others take in fixed carbon from their environments (heterotrophic).\n\nSome autotrophs use light energy to synthesize their own fuel molecules, while others extract energy from chemical sources.\n\nBacteria that extract energy from chemical sources and use it to fix carbon are called chemosynthetic organisms.  These bacteria may be essential to communities where light is not available, like those around deep-sea vents. They can form the base of the food chain (act as primary producers) in these ecosystems.\n\nSome bacteria have symbiotic (mutually beneficial) relationships with other organisms, living inside these organisms and providing them with nutrients.\n\n**The following statements about the metabolic strategies of bacteria are true:**\n\n[[☃ categorizer 1]]",
                    images: {},
                    widgets: {
                        "categorizer 1": {
                            type: "categorizer",
                            alignment: "default",
                            static: true,
                            graded: true,
                            options: {
                                static: false,
                                items: [
                                    "Some bacteria conduct photosynthesis and produce oxygen, much like plants.",
                                    "Bacteria are always autotrophic but they may get energy from either light or chemical sources.",
                                    "Some chemosynthetic bacteria introduce energy and fixed carbon into communities where photosynthesis is not possible (e.g., deep-sea vents).",
                                    "Some bacteria live symbiotically inside of host organisms and provide the host with nutrients.",
                                ],
                                categories: ["True", "False"],
                                values: [0, 1, 0, 0],
                                randomizeItems: false,
                            },
                            version: {major: 0, minor: 0},
                        },
                    },
                },
            },
            version: {major: 0, minor: 0},
        },
    },
};

describe("graded-group widget", () => {
    let userEvent: UserEvent;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should get prompt json which matches the state of the UI when the hint is collapsed", async () => {
        // Arrange
        const {renderer} = renderQuestion(question);

        // Act
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content:
                "---\n\n##Check your understanding!\n\n[[☃ graded-group 1]]\n\n",
            widgets: {
                "graded-group 1": {
                    type: "graded-group",
                    title: "Metabolic strategies of bacteria",
                    content:
                        "1. **Which of the following statements about metabolic strategies of bacteria are true?**\n\n [[☃ categorizer 1]]",
                    widgets: {
                        "categorizer 1": {
                            type: "categorizer",
                            options: {
                                items: [
                                    "Some bacteria conduct photosynthesis and produce oxygen, much like plants.",
                                    "Bacteria are always autotrophic but they may get energy from either light or chemical sources.",
                                    "Some chemosynthetic bacteria introduce energy and fixed carbon into communities where photosynthesis is not possible (e.g., deep-sea vents).",
                                    "Some bacteria live symbiotically inside of host organisms and provide the host with nutrients.",
                                ],
                                categories: ["True", "False"],
                            },
                            userInput: {
                                itemToCategoryMapping: [],
                            },
                        },
                    },
                    hint: {
                        content:
                            "Some bacteria synthesize their own fuel molecules/fix their own carbon (autotrophic), while others take in fixed carbon from their environments (heterotrophic).\n\nSome autotrophs use light energy to synthesize their own fuel molecules, while others extract energy from chemical sources.\n\nBacteria that extract energy from chemical sources and use it to fix carbon are called chemosynthetic organisms.  These bacteria may be essential to communities where light is not available, like those around deep-sea vents. They can form the base of the food chain (act as primary producers) in these ecosystems.\n\nSome bacteria have symbiotic (mutually beneficial) relationships with other organisms, living inside these organisms and providing them with nutrients.\n\n**The following statements about the metabolic strategies of bacteria are true:**\n\n[[☃ categorizer 1]]",
                        widgets: {},
                    },
                },
            },
        });
    });

    it("should get prompt json which matches the state of the UI when the hint is expanded", async () => {
        // Arrange
        const {renderer} = renderQuestion(question);

        // Act
        await userEvent.click(screen.getByRole("button", {name: "Explain"}));
        act(() => jest.runOnlyPendingTimers());

        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content:
                "---\n\n##Check your understanding!\n\n[[☃ graded-group 1]]\n\n",
            widgets: {
                "graded-group 1": {
                    type: "graded-group",
                    title: "Metabolic strategies of bacteria",
                    content:
                        "1. **Which of the following statements about metabolic strategies of bacteria are true?**\n\n [[☃ categorizer 1]]",
                    widgets: {
                        "categorizer 1": {
                            type: "categorizer",
                            options: {
                                items: [
                                    "Some bacteria conduct photosynthesis and produce oxygen, much like plants.",
                                    "Bacteria are always autotrophic but they may get energy from either light or chemical sources.",
                                    "Some chemosynthetic bacteria introduce energy and fixed carbon into communities where photosynthesis is not possible (e.g., deep-sea vents).",
                                    "Some bacteria live symbiotically inside of host organisms and provide the host with nutrients.",
                                ],
                                categories: ["True", "False"],
                            },
                            userInput: {
                                itemToCategoryMapping: [],
                            },
                        },
                    },
                    hint: {
                        content:
                            "Some bacteria synthesize their own fuel molecules/fix their own carbon (autotrophic), while others take in fixed carbon from their environments (heterotrophic).\n\nSome autotrophs use light energy to synthesize their own fuel molecules, while others extract energy from chemical sources.\n\nBacteria that extract energy from chemical sources and use it to fix carbon are called chemosynthetic organisms.  These bacteria may be essential to communities where light is not available, like those around deep-sea vents. They can form the base of the food chain (act as primary producers) in these ecosystems.\n\nSome bacteria have symbiotic (mutually beneficial) relationships with other organisms, living inside these organisms and providing them with nutrients.\n\n**The following statements about the metabolic strategies of bacteria are true:**\n\n[[☃ categorizer 1]]",
                        widgets: {
                            "categorizer 1": {
                                type: "categorizer",
                                options: {
                                    items: [
                                        "Some bacteria conduct photosynthesis and produce oxygen, much like plants.",
                                        "Bacteria are always autotrophic but they may get energy from either light or chemical sources.",
                                        "Some chemosynthetic bacteria introduce energy and fixed carbon into communities where photosynthesis is not possible (e.g., deep-sea vents).",
                                        "Some bacteria live symbiotically inside of host organisms and provide the host with nutrients.",
                                    ],
                                    categories: ["True", "False"],
                                },
                                userInput: {
                                    itemToCategoryMapping: [0, 1, 0, 0],
                                },
                            },
                        },
                    },
                },
            },
        });
    });
});
