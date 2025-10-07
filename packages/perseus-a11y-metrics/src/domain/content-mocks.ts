import type {
    ContentRepository,
    Course,
    Domain,
    Exercise,
    Lesson,
    Unit,
} from "./content-types";

export function createEmptyContentRepo(): ContentRepository {
    return {
        getAssessmentItems: async () => [],
        getExercises: async () => [],
        getDomainById: async () => undefined,
        getCourseById: async () => undefined,
        getUnitById: async () => undefined,
        getLessonById: async () => undefined,
    };
}

export function createBaseExercise(): Exercise {
    return {
        id: "exercise-id-do-not-assert",
        exerciseLength: 468417,
        listedAncestorIds: [],
    };
}

export function createBaseLesson(): Lesson {
    return {
        slug: "lesson-slug-do-not-assert",
        listedAncestorIds: [],
    };
}

export function createBaseUnit(): Unit {
    return {
        slug: "unit-slug-do-not-assert",
        listedAncestorIds: [],
    };
}

export function createBaseCourse(): Course {
    return {
        slug: "course-slug-do-not-assert",
        listedAncestorIds: [],
    };
}

export function createBaseDomain(): Domain {
    return {
        slug: "domain-slug-do-not-assert",
    };
}
