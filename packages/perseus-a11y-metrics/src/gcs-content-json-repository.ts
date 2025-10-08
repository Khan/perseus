import fs from "node:fs/promises";
import {join} from "node:path";

import {command} from "./platform/command";
import {gcloudStorage} from "./platform/gcloud-storage";
import {ContentJsonRepository} from "./gcs-content-repository";

export interface GcsContentJsonRepositoryOptions {
    locale: string;
    contentVersion: string;
    /**
     * A directory in which to store data. The GcsContentJsonRepository will
     * create the directory if it doesn't yet exist.
     */
    dataDirectory: string;
}

export class GcsContentJsonRepository implements ContentJsonRepository {
    constructor(private options: GcsContentJsonRepositoryOptions) {}

    async getSnapshotJson(): Promise<string> {
        const gcloudUrl = `gs://ka-content-data/${this.getLocale()}/snapshot-${this.getContentVersion()}.json`;
        try {
            return await this.readLocalSnapshotJsonWithJqFiltering();
        } catch {
            // The file doesn't exist or can't be read. Try downloading it.
            await fs.mkdir(this.getVersionedDataDir(), {recursive: true});
            await gcloudStorage.cp([gcloudUrl], this.getLocalSnapshotPath(), {
                project: "khan-academy",
            });
            return await this.readLocalSnapshotJsonWithJqFiltering();
        }
    }

    async getAssessmentItemJson(
        exerciseId: string,
        contentSha: string,
    ): Promise<string> {
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
        return join(
            this.getVersionedDataDir(),
            `snapshot-${this.getLocale()}.json`,
        );
    }

    private getVersionedDataDir(): string {
        return join(this.getDataDir(), this.getContentVersion());
    }

    private getDataDir(): string {
        return join(this.options.dataDirectory);
    }

    private getLocale(): string {
        return this.options.locale;
    }

    private getContentVersion(): string {
        return this.options.contentVersion;
    }

    private async readLocalSnapshotJsonWithJqFiltering(): Promise<string> {
        // The snapshot data is too large (600 MB) to fit into a NodeJS string.
        // The maximum size of a string is 512 MB. So we use `jq` to filter the
        // data to just what we need.
        const path = this.getLocalSnapshotPath();

        const jqProgram = `
            {
                domains: .domains | map(pick(.id, .slug)),
                courses: .courses | map(pick(.id, .slug, .listedAncestorIds)),
                units: .units | map(pick(.id, .slug, .listedAncestorIds)),
                lessons: .lessons | map(pick(.id, .slug, .listedAncestorIds)),
                exercises: .exercises | map({
                    exerciseLength: .exerciseLength,
                    id: .id,
                    slug: .slug,
                    translatedPerseusContentSha: .translatedPerseusContentSha,
                    listedAncestorIds: .listedAncestorIds,
                    problemTypes: .problemTypes | map({
                        items: .items  | map(pick(.id, .isContextInaccessible))
                    }),
                })
            }
        `;

        const getExercisesCommand = command("jq", jqProgram, path);
        const {stdout: snapshotJson} = await getExercisesCommand
            .withStdoutToString()
            .run();
        return snapshotJson;
    }
}
