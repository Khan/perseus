import * as React from "react";
import {action} from "storybook/actions";

import SorterEditor from "../sorter-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Sorter/Editor Demo",
    tags: ["!autodocs"],
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <SorterEditor onChange={action("onChange")} />;
};
