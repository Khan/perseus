import {mockStrings} from "../../../strings";
import {createMathField} from "../../input/mathquill-instance";
import handleJumpOut from "../handle-jump-out";

describe("handleJumpOut", () => {
    it("jumps out of parenthesis", () => {
        // Arrange
        const mount = document.createElement("div");
        const mathField = createMathField(mount, "en", mockStrings);

        // Act
        mathField.typedText("(4");
        handleJumpOut(mathField, "JUMP_OUT_PARENTHESES");
        mathField.typedText("6");

        // Assert
        expect(mathField.latex()).toBe("\\left(4\\right)6");
    });

    it("jumps into numerator", () => {
        // Arrange
        const mount = document.createElement("div");
        const mathField = createMathField(mount, "en", mockStrings);

        // Act
        mathField.typedText("4");
        mathField.cmd("frac");
        mathField.keystroke("Left");
        handleJumpOut(mathField, "JUMP_INTO_NUMERATOR");
        mathField.typedText("6");

        // Assert
        expect(mathField.latex()).toBe("4\\frac{6}{ }");
    });

    it("jumps out of numerator", () => {
        // Arrange
        const mount = document.createElement("div");
        const mathField = createMathField(mount, "en", mockStrings);

        // Act
        mathField.cmd("frac");
        mathField.typedText("4");
        handleJumpOut(mathField, "JUMP_OUT_NUMERATOR");
        mathField.typedText("6");

        // Assert
        expect(mathField.latex()).toBe("\\frac{4}{6}");
    });

    it("jumps out of denominator", () => {
        // Arrange
        const mount = document.createElement("div");
        const mathField = createMathField(mount, "en", mockStrings);

        // Act
        mathField.cmd("frac");
        mathField.typedText("4");
        handleJumpOut(mathField, "JUMP_OUT_NUMERATOR");
        mathField.typedText("6");
        handleJumpOut(mathField, "JUMP_OUT_DENOMINATOR");
        mathField.typedText("2");

        // Assert
        expect(mathField.latex()).toBe("\\frac{4}{6}2");
    });

    it("jumps out of superscript", () => {
        // Arrange
        const mount = document.createElement("div");
        const mathField = createMathField(mount, "en", mockStrings);

        // Act
        mathField.typedText("4^22");
        handleJumpOut(mathField, "JUMP_OUT_EXPONENT");
        mathField.typedText("6");

        // Assert
        expect(mathField.latex()).toBe("4^{22}6");
    });

    it("jumps out of subscript", () => {
        // Arrange
        const mount = document.createElement("div");
        const mathField = createMathField(mount, "en", mockStrings);

        // Act
        mathField.typedText("4_22");
        handleJumpOut(mathField, "JUMP_OUT_BASE");
        mathField.typedText("6");

        // Assert
        expect(mathField.latex()).toBe("4_{22}6");
    });
});
