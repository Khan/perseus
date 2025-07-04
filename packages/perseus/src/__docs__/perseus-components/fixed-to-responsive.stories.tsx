import * as React from "react";

import {getDependencies} from "../../dependencies";
import FixedToResponsive from "../../components/fixed-to-responsive";

import type {Meta, StoryObj} from "@storybook/react-vite";

type StoryArgs = StoryObj<FixedToResponsive>;

type Story = Meta<FixedToResponsive>;

const svgUrl = "https://www.khanacademy.org/images/ohnoes-concerned.svg";
const imgUrl = "https://www.khanacademy.org/images/hand-tree.new.png";

const sizeSmall = 200;
const sizeMedium = 600;
const sizeLarge = 1024;
const width = 1024;

export default {
    title: "Perseus/Components/Fixed to Responsive",
} as Story;

export const SmallImageWithSmallContainer = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <FixedToResponsive width={width} height={sizeSmall}>
            <img
                alt=""
                width={sizeSmall}
                height={sizeSmall}
                src={getDependencies().staticUrl(svgUrl)}
            />
        </FixedToResponsive>
    );
};

export const SmallImageWithMediumContainer = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <FixedToResponsive width={width} height={sizeMedium}>
            <img
                alt=""
                width={sizeMedium}
                height={sizeMedium}
                src={getDependencies().staticUrl(svgUrl)}
            />
        </FixedToResponsive>
    );
};

export const LargeImageWithLargeContainer = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <FixedToResponsive width={width} height={sizeLarge}>
            <img
                alt=""
                width={sizeLarge}
                height={sizeLarge}
                src={getDependencies().staticUrl(svgUrl)}
            />
        </FixedToResponsive>
    );
};

export const LargeImageWithSmallerContainer = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <FixedToResponsive width={width} height={sizeSmall}>
            <img
                alt=""
                width={sizeLarge}
                height={sizeLarge}
                src={getDependencies().staticUrl(svgUrl)}
            />
        </FixedToResponsive>
    );
};

export const TwoOverlayedImagesInsteadOneResponsiveContainer = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <FixedToResponsive width={width} height={sizeSmall}>
            <img
                alt=""
                key={1}
                width={sizeSmall}
                height={sizeSmall}
                src={imgUrl}
            />
            <img
                alt=""
                key={2}
                width={sizeSmall}
                height={sizeSmall}
                src={getDependencies().staticUrl(svgUrl)}
            />
        </FixedToResponsive>
    );
};

export const HeightConstrainingAnImage = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <FixedToResponsive
            width={width}
            height={sizeLarge}
            constrainHeight={true}
        >
            <img
                alt=""
                width={sizeLarge}
                height={sizeLarge}
                src={getDependencies().staticUrl(svgUrl)}
            />
        </FixedToResponsive>
    );
};

export const AllowingFullBleed = (args: StoryArgs): React.ReactElement => {
    return (
        <FixedToResponsive
            width={width}
            height={sizeMedium}
            allowFullBleed={true}
        >
            <img
                alt=""
                width={sizeMedium}
                height={sizeMedium}
                src={getDependencies().staticUrl(svgUrl)}
            />
        </FixedToResponsive>
    );
};
