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
        "![Earth and Moon](https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg)\n\n" +
        "![Skateboarder](https://cdn.kastatic.org/ka-content-images/79affe6b539eb0e163aa96b42160e53cad4b2097.gif)",
    ),
};
/*
export const MultiplyingFractionsOpacity: Story = {
    render: RenderMirroredImage(
        "![Multiplying Fractions with Opacities](web+graphie://ka-perseus-graphie.s3.amazonaws.com/322c2eac3422af95f99455b04bdf567f6e1db6b9)",
    ),
};

export const MultiplyingFractionsOverlap: Story = {
    render: RenderMirroredImage(
        "![Multiplying Fractions with Overlaps](web+graphie://ka-perseus-graphie.s3.amazonaws.com/f3566ece28c365a85199d6ac77623c6b7c3c37e2)",
    ),
};

export const MosaicPlots: Story = {
    render: RenderMirroredImage(
        "![Mosaic Plot](web+graphie://ka-perseus-graphie.s3.amazonaws.com/78b18bfb2049533bf60096fe41ecb31117c944be)",
    ),
};

export const IntegerChipsCrossedOut: Story = {
    render: RenderMirroredImage(
        "![Integer Chips Crossed Out](web+graphie://ka-perseus-graphie.s3.amazonaws.com/e18fd25718efebb6a812d7edd5c8a6521f997d34)",
    ),
};

export const IntegerChipSubtraction: Story = {
    render: RenderMirroredImage(
        "![Integer Chip Key](web+graphie://ka-perseus-graphie.s3.amazonaws.com/ebd2c689b32192d1ad2b34ad4a953ab32ee45b77)",
    ),
};

export const Multiply3Digits: Story = {
    render: RenderMirroredImage(
        "![Multiply 3 digits](web+graphie://ka-perseus-graphie.s3.amazonaws.com/9733676623eeb0ef66a50b97b7352b94d453cedb)",
    ),
};

export const ShapesWithSamePerimeter: Story = {
    render: RenderMirroredImage(
        "![Shape with same perimeter](web+graphie://ka-perseus-graphie.s3.amazonaws.com/1135719e6f3f16f5c6e4e35da3c70771e05ee65b)",
    ),
};

export const DivisionWordProblem: Story = {
    render: RenderMirroredImage(
        "![Division word problem](web+graphie://ka-perseus-graphie.s3.amazonaws.com/139b5f463acbf24a70e3a49b894eace56b7c9ed8)",
    ),
};

export const DistributiveProperty: Story = {
    render: RenderMirroredImage(
        "![Solve area with distributive property](web+graphie://ka-perseus-graphie.s3.amazonaws.com/be0d9ba4277f9021e4846a9d530e5d247da2ecbd)",
    ),
};

export const Balloons: Story = {
    render: RenderMirroredImage(
        "![Balloons with Dots](web+graphie://ka-perseus-graphie.s3.amazonaws.com/d8e1fc076fc4624a4979fdfeb532d12fbc0bf6db)",
    ),
};

export const CartesianPlot: Story = {
    render: RenderMirroredImage(
        "![3D Cartesian Plot](web+graphie://ka-perseus-graphie.s3.amazonaws.com/308f2b2a9156e8b5c59b592db5a005fb9a0f20f5)",
    ),
};

export const GeometricFigure3D: Story = {
    render: RenderMirroredImage(
        "![Geometric Figure - 3D](web+graphie://ka-perseus-graphie.s3.amazonaws.com/29f388b760a9738b857c4d08a8a53267f65021c5)",
    ),
};

export const GeometricFigureGrid: Story = {
    render: RenderMirroredImage(
        "![Geometric Figure on a grid](web+graphie://ka-perseus-graphie.s3.amazonaws.com/37371049499495050ac0ae1009f51458fdb12ea6)",
    ),
};

export const StackedDotPlot: Story = {
    render: RenderMirroredImage(
        "![Stacked dot plot](web+graphie://ka-perseus-graphie.s3.amazonaws.com/d7f8bfbc651998111db83eb2779dadd855456252)",
    ),
};

export const MultiplicationChart: Story = {
    render: RenderMirroredImage(
        "![Multiplication chart with 12 highlighted](web+graphie://ka-perseus-graphie.s3.amazonaws.com/469e93263636285720457d374187001797ad90f9)",
    ),
};

export const Icon: Story = {
    render: RenderMirroredImage(
        "![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)",
    ),
};

export const WideIcon: Story = {
    render: RenderMirroredImage(
        "![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png)",
    ),
};
*/
