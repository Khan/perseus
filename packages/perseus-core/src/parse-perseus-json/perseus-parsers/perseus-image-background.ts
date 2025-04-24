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
import {defaulted} from "../general-purpose-parsers/defaulted";
import {stringToNumber} from "../general-purpose-parsers/string-to-number";

function emptyToZero(x: string | number): string | number {
    return x === "" ? 0 : x;
}

const imageDimensionToNumber = pipeParsers(union(number).or(string).parser)
    // In this specific case, empty string is equivalent to zero. An empty
    // string parses to either NaN (using parseInt) or 0 (using unary +) and
    // CSS will treat NaN as invalid and default to 0 instead.
    .then(convert(emptyToZero))
    .then(stringToNumber).parser;

const dimensionOrUndefined = defaulted(
    optional(imageDimensionToNumber),
    () => undefined,
);

export const parsePerseusImageBackground = object({
    url: optional(nullable(string)),
    width: dimensionOrUndefined,
    height: dimensionOrUndefined,
    top: dimensionOrUndefined,
    left: dimensionOrUndefined,
    bottom: dimensionOrUndefined,
    scale: dimensionOrUndefined,
});
