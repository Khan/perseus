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
            "An editor for creating interactive definition widgets that allow users to embed clickable terms with expandable explanations within content.",
        docs: {
            disable: false, // This specific story will be shown in autodocs as the default story
        },
    },
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <DefinitionEditor onChange={action("onChange")} />;
};
