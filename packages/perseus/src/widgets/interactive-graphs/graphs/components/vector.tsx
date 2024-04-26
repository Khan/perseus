import * as React from "react";

import {useTransformVectorsToPixels} from "../use-transform";

import {SVGLine} from "./svg-line";

import type {vec} from "mafs";

type Props = {
    tail: vec.Vector2;
    tip: vec.Vector2;
    color: string;
    style?: React.SVGProps<SVGLineElement>["style"];
};

export function Vector(props: Props) {
    const {tail, tip, color, style} = props;
    const [tailPx, tipPx] = useTransformVectorsToPixels(tail, tip);

    return (
        <g style={{stroke: color, strokeWidth: 2}}>
            <SVGLine start={tailPx} end={tipPx} style={style} />
        </g>
    );
}
