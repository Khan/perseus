import {View} from "@khanacademy/wonder-blocks-core";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import ScrolllessNumberTextField from "../scrollless-number-text-field";

import type {StoryObj, Meta} from "@storybook/react-vite";

export default {
    title: "Editors/Components/Scrollless Number Text Field",
    component: ScrolllessNumberTextField,
} as Meta<typeof ScrolllessNumberTextField>;

/**
 * Uncontrolled story. Interact with the control panel to see the component
 * reflect the props.
 */
export const Default = (args): React.ReactElement => {
    return <ScrolllessNumberTextField {...args} />;
};

const defaultProps = {
    value: "",
    onChange: () => {},
};

type StoryComponentType = StoryObj<typeof ScrolllessNumberTextField>;

// Set the default values in the control panel.
Default.args = defaultProps;

/**
 * Controlled story. The text field's state is managed by its parent.
 * Typing in the input field should work as expected.
 */
export const Controlled: StoryComponentType = {
    render: function Render() {
        const [value, setValue] = React.useState("");

        return <ScrolllessNumberTextField value={value} onChange={setValue} />;
    },
};

Controlled.parameters = {
    chromatic: {
        // Disable the snapshot for this story because it's testing
        // behavior, not visuals.
        disableSnapshot: true,
    },
};

/**
 * In this example, we can see how the input field behaves when it is placed
 * in a long page. Scrolling on the input field with a mouse wheel or trackpad
 * changes the number, but does not scroll the page.
 */
export const LongPageScroll: StoryComponentType = {
    render: function Render() {
        const [value, setValue] = React.useState("");

        return (
            <>
                <LabelLarge>Scroll down to see the input.</LabelLarge>
                <View style={{height: "100vh"}} />
                <LabelLarge>
                    Observe that scrolling on the input field with a mouse wheel
                    changes the number, but does not scroll the page.
                </LabelLarge>
                <ScrolllessNumberTextField value={value} onChange={setValue} />
                <View style={{height: "100vh"}} />
            </>
        );
    },
};

LongPageScroll.parameters = {
    chromatic: {
        // Disable the snapshot for this story because it's testing
        // behavior, not visuals.
        disableSnapshot: true,
    },
};
