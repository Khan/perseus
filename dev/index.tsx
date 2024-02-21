/* eslint monorepo/no-internal-import: "off", monorepo/no-relative-import: "off", import/no-relative-packages: "off" */
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import * as React from "react";
import {useReducer} from "react";
import {render} from "react-dom";

import {Renderer} from "../packages/perseus/src";
import {setDependencies} from "../packages/perseus/src/dependencies";
import {storybookTestDependencies} from "../testing/test-dependencies";

import {
    flipbookModelReducer,
    selectQuestions,
    setQuestions,
} from "./flipbook-model";

import type {APIOptions, PerseusRenderer} from "../packages/perseus/src";

import "../packages/perseus/src/styles/perseus-renderer.less";

setDependencies(storybookTestDependencies);

render(
    <RenderStateRoot>
        <DevUI />
    </RenderStateRoot>,
    document.getElementById("app-root"),
);

function DevUI() {
    const [state, dispatch] = useReducer(flipbookModelReducer, {
        questions: "",
        requestedIndex: 0,
    });

    const questions = selectQuestions(state);

    return (
        <>
            <textarea
                wrap={"off"}
                rows={5}
                cols={80}
                value={state.questions}
                onChange={(e) => dispatch(setQuestions(e.target.value))}
            />
            {questions.length > 0 && (
                <QuestionRenderer question={questions[0]} />
            )}
        </>
    );
}

type QuestionRendererProps = {
    question: PerseusRenderer;
    apiOptions?: APIOptions;
};

function QuestionRenderer({question, apiOptions = {}}: QuestionRendererProps) {
    return (
        <div
            style={{padding: 28, display: "flex", gap: Spacing.small_12}}
            className="framework-perseus"
        >
            <Renderer
                content={question.content}
                images={question.images}
                widgets={question.widgets}
                problemNum={0}
                apiOptions={apiOptions}
            />
            <Renderer
                content={question.content}
                images={question.images}
                widgets={question.widgets}
                problemNum={0}
                apiOptions={apiOptions}
            />
        </div>
    );
}
