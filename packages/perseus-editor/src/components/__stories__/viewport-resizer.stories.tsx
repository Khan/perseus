import * as React from "react";

import ViewportResizer from "../viewport-resizer";
import {action} from "@storybook/addon-actions";

import type {Meta, StoryFn} from "@storybook/react";
import {DeviceType} from "@khanacademy/perseus";

const meta: Meta<typeof ViewportResizer> = {
    component: ViewportResizer,
    title: "Perseus/Editor/Components/Viewport Resizer",
};

export default meta;
type Story = StoryFn<typeof ViewportResizer>;

export const Controlled: Story = () => {
    const [deviceType, setDeviceType] = React.useState<DeviceType>("phone");
    return (
        <ViewportResizer
            deviceType={deviceType}
            onViewportSizeChanged={(newDeviceType) => {
                action("onViewportSizeChanged")(newDeviceType);
                setDeviceType(newDeviceType);
            }}
        />
    );
};
