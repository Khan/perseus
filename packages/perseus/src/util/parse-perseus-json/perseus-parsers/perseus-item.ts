import {ItemExtras} from "@khanacademy/perseus-core";

import {
    any,
    array,
    boolean,
    enumeration,
    number,
    object,
    optional,
    pipeParsers,
    record,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseHint} from "./hint";
import {parsePerseusRenderer} from "./perseus-renderer";

import type {ParseContext, Parser, ParseResult} from "../parser-types";
import type {PerseusItem} from "@khanacademy/perseus-core";

export const parsePerseusItem: Parser<PerseusItem> = object({
    question: parsePerseusRenderer,
    hints: defaulted(array(parseHint), () => []),
    answerArea: pipeParsers(defaulted(object({}), () => ({})))
        .then(migrateAnswerArea)
        .then(record(enumeration(...ItemExtras), boolean)).parser,
    itemDataVersion: optional(
        object({
            major: number,
            minor: number,
        }),
    ),
    // Deprecated field
    answer: any,
});

// Some answerAreas have extra fields, like:
//
//   "answerArea": {
//     "type": "multiple",
//     "options": {
//       "content": "",
//       "images": {},
//       "widgets": {}
//     }
//   }
//
// The "type" and "options" fields don't seem to be used anywhere. This
// migration function removes them.
function migrateAnswerArea(
    rawValue: {type?: unknown; options?: unknown},
    ctx: ParseContext,
): ParseResult<unknown> {
    const {type: _, options: __, ...rest} = rawValue;
    return ctx.success(rest);
}
