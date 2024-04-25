import * as React from "react";

import useGraphConfig from "../../reducer/use-graph-config";
import {pointToPixel, useTransformVectorsToPixels} from "../use-transform";

import type {vec} from "mafs";

// We only want to show the initial negative tick labels (e.g. -1) on each
// axis if the tickStep > gridStep, to ensure that these labels do not overlap.
// e.g. If gridStep = 1 and tickStep = 2, there are 2 grid lines for every 1 tick,
// which allows enough room for both these tick labels to render.
export const showTickLabel = (
    gridStep: number,
    tickStep: number,
    label: number,
): boolean => {
    const showLabel = tickStep > gridStep ? true : label !== -tickStep;
    return showLabel;
};

const YGridLabel = ({
    y,
    gridStep,
    tickStep,
    graphInfo,
}: {
    y: number;
    gridStep: number;
    tickStep: number;
    graphInfo: any; //STOPSHIP FIX LATER
}) => {
    const pointOnAxis: vec.Vector2 = [0, y];
    const pixelPoint = pointToPixel(pointOnAxis, graphInfo);
    console.log(pixelPoint, "pixelPoint");

    return (
        <>
            {showTickLabel(gridStep, tickStep, y) && (
                <span className="y-axis-tick">{y.toString()}</span>
            )}
        </>
    );
};

const XGridLabel = ({
    x,
    gridStep,
    tickStep,
    graphInfo,
}: {
    x: number;
    gridStep: number;
    tickStep: number;
    graphInfo: any; //STOPSHIP FIX LATER
}) => {
    const pointOnAxis: vec.Vector2 = [x, 0];

    return (
        <>
            {showTickLabel(gridStep, tickStep, x) && (
                <span className="x-axis-tick">{x.toString()}</span>
            )}
        </>
    );
};

export function generateTickLocations(
    tickStep: number,
    min: number,
    max: number,
): number[] {
    const positiveTicks: number[] = [];
    const negativeTicks: number[] = [];
    const ticks: number[] = [];

    //  ticks.reverse();
    console.log(tickStep, min, max, "tickStep, min, max");

    // Add ticks in the positive direction
    let i = Math.max(min, 0) + tickStep;
    for (i; min < i && i < max; i += tickStep) {
        positiveTicks.push(i);
    }

    // Add ticks in the negative direction
    i = Math.min(max, 0) - tickStep;
    for (let i = -tickStep; i > min; i -= tickStep) {
        negativeTicks.push(i);
    }

    // Reverse the positive ticks so that they are in the correct order
    positiveTicks.reverse();

    ticks.push(...positiveTicks, ...negativeTicks);

    return ticks;
}
export const AxisTickLabels = () => {
    const {tickStep, range, gridStep, width, height} = useGraphConfig();

    const graphInfo = {
        range,
        width,
        height,
    };

    const [xMin, xMax] = range[0];
    const [yMin, yMax] = range[1];

    const yTickStep = tickStep[1];
    const xTickStep = tickStep[0];

    console.log(xMax, xMin, yMax, yMin, "xMax, xMin, yMax, yMin");

    const yGridTicks = generateTickLocations(yTickStep, yMin, yMax);
    const xGridTicks = generateTickLocations(xTickStep, xMin, xMax);
    console.log(yGridTicks, xGridTicks, "yGridTicks, xGridTicks");

    return (
        <div className="axis-tick-labels">
            <div className="y-axis-tick-labels">
                {yGridTicks.map((y) => {
                    return (
                        <YGridLabel
                            y={y}
                            key={`y-grid-tick-${y}`}
                            gridStep={gridStep[0]}
                            tickStep={yTickStep}
                            graphInfo={graphInfo}
                        />
                    );
                })}
            </div>
            <div className="x-axis-tick-labels">
                {xGridTicks.map((x) => {
                    return (
                        <XGridLabel
                            x={x}
                            key={`x-grid-tick-${x}`}
                            gridStep={gridStep[1]}
                            tickStep={xTickStep}
                            graphInfo={graphInfo}
                        />
                    );
                })}
            </div>
        </div>
    );
};
