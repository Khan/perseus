import {
    createBaseCourse,
    createBaseDomain,
    createBaseExercise,
    createBaseLesson,
    createBaseUnit,
    createEmptyContentRepo,
} from "./content-mocks";
import {getDculPaths} from "./dcul";

import type {
    ContentRepository,
    Course,
    Domain,
    Exercise,
    Lesson,
    Unit,
} from "./content-types";

describe("getDculPaths", () => {
    it("returns no paths when there are no curation nodes", async () => {
        const contentRepo = createEmptyContentRepo();

        const exercise = createBaseExercise();

        const dculPaths = await getDculPaths(exercise, contentRepo);

        expect(dculPaths).toEqual([]);
    });

    it("returns no paths when the exercise has listed ancestor IDs that are not found", async () => {
        const contentRepo = createEmptyContentRepo();

        const exercise = {
            ...createBaseExercise(),
            listedAncestorIds: ["i-do-not-exist"],
        };

        const dculPaths = await getDculPaths(exercise, contentRepo);

        expect(dculPaths).toEqual([]);
    });

    it("returns a DCUL path when one exists", async () => {
        // Arrange:
        const domains: Record<string, Domain> = {
            "domain-id-1": {
                ...createBaseDomain(),
                slug: "domain-slug",
            },
        };

        const courses: Record<string, Course> = {
            "course-id-2": {
                ...createBaseCourse(),
                slug: "course-slug",
                listedAncestorIds: ["domain-id-1"],
            },
        };

        const units: Record<string, Unit> = {
            "unit-id-3": {
                ...createBaseUnit(),
                slug: "unit-slug",
                listedAncestorIds: ["course-id-2"],
            },
        };

        const lessons: Record<string, Lesson> = {
            "lesson-id-4": {
                ...createBaseLesson(),
                slug: "lesson-slug",
                listedAncestorIds: ["unit-id-3"],
            },
        };

        const contentRepo: ContentRepository = {
            ...createEmptyContentRepo(),
            getDomainById: async (id) => domains[id],
            getCourseById: async (id) => courses[id],
            getUnitById: async (id) => units[id],
            getLessonById: async (id) => lessons[id],
        };

        const exercise: Exercise = {
            ...createBaseExercise(),
            listedAncestorIds: ["lesson-id-4"],
        };

        // Act:
        const dculPaths = await getDculPaths(exercise, contentRepo);

        // Assert:
        expect(dculPaths).toEqual([
            {
                domain: "domain-slug",
                course: "course-slug",
                unit: "unit-slug",
                lesson: "lesson-slug",
            },
        ]);
    });

    it("returns multiple DCUL paths when the exercise is in multiple lessons", async () => {
        // Arrange:
        const domains: Record<string, Domain> = {
            "domain-id-1": {
                ...createBaseDomain(),
                slug: "math",
            },
        };

        const courses: Record<string, Course> = {
            "course-id-2": {
                ...createBaseCourse(),
                slug: "algebra",
                listedAncestorIds: ["domain-id-1"],
            },
        };

        const units: Record<string, Unit> = {
            "unit-id-3": {
                ...createBaseUnit(),
                slug: "unit-one",
                listedAncestorIds: ["course-id-2"],
            },
        };

        const lessons: Record<string, Lesson> = {
            "lesson-id-4": {
                ...createBaseLesson(),
                slug: "equations-of-one-variable",
                listedAncestorIds: ["unit-id-3"],
            },

            "lesson-id-5": {
                ...createBaseLesson(),
                slug: "graphing-lines",
                listedAncestorIds: ["unit-id-3"],
            },
        };

        const contentRepo: ContentRepository = {
            ...createEmptyContentRepo(),
            getDomainById: async (id) => domains[id],
            getCourseById: async (id) => courses[id],
            getUnitById: async (id) => units[id],
            getLessonById: async (id) => lessons[id],
        };

        const exercise: Exercise = {
            ...createBaseExercise(),
            listedAncestorIds: ["lesson-id-4", "lesson-id-5"],
        };

        // Act:
        const dculPaths = await getDculPaths(exercise, contentRepo);

        // Assert:
        expect(dculPaths).toEqual([
            {
                domain: "math",
                course: "algebra",
                unit: "unit-one",
                lesson: "equations-of-one-variable",
            },
            {
                domain: "math",
                course: "algebra",
                unit: "unit-one",
                lesson: "graphing-lines",
            },
        ]);
    });

    it("returns multiple DCUL paths when the exercise is in multiple units", async () => {
        // Arrange:
        const domains: Record<string, Domain> = {
            "domain-id-1": {
                ...createBaseDomain(),
                slug: "math",
            },
        };

        const courses: Record<string, Course> = {
            "course-id-2": {
                ...createBaseCourse(),
                slug: "algebra",
                listedAncestorIds: ["domain-id-1"],
            },
        };

        const units: Record<string, Unit> = {
            "unit-id-3": {
                ...createBaseUnit(),
                slug: "unit-one",
                listedAncestorIds: ["course-id-2"],
            },

            "unit-id-5": {
                ...createBaseUnit(),
                slug: "unit-two",
                listedAncestorIds: ["course-id-2"],
            },
        };

        const lessons: Record<string, Lesson> = {
            "lesson-id-4": {
                ...createBaseLesson(),
                slug: "equations-of-one-variable",
                listedAncestorIds: ["unit-id-3", "unit-id-5"],
            },
        };

        const contentRepo: ContentRepository = {
            ...createEmptyContentRepo(),
            getDomainById: async (id) => domains[id],
            getCourseById: async (id) => courses[id],
            getUnitById: async (id) => units[id],
            getLessonById: async (id) => lessons[id],
        };

        const exercise: Exercise = {
            ...createBaseExercise(),
            listedAncestorIds: ["lesson-id-4"],
        };

        // Act:
        const dculPaths = await getDculPaths(exercise, contentRepo);

        // Assert:
        expect(dculPaths).toEqual([
            {
                domain: "math",
                course: "algebra",
                unit: "unit-one",
                lesson: "equations-of-one-variable",
            },
            {
                domain: "math",
                course: "algebra",
                unit: "unit-two",
                lesson: "equations-of-one-variable",
            },
        ]);
    });

    it("returns multiple DCUL paths when the exercise is in multiple courses", async () => {
        // Arrange:
        const domains: Record<string, Domain> = {
            "domain-id-1": {
                ...createBaseDomain(),
                slug: "math",
            },
        };

        const courses: Record<string, Course> = {
            "course-id-2": {
                ...createBaseCourse(),
                slug: "algebra",
                listedAncestorIds: ["domain-id-1"],
            },

            "course-id-5": {
                ...createBaseCourse(),
                slug: "8th-grade-math",
                listedAncestorIds: ["domain-id-1"],
            },
        };

        const units: Record<string, Unit> = {
            "unit-id-3": {
                ...createBaseUnit(),
                slug: "unit-one",
                listedAncestorIds: ["course-id-2", "course-id-5"],
            },
        };

        const lessons: Record<string, Lesson> = {
            "lesson-id-4": {
                ...createBaseLesson(),
                slug: "equations-of-one-variable",
                listedAncestorIds: ["unit-id-3"],
            },
        };

        const contentRepo: ContentRepository = {
            ...createEmptyContentRepo(),
            getDomainById: async (id) => domains[id],
            getCourseById: async (id) => courses[id],
            getUnitById: async (id) => units[id],
            getLessonById: async (id) => lessons[id],
        };

        const exercise: Exercise = {
            ...createBaseExercise(),
            listedAncestorIds: ["lesson-id-4"],
        };

        // Act:
        const dculPaths = await getDculPaths(exercise, contentRepo);

        // Assert:
        expect(dculPaths).toEqual([
            {
                domain: "math",
                course: "algebra",
                unit: "unit-one",
                lesson: "equations-of-one-variable",
            },
            {
                domain: "math",
                course: "8th-grade-math",
                unit: "unit-one",
                lesson: "equations-of-one-variable",
            },
        ]);
    });

    it("returns multiple DCUL paths when the exercise is in multiple domains", async () => {
        // Arrange:
        const domains: Record<string, Domain> = {
            "domain-id-1": {
                ...createBaseDomain(),
                slug: "math",
            },

            "domain-id-5": {
                ...createBaseDomain(),
                slug: "computer-programming",
            },
        };

        const courses: Record<string, Course> = {
            "course-id-2": {
                ...createBaseCourse(),
                slug: "algebra",
                listedAncestorIds: ["domain-id-1", "domain-id-5"],
            },
        };

        const units: Record<string, Unit> = {
            "unit-id-3": {
                ...createBaseUnit(),
                slug: "unit-one",
                listedAncestorIds: ["course-id-2", "course-id-5"],
            },
        };

        const lessons: Record<string, Lesson> = {
            "lesson-id-4": {
                ...createBaseLesson(),
                slug: "equations-of-one-variable",
                listedAncestorIds: ["unit-id-3"],
            },
        };

        const contentRepo: ContentRepository = {
            ...createEmptyContentRepo(),
            getDomainById: async (id) => domains[id],
            getCourseById: async (id) => courses[id],
            getUnitById: async (id) => units[id],
            getLessonById: async (id) => lessons[id],
        };

        const exercise: Exercise = {
            ...createBaseExercise(),
            listedAncestorIds: ["lesson-id-4"],
        };

        // Act:
        const dculPaths = await getDculPaths(exercise, contentRepo);

        // Assert:
        expect(dculPaths).toEqual([
            {
                domain: "math",
                course: "algebra",
                unit: "unit-one",
                lesson: "equations-of-one-variable",
            },
            {
                domain: "computer-programming",
                course: "algebra",
                unit: "unit-one",
                lesson: "equations-of-one-variable",
            },
        ]);
    });
});
