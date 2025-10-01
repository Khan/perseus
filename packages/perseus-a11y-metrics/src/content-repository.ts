import * as fs from "node:fs/promises";
import {join} from "node:path";

import {isFailure, parseAndMigratePerseusItem} from "@khanacademy/perseus-core";
import {array, object, unknown} from "zod";

import {command} from "./command";
import {gcloudStorage} from "./gcloud-storage";
import {parseSnapshot} from "./parse-snapshot";

import type {Exercise, Snapshot} from "./parse-snapshot";
import type {PerseusItem} from "@khanacademy/perseus-core";

export interface ContentRepositoryOptions {
    contentVersion: string;
    locale: string;
    /**
     * A directory in which to cache data downloaded from Google Cloud
     * Storage. Will be defaulted if not provided. The ContentRepository will
     * create the directory if it doesn't yet exist.
     */
    cacheDirectory?: string;
}

/**
 * The ContentRepository provides content data to the rest of the program.
 * It knows where to find the data on Google Cloud Storage, and it keeps
 * track of a local copy of the data on disk. Requests to read data from the
 * repository will download the data if it's not yet stored locally.
 */
export class ContentRepository {
    private snapshotCache?: Snapshot;
    private mapOfIdsToExercisesCache?: Record<string, Exercise>;
    constructor(private options: ContentRepositoryOptions) {}

    async getExercises(): Promise<Exercise[]> {
        const snapshot = await this.getSnapshot();
        return snapshot.exercises;
    }

    async getExerciseById(id: string): Promise<Exercise | undefined> {
        const map = await this.getMapOfIdsToExercises();
        return map[id];
    }

    async getAssessmentItems(exerciseId: string): Promise<PerseusItem[]> {
        const json = await this.getAssessmentItemJson(exerciseId);
        const data = JSON.parse(json);
        const itemListSchema = array(object({item_data: unknown()}));
        return itemListSchema.parse(data).map((item) => {
            const parseResult = parseAndMigratePerseusItem(item.item_data);
            if (isFailure(parseResult)) {
                throw new Error(
                    `Failed to parse Perseus item: ${parseResult.detail.message}`,
                );
            }
            return parseResult.value;
        });
    }

    async getSnapshot(): Promise<Snapshot> {
        this.snapshotCache ??= parseSnapshot(await this.getSnapshotJson());
        return this.snapshotCache;
    }

    private async getMapOfIdsToExercises(): Promise<Record<string, Exercise>> {
        if (this.mapOfIdsToExercisesCache == null) {
            this.mapOfIdsToExercisesCache = {};
            for (const exercise of await this.getExercises()) {
                this.mapOfIdsToExercisesCache[exercise.id] = exercise;
            }
        }
        return this.mapOfIdsToExercisesCache;
    }

    private async getSnapshotJson(): Promise<string> {
        const gcloudUrl = `gs://ka-content-data/${this.getLocale()}/snapshot-${this.getContentVersion()}.json`;
        try {
            return await this.readLocalSnapshotJsonWithJqFiltering();
        } catch {
            // The file doesn't exist or can't be read. Try downloading it.
            await fs.mkdir(this.getDataDir(), {recursive: true});
            await gcloudStorage.cp([gcloudUrl], this.getLocalSnapshotPath(), {
                project: "khan-academy",
            });
            return await this.readLocalSnapshotJsonWithJqFiltering();
        }
    }

    private async readLocalSnapshotJsonWithJqFiltering(): Promise<string> {
        // The snapshot data is too large (600 MB) to fit into a NodeJS string.
        // The maximum size of a string is 512 MB. So we use `jq` to filter the
        // data to just the exercises.
        const path = this.getLocalSnapshotPath();
        const getExercisesCommand = command("jq", "pick(.exercises)", path);
        const {stdout: snapshotJson} = await getExercisesCommand
            .withStdoutToString()
            .run();
        return snapshotJson;
    }

    private async getAssessmentItemJson(exerciseId: string): Promise<string> {
        const exercise = await this.getExerciseById(exerciseId);
        if (exercise == null) {
            throw new Error(`Exercise not found for ID: ${exerciseId}`);
        }
        // To support non-English locales, we download the "translated"
        // version of the content. For English, that's just a copy of the
        // original content. However, the shas of the "translated" content
        // are different (TODO: why?) so we have to be sure to use the
        // translatedPerseusContentSha here.
        const contentSha = exercise.translatedPerseusContentSha;
        const exercisesDir = join(this.getDataDir(), "exercises");
        const localFilePath = join(
            exercisesDir,
            this.getLocale(),
            `${exerciseId}-${contentSha}.json`,
        );
        const gcloudUrl = `gs://content-property.khanacademy.org/Exercise.TranslatedPerseusContent/${this.getLocale()}`;
        try {
            return await fs.readFile(localFilePath, "utf-8");
        } catch {
            await fs.mkdir(exercisesDir, {recursive: true});
            // The file doesn't exist or can't be read. Download all the exercise content.
            await gcloudStorage.cp([gcloudUrl], exercisesDir, {
                project: "khan-academy",
                recursive: true,
            });
            return await fs.readFile(localFilePath, "utf-8");
        }
    }

    private getLocalSnapshotPath(): string {
        return join(this.getDataDir(), `snapshot-${this.getLocale()}.json`);
    }

    private getDataDir(): string {
        return join(this.getCacheDirectory(), this.getContentVersion());
    }

    private getLocale(): string {
        return this.options.locale;
    }

    private getContentVersion(): string {
        return this.options.contentVersion;
    }

    private getCacheDirectory(): string {
        const defaultValue = join("/", "tmp", "perseus-a11y-metrics");
        return this.options.cacheDirectory ?? defaultValue;
    }
}
