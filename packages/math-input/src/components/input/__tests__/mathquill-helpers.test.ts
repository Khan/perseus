import {mockStrings} from "../../../strings";
import {CursorContext} from "../cursor-contexts";
import {getCursorContext} from "../mathquill-helpers";
import {createMathField} from "../mathquill-instance";

describe("MathQuill Helpers", () => {
    describe("getCursorContext", () => {
        it("returns NONE for empty MathField", () => {
            // Arrange
            const mount = document.createElement("div");
            const mathField = createMathField(mount, "en", mockStrings);

            // Act
            const context = getCursorContext(mathField);

            // Assert
            expect(context).toBe(CursorContext.NONE);
        });

        it("returns BEFORE_FRACTION when before a fraction", () => {
            // Arrange
            const mount = document.createElement("div");
            const mathField = createMathField(mount, "en", mockStrings);
            // create fraction and move cursor before it
            mathField.cmd("\\frac");
            mathField.keystroke("Left");

            // Act
            const context = getCursorContext(mathField);

            // Assert
            expect(context).toBe(CursorContext.BEFORE_FRACTION);
        });

        it("returns IN_PARENS when in parenthesis", () => {
            // Arrange
            const mount = document.createElement("div");
            const mathField = createMathField(mount, "en", mockStrings);
            // MQ puts you inside parens when you start a paren
            mathField.typedText("(");

            // Act
            const context = getCursorContext(mathField);

            // Assert
            expect(context).toBe(CursorContext.IN_PARENS);
        });

        it("returns IN_NUMERATOR when in numerator", () => {
            // Arrange
            const mount = document.createElement("div");
            const mathField = createMathField(mount, "en", mockStrings);
            // MQ puts you in the numerator when making a fraction
            mathField.cmd("\\frac");

            // Act
            const context = getCursorContext(mathField);

            // Assert
            expect(context).toBe(CursorContext.IN_NUMERATOR);
        });

        it("returns IN_DENOMINATOR when in denominator", () => {
            // Arrange
            const mount = document.createElement("div");
            const mathField = createMathField(mount, "en", mockStrings);
            // create fraction and move cursor to denominator
            mathField.cmd("\\frac");
            mathField.keystroke("Down");

            // Act
            const context = getCursorContext(mathField);

            // Assert
            expect(context).toBe(CursorContext.IN_DENOMINATOR);
        });

        it("returns IN_SUB_SCRIPT when in subscript", () => {
            // Arrange
            const mount = document.createElement("div");
            const mathField = createMathField(mount, "en", mockStrings);
            // "_" triggers a subscript
            mathField.typedText("6_");

            // Act
            const context = getCursorContext(mathField);

            // Assert
            expect(context).toBe(CursorContext.IN_SUB_SCRIPT);
        });

        it("returns IN_SUPER_SCRIPT when in superscript", () => {
            // Arrange
            const mount = document.createElement("div");
            const mathField = createMathField(mount, "en", mockStrings);
            // "^" triggers a superscript
            mathField.typedText("6^");

            // Act
            const context = getCursorContext(mathField);

            // Assert
            expect(context).toBe(CursorContext.IN_SUPER_SCRIPT);
        });
    });
});
