// @flow
import * as React from "react";

import Hud from "../hud.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Components/HUD",
}: Story);

export const TestMessageDisabled = (args: StoryArgs): React.Node => {
    return (
        <Hud
            fixedPosition={false}
            message="Test message"
            enabled={false}
            onClick={() => {}}
        />
    );
};

export const TestMessageEnabled = (args: StoryArgs): React.Node => {
    return (
        <Hud
            fixedPosition={false}
            message="Test message"
            enabled={true}
            onClick={() => {}}
        />
    );
};
