import {Dependencies} from "@khanacademy/perseus";
import _ from "underscore";

import {testDependencies} from "../../../../testing/test-dependencies";
import i18n from "../i18n";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

const exerciseImagesEverywhere = {
    question: {
        content:
            "![question-a](question-a)\n\n![question-b](question-b)\n\n[[☃ categorizer 1]]\n\n[[☃ group 1]]\n\n[[☃ image 1]]\n\n[[☃ matcher 1]]\n\n[[☃ matrix 1]]\n\n[[☃ orderer 1]]\n\n[[☃ passage 1]]\n\n[[☃ radio 1]]\n\n[[☃ sorter 1]]\n\n[[☃ table 1]]\n\n[[☃ grapher 1]]\n\n[[☃ interactive-graph 1]]\n\n[[☃ plotter 1]]",
        images: {},
        widgets: {
            "categorizer 1": {
                type: "categorizer",
                graded: true,
                options: {
                    items: [
                        "![category-item-a](category-item-a)",
                        "![category-item-b](category-item-b)",
                    ],
                    categories: [
                        "![category-category-a](category-category-a)",
                        "![category-category-b](category-category-b)",
                    ],
                    values: [],
                    randomizeItems: false,
                },
                version: {major: 0, minor: 0},
            },
            "group 1": {
                type: "group",
                graded: true,
                options: {
                    content:
                        "![group-a](group-a)\n\n![group-b](group-b)\n\n[[☃ image 1]]",
                    images: {},
                    widgets: {
                        "image 1": {
                            type: "image",
                            graded: true,
                            options: {
                                title: "![group-image-title-a](group-image-title-a) ![group-image-title-b](group-image-title-b)",
                                range: [
                                    [0, 10],
                                    [0, 10],
                                ],
                                box: [0, 0],
                                backgroundImage: {
                                    url: "group-image-a",
                                    width: 0,
                                    height: 0,
                                },
                                labels: [],
                                alt: "",
                                caption:
                                    "![group-image-caption-a](group-image-caption-a) ![group-image-caption-b](group-image-caption-b)",
                            },
                            version: {major: 0, minor: 0},
                        },
                    },
                },
                version: {major: 0, minor: 0},
            },
            "image 1": {
                type: "image",
                graded: true,
                options: {
                    title: "![image-title-a](image-title-a) ![image-title-b](image-title-b)",
                    range: [
                        [0, 10],
                        [0, 10],
                    ],
                    box: [0, 0],
                    backgroundImage: {url: "image-a", width: 0, height: 0},
                    labels: [],
                    alt: "",
                    caption:
                        "![image-caption-a](image-caption-a) ![image-caption-b](image-caption-b)",
                },
                version: {major: 0, minor: 0},
            },
            "matcher 1": {
                type: "matcher",
                graded: true,
                options: {
                    left: [
                        "![matcher-left-a](matcher-left-a)",
                        "![matcher-left-b](matcher-left-b)",
                    ],
                    right: [
                        "![matcher-right-a](matcher-right-a)",
                        "![matcher-right-b](matcher-right-b)",
                    ],
                    labels: [
                        "![matcher-label-a](matcher-label-a)",
                        "![matcher-label-b](matcher-label-b)",
                    ],
                    orderMatters: false,
                    padding: true,
                },
                version: {major: 0, minor: 0},
            },
            "matrix 1": {
                type: "matrix",
                graded: true,
                options: {
                    matrixBoardSize: [3, 3],
                    answers: [[]],
                    prefix: "![matrix-prefix-a](matrix-prefix-a) ![matrix-prefix-b](matrix-prefix-b)",
                    suffix: "![matrix-suffix-a](matrix-suffix-a) ![matrix-suffix-b](matrix-suffix-b)",
                    cursorPosition: [0, 0],
                },
                version: {major: 0, minor: 0},
            },
            "orderer 1": {
                type: "orderer",
                graded: true,
                options: {
                    options: [
                        {content: "![orderer-correct-a](orderer-correct-a)"},
                        {content: "![orderer-correct-b](orderer-correct-b)"},
                        {content: "![orderer-other-a](orderer-other-a)"},
                        {content: "![orderer-other-b](orderer-other-b)"},
                    ],
                    correctOptions: [
                        {content: "![orderer-correct-a](orderer-correct-a)"},
                        {content: "![orderer-correct-b](orderer-correct-b)"},
                    ],
                    otherOptions: [
                        {content: "![orderer-other-a](orderer-other-a)"},
                        {content: "![orderer-other-b](orderer-other-b)"},
                    ],
                    height: "normal",
                    layout: "horizontal",
                },
                version: {major: 0, minor: 0},
            },
            "passage 1": {
                type: "passage",
                graded: true,
                options: {
                    passageTitle:
                        "![passage-title-a](passage-title-a) ![passage-title-b](passage-title-b)",
                    passageText: "",
                    footnotes: "",
                    showLineNumbers: true,
                },
                version: {major: 0, minor: 0},
            },
            "radio 1": {
                type: "radio",
                graded: true,
                options: {
                    choices: [
                        {
                            content:
                                "![radio-choice1-a](radio-choice1-a) ![radio-choice1-b](radio-choice1-b)",
                        },
                        {
                            content:
                                "![radio-choice2-a](radio-choice2-a) ![radio-choice2-b](radio-choice2-b)",
                        },
                    ],
                    randomize: false,
                    multipleSelect: false,
                    displayCount: null,
                    hasNoneOfTheAbove: false,
                    onePerLine: true,
                    deselectEnabled: false,
                },
                version: {major: 1, minor: 0},
            },
            "sorter 1": {
                type: "sorter",
                graded: true,
                options: {
                    correct: [
                        "![sorter-correct-a](sorter-correct-a)",
                        "![sorter-correct-b](sorter-correct-b)",
                        "![sorter-correct-c](sorter-correct-c)",
                    ],
                    layout: "horizontal",
                    padding: true,
                },
                version: {major: 0, minor: 0},
            },
            "table 1": {
                type: "table",
                graded: true,
                options: {
                    headers: [
                        "![table-header-a](table-header-a)",
                        "![table-header-b](table-header-b)",
                        "![table-header-c](table-header-c)",
                    ],
                    rows: 4,
                    columns: 3,
                    answers: [
                        ["", "", ""],
                        ["", "", ""],
                        ["", "", ""],
                        ["", "", ""],
                    ],
                },
                version: {major: 0, minor: 0},
            },
            "grapher 1": {
                type: "grapher",
                graded: true,
                options: {
                    correct: {type: "linear", coords: null, asymptote: null},
                    availableTypes: ["linear"],
                    graph: {
                        editableSettings: ["graph", "snap", "image"],
                        range: [
                            [-10, 10],
                            [-10, 10],
                        ],
                        labels: ["x", "y"],
                        step: [1, 1],
                        gridStep: [1, 1],
                        snapStep: [1, 1],
                        valid: true,
                        backgroundImage: {
                            url: "grapher-a",
                            width: 32,
                            height: 32,
                        },
                        markings: "graph",
                        rulerLabel: "",
                        rulerTicks: 10,
                        showProtractor: false,
                        showRuler: false,
                    },
                },
                version: {major: 0, minor: 0},
            },
            "interactive-graph 1": {
                type: "interactive-graph",
                graded: true,
                options: {
                    step: [1, 1],
                    backgroundImage: {
                        url: "interactive-graph-a",
                        width: 32,
                        height: 32,
                    },
                    markings: "graph",
                    labels: ["x", "y"],
                    showProtractor: false,
                    showRuler: false,
                    rulerLabel: "",
                    rulerTicks: 10,
                    range: [
                        [-10, 10],
                        [-10, 10],
                    ],
                    gridStep: [1, 1],
                    snapStep: [0.5, 0.5],
                    graph: {type: "linear"},
                    correct: {type: "linear", coords: null},
                },
                version: {major: 0, minor: 0},
            },
            "plotter 1": {
                type: "plotter",
                graded: true,
                options: {
                    correct: [1, 1],
                    starting: [1, 1],
                    type: "pic",
                    labels: ["", ""],
                    categories: ["a", "a"],
                    scaleY: 1,
                    maxY: 10,
                    snapsPerLine: 2,
                    labelInterval: 1,
                    picUrl: "plotter-a",
                },
                version: {major: 0, minor: 0},
            },
        },
    },
    answerArea: {calculator: false},
    itemDataVersion: {major: 0, minor: 1},
    hints: [
        {
            content:
                "![hint1-a](hint1-a)\n\n![hint1-b](hint1-b)\n\n[[☃ image 1]]",
            images: {},
            widgets: {
                "image 1": {
                    type: "image",
                    graded: true,
                    options: {
                        title: "![hint1-image-title-a](hint1-image-title-a) ![hint1-image-title-b](hint1-image-title-b)",
                        range: [
                            [0, 10],
                            [0, 10],
                        ],
                        box: [0, 0],
                        backgroundImage: {
                            url: "hint1-image-a",
                            width: 0,
                            height: 0,
                        },
                        labels: [],
                        alt: "",
                        caption:
                            "![hint1-image-caption-a](hint1-image-caption-a) ![hint1-image-caption-b](hint1-image-caption-b)",
                    },
                    version: {major: 0, minor: 0},
                },
            },
        },
        {
            content:
                "![hint2-a](hint2-a)\n\n![hint2-b](hint2-b)\n\n[[☃ image 1]]",
            images: {},
            widgets: {
                "image 1": {
                    type: "image",
                    graded: true,
                    options: {
                        title: "![hint2-image-title-a](hint2-image-title-a) ![hint2-image-title-b](hint2-image-title-b)",
                        range: [
                            [0, 10],
                            [0, 10],
                        ],
                        box: [0, 0],
                        backgroundImage: {
                            url: "hint2-image-a",
                            width: 0,
                            height: 0,
                        },
                        labels: [],
                        alt: "",
                        caption:
                            "![hint2-image-caption-a](hint2-image-caption-a) ![hint2-image-caption-b](hint2-image-caption-b)",
                    },
                    version: {major: 0, minor: 0},
                },
            },
        },
    ],
} as const;

