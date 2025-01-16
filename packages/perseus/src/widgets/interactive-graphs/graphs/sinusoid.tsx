import {color} from "@khanacademy/wonder-blocks-tokens";
import {Plot, type vec} from "mafs";
import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {X, Y} from "../math";
import {actions} from "../reducer/interactive-graph-action";

import {MovablePoint} from "./components/movable-point";
import {srFormatNumber} from "./screenreader-text";

import type {Coord} from "../../../interactive2/types";
import type {
    SinusoidGraphState,
    MafsGraphProps,
    Dispatch,
    InteractiveGraphElementSuite,
} from "../types";

export function renderSinusoidGraph(
    state: SinusoidGraphState,
    dispatch: Dispatch,
): InteractiveGraphElementSuite {
    return {
        graph: <SinusoidGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: null,
    };
}

type SinusoidGraphProps = MafsGraphProps<SinusoidGraphState>;

export type SineCoefficient = {
    amplitude: number;
    angularFrequency: number;
    phase: number;
    verticalOffset: number;
};

function SinusoidGraph(props: SinusoidGraphProps) {
    const {dispatch, graphState} = props;

    // Destructure the coordinates from the graph state
    // Note: The order of the coordinates is important:
    // The coords[0] is the root and the coords[1] is the first peak
    const {coords} = graphState;

    // The coefficients are used to calculate the sinusoid equation, plot the graph, and to indicate
    // to content creators the currently selected "correct answer" in the Content Editor.
    // While we should technically never have invalid coordinates, we want to ensure that
    // we have a fallback so that the graph can still be plotted without crashing.
    const coeffRef = React.useRef<SineCoefficient>({
        amplitude: 1,
        angularFrequency: 1,
        phase: 1,
        verticalOffset: 0,
    });
    const coeffs = getSinusoidCoefficients(coords);

    // If the coefficients are valid, update the reference
    if (coeffs !== undefined) {
        coeffRef.current = coeffs;
    }

    const {strings, locale} = usePerseusI18n();
    const uniqueId = React.useId();

    function getMoveablePointAriaLabel(
        index: number,
        coordinate: vec.Vector2,
    ): string {
        const x = coordinate[0];
        const y = coordinate[1];

        const convertedXCoordinate = formatXCoordsToPi(x);

        const coordsObj = {
            x: convertedXCoordinate,
            y: srFormatNumber(y, locale),
        };

        return index === 1
            ? strings.srSinusoidExtremumPoint(coordsObj)
            : strings.srSinusoidMidlineIntersection(coordsObj);
    }

    function getWholeGraphDescription(): string {
        const minMaxYVals = calculateMinAndMaxYValues(
            coeffRef.current.amplitude,
            coeffRef.current.verticalOffset,
        );

        // coords[1] is associated to the extremum point
        const startEndCoords = calculateFullCycleStartAndEndCoords(
            minMaxYVals[0],
            coords[1],
            coeffRef.current.angularFrequency,
            locale,
        );

        const startCoords = startEndCoords[0];
        const endCoords = startEndCoords[1];

        const descriptionObj = {
            minValue: srFormatNumber(minMaxYVals[0], locale),
            maxValue: srFormatNumber(minMaxYVals[1], locale),
            xStartCoord: startCoords[0],
            yStartCoord: startCoords[1],
            xEndCoord: endCoords[0],
            yEndCoord: endCoords[1],
        };
        return strings.srSinusoidDescription(descriptionObj);
    }

    return (
        <g
            aria-label={strings.srSinusoidGraphAriaLabel}
            aria-describedby={`sinusoid-description-${uniqueId}`}
        >
            <Plot.OfX
                y={(x) => computeSine(x, coeffRef.current)}
                color={color.blue}
            />
            {coords.map((coord, i) => (
                <MovablePoint
                    key={"point-" + i}
                    ariaLabel={getMoveablePointAriaLabel(i, coord)}
                    point={coord}
                    sequenceNumber={i + 1}
                    onMove={(destination) =>
                        dispatch(actions.sinusoid.movePoint(i, destination))
                    }
                />
            ))}
            <g id={`sinusoid-description-${uniqueId}`}>
                {getWholeGraphDescription()}
            </g>
        </g>
    );
}

// Plot a sinusoid of the form: f(x) = a * sin(b * x - c) + d
export const computeSine = function (
    x: number, // x-coordinate
    sinusoidCoefficients: SineCoefficient,
) {
    // Break down the coefficients for the sine function to improve readability
    const {
        amplitude: a,
        angularFrequency: b,
        phase: c,
        verticalOffset: d,
    } = sinusoidCoefficients;

    return a * Math.sin(b * x - c) + d;
};

export const getSinusoidCoefficients = (
    coords: ReadonlyArray<Coord>,
): SineCoefficient | undefined => {
    // It's assumed that p1 is the root and p2 is the first peak
    const p1 = coords[0];
    const p2 = coords[1];

    // If the x-coordinates are the same, we are unable to calculate the coefficients
    if (p2[X] === p1[X]) {
        return;
    }

    // Resulting coefficients are canonical for this sine curve
    const amplitude = p2[Y] - p1[Y];
    const angularFrequency = Math.PI / (2 * (p2[X] - p1[X]));
    const phase = p1[X] * angularFrequency;
    const verticalOffset = p1[Y];

    return {amplitude, angularFrequency, phase, verticalOffset};
};

/**
 * Sine and cosine oscillate between [-1, 1], which is scaled by the graph's amplitude [-A, A] and shifted by the vertical offset [-A+D, A+D]
 * @param amplitude Distance from the center to either extreme
 * @param verticalOffset aka vertical shift - moves the range up or down
 * @returns array [minYVal, maxYVal]
 */
export function calculateMinAndMaxYValues(
    amplitude: number,
    verticalOffset: number,
) {
    const absAmp = Math.abs(amplitude);
    return [-absAmp + verticalOffset, absAmp + verticalOffset];
}

/**
 * Calculates the start and end coordinates for a full cycle of a sinusoid wave by adding or subtracting the period of the graph
 * from the extremum point. If the extremum point provided is the max, subtract the period, if the extremum point is the min, add the period
 * @param minVal Y coordinate associated to the minimum value on the graph
 * @param coords Extremum coordinates for the graph
 * @param angularFrequency Determines how stretched or compressed the graph is
 * @returns string matrix of start and end coordinates for the full cycle
 */
export function calculateFullCycleStartAndEndCoords(
    minVal: number,
    coords: vec.Vector2,
    angularFrequency: number,
    locale: string,
) {
    const [x, y] = coords;
    const formattedCoords = [
        srFormatNumber(x, locale),
        srFormatNumber(y, locale),
    ];
    const period = (2 * Math.PI) / Math.abs(angularFrequency);
    const isMinVal = y === minVal;
    const adjustedX = isMinVal ? x + period : x - period;
    const formattedXValue = formatXCoordsToPi(adjustedX);

    const startValCoords = isMinVal
        ? formattedCoords
        : [formattedXValue, srFormatNumber(y, locale)];
    const endValCoords = isMinVal
        ? [formattedXValue, srFormatNumber(y, locale)]
        : formattedCoords;

    return [startValCoords, endValCoords];
}

export function formatXCoordsToPi(x: number) {
    if (x === 0) {
        return `0`;
    }
    if (x % 2 === 0) {
        return `${x / 2} pi`;
    }
    if (x % 1 === 0) {
        return `${x}/2 pi`;
    }
    return `${x * 2}/4 pi`;
}
