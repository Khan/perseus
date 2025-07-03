import {
    getDefaultAnswerArea,
    splitPerseusItem,
} from "@khanacademy/perseus-core";

import type {PerseusItem, PerseusRenderer} from "@khanacademy/perseus-core";

function makeRenderer(
    content: PerseusRenderer["content"],
    widgets: PerseusRenderer["widgets"],
): PerseusRenderer {
    return {
        content,
        widgets,
        images: {},
    };
}

function answerlessStringified(question: PerseusRenderer): string {
    const answerful: PerseusItem = {
        question,
        hints: [],
        answerArea: getDefaultAnswerArea(),
    };
    const answerless = splitPerseusItem(answerful);
    return JSON.stringify(answerless);
}

/**
 * We want to be able to reset the question state when we go
 * from one question to another question. However it's kind of tricky:
 * 1. Content could be the same
 * 2. Problem number could be the same
 * 3. We don't want to reset when going from answerless to answerful data
 * So compare the prev props to the next props, but use
 * answerless for both for the comparison
 */
export default function isDifferentQuestion(
    prevProblemNum: number,
    nextProblemNum: number,
    prevContent: PerseusRenderer["content"],
    nextContent: PerseusRenderer["content"],
    prevWidgets: PerseusRenderer["widgets"],
    nextWidgets: PerseusRenderer["widgets"],
): boolean {
    return (
        prevProblemNum !== nextProblemNum ||
        answerlessStringified(makeRenderer(prevContent, prevWidgets)) !==
            answerlessStringified(makeRenderer(nextContent, nextWidgets))
    );
}
