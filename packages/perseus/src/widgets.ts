import {createWidgetRegistry} from "@khanacademy/perseus-core";

import DeprecatedStandin from "./widgets/deprecated-standin";

import type {Tracking, WidgetExports} from "./types";
import type * as React from "react";

const DEFAULT_TRACKING = "";
const DEFAULT_LINTABLE = false;

const widgets = createWidgetRegistry<WidgetExports>(
    "Perseus widget registry",
    DeprecatedStandin,
);

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

export const getWidget = (
    type: string,
): React.ComponentType<any> | null | undefined => {
    const widget = widgets.get(type);

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
 * Returns true if the widget supports the "Graded" toggle in the editor.
 * A widget opts in by setting supportsUngraded: true in its export object.
 */
export const supportsUngraded = (type: string): boolean => {
    const widgetInfo = widgets.get(type);
    return widgetInfo?.supportsUngraded === true;
};

/**
 * Returns the tracking option for the widget. The default is "",
 * which means simply to track interactions once. The other available
 * option is "all" which means to track all interactions.
 */
export const getTracking = (type: string): Tracking => {
    const widgetExport = widgets.get(type);
    return (widgetExport && widgetExport.tracking) || DEFAULT_TRACKING;
};

/**
 * Returns true if this widget can include lintable markdown text
 * and supports a highlightLint prop, or false otherwise.
 */
export const isLintable = (type: string): boolean => {
    const widgetExports = widgets.get(type);
    return (widgetExports && widgetExports.isLintable) || DEFAULT_LINTABLE;
};
