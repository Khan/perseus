import {ItemExtras} from "../../../perseus-types";
import {
    any,
    array,
    boolean,
    constant,
    enumeration,
    number,
    object,
    record,
    union,
} from "../general-purpose-parsers";
import {composeParsers} from "../general-purpose-parsers/compose-parsers";

import {parseHint} from "./hint";
import {parsePerseusRenderer} from "./perseus-renderer";

import type {PerseusItem} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parsePerseusItem: Parser<PerseusItem> = object({
    question: parsePerseusRenderer,
    hints: array(parseHint),
    answerArea: record(
        enumeration(...ItemExtras),
        composeParsers(
            union(boolean).or(constant("multiple")).parser,
            (val, ctx) => ctx.success(Boolean(val)),
        ),
    ),
    itemDataVersion: object({
        major: number,
        minor: number,
    }),
    // Deprecated field
    answer: any,
});
