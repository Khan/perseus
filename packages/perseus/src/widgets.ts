import {Errors, PerseusError} from "@khanacademy/perseus-core";
import _ from "underscore";

import {Log} from "./logging/log";

import type {PerseusWidget} from "./perseus-types";
import type {PerseusStrings} from "./strings";
import type {
    Alignment,
    Tracking,
    Version,
    WidgetExports,
    WidgetTransform,
    WidgetValidatorFunction,
} from "./types";
import type * as React from "react";

const DEFAULT_ALIGNMENT = "block";
// NOTE(kevinb): "default" is not one in `validAlignments`.
const DEFAULT_SUPPORTED_ALIGNMENTS = ["default"];
const DEFAULT_STATIC = false;
const DEFAULT_TRACKING = "";
const DEFAULT_LINTABLE = false;

type Editor = any;

const widgets: {
    [key: string]: WidgetExports;
} = {};
const editors: Record<string, any> = {};

// Widgets must be registered to avoid circular dependencies with the
// core Editor and Renderer components.
// TODO(jeremy): The widget name is already embedded in the WidgetExports type
// so could we drop the `name` parameter here?
export const registerWidget = (name: string, widget: WidgetExports) => {
    widgets[name] = widget;
};

export const registerWidgets = (widgets: ReadonlyArray<WidgetExports>) => {
    widgets.forEach((widget) => {
        registerWidget(widget.name, widget);
    });

    validateAlignments();
};

/**
 *
 * @param name - the widget that you are trying to replace
 * @param replacementName - the name of the widget that takes its place
 *
 * e.g. replaceWidget("transformer", "deprecated-standin") will make it so the
 * transformer widget is replaced by the always correct widget
 */
export const replaceWidget = (name: string, replacementName: string) => {
    const substituteWidget = widgets[replacementName];

    // If the replacement widget isn't found, we need to throw. Otherwise after
    // removing the deprecated widget, we'll have data asking for a widget type
    // that doesn't exist at all.
    if (!substituteWidget) {
        const errorMsg = `Failed to replace ${name} with ${replacementName}`;
        throw new PerseusError(errorMsg, Errors.Internal);
    }

    registerWidget(name, substituteWidget);
};

export const replaceDeprecatedWidgets = () => {
    replaceWidget("transformer", "deprecated-standin");
    replaceWidget("lights-puzzle", "deprecated-standin");
    replaceWidget("reaction-diagram", "deprecated-standin");
    replaceWidget("sequence", "deprecated-standin");
    replaceWidget("simulator", "deprecated-standin");
    replaceWidget("unit-input", "deprecated-standin");
};

export const registerEditors = (editorsToRegister: ReadonlyArray<Editor>) => {
    editorsToRegister.forEach((editor) => {
        if (!editor.widgetName) {
            throw new PerseusError(
                `Editor ${editor.displayName} doesn't have a widgetName property`,
                Errors.Internal,
            );
        }
        editors[editor.widgetName] = editor;
    });
};

/**
 *
 * @param name - the widget that you are trying to replace
 * @param replacementName - the name of the widget that takes its place
 *
 * e.g. replaceEditor("transformer", "deprecated-standin") will make it so the
 * transformer widget is replaced by the deprecated stand-in widget
 */
export const replaceEditor = (name: string, replacementName: string) => {
    const substituteEditor = editors[replacementName];

    if (!substituteEditor && Log) {
        const errorMsg = `Failed to replace editor ${name} with ${replacementName}`;
        Log.error(errorMsg, Errors.Internal);
        return;
    }

    editors[name] = substituteEditor;
};

export const replaceDeprecatedEditors = () => {
    replaceEditor("transformer", "deprecated-standin");
    replaceEditor("lights-puzzle", "deprecated-standin");
    replaceEditor("reaction-diagram", "deprecated-standin");
    replaceEditor("sequence", "deprecated-standin");
    replaceEditor("simulator", "deprecated-standin");
    replaceEditor("unit-input", "deprecated-standin");
};

export const getWidget = (
    name: string,
): React.ComponentType<any> | null | undefined => {
    // TODO(alex): Consider referring to these as renderers to avoid
    // overloading "widget"
    if (!_.has(widgets, name)) {
        return null;
    }

    // Allow widgets to specify a widget directly or via a function
    if (widgets[name]?.getWidget) {
        return widgets[name].getWidget?.();
    }
    return widgets[name].widget;
};

export const getWidgetValidator = (
    name: string,
): WidgetValidatorFunction | null => {
    return widgets[name]?.validator ?? null;
};

export const getEditor = (name: string): Editor | null | undefined => {
    return _.has(editors, name) ? editors[name] : null;
};

export const getTransform = (
    name: string,
): WidgetTransform | null | undefined => {
    return _.has(widgets, name) ? widgets[name].transform || _.identity : null;
};

