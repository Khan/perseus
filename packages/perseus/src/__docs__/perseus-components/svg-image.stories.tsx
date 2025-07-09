import SvgImage from "../../components/svg-image";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Components/SVG Image",
    component: SvgImage,
    args: {alt: "ALT"},
};
export default meta;

type Story = StoryObj<typeof SvgImage>;

const svgUrl = "http://www.khanacademy.org/images/ohnoes-concerned.svg";
const imgUrl = "https://www.khanacademy.org/images/hand-tree.new.png";
const graphieUrl =
    "web+graphie://ka-perseus-graphie.s3.amazonaws.com/1e06f6d4071f30cee2cc3ccb7435b3a66a62fe3f";

export const Default: Story = {
    parameters: {
        /** This story doesn't provide a src url and so just shows a spinner.
         * Perhaps not useful, but for now we'll just disable snapshots. */
        chromatic: {disableSnapshot: true},
    },
};

export const SvgImageThatDoesntLoad: Story = {
    args: {
        height: 100,
        width: 500,
        src: "http://httpstat.us/200?sleep=1000000",
    },
    parameters: {
        /** This story never loads and so just shows a spinner. Perhaps not
         * useful, but for now we'll just disable snapshots. */
        chromatic: {disableSnapshot: true},
    },
};

export const SvgImageBasic: Story = {
    args: {src: svgUrl},
};

export const SvgImageWithFixedHeight: Story = {
    args: {height: 50, src: svgUrl},
};

export const SvgImageWithFixedWidth: Story = {
    args: {src: svgUrl, width: 50},
};

export const SvgImageWithExtraGraphieProps: Story = {
    args: {
        extraGraphie: {
            box: [200, 200],
            range: [
                [0, 10],
                [0, 10],
            ],
            labels: ["ok"],
        },
        src: svgUrl,
    },
};

export const PngImage: Story = {
    args: {src: imgUrl},
};

export const GraphieImage: Story = {
    args: {src: graphieUrl},
};
