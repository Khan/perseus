import type {PerseusRenderer} from "@khanacademy/perseus-core";

interface Options {
    allowUnlimitedCharacters?: boolean;
    characterLimit?: number;
}

export function getFreeResponseItemData(options?: Options): PerseusRenderer {
    return {
        content: "[[\u2603 free-response 1]]\n",
        images: {},
        widgets: {
            "free-response 1": {
                graded: false,
                version: {major: 0, minor: 0},
                static: false,
                type: "free-response",
                options: {
                    allowUnlimitedCharacters:
                        options?.allowUnlimitedCharacters ?? false,
                    characterLimit: options?.characterLimit ?? 500,
                    placeholder: "test-placeholder",
                    question: "test-question",
                    scoringCriteria: [
                        {
                            text: "test-criterion",
                        },
                    ],
                },
                alignment: "default",
            },
        },
    };
}
