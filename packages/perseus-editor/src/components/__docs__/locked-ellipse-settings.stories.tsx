import {getDefaultFigureForType} from "@khanacademy/perseus-core";
import * as React from "react";

import LockedEllipseSettings from "../../widgets/interactive-graph-editor/locked-figures/locked-ellipse-settings";

import type {Meta, StoryFn, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof LockedEllipseSettings> = {
    title: "Editors/Components/Locked Ellipse Settings",
    component: LockedEllipseSettings,
};

export default meta;

const defaultProps = {
    ...getDefaultFigureForType("ellipse"),
    onChangeProps: () => {},
    onMove: () => {},
    onRemove: () => {},
};

type Story = StoryFn<typeof LockedEllipseSettings>;

export const Default: StoryObj<typeof LockedEllipseSettings> = {
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

    return (
        <LockedEllipseSettings {...props} onChangeProps={handlePropsUpdate} />
    );
};

Controlled.parameters = {
    chromatic: {
        // Disabling because this is testing behavior, not visuals.
        disableSnapshot: true,
    },
};

// Fully expanded view of the locked ellipse settings to allow snapshot testing.
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
        <LockedEllipseSettings
            {...props}
            expanded={expanded}
            onToggle={setExpanded}
            onChangeProps={handlePropsUpdate}
        />
    );
};
