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
        id: "lesson-id-do-not-assert",
        slug: "lesson-slug-do-not-assert",
        listedAncestorIds: [],
    };
}

export function createBaseUnit(): Unit {
    return {
        id: "unit-id-do-not-assert",
        slug: "unit-slug-do-not-assert",
        listedAncestorIds: [],
    };
}

export function createBaseCourse(): Course {
    return {
        id: "course-id-do-not-assert",
        slug: "course-slug-do-not-assert",
        listedAncestorIds: [],
    };
}

export function createBaseDomain(): Domain {
    return {
        id: "domain-id-do-not-assert",
        slug: "domain-slug-do-not-assert",
    };
}
