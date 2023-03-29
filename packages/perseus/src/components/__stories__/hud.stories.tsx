import * as React from "react";

import Hud from "../hud";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Components/HUD",
} as Story;

export const TestMessageDisabled: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    return (
        <Hud
            fixedPosition={false}
            message="Test message"
            enabled={false}
            onClick={() => {}}
        />
    );
};

export const TestMessageEnabled: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    return (
        <Hud
            fixedPosition={false}
            message="Test message"
            enabled={true}
            onClick={() => {}}
        />
    );
};
