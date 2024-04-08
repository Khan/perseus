import React from "react";

import useGraphState from "./reducer/use-graph-state";
import {Interval, useTransformContext, vec} from "mafs";
import {useTransform} from "./graphs/use-transform";

function Labels() {
    return <></>;
}

export default function AxisLabels() {
    const {state} = useGraphState();

    const point: vec.Vector2 = [0, state.range[1][1]];

    const [[x, y]] = useTransform(point);
    return <circle cx={x} cy={y} r={20} />;
}
// take the whole chart and transform it!
// Need range and transform
// Could add legacy grid to svg/mafs -> potentially more correct (vector/points/coordinates/svg vs bitmap/the image/pixel info)
// Cntain the mafs stuff within clip path so the excess graph gets cut off, and then you can show the label outside
// maybe 0 minus the xmin to determine how far over the y axis is? Want the label to be on top of that line
// ... could just do (0,yMax) for the y label

/*
export interface InteractiveGraphStateCommon {
    hasBeenInteractedWith: boolean;
    // range = [[xMin, xMax], [yMin, yMax]] in Cartesian units
    range: [Interval, Interval];
    // snapStep = [xStep, yStep] in Cartesian units
    snapStep: vec.Vector2;
}


label padding is 7px
graph padding is 25 px to the top and right
*/
