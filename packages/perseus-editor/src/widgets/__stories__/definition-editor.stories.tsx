import {action} from "@storybook/addon-actions";
import * as React from "react";

import DefinitionEditor from "../definition-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Editor/Widgets/Definition Editor",
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <DefinitionEditor onChange={action("onChange")} />;
};
