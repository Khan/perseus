import * as React from "react";

import LockedPolygonSettings from "../../widgets/interactive-graph-editor/locked-figures/locked-polygon-settings";
import {getDefaultFigureForType} from "../../widgets/interactive-graph-editor/locked-figures/util";

import type {Meta, StoryObj} from "@storybook/react-vite";

export default {
    title: "PerseusEditor/Components/Locked Polygon Settings",
    component: LockedPolygonSettings,
} as Meta<typeof LockedPolygonSettings>;

export const Default = (args): React.ReactElement => {
    return <LockedPolygonSettings {...args} />;
};

const defaultProps = {
    ...getDefaultFigureForType("polygon"),
    onChangeProps: () => {},
    onMove: () => {},
    onRemove: () => {},
};

type StoryComponentType = StoryObj<typeof LockedPolygonSettings>;

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
            <LockedPolygonSettings
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
            <LockedPolygonSettings
                {...props}
                expanded={expanded}
                onToggle={setExpanded}
                onChangeProps={handlePropsUpdate}
            />
        );
    },
};
