import {vec} from "mafs";
import * as React from "react";

import {useTransformVectorsToPixels} from "../use-transform";
import {calculateAngleInDegrees} from "../utils";

import {Arrowhead} from "./arrowhead";
import {SVGLine} from "./svg-line";

type Props = {
    tail: vec.Vector2;
    tip: vec.Vector2;
    color: string;
    style?: React.SVGProps<SVGLineElement>["style"];
};

export function Vector(props: Props) {
    const {tail, tip, color, style} = props;
    const [tailPx, tipPx] = useTransformVectorsToPixels(tail, tip);
    const direction = vec.sub(tip, tail);
    const angle = calculateAngleInDegrees(direction);

    return (
        <g style={{stroke: color, strokeWidth: 2}}>
            <SVGLine start={tailPx} end={tipPx} style={style} />
            <Arrowhead angle={angle} tip={tip} color={color} />
        </g>
    );
}
