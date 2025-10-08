import type {
    AssessmentItem,
    ContentProvider,
    Course,
    Domain,
    Exercise,
    Lesson,
    Unit,
} from "./content-types";
import type {PerseusItem} from "@khanacademy/perseus-core";

export function createEmptyContentRepo(): ContentProvider {
    return {
        getAssessmentItems: async () => [],
        getExercises: async () => [],
        getDomainById: async () => undefined,
        getCourseById: async () => undefined,
        getUnitById: async () => undefined,
        getLessonById: async () => undefined,
    };
}

export function createBlankPerseusItem(): PerseusItem {
    return {
        answerArea: null,
        hints: [],
        question: {
            content: "",
            widgets: {},
            images: {},
        },
    };
}

export function createAccessibleAssessmentItem(): AssessmentItem {
    return {
        perseusItem: createBlankPerseusItem(),
        isContextInaccessible: false,
    };
}

export function createInaccessibleAssessmentItem(): AssessmentItem {
    return {
        perseusItem: createBlankPerseusItem(),
        isContextInaccessible: true,
    };
}

export function createBaseExercise(): Exercise {
    return {
        id: "exercise-id-do-not-assert",
        slug: "exercise-slug-do-not-assert",
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
