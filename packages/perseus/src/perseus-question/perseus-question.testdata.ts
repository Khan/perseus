import {
    generateNumericInputAnswer,
    generateNumericInputOptions,
    generateNumericInputWidget,
    generateRadioChoice,
    generateRadioOptions,
    generateRadioWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import type {PerseusItem} from "@khanacademy/perseus-core";

export const generateNumericInputItem = ({
    prompt,
    answer,
}: {
    prompt: string;
    answer: number;
}): PerseusItem =>
    generateTestPerseusItem({
        question: generateTestPerseusRenderer({
            content: `${prompt}\n\n[[☃ numeric-input 1]]`,
            widgets: {
                "numeric-input 1": generateNumericInputWidget({
                    options: generateNumericInputOptions({
                        labelText: "Your answer",
                        answers: [
                            generateNumericInputAnswer({
                                value: answer,
                                status: "correct",
                            }),
                        ],
                    }),
                }),
            },
        }),
    });

export const generateRadioItem = ({
    prompt,
    choices,
}: {
    prompt: string;
    choices: ReadonlyArray<{
        content: string;
        correct?: boolean;
        rationale?: string;
    }>;
}): PerseusItem =>
    generateTestPerseusItem({
        question: generateTestPerseusRenderer({
            content: `${prompt}\n\n[[☃ radio 1]]`,
            widgets: {
                "radio 1": generateRadioWidget({
                    options: generateRadioOptions({
                        choices: choices.map(({content, ...rest}) =>
                            generateRadioChoice(content, rest),
                        ),
                    }),
                }),
            },
        }),
    });
