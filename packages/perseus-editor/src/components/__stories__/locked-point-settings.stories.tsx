import * as React from "react";

import LockedPointSettings from "../locked-point-settings";
import {getDefaultFigureForType} from "../util";

import type {Range} from "@khanacademy/perseus";
import type {Meta, StoryObj} from "@storybook/react";

const defaultRange = [
    [-10, 10],
    [-10, 10],
] satisfies [Range, Range];

export default {
    title: "PerseusEditor/Components/Locked Point Settings",
    component: LockedPointSettings,
} as Meta<typeof LockedPointSettings>;

export const Default = (args): React.ReactElement => {
    return <LockedPointSettings {...args} />;
};

type StoryComponentType = StoryObj<typeof LockedPointSettings>;

// Set the default values in the control panel.
Default.args = {
    ...getDefaultFigureForType("point"),
    onChangeProps: () => {},
    onRemove: () => {},
};

export const Controlled: StoryComponentType = {
    render: function Render() {
        const [props, setProps] = React.useState({
            ...getDefaultFigureForType("point"),
            onRemove: () => {},
        });

        const handlePropsUpdate = (newProps) => {
            setProps({
                ...props,
                ...newProps,
            });
        };

        return (
            <LockedPointSettings
                {...props}
                range={defaultRange}
                onChangeProps={handlePropsUpdate}
            />
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
        const [props, setProps] = React.useState({
            ...getDefaultFigureForType("point"),
            onRemove: () => {},
        });

        const handlePropsUpdate = (newProps) => {
            setProps({
                ...props,
                ...newProps,
            });
        };

        return (
            <LockedPointSettings
                {...props}
                range={defaultRange}
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
            ...getDefaultFigureForType("point"),
            onRemove: () => {},
            color: "green" as const,
            filled: false,
        });

        const handlePropsUpdate = (newProps) => {
            setProps({
                ...props,
                ...newProps,
            });
        };

        return (
            <LockedPointSettings
                {...props}
                range={defaultRange}
                expanded={expanded}
                onToggle={setExpanded}
                onChangeProps={handlePropsUpdate}
            />
        );
    },
};
