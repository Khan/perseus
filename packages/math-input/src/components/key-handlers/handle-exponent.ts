import {MathFieldActionType} from "../../types";
import {mathQuillInstance} from "../input/mathquill-instance";

import type Key from "../../data/keys";
import type {MathFieldInterface} from "../input/mathquill-types";

const ArithmeticOperators = ["+", "-", "\\cdot", "\\times", "\\div"];
const EqualityOperators = ["=", "\\neq", "<", "\\leq", ">", "\\geq"];

export default function handleExponent(
    mathField: MathFieldInterface,
    key: Key,
) {
    const cursor = mathField.cursor();
    // If there's an invalid operator preceding the cursor (anything that
    // knowingly cannot be raised to a power), add an empty set of
    // parentheses and apply the exponent to that.
    const invalidPrefixes = [...ArithmeticOperators, ...EqualityOperators];

    const precedingNode = cursor[mathQuillInstance.L];
    const shouldPrefixWithParens =
        precedingNode === MathFieldActionType.MQ_END ||
        invalidPrefixes.includes(precedingNode.ctrlSeq.trim());
    if (shouldPrefixWithParens) {
        mathField.write("\\left(\\right)");
    }

    // Insert the appropriate exponent operator.
    switch (key) {
        case "EXP":
            mathField.cmd("^");
            break;

        case "EXP_2":
        case "EXP_3":
            mathField.write(`^${key === "EXP_2" ? 2 : 3}`);

            // If we enter a square or a cube, we should leave the cursor
            // within the newly inserted parens, if they exist. This takes
            // exactly four left strokes, since the cursor by default would
            // end up to the right of the exponent.
            if (shouldPrefixWithParens) {
                mathField.keystroke("Left");
                mathField.keystroke("Left");
                mathField.keystroke("Left");
                mathField.keystroke("Left");
            }
            break;

        default:
            throw new Error(`Invalid exponent key: ${key}`);
    }
}
