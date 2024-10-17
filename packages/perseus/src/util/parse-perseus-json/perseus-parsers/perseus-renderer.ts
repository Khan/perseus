import {array} from "../general-purpose-parsers/array";
import {object} from "../general-purpose-parsers/object";
import {optional} from "../general-purpose-parsers/optional";
import {string} from "../general-purpose-parsers/string";

import {parseWidgetsMap} from "./widgets-map";

import type {PerseusRenderer} from "../../../perseus-types";
import type {Parser} from "../parser-types";

const todo: Parser<any> = (rawValue, ctx) => ctx.success(rawValue);

export const parsePerseusRenderer: Parser<PerseusRenderer> = object({
    content: string,
    widgets: parseWidgetsMap,
    metadata: optional(array(string)),
    images: todo,
});
