import * as KAS from "@khanacademy/kas";
import {lockedFigureColors} from "@khanacademy/perseus-core";
import {Plot} from "mafs";
import * as React from "react";
import {useState, useEffect} from "react";

import useGraphConfig from "../reducer/use-graph-config";

import {clampDomain, strokeWeights} from "./utils";

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
        >
            {directionalAxis === "x" && (
                <Plot.OfX
                    y={(x) => equation.eval({x})}
                    domain={clampedDomain}
                    {...plotProps}
                />
            )}
            {directionalAxis === "y" && (
                <Plot.OfY
                    x={(y) => equation.eval({y})}
                    domain={clampedDomain}
                    {...plotProps}
                />
            )}
        </g>
    );
};

export default LockedFunction;
