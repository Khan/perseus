import {SchedulePolicy, useInterval} from "@khanacademy/wonder-blocks-timing";
import * as React from "react";

import ToggleableCaret from "../toggleable-caret";

import type {StoryObj, Meta} from "@storybook/react-vite";

type Story = StoryObj<typeof ToggleableCaret>;

export default {
    title: "Editors/Components/Toggleable Caret",
    component: ToggleableCaret,
} satisfies Meta;

export function Transitions() {
    const [expanded, setExpanded] = React.useState(false);
    const toggler = React.useCallback(() => {
        setExpanded(!expanded);
    }, [setExpanded, expanded]);
    useInterval(toggler, 500, {schedulePolicy: SchedulePolicy.Immediately});

    return <ToggleableCaret isExpanded={expanded} />;
}

export const Expanded: Story = {
    args: {isExpanded: true},
};

export const Collapsed: Story = {
    args: {isExpanded: false},
};
