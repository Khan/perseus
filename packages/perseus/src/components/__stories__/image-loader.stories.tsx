import * as React from "react";

import ImageLoader from "../image-loader";

import type {Meta, StoryObj} from "@storybook/react";

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
