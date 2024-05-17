import * as React from "react";

import LockedLineSettings from "../locked-line-settings";
import {getDefaultFigureForType} from "../util";

import type {Meta, StoryObj} from "@storybook/react";

export default {
    title: "PerseusEditor/Components/Locked Line Settings",
    component: LockedLineSettings,
} as Meta<typeof LockedLineSettings>;

export const Default = (args): React.ReactElement => {
    return <LockedLineSettings {...args} />;
};

type StoryComponentType = StoryObj<typeof LockedLineSettings>;

// Set the default values in the control panel.
Default.args = {
    ...getDefaultFigureForType("line"),
    onChangeProps: () => {},
    onRemove: () => {},
};

export const Controlled: StoryComponentType = {
    render: function Render() {
        const [props, setProps] = React.useState({
            ...getDefaultFigureForType("line"),
            onRemove: () => {},
        });

        const handlePropsUpdate = (newProps) => {
            setProps({
                ...props,
                ...newProps,
            });
        };

        return (
            <LockedLineSettings {...props} onChangeProps={handlePropsUpdate} />
        );
    },
};

Controlled.parameters = {
    chromatic: {
        // Disabling because this is testing behavior, not visuals.
        disableSnapshot: true,
    },
};

// Fully expanded view of the locked point settings to allow snapshot testing.
export const Expanded: StoryComponentType = {
    render: function Render() {
        const [expanded, setExpanded] = React.useState(true);
        const [props, setProps] = React.useState({
            ...getDefaultFigureForType("line"),
            onRemove: () => {},
        });

        const handlePropsUpdate = (newProps) => {
            setProps({
                ...props,
                ...newProps,
            });
        };

        return (
            <LockedLineSettings
                {...props}
                expanded={expanded}
                onToggle={setExpanded}
                onChangeProps={handlePropsUpdate}
            />
        );
    },
};

// Fully expanded view of the locked point settings to allow snapshot testing.
export const ExpandedNondefaultProps: StoryComponentType = {
    render: function Render() {
        const [expanded, setExpanded] = React.useState(true);
        const [props, setProps] = React.useState({
            ...getDefaultFigureForType("line"),
            onRemove: () => {},
            kind: "segment" as const,
            color: "green" as const,
            lineStyle: "dashed" as const,
        });

        const handlePropsUpdate = (newProps) => {
            setProps({
                ...props,
                ...newProps,
            });
        };

        return (
            <LockedLineSettings
                {...props}
                expanded={expanded}
                onToggle={setExpanded}
                onChangeProps={handlePropsUpdate}
            />
        );
    },
};
