import * as React from "react";

import LockedVectorSettings from "../locked-vector-settings";
import {getDefaultFigureForType} from "../util";

import type {Range} from "@khanacademy/perseus";
import type {Meta, StoryObj} from "@storybook/react";

export default {
    title: "PerseusEditor/Components/Locked Vector Settings",
    component: LockedVectorSettings,
} as Meta<typeof LockedVectorSettings>;

export const Default = (args): React.ReactElement => {
    return <LockedVectorSettings {...args} />;
};

type StoryComponentType = StoryObj<typeof LockedVectorSettings>;

// Set the default values in the control panel.
Default.args = {
    ...getDefaultFigureForType("vector"),
    onChangeProps: () => {},
    onRemove: () => {},
};

export const Expanded: StoryComponentType = {
    render: function Render() {
        const [props, setProps] = React.useState({
            ...getDefaultFigureForType("vector"),
            range: [
                [-10, 10],
                [-10, 10],
            ] satisfies [Range, Range],
            onRemove: () => {},
        });

        const handlePropsUpdate = (newProps) => {
            setProps({
                ...props,
                ...newProps,
            });
        };

        return (
            <LockedVectorSettings
                {...props}
                expanded={true}
                onChangeProps={handlePropsUpdate}
            />
        );
    },
};

/**
 * If the two points defining the vector are the same, the vector is invalid
 * as that would give it a length of 0. An error message is displayed
 * in this case.
 */
export const WithInvalidPoints: StoryComponentType = {
    render: function Render() {
        const [props, setProps] = React.useState({
            ...getDefaultFigureForType("vector"),
            range: [
                [-10, 10],
                [-10, 10],
            ] satisfies [Range, Range],
            onRemove: () => {},
        });

        const handlePropsUpdate = (newProps) => {
            setProps({
                ...props,
                ...newProps,
            });
        };

        return (
            <LockedVectorSettings
                {...props}
                points={[
                    [0, 0],
                    [0, 0],
                ]}
                expanded={true}
                onChangeProps={handlePropsUpdate}
            />
        );
    },
};
