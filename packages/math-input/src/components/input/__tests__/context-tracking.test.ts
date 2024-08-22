import {mockStrings} from "../../../strings";
import {CursorContext} from "../cursor-contexts";

import TestMathWrapper from "./test-math-wrapper";

describe("Cursor context", () => {
    let mathField;
    let span;

    beforeEach(() => {
        span = document.createElement("span");
        document.body.appendChild(span);

        mathField = new TestMathWrapper(span, "Math field", mockStrings, "en");
    });

    afterEach(() => {
        document.body.removeChild(span);
    });

    it("should treat number-only expressions as non-jumpable", () => {
        mathField.pressKey("NUM_1");
        mathField.pressKey("NUM_2");
        const cursor = mathField.pressKey("NUM_3");
        expect(cursor.context).toEqual(CursorContext.NONE);
    });

    it("should treat numbers and ternary operators as non-jumpable", () => {
        mathField.pressKey("NUM_1");
        mathField.pressKey("CDOT");
        const cursor = mathField.pressKey("NUM_2");
        expect(cursor.context).toEqual(CursorContext.NONE);
    });

    describe("Before fraction", () => {
        it("should detect when immediately to the left", () => {
            const cursor = mathField.pressKey("FRAC_EXCLUSIVE");
            expect(cursor.context).toEqual(CursorContext.BEFORE_FRACTION);
        });

        it("should detect when numbers are between", () => {
            mathField.pressKey("NUM_1");
            mathField.pressKey("FRAC_EXCLUSIVE");
            mathField.pressKey("LEFT");
            const cursor = mathField.pressKey("LEFT");
            expect(cursor.context).toEqual(CursorContext.BEFORE_FRACTION);
        });

        it("should not detect when operators are between", () => {
            mathField.pressKey("NUM_1");
            mathField.pressKey("PLUS");
            mathField.pressKey("NUM_2");
            mathField.pressKey("FRAC_EXCLUSIVE");
            mathField.pressKey("LEFT");
            mathField.pressKey("LEFT");
            mathField.pressKey("LEFT");
            const cursor = mathField.pressKey("LEFT");
            expect(cursor.context).toEqual(CursorContext.NONE);
        });

        it("should not detect when parens are between", () => {
            mathField.pressKey("NUM_1");
            mathField.pressKey("LEFT_PAREN");
            mathField.pressKey("RIGHT_PAREN");
            mathField.pressKey("NUM_2");
            mathField.pressKey("FRAC_EXCLUSIVE");
            mathField.pressKey("LEFT");
            mathField.pressKey("LEFT");
            mathField.pressKey("LEFT");
            mathField.pressKey("LEFT");
            const cursor = mathField.pressKey("LEFT");
            expect(cursor.context).toEqual(CursorContext.NONE);
        });
    });

    describe("In parens", () => {
        it("should detect when inside empty parens", () => {
            mathField.pressKey("LEFT_PAREN");
            mathField.pressKey("RIGHT_PAREN");
            const cursor = mathField.pressKey("LEFT");
            expect(cursor.context).toEqual(CursorContext.IN_PARENS);
        });

        it("should detect when inside non-empty parens", () => {
            mathField.pressKey("LEFT_PAREN");
            mathField.pressKey("NUM_2");
            mathField.pressKey("RIGHT_PAREN");
            const cursor = mathField.pressKey("LEFT");
            expect(cursor.context).toEqual(CursorContext.IN_PARENS);
        });
    });

    describe("In superscript", () => {
        it("should detect when inside empty superscript", () => {
            mathField.pressKey("NUM_2");
            const cursor = mathField.pressKey("EXP");
            expect(cursor.context).toEqual(CursorContext.IN_SUPER_SCRIPT);
        });

        it("should detect when inside non-empty superscript", () => {
            mathField.pressKey("NUM_2");
            mathField.pressKey("EXP");
            const cursor = mathField.pressKey("NUM_3");
            expect(cursor.context).toEqual(CursorContext.IN_SUPER_SCRIPT);
        });
    });

    describe("In subscript", () => {
        it("should detect when inside empty superscript", () => {
            const cursor = mathField.pressKey("LOG_N");
            expect(cursor.context).toEqual(CursorContext.IN_SUB_SCRIPT);
        });

        it("should detect when inside non-empty superscript", () => {
            mathField.pressKey("LOG_N");
            const cursor = mathField.pressKey("NUM_2");
            expect(cursor.context).toEqual(CursorContext.IN_SUB_SCRIPT);
        });
    });

    describe("In numerator", () => {
        it("should detect when inside empty numerator", () => {
            const cursor = mathField.pressKey("FRAC_INCLUSIVE");
            expect(cursor.context).toEqual(CursorContext.IN_NUMERATOR);
        });

        it("should detect when inside non-empty numerator", () => {
            mathField.pressKey("FRAC_INCLUSIVE");
            const cursor = mathField.pressKey("NUM_2");
            expect(cursor.context).toEqual(CursorContext.IN_NUMERATOR);
        });
    });

    describe("In denominator", () => {
        it("should detect when inside empty denominator", () => {
            mathField.pressKey("FRAC_INCLUSIVE");
            const cursor = mathField.pressKey("RIGHT");
            expect(cursor.context).toEqual(CursorContext.IN_DENOMINATOR);
        });

        it("should detect when inside non-empty denominator", () => {
            mathField.pressKey("FRAC_INCLUSIVE");
            mathField.pressKey("RIGHT");
            const cursor = mathField.pressKey("NUM_2");
            expect(cursor.context).toEqual(CursorContext.IN_DENOMINATOR);
        });
    });

    describe("Nesting", () => {
        it("should defer to jumping into fraction if possible", () => {
            // Move inside parens, but include a fraction.
            mathField.pressKey("LEFT_PAREN");
            mathField.pressKey("NUM_2");
            mathField.pressKey("FRAC_EXCLUSIVE");
            const cursor = mathField.pressKey("LEFT");
            expect(cursor.context).toEqual(CursorContext.BEFORE_FRACTION);
        });

        it("should defer to the nearest parent (1)", () => {
            // Move inside parens, inside a superscript.
            mathField.pressKey("NUM_2");
            mathField.pressKey("EXP");
            mathField.pressKey("LEFT_PAREN");
            const cursor = mathField.pressKey("NUM_3");
            expect(cursor.context).toEqual(CursorContext.IN_PARENS);
        });

        it("should defer to the nearest parent (2)", () => {
            // Nest fractions, and put cursor in the denominator of the fraction
            // in the numerator.
            mathField.pressKey("FRAC_INCLUSIVE");
            mathField.pressKey("FRAC_INCLUSIVE");
            const cursor = mathField.pressKey("RIGHT");
            expect(cursor.context).toEqual(CursorContext.IN_DENOMINATOR);
        });
    });
});
