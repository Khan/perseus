/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable object-curly-spacing */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const assert = require("assert");
const Renderability = require("../renderability.jsx");
const PerseusItemVersion = require("../item-version.js");

const sampleItemNoWidgets = {
    "question": {
        "content": "hi 14",
        "images": {},
        "widgets": {},
    },
    "answerArea": {
        "calculator": false,
    },
    "itemDataVersion": {
        "major": 0,
        "minor": 1,
    },
    "hints": [],
};

const sampleV0InputNumberItem = {
    "question": {
        "content": "[[☃ input-number 1]]",
        "images": {},
        "widgets": {
            "input-number 1": {
                "type": "input-number",
                "graded": true,
                "options": {
                    "value": "0",
                    "simplify": "required",
                    "size": "normal",
                    "inexact": false,
                    "maxError": 0.1,
                    "answerType": "number",
                },
                "version": {
                    "major": 0,
                    "minor": 0,
                },
            },
        },
    },
    "answerArea": {
        "calculator": false,
    },
    "itemDataVersion": {
        "major": 0,
        "minor": 1,
    },
    "hints": [],
};

const sampleV1MeasurerItem = {
    "question": {
        "content": "[[☃ measurer 1]]",
        "images": {},
        "widgets": {
            "measurer 1": {
                "type": "measurer",
                "graded": true,
                "options": {
                    "box": [
                        480,
                        480,
                    ],
                    "image": {},
                    "showProtractor": true,
                    "showRuler": false,
                    "rulerLabel": "",
                    "rulerTicks": 10,
                    "rulerPixels": 40,
                    "rulerLength": 10,
                },
                "version": {
                    "major": 1,
                    "minor": 0,
                },
            },
        },
    },
    "answerArea": {
        "calculator": false,
    },
    "itemDataVersion": {
        "major": 0,
        "minor": 1,
    },
    "hints": [],
};

const sampleImpossibleWidgetsItem = {
    "question": {
        "content": "[[☃ impossible-to-render-widget 1]]",
        "images": {},
        "widgets": {
            "impossible-to-render-widget 1": {
                "type": "impossible-to-render-widget",
                "graded": true,
                "options": {},
                "version": {
                    "major": 0,
                    "minor": 0,
                },
            },
        },
    },
    "answerArea": {
        "calculator": false,
    },
    "itemDataVersion": {
        "major": 0,
        "minor": 1,
    },
    "hints": [],
};

const IMPOSSIBLY_HIGH_VERSION_NUMBER = 68921;
const sampleImpossibleInputNumberItem1 = {
    "question": {
        "content": "[[☃ input-number 1]]",
        "images": {},
        "widgets": {
            "input-number 1": {
                "type": "input-number",
                "graded": true,
                "options": {
                    "value": "0",
                    "simplify": "required",
                    "size": "normal",
                    "inexact": false,
                    "maxError": 0.1,
                    "answerType": "number",
                },
                "version": {
                    "major": IMPOSSIBLY_HIGH_VERSION_NUMBER,
                    "minor": 0,
                },
            },
        },
    },
    "answerArea": {
        "calculator": false,
    },
    "itemDataVersion": {
        "major": 0,
        "minor": 1,
    },
    "hints": [],
};
const sampleImpossibleInputNumberItem2 = {
    "question": {
        "content": "[[☃ input-number 1]]",
        "images": {},
        "widgets": {
            "input-number 1": {
                "type": "input-number",
                "graded": true,
                "options": {
                    "value": "0",
                    "simplify": "required",
                    "size": "normal",
                    "inexact": false,
                    "maxError": 0.1,
                    "answerType": "number",
                },
                "version": {
                    "major": IMPOSSIBLY_HIGH_VERSION_NUMBER,
                    "minor": IMPOSSIBLY_HIGH_VERSION_NUMBER,
                },
            },
        },
    },
    "answerArea": {
        "calculator": false,
    },
    "itemDataVersion": {
        "major": 0,
        "minor": 1,
    },
    "hints": [],
};

const sampleEmptyGroupItem = {
    "question": {
        "content": "[[☃ group 1]]\n\n",
        "images": {},
        "widgets": {
            "group 1": {
                "type": "group",
                "graded": true,
                "options": {
                    "content": "",
                    "images": {},
                    "widgets": {},
                },
                "version": {
                    "major": 0,
                    "minor": 0,
                },
            },
        },
    },
    "answerArea": {
        "calculator": false,
    },
    "itemDataVersion": {
        "major": 0,
        "minor": 1,
    },
    "hints": [],
};

const sampleGroupWithInputNumberItem = {
    "question": {
        "content": "[[☃ group 1]]\n\n",
        "images": {},
        "widgets": {
            "group 1": {
                "type": "group",
                "graded": true,
                "options": {
                    "content": "[[☃ input-number 1]]",
                    "images": {},
                    "widgets": {
                        "input-number 1": {
                            "type": "input-number",
                            "graded": true,
                            "options": {
                                "value": 0,
                                "simplify": "required",
                                "size": "normal",
                                "inexact": false,
                                "maxError": 0.1,
                                "answerType": "number",
                            },
                            "version": {
                                "major": 0,
                                "minor": 0,
                            },
                        },
                    },
                },
                "version": {
                    "major": 0,
                    "minor": 0,
                },
            },
        },
    },
    "answerArea": {
        "calculator": false,
    },
    "itemDataVersion": {
        "major": 0,
        "minor": 1,
    },
    "hints": [],
};

