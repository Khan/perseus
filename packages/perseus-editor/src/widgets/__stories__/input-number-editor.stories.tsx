import * as React from "react";
import {action} from "storybook/actions";

import InputNumberEditor from "../input-number-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "PerseusEditor/Widgets/InputNumber Editor",
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <InputNumberEditor onChange={action("onChange")} />;
};
