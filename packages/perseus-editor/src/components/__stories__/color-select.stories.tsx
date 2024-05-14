import * as React from "react";

import ColorSelect from "../color-select";
import {getDefaultFigureForType} from "../util";

import type {LockedFigureColor} from "@khanacademy/perseus";
import type {Meta} from "@storybook/react";

export default {
    title: "PerseusEditor/Components/Color Select",
    component: ColorSelect,
} as Meta<typeof ColorSelect>;

export const Default = (args): React.ReactElement => {
    return <ColorSelect {...args} />;
};

const defaultColor = getDefaultFigureForType("point").color;

// Set the default values in the control panel.
Default.args = {
    id: "color-select",
    selectedValue: defaultColor,
    onChange: () => {},
};

export const Controlled = {
    render: function Render() {
        const [selectedValue, setSelectedValue] =
            React.useState<LockedFigureColor>(defaultColor);

        const handleColorChange = (color: LockedFigureColor) => {
            setSelectedValue(color);
        };

        return (
            <ColorSelect
                id="color-select"
                selectedValue={selectedValue}
                onChange={handleColorChange}
            />
        );
    },
};
