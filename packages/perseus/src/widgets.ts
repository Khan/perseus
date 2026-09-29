import {
    CoreWidgetRegistry,
    Errors,
    PerseusError,
    Registry,
    resetRegistry,
    strictGet,
} from "@khanacademy/perseus-core";

import type {Tracking, WidgetExports} from "./types";
import type {WidgetRegistration} from "./widget-registration";
import type * as React from "react";

const DEFAULT_TRACKING = "";
const DEFAULT_LINTABLE = false;

const widgets = new Registry<WidgetExports>("Perseus widget registry");

// Widgets must be registered to avoid circular dependencies with the
// core Editor and Renderer components.
export const registerWidget = (type: string, widget: WidgetExports) => {
    widgets.set(type, widget);
};

export function registerWidgets(
    registrations: ReadonlyArray<WidgetRegistration>,
): void;
/**
 * @deprecated Pass `WidgetRegistration` descriptors instead, so that each
 * widget's core logic is registered alongside its React implementation.
 */
export function registerWidgets(widgetArr: ReadonlyArray<WidgetExports>): void;
export function registerWidgets(
    widgetArr: ReadonlyArray<WidgetRegistration | WidgetExports>,
): void {
    widgetArr.forEach((entry) => {
        if ("logic" in entry) {
            CoreWidgetRegistry.registerLogic(entry.logic);
            registerWidget(entry.widget.name, entry.widget);
        } else {
            registerWidget(entry.name, entry);
        }
    });
}

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
    if (!substituteWidget) {
        const errorMsg = `Failed to replace ${type} with ${replacementType}`;
        throw new PerseusError(errorMsg, Errors.Internal);
    }

    widgets.replace(type, substituteWidget);
};

/**
 * Map every deprecated widget type onto the `deprecated-standin` in both the
 * React and core registries.
 */
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
    replaceWidget("molecule-renderer", "deprecated-standin");
    CoreWidgetRegistry.replaceDeprecatedLogics();
};

function getWidgetStrictly(type: string): WidgetExports | undefined {
    return strictGet(
        widgets,
        type,
        `registerWidgets([...]) with the registration from the ${type} widget module`,
    );
}

export const getWidget = (
    type: string,
): React.ComponentType<any> | null | undefined => {
    const widget = getWidgetStrictly(type);

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
    return getWidgetStrictly(type) ?? null;
};

export const getPublicWidgets = (): Record<string, WidgetExports> => {
    const publicWidgets: Record<string, WidgetExports> = {};
    for (const [key, value] of widgets.entries()) {
        /**
         * Even though we don't want content creators adding new "hidden" widgets,
         * we still have to maintain editors for hidden widgets in order to support
         * old content. So this lets us use hidden widgets in Storybook.
         */
        if (process.env.STORYBOOK || !value.hidden) {
            publicWidgets[key] = value;
        }
    }
    return publicWidgets;
};

export const getAllWidgetTypes = (): ReadonlyArray<string> => {
    return widgets.keys();
};

/** Empty the widget registry for test and Storybook isolation. */
export function resetWidgetRegistry(): void {
    resetRegistry(widgets);
}

/**
 * Handling for static mode for widgets that support it.
 */

/**
 * Returns true if the widget supports static mode.
 * A widget implicitly supports static mode if it exports a
 * getCorrectUserInput function.
 */
export const supportsStaticMode = (type: string): boolean | undefined => {
    const widgetInfo = getWidgetStrictly(type);
    return widgetInfo && widgetInfo.getCorrectUserInput != null;
};

/**
 * Returns true if the widget supports the "Graded" toggle in the editor.
 * A widget opts in by setting supportsUngraded: true in its export object.
 */
export const supportsUngraded = (type: string): boolean => {
    const widgetInfo = getWidgetStrictly(type);
    return widgetInfo?.supportsUngraded === true;
};

/**
 * Returns the tracking option for the widget. The default is "",
 * which means simply to track interactions once. The other available
 * option is "all" which means to track all interactions.
 */
export const getTracking = (type: string): Tracking => {
    const widgetExport = getWidgetStrictly(type);
    return (widgetExport && widgetExport.tracking) || DEFAULT_TRACKING;
};

/**
 * Returns true if this widget can include lintable markdown text
 * and supports a highlightLint prop, or false otherwise.
 */
export const isLintable = (type: string): boolean => {
    const widgetExports = getWidgetStrictly(type);
    return (widgetExports && widgetExports.isLintable) || DEFAULT_LINTABLE;
};
