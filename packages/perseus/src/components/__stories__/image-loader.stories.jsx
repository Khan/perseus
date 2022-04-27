// @flow
import * as React from "react";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

import ImageLoader from "../image-loader.jsx";

const svgUrl = "http://www.khanacademy.org/images/ohnoes-concerned.svg";
const imgUrl = "https://www.khanacademy.org/images/hand-tree.new.png";

export default ({
    title: "Perseus/Components/Image Loader",
}: Story);

export const SvgImage = (args: StoryArgs): React.Node => {
    return (
        <ImageLoader
            src={svgUrl}
            preloader={null}
            imgProps={{
                alt: "ALT",
            }}
            onUpdate={() => {}}
        />
    );
};

export const PngImage = (args: StoryArgs): React.Node => {
    return (
        <ImageLoader
            src={imgUrl}
            preloader={null}
            imgProps={{
                alt: "ALT",
            }}
            onUpdate={() => {}}
        />
    );
};

export const InvalidImageWithChildrenForFailedLoading = (
    args: StoryArgs,
): React.Node => {
    return (
        <ImageLoader
            src="http://abcdefiahofshiaof.noway.badimage.com"
            preloader={null}
            imgProps={{
                alt: "ALT",
            }}
            onUpdate={() => {}}
        >
            <span>You can see me! The image failed to load.</span>
        </ImageLoader>
    );
};
