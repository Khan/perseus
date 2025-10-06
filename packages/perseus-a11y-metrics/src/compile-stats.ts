import {ContentRepository} from "./content-types";
import {isItemAccessible} from "@khanacademy/perseus-core";

export interface A11yStats {
    /**
     * The count of fully-accessible exercises.
     * @see https://khanacademy.atlassian.net/wiki/spaces/LC/pages/3977576465/A+Common+Language+for+PEICH
     */
    full: number;
    /**
     * The count of exercises with limited accessibility.
     * @see https://khanacademy.atlassian.net/wiki/spaces/LC/pages/3977576465/A+Common+Language+for+PEICH
     */
    limited: number;
    /**
     * The count of inaccessible exercises.
     * @see https://khanacademy.atlassian.net/wiki/spaces/LC/pages/3977576465/A+Common+Language+for+PEICH
     */
    inaccessible: number;
    /**
     * The total number of exercises.
     */
    total: number;
}

export async function compileStats(contentRepo: ContentRepository): Promise<A11yStats> {
    const a11yStats = {
        full: 0,
        limited: 0,
        inaccessible: 0,
        total: 0,
    };

    const exercises = await contentRepo.getExercises();
    for (const exercise of exercises) {
        const items = await contentRepo.getAssessmentItems(exercise.id);
        const accessibleItems = items.filter(
            (item) =>
                !item.isContextInaccessible &&
                isItemAccessible(item.perseusItem),
        );

        a11yStats.total++

        if (accessibleItems.length === items.length) {
            a11yStats.full++;
        } else if (accessibleItems.length >= exercise.exerciseLength) {
            a11yStats.limited++;
        } else {
            a11yStats.inaccessible++;
        }
    }

    return a11yStats
}
