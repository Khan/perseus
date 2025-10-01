import * as fs from "node:fs/promises";
import {join} from "path";

import _ from "underscore";

import {ContentRepository} from "./content-repository";
import {gcloudStorage} from "./gcloud-storage";

describe("ContentRepository.getExercises()", () => {
    it("lists the exercises appearing in the latest snapshot file on GCS", async () => {
        // Arrange:
        const contentRepository = new ContentRepository({
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
        const contentRepository = new ContentRepository({
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
        const contentRepository = new ContentRepository({
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
