// TODO(benchristel): export all parsers from general-purpose-parsers/index.ts
// so we only need to import from one place.
import {array} from "../general-purpose-parsers/array";
import {number} from "../general-purpose-parsers/number";
import {object} from "../general-purpose-parsers/object";

import {parsePerseusRenderer} from "./perseus-renderer";

import type {PerseusItem} from "../../../perseus-types";
import type {Parser} from "../parser-types";

const todo: Parser<any> = (rawValue, ctx) => ctx.success(rawValue);

export const parsePerseusItem: Parser<PerseusItem> = object({
    question: parsePerseusRenderer,
    hints: array(todo),
    answerArea: todo,
    itemDataVersion: object({
        major: number,
        minor: number,
    }),
    answer: todo,
});
