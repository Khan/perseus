import * as React from "react";

import {lockedFigureColors} from "../../../perseus-types";
import {Vector} from "../graphs/components/vector";

import type {LockedVectorType} from "../../../perseus-types";

const LockedVector = (props: LockedVectorType) => {
    const {color, points} = props;
    const [tail, tip] = points;

    return (
        <g className="locked-vector">
            <Vector tail={tail} tip={tip} color={lockedFigureColors[color]} />
        </g>
    );
};

export default LockedVector;
