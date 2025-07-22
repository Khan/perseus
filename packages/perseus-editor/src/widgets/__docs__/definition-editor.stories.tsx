import * as React from "react";
import {action} from "storybook/actions";

import DefinitionEditor from "../definition-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Definition/Editor Demo",
    component: DefinitionEditor,
    tags: ["autodocs", "!dev"],
    parameters: {
        componentSubtitle:
            "An editor for adding an interactive definition widget that allow content\
            editors to embed clickable terms with expandable explanations within content.",
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
    },
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <DefinitionEditor onChange={action("onChange")} />;
};
