import * as React from "react";
import {action} from "storybook/actions";

import TextListEditor from "../text-list-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Editors/Components/Text List Editor",
    component: TextListEditor,
    args: {
        options: ["Test option 1", "Test option 2", "Test option 3"],
        onChange: action("onChange"),
    },
    decorators: [
        (Story) => (
            // TODO(LEMS-4492): remove wb-themed-math
            <div className={"framework-perseus wb-themed-math orderer"}>
                <Story />
            </div>
        ),
    ],
};
export default meta;

type Story = StoryObj<typeof TextListEditor>;

export const SimpleListOfOptions: Story = {};
