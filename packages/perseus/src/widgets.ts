import {Errors, PerseusError, Registry} from "@khanacademy/perseus-core";

import {Log} from "./logging/log";

import type {Tracking, WidgetExports} from "./types";
import type {Version} from "@khanacademy/perseus-core";
import type * as React from "react";

const DEFAULT_TRACKING = "";
const DEFAULT_LINTABLE = false;

type Editor = any;

const widgets = new Registry<WidgetExports>("Perseus widget registry");
const editors = new Registry<any>("Perseus widget editor registry");

// Widgets must be registered to avoid circular dependencies with the
// core Editor and Renderer components.
export const registerWidget = (type: string, widget: WidgetExports) => {
    widgets.set(type, widget);
};

export const registerWidgets = (widgetArr: ReadonlyArray<WidgetExports>) => {
    widgetArr.forEach((widget) => {
        registerWidget(widget.name, widget);
    });
};

/**
 *
 * @param type - the widget that you are trying to replace
 * @param replacementType - the type of the widget that takes its place
 *
 * e.g. replaceWidget("transformer", "deprecated-standin") will make it so the
 * transformer widget is replaced by the always correct widget
 */
export const replaceWidget = (type: string, replacementType: string) => {
    const substituteWidget = widgets.get(replacementType);

    // If the replacement widget isn't found, we need to throw. Otherwise after
    // removing the deprecated widget, we'll have data asking for a widget type
    // that doesn't exist at all.
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!substituteWidget) {
        const errorMsg = `Failed to replace ${type} with ${replacementType}`;
        throw new PerseusError(errorMsg, Errors.Internal);
    }

    registerWidget(type, substituteWidget);
};

export const replaceDeprecatedWidgets = () => {
    replaceWidget("transformer", "deprecated-standin");
    replaceWidget("lights-puzzle", "deprecated-standin");
    replaceWidget("reaction-diagram", "deprecated-standin");
    replaceWidget("sequence", "deprecated-standin");
    replaceWidget("simulator", "deprecated-standin");
    replaceWidget("unit-input", "deprecated-standin");
    replaceWidget("passage", "deprecated-standin");
    replaceWidget("passage-ref", "deprecated-standin");
    replaceWidget("passage-ref-target", "deprecated-standin");
};

export const registerEditors = (editorsToRegister: ReadonlyArray<Editor>) => {
    editorsToRegister.forEach((editor) => {
        if (!editor.widgetName) {
            throw new PerseusError(
                `Editor ${editor.displayName} doesn't have a widgetName property`,
                Errors.Internal,
            );
        }
        editors.set(editor.widgetName, editor);
    });
};

/**
 *
 * @param type - the widget that you are trying to replace
 * @param replacementType - the type of the widget that takes its place
 *
 * e.g. replaceEditor("transformer", "deprecated-standin") will make it so the
 * transformer widget is replaced by the deprecated stand-in widget
 */
export const replaceEditor = (type: string, replacementType: string) => {
    const substituteEditor = editors.get(replacementType);

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!substituteEditor && Log) {
        const errorMsg = `Failed to replace editor ${type} with ${replacementType}`;
        Log.error(errorMsg, Errors.Internal);
        return;
    }

    editors.set(type, substituteEditor);
};

export const replaceDeprecatedEditors = () => {
    replaceEditor("transformer", "deprecated-standin");
    replaceEditor("lights-puzzle", "deprecated-standin");
    replaceEditor("reaction-diagram", "deprecated-standin");
    replaceEditor("sequence", "deprecated-standin");
    replaceEditor("simulator", "deprecated-standin");
    replaceEditor("unit-input", "deprecated-standin");
    replaceEditor("passage", "deprecated-standin");
    replaceEditor("passage-ref", "deprecated-standin");
    replaceEditor("passage-ref-target", "deprecated-standin");
};

export const getWidget = (
    type: string,
): React.ComponentType<any> | null | undefined => {
    const widget = widgets.get(type);

    // TODO(alex): Consider referring to these as renderers to avoid
    // overloading "widget"
    if (widget == null) {
        return null;
    }

    // Allow widgets to specify a widget directly or via a function
    if (widget.getWidget) {
        return widget.getWidget();
    }

    return widget.widget;
};

export const getWidgetExport = (type: string): WidgetExports | null => {
    return widgets.get(type) ?? null;
};

export const getEditor = (type: string): Editor | null => {
    return editors.get(type) ?? null;
};

export const getVersion = (type: string): Version | undefined => {
    const widget = widgets.get(type);
    if (widget != null) {
        return widget.version || {major: 0, minor: 0};
    }

    return;
};

export const getVersionVector = (): {
    [key: string]: Version;
} => {
    const version: Record<string, any> = {};
    widgets.keys().forEach((type) => {
        version[type] = getVersion(type);
    });
    return version;
};

export const getPublicWidgets = (): Record<string, WidgetExports> => {
    return widgets.entries().reduce((acc, [key, value]) => {
        /**
         * Even though we don't want content creators adding new "hidden" widgets,
         * we still have to maintain editors for hidden widgets in order to support
         * old content. So this lets us use hidden widgets in Storybook.
         */
        if (process.env.STORYBOOK || !value.hidden) {
            acc[key] = value;
        }
        return acc;
    }, {});
};

export const getAllWidgetTypes = (): ReadonlyArray<string> => {
    return widgets.keys();
};

/**
 * Handling for static mode for widgets that support it.
 */

/**
 * Returns true if the widget supports static mode.
 * A widget implicitly supports static mode if it exports a
 * getCorrectUserInput function.
 */
export const supportsStaticMode = (type: string): boolean | undefined => {
    const widgetInfo = widgets.get(type);
    return widgetInfo && widgetInfo.getCorrectUserInput != null;
};

/**
 * Returns the tracking option for the widget. The default is "",
 * which means simply to track interactions once. The other available
 * option is "all" which means to track all interactions.
 */
export const getTracking = (type: string): Tracking => {
    const widgetExport = widgets.get(type);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return (widgetExport && widgetExport.tracking) || DEFAULT_TRACKING;
};

/**
 * Returns true if this widget can include lintable markdown text
 * and supports a highlightLint prop, or false otherwise.
 */
export const isLintable = (type: string): boolean => {
    const widgetExports = widgets.get(type);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return (widgetExports && widgetExports.isLintable) || DEFAULT_LINTABLE;
};
