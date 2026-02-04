import {act, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";
import {article1} from "../../widgets/graded-group-set/graded-group-set.testdata";

import {getPromptJSON} from "./graded-group-set-ai-utils";

import type {UserEvent} from "@testing-library/user-event";

describe("GradedGroupSet AI utils", () => {
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

    it("it returns JSON with the expected format and fields", () => {
        const activeGroupJSON: any = {
            title: "Problem 1a",
            content: "$0.5 + 0.4 =$   [[☃ numeric-input 1]]",
            widgets: {
                "numeric-input 1": {
                    type: "numeric-input",
                    alignment: "default",
                    options: {
                        labelText: "Numeric input label",
                        size: "Normal",
                        coefficient: false,
                        static: false,
                    },
                    userInput: {
                        currentValue: "42",
                    },
                },
            },
            hint: {
                content:
                    "There are many ways to solve this problem. Let's see two student solutions.\n\n###Student A's solution:\n\nI thought in terms of tenths.\n\n$\\phantom{=}0.5 + 0.4$\n\n$=5$ tenths $+ ~4$ tenths\n\n$=9$ tenths\n\n$=0.9$\n\n###Student B's solution:\n\nI used tenths grids.\n\n[[☃ image 1]]\n\n[[☃ image 2]]\n\n[[☃ image 3]]\n\n$\\blueD{0.5} + \\greenD{0.4} = 0.9$\n\n###The answer:\n\n$0.5 + 0.4 = 0.9$",
                widgets: {
                    "image 1": {
                        options: {
                            title: "",
                            backgroundImage: {
                                url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/2a56a60275b7227ed9c5b89e489587c8cb13eb7b",
                            },
                            labels: [],
                            alt: "A square divided into 10 rows to show tenths. 5 of the rows are shaded to represent 5 tenths.",
                            caption: "",
                        },
                        type: "image",
                    },
                },
            },
        };

        const widgetData: any = {
            gradedGroups: [{title: "Problem 1a"}, {title: "Problem 1b"}],
        };

        const result = getPromptJSON(widgetData, activeGroupJSON);

        expect(result).toEqual({
            type: "graded-group-set",
            options: {
                groupCount: 2,
                currentGroup: {
                    title: "Problem 1a",
                    content: "$0.5 + 0.4 =$   [[☃ numeric-input 1]]",
                    widgets: {
                        "numeric-input 1": {
                            type: "numeric-input",
                            alignment: "default",
                            options: {
                                labelText: "Numeric input label",
                                size: "Normal",
                                coefficient: false,
                                static: false,
                            },
                            userInput: {
                                currentValue: "42",
                            },
                        },
                    },
                    hint: {
                        content:
                            "There are many ways to solve this problem. Let's see two student solutions.\n\n###Student A's solution:\n\nI thought in terms of tenths.\n\n$\\phantom{=}0.5 + 0.4$\n\n$=5$ tenths $+ ~4$ tenths\n\n$=9$ tenths\n\n$=0.9$\n\n###Student B's solution:\n\nI used tenths grids.\n\n[[☃ image 1]]\n\n[[☃ image 2]]\n\n[[☃ image 3]]\n\n$\\blueD{0.5} + \\greenD{0.4} = 0.9$\n\n###The answer:\n\n$0.5 + 0.4 = 0.9$",
                        widgets: {
                            "image 1": {
                                options: {
                                    title: "",
                                    backgroundImage: {
                                        url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/2a56a60275b7227ed9c5b89e489587c8cb13eb7b",
                                    },
                                    labels: [],
                                    alt: "A square divided into 10 rows to show tenths. 5 of the rows are shaded to represent 5 tenths.",
                                    caption: "",
                                },
                                type: "image",
                            },
                        },
                    },
                },
            },
        });
    });

    it("should get prompt json which matches the state of the UI when the hint is collapsed", async () => {
        // Arrange
        const {renderer} = renderQuestion(article1);

        // Act
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content:
                "#Section 1: Adding tenths less than one\n\n[[☃ graded-group-set 1]]\n\n\nBeautiful, let's move on to problems with whole numbers and tenths.",
            widgets: {
                "graded-group-set 1": {
                    type: "graded-group-set",
                    options: {
                        groupCount: 3,
                        currentGroup: {
                            content: "$0.5 + 0.4 =$   [[☃ numeric-input 1]]",
                            widgets: {
                                "numeric-input 1": {
                                    type: "numeric-input",
                                    label: "",
                                    userInput: {value: ""},
                                },
                            },
                            title: null,
                            type: "graded-group",
                            hint: {
                                content:
                                    "There are many ways to solve this problem. Let's see two student solutions.\n\n###Student A's solution:\n\nI thought in terms of tenths.\n\n$\\phantom{=}0.5 + 0.4$\n\n$=5$ tenths $+ ~4$ tenths\n\n$=9$ tenths\n\n$=0.9$\n\n###Student B's solution:\n\nI used tenths grids.\n\n[[☃ image 1]]\n\n[[☃ image 2]]\n\n[[☃ image 3]]\n\n$\\blueD{0.5} + \\greenD{0.4} = 0.9$\n\n###The answer:\n\n$0.5 + 0.4 = 0.9$",
                                widgets: {},
                            },
                        },
                    },
                },
            },
        });
    });

    it("should get prompt json which matches the state of the UI when the hint is expanded", async () => {
        // Arrange
        const {renderer} = renderQuestion(article1);

        // Act
        await userEvent.click(screen.getByRole("button", {name: "Explain"}));
        act(() => jest.runOnlyPendingTimers());

        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content:
                "#Section 1: Adding tenths less than one\n\n[[☃ graded-group-set 1]]\n\n\nBeautiful, let's move on to problems with whole numbers and tenths.",
            widgets: {
                "graded-group-set 1": {
                    type: "graded-group-set",
                    options: {
                        groupCount: 3,
                        currentGroup: {
                            content: "$0.5 + 0.4 =$   [[☃ numeric-input 1]]",
                            widgets: {
                                "numeric-input 1": {
                                    type: "numeric-input",
                                    label: "",
                                    userInput: {value: ""},
                                },
                            },
                            title: null,
                            type: "graded-group",
                            hint: {
                                content:
                                    "There are many ways to solve this problem. Let's see two student solutions.\n\n###Student A's solution:\n\nI thought in terms of tenths.\n\n$\\phantom{=}0.5 + 0.4$\n\n$=5$ tenths $+ ~4$ tenths\n\n$=9$ tenths\n\n$=0.9$\n\n###Student B's solution:\n\nI used tenths grids.\n\n[[☃ image 1]]\n\n[[☃ image 2]]\n\n[[☃ image 3]]\n\n$\\blueD{0.5} + \\greenD{0.4} = 0.9$\n\n###The answer:\n\n$0.5 + 0.4 = 0.9$",
                                widgets: {
                                    "image 1": {
                                        type: "image",
                                        options: {
                                            altText:
                                                "A square divided into 10 rows to show tenths. 5 of the rows are shaded to represent 5 tenths.",
                                            title: "",
                                            caption: "",
                                            imageUrl:
                                                "web+graphie://ka-perseus-graphie.s3.amazonaws.com/2a56a60275b7227ed9c5b89e489587c8cb13eb7b",
                                        },
                                    },
                                    "image 2": {
                                        type: "image",
                                        options: {
                                            altText:
                                                "A square divided into 10 rows to show tenths. 4 of the rows are shaded to represent 4 tenths.",
                                            title: "",
                                            caption: "",
                                            imageUrl:
                                                "web+graphie://ka-perseus-graphie.s3.amazonaws.com/217d580bc0baddb903bbcb648fc8d3ea3d0f4408",
                                        },
                                    },
                                    "image 3": {
                                        type: "image",
                                        options: {
                                            altText:
                                                "A square divided into 10 rows to show tenths. 5 of the rows are shaded in blue and 4 of the rows are shaded in green.",
                                            title: "",
                                            caption: "",
                                            imageUrl:
                                                "web+graphie://ka-perseus-graphie.s3.amazonaws.com/cda00c119dac3e52c8ed150ef4a9a37355f5c713",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    });
});
