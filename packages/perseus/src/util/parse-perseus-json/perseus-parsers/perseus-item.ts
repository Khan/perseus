import {ItemExtras} from "../../../perseus-types";
import {
    any,
    array,
    boolean,
    enumeration,
    number,
    object,
    record,
} from "../general-purpose-parsers";

import {parseHint} from "./hint";
import {parsePerseusRenderer} from "./perseus-renderer";

import type {PerseusItem} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parsePerseusItem: Parser<PerseusItem> = object({
    question: parsePerseusRenderer,
    hints: array(parseHint),
    answerArea: record(enumeration(...ItemExtras), boolean),
    itemDataVersion: object({
        major: number,
        minor: number,
    }),
    // Deprecated field
    answer: any,
});
