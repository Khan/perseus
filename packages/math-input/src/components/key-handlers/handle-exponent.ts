import insertBaseParens from "./insert-base-parens";

import type {MathFieldInterface} from "../input/mathquill-types";
import type {KeypadKey} from "@khanacademy/perseus-core";

export default function handleExponent(
    mathField: MathFieldInterface,
    key: KeypadKey,
) {
    const insertedParens = insertBaseParens(mathField);

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
            if (insertedParens) {
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
