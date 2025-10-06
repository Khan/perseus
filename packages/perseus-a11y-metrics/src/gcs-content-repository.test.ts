import * as fs from "node:fs/promises";
import {join} from "path";

import _ from "underscore";

import {GcsContentRepository} from "./gcs-content-repository";
import {gcloudStorage} from "./gcloud-storage";

describe("GcsContentRepository.getExercises()", () => {
    it("lists the exercises appearing in the latest snapshot file on GCS", async () => {
        // Arrange:
        const contentRepository = new GcsContentRepository({
            contentVersion: "abc123",
            locale: "lol",
            cacheDirectory: join(
                "/",
                "tmp",
                "perseus-tests",
                `${Math.random()}`,
            ),
        });

        const snapshotJson = JSON.stringify({
            exercises: [
                {
                    id: "exercise-1",
                    exerciseLength: 7,
                    translatedPerseusContentSha:
                        "the-translated-perseus-content-sha",
                },
            ],
        });

        gcloudStorage.cp = jest
            .fn()
            .mockImplementation(async (sources, dest, options) => {
                const expectedUrl = `gs://ka-content-data/lol/snapshot-abc123.json`;
                if (
                    _.isEqual(sources, [expectedUrl]) &&
                    options.project === "khan-academy"
                ) {
                    await fs.writeFile(dest, snapshotJson, {encoding: "utf-8"});
                } else {
                    throw Error(
                        `Mock for gcloudStorage.cp was called with unexpected arguments: ${JSON.stringify(sources)}, ${JSON.stringify(dest)}, ${JSON.stringify(options)}`,
                    );
                }
            });

        // Act:
        const result = await contentRepository.getExercises();

        // Assert:
        expect(result).toEqual([
            {
                id: "exercise-1",
                exerciseLength: 7,
                translatedPerseusContentSha:
                    "the-translated-perseus-content-sha",
            },
        ]);
    });

    it("returns consistent results if called multiple times", async () => {
        // Arrange:
        const contentRepository = new GcsContentRepository({
            contentVersion: "abc123",
            locale: "lol",
            cacheDirectory: join(
                "/",
                "tmp",
                "perseus-tests",
                `${Math.random()}`,
            ),
        });

        const snapshotJson = JSON.stringify({
            exercises: [
                {
                    id: "exercise-1",
                    exerciseLength: 7,
                    translatedPerseusContentSha:
                        "the-translated-perseus-content-sha",
                },
            ],
        });

        gcloudStorage.cp = jest
            .fn()
            .mockImplementation(async (sources, dest, options) => {
                const expectedUrl = `gs://ka-content-data/lol/snapshot-abc123.json`;
                if (
                    _.isEqual(sources, [expectedUrl]) &&
                    options.project === "khan-academy"
                ) {
                    await fs.writeFile(dest, snapshotJson, {encoding: "utf-8"});
                } else {
                    throw Error(
                        `Mock for gcloudStorage.cp was called with unexpected arguments: ${JSON.stringify(sources)}, ${JSON.stringify(dest)}, ${JSON.stringify(options)}`,
                    );
                }
            });

        // Act:
        const result1 = await contentRepository.getExercises();
        const result2 = await contentRepository.getExercises();

        // Assert:
        expect(result2).toEqual(result1);
    });

    it("uses the local filesystem cache if called multiple times", async () => {
        // Arrange:
        const contentRepository = new GcsContentRepository({
            contentVersion: "abc123",
            locale: "lol",
            cacheDirectory: join(
                "/",
                "tmp",
                "perseus-tests",
                `${Math.random()}`,
            ),
        });

        const snapshotJson = JSON.stringify({
            exercises: [
                {
                    id: "exercise-1",
                    exerciseLength: 7,
                    translatedPerseusContentSha:
                        "the-translated-perseus-content-sha",
                },
            ],
        });

        gcloudStorage.cp = jest
            .fn()
            .mockImplementation(async (sources, dest, options) => {
                const expectedUrl = `gs://ka-content-data/lol/snapshot-abc123.json`;
                if (
                    _.isEqual(sources, [expectedUrl]) &&
                    options.project === "khan-academy"
                ) {
                    await fs.writeFile(dest, snapshotJson, {encoding: "utf-8"});
                } else {
                    throw Error(
                        `Mock for gcloudStorage.cp was called with unexpected arguments: ${JSON.stringify(sources)}, ${JSON.stringify(dest)}, ${JSON.stringify(options)}`,
                    );
                }
            });

        // Act:
        await contentRepository.getExercises();
        await contentRepository.getExercises();

        // Assert:
        expect(gcloudStorage.cp).toHaveBeenCalledTimes(1);
    });
});

describe("ContentRepository.getAssessmentItems()", () => {
    it("gets the assessment items for an exercise", async () => {
        // Arrange:
        const contentRepository = new GcsContentRepository({
            contentVersion: "theVersion",
            locale: "lol",
            cacheDirectory: join(
                "/",
                "tmp",
                "perseus-tests",
                `${Math.random()}`,
            ),
        });

        const assessmentItemsJson = JSON.stringify([
            {id: "theItemId", item_data: {}},
        ]);

        const snapshotJson = JSON.stringify({
            exercises: [
                {
                    id: "theExerciseId",
                    exerciseLength: 7,
                    translatedPerseusContentSha: "theContentSha",
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

        gcloudStorage.cp = jest
            .fn()
            .mockImplementation(async (sources, dest, options) => {
                const assessmentItemsUrl = `gs://content-property.khanacademy.org/Exercise.TranslatedPerseusContent/lol`;
                const snapshotUrl = `gs://ka-content-data/lol/snapshot-theVersion.json`;
                if (
                    _.isEqual(sources, [assessmentItemsUrl]) &&
                    options.project === "khan-academy" &&
                    options.recursive
                ) {
                    await fs.mkdir(join(dest, "lol"));
                    await fs.writeFile(
                        join(dest, "lol", "theExerciseId-theContentSha.json"),
                        assessmentItemsJson,
                        {encoding: "utf-8"},
                    );
                } else if (
                    _.isEqual(sources, [snapshotUrl]) &&
                    options.project === "khan-academy"
                ) {
                    await fs.writeFile(dest, snapshotJson, {encoding: "utf-8"});
                } else {
                    throw Error(
                        `Mock for gcloudStorage.cp was called with unexpected arguments: ${JSON.stringify(sources)}, ${JSON.stringify(dest)}, ${JSON.stringify(options)}`,
                    );
                }
            });

        const items =
            await contentRepository.getAssessmentItems("theExerciseId");
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
