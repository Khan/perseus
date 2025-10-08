#!/usr/bin/env -S node -r @swc-node/register

import * as fs from "node:fs/promises";
import {join} from "node:path";

import {getPublishedContentVersion} from "./content-version";
import {compileA11yStats} from "./domain/a11y-stats";
import {formatExerciseAccessibilityData} from "./format-exercise-accessibility-data";
import {GcsContentJsonRepository} from "./gcs-content-json-repository";
import {GcsContentRepository} from "./gcs-content-repository";

import type {ContentRepository} from "./domain/content-types";

async function main() {
    const locale = "en";
    const contentVersion = await getPublishedContentVersion(locale);
    const dataDirectory = join("/", "tmp", "perseus-a11y-metrics");

    const contentRepo: ContentRepository = new GcsContentRepository({
        contentJsonRepository: new GcsContentJsonRepository({
            locale,
            contentVersion,
            dataDirectory,
        }),
    });

    const a11yStats = await compileA11yStats(contentRepo);

    await fs.writeFile(
        join(dataDirectory, "exercises.json"),
        formatExerciseAccessibilityData(a11yStats),
        "utf-8",
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
