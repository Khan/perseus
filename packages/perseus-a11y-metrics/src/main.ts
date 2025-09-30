#!/usr/bin/env -S node -r @swc-node/register

import fs from "node:fs/promises";
import {join} from "node:path";

import {command} from "./command";
import {getPublishedContentVersion} from "./content-version";
import {gcloudStorage} from "./gcloud-storage";
import {parseSnapshot} from "./parse-snapshot";
import {exists} from "./filesystem";

async function main() {
    const locale = "en";
    const version = await getPublishedContentVersion(locale);
    const tmpDir = join("/", "tmp", "perseus-a11y-metrics");
    const contentVersionDir = join(tmpDir, version)
    const localSnapshotPath = join(contentVersionDir, `snapshot-${locale}.json`);
    const localExercisesPath = join(contentVersionDir, `exercises`)

    if (!await exists(localSnapshotPath)) {
        // The snapshot data isn't yet on disk. Download it.

        // First, delete any old snapshot data, to save disk space.
        await fs.rm(tmpDir, {recursive: true, force: true});

        // We need to create the destination directory before downloading files;
        // `gcloud` won't create it for us.
        await fs.mkdir(localExercisesPath, {recursive: true});

        await gcloudStorage.cp(
            [`gs://content-property.khanacademy.org/Exercise.TranslatedPerseusContent/${locale}`],
            localExercisesPath,
            {project: "khan-academy", recursive: true},
        )

        await gcloudStorage.cp(
            [`gs://ka-content-data/${locale}/snapshot-${version}.json`],
            localSnapshotPath,
            {project: "khan-academy"},
        );
    }

    // The snapshot data is too large (600 MB) to fit into a NodeJS string.
    // The maximum size of a string is 512 MB. So we use `jq` to filter the
    // data to just the exercises.
    const getExercisesCommand = command("jq", "pick(.exercises)", localSnapshotPath);
    const {stdout: snapshotJson} = await getExercisesCommand
        .withStdoutToString()
        .run();
    parseSnapshot(snapshotJson).exercises.forEach(exercise => console.log(
        `gs://content-property.khanacademy.org/Exercise.TranslatedPerseusContent/en/${exercise.id}-${exercise.translatedPerseusContentSha}.json`
    ))
}

main().catch(console.error);
