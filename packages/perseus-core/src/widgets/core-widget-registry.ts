/** Provides registration and lookup for widget logic. */
// Widget-logic imports are prohibited here by the dependency rule.
import {Errors} from "../error/errors";
import {PerseusError} from "../error/perseus-error";
import Registry, {resetRegistry} from "../utils/registry";
import {strictGet} from "../utils/strict-registry";
import {recordWidgetManifestEntry} from "../utils/widget-manifest";

import type {
    PublicWidgetOptionsFunction,
    WidgetLogic,
} from "./logic-export.types";
import type {
    PerseusWidgetOptions,
    PerseusWidget,
    Alignment,
} from "../data-schema";

/**
 * A widget logic of any concrete widget's shape, as the registry stores them.
 */
export type AnyWidgetLogic = WidgetLogic<string, never, any>;

const widgets = new Registry<WidgetLogic<string, any, any>>(
    "Core widget registry",
);

/** Register one widget logic under its own `name`. */
export function registerLogic(logic: AnyWidgetLogic) {
    // eslint-disable-next-line no-restricted-syntax
    widgets.set(logic.name, logic as WidgetLogic<string, any, any>);
}

/** Register several widget logics, each under its own `name`. */
export function registerLogics(logics: ReadonlyArray<AnyWidgetLogic>) {
    logics.forEach(registerLogic);
}

/** Empty the core widget registry for test and Storybook isolation. */
export function resetCoreWidgetRegistry(): void {
    resetRegistry(widgets);
}

/**
 * Replace `type`'s logic with the logic already registered for
 * `replacementType`.
 *
 * Fails if the `replacementType` is not already registered.
 */
export function replaceLogic(type: string, replacementType: string) {
    const substitute = widgets.get(replacementType);
    if (!substitute) {
        throw new PerseusError(
            `Failed to replace ${type} with ${replacementType}. ` +
                `Nothing registered for ${replacementType}.`,
            Errors.Internal,
        );
    }
    widgets.replace(type, substitute);
}

/** Widget types Perseus no longer implements; content may still name them. */
const deprecatedWidgetTypes = [
    "transformer",
    "lights-puzzle",
    "reaction-diagram",
    "sequence",
    "simulator",
    "unit-input",
    "passage",
    "passage-ref",
    "passage-ref-target",
    "molecule-renderer",
];

/**
 * Map every deprecated widget type onto the `deprecated-standin` logic.
 *
 * Fails if the `deprecated-standin` logic is not registered.
 */
export function replaceDeprecatedLogics() {
    deprecatedWidgetTypes.forEach((type) =>
        replaceLogic(type, "deprecated-standin"),
    );
}

/**
 * Look up a logic for one of the accessors that would otherwise default.
 *
 * Defaulting on a miss hides a forgotten registration behind a plausible-
 * looking answer (version 0.0, no options, not accessible), so outside
 * production we say so instead.
 */
function getLogicStrictly(type: string) {
    recordWidgetManifestEntry("core", type);
    return strictGet(
        widgets,
        type,
        `registerLogics([...]) with the logic from ` +
            `@khanacademy/perseus-core/widgets/${type}`,
    );
}

export function isWidgetRegistered(type: string) {
    const widgetLogic = widgets.get(type);
    return Boolean(widgetLogic);
}

export function getCurrentVersion(type: string) {
    const widgetLogic = getLogicStrictly(type);
    return widgetLogic?.version || {major: 0, minor: 0};
}

// TODO(LEMS-2870): getPublicWidgetOptionsFunction/PublicWidgetOptionsFunction
// need better types
export const getPublicWidgetOptionsFunction = (
    type: string,
): PublicWidgetOptionsFunction => {
    return getLogicStrictly(type)?.getPublicWidgetOptions ?? ((i: any) => i);
};

export function getDefaultWidgetOptions(type: string) {
    const widgetLogic = getLogicStrictly(type);
    return widgetLogic?.defaultWidgetOptions || {};
}

export function isAccessible(
    type: string,
    widgetOptions: PerseusWidgetOptions,
): boolean {
    const accessible = getLogicStrictly(type)?.accessible;
    return typeof accessible === "function"
        ? accessible(widgetOptions)
        : !!accessible;
}

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

    if (widgetInfo?.type) {
        recordWidgetManifestEntry("core", widgetInfo.type);
    }
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!widgetInfo || !widgetInfo.type || !widgets.get(widgetInfo.type)) {
        return widgetInfo;
    }

    const widgetExports = widgets.get(widgetInfo.type);
    const props = widgetInfo.options;

    if (widgetExports?.traverseChildWidgets != null && props != null) {
        const newProps = widgetExports.traverseChildWidgets(
            props,
            traverseRenderer,
        );
        return {...widgetInfo, options: newProps};
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
    const widgetLogic = getLogicStrictly(type);
    if (!widgetLogic?.supportedAlignments?.[0]) {
        // default alignments
        return ["default"];
    }
    return widgetLogic?.supportedAlignments;
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
    const widgetLogic = getLogicStrictly(type);
    if (!widgetLogic?.defaultAlignment) {
        return "block";
    }
    return widgetLogic.defaultAlignment;
};

/**
 * Returns the CSS class name corresponding to the specified widget alignment.
 * Uses explicit mapping to make it easy to locate related CSS style definitions.
 */
export const getAlignmentClassName = (
    type: string,
    alignment: Alignment,
): string => {
    switch (alignment) {
        case "block":
            return " widget-block";
        case "inline-block":
            return " widget-inline-block";
        case "inline":
            return " widget-inline";
        case "wrap-left":
            return " widget-wrap-left";
        case "wrap-right":
            return " widget-wrap-right";
        case "full-width":
            return " widget-full-width";
        case "default":
            // This is for widgets that don't have supportedAlignments
            // It doesn't have any impact on styling it is used for error handling
            return getDefaultAlignment(type);
        default:
            return "";
    }
};
