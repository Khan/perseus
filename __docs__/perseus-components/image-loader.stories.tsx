import * as React from "react";

import ImageLoader from "../../packages/perseus/src/components/image-loader";

import type {Meta, StoryObj} from "@storybook/react-vite";

const svgUrl = "http://www.khanacademy.org/images/ohnoes-concerned.svg";
const imgUrl = "https://www.khanacademy.org/images/hand-tree.new.png";

const meta: Meta = {
    title: "Perseus/Components/Image Loader",
    component: ImageLoader,
    args: {
        preloader: null,
        imgProps: {
            alt: "ALT",
        },
        onUpdate: () => {},
    },
    parameters: {
        chromatic: {
            // This component only deals with loading images and providing a
            // fallback if it fails. This is not very useful to snapshot so
            // we're disabling it.
            disableSnapshot: true,
        },
    },
};
export default meta;

type Story = StoryObj<typeof ImageLoader>;

export const SvgImage: Story = {
    args: {
        src: svgUrl,
    },
};

export const PngImage: Story = {
    args: {src: imgUrl},
};

export const InvalidImageWithChildrenForFailedLoading: Story = {
    args: {
        src: "http://abcdefiahofshiaof.noway.badimage.com",
        children: <span>You can see me! The image failed to load.</span>,
    },
};
