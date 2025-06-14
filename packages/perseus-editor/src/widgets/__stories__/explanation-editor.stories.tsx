import * as React from "react";
import {action} from "storybook/actions";

import ExplanationEditor from "../explanation-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "PerseusEditor/Widgets/Explanation Editor",
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <ExplanationEditor onChange={action("onChange")} />;
};
