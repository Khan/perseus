import {
    boolean,
    constant,
    nullable,
    number,
    object,
    optional,
    record,
    string,
} from "../general-purpose-parsers";

import {parsePerseusRenderer} from "./perseus-renderer";
import {parseWidget} from "./widget";
import {parseWidgetsMap} from "./widgets-map";

import type {GradedGroupWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseGradedGroupWidgetOptions = object({
    title: string,
    hasHint: optional(nullable(boolean)),
    // This module has an import cycle with parsePerseusRenderer.
    // The anonymous function below ensures that we don't try to access
    // parsePerseusRenderer before it's defined.
    hint: optional(
        nullable((rawVal, ctx) => parsePerseusRenderer(rawVal, ctx)),
    ),
    content: string,
    // This module has an import cycle with parseWidgetsMap.
    // The anonymous function below ensures that we don't try to access
    // parseWidgetsMap before it's defined.
    widgets: (rawVal, ctx) => parseWidgetsMap(rawVal, ctx),
    widgetEnabled: optional(nullable(boolean)),
    immutableWidgets: optional(nullable(boolean)),
    images: record(
        string,
        object({
            width: number,
            height: number,
        }),
    ),
});

export const parseGradedGroupWidget: Parser<GradedGroupWidget> = parseWidget(
    constant("graded-group"),
    parseGradedGroupWidgetOptions,
);
