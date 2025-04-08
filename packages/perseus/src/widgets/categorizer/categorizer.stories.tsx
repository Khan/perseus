import * as React from "react";

import {generateTestPerseusItem} from "@khanacademy/perseus";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";

import {question1} from "./categorizer.testdata";

export default {
    title: "Perseus/Widgets/Categorizer",
};

type StoryArgs = Record<any, any>;

export const Question1 = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question1} />;
};

export const AnswerlessCategorizer = (args: StoryArgs): React.ReactElement => {
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({
                question: question1,
            })}
            startAnswerless={true}
        />
    );
};
