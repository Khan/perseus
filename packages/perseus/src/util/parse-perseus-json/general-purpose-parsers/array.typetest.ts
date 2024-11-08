import {array} from "./array";
import {number} from "./number";
import {string} from "./string";
import {summonParsedValue} from "./test-helpers";

// Test: return type is correctly assignable
{
    const arrayOfStrings = array(string);
    const parsed = summonParsedValue<typeof arrayOfStrings>();

    parsed satisfies string[];

    // @ts-expect-error - parsed is string[]
    parsed satisfies number[];
    // @ts-expect-error - parsed is string[]
    parsed satisfies string;
}

// Test: nested array parsers
{
    const arrayOfArraysOfNumbers = array(array(number));
    const parsed = summonParsedValue<typeof arrayOfArraysOfNumbers>();
    parsed satisfies number[][];

    // @ts-expect-error - parsed is number[][]
    parsed satisfies number[];
    // @ts-expect-error - parsed is number[][]
    parsed satisfies string[][];
}
