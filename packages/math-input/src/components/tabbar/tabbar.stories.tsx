import * as React from "react";

import Tabbar from "./tabbar";

import type {KeypadPageType} from "../../types";
import type {Meta, StoryObj} from "@storybook/react-vite";

type Story = StoryObj<typeof Tabbar>;

const meta: Meta<typeof Tabbar> = {
    title: "Math Input/Components/Tab Bar",
    tags: ["autodocs", "!dev"],
    parameters: {
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
    },

    component: Tabbar,
};
export default meta;

function StatefulTabbarWrapper(args) {
    const [selectedItem, setSelectedItem] =
        React.useState<KeypadPageType>("Numbers");

    return (
        <Tabbar
            {...args}
            selectedItem={selectedItem}
            onSelectItem={(item) => {
                args.onSelectItem(item);
                setSelectedItem(item);
            }}
        />
    );
}

export const Demo: Story = {
    argTypes: {
        selectedItem: {options: ["Numbers", "Geometry", "Operators"]},
    },
    args: {
        items: ["Numbers", "Geometry", "Operators"],
    },
    parameters: {
        controls: {
            exclude: ["items", "onSelectItem", "selectedItem", "onClickClose"],
        },
    },
    render: (args) => <StatefulTabbarWrapper {...args} />,
};
