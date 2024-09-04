import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";

import {question1} from "./plotter.testdata";

import type {PerseusRenderer} from "../../perseus-types";

export default {
    title: "Perseus/Widgets/Plotter",
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

export const Basic = (args: StoryArgs): React.ReactElement => {
    return <Template question={question1} />;
};
