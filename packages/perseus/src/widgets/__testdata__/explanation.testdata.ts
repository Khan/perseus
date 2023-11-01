import {randomBoolean, randomSentence} from "./randomizers";

import type {PerseusRenderer} from "../../perseus-types";

export const question1: PerseusRenderer = {
    content:
        "Here's the explanation\n[[\u2603 explanation 1]]\nDid you get that?",
    images: {},
    widgets: {
        "explanation 1": {
            graded: true,
            version: {
                major: 0,
                minor: 0,
            },
            // NOTE: The explanation widget doesn't consume this directly,
            // instead, Perseus renders an overlay <div /> over top of the
            // widget that intercepts interactions to it.
            static: false,
            type: "explanation",
            options: {
                hidePrompt: "Hide explanation!",
                widgets: {},
                explanation: "This is an explanation",
                static: false,
                showPrompt: "Explanation",
            },
            alignment: "default",
        },
    },
};

export const question2: PerseusRenderer = {
    content:
        "Here's the explanation\n[[\u2603 explanation 1]]\nDid you get that?",
    images: {},
    widgets: {
        "explanation 1": {
            graded: true,
            version: {
                major: 0,
                minor: 0,
            },
            // Speculative generality... is this used in practice?
            static: true,
            type: "explanation",
            options: {
                hidePrompt: "Hide explanation!",
                widgets: {},
                explanation: "This is an explanation",
                static: true,
                showPrompt: "Explanation",
            },
            alignment: "default",
        },
    },
};

export const randomExplanationGenerator = (): PerseusRenderer => {
    return {
        content: `${randomSentence(
            50,
        )}\n[[\u2603 explanation 1]]\n${randomSentence(50)}`,
        images: {},
        widgets: {
            "explanation 1": {
                graded: randomBoolean(),
                version: {
                    major: 0,
                    minor: 0,
                },
                static: randomBoolean(0.05),
                type: "explanation",
                options: {
                    hidePrompt: `${randomSentence(20)}`,
                    widgets: {},
                    explanation: `${randomSentence(50)}`,
                    static: randomBoolean(0.05),
                    showPrompt: `${randomSentence(7)}`,
                },
                alignment: "default",
            },
        },
    };
};
