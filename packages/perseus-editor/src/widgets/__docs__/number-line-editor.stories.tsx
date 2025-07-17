import * as React from "react";
import {action} from "storybook/actions";

import NumberLineEditor from "../number-line-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Number Line/Editor Demo",
    tags: ["!autodocs"],
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <NumberLineEditor onChange={action("onChange")} />;
};
