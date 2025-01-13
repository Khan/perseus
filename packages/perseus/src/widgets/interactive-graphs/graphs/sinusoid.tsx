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
        const coordsObj = {
            x: srFormatNumber(coordinate[0], locale),
            y: srFormatNumber(coordinate[1], locale),
        };

        return index === 1
            ? strings.srSinusoidExtremumPoint(coordsObj)
            : strings.srSinusoidMidlineIntersection(coordsObj);
    }

    function getWholeGraphDescription(): string {
        const minMaxVals = calculateMinAndMaxValues(
            coeffRef.current.amplitude,
            coeffRef.current.verticalOffset,
        );
        const minMaxCoords = calculateStartAndEndPoints(
            coeffRef.current.amplitude,
            coeffRef.current.phase,
        );
        const minCoordStringWithPi = formatAsMultipleOfPi(
            minMaxCoords[0],
            locale,
        );
        const maxCoordStringWithPi = formatAsMultipleOfPi(
            minMaxCoords[1],
            locale,
        );
        const descriptionObj = {
            minValue: srFormatNumber(minMaxVals[0], locale),
            maxValue: srFormatNumber(minMaxVals[1], locale),
            xMinCoord: minCoordStringWithPi,
            xMaxCoord: maxCoordStringWithPi,
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
 * @returns array of min and max values
 */
export function calculateMinAndMaxValues(
    amplitude: number,
    verticalOffset: number,
) {
    const absAmp = Math.abs(amplitude);
    return [-absAmp + verticalOffset, absAmp + verticalOffset];
}

/**
 * @param angularFrequency Determines how stretched or compressed the graph is
 * @returns Period of a sinusoid graph as a number
 */
export function calculatePeriod(angularFrequency: number) {
    return (2 * Math.PI) / Math.abs(angularFrequency);
}

/**
 * Formats integer or fractional multiples of PI.
 * @param input - number
 * @param locale - i18n locale
 * @returns integer or fractional multiples of PI. if input is not a multiple of PI, returns input formatted as a sr string
 */

export function formatAsMultipleOfPi(input: number, locale: string): string {
    const multiple = input / Math.PI;
    const faultTolerance = 1e-15; // Math.PI goes to 15 decimal places

    if (input === 0 || multiple === 0) {
        return `0`;
    }

    // check for integer multiple of PI
    if (Math.abs(multiple - Math.round(multiple)) < faultTolerance) {
        const roundedMultiple = Math.round(multiple);
        if (roundedMultiple === 1 || roundedMultiple === -1) {
            return 'pi';
        }

        return `${Math.round(multiple)} pi`;
    }

    // Check for fractional multiple of PI
    const maxDenominator = 1000;

    for (let denominator = 1; denominator < maxDenominator; denominator++) {
        const numerator = Math.round(multiple * denominator);
        if (Math.abs(multiple - numerator / denominator) < faultTolerance) {
            return `${numerator}/${denominator} pi`;
        }
    }

    return `${srFormatNumber(input, locale)}`;
}

/**
 * Calculates the start and end points for a full cycle of a sinusoid wave
 * @param angularFrequency Determines how stretched or compressed the graph is
 * @param phase Determines how to wave is shifted horizontally
 * @returns array of start and end points for the full cycle
 */
export function calculateStartAndEndPoints(
    angularFrequency: number,
    phase: number,
) {
    const phaseShift = -phase / angularFrequency;
    const period = calculatePeriod(angularFrequency);
    return [phaseShift, phaseShift + period];
}
