#!/usr/bin/env -S node -r @swc-node/register

import * as fs from "node:fs/promises";
import {join} from "node:path";

import {ContentRepository} from "./content-repository";
import {getPublishedContentVersion} from "./content-version";
import {compileA11yStats} from "./domain/a11y-stats";
import {formatExerciseAccessibilityData} from "./format-exercise-accessibility-data";
import {GcsContentJsonRepository} from "./gcs-content-json-repository";
import {urlSafeDate} from "./lib/date";
import {gcloudStorage} from "./platform/gcloud-storage";

import type {ContentProvider} from "./domain/content-types";

async function main() {
    const now = new Date();
    const locale = "en";
    const contentVersion = await getPublishedContentVersion(locale);
    const dataDirectory = join("/", "tmp", "perseus-a11y-metrics");

    const contentJsonRepo = new GcsContentJsonRepository({
        locale,
        contentVersion,
        dataDirectory,
    });

    const contentRepo: ContentProvider = new ContentRepository({
        contentJsonRepository: contentJsonRepo,
    });

    const a11yStats = await compileA11yStats(contentRepo);

    await contentJsonRepo.prune();

    await fs.writeFile(
        join(dataDirectory, "exercises.json"),
        formatExerciseAccessibilityData(a11yStats),
        "utf-8",
    );

    // TODO(benchristel): should the extension for the data file be .ndjson?
    // See: https://github.com/ndjson/ndjson-spec?tab=readme-ov-file#33-mediatype-and-file-extensions
    await gcloudStorage.cp(
        [join(dataDirectory, "exercises.json")],
        `gs://khanflow-prod-bq-archive-unused-table-expiration/khan_test/perseus/analytics/${urlSafeDate(now)}/exercise-accessibility-data-nl.json`,
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
