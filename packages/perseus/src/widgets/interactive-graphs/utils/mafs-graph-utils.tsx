import {actions} from "../reducer/interactive-graph-action";
import {isUnlimitedGraphState} from "../utils";

import type {InteractiveGraphAction} from "../reducer/interactive-graph-action";
import type {InteractiveGraphState} from "../types";
import type {LockedFigure} from "@khanacademy/perseus-core";
import type * as React from "react";

/**
 * A contiguous run of locked figures sharing the same clipping treatment.
 * Points render unclipped (a boundary point would otherwise be sliced in half
 * by the clip); every other figure is clipped to the graph's visible range.
 */
export interface LockedFigureClipRun {
    clipped: boolean;
    figures: LockedFigure[];
}

/**
 * Group locked figures into contiguous runs by clipping treatment, preserving
 * author order. Rendering all points in one pass would push them after every
 * other figure, so the DOM (and screen-reader) order would no longer match the
 * authored order; grouping into ordered runs keeps them interleaved as authored.
 *
 * Label figures are skipped: they render in GraphLockedLabelsLayer, not this
 * layer, so including them would emit empty clip wrappers and split point runs.
 */
export function getLockedFigureClipRuns(
    lockedFigures: ReadonlyArray<LockedFigure>,
): ReadonlyArray<LockedFigureClipRun> {
    const runs: LockedFigureClipRun[] = [];
    for (const figure of lockedFigures) {
        if (figure.type === "label") {
            continue;
        }
        const clipped = figure.type !== "point";
        const lastRun = runs[runs.length - 1];
        if (lastRun?.clipped === clipped) {
            lastRun.figures.push(figure);
        } else {
            runs.push({clipped, figures: [figure]});
        }
    }
    return runs;
}

export function handleFocusEvent(
    event: React.FocusEvent,
    state: InteractiveGraphState,
    dispatch: (action: InteractiveGraphAction) => unknown,
) {
    if (isUnlimitedGraphState(state)) {
        if (
            event.target.classList.contains("mafs-graph") &&
            state.interactionMode === "mouse"
        ) {
            dispatch(actions.global.changeKeyboardInvitationVisibility(true));
        }
    }
}

export function handleBlurEvent(
    _event: React.FocusEvent,
    state: InteractiveGraphState,
    dispatch: (action: InteractiveGraphAction) => unknown,
) {
    if (isUnlimitedGraphState(state)) {
        dispatch(actions.global.changeKeyboardInvitationVisibility(false));
    }
}

export function handleKeyboardEvent(
    event: React.KeyboardEvent,
    state: InteractiveGraphState,
    dispatch: (action: InteractiveGraphAction) => unknown,
) {
    if (isUnlimitedGraphState(state)) {
        if (event.key === "Backspace" || event.key === "Delete") {
            // NOTE(benchristel): Checking classList here is a hack to prevent
            // points from being deleted if the user presses the backspace key
            // while the whole graph is focused. Instead of doing this, we
            // should move the keyboard event handler to the movable point
            // handle element.
            if (
                document.activeElement?.classList.contains(
                    "movable-point__focusable-handle",
                )
            ) {
                // Only allow delete if type is point or a polygon that is open.
                if (
                    state.type === "point" ||
                    (state.type === "polygon" && !state.closedPolygon)
                ) {
                    dispatch(actions.global.deleteIntent());
                }
            }

            // After removing a point blur
            // It would be nice if this could focus on the graph but doing so
            // would trigger the message to prompt a learner to enter keyboard mode
            // eslint-disable-next-line no-restricted-syntax
            (document.activeElement as HTMLElement).blur();
        } else if (event.shiftKey && event.key === "Enter") {
            dispatch(actions.global.changeInteractionMode("keyboard"));
        } else if (state.interactionMode === "keyboard" && event.key === "a") {
            dispatch(actions.pointGraph.addPoint([0, 0]));
        }
    }
}

// Returns a space-separated string like "foo bar" given several optional
// string IDs. If all args are falsy, returns undefined.
export function describedByIds(
    ...args: Array<string | false | 0 | null | undefined>
): string | undefined {
    return args.filter(Boolean).join(" ") || undefined;
}
