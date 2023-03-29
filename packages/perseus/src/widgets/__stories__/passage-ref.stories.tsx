import * as React from "react";

import {RendererWithDebugUI} from '../../../../../testing/renderer-with-debug-ui';
import {question1, question2} from '../__testdata__/passage-ref_testdata';

type StoryArgs = Record<any, any>;

type Story = {
    title: string
};

export default {
    title: "Perseus/Widgets/PassageRef",
} as Story;

export const ShortPassage: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <RendererWithDebugUI question={question1} />;
};

export const LongPassage: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <RendererWithDebugUI question={question2} />;
};
