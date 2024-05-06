import * as React from "react";

import useGraphConfig from "../../reducer/use-graph-config";
import {pointToPixel} from "../use-transform";

import type {GraphDimensions} from "../../types";
import type {vec} from "mafs";

type ShowTickLabelProps = {
    // The gridStep is the number of units between each grid line
    gridStep: number;
    // The tickStep is the number of units between each tick label
    tickStep: number;
    // The label for the axis tick
    label: number;
    // The relevant edge of the graph (either the width for xLabels or height or yLabels)
    graphEdge: number;
    // The relevant position of the tick label in pixels (either the x or y position)
    position: number;
};

type GridLabel = {
    label: number;
    gridStep: number;
    tickStep: number;
    graphInfo: GraphDimensions;
};

const tickPadding = 5;

export const showTickLabel = ({
    gridStep,
    tickStep,
    label,
    graphEdge,
    position,
}: ShowTickLabelProps): boolean => {
    let showLabel = true;

    // We only want to show the initial negative tick labels (e.g. -1) on each
    // axis if the tickStep > gridStep, to ensure that these labels do not overlap.
    // e.g. If gridStep = 1 and tickStep = 2, there are 2 grid lines for every 1 tick,
    // which allows enough room for both these tick labels to render.
    showLabel = tickStep > gridStep ? true : label !== -tickStep;

    // If the tick label position is greater than the relevant edge of the graph, don't render it
    if (position <= -graphEdge || position >= graphEdge) {
        showLabel = false;
    }

    return showLabel;
};

const YGridLabel = ({label, gridStep, tickStep, graphInfo}: GridLabel) => {
    const pointOnAxis: vec.Vector2 = [0, label];
    const pixelPoint = pointToPixel(pointOnAxis, graphInfo);

    // If the axis is outside of the graphs viewbox/range we want to make sure
    // the labels are still visible by clamping them to the edge of the graph
    const leftPadding = 40;
    const left = Math.min(
        Math.max(pixelPoint[0] - leftPadding - tickPadding, -leftPadding),
        graphInfo.width + 5,
    );

    // Provide a little padding above the tick label
    const topPadding = 7;
    const top = pixelPoint[1] - topPadding;

    // If the label is on the right edge of the graph, text-align to the left
    const textAlign = left === graphInfo.width + 5 ? "left" : "right";

    // If the label requires padding for the negative sign, add it
    // This allows us to ensure that labels are placed correctly when left-aligned
    const negativeNumberPadding = label < 0 ? "12px" : "0px";

    // Remove the negative sign from the label string as it is handled in the data-content attribute
    const labelString = Math.abs(label).toString();

    const styles = {
        left,
        top,
        "text-align": textAlign,
        "--padding": negativeNumberPadding,
    };

    return (
        <>
            {showTickLabel({
                gridStep,
                tickStep,
                label,
                graphEdge: graphInfo.height,
                position: pixelPoint[1],
            }) && (
                <span
                    className="y-axis-tick-label"
                    style={styles}
                    data-content={label < 0 ? "−" : null}
                >
                    {labelString}
                </span>
            )}
        </>
    );
};

const XGridLabel = ({label, gridStep, tickStep, graphInfo}: GridLabel) => {
    const pointOnAxis: vec.Vector2 = [label, 0];
    const pixelPoint = pointToPixel(pointOnAxis, graphInfo);

    // If the label are outside of the graphs viewbox/range we want to make sure the
    // labels are still visible by clamping them to the appropriate edge of the graph
    const topPadding = graphInfo.range[1][1] < 0 ? -16 : 7;
    const top = Math.min(
        Math.max(pixelPoint[1] + topPadding + tickPadding, topPadding),
        graphInfo.height + topPadding,
    );

    // Provide a little padding to the left of the tick label
    const leftPadding = 22;
    const left = pixelPoint[0] - leftPadding;

    // Remove the negative sign from the label string as it is handled in the data-content attribute
    const labelString = Math.abs(label).toString();

    // For the x-axis, we want to make sure the padding of the labels is consistent
    const padding = "12px";

    const styles = {
        left,
        top,
        "--padding": padding,
    };

    return (
        <>
            {showTickLabel({
                gridStep,
                tickStep,
                label: label,
                graphEdge: graphInfo.width,
                position: pixelPoint[0],
            }) && (
                <span
                    className="x-axis-tick-label"
                    style={styles}
                    data-content={label < 0 ? "−" : undefined}
                >
                    {labelString}
                </span>
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

    // Add ticks on the positive axis
    // Start at the first tick after 0 or the minimum value,
    // taking into account that the graph may be zoomed in on the positive axis
    let i = Math.max(min, 0) + tickStep;
    for (i; min < i && i < max; i += tickStep) {
        positiveTicks.push(i);
    }

    // Add ticks on the negative axis
    // Start at the first tick before 0 or the maximum value,
    // taking into account that the graph may be zoomed in on the negative axis
    i = Math.min(max, 0) - tickStep;
    for (i; i > min; i -= tickStep) {
        negativeTicks.push(i);
    }

    // Reverse the positive ticks so that they are in the correct render order
    positiveTicks.reverse();

    ticks.push(...positiveTicks, ...negativeTicks);
    return ticks;
}
export const AxisTickLabels = () => {
    const {tickStep, range, gridStep, width, height} = useGraphConfig();

    const graphInfo: GraphDimensions = {
        range,
        width,
        height,
    };

    const [xMin, xMax] = range[0];
    const [yMin, yMax] = range[1];

    const yTickStep = tickStep[1];
    const xTickStep = tickStep[0];

    const yGridTicks = generateTickLocations(yTickStep, yMin, yMax);
    const xGridTicks = generateTickLocations(xTickStep, xMin, xMax);

    return (
        <div className="axis-tick-labels">
            <div className="y-axis-tick-labels" style={{height: height}}>
                {yGridTicks.map((label) => {
                    return (
                        <YGridLabel
                            label={label}
                            key={`y-grid-tick-${label}`}
                            gridStep={gridStep[1]}
                            tickStep={yTickStep}
                            graphInfo={graphInfo}
                        />
                    );
                })}
            </div>
            <div className="x-axis-tick-labels" style={{width: width}}>
                {xGridTicks.map((label) => {
                    return (
                        <XGridLabel
                            label={label}
                            key={`x-grid-tick-${label}`}
                            gridStep={gridStep[0]}
                            tickStep={xTickStep}
                            graphInfo={graphInfo}
                        />
                    );
                })}
            </div>
        </div>
    );
};
