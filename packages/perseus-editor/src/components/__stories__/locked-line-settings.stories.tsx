import * as React from "react";

import LockedLineSettings from "../../widgets/interactive-graph-editor/locked-figures/locked-line-settings";
import {getDefaultFigureForType} from "../../widgets/interactive-graph-editor/locked-figures/util";

import type {Meta, StoryObj} from "@storybook/react-vite";

export default {
    title: "PerseusEditor/Components/Locked Line Settings",
    component: LockedLineSettings,
} as Meta<typeof LockedLineSettings>;

export const Default = (args): React.ReactElement => {
    return <LockedLineSettings {...args} />;
};

const defaultProps = {
    ...getDefaultFigureForType("line"),
    onChangeProps: () => {},
    onMove: () => {},
    onRemove: () => {},
};

type StoryComponentType = StoryObj<typeof LockedLineSettings>;

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

/**
 * If the two points defining the line are the same, the line is invalid
 * as that would give it a length of 0. An error message is displayed
 * in this case.
 */
export const WithInvalidPoints: StoryComponentType = {
    render: function Render() {
        const [props, setProps] = React.useState(defaultProps);

        const handlePropsUpdate = (newProps) => {
            setProps({
                ...props,
                ...newProps,
            });
        };

        return (
            <LockedLineSettings
                {...props}
                points={[
                    getDefaultFigureForType("point"),
                    getDefaultFigureForType("point"),
                ]}
                expanded={true}
                onChangeProps={handlePropsUpdate}
            />
        );
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
            ...defaultProps,
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
