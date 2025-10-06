import {AssessmentItem, ContentRepository, Exercise} from "./content-types";
import {compileStats} from "./compile-stats";
import {PerseusItem} from "@khanacademy/perseus-core";

function createBlankPerseusItem(): PerseusItem {
    return {
        answerArea: null,
        hints: [],
        question: {
            content: "",
            widgets: {},
            images: {}
        }
    }
}

describe("compileStats", () => {
    it("considers an item fully accessible if it has accessible context and no widgets", async () => {
        const exercises: Exercise[] = [
            {id: "exercise-1", exerciseLength: 1}
        ];

        const assessmentItems: AssessmentItem[] = [
            {
                isContextInaccessible: false,
                perseusItem: createBlankPerseusItem(),
            }
        ]

        const contentRepository: ContentRepository = {
            getExercises: async () => exercises,
            getAssessmentItems: async () => assessmentItems
        }

        expect(await compileStats(contentRepository)).toEqual({
            full: 1,
            limited: 0,
            inaccessible: 0,
            total: 1,
        })
    })
})
