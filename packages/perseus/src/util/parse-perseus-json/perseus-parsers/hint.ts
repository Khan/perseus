import {array} from "../general-purpose-parsers/array";
import {boolean} from "../general-purpose-parsers/boolean";
import {number} from "../general-purpose-parsers/number";
import {object} from "../general-purpose-parsers/object";
import {optional} from "../general-purpose-parsers/optional";
import {record} from "../general-purpose-parsers/record";
import {string} from "../general-purpose-parsers/string";

import {parseWidgetsMap} from "./widgets-map";

import type {Hint} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseHint: Parser<Hint> = object({
    replace: optional(boolean),
    content: string,
    widgets: parseWidgetsMap,
    metadata: optional(array(string)),
    images: record(
        string,
        object({
            width: number,
            height: number,
        }),
    ),
});
