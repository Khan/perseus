import {
    generateRadioOptions,
    generateRadioWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {THEME_DATA_ATTRIBUTE} from "@khanacademy/wonder-blocks-theming";
import * as React from "react";
import {useEffect} from "react";

import QuestionRendererForStories from "../widgets/__testutils__/question-renderer-for-stories";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {SupportedThemes} from "@khanacademy/wonder-blocks-theming";
import type {Meta, StoryObj} from "@storybook/react-vite";

type Story = StoryObj;

const meta: Meta = {
    title: "Renderers/Visual Regression Tests/Dark Mode",
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

function RenderInDarkMode(renderer: PerseusRenderer): () => React.JSX.Element {
    return function Render() {
        // Apply the dark mode theme to the body element. The element with
        // THEME_DATA_ATTRIBUTE needs to be outside the .framework-perseus
        // element for our styles to work.
        useEffect(() => {
            setTimeout(() => {
                document.body.setAttribute(
                    THEME_DATA_ATTRIBUTE,
                    "syl-dark" satisfies SupportedThemes,
                );
            }, 10);
        }, []);

        return (
            <div
                style={{
                    color: "var(--wb-semanticColor-core-foreground-neutral-strong)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    padding: "50px",
                }}
            >
                <QuestionRendererForStories question={renderer} />
            </div>
        );
    };
}

const RenderImages = (content: string): (() => React.JSX.Element) => {
    return RenderInDarkMode(generateTestPerseusRenderer({content: content}));
};

export const Icons: Story = {
    render: RenderImages(
        "![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)\n\n" +
            "![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png)\n\n" +
            "![Integer Chips Crossed Out](web+graphie://ka-perseus-graphie.s3.amazonaws.com/e18fd25718efebb6a812d7edd5c8a6521f997d34)",
    ),
};

export const DarkModeOff: Story = {
    // Images have a query parameter that prevents the dark mode filter from being applied
    render: RenderImages(
        "![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png?dark-mode=off)\n\n" +
            "![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png?dark-mode=off)\n\n" +
            "![The flag of Sweden](https://ka-perseus-images.s3.amazonaws.com/9292c231118d9e00f9435c98aba4788d517b3ad8.png?dark-mode=off)",
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

export const RadioWithMathJax: Story = {
    render: RenderInDarkMode(
        generateTestPerseusRenderer({
            content: "[[☃ radio 1]]",
            widgets: {
                "radio 1": generateRadioWidget({
                    options: generateRadioOptions({
                        choices: [
                            {
                                id: "1",
                                content:
                                    "$42 \\red{42} \\blue{42} \\green{42}$",
                            },
                        ],
                    }),
                }),
            },
        }),
    ),
};
