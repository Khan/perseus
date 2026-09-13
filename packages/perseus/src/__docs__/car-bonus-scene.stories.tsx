import * as React from "react";

import {CarBonusScene} from "./car-bonus-scene";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof CarBonusScene> = {
    title: "Games/Car Bonus Scene",
    component: CarBonusScene,
    parameters: {
        docs: {
            description: {
                component:
                    "A comedic bonus scene that plays when the player runs out of lives in Math Blaster. " +
                    "The car self-destructs in a humorous reference to the Street Fighter 2 bonus level.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof CarBonusScene>;

export const Default: Story = {
    args: {
        onComplete: () => {
            // Car bonus scene completed
        },
    },
    decorators: [
        (Story) => (
            <div
                style={{width: "800px", height: "600px", position: "relative"}}
            >
                <Story />
            </div>
        ),
    ],
};
