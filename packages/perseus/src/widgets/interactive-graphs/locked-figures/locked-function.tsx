import * as KAS from "@khanacademy/kas";
import {lockedFigureColors} from "@khanacademy/perseus-core";
import {Plot} from "mafs";
import * as React from "react";
import {useState, useEffect} from "react";

import useGraphConfig from "../reducer/use-graph-config";

import {
    clampDomain,
    dashBackingColor,
    dashedStrokeStyle,
    strokeWeights,
} from "./utils";

import type {LockedFunctionType} from "@khanacademy/perseus-core";

const LockedFunction = (props: LockedFunctionType) => {
    const {range} = useGraphConfig();
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
    // Solid knockout backing under a dashed plot so the dashes stay legible
    // over grid lines and shading behind the curve.
    const backingPlotProps = {
        color: dashBackingColor,
        style: "solid" as const,
        weight: strokeWeights[weight],
    };
    const isDashed = strokeStyle === "dashed";

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
            ? clampDomain(domain, range[0])
            : clampDomain(domain, range[1]);

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
                <>
                    {isDashed && (
                        <Plot.OfX
                            y={(x) => equation.eval({x})}
                            domain={clampedDomain}
                            {...backingPlotProps}
                        />
                    )}
                    <Plot.OfX
                        y={(x) => equation.eval({x})}
                        domain={clampedDomain}
                        {...plotProps}
                    />
                </>
            )}
            {directionalAxis === "y" && (
                <>
                    {isDashed && (
                        <Plot.OfY
                            x={(y) => equation.eval({y})}
                            domain={clampedDomain}
                            {...backingPlotProps}
                        />
                    )}
                    <Plot.OfY
                        x={(y) => equation.eval({y})}
                        domain={clampedDomain}
                        {...plotProps}
                    />
                </>
            )}
        </g>
    );
};

export default LockedFunction;
