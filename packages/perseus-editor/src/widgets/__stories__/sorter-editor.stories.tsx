import {action} from "@storybook/addon-actions";
import * as React from "react";

import SorterEditor from "../sorter-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "PerseusEditor/Widgets/Sorter Editor",
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <SorterEditor onChange={action("onChange")} />;
};
