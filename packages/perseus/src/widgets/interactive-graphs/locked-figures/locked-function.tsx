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

    if (directionalAxis === "x") {
        return (
            <g className="locked-function">
                <Plot.OfX y={(x) => equation.eval({x})} {...plotProps} />
            </g>
        );
    } else {
        return (
            <g className="locked-function">
                <Plot.OfY x={(y) => equation.eval({y})} {...plotProps} />
            </g>
        );
    }
};

export default LockedFunction;
