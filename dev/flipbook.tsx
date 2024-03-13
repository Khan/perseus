/* eslint monorepo/no-internal-import: "off", monorepo/no-relative-import: "off", import/no-relative-packages: "off" */
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import * as React from "react";
import {useReducer, useRef} from "react";

import {Renderer} from "../packages/perseus/src";
import {isCorrect} from "../packages/perseus/src/util";

import {
    flipbookModelReducer,
    next,
    previous,
    selectCurrentQuestion,
    setQuestions,
} from "./flipbook-model";

import type {
    APIOptions,
    PerseusRenderer,
    PerseusScore,
} from "../packages/perseus/src";

import "../packages/perseus/src/styles/perseus-renderer.less";

const exampleCommands = `
# copy all questions
cat data/questions/*/*/* | pbcopy

# copy all segment questions
grep -rl '"type":"segment"' data/questions/ | xargs cat | pbcopy
`.trim();

export function Flipbook() {
    const [state, dispatch] = useReducer(flipbookModelReducer, {
        questions: "",
        requestedIndex: 0,
    });

    const question = selectCurrentQuestion(state);

    return (
        <View style={{padding: Spacing.medium_16}}>
            <details open>
                <summary>Instructions (click to show/hide)</summary>
                <ol>
                    <li>
                        <p>
                            Run a command like one of the following to copy
                            question data to your clipboard.
                        </p>
                        <code>
                            <pre>{exampleCommands}</pre>
                        </code>
                    </li>
                    <li>
                        <p>Paste the data in the box below.</p>
                    </li>
                </ol>
            </details>

            <textarea
                wrap={"off"}
                rows={10}
                style={{width: "100%"}}
                value={state.questions}
                onChange={(e) => dispatch(setQuestions(e.target.value))}
            />
            <Strut size={Spacing.small_12} />
            <View style={{flexDirection: "row"}}>
                <Button kind="secondary" onClick={() => dispatch(previous)}>
                    Previous
                </Button>
                <Strut size={Spacing.xxSmall_6} />
                <Button kind="secondary" onClick={() => dispatch(next)}>
                    Next
                </Button>
            </View>
            {question != null && (
                <SideBySideQuestionRenderer question={question} />
            )}
        </View>
    );
}

type QuestionRendererProps = {
    question: PerseusRenderer;
    apiOptions?: APIOptions;
};

function SideBySideQuestionRenderer({
    question,
    apiOptions = {},
}: QuestionRendererProps) {
    return (
        <View
            className="framework-perseus"
            style={{
                flexDirection: "row",
                padding: Spacing.xLarge_32,
                gap: Spacing.small_12,
            }}
        >
            <GradableRenderer
                question={question}
                apiOptions={{...apiOptions, flags: {mafs: false}}}
            />
            <GradableRenderer
                question={question}
                apiOptions={{...apiOptions, flags: {mafs: {segment: true}}}}
            />
        </View>
    );
}

function GradableRenderer(props: QuestionRendererProps) {
    const {question, apiOptions} = props;
    const rendererRef = useRef<Renderer>(null);

    function describeScore(score: PerseusScore): string {
        switch (score.type) {
            case "invalid":
                return "You didn't answer the question.";
            case "points":
                return isCorrect(score) ? "Correct!" : "Incorrect.";
        }
    }

    return (
        <View style={{alignItems: "flex-start"}}>
            <Renderer
                ref={rendererRef}
                content={question.content}
                images={question.images}
                widgets={question.widgets}
                problemNum={0}
                apiOptions={{...apiOptions}}
            />
            <Button
                onClick={() =>
                    rendererRef.current &&
                    // eslint-disable-next-line no-alert
                    alert(describeScore(rendererRef.current.score()))
                }
            >
                Check answer
            </Button>
        </View>
    );
}
