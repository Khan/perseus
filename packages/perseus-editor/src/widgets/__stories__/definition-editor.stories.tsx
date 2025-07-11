import * as React from "react";
import {action} from "storybook/actions";

import DefinitionEditor from "../definition-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "PerseusEditor/Widgets/Definition Editor",
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <DefinitionEditor onChange={action("onChange")} />;
};
