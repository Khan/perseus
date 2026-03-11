import {any, object, pipeParsers, string} from "../general-purpose-parsers";
import {convert} from "../general-purpose-parsers/convert";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseImages} from "./images-map";
import {parseWidgetsMap} from "./widgets-map";

import type {PerseusRenderer} from "../../data-schema";
import type {Parser} from "../parser-types";

const parseRenderer = object({
    // TODO(benchristel): content is also defaulted to empty string in
    // renderer.tsx. See if we can remove one default or the other.
    content: defaulted(string, () => ""),
    // This module has an import cycle with parseWidgetsMap, because the
    // `group` widget can contain another renderer.
    // The anonymous function below ensures that we don't try to access
    // parseWidgetsMap before it's defined.
    widgets: defaulted(
        (rawVal, ctx) => parseWidgetsMap(rawVal, ctx),
        () => ({}),
    ),
    images: parseImages,
    // deprecated
    metadata: any,
});

const createDefaultRenderer = () => ({
    content: "",
    widgets: {},
    images: {},
});

function removeOrphanedWidgets(renderer: PerseusRenderer): PerseusRenderer {
    return renderer;
}

export const parsePerseusRenderer: Parser<PerseusRenderer> = pipeParsers(
    defaulted(parseRenderer, createDefaultRenderer),
).then(convert(removeOrphanedWidgets)).parser;
