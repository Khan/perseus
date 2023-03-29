import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import React from "react";

import Unit, {countSigfigs, sigfigPrint} from "../unit";

const {widget} = Unit;
const UnitWidget = widget;

describe("Unit Widget", () => {
    it("renders", () => {
        // Arrange
        const props = {
            onBlur: () => {},
            onFocus: () => {},
            onChange: () => {},
        } as const;

        // Act
        const {container} = render(<Unit.widget {...props} />);

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    describe("countSigfigs", () => {
        it("gets a few simple cases right", () => {
            expect(countSigfigs("5")).toEqual(1);
            expect(countSigfigs("500")).toEqual(1);
            expect(countSigfigs("5.00")).toEqual(3);
            expect(countSigfigs("5.01")).toEqual(3);
            expect(countSigfigs("05.01")).toEqual(3);
        });
    });

    describe("displaySigFigs", () => {
        it("gets a few simple cases right", () => {
            expect(sigfigPrint(150, 3)).toEqual("150.");
            expect(sigfigPrint(0.0005, 2)).toEqual("5.0 x 10^-4");
            expect(sigfigPrint(15000, 2)).toEqual("1.5 x 10^4");
            expect(sigfigPrint(50, 2)).toEqual("50.");
        });
    });

    describe("Unit Widget Grading", () => {
        it("accepts correct answers", () => {
            let maybeValid = UnitWidget.validate("5 tbsp", {
                value: "5 tbsp",
                accepting: "all",
                sigfigs: 1,
            });
            if (maybeValid.type === "invalid") {
                throw new Error("invalid unit");
            }
            expect(maybeValid.earned).toEqual(1);

            maybeValid = UnitWidget.validate("0.0739 L", {
                value: "5.00 tbsp",
                accepting: "all",
                sigfigs: 3,
            });
            if (maybeValid.type === "invalid") {
                throw new Error("invalid unit");
            }
            expect(maybeValid.earned).toEqual(1);

            maybeValid = UnitWidget.validate("5.00 tbsp", {
                value: "0.0739 L",
                accepting: "all",
                sigfigs: 3,
            });
            if (maybeValid.type === "invalid") {
                throw new Error("invalid unit");
            }
            expect(maybeValid.earned).toEqual(1);

            maybeValid = UnitWidget.validate("1124 lb", {
                value: "5000 N",
                accepting: "all",
                sigfigs: 4,
            });
            if (maybeValid.type === "invalid") {
                throw new Error("invalid unit");
            }
            expect(maybeValid.earned).toEqual(1);

            maybeValid = UnitWidget.validate("1124 lb", {
                value: "5000 N",
                accepting: "some",
                acceptingUnits: ["lb"],
                sigfigs: 4,
            });
            if (maybeValid.type === "invalid") {
                throw new Error("invalid unit");
            }
            expect(maybeValid.earned).toEqual(1);
        });

        it("handles loss of precision gracefully", () => {
            const maybeValid = UnitWidget.validate("1.12 lb", {
                value: "5 N",
                accepting: "some",
                acceptingUnits: ["lb"],
                sigfigs: 3,
            });
            if (maybeValid.type === "invalid") {
                throw new Error("invalid unit");
            }
            expect(maybeValid.earned).toEqual(1);
        });

        it("flags incorrect units", () => {
            const maybeValid = UnitWidget.validate("5 tbsp", {
                value: "5 m",
                accepting: "all",
                sigfigs: 1,
            });
            if (maybeValid.type === "invalid") {
                throw new Error("invalid unit");
            }
            expect(maybeValid.earned).toEqual(0);
            expect(maybeValid.message).toEqual("Check your units.");
        });

        it("flags incorrect sigfigs", () => {
            let maybeValid = UnitWidget.validate("5.0 tbsp", {
                value: "5 tbsp",
                accepting: "all",
                sigfigs: 1,
            });
            if (maybeValid.type === "invalid") {
                throw new Error("invalid unit");
            }
            expect(maybeValid.earned).toEqual(0);
            expect(maybeValid.message).toEqual(
                "Check your significant figures.",
            );

            maybeValid = UnitWidget.validate("5 tbsp", {
                value: "5.0 tbsp",
                accepting: "all",
                sigfigs: 2,
            });
            if (maybeValid.type === "invalid") {
                throw new Error("invalid unit");
            }
            expect(maybeValid.earned).toEqual(0);
            expect(maybeValid.message).toEqual(
                "Check your significant figures.",
            );
        });

        it("flags numerically incorrect answers", () => {
            const maybeValid = UnitWidget.validate("8.1 tbsp", {
                value: "5.0 tbsp",
                accepting: "all",
                sigfigs: 2,
            });
            if (maybeValid.type === "invalid") {
                throw new Error("invalid unit");
            }
            expect(maybeValid.earned).toEqual(0);
            expect(maybeValid.message).toEqual(
                "That answer is numerically incorrect.",
            );
        });
    });
});
