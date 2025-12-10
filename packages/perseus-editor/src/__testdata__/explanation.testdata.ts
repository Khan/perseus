import {
    generateExplanationOptions,
    generateExplanationWidget,
    generateTestPerseusRenderer,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";

export const question: PerseusRenderer = generateTestPerseusRenderer({
    content:
        "Here's the explanation\n[[\u2603 explanation 1]]\nDid you get that?",
    widgets: {
        "explanation 1": generateExplanationWidget({
            options: generateExplanationOptions({
                hidePrompt: "Hide explanation!",
                explanation: "This is an explanation",
                showPrompt: "Explanation",
            }),
        }),
    },
});
