const assert = require("assert");
const _ = require("underscore");

const FixPassageRefs = require("../fix-passage-refs.jsx");

const sampleItem = {
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
                    "referenceNumber": 1,
                },
                "version": {
                    "major": 0,
                    "minor": 1,
                },
            },
        },
    },
    "answerArea": {
        "calculator": false,
        "periodicTable": false,
    },
    "itemDataVersion": {
        "major": 0,
        "minor": 1,
    },
    "hints": [],
};

const sampleGroupItem = {
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
                                "referenceNumber": 1,
                            },
                            "version": {
                                "major": 0,
                                "minor": 1,
                            },
                        },
                    },
                },
                "version": {
                    "major": 0,
                    "minor": 0,
                },
            },
            "passage-ref 1": {
                "type": "passage-ref",
                "graded": true,
                "static": false,
                "options": {
                    "passageNumber": 1,
                    "referenceNumber": 1,
                },
                "version": {
                    "major": 0,
                    "minor": 1,
                },
            },
        },
    },
    "answerArea": {
        "calculator": false,
        "periodicTable": false,
    },
    "itemDataVersion": {
        "major": 0,
        "minor": 1,
    },
    "hints": [],
};

const sampleRadioItem = {
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
                            "content": "{{passage-ref 1 2}} (\"hi ... there\")",
                        },
                        {},
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
        "periodicTable": false,
    },
    "itemDataVersion": {
        "major": 0,
        "minor": 1,
    },
    "hints": [],
};

const clonedSampleItem = _.clone(sampleItem);
const clonedSampleGroupItem = _.clone(sampleGroupItem);
const clonedSampleRadioItem = _.clone(sampleRadioItem);

const assertNonMutative = () => {
    assert.deepEqual(sampleItem, clonedSampleItem);
    assert.deepEqual(sampleGroupItem, clonedSampleGroupItem);
    assert.deepEqual(sampleRadioItem, clonedSampleRadioItem);
};

describe("fix-passage-refs", () => {
    it("should modify a basic passage ref", () => {
        const newItem = FixPassageRefs(sampleItem);
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
                    "summaryText": "hi ... there",
                },
                "version": {
                    "major": 0,
                    // TODO(aria): Update this when we do minor updates as
                    // a part of version upgrading
                    "minor": 1,
                },
                "alignment": "default",
            }
        );
        assertNonMutative();
    });

    it("should modify a passage ref in a group", () => {
        const newItem = FixPassageRefs(sampleGroupItem);
        const group = newItem.question.widgets["group 1"];
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
                    "summaryText": "hi ... there",
                },
                "version": {
                    "major": 0,
                    // TODO(aria): Update this when we merge the passage-ref
                    // changes
                    "minor": 1,
                },
                "alignment": "default",
            }
        );
        assertNonMutative();
    });

    it("should modify a passage ref in a radio", () => {
        const newItem = FixPassageRefs(sampleRadioItem);
        const radio = newItem.question.widgets["radio 1"];
        assert.strictEqual(
            radio.options.choices[0].content,
            "{{passage-ref 1 2 \"hi ... there\"}}"
        );
        assertNonMutative();
    });


});
