import {nullable} from "../general-purpose-parsers/nullable";
import {number} from "../general-purpose-parsers/number";
import {object} from "../general-purpose-parsers/object";
import {optional} from "../general-purpose-parsers/optional";
import {string} from "../general-purpose-parsers/string";
import {union} from "../general-purpose-parsers/union";

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
