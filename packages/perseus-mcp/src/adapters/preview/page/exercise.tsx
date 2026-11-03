// An item as learners see it in an exercise: the question, a "Check answer"
// button, and its hints revealed one at a time.
import {ServerItemRenderer, usePerseusI18n} from "@khanacademy/perseus";
import {mapErrorToString} from "@khanacademy/perseus/strings";
import * as React from "react";

import {scoreItem} from "../../../domain/items/score";

import {dependenciesV2} from "./perseus-environment";

import type {ItemScore} from "../../../domain/items/score";
import type {ServerItemRendererComponent} from "@khanacademy/perseus";
import type {PerseusStrings} from "@khanacademy/perseus/strings";
import type {PreviewContent} from "@khanacademy/perseus-editor";

type ExerciseData = Extract<PreviewContent, {type: "exercise"}>["data"];

function describeScore(
    {outcome, score}: ItemScore,
    strings: PerseusStrings,
): string {
    // Perseus's messages are error codes, shown to learners as these strings.
    const text = mapErrorToString(score.message, strings);
    const message = text == null ? "" : ` ${text}`;
    switch (outcome) {
        case "correct":
            return `Correct.${message}`;
        case "incorrect":
            return `Incorrect.${message}`;
        case "invalid":
            return `Not scored: Perseus would ask the learner to finish their answer.${message}`;
    }
}

export function Exercise({data}: {data: ExerciseData}) {
    const {item, apiOptions} = data;
    const {strings} = usePerseusI18n();
    const rendererRef = React.useRef<ServerItemRendererComponent>(null);
    const [hintsVisible, setHintsVisible] = React.useState(0);
    // Perseus's hints can't be hidden once shown, so hiding them remounts
    // the item (which also clears the answer).
    const [mount, setMount] = React.useState(0);
    const [result, setResult] = React.useState<string | null>(null);

    // A new revision of the draft may change the answer, so an old result no
    // longer applies.
    React.useEffect(() => setResult(null), [item]);

    const hintCount = item.hints.length;
    // A revision may have fewer hints than are showing.
    const shownHints = Math.min(hintsVisible, hintCount);

    function checkAnswer() {
        const renderer = rendererRef.current;
        if (renderer == null) {
            return;
        }
        const scored = scoreItem(item, renderer.getUserInput(), "en");
        setResult(
            scored.ok
                ? describeScore(scored.score, strings)
                : scored.issues.map((issue) => issue.message).join(" "),
        );
    }

    function hideHints() {
        setHintsVisible(0);
        setMount((n) => n + 1);
        setResult(null);
    }

    return (
        <>
            <ServerItemRenderer
                key={mount}
                ref={rendererRef}
                item={item}
                apiOptions={apiOptions}
                dependencies={dependenciesV2}
                problemNum={0}
                hintsVisible={shownHints}
            />
            <p style={{display: "flex", gap: "0.8rem"}}>
                <button type="button" onClick={checkAnswer}>
                    Check answer
                </button>
                {shownHints < hintCount && (
                    <button
                        type="button"
                        onClick={() => setHintsVisible(shownHints + 1)}
                    >
                        {`Show hint ${shownHints + 1} of ${hintCount}`}
                    </button>
                )}
                {shownHints > 0 && (
                    <button type="button" onClick={hideHints}>
                        Hide hints
                    </button>
                )}
            </p>
            {/* An <output> is announced when its text changes, so a
                screen reader hears the result of each check. */}
            <p>
                <output>{result}</output>
            </p>
        </>
    );
}
