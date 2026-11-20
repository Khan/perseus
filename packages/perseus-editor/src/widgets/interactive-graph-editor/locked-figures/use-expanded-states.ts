import * as React from "react";

import type {LockedFigureSettingsMovementType} from "./locked-figure-settings-actions";

/** The same list with one item moved to a new index. */
export function moveItem<T>(
    items: ReadonlyArray<T>,
    from: number,
    to: number,
): T[] {
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    return next;
}

/**
 * Where one of the move buttons sends an item. Figures are drawn in list
 * order, so "back" is the start of the list and "front" the end.
 */
export function moveTarget(
    index: number,
    count: number,
    movement: LockedFigureSettingsMovementType,
): number {
    switch (movement) {
        case "back":
            return 0;
        case "backward":
            return Math.max(0, index - 1);
        case "forward":
            return Math.min(count - 1, index + 1);
        case "front":
            return count - 1;
    }
}

/**
 * Which items in a list of accordions are open, kept in step as items are
 * added, removed and moved. New items open; existing ones start closed,
 * except when editing is disabled and the content is only being reviewed.
 */
export function useExpandedStates(count: number, editingDisabled: boolean) {
    const [states, setStates] = React.useState<boolean[]>(() =>
        Array(count).fill(editingDisabled),
    );
    return {
        isOpen: (index: number) => states[index] ?? false,
        allCollapsed: states.every((open) => !open),
        setOpen: (index: number, open: boolean) => {
            const next = [...states];
            next[index] = open;
            setStates(next);
        },
        setAll: (open: boolean) => setStates(states.map(() => open)),
        added: () => setStates([...states, true]),
        removed: (index: number) =>
            setStates(states.filter((_, i) => i !== index)),
        moved: (from: number, to: number) =>
            setStates(moveItem(states, from, to)),
    };
}
