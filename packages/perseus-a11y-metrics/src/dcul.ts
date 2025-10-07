import type {ContentRepository, Exercise} from "./content-types";

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

export async function getDculPaths(
    exercise: Exercise,
    contentRepo: ContentRepository,
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
