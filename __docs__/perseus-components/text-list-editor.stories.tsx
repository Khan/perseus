import * as React from "react";
import {action} from "storybook/actions";

import TextListEditor from "../../packages/perseus/src/components/text-list-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Perseus/Components/Text List Editor",
    component: TextListEditor,
    args: {
        options: ["Test option 1", "Test option 2", "Test option 3"],
        onChange: action("onChange"),
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
