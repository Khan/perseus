import {Errors} from "../error/errors";
import {PerseusError} from "../error/perseus-error";
import {mapObject} from "../utils/objective_";

import {
    getCurrentVersion,
    getInitialWidgetOptions,
    getSupportedAlignments,
} from "./core-widget-registry";

import type {PerseusWidget, PerseusWidgetsMap} from "../data-schema";

export const applyDefaultsToWidget = (
    oldWidgetInfo: PerseusWidget,
): PerseusWidget => {
    const type = oldWidgetInfo.type;

    const latestVersion = getCurrentVersion(type);
    // pre-July 2014, widgets did not have a version field.
    const version = oldWidgetInfo.version ?? latestVersion;

    // Minor version upgrades (eg. new optional props) don't have
    // transform functions. Instead, we fill in the new props with their
    // defaults.
    const defaultOptions = getInitialWidgetOptions(type);
    const options = {
        ...defaultOptions,
        ...oldWidgetInfo.options,
    };

    let alignment = oldWidgetInfo.alignment;

    // Widgets that support multiple alignments will "lock in" the
    // alignment to the alignment that would be listed first in the
    // select box.
    if (alignment == null || alignment === "default") {
        alignment = getSupportedAlignments(type)?.[0];
        if (!alignment) {
            throw new PerseusError(
                "applyDefaultsToWidget: No default alignment found",
                Errors.Internal,
                {metadata: {widgetType: type}},
            );
        }
    }

    return {
        // maintain other info, like type
        ...oldWidgetInfo,
        version,
        graded: oldWidgetInfo.graded ?? true,
        alignment,
        static: oldWidgetInfo.static ?? false,
        options,
    };
};

export function applyDefaultsToWidgets(
    oldWidgetOptions: PerseusWidgetsMap,
): PerseusWidgetsMap {
    // The cast to PerseusWidgetsMap is needed because TS can't prove that
    // every key in the map will match the associated widget's `type`
    // property.
    return mapObject(
        oldWidgetOptions,
        applyDefaultsToWidget,
    ) as PerseusWidgetsMap;
}
