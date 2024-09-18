/* eslint-disable no-console */
import * as KAS from "@khanacademy/kas";
import {builders} from "@math-blocks/semantic";

import {kasToMathBlocks} from "./converters";

import type {types} from "@math-blocks/semantic";

export function parse(value: string): types.Node {
    const result = KAS.parse(value, {dontSimplifyFractions: true});
    if (result.parsed) {
        const {expr} = result;
        if (expr instanceof KAS.Eq) {
            const {left, right} = expr;
            return builders.eq([kasToMathBlocks(left), kasToMathBlocks(right)]);
        } else {
            return kasToMathBlocks(expr);
        }
    } else {
        throw new SyntaxError(`'${value}' is not a valid equation/expression`);
    }
}
