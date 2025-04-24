import {violatingWidgets} from "../a11y";
import {registerAllWidgetsForTesting} from "../util/register-all-widgets-for-testing";

const noWidgets = {
    question: {
        content: "Hello, world!",
        images: {},
        widgets: {},
    },
    answerArea: {
        calculator: false,
    },
    hints: [],
} as const;

const oneAccessibleWidget = {
    question: {
        content: "Hello, world!\n\n[[☃ radio 1]]",
        images: {},
        widgets: {
            "radio 1": {
                type: "radio",
                graded: true,
                options: {
                    choices: [
                        {
                            content: "hello",
                            correct: true,
                        },
                        {
                            content: "goodbye",
                            correct: false,
                        },
                    ],
                    randomize: false,
                    multipleSelect: false,
                    displayCount: null,
                    hasNoneOfTheAbove: false,
                    onePerLine: true,
                    deselectEnabled: false,
                },
                version: {
                    major: 1,
                    minor: 0,
                },
            },
        },
    },
    answerArea: {
        calculator: false,
    },
    hints: [],
} as const;

const oneInaccessibleWidget = {
    question: {
        content: "Hello, world!\n\n[[☃ radio 1]]\n\n[[☃ matrix 1]]\n\n",
        images: {},
        widgets: {
            "radio 1": {
                type: "radio",
                graded: true,
                options: {
                    choices: [
                        {
                            content: "hello",
                            correct: true,
                        },
                        {
                            content: "goodbye",
                            correct: false,
                        },
                    ],
                    randomize: false,
                    multipleSelect: false,
                    displayCount: null,
                    hasNoneOfTheAbove: false,
                    onePerLine: true,
                    deselectEnabled: false,
                },
                version: {
                    major: 1,
                    minor: 0,
                },
            },
            "matrix 1": {
                type: "matrix",
                graded: true,
                options: {
                    matrixBoardSize: [3, 3],
                    answers: [[]],
                    prefix: "",
                    suffix: "",
                    cursorPosition: [0, 0],
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
    hints: [],
} as const;

const imageWithAltText = {
    question: {
        content: "hello\n\n[[☃ image 1]]\n\n",
        images: {},
        widgets: {
            "image 1": {
                type: "image",
                graded: true,
                options: {
                    title: "",
                    range: [
                        [0, 10],
                        [0, 10],
                    ],
                    box: [350, 150],
                    backgroundImage: {
                        url: "http://placehold.it/350x150",
                        width: 350,
                        height: 150,
                    },
                    labels: [],
                    alt: "oh cool",
                    caption: "",
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
    hints: [],
} as const;

const imageWithoutAltText = {
    question: {
        content: "hello\n\n[[☃ image 1]]\n\n",
        images: {},
        widgets: {
            "image 1": {
                type: "image",
                graded: true,
                options: {
                    title: "",
                    range: [
                        [0, 10],
                        [0, 10],
                    ],
                    box: [350, 150],
                    backgroundImage: {
                        url: "http://placehold.it/350x150",
                        width: 350,
                        height: 150,
                    },
                    labels: [],
                    alt: "",
                    caption: "",
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
    hints: [],
} as const;

const emptyImageWithoutAltText = {
    question: {
        content: "hello\n\n[[☃ image 1]]\n\n",
        images: {},
        widgets: {
            "image 1": {
                type: "image",
                graded: true,
                options: {
                    title: "",
                    range: [
                        [0, 10],
                        [0, 10],
                    ],
                    box: [350, 150],
                    labels: [],
                    alt: "",
                    caption: "",
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
    hints: [],
} as const;

describe("a11y", () => {
    beforeAll(() => {
        registerAllWidgetsForTesting();
    });

    describe("violatingWidgets", () => {
        describe("Current Perseus Version", () => {
            it("should pass for no widgets", () => {
                const result = violatingWidgets(noWidgets);
                expect(result).toHaveLength(0);
            });

            it("should pass for accessible widgets", () => {
                const result = violatingWidgets(oneAccessibleWidget);
                expect(result).toHaveLength(0);
            });

            it("should pick out out inaccessible widgets", () => {
                // NOTE: when the matrix widget is accessible this will fail
                const result = violatingWidgets(oneInaccessibleWidget);
                expect(result).toHaveLength(1);
                expect(result[0]).toBe("matrix");
            });

            it("should pass for images with alt text", () => {
                const result = violatingWidgets(imageWithAltText);
                expect(result).toHaveLength(0);
            });

            it("should pick out images without alt text", () => {
                const result = violatingWidgets(imageWithoutAltText);
                expect(result).toHaveLength(1);
                expect(result[0]).toBe("image");
            });

            it("should ignore blank images", () => {
                const result = violatingWidgets(emptyImageWithoutAltText);
                expect(result).toHaveLength(0);
            });
        });
    });
});
