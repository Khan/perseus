import {ApiOptions} from "@khanacademy/perseus";
import * as React from "react";
import {useRef, useState} from "react";

import ArticleEditor from "../article-editor";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import type {PerseusRenderer} from "@khanacademy/perseus";

registerAllWidgetsAndEditorsForTesting();

export default {
    title: "PerseusEditor/ArticleEditor",
};
const articleSectionWithInputNumber: PerseusRenderer = {
    content:
        "### Practice Problem\n\n$8\\cdot(11i+2)=$ [[☃ input-number 1]]. Also [[☃ input-number 2]]  \n*.*",
    images: {},
    widgets: {
        "input-number 1": {
            type: "input-number",
            graded: true,
            alignment: "default",
            options: {
                maxError: 0.1,
                inexact: false,
                value: 0.4,
                simplify: "optional",
                answerType: "rational",
                size: "normal",
            },
            version: {major: 1, minor: 0},
        },
        "input-number 2": {
            type: "input-number",
            graded: true,
            alignment: "default",
            options: {
                maxError: 0.1,
                inexact: false,
                value: 0.5,
                simplify: "optional",
                answerType: "rational",
                size: "normal",
            },
            version: {major: 1, minor: 0},
        },
    },
};
export const Base = (): React.ReactElement => {
    const [state, setState] = useState(articleSectionWithInputNumber);
    const articleEditorRef = useRef();

    function handleChange(value) {
        setState(value.json);
    }

    function serialize() {
        // eslint-disable-next-line no-console
        console.log((articleEditorRef.current as any).serialize());
    }

    return (
        <>
            <button onClick={serialize}>Serialize</button>
            <hr />
            <ArticleEditor
                apiOptions={ApiOptions.defaults}
                imageUploader={() => {}}
                json={state}
                onChange={handleChange}
                previewURL="/perseus/frame"
                ref={articleEditorRef as any}
            />
        </>
    );
};