const sampleGroupWithRadioItem = {
    "question": {
        "content": "[[☃ group 1]]\n\n",
        "images": {},
        "widgets": {
            "group 1": {
                "type": "group",
                "graded": true,
                "options": {
                    "content": "[[☃ radio 1]]\n\n",
                    "images": {},
                    "widgets": {
                        "radio 1": {
                            "type": "radio",
                            "graded": true,
                            "options": {
                                "choices": [
                                    {
                                        "content": "A",
                                        "correct": true,
                                    },
                                    {
                                        "correct": false,
                                        "content": "B",
                                    },
                                ],
                                "randomize": false,
                                "multipleSelect": false,
                                "displayCount": null,
                                "noneOfTheAbove": false,
                                "onePerLine": true,
                                "deselectEnabled": false,
                            },
                            "version": {
                                "major": 0,
                                "minor": 0,
                            },
                        },
                    },
                },
                "version": {
                    "major": 0,
                    "minor": 0,
                },
            },
        },
    },
    "answerArea": {
        "calculator": false,
    },
    "itemDataVersion": {
        "major": 0,
        "minor": 1,
    },
    "hints": [],
};

describe("Renderability", () => {
    describe("isItemRenderableByVersion", () => {
        describe("Current Perseus Version", () => {
            it("should be renderable with no widgets", () => {
                const result = Renderability.isItemRenderableByVersion(
                    sampleItemNoWidgets,
                    PerseusItemVersion
                );
                assert.strictEqual(result, true);
            });

            it("should be able to render v0 or v1 widgets", () => {
                const result1 = Renderability.isItemRenderableByVersion(
                    sampleV0InputNumberItem,
                    PerseusItemVersion
                );
                const result2 = Renderability.isItemRenderableByVersion(
                    sampleV1MeasurerItem,
                    PerseusItemVersion
                );
                assert.strictEqual(result1, true);
                assert.strictEqual(result2, true);
            });

            it("should not be able to render future widgets", () => {
                const result1 = Renderability.isItemRenderableByVersion(
                    sampleImpossibleWidgetsItem,
                    PerseusItemVersion
                );
                const result2 = Renderability.isItemRenderableByVersion(
                    sampleImpossibleInputNumberItem1,
                    PerseusItemVersion
                );
                const result3 = Renderability.isItemRenderableByVersion(
                    sampleImpossibleInputNumberItem2,
                    PerseusItemVersion
                );
                assert.strictEqual(result1, false);
                assert.strictEqual(result2, false);
                assert.strictEqual(result3, false);
            });
        });

        describe("A input-only version of perseus", () => {
            const inputOnlyPerseusVersion = {
                '::renderer::': { major: 100, minor: 0 },
                'group': { major: 100, minor: 0 },
                'sequence': { major: 100, minor: 0 },
                'input-number': { major: 100, minor: 0 },
                'numeric-input': { major: 100, minor: 0 },
            };

            it("should be able to render no widgets", () => {
                const result = Renderability.isItemRenderableByVersion(
                    sampleItemNoWidgets,
                    inputOnlyPerseusVersion
                );
                assert.strictEqual(result, true);
            });

            it("should be able to render just an input-number", () => {
                const result = Renderability.isItemRenderableByVersion(
                    sampleV0InputNumberItem,
                    inputOnlyPerseusVersion
                );
                assert.strictEqual(result, true);
            });

            it("should not be able to render just a measurer", () => {
                const result = Renderability.isItemRenderableByVersion(
                    sampleV1MeasurerItem,
                    inputOnlyPerseusVersion
                );
                assert.strictEqual(result, false);
            });

            it("should be able to render just a group widget", () => {
                const result = Renderability.isItemRenderableByVersion(
                    sampleEmptyGroupItem,
                    inputOnlyPerseusVersion
                );
                assert.strictEqual(result, true);
            });

            it("should be able to render a group with an input number", () => {
                const result = Renderability.isItemRenderableByVersion(
                    sampleGroupWithInputNumberItem,
                    inputOnlyPerseusVersion
                );
                assert.strictEqual(result, true);
            });

            it("should not be able to render a group with a radio", () => {
                const result = Renderability.isItemRenderableByVersion(
                    sampleGroupWithRadioItem,
                    inputOnlyPerseusVersion
                );
                assert.strictEqual(result, false);
            });
        });

        describe("Multi-items", () => {
            it("should be renderable with no items", () => {
                const result = Renderability.isItemRenderableByVersion(
                    {
                        _multi: {
                            questions: [],
                        },
                    },
                    PerseusItemVersion,
                );
                assert.strictEqual(result, true);
            });

            it("should be renderable when all items are", () => {
                const result = Renderability.isItemRenderableByVersion(
                    {
                        _multi: {
                            sharedContext: {
                                __type: "item",
                                ...sampleV0InputNumberItem.question,
                            },
                            questions: [
                                {
                                    __type: "item",
                                    ...sampleV1MeasurerItem.question,
                                },
                            ],
                        },
                    },
                    PerseusItemVersion,
                );
                assert.strictEqual(result, true);
            });

            it("should not be renderable when one item is not", () => {
                const result = Renderability.isItemRenderableByVersion(
                    {
                        _multi: {
                            sharedContext: {
                                __type: "item",
                                ...sampleV0InputNumberItem.question,
                            },
                            questions: [
                                {
                                    __type: "item",
                                    ...sampleImpossibleWidgetsItem.question,
                                },
                                {
                                    __type: "item",
                                    ...sampleV1MeasurerItem.question,
                                },
                            ],
                        },
                    },
                    PerseusItemVersion,
                );
                assert.strictEqual(result, false);
            });
        });
    });
});
