import {
    getDefaultAnswerArea,
    type PerseusItem,
} from "@khanacademy/perseus-core";

export const mockedAssetItem: PerseusItem = {
    question: {
        content: "[[\u2603 mock-asset-loading-widget 1]]",
        images: Object.freeze({}),
        widgets: {
            // @ts-expect-error - TS2353 - Object literal may only specify known properties, and '"mock-asset-loading-widget 1"' does not exist in type 'PerseusWidgetsMap'.
            "mock-asset-loading-widget 1": {
                type: "mock-asset-loading-widget",
                alignment: "default",
                static: false,
                graded: true,
                options: Object.freeze({value: ""}),
            },
        },
    },
    answerArea: getDefaultAnswerArea(),
    hints: [],
} as const;
