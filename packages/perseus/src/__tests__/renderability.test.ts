import PerseusItemVersion from "../item-version";
import {isItemRenderableByVersion} from "../renderability";
import {registerAllWidgetsForTesting} from "../util/register-all-widgets-for-testing";

const sampleItemNoWidgets = {
    question: {
        content: "hi 14",
        images: {},
        widgets: {},
    },
    answerArea: {
        calculator: false,
    },
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    hints: [],
} as const;

const sampleV0InputNumberItem = {
    question: {
        content: "[[☃ input-number 1]]",
        images: {},
        widgets: {
            "input-number 1": {
                type: "input-number",
                graded: true,
                options: {
                    value: "0",
                    simplify: "required",
                    size: "normal",
                    inexact: false,
                    maxError: 0.1,
                    answerType: "number",
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
    answerArea: {
        calculator: false,
    },
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    hints: [],
} as const;

const sampleImpossibleWidgetsItem = {
    question: {
        content: "[[☃ impossible-to-render-widget 1]]",
        images: {},
        widgets: {
            "impossible-to-render-widget 1": {
                type: "impossible-to-render-widget",
                graded: true,
                options: {},
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
    answerArea: {
        calculator: false,
    },
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    hints: [],
} as const;

const IMPOSSIBLY_HIGH_VERSION_NUMBER = 68921;
const sampleImpossibleInputNumberItem1 = {
    question: {
        content: "[[☃ input-number 1]]",
        images: {},
        widgets: {
            "input-number 1": {
                type: "input-number",
                graded: true,
                options: {
                    value: "0",
                    simplify: "required",
                    size: "normal",
                    inexact: false,
                    maxError: 0.1,
                    answerType: "number",
                },
                version: {
                    major: IMPOSSIBLY_HIGH_VERSION_NUMBER,
                    minor: 0,
                },
            },
        },
    },
    answerArea: {
        calculator: false,
    },
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    hints: [],
} as const;
const sampleImpossibleInputNumberItem2 = {
    question: {
        content: "[[☃ input-number 1]]",
        images: {},
        widgets: {
            "input-number 1": {
                type: "input-number",
                graded: true,
                options: {
                    value: "0",
                    simplify: "required",
                    size: "normal",
                    inexact: false,
                    maxError: 0.1,
                    answerType: "number",
                },
                version: {
                    major: IMPOSSIBLY_HIGH_VERSION_NUMBER,
                    minor: IMPOSSIBLY_HIGH_VERSION_NUMBER,
                },
            },
        },
    },
    answerArea: {
        calculator: false,
    },
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    hints: [],
} as const;

const sampleEmptyGroupItem = {
    question: {
        content: "[[☃ group 1]]\n\n",
        images: {},
        widgets: {
            "group 1": {
                type: "group",
                graded: true,
                options: {
                    content: "",
                    images: {},
                    widgets: {},
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
    answerArea: {
        calculator: false,
    },
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    hints: [],
} as const;

const sampleGroupWithInputNumberItem = {
    question: {
        content: "[[☃ group 1]]\n\n",
        images: {},
        widgets: {
            "group 1": {
                type: "group",
                graded: true,
                options: {
                    content: "[[☃ input-number 1]]",
                    images: {},
                    widgets: {
                        "input-number 1": {
                            type: "input-number",
                            graded: true,
                            options: {
                                value: 0,
                                simplify: "required",
                                size: "normal",
                                inexact: false,
                                maxError: 0.1,
                                answerType: "number",
                            },
                            version: {
                                major: 0,
                                minor: 0,
                            },
                        },
                    },
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
    answerArea: {
        calculator: false,
    },
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    hints: [],
} as const;

const sampleGroupWithRadioItem = {
    question: {
        content: "[[☃ group 1]]\n\n",
        images: {},
        widgets: {
            "group 1": {
                type: "group",
                graded: true,
                options: {
                    content: "[[☃ radio 1]]\n\n",
                    images: {},
                    widgets: {
                        "radio 1": {
                            type: "radio",
                            graded: true,
                            options: {
                                choices: [
                                    {
                                        content: "A",
                                        correct: true,
                                    },
                                    {
                                        correct: false,
                                        content: "B",
                                    },
                                ],
                                randomize: false,
                                multipleSelect: false,
                                displayCount: null,
                                noneOfTheAbove: false,
                                onePerLine: true,
                                deselectEnabled: false,
                            },
                            version: {
                                major: 0,
                                minor: 0,
                            },
                        },
                    },
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
    answerArea: {
        calculator: false,
    },
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    hints: [],
} as const;

describe("Renderability", () => {
    beforeEach(() => {
        registerAllWidgetsForTesting();
    });

    describe("isItemRenderableByVersion", () => {
        describe("Current Perseus Version", () => {
            it("should be renderable with no widgets", () => {
                const result = isItemRenderableByVersion(
                    sampleItemNoWidgets,
                    PerseusItemVersion,
                );
                expect(result).toBe(true);
            });

            it("should not be able to render future widgets", () => {
                const result1 = isItemRenderableByVersion(
                    sampleImpossibleWidgetsItem,
                    PerseusItemVersion,
                );
                const result2 = isItemRenderableByVersion(
                    sampleImpossibleInputNumberItem1,
                    PerseusItemVersion,
                );
                const result3 = isItemRenderableByVersion(
                    sampleImpossibleInputNumberItem2,
                    PerseusItemVersion,
                );
                expect(result1).toBe(false);
                expect(result2).toBe(false);
                expect(result3).toBe(false);
            });
        });

        describe("A input-only version of perseus", () => {
            const inputOnlyPerseusVersion = {
                "::renderer::": {major: 100, minor: 0},
                group: {major: 100, minor: 0},
                sequence: {major: 100, minor: 0},
                "input-number": {major: 100, minor: 0},
                "numeric-input": {major: 100, minor: 0},
            } as const;

            it("should be able to render no widgets", () => {
                const result = isItemRenderableByVersion(
                    sampleItemNoWidgets,
                    inputOnlyPerseusVersion,
                );
                expect(result).toBe(true);
            });

            it("should be able to render just an input-number", () => {
                const result = isItemRenderableByVersion(
                    sampleV0InputNumberItem,
                    inputOnlyPerseusVersion,
                );
                expect(result).toBe(true);
            });

            it("should be able to render just a group widget", () => {
                const result = isItemRenderableByVersion(
                    sampleEmptyGroupItem,
                    inputOnlyPerseusVersion,
                );
                expect(result).toBe(true);
            });

            it("should be able to render a group with an input number", () => {
                const result = isItemRenderableByVersion(
                    sampleGroupWithInputNumberItem,
                    inputOnlyPerseusVersion,
                );
                expect(result).toBe(true);
            });

            it("should not be able to render a group with a radio", () => {
                const result = isItemRenderableByVersion(
                    sampleGroupWithRadioItem,
                    inputOnlyPerseusVersion,
                );
                expect(result).toBe(false);
            });
        });

        describe("Multi-items", () => {
            it("should be renderable with no items", () => {
                const result = isItemRenderableByVersion(
                    {
                        _multi: {
                            questions: [],
                        },
                    },
                    PerseusItemVersion,
                );
                expect(result).toBe(true);
            });
        });
    });
});
