import {array, union} from "../general-purpose-parsers";

import {parsePerseusRenderer} from "./perseus-renderer";

import type {Parser} from "../parser-types";
import type {PerseusArticle} from "@khanacademy/perseus-core";

export const parsePerseusArticle: Parser<PerseusArticle> = union(
    parsePerseusRenderer,
).or(array(parsePerseusRenderer)).parser;
