import * as React from "react";
import {action} from "storybook/actions";

import DropdownEditor from "../dropdown-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Dropdown/Editor Demo",
    tags: ["!autodocs"],
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return (
        <div className="framework-perseus">
            <DropdownEditor onChange={action("onChange")} />
        </div>
    );
};
