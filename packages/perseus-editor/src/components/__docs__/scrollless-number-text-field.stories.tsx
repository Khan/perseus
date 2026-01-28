import {View} from "@khanacademy/wonder-blocks-core";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import ScrolllessNumberTextField from "../scrollless-number-text-field";

import type {Meta, StoryFn, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof ScrolllessNumberTextField> = {
    title: "Editors/Components/Scrollless Number Text Field",
    component: ScrolllessNumberTextField,
};

export default meta;

const defaultProps = {
    value: "",
    onChange: () => {},
};

type Story = StoryFn<typeof ScrolllessNumberTextField>;

/**
 * Uncontrolled story. Interact with the control panel to see the component
 * reflect the props.
 */
export const Default: StoryObj<typeof ScrolllessNumberTextField> = {
    args: defaultProps,
};

/**
 * Controlled story. The text field's state is managed by its parent.
 * Typing in the input field should work as expected.
 */
export const Controlled: Story = () => {
    const [value, setValue] = React.useState("");

    return <ScrolllessNumberTextField value={value} onChange={setValue} />;
};

/**
 * In this example, we can see how the input field behaves when it is placed
 * in a long page. Scrolling on the input field with a mouse wheel or trackpad
 * changes the number, but does not scroll the page.
 */
export const LongPageScroll: Story = () => {
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
};
