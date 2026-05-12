import {generateTestPerseusRenderer} from "@khanacademy/perseus-core";
import {THEME_DATA_ATTRIBUTE} from "@khanacademy/wonder-blocks-theming";
import * as React from "react";
import {useEffect} from "react";

import QuestionRendererForStories from "../widgets/__testutils__/question-renderer-for-stories";

import type {Meta, StoryObj} from "@storybook/react-vite";

type Story = StoryObj;

const meta: Meta = {
    title: "Renderers/Dark Mode",
    tags: ["!manifest"],
    parameters: {
        docs: {
            description: {
                component: "Examples of graphics in dark mode.",
            },
        },
        chromatic: {disableSnapshot: false},
    },
};
export default meta;

const RenderImages = (content: string): (() => React.JSX.Element) => {
    return function Render() {
        // This is needed to apply a fictitious dark mode them to the body element.
        useEffect(() => {
            setTimeout(() => {
                document.body.setAttribute(
                    THEME_DATA_ATTRIBUTE,
                    "some-theme-in-dark",
                );
            }, 10);
        }, []);

        return (
            <div
                style={{
                    background: "black",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    padding: "50px",
                }}
            >
                <QuestionRendererForStories
                    question={generateTestPerseusRenderer({content: content})}
                />
            </div>
        );
    };
};

export const Icons: Story = {
    render: RenderImages(
        "![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)\n\n" +
            "![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png)\n\n" +
            "![Integer Chips Crossed Out](web+graphie://ka-perseus-graphie.s3.amazonaws.com/e18fd25718efebb6a812d7edd5c8a6521f997d34)",
    ),
};

export const Charts: Story = {
    render: RenderImages(
        "![Mosaic Plot](web+graphie://ka-perseus-graphie.s3.amazonaws.com/78b18bfb2049533bf60096fe41ecb31117c944be)\n\n" +
            "![Stacked dot plot](web+graphie://ka-perseus-graphie.s3.amazonaws.com/d7f8bfbc651998111db83eb2779dadd855456252)",
    ),
};

export const Diagrams: Story = {
    render: RenderImages(
        "![Multiplying Fractions with Opacities](web+graphie://ka-perseus-graphie.s3.amazonaws.com/322c2eac3422af95f99455b04bdf567f6e1db6b9)\n\n" +
            "![Multiplying Fractions with Overlaps](web+graphie://ka-perseus-graphie.s3.amazonaws.com/f3566ece28c365a85199d6ac77623c6b7c3c37e2)\n\n" +
            "![Shape with same perimeter](web+graphie://ka-perseus-graphie.s3.amazonaws.com/1135719e6f3f16f5c6e4e35da3c70771e05ee65b)",
    ),
};

export const Photos: Story = {
    render: RenderImages(
        "$~\\grayH\\text{JPEG}$\n\n![Earth and Moon](https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg)\n\n" +
            "$~\\grayH\\text{GIF}$\n\n![Skateboarder](https://cdn.kastatic.org/ka-content-images/589905512e0a593ba12e4ac290c142cd54879ae4.gif)",
    ),
};

const MathJaxColors = [
    "blue",
    "green",
    "gray",
    "grayH",
    "grayI",
    "purple",
    "purpleD",
    "pink",
    "maroonD",
    "goldD",
    "red",
];

export const MathJax: Story = {
    render: RenderImages(
        MathJaxColors.map((color) => {
            return `$~\\${color}\\text{${color}}$`;
        }).join("\n\n"),
    ),
};
