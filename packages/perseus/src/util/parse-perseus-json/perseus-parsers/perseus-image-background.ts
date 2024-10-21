import {
    nullable,
    number,
    object,
    optional,
    string,
    union,
} from "../general-purpose-parsers";

import type {Parser} from "../parser-types";
import type {PerseusImageBackground} from "@khanacademy/perseus";

export const parsePerseusImageBackground: Parser<PerseusImageBackground> =
    object({
        url: optional(nullable(string)),
        width: optional(number),
        height: optional(number),
        top: optional(number),
        left: optional(number),
        bottom: optional(number),
        // TODO(benchristel): convert scale to a number
        scale: optional(union(number).or(string).parser),
    });
