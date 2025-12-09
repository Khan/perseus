import {getDefaultFigureForType} from "@khanacademy/perseus-core";
import * as React from "react";

import LockedEllipseSettings from "../../widgets/interactive-graph-editor/locked-figures/locked-ellipse-settings";

import type {Meta, StoryObj} from "@storybook/react-vite";

export default {
    title: "PerseusEditor/Components/Locked Ellipse Settings",
    component: LockedEllipseSettings,
} as Meta<typeof LockedEllipseSettings>;

export const Default = (args): React.ReactElement => {
    return <LockedEllipseSettings {...args} />;
};

const defaultProps = {
    ...getDefaultFigureForType("ellipse"),
    onChangeProps: () => {},
    onMove: () => {},
    onRemove: () => {},
};

type StoryComponentType = StoryObj<typeof LockedEllipseSettings>;

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
            <LockedEllipseSettings
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

// Fully expanded view of the locked ellipse settings to allow snapshot testing.
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
            <LockedEllipseSettings
                {...props}
                expanded={expanded}
                onToggle={setExpanded}
                onChangeProps={handlePropsUpdate}
            />
        );
    },
};
