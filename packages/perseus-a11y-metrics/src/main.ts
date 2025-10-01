#!/usr/bin/env -S node -r @swc-node/register

import {isItemAccessible} from "@khanacademy/perseus-core";

import {ContentRepository} from "./content-repository";
import {getPublishedContentVersion} from "./content-version";

async function main() {
    const locale = "en";
    const contentVersion = await getPublishedContentVersion(locale);

    const contentRepo = new ContentRepository({contentVersion, locale});

    const a11yStats = {
        full: 0,
        limited: 0,
        inaccessible: 0,
    };

    const exercises = await contentRepo.getExercises();
    for (const exercise of exercises) {
        const items = await contentRepo.getAssessmentItems(exercise.id);
        const accessibleItems = items.filter(isItemAccessible);

        if (accessibleItems.length === items.length) {
            a11yStats.full++;
        } else if (accessibleItems.length >= exercise.exerciseLength) {
            a11yStats.limited++;
        } else {
            a11yStats.inaccessible++;
        }
    }

    // eslint-disable-next-line no-console
    console.log(
        [
            `EXERCISE ACCESSIBILITY STATS:`,
            `-----------------------------`,
            `full:         ${a11yStats.full} exercises`,
            `limited:      ${a11yStats.limited} exercises`,
            `inaccessible: ${a11yStats.inaccessible} exercises`,
            `-----------------------------`,
            `total: ${exercises.length} exercises`,
        ].join("\n"),
    );
}

// eslint-disable-next-line no-console
main().catch(console.error);
