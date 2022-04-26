// @flow
import * as React from "react";

import SvgImage from "../svg-image.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Components/SVG Image",
}: Story);

const svgUrl = "http://www.khanacademy.org/images/ohnoes-concerned.svg";
const imgUrl = "https://www.khanacademy.org/images/hand-tree.new.png";
const graphieUrl =
    "web+graphie://ka-perseus-graphie.s3.amazonaws.com/1e06f6d4071f30cee2cc3ccb7435b3a66a62fe3f";

export const MostlyEmptyPropsObject = (args: StoryArgs): React.Node => {
    return <SvgImage alt="ALT" />;
};

export const SvgImageBasic = (args: StoryArgs): React.Node => {
    return <SvgImage src={svgUrl} alt="ALT" />;
};

export const SvgImageWithFixedHeight = (args: StoryArgs): React.Node => {
    return <SvgImage height={50} src={svgUrl} alt="ALT" />;
};

export const SvgImageWithFixedWidth = (args: StoryArgs): React.Node => {
    return <SvgImage src={svgUrl} width={50} alt="ALT" />;
};

export const SvgImageWithExtraGraphieProps = (args: StoryArgs): React.Node => {
    return (
        <SvgImage
            extraGraphie={{
                box: [200, 200],
                range: [
                    [0, 10],
                    [0, 10],
                ],
                labels: ["ok"],
            }}
            src={svgUrl}
            alt="ALT"
        />
    );
};

export const PngImage = (args: StoryArgs): React.Node => {
    return <SvgImage src={imgUrl} alt="ALT" />;
};

export const GraphieImage = (args: StoryArgs): React.Node => {
    return <SvgImage src={graphieUrl} alt="ALT" />;
};
