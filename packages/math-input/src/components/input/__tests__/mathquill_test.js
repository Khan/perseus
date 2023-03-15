import Keys from "../../../data/keys.js";

import TestMathWrapper from "./test-math-wrapper.jsx";

const MQ = {L: "-1", R: "1"};
const END_OF_EXPR = 0;

const isInsideEmptyParens = (cursor) => {
    return (
        cursor[MQ.L] === END_OF_EXPR &&
        cursor[MQ.R] === END_OF_EXPR &&
        cursor.parent.parent.ctrlSeq === "\\left("
    );
};

describe("MathQuill", () => {
    let mathField;
    let span;

    beforeEach(() => {
        span = document.createElement("span");
        document.body.appendChild(span);

        mathField = new TestMathWrapper(span);
    });

    afterEach(() => {
        document.body.removeChild(span);
    });

    // TODO(charlie): Add tests for Keys.FRAC_EXCLUSIVE (the mixed-number
    // fraction key).
    describe("Fraction Bar", () => {
        it("should work with no content", () => {
            mathField.pressKey(Keys.FRAC_INCLUSIVE);
            expect(mathField.getContent()).toEqual("\\frac{ }{ }");
        });

        it("should work after an expression", () => {
            mathField.setContent("35x^2");
            mathField.pressKey(Keys.FRAC_INCLUSIVE);
            expect(mathField.getContent()).toEqual("\\frac{35x^2}{ }");
        });

        it("should work before an expression", () => {
            mathField.setContent("35x^2");
            mathField.moveToStart();
            mathField.pressKey(Keys.FRAC_INCLUSIVE);
            expect(mathField.getContent()).toEqual("\\frac{ }{ }35x^2");
        });

        it("should work with a selected expression", () => {
            mathField.setContent("35x^2");
            mathField.selectAll();
            mathField.pressKey(Keys.FRAC_INCLUSIVE);
            expect(mathField.getContent()).toEqual("\\frac{35x^2}{ }");
        });
    });

    describe("Parentheses", () => {
        it("should work with no content", () => {
            mathField.setContent("");
            mathField.pressKey(Keys.LEFT_PAREN);
            expect(mathField.getContent()).toEqual("\\left(\\right)");
        });

        it("should work after an expression", () => {
            mathField.setContent("35x^2");
            mathField.pressKey(Keys.RIGHT_PAREN);
            expect(mathField.getContent()).toEqual("\\left(35x^2\\right)");
        });

        it("should work before an expression", () => {
            mathField.setContent("35x^2");
            mathField.moveToStart();
            mathField.pressKey(Keys.LEFT_PAREN);
            expect(mathField.getContent()).toEqual("\\left(35x^2\\right)");
        });

        it.skip("should work on a selected expression", () => {
            mathField.setContent("35x + 5");
            mathField.selectAll();
            mathField.pressKey(Keys.LEFT_PAREN);
            expect(mathField.getContent()).toEqual("\\left(35x^2\\right)");
        });
    });

    describe("Squared", () => {
        it("should prefix with empty parens after no content", () => {
            mathField.pressKey(Keys.EXP_2);
            expect(mathField.getContent()).toEqual("\\left(\\right)^2");

            // Verify that the cursor is in parens.
            expect(isInsideEmptyParens(mathField.getCursor())).toBeTruthy();
        });

        it("should prefix with empty parens after an operator", () => {
            mathField.pressKey(Keys.DIVIDE);
            mathField.pressKey(Keys.EXP_2);
            expect(mathField.getContent()).toEqual("\\div\\left(\\right)^2");
        });

        it("should work after an expression", () => {
            mathField.setContent("35x");
            mathField.pressKey(Keys.EXP_2);
            expect(mathField.getContent()).toEqual("35x^2");
        });

        it.skip("should work on a selected expression", () => {
            mathField.setContent("35x+5");
            mathField.selectAll();
            mathField.pressKey(Keys.EXP_2);
            expect(mathField.getContent()).toEqual("\\left(35x+5\\right)^2");
        });
    });

    describe("Cubed", () => {
        it("should prefix with empty parens after no content", () => {
            mathField.pressKey(Keys.EXP_3);
            expect(mathField.getContent()).toEqual("\\left(\\right)^3");

            // Verify that the cursor is in parens.
            expect(isInsideEmptyParens(mathField.getCursor())).toBeTruthy();
        });

        it("should prefix with empty parens after an operator", () => {
            mathField.pressKey(Keys.EQUAL);
            mathField.pressKey(Keys.EXP_3);
            expect(mathField.getContent()).toEqual("=\\left(\\right)^3");
        });

        it("should work after an expression", () => {
            mathField.setContent("35x");
            mathField.pressKey(Keys.EXP_3);
            expect(mathField.getContent()).toEqual("35x^3");
        });

        it.skip("should work on a selected expression", () => {
            mathField.setContent("35x+5");
            mathField.selectAll();
            mathField.pressKey(Keys.EXP_3);
            expect(mathField.getContent()).toEqual("\\left(35x+5\\right)^3");
        });
    });

    describe("Exponent", () => {
        it("should prefix with empty parens after no content", () => {
            mathField.pressKey(Keys.EXP);
            expect(mathField.getContent()).toEqual("\\left(\\right)^{ }");

            // Verify that the cursor is in the exponent, not within the parens,
            // writing a unique character to verify cursor position.
            expect(isInsideEmptyParens(mathField.getCursor())).toBeFalsy();
            mathField.pressKey(Keys.PLUS);
            expect(mathField.getContent()).toEqual("\\left(\\right)^+");
        });

        it("should prefix with empty parens after an operator", () => {
            mathField.pressKey(Keys.PLUS);
            mathField.pressKey(Keys.EXP);
            expect(mathField.getContent()).toEqual("+\\left(\\right)^{ }");
        });

        it("should work after an expression", () => {
            mathField.setContent("35x");
            mathField.pressKey(Keys.EXP);
            expect(mathField.getContent()).toEqual("35x^{ }");
        });

        // TODO(kevinb): makes the expression an exponent when it shouldn't
        it.skip("should work on a selected expression", () => {
            mathField.setContent("35x+5");
            mathField.selectAll();
            mathField.pressKey(Keys.EXP);
            expect(mathField.getContent()).toEqual("\\left(35x+5\\right)^{ }");
        });
    });

    describe("Square Root", () => {
        it("should work with no content", () => {
            mathField.pressKey(Keys.SQRT);
            expect(mathField.getContent()).toEqual("\\sqrt{ }");
        });

        it("should work after an expression", () => {
            mathField.setContent("35x^2");
            mathField.pressKey(Keys.SQRT);
            expect(mathField.getContent()).toEqual("35x^2\\sqrt{ }");
        });

        it("should work on a selected expression", () => {
            mathField.setContent("35x+5");
            mathField.selectAll();
            mathField.pressKey(Keys.SQRT);
            expect(mathField.getContent()).toEqual("\\sqrt{35x+5}");
        });
    });

    describe("Radical", () => {
        it("should work with no content", () => {
            mathField.pressKey(Keys.RADICAL);
            expect(mathField.getContent()).toEqual("\\sqrt[]{}");
        });

        it("should work after an expression", () => {
            mathField.setContent("35x^2");
            mathField.pressKey(Keys.RADICAL);
            expect(mathField.getContent()).toEqual("35x^2\\sqrt[]{}");
        });

        it.skip("should work on a selected expression", () => {
            mathField.setContent("35x+5");
            mathField.selectAll();
            mathField.pressKey(Keys.RADICAL);
            // TODO(kevinb): check cursor location
            expect(mathField.getContent()).toEqual("\\sqrt[ ]{35x+5}");
        });
    });

    describe("Log", () => {
        it("should work with no content", () => {
            mathField.pressKey(Keys.LOG);
            expect(mathField.getContent()).toEqual("\\log\\left(\\right)");
        });

        it("should work after an expression", () => {
            mathField.setContent("35x^2");
            mathField.pressKey(Keys.LOG);
            expect(mathField.getContent()).toEqual("35x^2\\log\\left(\\right)");
        });

        it.skip("should work on a selected expression", () => {
            mathField.setContent("35x+5");
            mathField.selectAll();
            mathField.pressKey(Keys.LOG);
            expect(mathField.getContent()).toEqual("\\log\\left(35x+5\\right)");
        });
    });

    describe("Log w/ base n", () => {
        it("should work with no content", () => {
            mathField.pressKey(Keys.LOG_N);
            expect(mathField.getContent()).toEqual("\\log_{ }\\left(\\right)");
        });

        it("should work after an expression", () => {
            mathField.setContent("35x^2");
            mathField.pressKey(Keys.LOG_N);
            expect(mathField.getContent()).toEqual(
                "35x^2\\log_{ }\\left(\\right)",
            );
        });

        it.skip("should work on a selected expression", () => {
            mathField.setContent("35x+5");
            mathField.selectAll();
            mathField.pressKey(Keys.LOG_N);
            expect(mathField.getContent()).toEqual(
                "\\log_{ }\\left(35x+5\\right)",
            );
        });
    });

    describe("Backspace", () => {
        it("should delete an empty fraction from the numerator", () => {
            mathField.setContent("\\frac{ }{ }");
            mathField.moveToStart();
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.BACKSPACE);
            expect(mathField.getContent()).toEqual("");
        });

        it("should convert a fraction when deleting the denominator", () => {
            mathField.setContent("\\frac{35x^2}{ }");
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.BACKSPACE);
            expect(mathField.getContent()).toEqual("35x^2");
        });

        // TODO(kevinb) math isn't selected
        it("should select a fraction when deleting from outside of it", () => {
            const expr = "\\frac{35x+5}{x^2}";
            mathField.setContent(expr);
            mathField.pressKey(Keys.BACKSPACE);
            expect(mathField.isSelected()).toBeTruthy();
            expect(mathField.getContent()).toEqual(expr);
        });

        it("should delete parens when inside empty parens", () => {
            mathField.setContent("\\left(\\right)");
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.BACKSPACE);
            expect(mathField.getContent()).toEqual("");
        });

        it("deletes only the first parens when inside empty parens", () => {
            mathField.setContent("\\left(\\right)\\left(\\right)");
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.BACKSPACE);
            expect(mathField.getContent()).toEqual("\\left(\\right)");
        });

        it("should select an expression when deleting from outside (1)", () => {
            const expr = "\\left(35x+5\\right)";
            mathField.setContent(expr);
            mathField.pressKey(Keys.BACKSPACE);
            expect(mathField.isSelected()).toBeTruthy();
            expect(mathField.getContent()).toEqual(expr);
        });

        it("should select an expression when deleting from outside (2)", () => {
            const expr = "1+\\left(35x+5\\right)";
            mathField.setContent(expr);
            mathField.pressKey(Keys.BACKSPACE);
            const selection = mathField.getSelection();
            const left = selection.ends[MQ.L][MQ.L];
            const right = selection.ends[MQ.R][MQ.R];

            expect(left.ctrlSeq).toEqual("+");
            expect(right).toEqual(END_OF_EXPR);
            expect(mathField.getContent()).toEqual(expr);
        });

        it("should select an expression when deleting from outside (3)", () => {
            const expr = "1+\\left(35x+5\\right)-1";
            mathField.setContent(expr);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.BACKSPACE);
            const selection = mathField.getSelection();
            const left = selection.ends[MQ.L][MQ.L];
            const right = selection.ends[MQ.R][MQ.R];

            expect(left.ctrlSeq).toEqual("+");
            expect(right.ctrlSeq).toEqual("-");
            expect(mathField.getContent()).toEqual(expr);
        });

        it("should select an expression when deleting from outside (4)", () => {
            const expr = "\\left(35x+5\\right)-1";
            mathField.setContent(expr);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.BACKSPACE);
            const selection = mathField.getSelection();
            const left = selection.ends[MQ.L][MQ.L];
            const right = selection.ends[MQ.R][MQ.R];

            expect(left).toEqual(END_OF_EXPR);
            expect(right.ctrlSeq).toEqual("-");
            expect(mathField.getContent()).toEqual(expr);
        });

        it("should select an expression when deleting from outside", () => {
            mathField.setContent("\\left(35x+5\\right)");
            mathField.pressKey(Keys.BACKSPACE);
            expect(mathField.isSelected()).toBeTruthy();
            expect(mathField.getContent()).toEqual("\\left(35x+5\\right)");
        });

        // TODO(kevinb) fix this behavior so that we delete the exponent too
        it.skip("should not delete squared exponents", () => {
            mathField.setContent("35x^2");
            mathField.pressKey(Keys.BACKSPACE);
            expect(mathField.getContent()).toEqual("35x^2");
            mathField.pressKey(Keys.BACKSPACE);
            expect(mathField.getContent()).toEqual("35x^{ }");
        });

        it("should not delete non-square exponents", () => {
            mathField.setContent("35x^5");
            mathField.pressKey(Keys.BACKSPACE);
            expect(mathField.getContent()).toEqual("35x^5");
            mathField.pressKey(Keys.BACKSPACE);
            expect(mathField.getContent()).toEqual("35x^{ }");
        });

        it("should delete an empty exponent", () => {
            mathField.setContent("35x^{}");
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.BACKSPACE);
            expect(mathField.getContent()).toEqual("35x");
        });

        it("should delete an empty square root", () => {
            mathField.setContent("\\sqrt{}");
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.BACKSPACE);
            expect(mathField.getContent()).toEqual("");
        });

        it("should delete an empty radical when cursor is in index", () => {
            mathField.setContent("\\sqrt[]{}");
            mathField.moveToStart();
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.BACKSPACE);
            expect(mathField.getContent()).toEqual("");
        });

        it("should delete an empty radical when cursor is in body", () => {
            mathField.pressKey(Keys.RADICAL);
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.BACKSPACE);
            expect(mathField.getContent()).toEqual("");
        });

        it("should select an empty radical with non-empty root", () => {
            mathField.pressKey(Keys.CUBE_ROOT);
            const expr = mathField.getContent();
            mathField.pressKey(Keys.BACKSPACE);

            expect(mathField.isSelected()).toBeTruthy();
            expect(mathField.getContent()).toEqual(expr);
        });

        it("should normally delete within a non-empty radical", () => {
            mathField.pressKey(Keys.CUBE_ROOT);
            const expr = mathField.getContent();

            mathField.pressKey("NUM_2");
            mathField.pressKey(Keys.BACKSPACE);

            expect(mathField.getContent()).toEqual(expr);
        });

        it("deletes nthroot index normally", () => {
            mathField.setContent("\\sqrt[3]{35x+5}");
            mathField.moveToStart();
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.BACKSPACE);

            const cursor = mathField.getCursor();

            expect(cursor[MQ.L]).toEqual(END_OF_EXPR);
            expect(mathField.getContent()).toEqual("\\sqrt[]{35x+5}");
        });

        it("converts nthroot to sqrt when deleting from index (1)", () => {
            mathField.setContent("\\sqrt[]{35x+5}");
            mathField.moveToStart();
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.BACKSPACE);

            const cursor = mathField.getCursor();

            expect(cursor[MQ.L]).toEqual(END_OF_EXPR);
            expect(mathField.getContent()).toEqual("\\sqrt{35x+5}");
        });

        it("converts nthroot to sqrt when deleting from index (2)", () => {
            mathField.setContent("1+\\sqrt[]{35x+5}");
            mathField.moveToStart();
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.BACKSPACE);

            const cursor = mathField.getCursor();

            expect(cursor[MQ.L].ctrlSeq).toEqual("+");
            expect(mathField.getContent()).toEqual("1+\\sqrt{35x+5}");
        });

        it("should not delete if the index has contents", () => {
            const expr = "\\sqrt[3]{35x+5}";
            mathField.setContent(expr);
            mathField.moveToStart();
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.BACKSPACE);

            expect(mathField.getContent()).toEqual(expr);
        });

        it("should select a full square root before deleting it", () => {
            const expr = "\\sqrt{35x+5}";
            mathField.setContent(expr);
            mathField.pressKey(Keys.BACKSPACE);

            expect(mathField.isSelected()).toBeTruthy();
            expect(mathField.getContent()).toEqual(expr);
        });

        it("should select a full nth-root before deleting it", () => {
            const expr = "\\sqrt[3]{35x+5}";
            mathField.setContent(expr);
            mathField.pressKey(Keys.BACKSPACE);

            expect(mathField.isSelected()).toBeTruthy();
            expect(mathField.getContent()).toEqual(expr);
        });

        it("should delete log when inside empty log", () => {
            mathField.setContent("\\log\\left(\\right)");
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.BACKSPACE);
            expect(mathField.getContent()).toEqual("");
        });

        it("should select log when inside full log at head", () => {
            const expr = "\\log\\left(35x\\right)";
            mathField.setContent(expr);
            mathField.moveToStart();
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.BACKSPACE);
            expect(mathField.isSelected()).toBeTruthy();
            expect(mathField.getContent()).toEqual(expr);
        });

        it("should select log when outside full log at tail (1)", () => {
            const expr = "\\log\\left(35x\\right)";
            mathField.setContent(expr);
            mathField.pressKey(Keys.BACKSPACE);
            expect(mathField.isSelected()).toBeTruthy();
            expect(mathField.getContent()).toEqual(expr);
        });

        it("should select log when outside full log at tail (2)", () => {
            const expr = "1+\\log\\left(35x\\right)";
            mathField.setContent(expr);
            mathField.pressKey(Keys.BACKSPACE);
            const selection = mathField.getSelection();
            const left = selection.ends[MQ.L][MQ.L];
            const right = selection.ends[MQ.R][MQ.R];

            expect(left.ctrlSeq).toEqual("+");
            expect(right).toEqual(END_OF_EXPR);
            expect(mathField.getContent()).toEqual(expr);
        });

        it("should select log when outside full log at tail (3)", () => {
            const expr = "1+\\log\\left(35x\\right)-1";
            mathField.setContent(expr);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.BACKSPACE);
            const selection = mathField.getSelection();
            const left = selection.ends[MQ.L][MQ.L];
            const right = selection.ends[MQ.R][MQ.R];

            expect(left.ctrlSeq).toEqual("+");
            expect(right.ctrlSeq).toEqual("-");
            expect(mathField.getContent()).toEqual(expr);
        });

        it("should select log when outside full log at tail (4)", () => {
            const expr = "\\log\\left(35x\\right)-1";
            mathField.setContent(expr);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.BACKSPACE);
            const selection = mathField.getSelection();
            const left = selection.ends[MQ.L][MQ.L];
            const right = selection.ends[MQ.R][MQ.R];

            expect(left).toEqual(END_OF_EXPR);
            expect(right.ctrlSeq).toEqual("-");
            expect(mathField.getContent()).toEqual(expr);
        });

        it("should delete empty log when at index", () => {
            mathField.setContent("\\log_{ }\\left(\\right)");
            mathField.moveToStart();

            // Move right once to get into the parens, and then left twice to
            // get to the empty index.
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);

            mathField.pressKey(Keys.BACKSPACE);
            expect(mathField.getContent()).toEqual("");
        });

        it("should delete log index normally", () => {
            mathField.setContent("\\log_5\\left(\\right)");
            mathField.moveToStart();

            // Move right once to get into the parens, and then left twice to
            // get to the index.
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);

            mathField.pressKey(Keys.BACKSPACE);
            expect(mathField.getContent()).toEqual("\\log_{ }\\left(\\right)");
        });

        it("should move to index from inside empty log with index", () => {
            mathField.setContent("\\log_5\\left(\\right)");
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.BACKSPACE);

            const cursor = mathField.getCursor();

            expect(cursor[MQ.L].ctrlSeq).toEqual("5");
            expect(mathField.getContent()).toEqual("\\log_5\\left(\\right)");
        });

        it("should select full log when deleting from empty index (1)", () => {
            const expr = "\\log_{ }\\left(x\\right)";
            mathField.setContent(expr);
            mathField.moveToStart();

            // Move right once to get into the parens, and then left twice to
            // get to the empty index.
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);

            mathField.pressKey(Keys.BACKSPACE);

            expect(mathField.isSelected()).toBeTruthy();
            expect(mathField.getContent()).toEqual(expr);
        });

        it("should select full log when deleting from empty index (2)", () => {
            const expr = "1+\\log_{ }\\left(x\\right)";
            mathField.setContent(expr);
            mathField.moveToStart();

            // Move right once to get into the parens, and then left twice to
            // get to the empty index.
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);

            mathField.pressKey(Keys.BACKSPACE);

            const selection = mathField.getSelection();
            const left = selection.ends[MQ.L][MQ.L];
            const right = selection.ends[MQ.R][MQ.R];

            expect(left.ctrlSeq).toEqual("+");
            expect(right).toEqual(END_OF_EXPR);
            expect(mathField.getContent()).toEqual(expr);
        });

        it("should select full log when deleting from empty index (3)", () => {
            const expr = "1+\\log_{ }\\left(x\\right)-1";
            mathField.setContent(expr);
            mathField.moveToStart();

            // Move right three times to get into the parens, and then left
            // twice to get to the start of the empty index.
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);

            mathField.pressKey(Keys.BACKSPACE);

            const selection = mathField.getSelection();
            const left = selection.ends[MQ.L][MQ.L];
            const right = selection.ends[MQ.R][MQ.R];

            expect(left.ctrlSeq).toEqual("+");
            expect(right.ctrlSeq).toEqual("-");
            expect(mathField.getContent()).toEqual(expr);
        });

        it("should select full log when deleting from empty index (4)", () => {
            const expr = "\\log_{ }\\left(x\\right)-1";
            mathField.setContent(expr);
            mathField.moveToStart();

            // Move right once to get into the parens, and then left twice to
            // get to the start of the empty index.
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);

            mathField.pressKey(Keys.BACKSPACE);

            const selection = mathField.getSelection();
            const left = selection.ends[MQ.L][MQ.L];
            const right = selection.ends[MQ.R][MQ.R];

            expect(left).toEqual(END_OF_EXPR);
            expect(right.ctrlSeq).toEqual("-");
            expect(mathField.getContent()).toEqual(expr);
        });
    });

    describe("Left arrow", () => {
        it("skips function names", () => {
            mathField.pressKey(Keys.COS);
            const cursor = mathField.getCursor();

            // Verify that we're inside the function.
            expect(cursor[MQ.L]).toEqual(END_OF_EXPR);
            expect(cursor[MQ.R]).toEqual(END_OF_EXPR);

            // Navigate left.
            mathField.pressKey(Keys.LEFT);

            // Verify that we moved beyond the body of the function.
            expect(cursor[MQ.L]).toEqual(END_OF_EXPR);
            expect(cursor[MQ.R].ctrlSeq).toEqual("\\c");
        });

        it("does not skip out of a function with valid content present", () => {
            mathField.pressKey(Keys.COS);
            mathField.pressKey(Keys.PLUS);
            const cursor = mathField.getCursor();

            // Verify that we're inside the function.
            expect(cursor[MQ.L].ctrlSeq).toEqual("+");
            expect(cursor[MQ.R]).toEqual(END_OF_EXPR);

            // Navigate left.
            mathField.pressKey(Keys.LEFT);

            // Verify that we didn't move out of the function.
            expect(cursor[MQ.L]).toEqual(END_OF_EXPR);
            expect(cursor[MQ.R].ctrlSeq).toEqual("+");
        });
    });

    describe("Right arrow", () => {
        it("skips function names", () => {
            mathField.setContent("\\cos\\left(5\\right)");
            mathField.moveToStart();
            const cursor = mathField.getCursor();

            // Verify that we're outside the function.
            expect(cursor[MQ.L]).toEqual(END_OF_EXPR);
            expect(cursor[MQ.R].ctrlSeq).toEqual("\\c");

            // Navigate right.
            mathField.pressKey(Keys.RIGHT);

            // Verify that we moved into the body of the function.
            expect(cursor[MQ.L]).toEqual(END_OF_EXPR);
            expect(cursor[MQ.R].ctrlSeq).toEqual("5");
        });
    });

    describe.skip("Jump out", () => {
        // TODO(charlie): Write extensive tests for the 'Jump out' behavior.
    });

    describe.skip("Equals =, !=, <, <=, >, >=", () => {});
});
