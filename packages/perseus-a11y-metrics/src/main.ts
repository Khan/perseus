#!/usr/bin/env -S node -r @swc-node/register

import {compileStats} from "./compile-stats";
import {getPublishedContentVersion} from "./content-version";
import {GcsContentRepository} from "./gcs-content-repository";

import type {ContentRepository} from "./content-types";

async function main() {
    const locale = "en";
    const contentVersion = await getPublishedContentVersion(locale);
    const contentRepo: ContentRepository = new GcsContentRepository({
        contentVersion,
        locale,
    });

    const a11yStats = await compileStats(contentRepo);

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
