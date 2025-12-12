import {getDefaultFigureForType} from "@khanacademy/perseus-core";
import * as React from "react";

import LockedFunctionSettings from "../../widgets/interactive-graph-editor/locked-figures/locked-function-settings";

import type {Meta, StoryObj} from "@storybook/react-vite";

export default {
    title: "PerseusEditor/Components/Locked Function Settings",
    component: LockedFunctionSettings,
} as Meta<typeof LockedFunctionSettings>;

export const Default = (args): React.ReactElement => {
    return <LockedFunctionSettings {...args} />;
};

const defaultProps = {
    ...getDefaultFigureForType("function"),
    onChangeProps: () => {},
    onMove: () => {},
    onRemove: () => {},
};

type StoryComponentType = StoryObj<typeof LockedFunctionSettings>;

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
            <LockedFunctionSettings
                {...props}
                expanded={true}
                onChangeProps={handlePropsUpdate}
            />
        );
    },
};