export const getVersion = (name: string): Version | undefined => {
    const widgetInfo = widgets[name];
    if (widgetInfo) {
        return widgets[name].version || {major: 0, minor: 0};
    }
    return;
};

export const getVersionVector = (): {
    [key: string]: Version;
} => {
    const version: Record<string, any> = {};
    _.each(_.keys(widgets), function (name) {
        version[name] = getVersion(name);
    });
    return version;
};

export const getPublicWidgets = (): ReadonlyArray<WidgetExports> => {
    // TODO(alex): Update underscore.js so that _.pick can take a function.
    // @ts-expect-error - TS2740 - Type 'Pick<{ [key: string]: Readonly<{ name: string; displayName: string; getWidget?: (() => ComponentType<any>) | undefined; accessible?: boolean | ((props: any) => boolean) | undefined; hidden?: boolean | undefined; ... 10 more ...; widget: ComponentType<...>; }>; }, string>' is missing the following properties from type 'readonly Readonly<{ name: string; displayName: string; getWidget?: (() => ComponentType<any>) | undefined; accessible?: boolean | ((props: any) => boolean) | undefined; hidden?: boolean | undefined; ... 10 more ...; widget: ComponentType<...>; }>[]': length, concat, join, slice, and 18 more.
    return _.pick(
        widgets,
        // @ts-expect-error - TS2345 - Argument of type '(name: string) => boolean | undefined' is not assignable to parameter of type 'Iteratee<string[], boolean, string>'.
        _.reject(_.keys(widgets), function (name) {
            return widgets[name].hidden;
        }),
    );
};

export const isAccessible = (widgetInfo: PerseusWidget): boolean => {
    const accessible = widgets[widgetInfo.type].accessible;
    if (typeof accessible === "function") {
        return accessible(widgetInfo.options);
    }
    return !!accessible;
};

export const getAllWidgetTypes = (): ReadonlyArray<string> => {
    return _.keys(widgets);
};

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
    const widgetExports = widgets[type];

    if (widgetExports == null) {
        // If we have a widget that isn't registered, we can't upgrade it
        // TODO(aria): Figure out what the best thing to do here would be
        return oldWidgetInfo;
    }

    // Unversioned widgets (pre-July 2014) are all implicitly 0.0
    const initialVersion = oldWidgetInfo.version || {major: 0, minor: 0};
    const latestVersion = widgetExports.version || {major: 0, minor: 0};

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
    let newEditorProps = _.clone(oldWidgetInfo.options) || {};

    const upgradePropsMap = widgetExports.propUpgrades || {};

    // Empty props usually mean a newly created widget by the editor,
    // and are always considerered up-to-date.
    // Mostly, we'd rather not run upgrade functions on props that are
    // not complete.
    if (_.keys(newEditorProps).length !== 0) {
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
                newEditorProps =
                    upgradePropsMap[String(nextVersion)](newEditorProps);
            } else {
                // This is a Log.error because it is unlikely to be hit in
                // local testing, and a Log.error is slightly less scary in
                // prod than a `throw new Error`
                Log.error(
                    "No upgrade found for widget. Cannot render.",
                    Errors.Internal,
                    {
                        loggedMetadata: {
                            type,
                            fromMajorVersion: nextVersion - 1,
                            toMajorVersion: nextVersion,
                        },
                    },
                );
                // But try to keep going anyways (yolo!)
                // (Throwing an error here would just break the page
                // silently anyways, so that doesn't seem much better
                // than a halfhearted attempt to continue, however
                // shallow...)
            }
        }
    }

    // Minor version upgrades (eg. new optional props) don't have
    // transform functions. Instead, we fill in the new props with their
    // defaults.
    const defaultProps = type in editors ? editors[type].defaultProps : {};
    newEditorProps = {
        ...defaultProps,
        ...newEditorProps,
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
        options: newEditorProps,
    });
};

export const getRendererPropsForWidgetInfo = (
    widgetInfo: PerseusWidget,
    strings: PerseusStrings,
    problemNum?: number,
): PerseusWidget => {
    const type = widgetInfo.type;
    const widgetExports = widgets[type];
    if (widgetExports == null) {
        // The widget is not a registered widget
        // It shouldn't matter what we return here, but for consistency
        // we return the untransformed options, as if the widget did
        // not have a transform defined.
        return widgetInfo;
    }
    let transform;
    if (widgetInfo.static) {
        // There aren't a lot of real places where we'll have to default to
        // _.identity, but it's theoretically possible if someone changes
        // the JSON manually / we have to back out static support for a
        // widget.
        transform = getStaticTransform(type) || _.identity;
    } else {
        transform = widgetExports.transform || _.identity;
    }
    // widgetInfo.options are the widgetEditor's props:
    return transform(widgetInfo.options, strings, problemNum);
};

