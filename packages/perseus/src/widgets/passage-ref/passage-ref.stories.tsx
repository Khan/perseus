import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {question1, question2} from "./passage-ref.testdata";

import type {PerseusRenderer} from "../../perseus-types";

type Story = {
    title: string;
};

export default {
    title: "Perseus/Widgets/PassageRef",
} as Story;

const Template = (props: {question: PerseusRenderer}): React.ReactElement => (
    <View
        style={{
            paddingLeft: 20,
        }}
    >
        <RendererWithDebugUI question={props.question} />
    </View>
);

export const ShortPassage = (): React.ReactElement => (
    <Template question={question1} />
);

export const LongPassage = (): React.ReactElement => (
    <Template question={question2} />
);
