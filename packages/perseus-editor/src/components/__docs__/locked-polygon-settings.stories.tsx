import {getDefaultFigureForType} from "@khanacademy/perseus-core";
import * as React from "react";

import LockedPolygonSettings from "../../widgets/interactive-graph-editor/locked-figures/locked-polygon-settings";

import type {Meta, StoryFn, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof LockedPolygonSettings> = {
    title: "Editors/Components/Locked Polygon Settings",
    component: LockedPolygonSettings,
};

export default meta;

const defaultProps = {
    ...getDefaultFigureForType("polygon"),
    onChangeProps: () => {},
    onMove: () => {},
    onRemove: () => {},
};

type Story = StoryFn<typeof LockedPolygonSettings>;

export const Default: StoryObj<typeof LockedPolygonSettings> = {
    args: defaultProps,
};

export const Controlled: Story = () => {
    const [props, setProps] = React.useState({
        ...defaultProps,
        // Disabling because this is testing behavior, not visuals.
        chromatic: {disableSnapshot: true},
    });

    const handlePropsUpdate = (newProps) => {
        setProps({
            ...props,
            ...newProps,
        });
    };

    return (
        <LockedPolygonSettings {...props} onChangeProps={handlePropsUpdate} />
    );
};

// Fully expanded view of the locked polygon settings to allow snapshot testing.
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
        <LockedPolygonSettings
            {...props}
            expanded={expanded}
            onToggle={setExpanded}
            onChangeProps={handlePropsUpdate}
        />
    );
};
