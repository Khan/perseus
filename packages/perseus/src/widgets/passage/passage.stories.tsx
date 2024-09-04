import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {
    question1,
    question2,
    question3,
} from "./__tests__/passage.testdata";

import type {PerseusRenderer} from "../../perseus-types";

export default {
    title: "Perseus/Widgets/Passage",
};

type StoryArgs = Record<any, any>;

const Template = (props: {question: PerseusRenderer}): React.ReactElement => (
    <View
        style={{
            paddingLeft: 20,
        }}
    >
        <RendererWithDebugUI question={props.question} />
    </View>
);

export const SimpleQuestion = (args: StoryArgs): React.ReactElement => {
    return <Template question={question1} />;
};

export const MultiPassageQuestion = (args: StoryArgs): React.ReactElement => {
    return <Template question={question2} />;
};

export const SingleNumberedPassage = (args: StoryArgs): React.ReactElement => {
    return <Template question={question3} />;
};
