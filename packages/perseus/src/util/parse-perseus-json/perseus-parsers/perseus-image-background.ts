import {
    nullable,
    number,
    object,
    optional,
    pipeParsers,
    string,
    union,
} from "../general-purpose-parsers";
import {stringToNumber} from "../general-purpose-parsers/string-to-number";

import type {Parser} from "../parser-types";
import type {PerseusImageBackground} from "@khanacademy/perseus";

const numericToNumber = pipeParsers(union(number).or(string).parser).then(
    stringToNumber,
).parser;

export const parsePerseusImageBackground: Parser<PerseusImageBackground> =
    object({
        url: optional(nullable(string)),
        width: optional(numericToNumber),
        height: optional(numericToNumber),
        top: optional(numericToNumber),
        left: optional(numericToNumber),
        bottom: optional(numericToNumber),
        scale: optional(numericToNumber),
    });
