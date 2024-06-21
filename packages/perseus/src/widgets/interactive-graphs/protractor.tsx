import * as React from "react";
import {useTransformVectorsToPixels} from "./graphs/use-transform";
import {vec} from "mafs";
import {pathBuilder} from "../../util/svg";
import {RefObject} from "react";
import {calculateAngleInDegrees} from "./graphs/utils";

type Props = {
    center: vec.Vector2
    rotationHandleOffset: vec.Vector2
    rotationHandleRef: RefObject<SVGGElement>
}

const protractorImage = "https://ka-perseus-graphie.s3.amazonaws.com/e9d032f2ab8b95979f674fbfa67056442ba1ff6a.png"
// The vector from the center of the protractor to the top left corner of the
// protractor image, in pixels. Used for positioning.
const centerToTopLeft: vec.Vector2 = [-180, -170]

export function Protractor(props: Props) {
    const {center, rotationHandleRef, rotationHandleOffset} = props;
    const [centerPx] = useTransformVectorsToPixels(center)
    const topLeftPx = vec.add(centerPx, centerToTopLeft)
    const angle = calculateAngleInDegrees(rotationHandleOffset) - 180

    return <g
        transform={`translate(${topLeftPx[0]}, ${topLeftPx[1]}), rotate(${angle})`}
        style={{transformOrigin: "180px 170px"}}
    >
        <image href={protractorImage} />
        <g transform={`translate(5, 170)`} ref={rotationHandleRef}>
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
