import {ItemExtras} from "../../../perseus-types";
import {
    any,
    array,
    boolean,
    enumeration,
    number,
    object,
    pipeParsers,
    record,
} from "../general-purpose-parsers";

import {parseHint} from "./hint";
import {parsePerseusRenderer} from "./perseus-renderer";

import type {PerseusItem} from "../../../perseus-types";
import type {ParseContext, Parser, ParseResult} from "../parser-types";

export const parsePerseusItem: Parser<PerseusItem> = object({
    question: parsePerseusRenderer,
    hints: array(parseHint),
    answerArea: pipeParsers(object({}))
        .then(migrateAnswerArea)
        .then(record(enumeration(...ItemExtras), boolean)).parser,
    itemDataVersion: object({
        major: number,
        minor: number,
    }),
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