// Article perseus format is very similar to exercises and should parse the
// same way, but should just be a list of renders.  So we reuse the test data
// from exerciseImagesEverywhere, but include the question and hints as if they
// were paragraphs in the article.
const articleImagesEverywhere = [exerciseImagesEverywhere.question].concat(
    // @ts-expect-error - TS2769 - No overload matches this call.
    exerciseImagesEverywhere.hints,
);

// All of the images that are in the `exerciseImagesEverywhere` item.  Also the
// same list of images that are in the `articleImagesEverywhere` item.
const allImages = [
    "question-a",
    "question-b",
    "category-category-a",
    "category-category-b",
    "category-item-a",
    "category-item-b",
    "group-a",
    "group-b",
    "group-image-title-a",
    "group-image-title-b",
    "group-image-a",
    "group-image-caption-a",
    "group-image-caption-b",
    "image-title-a",
    "image-title-b",
    "image-a",
    "image-caption-a",
    "image-caption-b",
    "matcher-label-a",
    "matcher-label-b",
    "matcher-left-a",
    "matcher-left-b",
    "matcher-right-a",
    "matcher-right-b",
    "matrix-prefix-a",
    "matrix-prefix-b",
    "matrix-suffix-a",
    "matrix-suffix-b",
    "orderer-correct-a",
    "orderer-correct-b",
    "orderer-other-a",
    "orderer-other-b",
    "passage-title-a",
    "passage-title-b",
    "radio-choice1-a",
    "radio-choice1-b",
    "radio-choice2-a",
    "radio-choice2-b",
    "sorter-correct-a",
    "sorter-correct-b",
    "sorter-correct-c",
    "table-header-a",
    "table-header-b",
    "table-header-c",
    "grapher-a",
    "interactive-graph-a",
    "plotter-a",
    "hint1-a",
    "hint1-a",
    "hint1-image-title-a",
    "hint1-image-title-b",
    "hint1-image-a",
    "hint1-image-caption-a",
    "hint1-image-caption-b",
    "hint2-a",
    "hint2-a",
    "hint2-image-title-a",
    "hint2-image-title-b",
    "hint2-image-a",
    "hint2-image-caption-a",
    "hint2-image-caption-b",
];

