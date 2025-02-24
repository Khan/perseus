import {color} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import useGraphConfig from "../../reducer/use-graph-config";
import {useTransformVectorsToPixels} from "../use-transform";

import type {Coord} from "@khanacademy/perseus-core";

type Props = {
    point: Coord;
};

export default function Hairlines(props: Props) {
    const {point} = props;
    const {range} = useGraphConfig();
    const [[xMin, xMax], [yMin, yMax]] = range;
    const [[x, y]] = useTransformVectorsToPixels(point);

    const [[verticalStartX]] = useTransformVectorsToPixels([xMin, 0]);
    const [[verticalEndX]] = useTransformVectorsToPixels([xMax, 0]);
    const [[_, horizontalStartY]] = useTransformVectorsToPixels([0, yMin]);
    const [[__, horizontalEndY]] = useTransformVectorsToPixels([0, yMax]);

    return (
        <g>
            <line
                x1={verticalStartX}
                y1={y}
                x2={verticalEndX}
                y2={y}
                stroke={color.blue}
            />
            <line
                x1={x}
                y1={horizontalStartY}
                x2={x}
                y2={horizontalEndY}
                stroke={color.blue}
            />
        </g>
    );
}
