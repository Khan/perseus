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
    tags: ["autodocs", "!dev"],
    parameters: {
        componentSubtitle:
            "An editor for adding a sorter widget that allows users to arrange items in a specific order.",
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
    },
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <SorterEditor onChange={action("onChange")} />;
};
