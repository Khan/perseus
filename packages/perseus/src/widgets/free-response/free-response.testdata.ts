import type {
    PerseusRenderer,
    FreeResponseWidget,
} from "@khanacademy/perseus-core";

export const question: PerseusRenderer = {
    content: "[[\u2603 free-response 1]]\n",
    images: {},
    widgets: {
        "free-response 1": {
            graded: false,
            version: {major: 0, minor: 0},
            static: false,
            type: "free-response",
            options: {
                question: "test-question",
            },
            alignment: "default",
        } as FreeResponseWidget,
    },
};
