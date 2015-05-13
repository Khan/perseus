var assert = require("assert");
var _ = require("underscore");

var Traversal = require("../traversal.jsx");
var Widgets = require("../widgets.js");

var traverse = Traversal.traverseRendererDeep;

var sampleOptions = {
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
                "answerType": "number"
            },
            "version": {
                "major": 0,
                "minor": 0
            }
        }
    }
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
            "options": {
                "choices": [
                    {
                        "content": "A",
                        "correct": true
                    },
                    {
                        "correct": false,
                        "content": "B"
                    }
                ],
                "randomize": false,
                "multipleSelect": false,
                "displayCount": null,
                "noneOfTheAbove": false,
                "onePerLine": true,
                "deselectEnabled": false
            },
            "version": {
                "major": 0,
                "minor": 0
            }
        }
    }
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
            "options": {
                "choices": [
                    {
                        "content": "A",
                        "correct": true
                    },
                    {
                        "correct": false,
                        "content": "B"
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
};

var sampleGroup = {
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
                                    "correct": true
                                },
                                {
                                    "correct": false,
                                    "content": "B"
                                }
                            ],
                            "randomize": false,
                            "multipleSelect": false,
                            "displayCount": null,
                            "noneOfTheAbove": false,
                            "onePerLine": true,
                            "deselectEnabled": false
                        },
                        "version": {
                            "major": 0,
                            "minor": 0
                        }
                    }
                }
            },
            "version": {
                "major": 0,
                "minor": 0
            }
        }
    }
};

var sampleGroupUpgraded = {
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
                                    "correct": true
                                },
                                {
                                    "correct": false,
                                    "content": "B"
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
            "version": {
                "major": 0,
                "minor": 0
            }
        }
    }
};

var clonedSampleGroup = JSON.parse(JSON.stringify(
    sampleGroup
));

var assertNonMutative = () => {
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

    it("should upgrade widgets automagickally", () => {
        var newOptions = traverse(sampleOptions2);
        assert.deepEqual(newOptions, sampleOptions2Upgraded);
        assertNonMutative();
    });

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

});
