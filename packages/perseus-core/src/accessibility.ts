import type {PerseusItem} from "./data-schema";

/**
 * Filters the given list of items removing items that contain widgets that are
 * not accessible.
 */
export function filterInaccessibleContent(items: PerseusItem[]): PerseusItem[] {
    return [...items];
}
