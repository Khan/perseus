const assert = require("assert");
// const Perseus = require("../../perseus.js");

// const TestUtils = React.addons.TestUtils;
// const delayedPromise = require("../../testutils/delayed-promise.jsx");

const { getWidget, countSigfigs, sigfigPrint } = require("../unit.jsx");
const UnitWidget = getWidget();

describe("countSigfigs", () => {
    it("gets a few simple cases right", () => {
        assert.equal(countSigfigs("5"), 1);
        assert.equal(countSigfigs("500"), 1);
        assert.equal(countSigfigs("5.00"), 3);
        assert.equal(countSigfigs("5.01"), 3);
        assert.equal(countSigfigs("05.01"), 3);
    });
});

describe("displaySigFigs", () => {
    it("gets a few simple cases right", () => {
        assert.equal(sigfigPrint(150, 3), "150.");
        assert.equal(sigfigPrint(0.0005, 2), "5.0 x 10^-4");
        assert.equal(sigfigPrint(15000, 2), "1.5 x 10^4");
        assert.equal(sigfigPrint(50, 2), "50.");
    });
});

describe("Unit Widget Grading", () => {
    it("accepts correct answers", () => {
        {
            const maybeValid = UnitWidget.validate("5 tbsp", {
                value: "5 tbsp",
                accepting: "all",
                sigfigs: 1,
            });
            assert.equal(maybeValid.earned, 1);
        }

        {
            const maybeValid = UnitWidget.validate("0.0739 L", {
                value: "5.00 tbsp",
                accepting: "all",
                sigfigs: 3,
            });
            assert.equal(maybeValid.earned, 1);
        }

        {
            const maybeValid = UnitWidget.validate("5.00 tbsp", {
                value: "0.0739 L",
                accepting: "all",
                sigfigs: 3,
            });
            assert.equal(maybeValid.earned, 1);
        }

        {
            const maybeValid = UnitWidget.validate("1124 lb", {
                value: "5000 N",
                accepting: "all",
                sigfigs: 4,
            });
            assert.equal(maybeValid.earned, 1);
        }

        {
            const maybeValid = UnitWidget.validate("1124 lb", {
                value: "5000 N",
                accepting: "some",
                acceptingUnits: ["lb"],
                sigfigs: 4,
            });
            assert.equal(maybeValid.earned, 1);
        }
    });

    it("handles loss of precision gracefully", () => {
        const maybeValid = UnitWidget.validate("1.12 lb", {
            value: "5 N",
            accepting: "some",
            acceptingUnits: ["lb"],
            sigfigs: 3,
        });
        assert.equal(maybeValid.earned, 1);
    });

    it("flags incorrect units", () => {
        const maybeValid = UnitWidget.validate("5 tbsp", {
            value: "5 m",
            accepting: "all",
            sigfigs: 1,
        });
        assert.equal(maybeValid.earned, 0);
        assert.equal(maybeValid.message, "Check your units.");
    });

    it("flags incorrect sigfigs", () => {
        {
            const maybeValid = UnitWidget.validate("5.0 tbsp", {
                value: "5 tbsp",
                accepting: "all",
                sigfigs: 1,
            });
            assert.equal(maybeValid.earned, 0);
            assert.equal(maybeValid.message, "Check your significant figures.");
        }

        {
            const maybeValid = UnitWidget.validate("5 tbsp", {
                value: "5.0 tbsp",
                accepting: "all",
                sigfigs: 2,
            });
            assert.equal(maybeValid.earned, 0);
            assert.equal(maybeValid.message, "Check your significant figures.");
        }
    });

    it("flags numerically incorrect answers", () => {
        const maybeValid = UnitWidget.validate("8.1 tbsp", {
            value: "5.0 tbsp",
            accepting: "all",
            sigfigs: 2,
        });
        assert.equal(maybeValid.earned, 0);
        assert.equal(
            maybeValid.message,
            "That answer is numerically incorrect."
        );
    });
});
