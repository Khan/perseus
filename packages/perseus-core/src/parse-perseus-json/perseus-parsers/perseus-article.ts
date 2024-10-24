import type {PerseusArticle} from "../../data-schema";
import {array, union} from "../general-purpose-parsers";
import type {Parser} from "../parser-types";
import {parsePerseusRenderer} from "./perseus-renderer";

export const parsePerseusArticle: Parser<PerseusArticle> = union(
    parsePerseusRenderer,
).or(array(parsePerseusRenderer)).parser;
