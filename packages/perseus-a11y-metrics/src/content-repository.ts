import {Exercise, parseSnapshot, Snapshot} from "./parse-snapshot";
import * as fs from "node:fs/promises";
import {join} from "node:path";
import {gcloudStorage} from "./gcloud-storage";
import {parseAndMigratePerseusItem, PerseusItem, isFailure} from "@khanacademy/perseus-core";
import {command} from "./command";
import {array, object, unknown} from "zod";

/**
 * The ContentRepository provides content data to the rest of the program.
 * It knows where to find the data on Google Cloud Storage, and it keeps
 * track of a local copy of the data on disk. Requests to read data from the
 * repository will download the data if it's not yet stored locally.
 */
export class ContentRepository {
    private snapshotCache?: Snapshot
    private mapOfIdsToExercisesCache?: Record<string, Exercise>
    constructor(private contentVersion: string, private locale: string) {}

    async getExercises(): Promise<Exercise[]> {
        const snapshot = await this.getSnapshot();
        return snapshot.exercises;
    }

    async getExerciseById(id: string): Promise<Exercise | undefined> {
        const map = await this.getMapOfIdsToExercises();
        return map[id]
    }

    async getAssessmentItems(exerciseId: string): Promise<PerseusItem[]> {
        const json = await this.getAssessmentItemJson(exerciseId);
        const data = JSON.parse(json);
        const itemWrapperSchema = array(object({item_data: unknown()}));
        return itemWrapperSchema.parse(data).map(({item_data: itemData}) => {
            const parseResult = parseAndMigratePerseusItem(itemData)
            if (isFailure(parseResult)) {
                throw new Error(`Failed to parse Perseus item: ${parseResult.detail.message}`)
            }
            return parseResult.value;
        })
    }

    async getSnapshot(): Promise<Snapshot> {
        this.snapshotCache ??= parseSnapshot(await this.getSnapshotJson());
        return this.snapshotCache;
    }

    private async getMapOfIdsToExercises(): Promise<Record<string, Exercise>> {
        if (this.mapOfIdsToExercisesCache == null) {
            this.mapOfIdsToExercisesCache = {}
            for (const exercise of await this.getExercises()) {
                this.mapOfIdsToExercisesCache[exercise.id] = exercise
            }
        }
        return this.mapOfIdsToExercisesCache;
    }

    private async getSnapshotJson(): Promise<string> {
        const localPath = join("/", "tmp", "perseus-a11y-metrics", this.contentVersion, `snapshot-${this.locale}.json`)
        const gcloudUrl = `gs://ka-content-data/${this.locale}/snapshot-${this.contentVersion}.json`
        try {
            return this.readLocalSnapshotJsonWithJqFiltering()
        } catch {
            // The file doesn't exist or can't be read. Try downloading it.
            await gcloudStorage.cp([gcloudUrl], localPath, {project: "khan-academy"})
            return this.readLocalSnapshotJsonWithJqFiltering()
        }
    }

    private async readLocalSnapshotJsonWithJqFiltering(): Promise<string> {
        // The snapshot data is too large (600 MB) to fit into a NodeJS string.
        // The maximum size of a string is 512 MB. So we use `jq` to filter the
        // data to just the exercises.
        // TODO: de-duplicate path
        const path = join("/", "tmp", "perseus-a11y-metrics", this.contentVersion, `snapshot-${this.locale}.json`)
        const getExercisesCommand = command("jq", "pick(.exercises)", path);
        const {stdout: snapshotJson} = await getExercisesCommand
            .withStdoutToString()
            .run();
        return snapshotJson;
    }

    private async getAssessmentItemJson(exerciseId: string): Promise<string> {
        const exercise = await this.getExerciseById(exerciseId);
        if (exercise == null) {
            throw new Error(`Exercise not found for ID: ${exerciseId}`)
        }
        // To support non-English locales, we download the "translated"
        // version of the content. For English, that's just a copy of the
        // original content. However, the shas of the "translated" content
        // are different (TODO: why?) so we have to be sure to use the
        // translatedPerseusContentSha here.
        const contentSha = exercise.translatedPerseusContentSha;
        const localDir = join("/", "tmp", "perseus-a11y-metrics", this.contentVersion, "exercises")
        const localFilePath = join(localDir, this.locale, `${exerciseId}-${contentSha}.json`)
        const gcloudUrl = `gs://content-property.khanacademy.org/Exercise.TranslatedPerseusContent/${this.locale}`
        try {
            return fs.readFile(localFilePath, "utf-8")
        } catch {
            // The file doesn't exist or can't be read. Download all the exercise content.
            await gcloudStorage.cp([gcloudUrl], localDir, {project: "khan-academy", recursive: true})
            return fs.readFile(localFilePath, "utf-8")
        }
    }
}
