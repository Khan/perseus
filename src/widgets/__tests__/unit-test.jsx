var assert = require("assert");
// var Perseus = require("../../perseus.js");

// var TestUtils = React.addons.TestUtils;
// var delayedPromise = require("../../testutils/delayed-promise.jsx");

var { getWidget, countSigfigs } = require("../unit.jsx");
var UnitWidget = getWidget();

describe("countSigfigs", () => {
    it("gets a few simple cases right", () => {
        assert.equal(countSigfigs("5"), 1);
        assert.equal(countSigfigs("500"), 1);
        assert.equal(countSigfigs("5.00"), 3);
        assert.equal(countSigfigs("5.01"), 3);
        assert.equal(countSigfigs("05.01"), 3);
    });
});

describe("Unit Widget Grading", () => {
    it("accepts correct answers", () => {
        var maybeValid = UnitWidget.validate("5 tbsp", {
            value: "5 tbsp",
            accepting: UnitWidget.all,
            sigfigs: 1,
        });
        assert.equal(maybeValid.earned, 1);

        var maybeValid = UnitWidget.validate("0.0739 L", {
            value: "5.00 tbsp",
            accepting: UnitWidget.all,
            sigfigs: 3,
        });
        assert.equal(maybeValid.earned, 1);

        var maybeValid = UnitWidget.validate("5.00 tbsp", {
            value: "0.0739 L",
            accepting: UnitWidget.all,
            sigfigs: 3,
        });
        assert.equal(maybeValid.earned, 1);
    });

    it("flags incorrect units", () => {
        var maybeValid = UnitWidget.validate("5 tbsp", {
            value: "5 m",
            accepting: UnitWidget.all,
            sigfigs: 1,
        });
        assert.equal(maybeValid.earned, 0);
        assert.equal(maybeValid.message, "Check your units.");
    });

    it("flags incorrect sigfigs", () => {
        var maybeValid = UnitWidget.validate("5.0 tbsp", {
            value: "5 tbsp",
            accepting: UnitWidget.all,
            sigfigs: 1,
        });
        assert.equal(maybeValid.earned, 0);
        assert.equal(maybeValid.message, "Check your significant figures.");

        var maybeValid = UnitWidget.validate("5 tbsp", {
            value: "5.0 tbsp",
            accepting: UnitWidget.all,
            sigfigs: 2,
        });
        assert.equal(maybeValid.earned, 0);
        assert.equal(maybeValid.message, "Check your significant figures.");
    });

    it("flags numerically incorrect answers", () => {
        var maybeValid = UnitWidget.validate("8.1 tbsp", {
            value: "5.0 tbsp",
            accepting: UnitWidget.all,
            sigfigs: 2,
        });
        assert.equal(maybeValid.earned, 0);
        assert.equal(
            maybeValid.message,
            "That answer is numerically incorrect."
        );
    });
});
