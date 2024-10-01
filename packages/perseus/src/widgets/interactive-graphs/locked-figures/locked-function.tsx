import * as KAS from "@khanacademy/kas";
import {Plot} from "mafs";
import * as React from "react";
import {useState, useEffect} from "react";

import {lockedFigureColors} from "../../../perseus-types";

import type {LockedFunctionType} from "../../../perseus-types";
import type {APIOptions} from "../../../types";

type Props = LockedFunctionType & {
    flags?: APIOptions["flags"];
};

const LockedFunction = (props: Props) => {
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
        domain,
    };

    const hasAria =
        props.ariaLabel && props.flags?.["mafs"]?.["locked-figures-aria"];

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

export default LockedFunction;
