import _ from "underscore";

import {Errors} from "../error/errors";
import {PerseusError} from "../error/perseus-error";
import {mapObject} from "../utils/objective_";

import {
    getCurrentVersion,
    getDefaultWidgetOptions,
    getSupportedAlignments,
    getWidgetOptionsUpgrades,
    isWidgetRegistered,
} from "./core-widget-registry";

import type {PerseusWidget, PerseusWidgetsMap} from "../data-schema";

const DEFAULT_STATIC = false;

export const upgradeWidgetInfoToLatestVersion = (
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

    // We do a clone here so that it's safe to mutate the input parameter
    // in propUpgrades functions (which I will probably accidentally do at
    // some point, and we would like to not break when that happens).
    let newEditorOptions = _.clone(oldWidgetInfo.options) || {};

    const upgradePropsMap = getWidgetOptionsUpgrades(type);

    // Empty props usually mean a newly created widget by the editor,
    // and are always considerered up-to-date.
    // Mostly, we'd rather not run upgrade functions on props that are
    // not complete.
    if (_.keys(newEditorOptions).length !== 0) {
        // We loop through all the versions after the current version of
        // the loaded widget, up to and including the latest version of the
        // loaded widget, and run the upgrade function to bring our loaded
        // widget's props up to that version.
        // There is a little subtlety here in that we call
        // upgradePropsMap[1] to upgrade *to* version 1,
        // (not from version 1).
        for (
            let nextVersion = initialVersion.major + 1;
            nextVersion <= latestVersion.major;
            nextVersion++
        ) {
            if (upgradePropsMap[String(nextVersion)]) {
                newEditorOptions =
                    upgradePropsMap[String(nextVersion)](newEditorOptions);
            } else {
                throw new PerseusError(
                    "No upgrade found for widget. Cannot render.",
                    Errors.Internal,
                    {
                        metadata: {
                            type,
                            fromMajorVersion: nextVersion - 1,
                            toMajorVersion: nextVersion,
                        },
                    },
                );
            }
        }
    }

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
        alignment = getSupportedAlignments(type)[0];
    }

    let widgetStatic = oldWidgetInfo.static;

    if (widgetStatic == null) {
        widgetStatic = DEFAULT_STATIC;
    }

    return _.extend({}, oldWidgetInfo, {
        // maintain other info, like type
        // After upgrading we guarantee that the version is up-to-date
        version: latestVersion,
        // Default graded to true (so null/undefined becomes true):
        graded: oldWidgetInfo.graded != null ? oldWidgetInfo.graded : true,
        alignment: alignment,
        static: widgetStatic,
        options: newEditorOptions,
    });
};

export function getUpgradedWidgetOptions(
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

        return upgradeWidgetInfoToLatestVersion(widgetInfo) as any;
    });
}
