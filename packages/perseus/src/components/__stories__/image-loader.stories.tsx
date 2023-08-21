/* eslint-disable @khanacademy/ts-no-error-suppressions */
import * as React from "react";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

import ImageLoader from "../image-loader";

const svgUrl = "http://www.khanacademy.org/images/ohnoes-concerned.svg";
const imgUrl = "https://www.khanacademy.org/images/hand-tree.new.png";

export default {
    title: "Perseus/Components/Image Loader",
} as Story;

export const SvgImage = (args: StoryArgs): React.ReactElement => {
    return (
        <ImageLoader
            src={svgUrl}
            // @ts-expect-error [FEI-5003] - TS2322 - Type 'null' is not assignable to type '() => ReactElement<any, string | JSXElementConstructor<any>> | null | undefined'.
            preloader={null}
            imgProps={{
                alt: "ALT",
            }}
            onUpdate={() => {}}
        />
    );
};

export const PngImage = (args: StoryArgs): React.ReactElement => {
    return (
        <ImageLoader
            src={imgUrl}
            // @ts-expect-error [FEI-5003] - TS2322 - Type 'null' is not assignable to type '() => ReactElement<any, string | JSXElementConstructor<any>> | null | undefined'.
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
): React.ReactElement => {
    return (
        <ImageLoader
            src="http://abcdefiahofshiaof.noway.badimage.com"
            // @ts-expect-error [FEI-5003] - TS2322 - Type 'null' is not assignable to type '() => ReactElement<any, string | JSXElementConstructor<any>> | null | undefined'.
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
