import * as React from "react";
import {useTransformVectorsToPixels} from "./graphs/use-transform";
import {vec} from "mafs";
import {pathBuilder} from "../../util/svg";

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

    return <g>
        <image x={topLeftPx[0]} y={topLeftPx[1]} href={protractorImage} />
        <g transform={`translate(${centerPx[0] - 175}, ${centerPx[1]})`}>
            <RotationArrow />
        </g>
    </g>
}

function RotationArrow() {
    const radius = 175
    const angleDeg = 10;
    const angleRad = degreesToRadians(angleDeg);
    const endX = radius * (1 - Math.cos(angleRad));
    const endY = radius * -Math.sin(angleRad);
    const rotationArrow = pathBuilder()
        .move(0, 0)
        .circularArc(
            radius,
            endX,
            endY,
            {sweep: true})
        .build();

    const arrowhead = pathBuilder()
        .move(-8, 0)
        .line(0, 10)
        .line(8, 0)
        .build();

    return <g>
        {/* `strokeLinecap: square` prevents a hairline crack from appearing
          * between the arc and the arrowheads
          */}
        <path d={rotationArrow} style={{stroke: "var(--mafs-blue)", fill: "none", strokeWidth: 8, strokeLinecap: "square"}} />
        <path d={arrowhead} style={{fill: "var(--mafs-blue)", stroke: "none"}} />
        <path d={arrowhead} transform={`translate(${endX}, ${endY}), rotate(${180 + angleDeg})`} style={{fill: "var(--mafs-blue)", stroke: "none"}} />
    </g>
}

function degreesToRadians(degrees) {
    return degrees / 180 * Math.PI
}
