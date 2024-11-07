import {getPromptJSON} from "./prompt-utils";

describe("GradedGroupSet getPromptJSON", () => {
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

        const renderProps: any = {
            gradedGroups: [{title: "Problem 1a"}, {title: "Problem 1b"}],
        };

        const result = getPromptJSON(renderProps, activeGroupJSON);

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
});
