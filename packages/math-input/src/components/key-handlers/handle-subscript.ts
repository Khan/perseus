import insertBaseParens from "./insert-base-parens";

import type {MathFieldInterface} from "../input/mathquill-types";

export default function handleSubscript(mathField: MathFieldInterface) {
    insertBaseParens(mathField);

    // Insert the subscript operator, leaving the cursor inside it.
    mathField.cmd("_");
}
