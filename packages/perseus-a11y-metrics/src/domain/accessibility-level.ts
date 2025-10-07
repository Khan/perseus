import {isItemAccessible} from "@khanacademy/perseus-core";

import type {
    AssessmentItem,
    ContentRepository,
    Exercise,
} from "./content-types";

export type AccessibilityLevel = "full" | "limited" | "inaccessible";

export async function getAccessibilityLevel(
    contentRepo: ContentRepository,
    exercise: Exercise,
): Promise<AccessibilityLevel> {
    const items = await contentRepo.getAssessmentItems(exercise.id);
    const accessibleItems = items.filter(isAssessmentItemAccessible);

    if (accessibleItems.length === items.length) {
        return "full";
    } else if (accessibleItems.length >= exercise.exerciseLength) {
        return "limited";
    } else {
        return "inaccessible";
    }
}

export function isAssessmentItemAccessible(item: AssessmentItem): boolean {
    return !item.isContextInaccessible && isItemAccessible(item.perseusItem);
}
