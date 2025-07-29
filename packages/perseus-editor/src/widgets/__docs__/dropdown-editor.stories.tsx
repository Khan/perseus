import * as React from "react";
import {action} from "storybook/actions";

import DropdownEditor from "../dropdown-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Dropdown/Editor Demo",
    component: DropdownEditor,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "An editor for adding a dropdown widget that allow users to select an\
                    option from a predefined list.",
            },
        },
    },
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return (
        <div className="framework-perseus">
            <DropdownEditor onChange={action("onChange")} />
        </div>
    );
};
