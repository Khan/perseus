require("../all-widgets.js");

var assert = require("assert");
var a11y = require("../a11y.js");

var noWidgets = {
    "question": {
        "content": "Hello, world!",
        "images": {},
        "widgets": {}
    },
    "answerArea": {
        "type": "multiple",
        "options": {
            "content": "",
            "images": {},
            "widgets": {}
        },
        "calculator": false
    },
    "itemDataVersion": {
        "major": 0,
        "minor": 1
    },
    "hints": []
}

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
                            "correct": true
                        },
                        {
                            "content": "goodbye",
                            "correct": false
                        }
                    ],
                    "randomize": false,
                    "multipleSelect": false,
                    "displayCount": null,
                    "hasNoneOfTheAbove": false,
                    "onePerLine": true,
                    "deselectEnabled": false
                },
                "version": {
                    "major": 1,
                    "minor": 0
                }
            }
        }
    },
    "answerArea": {
        "type": "multiple",
        "options": {
            "content": "",
            "images": {},
            "widgets": {}
        },
        "calculator": false
    },
    "itemDataVersion": {
        "major": 0,
        "minor": 1
    },
    "hints": []
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
                            "correct": true
                        },
                        {
                            "content": "goodbye",
                            "correct": false
                        }
                    ],
                    "randomize": false,
                    "multipleSelect": false,
                    "displayCount": null,
                    "hasNoneOfTheAbove": false,
                    "onePerLine": true,
                    "deselectEnabled": false
                },
                "version": {
                    "major": 1,
                    "minor": 0
                }
            },
            "matrix 1": {
                "type": "matrix",
                "graded": true,
                "options": {
                    "matrixBoardSize": [
                        3,
                        3
                    ],
                    "answers": [
                        []
                    ],
                    "prefix": "",
                    "suffix": "",
                    "cursorPosition": [
                        0,
                        0
                    ]
                },
                "version": {
                    "major": 0,
                    "minor": 0
                }
            }
        }
    },
    "answerArea": {
        "type": "multiple",
        "options": {
            "content": "",
            "images": {},
            "widgets": {}
        },
        "calculator": false
    },
    "itemDataVersion": {
        "major": 0,
        "minor": 1
    },
    "hints": []
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
        });
    });
});
