// TODO(benchristel): export all parsers from general-purpose-parsers/index.ts
// so we only need to import from one place.
import {array} from "../general-purpose-parsers/array";
import {number} from "../general-purpose-parsers/number";
import {object} from "../general-purpose-parsers/object";

import {parseHint} from "./hint";
import {parsePerseusRenderer} from "./perseus-renderer";

import type {PerseusItem} from "../../../perseus-types";
import type {Parser} from "../parser-types";
import {record} from "../general-purpose-parsers/record";
import {ItemExtras} from "../../../perseus-types";
import {enumeration} from "../general-purpose-parsers/enumeration";
import {boolean} from "../general-purpose-parsers/boolean";
import {any} from "../general-purpose-parsers/any";

export const parsePerseusItem: Parser<PerseusItem> = object({
    question: parsePerseusRenderer,
    hints: array(parseHint),
    answerArea: record(enumeration(ItemExtras), boolean),
    itemDataVersion: object({
        major: number,
        minor: number,
    }),
    // Deprecated field
    answer: any,
});
