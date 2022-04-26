// @flow
import colors from "@khanacademy/wonder-blocks-color";
import * as React from "react";

import CrossOutButton from "../cross-out-button.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Widgets/Radio/Cross Out Button",
}: Story);

export const CrossOutButtonForChoiceAColoredDefaultKaGreen = (
    args: StoryArgs,
): React.Node => {
    return (
        <CrossOutButton
            onClick={() => {}}
            onFocus={() => {}}
            onBlur={() => {}}
            pos={0}
            crossedOut={false}
            usingKeyboardFocus={false}
            theme="day"
        />
    );
};

export const ReEnableButtonForChoiceCColoredWonderBlocksBlue = (
    args: StoryArgs,
): React.Node => {
    return (
        <CrossOutButton
            onClick={() => {}}
            onFocus={() => {}}
            onBlur={() => {}}
            pos={0}
            primaryProductColor={colors.blue}
            crossedOut={true}
            usingKeyboardFocus={false}
            theme="day"
        />
    );
};

export const CrossOutButtonForChoiceAColoredWhiteForNightTheme = (
    args: StoryArgs,
): React.Node => {
    return (
        <CrossOutButton
            onClick={() => {}}
            onFocus={() => {}}
            onBlur={() => {}}
            pos={0}
            crossedOut={false}
            usingKeyboardFocus={false}
            theme="night"
        />
    );
};
