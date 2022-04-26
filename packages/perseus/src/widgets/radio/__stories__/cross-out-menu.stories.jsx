// @flow
import colors from "@khanacademy/wonder-blocks-color";
import * as React from "react";

import CrossOutMenuWrapper from "../cross-out-menu-wrapper.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Widgets/Radio/Cross Out Menu",
}: Story);

export const CrossOutMenuForChoiceAColoredDefaultKaGreen = (
    args: StoryArgs,
): React.Node => {
    return (
        <CrossOutMenuWrapper
            enabled={true}
            pos={0}
            crossedOut={false}
            onCrossedOutChange={() => {}}
        >
            <div>Hello, world!</div>
        </CrossOutMenuWrapper>
    );
};

export const ReEnableMenuForChoiceCColoredWonderBlocksBlue = (
    args: StoryArgs,
): React.Node => {
    return (
        <CrossOutMenuWrapper
            enabled={true}
            pos={0}
            primaryProductColor={colors.blue}
            crossedOut={true}
            onCrossedOutChange={() => {}}
        >
            <div>Hello, world!</div>
        </CrossOutMenuWrapper>
    );
};

export const NoCrossOutMenu = (args: StoryArgs): React.Node => {
    return (
        <CrossOutMenuWrapper
            enabled={true}
            pos={0}
            crossedOut={false}
            onCrossedOutChange={() => {}}
        >
            <div>Hello, world!</div>
        </CrossOutMenuWrapper>
    );
};
