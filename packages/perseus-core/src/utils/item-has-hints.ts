import type {PerseusItem} from "../data-schema";

/**
 * Returns true if the item has hints
 */
export const itemHasHints = (item: PerseusItem): boolean => {
    return item.hints.length > 0;
};
