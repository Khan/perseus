import {
    PerseusQuestion,
    PerseusQuestionFeedback,
    usePerseusQuestion,
} from "@khanacademy/perseus";
import Button from "@khanacademy/wonder-blocks-button";
import * as React from "react";

import type {PerseusQuestionResult} from "@khanacademy/perseus";
import type {PerseusItem} from "@khanacademy/perseus-core";

// `answerlessItem` is what your server sent (see tier-2-server.ts).
export function ServerQuestion({
    answerlessItem,
}: {
    answerlessItem: PerseusItem;
}) {
    const question = usePerseusQuestion({
        item: answerlessItem,
        onCheck: async (userInput): Promise<PerseusQuestionResult> => {
            const res = await fetch("/api/check", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(userInput),
            });
            // Throwing shows a "couldn't check your answer" message, and the
            // learner can press Check again.
            if (!res.ok) {
                throw new Error(`Check failed with status ${res.status}`);
            }
            return res.json();
        },
    });

    // Only onCheck differs from the browser version: the same UI works
    // whether scoring runs in the browser, on your server or on KA's.
    return (
        <>
            <PerseusQuestion question={question} />
            <Button
                onClick={() => void question.check()}
                aria-label="Check"
                spinner={question.isChecking}
                disabled={question.isFinished}
            >
                Check
            </Button>
            <PerseusQuestionFeedback question={question} />
        </>
    );
}
