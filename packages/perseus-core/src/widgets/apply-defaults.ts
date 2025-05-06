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
    // NOTE(jeremy): This looks like it could be replaced by fixing types so
    // that `type` is non-optional. But we're seeing this in Sentry today so I
    // suspect we have legacy data (potentially unpublished) and we should
    // figure that out before depending solely on types.
    if (!_.isString(type)) {
        throw new PerseusError(
            "widget type must be a string, but was: " + type,
            Errors.Internal,
        );
    }

    if (!isWidgetRegistered(type)) {
        // If we have a widget that isn't registered, we can't upgrade it
        // TODO(aria): Figure out what the best thing to do here would be
        return oldWidgetInfo;
    }

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

            if (!widgetInfo.type) {
                // TODO: why does widget have no type?
                // We don't want to derive type from widget ID
                // see: LEMS-1845
                newValues.type = widgetId.split(" ")[0];
            }

            if (!widgetInfo.alignment) {
                newValues.alignment = "default";
            }

            widgetInfo = {...widgetInfo, ...newValues};
        }

        return applyDefaultsToWidget(widgetInfo) as any;
    });
}
