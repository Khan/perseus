import * as React from "react";
import {vec} from "mafs";
import {Arrowhead} from "./arrowhead";
import {SVGLine} from "./svg-line";
import {useTransform} from "../use-transform";

type Props = {
    tail: vec.Vector2,
    tip: vec.Vector2,
    color: string,
}

export function Vector(props: Props) {
    const {tail, tip, color} = props;
    const [tailPx, tipPx] = useTransform(tail, tip)
    const direction = vec.sub(tip, tail)
    return (
        <g style={{stroke: color, strokeWidth: 2}}>
            <SVGLine start={tailPx} end={tipPx} />
            <Arrowhead x={tip[0]} y={tip[1]} rotate={angleDegrees(direction)} />
        </g>
    )
}

function angleDegrees([x, y]: vec.Vector2) {
    return Math.atan2(y, x) * 180 / Math.PI
}
