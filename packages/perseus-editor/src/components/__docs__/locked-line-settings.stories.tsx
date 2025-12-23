import {getDefaultFigureForType} from "@khanacademy/perseus-core";
import * as React from "react";

import LockedLineSettings from "../../widgets/interactive-graph-editor/locked-figures/locked-line-settings";

import type {Meta, StoryFn, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof LockedLineSettings> = {
    title: "Editors/Components/Locked Line Settings",
    component: LockedLineSettings,
};

export default meta;

const defaultProps = {
    ...getDefaultFigureForType("line"),
    onChangeProps: () => {},
    onMove: () => {},
    onRemove: () => {},
};

type Story = StoryFn<typeof LockedLineSettings>;

export const Default: StoryObj<typeof LockedLineSettings> = {
    args: defaultProps,
};

export const Controlled: Story = () => {
    const [props, setProps] = React.useState(defaultProps);

    const handlePropsUpdate = (newProps) => {
        setProps({
            ...props,
            ...newProps,
        });
    };

    return <LockedLineSettings {...props} onChangeProps={handlePropsUpdate} />;
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
export const WithInvalidPoints: Story = () => {
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
};

// Fully expanded view of the locked line settings to allow snapshot testing.
export const Expanded: Story = () => {
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
};

// Fully expanded view of the locked line settings to allow snapshot testing.
export const ExpandedNondefaultProps: Story = () => {
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
};
