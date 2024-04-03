import {MathJaxRenderer} from "@khanacademy/mathjax-renderer";
import * as React from "react";

import "@khanacademy/mathjax-renderer/src/css/mathjax.css";
import "@khanacademy/mathjax-renderer/src/css/safari-hacks.css";
import {useTransform} from "./graphs/use-transform";

import type {vec} from "mafs";

const tickSize = 10;

const tickStyle: React.CSSProperties = {
    stroke: "black",
    strokeWidth: 1,
};

const mathJaxRenderer = new MathJaxRenderer({
    // shouldFixUnicodeLayout ensures that non-ASCII text is correctly
    // measured and positioned in e.g. \overbrace and \underbrace expressions.
    // Set shouldFixUnicodeLayout to false if you're rendering in an
    // environment without a layout engine, e.g. jsdom.
    shouldFixUnicodeLayout: true,
    fontURL: "https://cdn.kastatic.org/fonts/mathjax",
});

const createMathJaxElement = (label: string) => {
    mathJaxRenderer.updateStyles();
    const {domElement} = mathJaxRenderer.render(label);
    return domElement;
};

const YGridTick = ({y}: {y: number}) => {
    const pointOnAxis: vec.Vector2 = [0, y];
    const [[xPosition, yPosition]] = useTransform(pointOnAxis);

    const labelString = y < 0 ? `\\llap{-}` + Math.abs(y) : y.toString();

    const mathJaxElement = createMathJaxElement(labelString);

    const labelXPosition = y === -1 ? startPtPx[0] - 22 : startPtPx[0] - 15;

    return (
        <g className="y-axis-ticks">
            <line
                x1={xPosition - tickSize / 2}
                y1={yPosition}
                x2={xPosition + tickSize / 2}
                y2={yPosition}
                style={tickStyle}
            />
            <foreignObject
                height={20}
                width={20}
                x={labelXPosition}
                y={startPtPx[1] - 15}
                dangerouslySetInnerHTML={{__html: mathJaxElement.outerHTML}}
            />
        </g>
    );
};

const XGridTick = ({x}: {x: number}) => {
    const pointOnAxis: vec.Vector2 = [x, 0];
    const [[xPosition, yPosition]] = useTransform(pointOnAxis);

    if (x === -1) {
        return (
            <g className="x-axis-ticks">
                <line
                    x1={startPtPx[0]}
                    y1={startPtPx[1]}
                    x2={endPtPx[0]}
                    y2={endPtPx[1]}
                    style={tickStyle}
                />
            </g>
        );
    }

    const labelString = x < 0 ? `\\llap{-}` + Math.abs(x) : x.toString();

    const mathJaxElement = createMathJaxElement(labelString);

    return (
        <g className="x-axis-ticks">
            <line
                x1={xPosition}
                y1={yPosition + tickSize / 2}
                x2={xPosition}
                y2={yPosition - tickSize / 2}
                style={tickStyle}
            />
            <foreignObject
                height={20}
                width={20}
                x={startPtPx[0] - 8}
                y={startPtPx[1] + 5}
                dangerouslySetInnerHTML={{__html: mathJaxElement.outerHTML}}
            />
        </g>
    );
};

export function generateTickLocations(
    tickStep: number,
    min: number,
    max: number,
): number[] {
    const ticks: number[] = [];
    for (let i = 0 + tickStep; i < max; i += tickStep) {
        ticks.push(i);
    }
    for (let i = 0 - tickStep; i > min; i -= tickStep) {
        ticks.push(i);
    }
    return ticks;
}

type Props = {
    tickStep: [number, number];
    range: [[number, number], [number, number]];
};

export const AxisTicks = (props: Props) => {
    const range = props.range;
    const [xMin, xMax] = range[0];
    const [yMin, yMax] = range[1];

    const yTickStep = props.tickStep[1];
    const xTickStep = props.tickStep[0];

    const yGridTicks = generateTickLocations(yTickStep, yMin, yMax);
    const xGridTicks = generateTickLocations(xTickStep, xMin, xMax);

    return (
        <g className="axis-ticks">
            {yGridTicks.map((y) => {
                return <YGridTick y={y} key={`y-grid-tick-${y}`} />;
            })}
            {xGridTicks.map((x) => {
                return <XGridTick x={x} key={`x-grid-tick-${x}`} />;
            })}
        </g>
    );
};
