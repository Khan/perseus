import * as React from "react";

import {themeModes} from "../../../../.storybook/modes";
import CursorHandle from "../components/input/cursor-handle";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Math Input/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for math-input components that do NOT " +
                    "need any interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type CursorHandleStory = StoryObj<typeof CursorHandle>;

// This component is touch-only in production and never reached via mouse
// interactions, so it is tested here in isolation.
export const CursorHandleVisible: CursorHandleStory = {
    render: (args) => (
        <div style={{position: "relative", height: 100, width: 100}}>
            <CursorHandle {...args} />
        </div>
    ),
    args: {
        x: 50,
        y: 20,
        animateIntoPosition: false,
        visible: true,
        onTouchStart: () => {},
        onTouchMove: () => {},
        onTouchEnd: () => {},
        onTouchCancel: () => {},
    },
};
