import invariant from "tiny-invariant";

import {array} from "./array";
import {number} from "./number";
import {string} from "./string";

import type {ParseContext} from "../parser-types";

const ctx: ParseContext = null as any;

// Test: return type is correctly assignable
{
    const result = array(string)(null, ctx);
    invariant(result.type === "success");
    result.value satisfies string[];

    // @ts-expect-error - result.value is string[]
    result.value satisfies number[];
    // @ts-expect-error - result.value is string[]
    result.value satisfies string;
}

// Test: nested array parsers
{
    const result = array(array(number))(null, ctx);
    invariant(result.type === "success");
    result.value satisfies number[][];

    // @ts-expect-error - result.value is number[][]
    result.value satisfies number[];
    // @ts-expect-error - result.value is number[][]
    result.value satisfies string[][];
}