describe("i18n", () => {
    beforeAll(() => {
        registerAllWidgetsAndEditorsForTesting();
    });

    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    describe("Exercise image finding", () => {
        it("should find all of the images in items", () => {
            const foundImages = i18n.findImagesInItemData(
                exerciseImagesEverywhere,
            );

            expect(foundImages.length <= allImages.length).toBeTruthy();

            _.each(allImages, (image) => {
                expect(foundImages.indexOf(image) !== -1).toBeTruthy();
            });
        });
    });

    describe("Article image finding", () => {
        it("should find all of the images in items", () => {
            const foundImages = i18n.findImagesInArticles(
                articleImagesEverywhere,
            );

            expect(foundImages.length <= allImages.length).toBeTruthy();

            _.each(allImages, (image) => {
                expect(foundImages.indexOf(image) !== -1).toBeTruthy();
            });
        });
    });

    describe("Multi-item image finding", () => {
        it("should find all of the images in each leaf node", () => {
            const foundImages = i18n.findImagesInItemData({
                _multi: {
                    question: {
                        __type: "content",
                        ...exerciseImagesEverywhere.question,
                    },
                    hints: exerciseImagesEverywhere.hints.map((hint) => ({
                        __type: "hint",
                        ...hint,
                    })),
                },
            });

            expect(foundImages.length <= allImages.length).toBeTruthy();

            _.each(allImages, (image) => {
                expect(foundImages.indexOf(image) !== -1).toBeTruthy();
            });
        });
    });
});
