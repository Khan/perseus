import {
    Errors,
    PerseusError,
    getInaccessibleProxy,
} from "@khanacademy/perseus-core";

import {Log} from "./logging/log";

import type {PerseusStrings} from "./strings";
import type {Tracking, WidgetExports, WidgetTransform} from "./types";
import type {PerseusWidget, Version} from "@khanacademy/perseus-core";
import type * as React from "react";

const DEFAULT_TRACKING = "";
const DEFAULT_LINTABLE = false;

type Editor = any;

let widgetsRegistered: boolean = false;
let widgets: {
    [key: string]: WidgetExports;
} = getInaccessibleProxy("Perseus widget registry");

let editorsRegistered: boolean = false;
let editors: Record<string, any> = getInaccessibleProxy(
    "Perseus widget editor registry",
);

const identity = <T>(val: T) => val;

// Widgets must be registered to avoid circular dependencies with the
// core Editor and Renderer components.
// TODO(jeremy): The widget name is already embedded in the WidgetExports type
// so could we drop the `name` parameter here?
export const registerWidget = (name: string, widget: WidgetExports) => {
    if (!widgetsRegistered) {
        widgetsRegistered = true;
        widgets = {};
    }

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
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
    if (!editorsRegistered) {
        editorsRegistered = true;
        editors = {};
    }

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

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
    if (widgets[name] == null) {
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
    return editors[name] ?? null;
};

export const getTransform = (
    name: string,
): WidgetTransform | null | undefined => {
    if (widgets[name] == null) {
        return null;
    }

    return widgets[name].transform || identity;
};

export const getVersion = (name: string): Version | undefined => {
    const widgetInfo = widgets[name];
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (widgetInfo) {
        return widgets[name].version || {major: 0, minor: 0};
    }
    return;
};

export const getVersionVector = (): {
    [key: string]: Version;
} => {
    const version: Record<string, any> = {};
    Object.keys(widgets).forEach((name) => {
        version[name] = getVersion(name);
    });
    return version;
};

export const getPublicWidgets = (): Record<string, WidgetExports> => {
    return Object.entries(widgets).reduce((acc, [key, value]) => {
        if (!value.hidden) {
            acc[key] = value;
        }
        return acc;
    }, {});
};

export const isAccessible = (widgetInfo: PerseusWidget): boolean => {
    const accessible = widgets[widgetInfo.type].accessible;
    if (typeof accessible === "function") {
        return accessible(widgetInfo.options);
    }
    return !!accessible;
};

export const getAllWidgetTypes = (): ReadonlyArray<string> => {
    return Object.keys(widgets);
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
        transform = getStaticTransform(type) || identity;
    } else {
        transform = widgetExports.transform || identity;
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

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!widgetInfo || !widgetInfo.type || !widgets[widgetInfo.type]) {
        return widgetInfo;
    }

    const widgetExports = widgets[widgetInfo.type];
    const props = widgetInfo.options;

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (widgetExports.traverseChildWidgets && props) {
        const newProps = widgetExports.traverseChildWidgets(
            props,
            traverseRenderer,
        );
        return {
            ...widgetInfo,
            options: newProps,
        };
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
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return widgetInfo && widgetInfo.staticTransform;
};

/**
 * Returns the tracking option for the widget. The default is "",
 * which means simply to track interactions once. The other available
 * option is "all" which means to track all interactions.
 */
export const getTracking = (type: string): Tracking => {
    const widgetExport = widgets[type];
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return (widgetExport && widgetExport.tracking) || DEFAULT_TRACKING;
};

/**
 * Returns true if this widget can include lintable markdown text
 * and supports a highlightLint prop, or false otherwise.
 */
export const isLintable = (type: string): boolean => {
    const widgetExports = widgets[type];
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return (widgetExports && widgetExports.isLintable) || DEFAULT_LINTABLE;
};
