import * as React from "react";

import ColorSelect from "../color-select";

import type {Meta} from "@storybook/react";

export default {
    title: "Perseus Editor/Components/Color Select",
    component: ColorSelect,
} as Meta<typeof ColorSelect>;

export const Default = (args): React.ReactElement => {
    return <ColorSelect {...args} />;
};

// Set the default values in the control panel.
Default.args = {
    id: "color-select",
    selectedValue: "blue",
    onChange: () => {},
};

export const Controlled = {
    render: function Render() {
        const [selectedValue, setSelectedValue] = React.useState("blue");

        return (
            <ColorSelect
                id="color-select"
                selectedValue={selectedValue}
                onChange={setSelectedValue}
            />
        );
    },
};
