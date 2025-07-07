/**
 * Used to visualize vectors for both interative elements
 * as well as locked figures within an Interactive Graph widget.
 */
import {angles} from "@khanacademy/kmath";
import {vec} from "mafs";
import * as React from "react";

import useGraphConfig from "../../reducer/use-graph-config";
import {useTransformVectorsToPixels} from "../use-transform";

import {Arrowhead} from "./arrowhead";
import {SVGLine} from "./svg-line";

const {calculateAngleInDegrees} = angles;

type Props = {
    tail: vec.Vector2;
    tip: vec.Vector2;
    color?: string;
    strokeWidth?: number;
    style?: React.SVGProps<SVGLineElement>["style"];
    testId?: string;
};

export function Vector(props: Props) {
    const {interactiveColor} = useGraphConfig();
    const {
        tail,
        tip,
        color = interactiveColor,
        strokeWidth = 2,
        style,
        testId,
    } = props;
    const [tailPx, tipPx] = useTransformVectorsToPixels(tail, tip);
    const direction = vec.sub(tipPx, tailPx);
    const angle = calculateAngleInDegrees(direction);

    return (
        <g
            style={{
                stroke: color,
                strokeWidth,
            }}
            data-testid={testId}
        >
            <SVGLine start={tailPx} end={tipPx} style={style} />
            <Arrowhead
                angle={angle}
                tip={tip}
                color={color}
                strokeWidth={strokeWidth}
            />
        </g>
    );
}
