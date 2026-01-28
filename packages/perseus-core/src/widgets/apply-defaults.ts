import _ from "underscore";

import {Errors} from "../error/errors";
import {PerseusError} from "../error/perseus-error";
import {mapObject} from "../utils/objective_";

import {getCurrentVersion, getDefaultWidgetOptions, getSupportedAlignments,} from "./core-widget-registry";

import type {PerseusWidget, PerseusWidgetsMap} from "../data-schema";

const DEFAULT_STATIC = false;

export const applyDefaultsToWidget = (
    oldWidgetInfo: PerseusWidget,
): PerseusWidget => {
    const type = oldWidgetInfo.type;

    const latestVersion = getCurrentVersion(type);
    // pre-July 2014, widgets did not have a version field.
    const version = oldWidgetInfo.version ?? latestVersion

    // Minor version upgrades (eg. new optional props) don't have
    // transform functions. Instead, we fill in the new props with their
    // defaults.
    const defaultOptions = getDefaultWidgetOptions(type);
    const newEditorOptions = {
        ...defaultOptions,
        ...(_.clone(oldWidgetInfo.options) ?? {}),
    };

    let alignment = oldWidgetInfo.alignment;

    // Widgets that support multiple alignments will "lock in" the
    // alignment to the alignment that would be listed first in the
    // select box. If the widget only supports one alignment, the
    // alignment value will likely just end up as "default".
    if (alignment == null || alignment === "default") {
        alignment = getSupportedAlignments(type)?.[0];
        if (!alignment) {
            throw new PerseusError(
                "No default alignment found when upgrading widget",
                Errors.Internal,
                {metadata: {widgetType: type}},
            );
        }
    }

    return {
        // maintain other info, like type
        ...oldWidgetInfo,
        version,
        // Default graded to true (so null/undefined becomes true):
        graded: oldWidgetInfo.graded != null ? oldWidgetInfo.graded : true,
        alignment: alignment,
        static: oldWidgetInfo.static ?? DEFAULT_STATIC,
        options: newEditorOptions,
    };
};

export function applyDefaultsToWidgets(
    oldWidgetOptions: PerseusWidgetsMap,
): PerseusWidgetsMap {
    return mapObject(oldWidgetOptions, (widgetInfo, widgetId) => {
        if (!widgetInfo.type || !widgetInfo.alignment) {
            const newValues: Record<string, any> = {};

            if (!widgetInfo.alignment) {
                newValues.alignment = "default";
            }

            widgetInfo = {...widgetInfo, ...newValues};
        }

        return applyDefaultsToWidget(widgetInfo) as any;
    });
}
