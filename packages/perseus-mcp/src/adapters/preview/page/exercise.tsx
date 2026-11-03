// An item as learners see it in an exercise: the question, a "Check answer"
// button, and its hints revealed one at a time.
import {
    ApiOptions,
    HintRenderer,
    ServerItemRenderer,
    usePerseusI18n,
} from "@khanacademy/perseus";
import {mapErrorToString} from "@khanacademy/perseus/strings";
import {linterContextDefault} from "@khanacademy/perseus-linter";
import * as React from "react";

import {scoreItem} from "../../../domain/items/score";

import {dependenciesV2} from "./perseus-environment";

import type {ItemScore} from "../../../domain/items/score";
import type {ServerItemRendererComponent} from "@khanacademy/perseus";
import type {PerseusStrings} from "@khanacademy/perseus/strings";
import type {Hint} from "@khanacademy/perseus-core";
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

/**
 * The positions of the hints on screen when the first `hintsVisible` are
 * revealed: as in Perseus, a hint with `replace` takes the place of the one
 * before it.
 */
function shownHintPositions(
    hints: ReadonlyArray<Hint>,
    hintsVisible: number,
): number[] {
    const shown: number[] = [];
    hints.slice(0, hintsVisible).forEach((hint, pos) => {
        if (hint.replace && shown.length > 0) {
            shown[shown.length - 1] = pos;
        } else {
            shown.push(pos);
        }
    });
    return shown;
}

/**
 * The revealed hints, in their own section below the question, each under
 * its number. ServerItemRenderer would put them straight after the question,
 * with nothing between.
 */
function Hints({
    hints,
    hintsVisible,
    apiOptions,
}: {
    hints: ReadonlyArray<Hint>;
    hintsVisible: number;
    apiOptions: ExerciseData["apiOptions"];
}) {
    const {strings} = usePerseusI18n();
    const headingId = React.useId();
    const shown = shownHintPositions(hints, hintsVisible);
    if (shown.length === 0) {
        return null;
    }
    const hintApiOptions = {...ApiOptions.defaults, ...apiOptions};
    return (
        <section
            aria-labelledby={headingId}
            style={{
                marginBlockStart: "3.2rem",
                paddingBlockStart: "1.6rem",
                borderBlockStart:
                    "1px solid var(--wb-semanticColor-core-border-neutral-default)",
            }}
        >
            <h2 id={headingId}>{strings.hints}</h2>
            {shown.map((pos) => (
                <React.Fragment key={pos}>
                    <h3>{strings.hintPos({pos: pos + 1})}</h3>
                    <HintRenderer
                        hint={hints[pos]}
                        pos={pos}
                        totalHints={hints.length}
                        // Perseus emphasizes the last hint unless the author
                        // already bolded part of it.
                        lastHint={
                            pos === hints.length - 1 &&
                            !/\*\*/.test(hints[pos].content)
                        }
                        lastRendered={pos === hintsVisible - 1}
                        apiOptions={hintApiOptions}
                        linterContext={linterContextDefault}
                        dependencies={dependenciesV2}
                    />
                </React.Fragment>
            ))}
        </section>
    );
}

export function Exercise({data}: {data: ExerciseData}) {
    const {item, apiOptions} = data;
    const {strings} = usePerseusI18n();
    const rendererRef = React.useRef<ServerItemRendererComponent>(null);
    const [hintsVisible, setHintsVisible] = React.useState(0);
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

    return (
        <>
            {/* The hints are rendered below, by Hints. */}
            <ServerItemRenderer
                ref={rendererRef}
                item={item}
                apiOptions={apiOptions}
                dependencies={dependenciesV2}
                problemNum={0}
                hintsVisible={0}
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
                    <button type="button" onClick={() => setHintsVisible(0)}>
                        Hide hints
                    </button>
                )}
            </p>
            {/* An <output> is announced when its text changes, so a
                screen reader hears the result of each check. */}
            <p>
                <output>{result}</output>
            </p>
            <Hints
                hints={item.hints}
                hintsVisible={shownHints}
                apiOptions={apiOptions}
            />
        </>
    );
}
