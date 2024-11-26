// Test: pipeParsers()...then().parser returns the expected type

import {pipeParsers} from "./pipe-parsers";
import {string} from "./string";

import type {Parser, PartialParser} from "../parser-types";

const stringToNumber = summon<PartialParser<string, number>>();
const numberToBoolean = summon<PartialParser<number, boolean>>();

{
    pipeParsers(string).then(stringToNumber).then(numberToBoolean)
        .parser satisfies Parser<boolean>;
}

{
    // @ts-expect-error - partial parser types don't match
    pipeParsers(string).then(stringToNumber).then(stringToNumber).parser;
}

{
    const p = pipeParsers(string)
        .then(stringToNumber)
        .then(numberToBoolean).parser;
    // @ts-expect-error - return value is not assignable to Parser<string>
    p satisfies Parser<string>;
}

function summon<T>(): T {
    return "fake summoned value" as any;
}
