import * as React from "react";

import {lockedFigureColors} from "../../perseus-types";

import {Vector} from "./graphs/components/vector";

import type {LockedVectorType} from "../../perseus-types";

const LockedVector = (props: LockedVectorType) => {
    const {color, points} = props;
    const [point1, point2] = points;

    return (
        <g className="locked-vector">
            <Vector
                tail={point1}
                tip={point2}
                color={lockedFigureColors[color]}
            />
        </g>
    );
};

export default LockedVector;
