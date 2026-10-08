import {
    PerseusQuestion,
    PerseusQuestionFeedback,
    usePerseusQuestion,
} from "@khanacademy/perseus";
import {scorePerseusItem} from "@khanacademy/perseus-score";
import Button from "@khanacademy/wonder-blocks-button";
import * as React from "react";

import type {PerseusItem} from "@khanacademy/perseus-core";

// Scores in the browser. Quick to set up, but the answers are in the
// browser too, so don't use this where scores need to be trusted.
export function LocalQuestion({item}: {item: PerseusItem}) {
    const question = usePerseusQuestion({
        item,
        onCheck: (userInput) => ({
            score: scorePerseusItem(item.question, userInput, "en"),
        }),
    });

    return (
        <>
            <PerseusQuestion question={question} />
            {/* Your UI: put the button and feedback where your design wants. */}
            <Button
                onClick={() => void question.check()}
                // The spinner hides the label, so keep the name explicit.
                aria-label="Check"
                spinner={question.isChecking}
                // aria-disabled under the hood, so focus isn't lost.
                disabled={question.isFinished}
            >
                Check
            </Button>
            <PerseusQuestionFeedback question={question} />
        </>
    );
}

// To own the feedback yourself (e.g. a tutor replies instead), leave out
// <PerseusQuestionFeedback> and act on the score in onCheck:
//
//     const question = usePerseusQuestion({
//         item,
//         onCheck: (userInput) => {
//             const score = scorePerseusItem(item.question, userInput, "en");
//             yourTutor.respondTo(score);
//             return {score};
//         },
//     });
//
// `question.status` still tells you about empty input or a failed check.
