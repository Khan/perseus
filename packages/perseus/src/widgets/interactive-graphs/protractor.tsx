import * as React from "react";
import {useTransformVectorsToPixels} from "./graphs/use-transform";
import {vec} from "mafs";

type Props = {
    center: vec.Vector2
}

const protractorImage = "https://ka-perseus-graphie.s3.amazonaws.com/e9d032f2ab8b95979f674fbfa67056442ba1ff6a.png"
// The vector from the center of the protractor to the top left corner of the
// protractor image, in pixels. Used for positioning.
const centerToTopLeft: vec.Vector2 = [-180, -170]

export function Protractor(props: Props) {
    const {center} = props;
    const [centerPx] = useTransformVectorsToPixels(center)
    const topLeftPx = vec.add(centerPx, centerToTopLeft)
    return <image x={topLeftPx[0]} y={topLeftPx[1]} href={protractorImage} />
}
