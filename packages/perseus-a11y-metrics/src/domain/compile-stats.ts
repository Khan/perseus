import {getAccessibilityLevel} from "./accessibility-level";

import type {AccessibilityLevel} from "./accessibility-level";
import type {ContentRepository} from "./content-types";

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
    /**
     * Locations where exercises can be found within our content hierarchy,
     * annotated with accessibility level. If an exercise appears in multiple
     * places on the site, it will be listed multiple times -- once for each
     * place where it appears.
     *
     * Unlisted paths, i.e. those that are not learner-visible, are not
     * included in this list.
     *
     * This means that to find out e.g. what fraction of exercises in the
     * `math` domain are accessible, you can do something like this:
     *
     * ```ts
     * const accessible = exercisesWithDcul
     *     .filter((e) => e.domain === "math" && e.accessibility === "full")
     *     .length;
     *
     * const total = exercisesWithDcul
     *     .filter((e) => e.domain === "math")
     *     .length;
     *
     * console.log(accessible / total);
     * ```
     */
    exercisesWithDcul: Array<{
        domain: string;
        course: string;
        unit: string;
        lesson: string;
        exercise: string;
        accessibility: AccessibilityLevel;
    }>;
}

export async function compileStats(
    contentRepo: ContentRepository,
): Promise<A11yStats> {
    const a11yStats: A11yStats = {
        full: 0,
        limited: 0,
        inaccessible: 0,
        total: 0,
        // FIXME: fill this in
        exercisesWithDcul: [],
    };

    const exercises = await contentRepo.getExercises();
    for (const exercise of exercises) {
        const a11yLevel = await getAccessibilityLevel(contentRepo, exercise);
        a11yStats[a11yLevel]++;
        a11yStats.total++;
    }

    return a11yStats;
}
