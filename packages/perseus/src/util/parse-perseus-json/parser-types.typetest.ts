import type {string} from "./general-purpose-parsers/string";
import type {ParsedValue} from "./parser-types";

// summons a value of type T out of thin air!
function summon<T>(): T {
    return null as any as T;
}

summon<ParsedValue<typeof string>>() satisfies string;

// @ts-expect-error - string parser returns a number
summon<ParsedValue<typeof string>>() satisfies number;
