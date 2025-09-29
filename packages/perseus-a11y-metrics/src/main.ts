#!/usr/bin/env -S node -r @swc-node/register

import fs from "node:fs/promises";
import {join} from "node:path";

import {getPublishedContentVersion} from "./content-version";
import {gcloudStorage} from "./gcloud-storage";

async function main() {
    const testDir = join("/", "tmp", "test");
    const locale = "en";
    const kaContentDataBucket = "ka-content-data";
    const version = await getPublishedContentVersion(locale);

    await fs.mkdir(testDir, {recursive: true});

    await gcloudStorage.cp(
        [`gs://${kaContentDataBucket}/${locale}/snapshot-${version}.json`],
        join(testDir, `snapshot-${locale}.json`),
        {project: "khan-academy"},
    );
}

main().catch(console.error);
