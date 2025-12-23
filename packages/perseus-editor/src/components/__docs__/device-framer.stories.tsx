import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import DeviceFramer from "../device-framer";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof DeviceFramer> = {
    component: DeviceFramer,
    title: "Editors/Components/Device Framer",
};

export default meta;
type Story = StoryObj<typeof DeviceFramer>;

const SampleContent = () => {
    return (
        <div
            style={{
                backgroundColor: color.blue,
                color: color.offWhite,
                width: "90%",
                height: "300px",
                padding: spacing.medium_16,
            }}
        >
            The DeviceFramer controls the size of the content inside the frame.
            So there&apos;s not much to look at here except how large each
            device type&apos;s size is.
        </div>
    );
};
export const Phone: Story = {
    render: () => (
        <DeviceFramer deviceType="phone" nochrome>
            <SampleContent />
        </DeviceFramer>
    ),
};

export const Tablet: Story = {
    render: () => (
        <DeviceFramer deviceType="tablet" nochrome>
            <SampleContent />
        </DeviceFramer>
    ),
};

export const Desktop: Story = {
    render: () => (
        <DeviceFramer deviceType="desktop" nochrome>
            <SampleContent />
        </DeviceFramer>
    ),
};
