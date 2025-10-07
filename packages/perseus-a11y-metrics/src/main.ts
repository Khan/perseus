#!/usr/bin/env -S node -r @swc-node/register

import {getPublishedContentVersion} from "./content-version";
import {compileA11yStats} from "./domain/a11y-stats";
import {GcsContentRepository} from "./gcs-content-repository";

import type {ContentRepository} from "./domain/content-types";

async function main() {
    const locale = "en";
    const contentVersion = await getPublishedContentVersion(locale);
    const contentRepo: ContentRepository = new GcsContentRepository({
        contentVersion,
        locale,
    });

    const a11yStats = await compileA11yStats(contentRepo);

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
