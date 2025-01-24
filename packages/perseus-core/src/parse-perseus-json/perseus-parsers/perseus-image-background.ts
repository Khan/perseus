import {
    nullable,
    number,
    object,
    optional,
    pipeParsers,
    string,
    union,
} from "../general-purpose-parsers";
import {convert} from "../general-purpose-parsers/convert";
import {stringToNumber} from "../general-purpose-parsers/string-to-number";

import type {PerseusImageBackground} from "../../data-schema";
import type {Parser} from "../parser-types";

function emptyToZero(x: string | number): string | number {
    return x === "" ? 0 : x;
}

const imageDimensionToNumber = pipeParsers(union(number).or(string).parser)
    // In this specific case, empty string is equivalent to zero. An empty
    // string parses to either NaN (using parseInt) or 0 (using unary +) and
    // CSS will treat NaN as invalid and default to 0 instead.
    .then(convert(emptyToZero))
    .then(stringToNumber).parser;

export const parsePerseusImageBackground: Parser<PerseusImageBackground> =
    object({
        url: optional(nullable(string)),
        width: optional(imageDimensionToNumber),
        height: optional(imageDimensionToNumber),
        top: optional(imageDimensionToNumber),
        left: optional(imageDimensionToNumber),
        bottom: optional(imageDimensionToNumber),
        scale: optional(imageDimensionToNumber),
    });
