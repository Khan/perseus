import * as KAS from "@khanacademy/kas";
import {Plot} from "mafs";
import * as React from "react";
import {useState, useEffect} from "react";

import {lockedFigureColors} from "../../../perseus-types";

import type {LockedFunctionType} from "../../../perseus-types";

const LockedFunction = (props: LockedFunctionType) => {
    const [equation, setEquation] = useState(KAS.parse(props.equation).expr);
    const {color, strokeStyle, directionalAxis, domain} = props;
    const plotProps = {
        color: lockedFigureColors[color],
        style: strokeStyle,
        domain,
    };

    useEffect(() => {
        setEquation(KAS.parse(props.equation).expr);
    }, [props.equation]);

    if (typeof equation === "undefined") {
        return null;
    }

    return (
        <g className="locked-function">
            {directionalAxis === "x" && (
                <Plot.OfX y={(x) => equation.eval({x})} {...plotProps} />
            )}
            {directionalAxis === "y" && (
                <Plot.OfY x={(y) => equation.eval({y})} {...plotProps} />
            )}
        </g>
    );
};

export default LockedFunction;
