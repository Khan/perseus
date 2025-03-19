import * as KAS from "@khanacademy/kas";
import {lockedFigureColors} from "@khanacademy/perseus-core";
import {Plot} from "mafs";
import * as React from "react";
import {useState, useEffect} from "react";

import useGraphConfig from "../reducer/use-graph-config";

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
    const {color, strokeStyle, directionalAxis, domain} = props;
    const plotProps = {
        color: lockedFigureColors[color],
        style: strokeStyle,
        domain: clampedDomain(domain, range[0]),
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

    return (
        <g
            className="locked-function"
            aria-label={hasAria ? props.ariaLabel : undefined}
            aria-hidden={!hasAria}
            role="img"
        >
            {directionalAxis === "x" && (
                <Plot.OfX y={(x) => equation.eval({x})} {...plotProps} />
            )}
            {directionalAxis === "y" && (
                <Plot.OfY x={(y) => equation.eval({y})} {...plotProps} />
            )}
        </g>
    );
};

// Exported for testing
export function clampedDomain(
    domain: [number, number],
    graphXBounds: [number, number],
): [number, number] {
    // If the domain is invalid, return the graph bounds
    if (domain[0] > domain[1]) {
        return graphXBounds;
    }

    // Clamp the function to the bounds of the graph to prevent memory
    // leaks when the domain is set to something like [-Infinity, Infinity].
    const min = Math.max(domain[0], graphXBounds[0]);
    const max = Math.min(domain[1], graphXBounds[1]);

    return [min, max];
}

export default LockedFunction;
