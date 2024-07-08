import * as KAS from "@khanacademy/kas";
import {Plot} from "mafs";
import * as React from "react";

import {lockedFigureColors} from "../../../perseus-types";

import type {LockedFunctionType} from "../../../perseus-types";

const LockedFunction = (props: LockedFunctionType) => {
    const {color, strokeStyle, directionalAxis, domain} = props;
    const plotProps = {
        color: lockedFigureColors[color],
        style: strokeStyle,
        domain,
    };
    const equation = props.equationParsed || KAS.parse(props.equation).expr;

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
