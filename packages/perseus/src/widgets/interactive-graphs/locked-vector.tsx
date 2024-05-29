import {vec} from "mafs";
import * as React from "react";

import {lockedFigureColors} from "../../perseus-types";

import {Arrowhead} from "./graphs/components/arrowhead";
import {Vector} from "./graphs/components/vector";
import {calculateAngleInDegrees} from "./graphs/utils";

import type {LockedVectorType} from "../../perseus-types";

const LockedVector = (props: LockedVectorType) => {
    const {color, points} = props;
    const [point1, point2] = points;
    const direction = vec.sub(point1, point2);
    const angle = calculateAngleInDegrees(direction);

    return (
        <g className="locked-vector">
            <Arrowhead
                angle={angle}
                tip={point2}
                color={lockedFigureColors[color]}
            />
            <Vector
                tail={point1}
                tip={point2}
                color={lockedFigureColors[color]}
            />
        </g>
    );
};

export default LockedVector;
