#!/usr/bin/env -S node -r @swc-node/register

import * as fs from "node:fs/promises";
import {join} from "node:path";

import {ContentRepository} from "./content-repository";
import {getPublishedContentVersion} from "./content-version";
import {compileA11yStats} from "./domain/a11y-stats";
import {formatExerciseAccessibilityData} from "./format-exercise-accessibility-data";
import {GcsContentJsonRepository} from "./gcs-content-json-repository";
import {gcloudStorage} from "./platform/gcloud-storage";

async function main() {
    const locale = "en";
    const contentVersion = await getPublishedContentVersion(locale);
    const dataDirectory = join("/", "tmp", "perseus-a11y-metrics");
    const outputFilePath = join(dataDirectory, "exercises.json");

    const contentJsonRepo = new GcsContentJsonRepository({
        locale,
        contentVersion,
        dataDirectory,
    });

    const contentRepo = new ContentRepository({
        contentJsonRepository: contentJsonRepo,
    });

    const a11yStats = await compileA11yStats(contentRepo);

    await contentJsonRepo.prune();

    await fs.writeFile(
        outputFilePath,
        formatExerciseAccessibilityData(a11yStats),
        "utf-8",
    );

    // TODO(benchristel): there is probably a better place for the data to
    // live. I'm not sure what the khanflow-prod-bq-archive-unused-table-expiration
    // bucket is supposed to be for.
    // TODO(benchristel): should the extension for the data file be .ndjson?
    // See: https://github.com/ndjson/ndjson-spec?tab=readme-ov-file#33-mediatype-and-file-extensions
    // TODO(LEMS-3674): Script can throw 404 errors when updating an existing object. Until fixed
    // you might need to append a number at the end to make a new object.
    await gcloudStorage.cp(
        [outputFilePath],
        `gs://khanflow-prod-bq-archive-unused-table-expiration/khan_test/perseus/analytics/exercise-accessibility-data-nl.json`,
        {project: "khan-data-lake"},
    );

    // eslint-disable-next-line no-console
    console.log(
        [
            `EXERCISE ACCESSIBILITY STATS:`,
            `-----------------------------`,
            `full:         ${a11yStats.full} exercises`,
            `limited:      ${a11yStats.limited} exercises`,
            `inaccessible: ${a11yStats.inaccessible} exercises`,
            `-----------------------------`,
            `total: ${a11yStats.total} exercises`,
        ].join("\n"),
    );
}

// eslint-disable-next-line no-console
main().catch(console.error);
