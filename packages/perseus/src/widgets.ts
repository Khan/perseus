import {Errors, PerseusError} from "@khanacademy/perseus-core";
import _ from "underscore";

import {Log} from "./logging/log";

import type {PerseusStrings} from "./strings";
import type {Tracking, WidgetExports, WidgetTransform} from "./types";
import type {PerseusWidget, Version} from "@khanacademy/perseus-core";
import type * as React from "react";

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

export const getWidgetExport = (name: string): WidgetExports | null => {
    return widgets[name] ?? null;
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
