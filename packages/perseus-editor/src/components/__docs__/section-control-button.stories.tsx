import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";

import SectionControlButton from "../section-control-button";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof SectionControlButton> = {
    title: "Editors/Components/Section Control Button",
    component: SectionControlButton,
};

export default meta;

type Story = StoryObj<typeof SectionControlButton>;

export const Example: Story = {
    args: {
        icon: trashIcon,
        disabled: false,
        onClick: () => {},
        title: "Remove image widget",
    },
};
