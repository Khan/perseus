import {GcsContentRepository} from "./gcs-content-repository";

import type {ContentJsonRepository} from "./gcs-content-repository";

describe("GcsContentRepository.getExercises()", () => {
    it("lists the exercises appearing in the latest snapshot file on GCS", async () => {
        // Arrange:
        const snapshotJson = JSON.stringify({
            domains: [],
            courses: [],
            units: [],
            lessons: [],
            exercises: [
                {
                    id: "exercise-1",
                    slug: "slug-1",
                    exerciseLength: 7,
                    problemTypes: [],
                    translatedPerseusContentSha:
                        "the-translated-perseus-content-sha",
                    listedAncestorIds: [],
                },
            ],
        });

        const contentJsonRepository: ContentJsonRepository = {
            getSnapshotJson: async () => snapshotJson,
            getAssessmentItemJson() {
                throw Error("getAssessmentItemJson not implemented.");
            },
        };

        const contentRepository = new GcsContentRepository({
            contentJsonRepository,
        });

        // Act:
        const result = await contentRepository.getExercises();

        // Assert:
        expect(result).toEqual([
            {
                id: "exercise-1",
                slug: "slug-1",
                exerciseLength: 7,
                problemTypes: [],
                translatedPerseusContentSha:
                    "the-translated-perseus-content-sha",
                listedAncestorIds: [],
            },
        ]);
    });

    it("returns consistent results if called multiple times", async () => {
        // Arrange:
        const snapshotJson = JSON.stringify({
            domains: [],
            courses: [],
            units: [],
            lessons: [],
            exercises: [
                {
                    id: "exercise-1",
                    slug: "",
                    exerciseLength: 7,
                    problemTypes: [],
                    translatedPerseusContentSha:
                        "the-translated-perseus-content-sha",
                    listedAncestorIds: [],
                },
            ],
        });

        const contentJsonRepository: ContentJsonRepository = {
            getSnapshotJson: async () => snapshotJson,
            getAssessmentItemJson() {
                throw Error("getAssessmentItemJson not implemented.");
            },
        };

        const contentRepository = new GcsContentRepository({
            contentJsonRepository,
        });

        // Act:
        const result1 = await contentRepository.getExercises();
        const result2 = await contentRepository.getExercises();

        // Assert:
        expect(result2).toEqual(result1);
    });
});

describe("GcsContentRepository.getAssessmentItems()", () => {
    it("gets the assessment items for an exercise", async () => {
        // Arrange:
        const assessmentItemsJson = JSON.stringify([
            {id: "theItemId", item_data: {}},
        ]);

        const snapshotJson = JSON.stringify({
            domains: [],
            courses: [],
            units: [],
            lessons: [],
            exercises: [
                {
                    id: "theExerciseId",
                    slug: "",
                    exerciseLength: 7,
                    translatedPerseusContentSha: "theContentSha",
                    listedAncestorIds: [],
                    problemTypes: [
                        {
                            items: [
                                {id: "theItemId", isContextInaccessible: true},
                            ],
                        },
                    ],
                },
            ],
        });

        const contentJsonRepository: ContentJsonRepository = {
            getSnapshotJson: async () => snapshotJson,
            getAssessmentItemJson: async () => assessmentItemsJson,
        };

        const contentRepository = new GcsContentRepository({
            contentJsonRepository,
        });

        // Act:
        const items =
            await contentRepository.getAssessmentItems("theExerciseId");

        // Assert:
        expect(items).toEqual([
            {
                isContextInaccessible: true,
                perseusItem: {
                    answerArea: {
                        calculator: false,
                        financialCalculatorTotalAmount: false,
                        financialCalculatorMonthlyPayment: false,
                        financialCalculatorTimeToPayOff: false,
                        periodicTable: false,
                        periodicTableWithKey: false,
                    },
                    hints: [],
                    question: {
                        content: "",
                        images: {},
                        widgets: {},
                    },
                },
            },
        ]);
    });
});
