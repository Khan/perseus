import {getDefaultFigureForType} from "@khanacademy/perseus-core";
import * as React from "react";

import LockedLabelSettings from "../../widgets/interactive-graph-editor/locked-figures/locked-label-settings";

import type {Meta, StoryFn, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof LockedLabelSettings> = {
    title: "Editors/Components/Locked Label Settings",
    component: LockedLabelSettings,
};

export default meta;

const defaultProps = {
    ...getDefaultFigureForType("label"),
    onChangeProps: () => {},
    onMove: () => {},
    onRemove: () => {},
};

type Story = StoryFn<typeof LockedLabelSettings>;

export const Default: StoryObj<typeof LockedLabelSettings> = {
    args: defaultProps,
};

// Fully expanded view of the locked label settings to allow snapshot testing.
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
        <LockedLabelSettings
            {...props}
            expanded={expanded}
            onToggle={setExpanded}
            onChangeProps={handlePropsUpdate}
        />
    );
};
