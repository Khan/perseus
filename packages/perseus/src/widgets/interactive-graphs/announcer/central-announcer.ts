import type {PerseusStrings} from "../../../strings";
import type {InteractiveGraphAction} from "../reducer/interactive-graph-action";
import type {InteractiveGraphState} from "../types";

/**
 * Pure function mapping a dispatched action to an SR announcement string (or
 * null when no announcement is needed).  React-free so it is unit-testable
 * without a DOM.
 *
 * Routing rule (OQ3): only universal events (those that don't need per-graph
 * math context) live here.  Per-graph math-heavy announcements go through
 * useGraphAnnouncer in each graph's own file.  Do NOT import getRadius,
 * getSlopeStringForLine, getClockwiseAngle, or similar math utilities into
 * this file — if a case needs one, the announcement belongs per-graph.
 */
export function getAnnouncementForAction(
    action: InteractiveGraphAction,
    prevState: InteractiveGraphState,
    nextState: InteractiveGraphState,
    strings: PerseusStrings,
    locale: string,
): string | null {
    switch (action.type) {
        default:
            return null;
    }
}
