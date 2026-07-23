import {
    generateTestPerseusRenderer,
    measurerLogic,
} from "@khanacademy/perseus-core";

import type {
    PerseusMeasurerWidgetOptions,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

export const measurerQuestion = (
    options: Partial<PerseusMeasurerWidgetOptions> = {},
): PerseusRenderer =>
    generateTestPerseusRenderer({
        content: "[[☃ measurer 1]]\n\n",
        widgets: {
            "measurer 1": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "measurer",
                options: {
                    ...measurerLogic.defaultWidgetOptions,
                    ...options,
                },
                alignment: "default",
            },
        },
    });
