import {MathFieldActionType} from "../../types";
import {mathQuillInstance} from "../input/mathquill-instance";

import type {MathFieldInterface} from "../input/mathquill-types";

const ArithmeticOperators = ["+", "-", "\\cdot", "\\times", "\\div"];
const EqualityOperators = ["=", "\\neq", "<", "\\leq", ">", "\\geq"];

// Anything that knowingly cannot serve as the base of a superscript or
// subscript (i.e. can't be raised to a power or given an index).
const invalidPrefixes = [...ArithmeticOperators, ...EqualityOperators];

/**
 * Ensures there's a valid base immediately before the cursor for a superscript
 * or subscript to attach to. If the preceding node is empty or an operator that
 * can't take a script, an empty set of parentheses is inserted to act as the
 * base.
 *
 * @returns whether empty parentheses were inserted, so callers can adjust the
 * cursor position accordingly.
 */
export default function insertBaseParens(
    mathField: MathFieldInterface,
): boolean {
    const cursor = mathField.cursor();
    const precedingNode = cursor[mathQuillInstance.L];
    const shouldPrefixWithParens =
        precedingNode === MathFieldActionType.MQ_END ||
        invalidPrefixes.includes(precedingNode.ctrlSeq.trim());
    if (shouldPrefixWithParens) {
        mathField.write("\\left(\\right)");
    }
    return shouldPrefixWithParens;
}
