import {srFormatNumber} from "../graphs/screenreader-text";
import {ADD_POINT, CLOSE_POLYGON} from "../reducer/interactive-graph-action";

import type {InteractiveGraphAction} from "../reducer/interactive-graph-action";
import type {InteractiveGraphState} from "../types";
import type {PerseusStrings} from "../../../strings";

/**
 * Pure function that maps a dispatched action (plus surrounding state) to the
 * screen-reader announcement text that should be spoken via the Wonder Blocks
 * Announcer, or null if the action does not warrant an announcement.
 *
 * This is the "central handler" half of the OQ3 hybrid: it owns the universal,
 * structural events (point added, polygon closed, etc.) that every graph type
 * shares. Math-heavy or graph-specific copy (e.g. logarithm asymptote crossing)
 * is announced from the per-graph component via `useGraphAnnouncer` instead.
 *
 * Kept React-free so it is unit-testable as a plain reducer-style function.
 */
export function getAnnouncementForAction(
    action: InteractiveGraphAction,
    _prevState: InteractiveGraphState,
    _nextState: InteractiveGraphState,
    strings: PerseusStrings,
    locale: string,
): string | null {
    switch (action.type) {
        case ADD_POINT: {
            const [x, y] = action.location;
            return strings.srGraphPointAdded({
                x: srFormatNumber(x, locale),
                y: srFormatNumber(y, locale),
            });
        }
        case CLOSE_POLYGON:
            return strings.srGraphPolygonClosed;
        default:
            return null;
    }
}
