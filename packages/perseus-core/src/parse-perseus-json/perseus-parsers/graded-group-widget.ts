import {
    boolean,
    constant,
    nullable,
    number,
    object,
    optional,
    pipeParsers,
    record,
    string,
    union,
} from "../general-purpose-parsers";
import {convert} from "../general-purpose-parsers/convert";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parsePerseusRenderer} from "./perseus-renderer";
import {parseWidget} from "./widget";
import {parseWidgetsMap} from "./widgets-map";

const falseToNull = pipeParsers(constant(false)).then(
    convert(() => null),
).parser;
export const parseGradedGroupWidgetOptions = object({
    title: defaulted(string, () => ""),
    hasHint: optional(nullable(boolean)),
    // This module has an import cycle with parsePerseusRenderer.
    // The anonymous function below ensures that we don't try to access
    // parsePerseusRenderer before it's defined.
    hint: union(falseToNull)
        .or(constant(null))
        .or(constant(undefined))
        .or((rawVal, ctx) => parsePerseusRenderer(rawVal, ctx)).parser,
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

export const parseGradedGroupWidget = parseWidget(
    constant("graded-group"),
    parseGradedGroupWidgetOptions,
);
