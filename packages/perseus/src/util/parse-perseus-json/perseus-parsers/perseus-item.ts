// TODO(benchristel): export all parsers from general-purpose-parsers/index.ts
// so we only need to import from one place.
import {ItemExtras} from "../../../perseus-types";
import {any} from "../general-purpose-parsers/any";
import {array} from "../general-purpose-parsers/array";
import {boolean} from "../general-purpose-parsers/boolean";
import {enumeration} from "../general-purpose-parsers/enumeration";
import {number} from "../general-purpose-parsers/number";
import {object} from "../general-purpose-parsers/object";
import {record} from "../general-purpose-parsers/record";

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
