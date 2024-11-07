import {action} from "@storybook/addon-actions";
import * as React from "react";

import TextListEditor from "../text-list-editor";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Components/Text List Editor",
    component: TextListEditor,
    args: {
        options: ["Test option 1", "Test option 2", "Test option 3"],
        onChange: action("onChange"),
    },
    argTypes: {
        onChange: {control: {type: null}},
    },
    decorators: [
        (Story) => (
            <div className={"framework-perseus orderer"}>
                <Story />
            </div>
        ),
    ],
};
export default meta;

type Story = StoryObj<typeof TextListEditor>;

export const SimpleListOfOptions: Story = {};
