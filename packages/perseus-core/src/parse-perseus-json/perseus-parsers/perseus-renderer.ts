import {any, object, pipeParsers, string} from "../general-purpose-parsers";
import {convert} from "../general-purpose-parsers/convert";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseImages} from "./images-map";
import {parseWidgetsMap} from "./widgets-map";

import type {PerseusRenderer, PerseusWidgetsMap} from "../../data-schema";
import type {Parser} from "../parser-types";
import {getWidgetIdsFromContent} from "@khanacademy/perseus-core";

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
    const referencedWidgetIds = getWidgetIdsFromContent(renderer.content)

    const referencedWidgets: PerseusWidgetsMap = {}
    for (const id of referencedWidgetIds) {
        referencedWidgets[id] = renderer.widgets[id]
    }

    return {
        ...renderer,
        widgets: referencedWidgets,
    };
}

export const parsePerseusRenderer: Parser<PerseusRenderer> = pipeParsers(
    defaulted(parseRenderer, createDefaultRenderer),
).then(convert(removeOrphanedWidgets)).parser;
