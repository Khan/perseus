import {enumeration} from "./enumeration";
import {summonParsedValue} from "./test-helpers";

// Test: return type is correctly assignable
{
    const abc = enumeration("a", "b", "c");
    summonParsedValue<typeof abc>() satisfies "a" | "b" | "c";
    // @ts-expect-error: "c" is not assignable to type "a" | "b"
    summonParsedValue<typeof abc>() satisfies "a" | "b";
}

// Test: an enumeration parser with no branches never succeeds
{
    const emptyEnum = enumeration();
    summonParsedValue<typeof emptyEnum>() satisfies never;
}
