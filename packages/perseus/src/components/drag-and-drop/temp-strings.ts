/**
 * Temporary, untranslated strings for the Drag-and-Drop components.
 *
 * The copy is still in flux during development, so these live here
 * instead of PerseusStrings to avoid churning the frontend's translation
 * surface with every tweak. Each entry mirrors the shape it will have in
 * PerseusStrings.
 *
 * TODO(LEMS-4368): once the copy is finalized, move these entries into
 * PerseusStrings (strings.ts) and swap consumers to usePerseusI18n.
 */
export const tempDndStrings = {
    moveTo: "Move to",
    clear: "Clear",
    moveToTarget: ({target}: {target: string}) => `Move to ${target}`,
    clearTarget: ({target}: {target: string}) => `Clear from ${target}`,
    actionsMenu: "Actions menu",
    menuRemaining: ({num}: {num: number}) => `${num} remaining.`,
    choices: "Choices",
    blankLabel: ({num}: {num: number}) => `Blank ${num}`,
    movedToTarget: ({tile, target}: {tile: string; target: string}) =>
        `${tile} moved to ${target}.`,
    returnedToChoices: ({tile}: {tile: string}) =>
        `${tile} returned to Choices.`,
};
