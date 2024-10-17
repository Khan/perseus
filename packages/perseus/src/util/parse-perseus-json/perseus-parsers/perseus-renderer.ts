import {array} from "../general-purpose-parsers/array";
import {number} from "../general-purpose-parsers/number";
import {object} from "../general-purpose-parsers/object";
import {optional} from "../general-purpose-parsers/optional";
import {record} from "../general-purpose-parsers/record";
import {string} from "../general-purpose-parsers/string";

import {parseWidgetsMap} from "./widgets-map";

import type {PerseusRenderer} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parsePerseusRenderer: Parser<PerseusRenderer> = object({
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
