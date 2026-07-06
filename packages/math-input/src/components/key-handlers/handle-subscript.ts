import {MathFieldActionType} from "../../types";
import {mathQuillInstance} from "../input/mathquill-instance";

import type {MathFieldInterface} from "../input/mathquill-types";

const ArithmeticOperators = ["+", "-", "\\cdot", "\\times", "\\div"];
const EqualityOperators = ["=", "\\neq", "<", "\\leq", ">", "\\geq"];

export default function handleSubscript(mathField: MathFieldInterface) {
    const cursor = mathField.cursor();
    // If there's an invalid operator preceding the cursor (anything that
    // knowingly cannot take a subscript), add an empty set of parentheses and
    // apply the subscript to that. This mirrors the exponent behavior.
    const invalidPrefixes = [...ArithmeticOperators, ...EqualityOperators];

    const precedingNode = cursor[mathQuillInstance.L];
    const shouldPrefixWithParens =
        precedingNode === MathFieldActionType.MQ_END ||
        invalidPrefixes.includes(precedingNode.ctrlSeq.trim());
    if (shouldPrefixWithParens) {
        mathField.write("\\left(\\right)");
    }

    // Insert the subscript operator, leaving the cursor inside it.
    mathField.cmd("_");
}
