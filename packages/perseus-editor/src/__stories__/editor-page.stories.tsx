import * as React from "react";

import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import EditorPageWithStorybookPreview from "./editor-page-with-storybook-preview";

import type {InputNumberWidget, PerseusRenderer} from "@khanacademy/perseus";

registerAllWidgetsAndEditorsForTesting(); // SIDE_EFFECTY!!!! :cry:

export default {
    title: "PerseusEditor/EditorPage",
};

const question1: PerseusRenderer = {
    content:
        "Denis baked a peach pie and cut it into $3$ equal-sized pieces.  Denis's dad eats $1$ section of the pie.  \n\n**What fraction of the pie did Denis's dad eat?**  \n![](https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png)    \n[[\u2603 input-number 1]]  \n\n\n\n",
    images: {
        "https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png":
            {
                width: 200,
                height: 200,
            },
    },
    widgets: {
        "input-number 1": {
            version: {
                major: 0,
                minor: 0,
            },
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
        } as InputNumberWidget,
    },
};

export const Demo = (): React.ReactElement => {
    return <EditorPageWithStorybookPreview />;
};

// Used to test that Input Numbers are being automatically converted to Numeric Inputs
export const InputNumberDemo = (): React.ReactElement => {
    return <EditorPageWithStorybookPreview question={question1} />;
};
