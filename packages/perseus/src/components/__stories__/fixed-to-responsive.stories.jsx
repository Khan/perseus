// @flow
import * as React from "react";

import staticUrl from "../../../shared-package/static-url.js";
import FixedToResponsive from "../fixed-to-responsive.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

const svgUrl = "https://www.khanacademy.org/images/ohnoes-concerned.svg";
const imgUrl = "https://www.khanacademy.org/images/hand-tree.new.png";

const sizeSmall = 200;
const sizeMedium = 600;
const sizeLarge = 1024;
const width = 1024;

export default ({
    title: "Perseus/Components/Fixed to Responsive",
}: Story);

export const SmallImageWithSmallContainer = (args: StoryArgs): React.Node => {
    return (
        <FixedToResponsive width={width} height={sizeSmall}>
            <img
                alt=""
                width={sizeSmall}
                height={sizeSmall}
                src={staticUrl(svgUrl)}
            />
        </FixedToResponsive>
    );
};

export const SmallImageWithMediumContainer = (args: StoryArgs): React.Node => {
    return (
        <FixedToResponsive width={width} height={sizeMedium}>
            <img
                alt=""
                width={sizeMedium}
                height={sizeMedium}
                src={staticUrl(svgUrl)}
            />
        </FixedToResponsive>
    );
};

export const LargeImageWithLargeContainer = (args: StoryArgs): React.Node => {
    return (
        <FixedToResponsive width={width} height={sizeLarge}>
            <img
                alt=""
                width={sizeLarge}
                height={sizeLarge}
                src={staticUrl(svgUrl)}
            />
        </FixedToResponsive>
    );
};

export const LargeImageWithSmallerContainer = (args: StoryArgs): React.Node => {
    return (
        <FixedToResponsive width={width} height={sizeSmall}>
            <img
                alt=""
                width={sizeLarge}
                height={sizeLarge}
                src={staticUrl(svgUrl)}
            />
        </FixedToResponsive>
    );
};

export const TwoOverlayedImagesInsteadOneResponsiveContainer = (
    args: StoryArgs,
): React.Node => {
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
                src={staticUrl(svgUrl)}
            />
        </FixedToResponsive>
    );
};

export const HeightConstrainingAnImage = (args: StoryArgs): React.Node => {
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
                src={staticUrl(svgUrl)}
            />
        </FixedToResponsive>
    );
};

export const AllowingFullBleed = (args: StoryArgs): React.Node => {
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
                src={staticUrl(svgUrl)}
            />
        </FixedToResponsive>
    );
};
