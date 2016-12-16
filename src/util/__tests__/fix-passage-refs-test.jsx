/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var assert = require("assert");
var _ = require("underscore");

var FixPassageRefs = require("../fix-passage-refs.jsx");

var sampleItem = {
    "question": {
        "content": "[[☃ passage-ref 1]] (\"hi ... there\")",
        "images": {},
        "widgets": {
            "passage-ref 1": {
                "type": "passage-ref",
                "graded": true,
                "static": false,
                "options": {
                    "passageNumber": 1,
                    "referenceNumber": 1
                },
                "version": {
                    "major": 0,
                    "minor": 1
                }
            }
        }
    },
    "answerArea": {
        "calculator": false,
        "periodicTable": false
    },
    "itemDataVersion": {
        "major": 0,
        "minor": 1
    },
    "hints": []
};

var sampleGroupItem = {
    "question": {
        "content": "[[☃ group 1]]\n\n",
        "images": {},
        "widgets": {
            "group 1": {
                "type": "group",
                "graded": true,
                "static": false,
                "options": {
                    "content": "[[☃ passage-ref 1]] (\"hi ... there\")",
                    "images": {},
                    "widgets": {
                        "passage-ref 1": {
                            "type": "passage-ref",
                            "graded": true,
                            "static": false,
                            "options": {
                                "passageNumber": 1,
                                "referenceNumber": 1
                            },
                            "version": {
                                "major": 0,
                                "minor": 1
                            }
                        }
                    }
                },
                "version": {
                    "major": 0,
                    "minor": 0
                }
            },
            "passage-ref 1": {
                "type": "passage-ref",
                "graded": true,
                "static": false,
                "options": {
                    "passageNumber": 1,
                    "referenceNumber": 1
                },
                "version": {
                    "major": 0,
                    "minor": 1
                }
            }
        }
    },
    "answerArea": {
        "calculator": false,
        "periodicTable": false
    },
    "itemDataVersion": {
        "major": 0,
        "minor": 1
    },
    "hints": []
};

var sampleRadioItem = {
    "question": {
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
                            "content": "{{passage-ref 1 2}} (\"hi ... there\")"
                        },
                        {}
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
        "calculator": false,
        "periodicTable": false
    },
    "itemDataVersion": {
        "major": 0,
        "minor": 1
    },
    "hints": []
};

var clonedSampleItem = _.clone(sampleItem);
var clonedSampleGroupItem = _.clone(sampleGroupItem);
var clonedSampleRadioItem = _.clone(sampleRadioItem);

var assertNonMutative = () => {
    assert.deepEqual(sampleItem, clonedSampleItem);
    assert.deepEqual(sampleGroupItem, clonedSampleGroupItem);
    assert.deepEqual(sampleRadioItem, clonedSampleRadioItem);
};

describe("fix-passage-refs", () => {
    it("should modify a basic passage ref", () => {
        var newItem = FixPassageRefs(sampleItem);
        assert.strictEqual(
            newItem.question.content,
            "[[☃ passage-ref 1]]"
        );
        assert.deepEqual(
            newItem.question.widgets["passage-ref 1"],
            {
                "type": "passage-ref",
                "graded": true,
                "static": false,
                "options": {
                    "passageNumber": 1,
                    "referenceNumber": 1,
                    "summaryText": "hi ... there"
                },
                "version": {
                    "major": 0,
                    // TODO(aria): Update this when we do minor updates as
                    // a part of version upgrading
                    "minor": 1
                },
                "alignment": "default",
            }
        );
        assertNonMutative();
    });

    it("should modify a passage ref in a group", () => {
        var newItem = FixPassageRefs(sampleGroupItem);
        var group = newItem.question.widgets["group 1"];
        assert.strictEqual(
            group.options.content,
            "[[☃ passage-ref 1]]"
        );
        assert.deepEqual(
            group.options.widgets["passage-ref 1"],
            {
                "type": "passage-ref",
                "graded": true,
                "static": false,
                "options": {
                    "passageNumber": 1,
                    "referenceNumber": 1,
                    "summaryText": "hi ... there"
                },
                "version": {
                    "major": 0,
                    // TODO(aria): Update this when we merge the passage-ref
                    // changes
                    "minor": 1
                },
                "alignment": "default",
            }
        );
        assertNonMutative();
    });

    it("should modify a passage ref in a radio", () => {
        var newItem = FixPassageRefs(sampleRadioItem);
        var radio = newItem.question.widgets["radio 1"];
        assert.strictEqual(
            radio.options.choices[0].content,
            "{{passage-ref 1 2 \"hi ... there\"}}"
        );
        assertNonMutative();
    });

    it("shouldn't modify multi-items", () => {
        const multiItem = {
            _multi: {},
        };
        const result = FixPassageRefs(multiItem);
        assert.strictEqual(result, multiItem);
        assertNonMutative();
    });
});
