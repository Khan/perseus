import {array, union} from "../general-purpose-parsers";

import {parsePerseusRenderer} from "./perseus-renderer";

// TODO(LEMS-4224): don't import from outside of the parser
// eslint-disable-next-line import/no-restricted-paths
import type {PerseusArticle} from "../../data-schema";
import type {Parser} from "../parser-types";

export const parsePerseusArticle: Parser<PerseusArticle> = union(
    parsePerseusRenderer,
).or(array(parsePerseusRenderer)).parser;
