import {
    any,
    array,
    nullable,
    number,
    object,
    optional,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseHint} from "./hint";
import {parsePerseusAnswerArea} from "./perseus-answer-area";
import {parsePerseusRenderer} from "./perseus-renderer";

import type {PerseusItem} from "../../data-schema";
import type {Parser} from "../parser-types";

export const parsePerseusItem: Parser<PerseusItem> = object({
    question: parsePerseusRenderer,
    hints: defaulted(array(parseHint), () => []),
    answerArea: parsePerseusAnswerArea,
    itemDataVersion: optional(
        nullable(
            object({
                major: number,
                minor: number,
            }),
        ),
    ),
    // Deprecated field
    answer: any,
});
