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
                "options": {
                    "passageNumber": 1,
                    "referenceNumber": 1
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
                "options": {
                    "content": "[[☃ passage-ref 1]] (\"hi ... there\")",
                    "images": {},
                    "widgets": {
                        "passage-ref 1": {
                            "type": "passage-ref",
                            "graded": true,
                            "options": {
                                "passageNumber": 1,
                                "referenceNumber": 1
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
            },
            "passage-ref 1": {
                "type": "passage-ref",
                "graded": true,
                "options": {
                    "passageNumber": 1,
                    "referenceNumber": 1
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

var assertNonMutative = () => {
    assert.deepEqual(sampleItem, clonedSampleItem);
    assert.deepEqual(sampleGroupItem, clonedSampleGroupItem);
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
                "options": {
                    "passageNumber": 1,
                    "referenceNumber": 1,
                    "summaryText": "hi ... there"
                },
                "version": {
                    "major": 0,
                    // TODO(aria): Update this when we do minor updates as
                    // a part of version upgrading
                    "minor": 0
                }
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
                "options": {
                    "passageNumber": 1,
                    "referenceNumber": 1,
                    "summaryText": "hi ... there"
                },
                "version": {
                    "major": 0,
                    // TODO(aria): Update this when we merge the passage-ref
                    // changes
                    "minor": 0
                }
            }
        );
        assertNonMutative();
    });

});
