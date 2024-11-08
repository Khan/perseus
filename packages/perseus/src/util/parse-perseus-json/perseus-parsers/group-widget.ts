import {constant} from "../general-purpose-parsers";

import {parsePerseusRenderer} from "./perseus-renderer";
import {parseWidget} from "./widget";

import type {GroupWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseGroupWidget: Parser<GroupWidget> = parseWidget(
    constant("group"),
    // This module has an import cycle with parsePerseusRenderer.
    // The anonymous function below ensures that we don't try to access
    // parsePerseusRenderer before it's defined.
    (rawVal, ctx) => parsePerseusRenderer(rawVal, ctx),
);
