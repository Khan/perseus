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
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "An editor for adding an interactive definition widget that allow content\
                    editors to embed clickable terms with expandable explanations within content.",
            },
        },
    },
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <DefinitionEditor onChange={action("onChange")} />;
};
