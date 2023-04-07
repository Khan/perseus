import * as React from "react";

import Hud from "../hud";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

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
