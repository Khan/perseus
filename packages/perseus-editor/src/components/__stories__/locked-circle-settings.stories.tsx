import * as React from "react";

import LockedCircleSettings from "../locked-circle-settings";
import {getDefaultFigureForType} from "../util";

import type {Meta, StoryObj} from "@storybook/react";

export default {
    title: "PerseusEditor/Components/Locked Circle Settings",
    component: LockedCircleSettings,
} as Meta<typeof LockedCircleSettings>;

export const Default = (args): React.ReactElement => {
    return <LockedCircleSettings {...args} />;
};

type StoryComponentType = StoryObj<typeof LockedCircleSettings>;

// Set the default values in the control panel.
Default.args = {
    ...getDefaultFigureForType("circle"),
    onChangeProps: () => {},
    onRemove: () => {},
};

export const Controlled: StoryComponentType = {
    render: function Render() {
        const [props, setProps] = React.useState({
            ...getDefaultFigureForType("circle"),
            onRemove: () => {},
        });

        const handlePropsUpdate = (newProps) => {
            setProps({
                ...props,
                ...newProps,
            });
        };

        return (
            <LockedCircleSettings
                {...props}
                onChangeProps={handlePropsUpdate}
            />
        );
    },
};

Controlled.parameters = {
    chromatic: {
        // Disabling because this is testing behavior, not visuals.
        disableSnapshot: true,
    },
};

// Fully expanded view of the locked circle settings to allow snapshot testing.
export const Expanded: StoryComponentType = {
    render: function Render() {
        const [expanded, setExpanded] = React.useState(true);
        const [props, setProps] = React.useState({
            ...getDefaultFigureForType("circle"),
            onRemove: () => {},
        });

        const handlePropsUpdate = (newProps) => {
            setProps({
                ...props,
                ...newProps,
            });
        };

        return (
            <LockedCircleSettings
                {...props}
                expanded={expanded}
                onToggle={setExpanded}
                onChangeProps={handlePropsUpdate}
            />
        );
    },
};
