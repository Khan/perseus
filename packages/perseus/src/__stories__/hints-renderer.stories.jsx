// @flow

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
    return <HintsRenderer {...args} />;
};
