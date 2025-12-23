import {getDefaultFigureForType} from "@khanacademy/perseus-core";
import * as React from "react";

import LockedVectorSettings from "../../widgets/interactive-graph-editor/locked-figures/locked-vector-settings";

import type {Meta, StoryFn, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof LockedVectorSettings> = {
    title: "Editors/Components/Locked Vector Settings",
    component: LockedVectorSettings,
};

export default meta;

const defaultProps = {
    ...getDefaultFigureForType("vector"),
    onChangeProps: () => {},
    onMove: () => {},
    onRemove: () => {},
};

type Story = StoryFn<typeof LockedVectorSettings>;

export const Default: StoryObj<typeof LockedVectorSettings> = {
    args: defaultProps,
};

// Fully expanded view of the locked vector settings to allow snapshot testing.
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
        <LockedVectorSettings
            {...props}
            expanded={expanded}
            onToggle={setExpanded}
            onChangeProps={handlePropsUpdate}
        />
    );
};

/**
 * If the two points defining the vector are the same, the vector is invalid
 * as that would give it a length of 0. An error message is displayed
 * in this case.
 */
export const WithInvalidPoints: Story = () => {
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
};
