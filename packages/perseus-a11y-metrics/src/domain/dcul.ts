import type {ContentProvider, Exercise} from "./content-types";

/**
 * Represents the path to an exercise within our content hierarchy.
 *
 * DCUL stands for "domain, course, unit, lesson". All our content is
 * organized into this four-level hierarchical structure.
 */
export interface DculPath {
    /**
     * The domain slug.
     */
    domain: string;
    /**
     * The course slug.
     */
    course: string;
    /**
     * The unit slug.
     */
    unit: string;
    /**
     * The lesson slug.
     */
    lesson: string;
}

/**
 * Returns all listed DCUL paths where the given exercise can be found.
 *
 * "Listed" means the path is visible to learners.
 *
 * Note that the DCUL hierarchy is not a tree, but a directed acyclic graph. A
 * lesson can be part of multiple units, a unit can be part of multiple
 * courses, etc. That is why this function can return multiple paths.
 */
export async function getDculPaths(
    contentRepo: ContentProvider,
    exercise: Exercise,
): Promise<DculPath[]> {
    const results: DculPath[] = [];

    for (const id of exercise.listedAncestorIds) {
        const lesson = await contentRepo.getLessonById(id);
        if (lesson == null) {
            continue;
        }

        for (const id of lesson.listedAncestorIds) {
            const unit = await contentRepo.getUnitById(id);
            if (unit == null) {
                continue;
            }

            for (const id of unit.listedAncestorIds) {
                const course = await contentRepo.getCourseById(id);
                if (course == null) {
                    continue;
                }

                for (const id of course.listedAncestorIds) {
                    const domain = await contentRepo.getDomainById(id);
                    if (domain == null) {
                        continue;
                    }

                    results.push({
                        domain: domain.slug,
                        course: course.slug,
                        unit: unit.slug,
                        lesson: lesson.slug,
                    });
                }
            }
        }
    }

    return results;
}
