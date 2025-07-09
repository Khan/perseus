import * as React from "react";

import ZoomableTex from "../../components/zoomable-tex";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Components/Zoomable Tex",
    component: ZoomableTex,
    decorators: [
        function ForceZoomWrapper(Story) {
            return (
                <>
                    <h1>Click on equation to zoom/unzoom</h1>
                    <div style={{width: "80px"}}>
                        <Story />
                    </div>
                </>
            );
        },
    ],
};
export default meta;

type Story = StoryObj<typeof ZoomableTex>;

export const Tex: Story = {
    args: {children: "\\sum_{i=1}^\\infty\\frac{1}{n^2} = \\frac{\\pi^2}{6}"},
};

export const ComplexTex: Story = {
    args: {
        children: `\\begin{aligned}h\\blueE{v_1} \\left(\\dfrac{\\partial f}{\\partial x}(x_0, y_0) \\right) + h\\greenE{v_2}\\left( \\dfrac{\\partial f}{\\partial y}(x_0 \\redD{+ h\\blueE{v_1}}, y_0)\\right)\\end{aligned}`,
    },
};
