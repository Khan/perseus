#!/usr/bin/env -S node -r @swc-node/register

import fs from "node:fs/promises";
import {join} from "node:path";

import {command} from "./command";
import {getPublishedContentVersion} from "./content-version";
import {gcloudStorage} from "./gcloud-storage";

async function main() {
    const testDir = join("/", "tmp", "test");
    const locale = "en";
    const kaContentDataBucket = "ka-content-data";
    const version = await getPublishedContentVersion(locale);
    const localSnapshotPath = join(testDir, `snapshot-${locale}.json`);

    await fs.mkdir(testDir, {recursive: true});

    await gcloudStorage.cp(
        [`gs://${kaContentDataBucket}/${locale}/snapshot-${version}.json`],
        localSnapshotPath,
        {project: "khan-academy"},
    );

    // The snapshot data is too large (600 MB) to fit into a NodeJS string.
    // The maximum size of a string is 512 MB. So we use `jq` to filter the
    // data to just the exercises.
    const getExercisesCommand = command("jq", ".exercises", localSnapshotPath);
    const {stdout: exercisesJson} = await getExercisesCommand
        .withStdoutToString()
        .run();
    console.log(JSON.parse(exercisesJson).length);
}

main().catch(console.error);
