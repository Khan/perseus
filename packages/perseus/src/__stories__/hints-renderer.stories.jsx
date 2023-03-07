// @flow

import {View} from "@khanacademy/wonder-blocks-core";
import React from "react";

import HintsRenderer from "../hints-renderer.jsx";

type StoryArgs = {|
    hints: $ReadOnlyArray<$FlowFixMe>,
    hintsVisible: number,
|};

type Story = {|
    title: string,
    argTypes: $FlowFixMe,
|};

export default ({
    title: "Perseus/Renderers/Hints Renderer",
    argTypes: {
        hints: {
            control: "object",
            defaultValue: [
                {
                    content: "this is hint 1",
                    images: {},
                    replace: false,
                    widgets: {},
                },
                {
                    content: "this is hint 2",
                    images: {},
                    replace: false,
                    widgets: {},
                },
                {
                    content: "this is hint 3",
                    images: {},
                    replace: false,
                    widgets: {},
                },
            ],
        },
        hintsVisible: {
            control: {type: "number", min: 0},
            defaultValue: 3,
        },
    },
}: Story);

export const Interactive = (args: StoryArgs): $FlowFixMe => {
    return (
        // Sorry for the hacks! The HintRenderer uses absolute positioning
        // for the "1 / 3" label that is rendered left of the hint. So we shift
        // everything over so we can see it.
        <View style={{left: 80}}>
            <HintsRenderer {...args} />
        </View>
    );
};
