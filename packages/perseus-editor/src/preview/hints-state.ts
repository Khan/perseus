import type {Hint} from "@khanacademy/perseus-core";

/**
 * Which of an item's hints the preview shows, as reported to the parent in a
 * `hints-state` message.
 */
export type HintsState = {
    /** How many hints have been revealed: the first `hintsVisible`. */
    hintsVisible: number;
    /** How many hints the item has. */
    total: number;
    /**
     * How many hints are on screen. Less than `hintsVisible` when a hint
     * with `replace` takes the place of the one before it.
     */
    visibleCount: number;
    /**
     * Whether more than one hint was revealed at once. Then HintsRenderer
     * shows every revealed hint, ignoring `replace`, until the preview is
     * remounted.
     */
    isFinalHelpPage: boolean;
};

/** The presenter's record of the hints it has been told to reveal. */
export type HintsReveal = {
    hintsVisible: number;
    isFinalHelpPage: boolean;
    /**
     * Changes whenever the preview must remount its render tree: HintsRenderer
     * can't hide a hint or leave final-help-page mode once it's in it.
     */
    renderKey: number;
};

export const INITIAL_HINTS_REVEAL: HintsReveal = {
    hintsVisible: 0,
    isFinalHelpPage: false,
    renderKey: 0,
};

/**
 * Applies a `reveal-hint` request. `requested` is a count of hints (-1 for
 * all of them); leaving it out reveals the next hint. Mirrors how
 * HintsRenderer reacts when its `hintsVisible` prop changes.
 */
export function revealHints(
    reveal: HintsReveal,
    requested: number | undefined,
    total: number,
): HintsReveal {
    const target =
        requested == null
            ? reveal.hintsVisible + 1
            : requested === -1
              ? total
              : requested;
    const hintsVisible = Math.max(0, Math.min(target, total));

    if (hintsVisible < reveal.hintsVisible) {
        // A fresh HintsRenderer starts out of final-help-page mode, even when
        // it mounts with several hints showing.
        return {
            hintsVisible,
            isFinalHelpPage: false,
            renderKey: reveal.renderKey + 1,
        };
    }
    return {
        ...reveal,
        hintsVisible,
        isFinalHelpPage:
            reveal.isFinalHelpPage || hintsVisible - reveal.hintsVisible > 1,
    };
}

/** Describes which hints are on screen, as HintsRenderer lays them out. */
export function describeHints(
    hints: ReadonlyArray<Hint>,
    reveal: HintsReveal,
): HintsState {
    // A newer revision of the item may have fewer hints than are revealed.
    const hintsVisible = Math.min(reveal.hintsVisible, hints.length);
    let visibleCount = 0;
    for (const hint of hints.slice(0, hintsVisible)) {
        const replacesPrevious =
            !reveal.isFinalHelpPage && hint.replace && visibleCount > 0;
        if (!replacesPrevious) {
            visibleCount += 1;
        }
    }
    return {
        hintsVisible,
        total: hints.length,
        visibleCount,
        isFinalHelpPage: reveal.isFinalHelpPage,
    };
}
