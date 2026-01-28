import _ from "underscore";

import {Errors} from "../error/errors";
import {PerseusError} from "../error/perseus-error";
import {mapObject} from "../utils/objective_";

import {
    getCurrentVersion,
    getDefaultWidgetOptions,
    getSupportedAlignments,
    isWidgetRegistered,
} from "./core-widget-registry";

import type {PerseusWidget, PerseusWidgetsMap} from "../data-schema";

const DEFAULT_STATIC = false;

export const applyDefaultsToWidget = (
    oldWidgetInfo: PerseusWidget,
): PerseusWidget => {
    const type = oldWidgetInfo.type;

    // Unversioned widgets (pre-July 2014) are all implicitly 0.0
    const initialVersion = oldWidgetInfo.version || {major: 0, minor: 0};
    const latestVersion = getCurrentVersion(type);

    // If the widget version is later than what we understand (major
    // version is higher than latest, or major versions are equal and minor
    // version is higher than latest), don't perform any upgrades.
    if (
        initialVersion.major > latestVersion.major ||
        (initialVersion.major === latestVersion.major &&
            initialVersion.minor > latestVersion.minor)
    ) {
        return oldWidgetInfo;
    }

    let newEditorOptions = _.clone(oldWidgetInfo.options) ?? {};

    // Minor version upgrades (eg. new optional props) don't have
    // transform functions. Instead, we fill in the new props with their
    // defaults.
    const defaultOptions = getDefaultWidgetOptions(type);
    newEditorOptions = {
        ...defaultOptions,
        ...newEditorOptions,
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

    let widgetStatic = oldWidgetInfo.static;

    if (widgetStatic == null) {
        widgetStatic = DEFAULT_STATIC;
    }

    return {
        ...oldWidgetInfo,
        // maintain other info, like type
        // After upgrading we guarantee that the version is up-to-date
        version: latestVersion,
        // Default graded to true (so null/undefined becomes true):
        graded: oldWidgetInfo.graded != null ? oldWidgetInfo.graded : true,
        alignment: alignment,
        static: widgetStatic,
        options: newEditorOptions,
    } as any;
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
