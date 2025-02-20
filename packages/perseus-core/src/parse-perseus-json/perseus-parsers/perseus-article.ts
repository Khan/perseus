import {array, union} from "../general-purpose-parsers";

import {parsePerseusRenderer} from "./perseus-renderer";

import type {PerseusArticle} from "../../data-schema";
import type {Parser} from "../parser-types";

export const parsePerseusArticle: Parser<PerseusArticle> = union(
    parsePerseusRenderer,
).or(array(parsePerseusRenderer)).parser;
