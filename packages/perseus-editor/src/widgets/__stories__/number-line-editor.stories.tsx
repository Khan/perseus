import {action} from "@storybook/addon-actions";
import * as React from "react";

import NumberLineEditor from "../number-line-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Editor/Widgets/Number Line Editor",
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <NumberLineEditor onChange={action("onChange")} />;
};
