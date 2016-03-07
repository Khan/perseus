/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var assert = require("assert");
var _ = require("underscore");

var Traversal = require("../traversal.jsx");
var Widgets = require("../widgets.js");

var traverse = Traversal.traverseRendererDeep;

var missingOptions = {
    "content": "[[☃ radio 1]]\n\n",
    "images": {},
    "widgets": {
        "radio 1": {
            "type": "radio",
            "graded": true,
            "static": false,
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
            },
            "version": {
                "major": 0,
                "minor": 0,
            },
            "alignment": "default",
        },
    },
};

var clonedMissingOptions = JSON.parse(JSON.stringify(
    missingOptions
));

var sampleOptions = {
    "content": "[[☃ input-number 1]]",
    "images": {},
    "widgets": {
        "input-number 1": {
            "type": "input-number",
            "graded": true,
            "static": false,
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
            "alignment": "default",
        },
    },
};

var clonedSampleOptions = JSON.parse(JSON.stringify(
    sampleOptions
));

var sampleOptions2 = {
    "content": "[[☃ radio 1]]\n\n",
    "images": {},
    "widgets": {
        "radio 1": {
            "type": "radio",
            "graded": true,
            "static": false,
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
            "alignment": "default",
        },
    },
};

var clonedSampleOptions2 = JSON.parse(JSON.stringify(
    sampleOptions2
));

var sampleOptions2Upgraded = {
    "content": "[[☃ radio 1]]\n\n",
    "images": {},
    "widgets": {
        "radio 1": {
            "type": "radio",
            "graded": true,
            "static": false,
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
                "hasNoneOfTheAbove": false,
                "onePerLine": true,
                "deselectEnabled": false,
            },
            "version": {
                "major": 1,
                "minor": 0,
            },
            "alignment": "default",
        },
    },
};

var sampleGroup = {
    "content": "[[☃ group 1]]\n\n",
    "images": {},
    "widgets": {
        "group 1": {
            "type": "group",
            "graded": true,
            "static": false,
            "options": {
                "content": "[[☃ radio 1]]\n\n",
                "images": {},
                "widgets": {
                    "radio 1": {
                        "type": "radio",
                        "graded": true,
                        "static": false,
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
                        "alignment": "default",
                    },
                },
            },
            "version": {
                "major": 0,
                "minor": 0,
            },
            "alignment": "default",
        },
    },
};

var sampleGroupUpgraded = {
    "content": "[[☃ group 1]]\n\n",
    "images": {},
    "widgets": {
        "group 1": {
            "type": "group",
            "graded": true,
            "static": false,
            "options": {
                "content": "[[☃ radio 1]]\n\n",
                "images": {},
                "widgets": {
                    "radio 1": {
                        "type": "radio",
                        "graded": true,
                        "static": false,
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
                            "hasNoneOfTheAbove": false,
                            "onePerLine": true,
                            "deselectEnabled": false,
                        },
                        "version": {
                            "major": 1,
                            "minor": 0,
                        },
                        "alignment": "default",
                    },
                },
                "metadata": undefined,
            },
            "version": {
                "major": 0,
                "minor": 0,
            },
            "alignment": "default",
        },
    },
};

var clonedSampleGroup = JSON.parse(JSON.stringify(
    sampleGroup
));

var assertNonMutative = () => {
    assert.deepEqual(missingOptions, clonedMissingOptions);
    assert.deepEqual(sampleOptions, clonedSampleOptions);
    assert.deepEqual(sampleOptions2, clonedSampleOptions2);
    assert.deepEqual(sampleGroup, clonedSampleGroup);
};

describe("Traversal", () => {
    it("should call a root level content field", () => {
        var readContent = null;
        traverse(sampleOptions, (content) => {
            assert(readContent === null, "Content was read multiple times :(");
            readContent = content;
        });

        assert.strictEqual(readContent, "[[☃ input-number 1]]");
        assertNonMutative();
    });

    it("should be able to modify root level content", () => {
        var newOptions = traverse(sampleOptions, (content) => {
            return "new content text";
        });
        assert.deepEqual(newOptions, _.extend({}, sampleOptions, {
            content: "new content text",
        }));
        assertNonMutative();
    });

    it("should have access to widgets", () => {
        var widgetMap = {};
        traverse(sampleOptions, null, (widgetInfo) => {
            widgetMap[widgetInfo.type] = (widgetMap[widgetInfo.type] || 0) + 1;
        });
        assert.deepEqual(widgetMap, {
            "input-number": 1,
        });
        assertNonMutative();
    });

    it("should be able to modify widgetInfo", () => {
        var newOptions = traverse(sampleOptions, null, (widgetInfo) => {
            return _.extend({}, widgetInfo, {
                graded: false,
            });
        });
        assert.deepEqual(newOptions, _.extend({}, sampleOptions, {
            widgets: {
                "input-number 1": _.extend({},
                    sampleOptions.widgets["input-number 1"],
                    {graded: false}
                ),
            },
        }));
        assertNonMutative();
    });

    it("should have access to modify full renderer options", () => {
        var newOptions = traverse(sampleOptions, null, null, (options) => {
            return _.extend({}, options, {
                content: `${options.content}\n\nnew content!`,
            });
        });
        assert.strictEqual(
            newOptions.content,
            "[[☃ input-number 1]]\n\nnew content!"
        );
        assert.deepEqual(newOptions.widgets, sampleOptions.widgets);
        assertNonMutative();
    });

    it("should upgrade widgets automagickally", () => {
        var newOptions = traverse(sampleOptions2);
        assert.deepEqual(newOptions, sampleOptions2Upgraded);
        assertNonMutative();
    });

    it("should use defaults for missing options when upgrading widgets",
        () => {
            var newOptions = traverse(missingOptions);
            assert.deepEqual(newOptions, sampleOptions2Upgraded);
            assertNonMutative();
        }
    );

    it("should be able to see group widgets", () => {
        var widgetMap = {};
        traverse(sampleGroup, null, (widgetInfo) => {
            widgetMap[widgetInfo.type] = (widgetMap[widgetInfo.type] || 0) + 1;
        });
        assert.deepEqual(widgetMap, {
            group: 1,
            radio: 1,
        });
        assertNonMutative();
    });

    it("should see upgraded widgets inside groups", () => {
        var sawRadio = false;
        traverse(sampleGroup, null, (widgetInfo) => {
            if (widgetInfo.type === "radio") {
                assert.deepEqual(
                    widgetInfo.version,
                    Widgets.getVersion("radio")
                );
                sawRadio = true;
            }
        });
        assert.strictEqual(sawRadio, true);
        assertNonMutative();
    });

    it("should upgrade widgets in groups automagickally", () => {
        var newGroup = traverse(sampleGroup);
        assert.deepEqual(newGroup, sampleGroupUpgraded);
        assertNonMutative();
    });

    it("should modify full renderer options inside of groups", () => {
        var newOptions = traverse(sampleGroup, null, null, (options) => {
            if (/radio/.test(options.content)) {
                return _.extend({}, options, {
                    content: "Extra instructions\n\n" + options.content,
                });
            } else {
                return undefined;
            }
        });
        var newContent = newOptions.widgets["group 1"].options.content;
        assert.ok(
            /^Extra instructions/.test(newContent),
            "newContent was: " + newContent
        );
        assert.deepEqual(
            newOptions.widgets["group 1"].options.widgets,
            sampleGroupUpgraded.widgets["group 1"].options.widgets
        );
        assertNonMutative();
    });
});
