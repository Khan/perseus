import type {PerseusWidget} from "@khanacademy/perseus-core";

/**
 * Determines if a widget should be scored/validated.
 * Widgets that are ungraded or static should not be scored.
 */
export default function isWidgetScoreable(
    widget: PerseusWidget | undefined,
): boolean {
    if (!widget) {
        return false;
    }
    const widgetIsGraded = widget.graded == null || widget.graded;
    const widgetIsStatic = !!widget.static;
    return widgetIsGraded && !widgetIsStatic;
}
