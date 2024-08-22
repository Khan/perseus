import * as React from "react";

import LockedLabelSettings from "../graph-locked-figures/locked-label-settings";
import {getDefaultFigureForType} from "../util";

import type {Meta, StoryObj} from "@storybook/react";

export default {
    title: "PerseusEditor/Components/Locked Label Settings",
    component: LockedLabelSettings,
} as Meta<typeof LockedLabelSettings>;

export const Default = (args): React.ReactElement => {
    return <LockedLabelSettings {...args} />;
};

const defaultProps = {
    ...getDefaultFigureForType("label"),
    onChangeProps: () => {},
    onMove: () => {},
    onRemove: () => {},
};

type StoryComponentType = StoryObj<typeof LockedLabelSettings>;

// Set the default values in the control panel.
Default.args = defaultProps;

export const Expanded: StoryComponentType = {
    render: function Render() {
        const [props, setProps] = React.useState(defaultProps);

        const handlePropsUpdate = (newProps) => {
            setProps({
                ...props,
                ...newProps,
            });
        };

        return (
            <LockedLabelSettings
                {...props}
                expanded={true}
                onChangeProps={handlePropsUpdate}
            />
        );
    },
};
