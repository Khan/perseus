// File for testing that the bundled node-perseus.js works. Any functions that
// we use outside of perseus should be tested here.
const assert = require("assert");

describe("Node-perseus", function() {
    it("should be requireable", function() {
        require("../../build/node-perseus");
    });

    it("should return something reasonable", function() {
        const Perseus = require("../../build/node-perseus");

        assert(Perseus.init, "Perseus should contain an init method");
        assert(Perseus.renderability,
               "Perseus should contain renderability functions");
    });

    it("should not fail when running things", function() {
        const Perseus = require("../../build/node-perseus");

        assert.strictEqual(Perseus.Util.firstNumericalParse("1 / 2"), 0.5);
    });
});

describe("Node accessibility", function() {
    const Perseus = require("../../build/node-perseus");

    const badItemData = {"question":{"content":"fdsafdsa\n\n[[☃ interactive-graph 1]]\n\n","images":{},"widgets":{"interactive-graph 1":{"type":"interactive-graph","graded":true,"options":{"step":[1,1],"backgroundImage":{"url":null},"markings":"graph","labels":["x","y"],"showProtractor":false,"showRuler":false,"rulerLabel":"","rulerTicks":10,"range":[[-10,10],[-10,10]],"graph":{"type":"linear"},"correct":{"type":"linear","coords":null}},"version":{"major":0,"minor":0}}}},"answerArea":{"calculator":false},"itemDataVersion":{"major":0,"minor":1},"hints":[{"content":"fdsa","images":{},"widgets":{}}]}; // @Nolint

    const goodItemData = {"question":{"content":"fdsadfasdf\n\n![alt text!](hello)\n\n[[☃ radio 1]]\n\n","images":{},"widgets":{"radio 1":{"type":"radio","graded":true,"options":{"choices":[{"content":"f","correct":false},{"content":"f","correct":true}],"randomize":false,"multipleSelect":false,"displayCount":null,"hasNoneOfTheAbove":false,"onePerLine":true,"deselectEnabled":false},"version":{"major":1,"minor":0}}}},"answerArea":{"calculator":false},"itemDataVersion":{"major":0,"minor":1},"hints":[]}; // @Nolint

    it("should detect bad widgets", function() {
        assert.deepEqual(
            Perseus.accessibility.violatingWidgets(badItemData),
            ["interactive-graph"]
        );
    });

    it("should be fine with good items", function() {
        assert.deepEqual(
            Perseus.accessibility.violatingWidgets(goodItemData),
            []
        );
    });
});

describe("Node renderability", function() {
    const Perseus = require("../../build/node-perseus");

    // These tests were stolen from src/__tests__/renderability-test.jsx
    const sampleV1MeasurerItem = {"question": {"content": "[[☃ measurer 1]]", "images": {}, "widgets": {"measurer 1": {"type": "measurer", "graded": true, "options": {"box": [480, 480], "image": {}, "showProtractor": true, "showRuler": false, "rulerLabel": "", "rulerTicks": 10, "rulerPixels": 40, "rulerLength": 10}, "version": {"major": 1, "minor": 0}}}}, "answerArea": {"calculator": false}, "itemDataVersion": {"major": 0, "minor": 1}, "hints": []}; // @Nolint

    const inputOnlyPerseusVersion = {
        '::renderer::': {major: 100, minor: 0},
        'group': {major: 100, minor: 0},
        'sequence': {major: 100, minor: 0},
        'input-number': {major: 100, minor: 0},
        'numeric-input': {major: 100, minor: 0},
    };

    it("should detect renderability", function() {
        assert.strictEqual(
            Perseus.renderability.isItemRenderableByVersion(
                sampleV1MeasurerItem,
                Perseus.itemVersion
            ),
            true
        );

        assert.strictEqual(
            Perseus.renderability.isItemRenderableByVersion(
                sampleV1MeasurerItem,
                inputOnlyPerseusVersion
            ),
            false
        );
    });
});
