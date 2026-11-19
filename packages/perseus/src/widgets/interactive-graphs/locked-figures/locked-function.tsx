import * as KAS from "@khanacademy/kas";
import {lockedFigureColors} from "@khanacademy/perseus-core";
import {Plot} from "mafs";
import * as React from "react";
import {useState, useEffect} from "react";

import {expand, intervalSize} from "../../../util/interval";
import {clamp, X, Y} from "../math";
import useGraphConfig from "../reducer/use-graph-config";

import {clampDomain, dashedStrokeStyle, strokeWeights} from "./utils";

import type {Interval} from "../../../util/interval";
import type {LockedFunctionType} from "@khanacademy/perseus-core";

const LockedFunction = (props: LockedFunctionType) => {
    const {range: graphBounds} = useGraphConfig();
    type Equation = {
        [k: string]: any;
        eval: (number) => number;
    };
    const [equation, setEquation]: [
        Equation | undefined,
        React.Dispatch<React.SetStateAction<Equation | undefined>>,
    ] = useState();
    const {color, strokeStyle, weight, directionalAxis, domain} = props;
    const plotProps = {
        color: lockedFigureColors[color],
        style: strokeStyle,
        weight: strokeWeights[weight],
    };

    const hasAria = !!props.ariaLabel;

    useEffect(() => {
        // Parsing the equation in a "useEffect" hook saves about 2ms each frame
        //    when the learner is interacting with the graph (i.e. moving points).
        setEquation(KAS.parse(props.equation).expr);
    }, [props.equation]);

    if (typeof equation === "undefined") {
        return null;
    }

    const clampedDomain =
        directionalAxis === "x"
            ? clampDomain(domain, graphBounds[X])
            : clampDomain(domain, graphBounds[Y]);

    // Clamp the range of the graphed function to a reasonable interval which
    // is determined by the bounds of the graph. Clamping ensures that we do
    // not attempt to graph very large values when a function is asymptotic
    // (Safari can't handle big numbers). Expanding the range beyond the graph
    // bounds ensures that the clamping is invisible to the learner. If we just
    // clamped to the graph bounds, there would be an erroneous line along the
    // edge of the graph where the function is outside the graph bounds.
    const clampedRange: Interval =
        directionalAxis === "x"
            ? expand(graphBounds[Y], intervalSize(graphBounds[Y]))
            : expand(graphBounds[X], intervalSize(graphBounds[X]));

    // The domain entirely is outside the bounds of the graph. Don't render.
    if (clampedDomain === null) {
        return null;
    }

    return (
        <g
            className="locked-function"
            aria-label={hasAria ? props.ariaLabel : undefined}
            aria-hidden={!hasAria}
            role="img"
            // Weight-scaled dash pattern for dashed figures (see dashedStrokeStyle).
            style={dashedStrokeStyle(strokeStyle === "dashed", weight)}
        >
            {directionalAxis === "x" && (
                <Plot.OfX
                    y={(x) => clamp(equation.eval({x}), ...clampedRange)}
                    domain={clampedDomain}
                    {...plotProps}
                />
            )}
            {directionalAxis === "y" && (
                <Plot.OfY
                    x={(y) => clamp(equation.eval({y}), ...clampedRange)}
                    domain={clampedDomain}
                    {...plotProps}
                />
            )}
        </g>
    );
};

export default LockedFunction;
