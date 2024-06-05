import {Circle} from "mafs";
import * as React from "react";

import {
    lockedCircleFillStyles,
    lockedFigureColors,
    type LockedCircleType,
} from "../../perseus-types";

const LockedCircle = (props: LockedCircleType) => {
    const {center, radius, color, fillStyle, strokeStyle} = props;

    return (
        <Circle
            center={center}
            radius={radius}
            fillOpacity={lockedCircleFillStyles[fillStyle]}
            strokeStyle={strokeStyle}
            color={lockedFigureColors[color]}
        />
    );
};

export default LockedCircle;
