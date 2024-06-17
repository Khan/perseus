import * as React from "react";

import LockedPolygonSettings from "../locked-polygon-settings";
import {getDefaultFigureForType} from "../util";

import type {Meta, StoryObj} from "@storybook/react";

export default {
    title: "PerseusEditor/Components/Locked Polygon Settings",
    component: LockedPolygonSettings,
} as Meta<typeof LockedPolygonSettings>;

export const Default = (args): React.ReactElement => {
    return <LockedPolygonSettings {...args} />;
};

type StoryComponentType = StoryObj<typeof LockedPolygonSettings>;

// Set the default values in the control panel.
Default.args = {
    ...getDefaultFigureForType("polygon"),
    onChangeProps: () => {},
    onRemove: () => {},
};

export const Controlled: StoryComponentType = {
    render: function Render() {
        const [props, setProps] = React.useState({
            ...getDefaultFigureForType("polygon"),
            onRemove: () => {},
        });

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
        const [props, setProps] = React.useState({
            ...getDefaultFigureForType("polygon"),
            onRemove: () => {},
        });

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
