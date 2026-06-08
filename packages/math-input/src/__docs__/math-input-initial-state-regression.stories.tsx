import * as React from "react";

import {themeModes} from "../../../../.storybook/modes";
import CursorHandle from "../components/input/cursor-handle";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof CursorHandle> = {
    title: "Math Input/Components/Visual Regression Tests/Initial State",
    component: CursorHandle,
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

type Story = StoryObj<typeof CursorHandle>;

// Verifies the cursor handle SVG rendered in its visible state — covers
// fill="#1865f2" (blue teardrop body) and stroke="#fff" (white outline path)
// in cursor-handle.tsx. This component is touch-only in production and is
// never shown via mouse interactions, so it is tested here in isolation.
export const CursorHandleVisible: Story = {
    decorators: [
        (Story) => (
            <div style={{position: "relative", height: 100, width: 100}}>
                <Story />
            </div>
        ),
    ],
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
