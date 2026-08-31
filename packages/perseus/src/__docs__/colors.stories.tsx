import * as React from "react";

import {resolveColor} from "../util/colors";

import type {Meta, StoryObj} from "@storybook/react-vite";

type Story = StoryObj;

const meta: Meta = {
    title: "Utilities/resolveColor",
    tags: ["!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Converts any CSS color (e.g. #fff or " +
                    '"white") to its red, green, and blue ' +
                    "components as numbers from 0 to 255.",
            },
        },
    },
};
export default meta;

const COLORS = [
    "black",
    "white",
    "red",
    "aliceblue",
    "blanchedalmond",
    "burlywood",
    "cadetblue",
    "honeydew",
    "hotpink",
    "#0f0",
    "rgb(127, 127, 127)",
];

export const ResolveColor: Story = {
    render: () => (
        <ul>
            {COLORS.map((color) => {
                const {r, g, b} = resolveColor(color);
                const rgbCode = `rgb(${r}, ${g}, ${b})`;

                return (
                    <li
                        key={color}
                        style={{display: "flex", alignItems: "center", gap: 8}}
                    >
                        <span
                            style={{
                                display: "inline-block",
                                width: 72,
                                height: 72,
                                backgroundColor: rgbCode,
                            }}
                        />
                        {color}: {rgbCode}
                    </li>
                );
            })}
        </ul>
    ),
};
