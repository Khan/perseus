import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import {formatPolarEquation} from "./format-polar-equation";

import type {
    PerseusPolarGraphType,
    PolarAngleUnit,
} from "@khanacademy/perseus-core";

/** The figure's equation for the author to check; nothing when unset. */
export function EquationReadout({
    state,
    angleUnit,
}: {
    state: PerseusPolarGraphType;
    angleUnit: PolarAngleUnit;
}) {
    const equation = formatPolarEquation(state, angleUnit);
    if (!equation) {
        return null;
    }
    return (
        <BodyText size="small">
            Equation: <strong>{equation}</strong>
        </BodyText>
    );
}
