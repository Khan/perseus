import {vec} from "mafs";
import * as React from "react";

import {pathBuilder} from "../../../util/svg";

import {useTransformVectorsToPixels} from "../graphs/use-transform";
import {calculateAngleInDegrees} from "../graphs/utils";

import type {RefObject} from "react";

import "./protractor.css";
import {TARGET_SIZE} from "../utils";

type Props = {
    center: vec.Vector2;
    rotationHandleOffset: vec.Vector2;
    rotationHandleRef: RefObject<SVGGElement>;
};

const protractorImage =
    "https://ka-perseus-graphie.s3.amazonaws.com/e9d032f2ab8b95979f674fbfa67056442ba1ff6a.png";
// The vector from the center of the protractor to the top left corner of the
// protractor image, in pixels. Used for positioning.
const centerToTopLeft: vec.Vector2 = [-180, -170];
// The vector from the center of the protractor to the center of the rotation
// handle.
export const centerToRotationHandle: vec.Vector2 = [-176, -15];

export function Protractor(props: Props) {
    const {center, rotationHandleRef, rotationHandleOffset} = props;
    const [centerPx] = useTransformVectorsToPixels(center);
    const topLeftPx = vec.add(centerPx, centerToTopLeft);
    const angle = calculateAngleInDegrees(rotationHandleOffset) - calculateAngleInDegrees(centerToRotationHandle);

    return (
        <g
            transform={`translate(${topLeftPx[0]}, ${topLeftPx[1]}), rotate(${angle})`}
            style={{transformOrigin: "180px 170px"}}
        >
            <image href={protractorImage} />
            <g transform={`translate(5, 170)`} ref={rotationHandleRef}>
                <RotationArrow />
            </g>
        </g>
    );
}

function RotationArrow() {
    const radius = 175;
    const angleDeg = 10;
    const angleRad = degreesToRadians(angleDeg);
    const endX = radius * (1 - Math.cos(angleRad));
    const endY = radius * -Math.sin(angleRad);
    const rotationArrow = pathBuilder()
        .move(0, 0)
        .circularArc(radius, endX, endY, {sweep: true})
        .build();

    const arrowhead = pathBuilder().move(-8, 0).line(0, 10).line(8, 0).build();

    const targetRadius = TARGET_SIZE / 2;
    return (
        <g className="protractor-rotation-handle">
            <path className="protractor-rotation-handle-arrow-arc"
                d={rotationArrow}
            />
            <path className="protractor-rotation-handle-arrowhead"
                d={arrowhead}
            />
            <path className="protractor-rotation-handle-arrowhead"
                d={arrowhead}
                transform={`translate(${endX}, ${endY}), rotate(${180 + angleDeg})`}
            />
            {/* this invisible ellipse ensures that the click target for the
              * handle is at least 48x48 pixels */}
            <ellipse cx="0px" cy="-15px" rx={targetRadius} ry={targetRadius} fill="none"></ellipse>
        </g>
    );
}

function degreesToRadians(degrees) {
    return (degrees / 180) * Math.PI;
}
