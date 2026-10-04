/**
 * Which widgets a renderer diff compares, and which of their fields.
 * Shared by RendererDiff and getChangedItemSections so the two agree.
 */
import {Widgets} from "@khanacademy/perseus";
import {CoreWidgetRegistry} from "@khanacademy/perseus-core";
import _ from "underscore";

import type {PerseusRenderer, PerseusWidget} from "@khanacademy/perseus-core";

/** The widget fields a diff compares. */
export type DiffedWidgetInfo = {
    options: PerseusWidget["options"];
    alignment?: PerseusWidget["alignment"];
    static?: PerseusWidget["static"];
};

/**
 * List the widget ids to diff: those referenced in either side's `content`,
 * `before`'s first. Widgets the content doesn't reference are never
 * rendered, so a change to them would only be noise.
 */
export const getDiffedWidgetIds = (
    before: PerseusRenderer | undefined,
    after: PerseusRenderer | undefined,
): string[] => {
    const beforeWidgets = Object.keys(before?.widgets ?? {}).filter(
        (widgetId) => before?.content.includes(widgetId),
    );
    const afterWidgets = Object.keys(after?.widgets ?? {}).filter((widgetId) =>
        after?.content.includes(widgetId),
    );
    return _.union(beforeWidgets, afterWidgets);
};

/**
 * Keep only the widget fields worth diffing: `options`, plus `alignment`
 * when asked for and the type offers more than one, and `static` when the
 * type supports static mode. Bookkeeping fields like `graded` and `version`
 * aren't edited deliberately and would distract from the content change.
 */
export const filterWidgetInfo = (
    widgetInfo: PerseusWidget | undefined,
    showAlignmentOptions: boolean,
): DiffedWidgetInfo | undefined => {
    if (widgetInfo == null) {
        return undefined;
    }

    const {alignment, options, type} = widgetInfo;

    const filteredWidgetInfo: DiffedWidgetInfo = {options};

    if (
        showAlignmentOptions &&
        CoreWidgetRegistry.getSupportedAlignments(type).length > 1
    ) {
        filteredWidgetInfo.alignment = alignment;
    }

    if (Widgets.supportsStaticMode(type)) {
        filteredWidgetInfo.static = widgetInfo.static ?? undefined;
    }

    return filteredWidgetInfo;
};
