import {array} from "../general-purpose-parsers/array";
import {number} from "../general-purpose-parsers/number";
import {object} from "../general-purpose-parsers/object";

import type {PerseusItem} from "../../../perseus-types";
import type {Parser} from "../parser-types";

const todo: Parser<any> = (rawValue, ctx) => ctx.success(rawValue);

export const parsePerseusItem: Parser<PerseusItem> = object({
    question: todo,
    hints: array(todo),
    answerArea: todo,
    itemDataVersion: object({
        major: number,
        minor: number,
    }),
    answer: todo,
});
