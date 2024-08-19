import {action} from "@storybook/addon-actions";

import {PhetSimEditor} from "../phet-sim-editor";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof PhetSimEditor> = {
    component: PhetSimEditor,
    title: "PerseusEditor/Widgets/PhET Simulation Editor",
};

export default meta;
type Story = StoryObj<typeof PhetSimEditor>;

export const Primary: Story = {
    args: {
        onChange: action("onChange"),
    },
};
