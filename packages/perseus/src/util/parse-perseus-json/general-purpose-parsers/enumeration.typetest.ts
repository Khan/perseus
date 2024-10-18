import {enumeration} from "./enumeration"
import {ParseContext} from "../parser-types";
import invariant from "tiny-invariant";

const ctx: ParseContext = null as any;

// Test: return type is correctly assignable
{
    const result = enumeration("a", "b", "c")(null, ctx);
    invariant(result.type === "success");

    result.value satisfies "a" | "b" | "c";
    // @ts-expect-error - "c" is not assignable to "a" | "b"
    result.value satisfies "a" | "b";
}

// Test: an enumeration parser with no branches never succeeds
{
    const result = enumeration()(null, ctx);
    invariant(result.type === "success");

    result.value satisfies never;
}
