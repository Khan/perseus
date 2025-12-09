import {getDefaultFigureForType} from "@khanacademy/perseus-core";
import * as React from "react";

import LockedPointSettings from "../../widgets/interactive-graph-editor/locked-figures/locked-point-settings";

import type {Meta, StoryObj} from "@storybook/react-vite";

export default {
    title: "PerseusEditor/Components/Locked Point Settings",
    component: LockedPointSettings,
} as Meta<typeof LockedPointSettings>;

export const Default = (args): React.ReactElement => {
    return <LockedPointSettings {...args} />;
};

const defaultProps = {
    ...getDefaultFigureForType("point"),
    onChangeProps: () => {},
    onMove: () => {},
    onRemove: () => {},
};

type StoryComponentType = StoryObj<typeof LockedPointSettings>;

// Set the default values in the control panel.
Default.args = defaultProps;

export const Controlled: StoryComponentType = {
    render: function Render() {
        const [props, setProps] = React.useState(defaultProps);

        const handlePropsUpdate = (newProps) => {
            setProps({
                ...props,
                ...newProps,
            });
        };

        return (
            <LockedPointSettings {...props} onChangeProps={handlePropsUpdate} />
        );
    },
};

Controlled.parameters = {
    chromatic: {
        // Disabling because this doesn't test anything visual, just behavior.
        disableSnapshot: true,
    },
};

// Fully expanded view of the locked point settings to allow snapshot testing.
export const Expanded: StoryComponentType = {
    render: function Render() {
        const [expanded, setExpanded] = React.useState(true);
        const [props, setProps] = React.useState(defaultProps);

        const handlePropsUpdate = (newProps) => {
            setProps({
                ...props,
                ...newProps,
            });
        };

        return (
            <LockedPointSettings
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
        const [props, setProps] = React.useState(defaultProps);

        const handlePropsUpdate = (newProps) => {
            setProps({
                ...props,
                ...newProps,
            });
        };

        return (
            <LockedPointSettings
                {...props}
                expanded={expanded}
                onToggle={setExpanded}
                onChangeProps={handlePropsUpdate}
            />
        );
    },
};
