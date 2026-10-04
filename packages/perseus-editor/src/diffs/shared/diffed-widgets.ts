/**
 * Which widgets a renderer diff compares, and which of their fields.
 *
 * RendererDiff (the rendered side-by-side view) and getChangedItemSections
 * (its data-level counterpart) both go through these helpers, so they agree
 * on what counts as a widget change.
 */
import {Widgets} from "@khanacademy/perseus";
import {CoreWidgetRegistry} from "@khanacademy/perseus-core";
import _ from "underscore";

import type {PerseusRenderer, PerseusWidget} from "@khanacademy/perseus-core";

/**
 * The fields of a widget that a diff compares.
 *
 * `alignment` and `static` are only present when they are meaningful for the
 * widget's type (see `filterWidgetInfo`).
 */
export type DiffedWidgetInfo = {
    options: PerseusWidget["options"];
    alignment?: PerseusWidget["alignment"];
    static?: PerseusWidget["static"];
};

/**
 * List the widget ids a renderer diff compares, in diff order.
 *
 * A widget is only diffed when its id appears in that side's `content`.
 * Entries in `widgets` that the content no longer references are leftovers
 * the renderer never shows, so a change to one of them is invisible to
 * learners and would only add noise to the diff.
 *
 * @returns The ids `before` references, followed by any ids only `after`
 * references, each at most once.
 */
export const getDiffedWidgetIds = (
    before: PerseusRenderer | undefined,
    after: PerseusRenderer | undefined,
): string[] => {
    const beforeWidgets = Object.keys(before?.widgets ?? {}).filter(
        (widgetId) => before?.content.includes(widgetId),
    );
    const afterWidgets = Object.keys(after?.widgets ?? {}).filter(
        (widgetId) => after?.content.includes(widgetId),
    );
    return _.union(beforeWidgets, afterWidgets);
};

/**
 * Reduce a widget to the fields a diff compares.
 *
 * Only `options` always takes part: the other fields of a widget (`graded`,
 * `version`, ...) are bookkeeping that the editor manages and that authors
 * don't change deliberately, so a diff of them would only distract from the
 * content change under review. `alignment` is added when the caller asks for
 * it and the widget's type actually offers a choice of alignments, and
 * `static` when the widget's type supports static mode; for any other type
 * those fields can't be meaningfully changed.
 *
 * @param widgetInfo The widget on one side of the diff, if that side has it.
 * @param showAlignmentOptions Whether the diff compares alignment at all.
 * @returns The fields to diff, or `undefined` when the side has no widget.
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
