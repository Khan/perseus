import {getDefaultFigureForType} from "@khanacademy/perseus-core";
import * as React from "react";

import LockedPointSettings from "../../widgets/interactive-graph-editor/locked-figures/locked-point-settings";

import type {Meta, StoryFn, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof LockedPointSettings> = {
    title: "Editors/Components/Locked Point Settings",
    component: LockedPointSettings,
};

export default meta;

const defaultProps = {
    ...getDefaultFigureForType("point"),
    onChangeProps: () => {},
    onMove: () => {},
    onRemove: () => {},
};

type Story = StoryFn<typeof LockedPointSettings>;

export const Default: StoryObj<typeof LockedPointSettings> = {
    args: defaultProps,
};

export const Controlled: Story = () => {
    const [props, setProps] = React.useState({
        ...defaultProps,
        // Disabling because this doesn't test anything visual, just behavior.
        chromatic: {disableSnapshot: true},
    });

    const handlePropsUpdate = (newProps) => {
        setProps({
            ...props,
            ...newProps,
        });
    };

    return <LockedPointSettings {...props} onChangeProps={handlePropsUpdate} />;
};

// Fully expanded view of the locked point settings to allow snapshot testing.
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
        <LockedPointSettings
            {...props}
            expanded={expanded}
            onToggle={setExpanded}
            onChangeProps={handlePropsUpdate}
        />
    );
};

// Fully expanded view of the locked point settings to allow snapshot testing.
export const ExpandedNondefaultProps: Story = () => {
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
};
