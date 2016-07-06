/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const allWidgets = require("../all-widgets.js");
const Widgets = require("../widgets.js");
Widgets.registerMany(allWidgets);

var assert = require("assert");
var a11y = require("../a11y.js");

var noWidgets = {
    "question": {
        "content": "Hello, world!",
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

var oneAccessibleWidget = {
    "question": {
        "content": "Hello, world!\n\n[[☃ radio 1]]",
        "images": {},
        "widgets": {
            "radio 1": {
                "type": "radio",
                "graded": true,
                "options": {
                    "choices": [
                        {
                            "content": "hello",
                            "correct": true,
                        },
                        {
                            "content": "goodbye",
                            "correct": false,
                        },
                    ],
                    "randomize": false,
                    "multipleSelect": false,
                    "displayCount": null,
                    "hasNoneOfTheAbove": false,
                    "onePerLine": true,
                    "deselectEnabled": false,
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

var oneInaccessibleWidget = {
    "question": {
        "content": "Hello, world!\n\n[[☃ radio 1]]\n\n[[☃ matrix 1]]\n\n",
        "images": {},
        "widgets": {
            "radio 1": {
                "type": "radio",
                "graded": true,
                "options": {
                    "choices": [
                        {
                            "content": "hello",
                            "correct": true,
                        },
                        {
                            "content": "goodbye",
                            "correct": false,
                        },
                    ],
                    "randomize": false,
                    "multipleSelect": false,
                    "displayCount": null,
                    "hasNoneOfTheAbove": false,
                    "onePerLine": true,
                    "deselectEnabled": false,
                },
                "version": {
                    "major": 1,
                    "minor": 0,
                },
            },
            "matrix 1": {
                "type": "matrix",
                "graded": true,
                "options": {
                    "matrixBoardSize": [
                        3,
                        3,
                    ],
                    "answers": [
                        [],
                    ],
                    "prefix": "",
                    "suffix": "",
                    "cursorPosition": [
                        0,
                        0,
                    ],
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

var imageWithAltText = {
    "question": {
        "content": "hello\n\n[[☃ image 1]]\n\n",
        "images": {},
        "widgets": {
            "image 1": {
                "type": "image",
                "graded": true,
                "options": {
                    "title": "",
                    "range": [
                        [
                            0,
                            10,
                        ],
                        [
                            0,
                            10,
                        ],
                    ],
                    "box": [
                        350,
                        150,
                    ],
                    "backgroundImage": {
                        "url": "http://placehold.it/350x150",
                        "width": 350,
                        "height": 150,
                    },
                    "labels": [],
                    "alt": "oh cool",
                    "caption": "",
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

var imageWithoutAltText = {
    "question": {
        "content": "hello\n\n[[☃ image 1]]\n\n",
        "images": {},
        "widgets": {
            "image 1": {
                "type": "image",
                "graded": true,
                "options": {
                    "title": "",
                    "range": [
                        [
                            0,
                            10,
                        ],
                        [
                            0,
                            10,
                        ],
                    ],
                    "box": [
                        350,
                        150,
                    ],
                    "backgroundImage": {
                        "url": "http://placehold.it/350x150",
                        "width": 350,
                        "height": 150,
                    },
                    "labels": [],
                    "alt": "",
                    "caption": "",
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

var emptyImageWithoutAltText = {
    "question": {
        "content": "hello\n\n[[☃ image 1]]\n\n",
        "images": {},
        "widgets": {
            "image 1": {
                "type": "image",
                "graded": true,
                "options": {
                    "title": "",
                    "range": [
                        [
                            0,
                            10,
                        ],
                        [
                            0,
                            10,
                        ],
                    ],
                    "box": [
                        350,
                        150,
                    ],
                    "labels": [],
                    "alt": "",
                    "caption": "",
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

describe("a11y", () => {
    describe("violatingWidgets", () => {
        describe("Current Perseus Version", () => {
            it("should pass for no widgets", () => {
                var result = a11y.violatingWidgets(noWidgets);
                assert.strictEqual(result.length, 0);
            });

            it("should pass for accessible widgets", () => {
                var result = a11y.violatingWidgets(oneAccessibleWidget);
                assert.strictEqual(result.length, 0);
            });

            it("should pick out out inaccessible widgets", () => {
                // NOTE: when the matrix widget is accessible this will fail
                var result = a11y.violatingWidgets(oneInaccessibleWidget);
                assert.strictEqual(result.length, 1);
                assert.strictEqual(result[0], "matrix");
            });

            it("should pass for images with alt text", () => {
                var result = a11y.violatingWidgets(imageWithAltText);
                assert.strictEqual(result.length, 0);
            });

            it("should pick out images without alt text", () => {
                var result = a11y.violatingWidgets(imageWithoutAltText);
                assert.strictEqual(result.length, 1);
                assert.strictEqual(result[0], "image");
            });

            it("should ignore blank images", () => {
                var result = a11y.violatingWidgets(emptyImageWithoutAltText);
                assert.strictEqual(result.length, 0);
            });
        });
    });
});
