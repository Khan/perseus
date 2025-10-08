import {compileA11yStats} from "./a11y-stats";
import {createBaseExercise} from "./content-mocks";

import type {
    AssessmentItem,
    ContentRepository,
    Exercise,
} from "./content-types";
import type {PerseusItem} from "@khanacademy/perseus-core";

function createBlankPerseusItem(): PerseusItem {
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

describe("compileStats", () => {
    it("considers an item fully accessible if it has accessible context and no widgets", async () => {
        const exercises: Exercise[] = [
            {
                ...createBaseExercise(),
                exerciseLength: 1,
                slug: "the-exercise",
                listedAncestorIds: ["1"],
            },
        ];

        const assessmentItems: AssessmentItem[] = [
            {
                isContextInaccessible: false,
                perseusItem: createBlankPerseusItem(),
            },
        ];

        const contentRepository: ContentRepository = {
            getExercises: async () => exercises,
            getAssessmentItems: async () => assessmentItems,
            getDomainById: async () => ({slug: "the-domain"}),
            getCourseById: async () => ({
                slug: "the-course",
                id: "3",
                listedAncestorIds: [""],
            }),
            getUnitById: async () => ({
                slug: "the-unit",
                id: "2",
                listedAncestorIds: ["3"],
            }),
            getLessonById: async () => ({
                slug: "the-lesson",
                id: "1",
                listedAncestorIds: ["2"],
            }),
        };

        expect(await compileA11yStats(contentRepository)).toEqual({
            full: 1,
            limited: 0,
            inaccessible: 0,
            total: 1,
            exercisesWithDcul: [
                {
                    domain: "the-domain",
                    course: "the-course",
                    unit: "the-unit",
                    lesson: "the-lesson",
                    exercise: "the-exercise",
                    accessibility: "full",
                },
            ],
        });
    });
});
