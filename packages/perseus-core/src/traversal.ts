/**
 * Traverses a {content, widgets, images} renderer props object,
 * such as `itemData.question`
 *
 * This traversal is deep and handles some widget prop upgrades
 * (TODO(aria): Handle minor prop upgrades :) )
 *
 * This is the right way to traverse itemData.
 *
 * NOTE: We should not expose this on the perseus API yet. Instead,
 * build the traversal method you want inside perseus, and use this
 * from that. We might eventually expose this, but I'd like to be
 * more confident in the interface provided first.
 */

import _ from "underscore";

import {mapObject} from "./utils/objective_";
import * as Widgets from "./widgets/core-widget-registry";

import type {PerseusRenderer} from "./data-schema";

const noop = function () {};

const deepCallbackFor = function (
    contentCallback: (arg1: any) => void,
    widgetCallback: (widgetInfo: any, widgetId: string) => any,
    optionsCallback: (arg1: any) => void,
) {
    const deepCallback = function (widgetInfo: any, widgetId: string) {
        const newWidgetInfo = Widgets.traverseChildWidgets(
            widgetInfo,
            (rendererOptions) => {
                return traverseRenderer(
                    rendererOptions,
                    contentCallback,
                    // so that we traverse grandchildren, too:
                    deepCallback,
                    optionsCallback,
                );
            },
        );

        const userWidgetInfo = widgetCallback(newWidgetInfo, widgetId);
        if (userWidgetInfo !== undefined) {
            return userWidgetInfo;
        }
        return newWidgetInfo;
    };
    return deepCallback;
};

const traverseRenderer = function (
    rendererOptions,
    contentCallback: (arg1: any) => void,
    deepWidgetCallback: (widgetInfo: any, widgetId: string) => any,
    optionsCallback: (arg1: any) => void,
) {
    let newContent = rendererOptions.content;
    if (rendererOptions.content != null) {
        const modifiedContent = contentCallback(rendererOptions.content);
        if (modifiedContent !== undefined) {
            newContent = modifiedContent;
        }
    }

    const newWidgets = mapObject(
        rendererOptions.widgets || {},
        function (widgetInfo, widgetId) {
            // Widgets without info or a type are empty widgets, and
            // should always be renderable. It's also annoying to write
            // checks for this everywhere, so we just filter them out once and
            // for all!
            // @ts-expect-error - TS2571 - Object is of type 'unknown'.
            if (widgetInfo == null || widgetInfo.type == null) {
                return widgetInfo;
            }
            return deepWidgetCallback(widgetInfo, widgetId);
        },
    );

    const newOptions = _.extend({}, rendererOptions, {
        content: newContent,
        widgets: newWidgets,
    });
    const userOptions = optionsCallback(newOptions);
    if (userOptions !== undefined) {
        return userOptions;
    }
    return newOptions;
};

export const traverse = function (
    rendererOptions: PerseusRenderer,
    contentCallback?: ((arg1: any) => any) | null,
    widgetCallback?: ((widgetInfo: any, widgetId: string) => any) | null,
    optionsCallback?: (arg1: any) => void,
): any {
    contentCallback = contentCallback || noop;
    widgetCallback = widgetCallback || noop;
    optionsCallback = optionsCallback || noop;

    return traverseRenderer(
        rendererOptions,
        contentCallback,
        deepCallbackFor(contentCallback, widgetCallback, optionsCallback),
        optionsCallback,
    );
};
