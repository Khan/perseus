import {constant} from "../general-purpose-parsers";

import {parsePerseusRenderer} from "./perseus-renderer";
import {parseWidget} from "./widget";

export const parseGroupWidget = parseWidget(
    constant("group"),
    // This module has an import cycle with parsePerseusRenderer.
    // The anonymous function below ensures that we don't try to access
    // parsePerseusRenderer before it's defined.
    (rawVal, ctx) => parsePerseusRenderer(rawVal, ctx),
    // Graded Group Set is a container for other widgets - it can't be
    // set as static or readonly itself.
    {supportsStatic: false},
);
