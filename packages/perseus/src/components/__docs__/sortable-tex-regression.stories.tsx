import {themeModes} from "../../../../../.storybook/modes";
import Sortable from "../sortable";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof Sortable> = {
    title: "Components/Sortable/Visual Regression Tests/TeX Content",
    component: Sortable,
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for Sortable rendering TeX content. " +
                    "Verifies the AssetContext wiring produces stable layouts " +
                    "after the quiescence window settles — guards against the " +
                    "Chromatic flake where snapshots fired before MathJax " +
                    "finished sizing the cards.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof Sortable>;

const texOptions = [
    "$f(x) = x^2$",
    "$f'(x) = 2x$",
    "$\\int_0^1 x \\, dx = \\frac{1}{2}$",
];

export const TexHorizontal: Story = {
    args: {
        layout: "horizontal",
        options: texOptions,
        waitForTexRendererToLoad: true,
    },
};

export const TexVertical: Story = {
    args: {
        layout: "vertical",
        options: texOptions,
        waitForTexRendererToLoad: true,
    },
};

export const TexMixedSizes: Story = {
    args: {
        layout: "horizontal",
        options: [
            "$1$",
            "$\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}$",
            "$\\sqrt{2}$",
        ],
        waitForTexRendererToLoad: true,
    },
};
