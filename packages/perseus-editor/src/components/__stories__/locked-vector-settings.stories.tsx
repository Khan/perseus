import * as React from "react";

import LockedVectorSettings from "../../widgets/interactive-graph-editor/locked-figures/locked-vector-settings";
import {getDefaultFigureForType} from "../../widgets/interactive-graph-editor/locked-figures/util";

import type {Meta, StoryObj} from "@storybook/react-vite";

export default {
    title: "PerseusEditor/Components/Locked Vector Settings",
    component: LockedVectorSettings,
} as Meta<typeof LockedVectorSettings>;

export const Default = (args): React.ReactElement => {
    return <LockedVectorSettings {...args} />;
};

const defaultProps = {
    ...getDefaultFigureForType("vector"),
    onChangeProps: () => {},
    onMove: () => {},
    onRemove: () => {},
};

type StoryComponentType = StoryObj<typeof LockedVectorSettings>;

// Set the default values in the control panel.
Default.args = defaultProps;

export const Expanded: StoryComponentType = {
    render: function Render() {
        const [props, setProps] = React.useState(defaultProps);

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
        const [props, setProps] = React.useState(defaultProps);

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
