import * as React from "react";

import LockedPointSettings from "../locked-point-settings";
import {getDefaultFigureForType} from "../util";

import type {Meta, StoryObj} from "@storybook/react";

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
            <LockedPointSettings {...props} onChangeProps={handlePropsUpdate} />
        );
    },
};

/**
 * In some cases, the locked point may be shown or hidden from the graph,
 * such as when the point is used to define a locked line.
 *
 * Use `onToggle` and `toggled` to update the visibility of the locked point.
 * When `onToggled` is passed in, a switch will be rendered to allow
 * toggling the point, which will then show/hide the relevant properties
 * for the locked point.
 */
export const Toggleable: StoryComponentType = {
    render: function Render() {
        const [toggled, setToggled] = React.useState(true);
        const [props, setProps] = React.useState(
            getDefaultFigureForType("point"),
        );

        const handlePropsUpdate = (newProps) => {
            setProps({
                ...props,
                ...newProps,
            });
        };

        return (
            <LockedPointSettings
                {...props}
                onChangeProps={handlePropsUpdate}
                toggled={toggled}
                onToggle={setToggled}
            />
        );
    },
};
