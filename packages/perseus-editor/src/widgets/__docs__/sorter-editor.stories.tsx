import * as React from "react";
import {action} from "storybook/actions";

import SorterEditor from "../sorter-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Sorter/Editor Demo",
    component: SorterEditor,
    tags: ["!dev"],
    parameters: {
        componentSubtitle:
            "An editor for adding a sorter widget that allows users to arrange items in a specific order.",
    },
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <SorterEditor onChange={action("onChange")} />;
};
