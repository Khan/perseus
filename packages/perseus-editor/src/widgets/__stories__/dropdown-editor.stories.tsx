import {action} from "@storybook/addon-actions";
import * as React from "react";

import DropdownEditor from "../dropdown-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "PerseusEditor/Widgets/Dropdown Editor",
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <DropdownEditor onChange={action("onChange")} />;
};
