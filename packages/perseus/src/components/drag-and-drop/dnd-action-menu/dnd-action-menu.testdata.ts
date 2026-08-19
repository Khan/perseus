import type {DndActionMenuProps, MoveTarget} from "./dnd-action-menu";

/** Generates numbered blank move targets, e.g. "Blank 1"…"Blank N". */
export function generateTestBlanks(
    count: number = 3,
): ReadonlyArray<MoveTarget> {
    return Array.from({length: count}, (_, i) => ({
        id: `blank-${i + 1}`,
        label: `Blank ${i + 1}`,
    }));
}

/** Generates a complete, valid set of props for a tile in the choice bank. */
export function generateActionMenuProps(): DndActionMenuProps {
    return {
        label: "Bongo",
        moveTargets: generateTestBlanks(),
        onMove: () => {},
        disabled: false,
    };
}
