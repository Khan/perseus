import type {GroupWidget} from "../../data-schema";
import {constant} from "../general-purpose-parsers";
import type {Parser} from "../parser-types";
import {parsePerseusRenderer} from "./perseus-renderer";
import {parseWidget} from "./widget";

export const parseGroupWidget: Parser<GroupWidget> = parseWidget(
    constant("group"),
    // This module has an import cycle with parsePerseusRenderer.
    // The anonymous function below ensures that we don't try to access
    // parsePerseusRenderer before it's defined.
    (rawVal, ctx) => parsePerseusRenderer(rawVal, ctx),
);