export const traverseChildWidgets = (
    widgetInfo: PerseusWidget,
    traverseRenderer: any,
): PerseusWidget => {
    if (!traverseRenderer) {
        throw new PerseusError(
            "traverseRenderer must be provided, but was not",
            Errors.Internal,
        );
    }

    if (!widgetInfo || !widgetInfo.type || !widgets[widgetInfo.type]) {
        return widgetInfo;
    }

    const widgetExports = widgets[widgetInfo.type];
    const props = widgetInfo.options;

    if (widgetExports.traverseChildWidgets && props) {
        const newProps = widgetExports.traverseChildWidgets(
            props,
            traverseRenderer,
        );
        return _.extend({}, widgetInfo, {options: newProps});
    }
    return widgetInfo;
};

/**
 * Handling for the optional alignments for widgets
 * See widget-container.jsx for details on how alignments are implemented.
 */

/**
 * Returns the list of supported alignments for the given (string) widget
 * type. This is used primarily at editing time to display the choices
 * for the user.
 *
 * Supported alignments are given as an array of strings in the exports of
 * a widget's module.
 */
export const getSupportedAlignments = (
    type: string,
): ReadonlyArray<Alignment> => {
    const widgetExport = widgets[type];
    // @ts-expect-error - TS2322 - Type 'string[] | readonly Alignment[]' is not assignable to type 'readonly Alignment[]'.
    return (
        (widgetExport && widgetExport.supportedAlignments) ||
        DEFAULT_SUPPORTED_ALIGNMENTS
    );
};

/**
 * For the given (string) widget type, determine the default alignment for
 * the widget. This is used at rendering time to go from "default" alignment
 * to the actual alignment displayed on the screen.
 *
 * The default alignment is given either as a string (called
 * `defaultAlignment`) or a function (called `getDefaultAlignment`) on
 * the exports of a widget's module.
 */
export const getDefaultAlignment = (type: string): Alignment => {
    const widgetExports = widgets[type];
    let alignment;
    if (!widgetExports) {
        return DEFAULT_ALIGNMENT;
    }

    if (widgetExports.getDefaultAlignment) {
        alignment = widgetExports.getDefaultAlignment();
    } else {
        alignment = widgetExports.defaultAlignment;
    }
    return alignment || DEFAULT_ALIGNMENT;
};

const validAlignments: ReadonlyArray<Alignment> = [
    "block",
    "inline-block",
    "inline",
    "float-left",
    "float-right",
    "full-width",
];

/**
 * Used at startup to fail fast if an alignment given by a widget is
 * invalid.
 */
// TODO(alex): Change this to run as a testcase (vs. being run at runtime)
// TODO(LP-10707): I think this can be completely removed because our TypeScript types
// enforce this!
export const validateAlignments = () => {
    _.each(widgets, function (widgetInfo) {
        if (
            widgetInfo.defaultAlignment &&
            !_.contains(validAlignments, widgetInfo.defaultAlignment)
        ) {
            throw new PerseusError(
                "Widget '" +
                    widgetInfo.displayName +
                    "' has an invalid defaultAlignment value: " +
                    widgetInfo.defaultAlignment,
                Errors.InvalidInput,
            );
        }

        if (widgetInfo.supportedAlignments) {
            const unknownAlignments = _.difference(
                widgetInfo.supportedAlignments,
                validAlignments,
            );

            if (unknownAlignments.length) {
                throw new PerseusError(
                    "Widget '" +
                        widgetInfo.displayName +
                        "' has an invalid value for supportedAlignments: " +
                        unknownAlignments.join(" "),
                    Errors.InvalidInput,
                );
            }
        }
    });
};

/**
 * Handling for static mode for widgets that support it.
 */

/**
 * Returns true iff the widget supports static mode.
 * A widget implicitly supports static mode if it exports a
 * staticTransform function.
 */
export const supportsStaticMode = (type: string): boolean => {
    const widgetInfo = widgets[type];
    return widgetInfo && widgetInfo.staticTransform != null;
};

/**
 * Return the staticTransform function used to convert the editorProps to
 * the rendered widget state.
 */
export const getStaticTransform = (
    type: string,
): WidgetTransform | null | undefined => {
    const widgetInfo = widgets[type];
    return widgetInfo && widgetInfo.staticTransform;
};

/**
 * Returns the tracking option for the widget. The default is "",
 * which means simply to track interactions once. The other available
 * option is "all" which means to track all interactions.
 */
export const getTracking = (type: string): Tracking => {
    const widgetExport = widgets[type];
    return (widgetExport && widgetExport.tracking) || DEFAULT_TRACKING;
};

/**
 * Returns true if this widget can include lintable markdown text
 * and supports a highlightLint prop, or false otherwise.
 */
export const isLintable = (type: string): boolean => {
    const widgetExports = widgets[type];
    return (widgetExports && widgetExports.isLintable) || DEFAULT_LINTABLE;
};
