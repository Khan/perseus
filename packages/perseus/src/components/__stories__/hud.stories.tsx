import * as React from "react";

import Hud from "../hud";

import type {StoryObj, Meta} from "@storybook/react";

type StoryArgs = StoryObj<typeof Hud>;

type Story = Meta<typeof Hud>;

export default {
    title: "Perseus/Components/HUD",
} as Story;

export const TestMessageDisabled = (args: StoryArgs): React.ReactElement => {
    return (
        <Hud
            fixedPosition={false}
            message="Test message"
            enabled={false}
            onClick={() => {}}
        />
    );
};

export const TestMessageEnabled = (args: StoryArgs): React.ReactElement => {
    return (
        <Hud
            fixedPosition={false}
            message="Test message"
            enabled={true}
            onClick={() => {}}
        />
    );
};
