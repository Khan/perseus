import * as React from "react";

type StoryArgs = Record<any, any>;

type Story = {
    title: string
};

import ImageLoader from '../image-loader';

const svgUrl = "http://www.khanacademy.org/images/ohnoes-concerned.svg";
const imgUrl = "https://www.khanacademy.org/images/hand-tree.new.png";

export default {
    title: "Perseus/Components/Image Loader",
} as Story;

export const SvgImage: React.FC<StoryArgs> = (args): React.ReactElement => {
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

export const PngImage: React.FC<StoryArgs> = (args): React.ReactElement => {
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

export const InvalidImageWithChildrenForFailedLoading: React.FC<StoryArgs> = (args): React.ReactElement => {
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
